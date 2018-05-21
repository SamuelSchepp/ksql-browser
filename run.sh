#!/bin/bash

echo "Building client..."
cd client
npm install --silent
npm run build
cd ..

echo "Building Server..."
cd server
npm install --silent
npm run build

echo "Starting Server..."
npm run start

