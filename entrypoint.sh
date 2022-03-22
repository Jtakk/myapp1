#!/bin/bash
set -e

bundle config set --local path 'vendor/bundle'

bundle install
# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp1/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
