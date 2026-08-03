#!/usr/bin/env node

const path = require('path');
const {verifyRelease} = require('./release-tools');

const buildDirectory = path.resolve(process.argv[2] || 'build');
const sourceServiceWorker = path.resolve(__dirname, '../../public/sw.js');

try {
  const result = verifyRelease(buildDirectory, sourceServiceWorker);
  process.stdout.write(
    `release_verify_status=success main_asset=${result.mainScript} ` +
    `main_sha256=${result.mainSha256} sw_sha256=${result.serviceWorkerSha256}\n`
  );
} catch (error) {
  process.stderr.write(`release_verify_status=failed code=${error.message}\n`);
  process.exit(1);
}
