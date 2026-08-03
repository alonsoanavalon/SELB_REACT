#!/usr/bin/env node

const path = require('path');
const {prepareRelease} = require('./release-tools');

const buildDirectory = path.resolve(process.argv[2] || 'build');

try {
  prepareRelease(buildDirectory);
  process.stdout.write('release_prepare_status=success legacy_bundle=present\n');
} catch (error) {
  process.stderr.write(`release_prepare_status=failed code=${error.message}\n`);
  process.exit(1);
}
