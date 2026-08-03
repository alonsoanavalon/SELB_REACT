#!/usr/bin/env node

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {pathToFileURL} = require('url');
const vm = require('vm');

const root = path.resolve(__dirname, '../..');
const serviceWorkerPath = path.join(root, 'public/sw.js');
const appPath = path.join(root, 'src/App.js');
const catalogCachePath = path.join(root, 'src/services/catalogCache.mjs');
const serviceWorkerSource = fs.readFileSync(serviceWorkerPath, 'utf8');
const appSource = fs.readFileSync(appPath, 'utf8');

function loadWorker(overrides = {}) {
  const listeners = {};
  const state = {
    openedCache: null,
    addAllBatches: [],
    optionalEntries: [],
    deletedCaches: [],
    matchInputs: [],
    fetchInputs: [],
  };

  const caches = {
    open: async name => {
      state.openedCache = name;
      return {
        addAll: async entries => {
          state.addAllBatches.push(entries);
          if (overrides.addAll) return overrides.addAll(entries, state.addAllBatches.length);
        },
        add: async entry => {
          state.optionalEntries.push(entry);
          if (overrides.add) return overrides.add(entry);
        },
        match: async input => {
          if (overrides.cacheMatch) return overrides.cacheMatch(input);
          if (input === '/index.html') {
            return {
              clone() { return this; },
              async text() {
                return '<link href="/static/css/main.test.css"><script src="/static/js/main.test.js"></script>';
              },
            };
          }
          return undefined;
        },
      };
    },
    match: async input => {
      state.matchInputs.push(input);
      return overrides.match ? overrides.match(input) : undefined;
    },
    keys: async () => overrides.cacheNames || [],
    delete: async name => {
      state.deletedCaches.push(name);
      return true;
    },
  };

  const context = {
    addEventListener: (name, handler) => {
      listeners[name] = handler;
    },
    caches,
    console: {log() {}},
    fetch: async input => {
      state.fetchInputs.push(input);
      if (overrides.fetch) return overrides.fetch(input);
      return {source: 'network'};
    },
    navigator: {onLine: true},
  };

  vm.runInNewContext(serviceWorkerSource, context, {filename: serviceWorkerPath});
  return {listeners, state};
}

async function dispatchWaitable(handler) {
  let pending;
  handler({waitUntil(value) { pending = Promise.resolve(value); }});
  assert(pending, 'event must register waitUntil');
  await pending;
}

async function dispatchFetch(handler, request) {
  let response;
  handler({request, respondWith(value) { response = Promise.resolve(value); }});
  return response ? {handled: true, value: await response} : {handled: false};
}

async function main() {
  const {refreshCatalog} = await import(pathToFileURL(catalogCachePath).href);

  {
    const worker = loadWorker();
    await dispatchWaitable(worker.listeners.install);
    assert.strictEqual(worker.state.openedCache, 'app-v2.0.23');
    assert(worker.state.addAllBatches[0].includes('/index.html'));
    assert(worker.state.addAllBatches[0].includes('/static/js/bundle.js'));
    assert(worker.state.addAllBatches[0].includes('/logo.png'));
    assert(worker.state.addAllBatches[1].includes('/static/css/main.test.css'));
    assert(worker.state.addAllBatches[1].includes('/static/js/main.test.js'));
    assert(worker.state.optionalEntries.length > 100);
  }

  {
    const worker = loadWorker({
      addAll: async () => { throw new Error('precache incomplete'); },
    });
    let installation;
    worker.listeners.install({
      waitUntil(value) { installation = Promise.resolve(value); },
    });
    await assert.rejects(installation, /precache incomplete/);
    assert.strictEqual(worker.state.openedCache, 'app-v2.0.23');
  }

  {
    const worker = loadWorker({
      add: async () => { throw new Error('optional unavailable'); },
    });
    await dispatchWaitable(worker.listeners.install);
    assert(worker.state.optionalEntries.length > 100);
  }

  {
    const cached = {source: 'cache'};
    const request = {
      method: 'GET', mode: 'same-origin', destination: 'script', url: '/static/js/bundle.js',
    };
    const worker = loadWorker({match: input => input === request ? cached : undefined});
    const result = await dispatchFetch(worker.listeners.fetch, request);
    assert.strictEqual(result.handled, true);
    assert.strictEqual(result.value, cached);
    assert.strictEqual(worker.state.fetchInputs.length, 0);
  }

  {
    const shell = {source: 'app-shell'};
    const request = {method: 'GET', mode: 'navigate', url: '/respaldo'};
    const worker = loadWorker({
      fetch: async () => { throw new Error('offline'); },
      match: input => input === '/index.html' ? shell : undefined,
    });
    const result = await dispatchFetch(worker.listeners.fetch, request);
    assert.strictEqual(result.handled, true);
    assert.strictEqual(result.value, shell);
  }

  {
    const network = {source: 'network'};
    const request = {
      method: 'GET', mode: 'cors', destination: 'image', url: 'https://example.test/image.png',
    };
    const worker = loadWorker({fetch: async () => network});
    const result = await dispatchFetch(worker.listeners.fetch, request);
    assert.strictEqual(result.value, network);
  }

  {
    const worker = loadWorker();
    const result = await dispatchFetch(worker.listeners.fetch, {
      method: 'GET', mode: 'cors', destination: '', url: 'https://example.test/data',
    });
    assert.strictEqual(result.handled, false);
  }

  {
    const worker = loadWorker();
    const result = await dispatchFetch(worker.listeners.fetch, {
      method: 'POST', mode: 'cors', url: 'https://example.test/write',
    });
    assert.strictEqual(result.handled, false);
  }

  {
    const worker = loadWorker({
      cacheNames: [
        'app-v2.0.20', 'app-v2.0.21', 'app-v2.0.22', 'app-v2.0.23', 'unrelated-cache',
      ],
    });
    await dispatchWaitable(worker.listeners.activate);
    assert.deepStrictEqual(
      worker.state.deletedCaches.sort(),
      ['app-v2.0.20', 'app-v2.0.21', 'app-v2.0.22'],
    );
  }

  {
    let catalog = {version: 'old'};
    const updated = await refreshCatalog({
      online: true,
      load: async () => ({version: 'new'}),
      persist: async value => { catalog = value; },
    });
    assert.strictEqual(updated, true);
    assert.deepStrictEqual(catalog, {version: 'new'});
  }

  {
    const catalog = {version: 'old'};
    let persisted = false;
    const updated = await refreshCatalog({
      online: true,
      load: async () => { throw new Error('offline'); },
      persist: async () => { persisted = true; },
    });
    assert.strictEqual(updated, false);
    assert.strictEqual(persisted, false);
    assert.deepStrictEqual(catalog, {version: 'old'});
  }

  {
    let loaded = false;
    const updated = await refreshCatalog({
      online: false,
      load: async () => { loaded = true; },
      persist: async () => {},
    });
    assert.strictEqual(updated, false);
    assert.strictEqual(loaded, false);
  }

  assert(!serviceWorkerSource.includes('skipWaiting'));
  assert(!/fetch[\s\S]*navigator\.onLine/.test(serviceWorkerSource));
  assert(!appSource.includes('del(data)'));
  assert(appSource.includes('refreshCatalog'));

  process.stdout.write('pwa_offline_test_status=success scenarios=13\n');
}

main().catch(error => {
  process.stderr.write(`pwa_offline_test_status=failed code=${error.stack || error.message}\n`);
  process.exit(1);
});
