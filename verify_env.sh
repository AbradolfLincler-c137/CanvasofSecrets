#!/bin/bash
echo "Verifying local environment for Vitra Arcana..."

# Check Node version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    exit 1
fi
NODE_VERSION=$(node -v)
echo "✅ Node.js installed: $NODE_VERSION"

# Check NPM
if ! command -v npm &> /dev/null; then
    echo "❌ NPM is not installed."
    exit 1
fi
echo "✅ NPM installed: $(npm -v)"

# Check .env file
if [ ! -f .env ]; then
    echo "ℹ️ No local .env file found. Environment variables are not required for the current build."
else
    echo "✅ .env file exists."
fi

# Check missing node_modules
if [ ! -d node_modules ]; then
    echo "⚠️ node_modules not found. Run 'npm install' to install dependencies."
else
    echo "✅ node_modules found."
fi

echo "Environment check complete."
