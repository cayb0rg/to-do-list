#!/usr/bin/env bash
set -e

host="$1"
shift
until nc -z "$host" 27017; do
  echo "Waiting for MongoDB to start..."
  sleep 1
done

exec "$@"