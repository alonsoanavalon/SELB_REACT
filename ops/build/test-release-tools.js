#!/usr/bin/env node

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const {prepareRelease, verifyRelease} = require('./release-tools');

const sourceServiceWorker = path.resolve(__dirname, '../../public/sw.js');

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'selb-frontend-release-'));
  fs.mkdirSync(path.join(root, 'static/js'), {recursive: true});
  fs.mkdirSync(path.join(root, 'static/css'), {recursive: true});
  fs.writeFileSync(path.join(root, 'static/js/main.abc123.js'), 'main();\n');
  fs.writeFileSync(path.join(root, 'static/css/main.abc123.css'), 'body{}\n');
  fs.writeFileSync(
    path.join(root, 'index.html'),
    '<link href="/static/css/main.abc123.css" rel="stylesheet">' +
    '<script defer src="/static/js/main.abc123.js"></script>'
  );
  fs.copyFileSync(sourceServiceWorker, path.join(root, 'sw.js'));
  return root;
}

let root;
try {
  root = fixture();
  assert.throws(() => verifyRelease(root, sourceServiceWorker), /RELEASE_LEGACY_BUNDLE_MISSING/);
  prepareRelease(root);
  assert.strictEqual(verifyRelease(root, sourceServiceWorker).mainScript, '/static/js/main.abc123.js');
  fs.appendFileSync(path.join(root, 'sw.js'), '\n// changed\n');
  assert.throws(() => verifyRelease(root, sourceServiceWorker), /SERVICE_WORKER_CHANGED/);
  process.stdout.write('release_tools_test_status=success scenarios=3\n');
} finally {
  if (root) fs.rmSync(root, {recursive: true, force: true});
}
