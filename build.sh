#!/usr/bin/env bash

echo "Building client..."
cd client
npm run build
cd ..

echo "Building server..."
cd server
npm run build
cd ..
