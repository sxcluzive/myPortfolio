#!/bin/bash

# Neon Database Setup Script
# This script helps set up Neon PostgreSQL database

set -e

echo "🐘 Neon Database Setup"
echo "======================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_status "Setting up Neon PostgreSQL database..."

echo
echo "📋 Neon Setup Steps:"
echo "===================="
echo
echo "1. Go to https://neon.tech and create a free account"
echo "2. Create a new project (e.g., 'portfolio-db')"
echo "3. Select a region close to your users"
echo "4. Copy your connection string"
echo
echo "🔗 Your connection string will look like:"
echo "postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database"
echo
echo "📝 Save this connection string - you'll need it for Render deployment!"
echo

read -p "Have you created your Neon database? (y/N): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_success "Great! Now let's set up the database schema..."
    
    echo
    echo "🗄️ Database Schema Setup:"
    echo "========================"
    echo
    echo "Your database schema is already defined in shared/schema.ts"
    echo "The tables will be created automatically when you deploy to Render"
    echo
    
    print_status "Next steps:"
    echo "1. Deploy backend to Render (we'll do this next)"
    echo "2. Set DATABASE_URL environment variable in Render"
    echo "3. The schema will be created automatically"
    
else
    print_warning "Please create your Neon database first, then run this script again."
    echo
    echo "🔗 Neon Quick Start:"
    echo "1. Visit: https://neon.tech"
    echo "2. Sign up with GitHub (free)"
    echo "3. Create new project"
    echo "4. Copy connection string"
    echo "5. Run this script again"
fi

echo
print_success "Neon setup guide completed!" 