#!/bin/sh
# Copies only the files the live site needs into dist/, ready to upload
# to any static host (Cloudflare Pages, Netlify, cPanel…).
# Usage: sh scripts/dist.sh
set -e
cd "$(dirname "$0")/.."
rm -rf dist
mkdir -p dist/en dist/assets/img
cp index.html robots.txt sitemap.xml dist/
cp en/index.html dist/en/
cp -R assets/css assets/js assets/fonts assets/vendor assets/media dist/assets/
cp assets/img/logo-full.png assets/img/logo-mark.png assets/img/logo-transparent.png dist/assets/img/
# provenance sidecars and Finder files stay in the repo, not on the server
find dist \( -name '*.json' -o -name '.DS_Store' \) -delete
echo "dist/ ready: $(du -sh dist | cut -f1)"
