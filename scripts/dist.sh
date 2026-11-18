#!/bin/sh
# Copies only the files the live site needs into dist/, ready to upload
# to any static host (Cloudflare Pages, Netlify, cPanel…).
# Usage: sh scripts/dist.sh
set -e
cd "$(dirname "$0")/.."
rm -rf dist
mkdir -p dist/en/privacy dist/privacy dist/assets/img
cp index.html 404.html robots.txt sitemap.xml _headers favicon.ico site.webmanifest dist/
cp privacy/index.html dist/privacy/
cp en/index.html dist/en/
cp en/privacy/index.html dist/en/privacy/
cp -R assets/css assets/js assets/fonts assets/vendor assets/media dist/assets/
cp assets/img/logo-full.png assets/img/logo-mark.png assets/img/logo-transparent.png assets/img/og.jpg dist/assets/img/
cp -R assets/img/icons dist/assets/img/
# provenance sidecars and Finder files stay in the repo, not on the server
find dist \( -name '*.json' -o -name '.DS_Store' \) -delete
echo "dist/ ready: $(du -sh dist | cut -f1)"
