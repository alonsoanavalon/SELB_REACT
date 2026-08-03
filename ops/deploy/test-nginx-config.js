#!/usr/bin/env node

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const production = fs.readFileSync(path.join(root, 'nginx-static-location.conf'), 'utf8');
const fixture = fs.readFileSync(path.join(root, 'test/nginx.conf'), 'utf8');

const contracts = [
  'location = /sw.js',
  'location = /index.html',
  'location = /static/js/bundle.js',
  'location /static/',
  'location /',
  'Cache-Control "no-cache, no-store, must-revalidate" always',
  'Cache-Control "public, max-age=31536000, immutable" always',
  'try_files $uri $uri/ /index.html',
];

for (const contract of contracts) {
  assert(production.includes(contract), `PRODUCTION_NGINX_CONTRACT_MISSING:${contract}`);
  assert(fixture.includes(contract), `FIXTURE_NGINX_CONTRACT_MISSING:${contract}`);
}

assert(production.includes('root /var/www/selb/current;'));
assert(fixture.includes('root /usr/share/nginx/html;'));
process.stdout.write(`nginx_config_test_status=success contracts=${contracts.length}\n`);
