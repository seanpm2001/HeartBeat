#!/bin/bash
set -euo pipefail

# shellcheck source=/dev/null
source ./ops/base.sh

display_help() {
  echo "Usage: $0 {frontend|backend|stub}" >&2
  echo
  echo "   frontend     build frontend"
  echo "   backend      build backend"
  echo "   stub         build stub"
  echo
  exit 1
}

build_backend() {
  build_and_push_image backend
}

build_stub() {
    build_and_push_image stub
}

build_frontend() {
  echo "build frontend"
}

if [[ "$#" -le 0 ]]; then
  display_help
fi

while [[ "$#" -gt 0 ]]; do
  case $1 in
  -h | --help) display_help ;;
  frontend) build_frontend ;;
  backend) build_backend ;;
  stub) build_stub ;;
  *) echo "Unknown parameter passed: $1" ;;
  esac
  shift
done