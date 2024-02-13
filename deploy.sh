#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Navigate to your application directory (replace /path/to/your/application with the actual path)
cd /path/to/your/application

# Pull changes from the repository (adjust branch if needed)
git pull origin main

# Install dependencies
npm install

# Build the application
npm run build

# Start the application in production mode
pm2 restart main
