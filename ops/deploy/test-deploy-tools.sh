#!/usr/bin/env bash

set -Eeuo pipefail

SCRIPT_DIRECTORY=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
fixture=$(mktemp -d "${TMPDIR:-/tmp}/selb-frontend-deploy-test-XXXXXX")
cleanup() { chmod -R u+w -- "$fixture" 2>/dev/null || true; rm -rf -- "$fixture"; }
trap cleanup EXIT

mkdir -p "$fixture/releases/a" "$fixture/releases/b" "$fixture/locks"
ln -s "$fixture/releases/a" "$fixture/current"
ln -s "$fixture/releases/b" "$fixture/previous"

if SELB_FRONTEND_DEPLOY_ROOT="$fixture/missing" \
  "$SCRIPT_DIRECTORY/selb-deploy-frontend" invalid >/dev/null 2>&1; then
  echo 'deploy_tools_test_status=failed code=EXPECTED_INVALID_SHA_FAILURE' >&2
  exit 1
fi

initialize_sha=2222222222222222222222222222222222222222
mkdir -p "$fixture/initialize-layout/cache" "$fixture/initialize-layout/locks" \
  "$fixture/initialize-releases" "$fixture/initialize-links"
install -m 0600 "$SCRIPT_DIRECTORY/test/fixtures/build.env" "$fixture/initialize-build.env"
if initialize_output=$(
  PATH="$SCRIPT_DIRECTORY/test/fixtures/bin:$PATH" \
  STATIC_ROOT_CONFIGURED=1 \
  FAKE_REMOTE_SHA="$initialize_sha" \
  SELB_FRONTEND_DEPLOY_ROOT="$fixture/initialize-layout" \
  SELB_FRONTEND_CACHE_DIR="$fixture/initialize-layout/cache" \
  SELB_FRONTEND_RELEASES_ROOT="$fixture/initialize-releases" \
  SELB_FRONTEND_CURRENT_LINK="$fixture/initialize-links/current" \
  SELB_FRONTEND_PREVIOUS_LINK="$fixture/initialize-links/previous" \
  SELB_FRONTEND_BUILD_ENV="$fixture/initialize-build.env" \
  SELB_FRONTEND_LOCK_FILE="$fixture/initialize-layout/locks/frontend.lock" \
    "$SCRIPT_DIRECTORY/selb-deploy-frontend" --initialize "$initialize_sha" 2>&1
); then
  echo 'deploy_tools_test_status=failed code=EXPECTED_STATIC_CONFIG_FAILURE' >&2
  exit 1
fi
[[ $initialize_output == *'code=INITIAL_STATIC_CONFIG_ACTIVE'* ]]

PATH="$SCRIPT_DIRECTORY/test/fixtures/bin:$PATH" \
FAKE_REMOTE_SHA="$initialize_sha" \
FAKE_ARCHIVE_SOURCE="$SCRIPT_DIRECTORY/test/fixtures/runtime-source" \
SELB_FRONTEND_DEPLOY_ROOT="$fixture/initialize-layout" \
SELB_FRONTEND_CACHE_DIR="$fixture/initialize-layout/cache" \
SELB_FRONTEND_RELEASES_ROOT="$fixture/initialize-releases" \
SELB_FRONTEND_CURRENT_LINK="$fixture/initialize-links/current" \
SELB_FRONTEND_PREVIOUS_LINK="$fixture/initialize-links/previous" \
SELB_FRONTEND_BUILD_ENV="$fixture/initialize-build.env" \
SELB_FRONTEND_LOCK_FILE="$fixture/initialize-layout/locks/frontend.lock" \
SELB_FRONTEND_NODE_BIN="$SCRIPT_DIRECTORY/test/fixtures/bin/node" \
SELB_FRONTEND_NPM_CLI="$SCRIPT_DIRECTORY/test/fixtures/bin/npm" \
  "$SCRIPT_DIRECTORY/selb-deploy-frontend" --initialize "$initialize_sha" >/dev/null
[[ $(readlink -e "$fixture/initialize-links/current") == "$fixture/initialize-releases/$initialize_sha" ]]
[[ ! -e $fixture/initialize-links/previous ]]

if PATH="$SCRIPT_DIRECTORY/test/fixtures/bin:$PATH" \
  STATIC_ROOT_CONFIGURED=1 \
  FAKE_REMOTE_SHA="$initialize_sha" \
  SELB_FRONTEND_DEPLOY_ROOT="$fixture/initialize-layout" \
  SELB_FRONTEND_CACHE_DIR="$fixture/initialize-layout/cache" \
  SELB_FRONTEND_RELEASES_ROOT="$fixture/initialize-releases" \
  SELB_FRONTEND_CURRENT_LINK="$fixture/initialize-links/current" \
  SELB_FRONTEND_PREVIOUS_LINK="$fixture/initialize-links/previous" \
  SELB_FRONTEND_BUILD_ENV="$fixture/initialize-build.env" \
  SELB_FRONTEND_LOCK_FILE="$fixture/initialize-layout/locks/frontend.lock" \
    "$SCRIPT_DIRECTORY/selb-deploy-frontend" --initialize "$initialize_sha" >/dev/null 2>&1; then
  echo 'deploy_tools_test_status=failed code=EXPECTED_REINITIALIZE_FAILURE' >&2
  exit 1
fi

runtime_sha=1111111111111111111111111111111111111111
real_node=$(command -v node)
mkdir -p "$fixture/runtime-layout/cache" "$fixture/runtime-layout/locks" \
  "$fixture/runtime-releases/current" "$fixture/runtime-links"
install -m 0600 "$SCRIPT_DIRECTORY/test/fixtures/build.env" "$fixture/runtime-build.env"
install -m 0444 "$SCRIPT_DIRECTORY/test/fixtures/current-release-sha" \
  "$fixture/runtime-releases/current/.selb-release-sha"
ln -s "$fixture/runtime-releases/current" "$fixture/runtime-links/current"
if runtime_output=$(
  PATH="$SCRIPT_DIRECTORY/test/fixtures/bin:$PATH" \
  FAKE_REMOTE_SHA="$runtime_sha" \
  FAKE_ARCHIVE_SOURCE="$SCRIPT_DIRECTORY/test/fixtures/runtime-source" \
  SELB_FRONTEND_DEPLOY_ROOT="$fixture/runtime-layout" \
  SELB_FRONTEND_CACHE_DIR="$fixture/runtime-layout/cache" \
  SELB_FRONTEND_RELEASES_ROOT="$fixture/runtime-releases" \
  SELB_FRONTEND_CURRENT_LINK="$fixture/runtime-links/current" \
  SELB_FRONTEND_PREVIOUS_LINK="$fixture/runtime-links/previous" \
  SELB_FRONTEND_BUILD_ENV="$fixture/runtime-build.env" \
  SELB_FRONTEND_LOCK_FILE="$fixture/runtime-layout/locks/frontend.lock" \
  SELB_FRONTEND_NODE_BIN="$real_node" \
  "$SCRIPT_DIRECTORY/selb-deploy-frontend" "$runtime_sha" 2>&1
); then
  echo 'deploy_tools_test_status=failed code=EXPECTED_NODE_VERSION_FAILURE' >&2
  exit 1
fi
[[ $runtime_output == *'code=NODE_VERSION_MISMATCH'* ]]
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
echo 'deploy_tools_test_status=success scenarios=9'
