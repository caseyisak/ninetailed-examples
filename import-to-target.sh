#!/bin/bash

# Contentful Space Import Script
# This script imports content from the export file to the target space

SOURCE_SPACE="ni3qrizwaanu"
TARGET_SPACE="80sdxx1czlbv"
EXPORT_FILE="contentful-export-ni3qrizwaanu-master-2025-06-03T17-09-49.json"

echo "🚀 Starting Contentful import process..."
echo "Source space: $SOURCE_SPACE"
echo "Target space: $TARGET_SPACE"
echo ""

# Check if contentful-cli is installed
if ! command -v contentful &> /dev/null; then
    echo "❌ Contentful CLI not found. Installing..."
    npm install -g contentful-cli
fi

# Import the content to the target space
echo "📦 Importing content to target space..."
contentful space import \
  --space-id "$TARGET_SPACE" \
  --content-file "$EXPORT_FILE" \
  --skip-content-publishing

echo ""
echo "✅ Import complete!"
echo ""
echo "⚠️  Note: Content has been imported but NOT published."
echo "   You can publish content using the Contentful web app or CLI."

