#!/bin/bash

# Portfolio Deployment Script
# This script helps deploy the portfolio to GitHub Pages and backend services

set -e

echo "🚀 Portfolio Deployment Script"
echo "================================"

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

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Function to build frontend
build_frontend() {
    print_status "Building frontend for production..."
    
    if [ -z "$VITE_API_URL" ]; then
        print_warning "VITE_API_URL not set. Using default backend URL."
        export VITE_API_URL="https://your-backend-api.com"
    fi
    
    npm run build:frontend
    
    if [ $? -eq 0 ]; then
        print_success "Frontend built successfully!"
    else
        print_error "Frontend build failed!"
        exit 1
    fi
}

# Function to build backend
build_backend() {
    print_status "Building backend for production..."
    
    cd server
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Backend built successfully!"
    else
        print_error "Backend build failed!"
        exit 1
    fi
    
    cd ..
}

# Function to check environment
check_environment() {
    print_status "Checking environment..."
    
    # Check Node.js version
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js version: $(node --version)"
    
    # Check if dependencies are installed
    if [ ! -d "node_modules" ]; then
        print_warning "Dependencies not installed. Installing..."
        npm install
    fi
    
    print_success "Environment check passed!"
}

# Function to deploy to GitHub Pages
deploy_github_pages() {
    print_status "Deploying to GitHub Pages..."
    
    # Check if git is initialized
    if [ ! -d ".git" ]; then
        print_error "Git repository not found. Please initialize git first."
        exit 1
    fi
    
    # Check if we're on main branch
    CURRENT_BRANCH=$(git branch --show-current)
    if [ "$CURRENT_BRANCH" != "main" ]; then
        print_warning "Not on main branch. Current branch: $CURRENT_BRANCH"
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    # Build frontend
    build_frontend
    
    # Commit and push
    git add .
    git commit -m "Deploy to GitHub Pages - $(date)"
    git push origin main
    
    print_success "Deployed to GitHub Pages! Check Actions tab for deployment status."
}

# Function to setup backend deployment
setup_backend() {
    print_status "Setting up backend deployment..."
    
    echo "Choose your backend deployment platform:"
    echo "1) Render (Recommended)"
    echo "2) Railway"
    echo "3) Vercel"
    echo "4) Manual setup"
    
    read -p "Enter your choice (1-4): " choice
    
    case $choice in
        1)
            print_status "Setting up Render deployment..."
            echo "1. Go to https://render.com and create an account"
            echo "2. Create a new Web Service"
            echo "3. Connect your GitHub repository"
            echo "4. Set build command: npm run build:backend"
            echo "5. Set start command: npm start"
            echo "6. Set root directory: server"
            echo "7. Add environment variables:"
            echo "   - NODE_ENV=production"
            echo "   - PORT=10000"
            echo "   - DATABASE_URL=your_production_db_url"
            ;;
        2)
            print_status "Setting up Railway deployment..."
            echo "1. Go to https://railway.app and create an account"
            echo "2. Deploy from GitHub"
            echo "3. Set root directory to 'server'"
            echo "4. Add environment variables:"
            echo "   - NODE_ENV=production"
            echo "   - PORT=3000"
            echo "   - DATABASE_URL=your_production_db_url"
            ;;
        3)
            print_status "Setting up Vercel deployment..."
            echo "1. Go to https://vercel.com and create an account"
            echo "2. Import your GitHub repository"
            echo "3. Set root directory to 'server'"
            echo "4. Add environment variables:"
            echo "   - NODE_ENV=production"
            echo "   - DATABASE_URL=your_production_db_url"
            ;;
        4)
            print_status "Manual setup instructions..."
            echo "1. Build the backend: npm run build:backend"
            echo "2. Deploy the 'server' directory to your preferred platform"
            echo "3. Set environment variables as needed"
            ;;
        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac
}

# Function to test deployment
test_deployment() {
    print_status "Testing deployment..."
    
    if [ -z "$VITE_API_URL" ]; then
        print_warning "VITE_API_URL not set. Cannot test API endpoints."
        return
    fi
    
    # Test API endpoints
    print_status "Testing API endpoints..."
    
    ENDPOINTS=("profile" "skills" "experience" "projects" "metrics")
    
    for endpoint in "${ENDPOINTS[@]}"; do
        print_status "Testing /api/$endpoint..."
        response=$(curl -s -o /dev/null -w "%{http_code}" "$VITE_API_URL/api/$endpoint")
        
        if [ "$response" = "200" ]; then
            print_success "/api/$endpoint - OK"
        else
            print_error "/api/$endpoint - Failed (HTTP $response)"
        fi
    done
    
    # Test WebSocket
    print_status "Testing WebSocket connection..."
    # This would require a more complex test, but we can at least check if the endpoint exists
    ws_url=$(echo "$VITE_API_URL" | sed 's/https:/wss:/' | sed 's/http:/ws:/')
    print_status "WebSocket URL: $ws_url/ws"
}

# Main menu
show_menu() {
    echo
    echo "What would you like to do?"
    echo "1) Check environment"
    echo "2) Build frontend"
    echo "3) Build backend"
    echo "4) Deploy to GitHub Pages"
    echo "5) Setup backend deployment"
    echo "6) Test deployment"
    echo "7) Full deployment (frontend + backend setup)"
    echo "8) Exit"
    echo
}

# Main script
main() {
    while true; do
        show_menu
        read -p "Enter your choice (1-8): " choice
        
        case $choice in
            1)
                check_environment
                ;;
            2)
                build_frontend
                ;;
            3)
                build_backend
                ;;
            4)
                deploy_github_pages
                ;;
            5)
                setup_backend
                ;;
            6)
                test_deployment
                ;;
            7)
                check_environment
                build_frontend
                build_backend
                deploy_github_pages
                setup_backend
                test_deployment
                print_success "Full deployment completed!"
                ;;
            8)
                print_status "Goodbye!"
                exit 0
                ;;
            *)
                print_error "Invalid choice. Please enter a number between 1-8."
                ;;
        esac
        
        echo
        read -p "Press Enter to continue..."
    done
}

# Run main function
main 