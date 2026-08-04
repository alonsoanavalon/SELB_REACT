const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const LEGACY_BUNDLE_PATH = '/static/js/bundle.js';
const EXPECTED_CACHE_NAME = 'app-v2.0.25';

function fail(message) {
  throw new Error(message);
}

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function readIndexAssets(buildDirectory) {
  const indexPath = path.join(buildDirectory, 'index.html');
  const index = fs.readFileSync(indexPath, 'utf8');
  const scripts = [...index.matchAll(/<script[^>]+src="([^"]+)"/g)].map(match => match[1]);
  const styles = [...index.matchAll(/<link[^>]+href="([^"]+\.css)"/g)].map(match => match[1]);
  const mainScript = scripts.find(asset => /^\/static\/js\/main\.[a-f0-9]+\.js$/.test(asset));

  if (!mainScript) fail('RELEASE_MAIN_SCRIPT_MISSING');

  return {indexPath, scripts, styles, mainScript};
}

function localAssetPath(buildDirectory, asset) {
  if (!asset.startsWith('/')) fail(`RELEASE_ASSET_NOT_ROOT_RELATIVE:${asset}`);
  return path.join(buildDirectory, asset.slice(1));
}

function prepareRelease(buildDirectory) {
  const {mainScript} = readIndexAssets(buildDirectory);
  const source = localAssetPath(buildDirectory, mainScript);
  const legacy = localAssetPath(buildDirectory, LEGACY_BUNDLE_PATH);
  fs.copyFileSync(source, legacy);
  return {source, legacy};
}

function verifyRelease(buildDirectory, sourceServiceWorker) {
  const {scripts, styles, mainScript} = readIndexAssets(buildDirectory);
  for (const asset of [...scripts, ...styles]) {
    if (asset.startsWith('/static/') && !fs.existsSync(localAssetPath(buildDirectory, asset))) {
      fail(`RELEASE_ASSET_MISSING:${asset}`);
    }
  }

  const main = localAssetPath(buildDirectory, mainScript);
  const legacy = localAssetPath(buildDirectory, LEGACY_BUNDLE_PATH);
  if (!fs.existsSync(legacy)) fail('RELEASE_LEGACY_BUNDLE_MISSING');
  if (sha256(main) !== sha256(legacy)) fail('RELEASE_LEGACY_BUNDLE_MISMATCH');

  const builtServiceWorker = path.join(buildDirectory, 'sw.js');
  if (!fs.existsSync(builtServiceWorker)) fail('RELEASE_SERVICE_WORKER_MISSING');
  if (sha256(builtServiceWorker) !== sha256(sourceServiceWorker)) {
    fail('RELEASE_SERVICE_WORKER_CHANGED_DURING_BUILD');
  }

  const serviceWorker = fs.readFileSync(builtServiceWorker, 'utf8');
  if (!serviceWorker.includes(`const cacheData = "${EXPECTED_CACHE_NAME}"`)) {
    fail('RELEASE_SERVICE_WORKER_CACHE_VERSION_CHANGED');
  }
  if (!serviceWorker.includes(`'${LEGACY_BUNDLE_PATH}'`)) {
    fail('RELEASE_SERVICE_WORKER_LEGACY_BUNDLE_CONTRACT_MISSING');
  }

  for (const forbidden of ['completedTests', 'backupTest', 'indexedDB.deleteDatabase', 'localStorage.clear']) {
    if (serviceWorker.includes(forbidden)) fail(`RELEASE_SERVICE_WORKER_STORAGE_MUTATION:${forbidden}`);
  }

  return {
    mainScript,
    mainSha256: sha256(main),
    serviceWorkerSha256: sha256(builtServiceWorker),
  };
}

module.exports = {
  EXPECTED_CACHE_NAME,
  LEGACY_BUNDLE_PATH,
  prepareRelease,
  verifyRelease,
};
