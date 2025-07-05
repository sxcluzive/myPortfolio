#!/bin/bash

# Portfolio Deployment Script
# Deploys to Vercel + Render + Neon stack

set -e

echo "🚀 Starting Portfolio Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed"
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    print_success "All dependencies are installed"
}

# Build the project
build_project() {
    print_status "Building project..."
    
    # Install dependencies
    npm install
    
    # Build backend
    print_status "Building backend..."
    cd server
    npm install
    npm run build
    cd ..
    
    # Build frontend
    print_status "Building frontend..."
    npm run build:frontend
    
    print_success "Build completed successfully"
}

# Deploy to Render (Backend)
deploy_backend() {
    print_status "Deploying backend to Render..."
    print_warning "Make sure you have:"
    print_warning "1. Render account created"
    print_warning "2. GitHub repository connected"
    print_warning "3. Web service configured with:"
    print_warning "   - Root Directory: server"
    print_warning "   - Build Command: npm run build"
    print_warning "   - Start Command: npm start"
    print_warning "4. Environment variables set:"
    print_warning "   - NODE_ENV=production"
    print_warning "   - PORT=10000"
    print_warning "   - DATABASE_URL=your_neon_connection_string"
    
    read -p "Press Enter when ready to deploy backend..."
    
    # Push to trigger deployment
    git add .
    git commit -m "Deploy backend to Render"
    git push origin main
    
    print_success "Backend deployment triggered"
}

# Deploy to Vercel (Frontend)
deploy_frontend() {
    print_status "Deploying frontend to Vercel..."
    print_warning "Make sure you have:"
    print_warning "1. Vercel account created"
    print_warning "2. GitHub repository connected"
    print_warning "3. Project configured with:"
    print_warning "   - Framework Preset: Vite"
    print_warning "   - Root Directory: ./"
    print_warning "   - Build Command: npm run build:frontend"
    print_warning "   - Output Directory: dist/public"
    print_warning "4. Environment variables set:"
    print_warning "   - VITE_API_URL=https://your-backend.onrender.com"
    
    read -p "Press Enter when ready to deploy frontend..."
    
    # Push to trigger deployment
    git add .
    git commit -m "Deploy frontend to Vercel"
    git push origin main
    
    print_success "Frontend deployment triggered"
}

# Setup Neon Database
setup_database() {
    print_status "Setting up Neon database..."
    print_warning "Please visit https://neon.tech and:"
    print_warning "1. Create an account"
    print_warning "2. Create a new project"
    print_warning "3. Copy the connection string"
    print_warning "4. Add it to Render environment variables"
    
    read -p "Press Enter when database is ready..."
    print_success "Database setup completed"
}

# Main deployment flow
main() {
    echo "🎯 Portfolio Deployment Script"
    echo "================================"
    
    check_dependencies
    build_project
    
    echo ""
    echo "📋 Deployment Steps:"
    echo "1. Setup Neon database"
    echo "2. Deploy backend to Render"
    echo "3. Deploy frontend to Vercel"
    echo ""
    
    setup_database
    deploy_backend
    deploy_frontend
    
    echo ""
    print_success "Deployment process completed!"
    print_status "Check your deployment platforms for status updates"
    echo ""
    print_warning "Don't forget to:"
    print_warning "- Update CORS settings in server/routes.ts"
    print_warning "- Test your deployed application"
    print_warning "- Set up custom domain (optional)"
}

# Run main function
main "$@" 