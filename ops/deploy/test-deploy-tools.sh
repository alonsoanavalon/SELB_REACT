#!/usr/bin/env bash

set -Eeuo pipefail

SCRIPT_DIRECTORY=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
fixture=$(mktemp -d "${TMPDIR:-/tmp}/selb-frontend-deploy-test-XXXXXX")
cleanup() { rm -rf -- "$fixture"; }
trap cleanup EXIT

mkdir -p "$fixture/releases/a" "$fixture/releases/b" "$fixture/locks"
ln -s "$fixture/releases/a" "$fixture/current"
ln -s "$fixture/releases/b" "$fixture/previous"

if SELB_FRONTEND_DEPLOY_ROOT="$fixture/missing" \
  "$SCRIPT_DIRECTORY/selb-deploy-frontend" invalid >/dev/null 2>&1; then
  echo 'deploy_tools_test_status=failed code=EXPECTED_INVALID_SHA_FAILURE' >&2
  exit 1
fi
if SELB_FRONTEND_DEPLOY_ROOT="$fixture/missing" \
  "$SCRIPT_DIRECTORY/selb-deploy-frontend" 0000000000000000000000000000000000000000 >/dev/null 2>&1; then
  echo 'deploy_tools_test_status=failed code=EXPECTED_LAYOUT_FAILURE' >&2
  exit 1
fi

run_rollback() {
  PATH="$SCRIPT_DIRECTORY/test/fixtures/bin:$PATH" \
  SELB_FRONTEND_CURRENT_LINK="$fixture/current" \
  SELB_FRONTEND_PREVIOUS_LINK="$fixture/previous" \
  SELB_FRONTEND_LOCK_FILE="$fixture/locks/frontend.lock" \
  "$SCRIPT_DIRECTORY/selb-rollback-frontend"
}

run_rollback >/dev/null
[[ $(readlink -e "$fixture/current") == "$fixture/releases/b" ]]
[[ $(readlink -e "$fixture/previous") == "$fixture/releases/a" ]]

if FAIL_NGINX=1 run_rollback >/dev/null 2>&1; then
  echo 'deploy_tools_test_status=failed code=EXPECTED_NGINX_FAILURE' >&2
  exit 1
fi
[[ $(readlink -e "$fixture/current") == "$fixture/releases/b" ]]
[[ $(readlink -e "$fixture/previous") == "$fixture/releases/a" ]]

exec 8>"$fixture/locks/frontend.lock"
flock -n 8
if run_rollback >/dev/null 2>&1; then
  echo 'deploy_tools_test_status=failed code=EXPECTED_LOCK_FAILURE' >&2
  exit 1
fi

node "$SCRIPT_DIRECTORY/test-nginx-config.js"
echo 'deploy_tools_test_status=success scenarios=5'
