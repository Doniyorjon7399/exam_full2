#!/bin/sh

echo "Running Prisma Generate..."
npx prisma generate

echo "Running Prisma Migrations..."
npx prisma migrate deploy

echo "Starting Application..."
exec yarn start:prod
