#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build
npx prisma generate
# npx prisma migrate deploy # Uncomment this if you want auto-migrations on deploy
