#!/usr/bin/env bash

echo "Installing client deps..."
cd client
npm install --silent
cd ..

echo "Installing server deps..."
cd server
npm install --silent
cd ..
