# Deployment Guide

This guide covers various deployment options for the portfolio project, from simple hosting platforms to advanced cloud deployments.

## 🚀 Quick Deploy Options

### 1. Vercel (Recommended for Frontend)

**Best for**: Frontend-only deployment with serverless functions
**Pros**: Free tier, automatic deployments, excellent React support
**Cons**: Limited backend capabilities

#### Setup Steps:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Configure for Frontend Only**
   ```bash
   # In project root
   vercel --prod
   ```

3. **Environment Variables**
   ```bash
   # Set in Vercel dashboard
   VITE_API_URL=https://your-backend-url.com
   ```

4. **Build Configuration**
   ```json
   // vercel.json
   {
     "buildCommand": "cd client && npm run build",
     "outputDirectory": "client/dist",
     "installCommand": "npm install && cd client && npm install"
   }
   ```

### 2. Railway (Full-Stack)

**Best for**: Full-stack deployment with database
**Pros**: Easy deployment, PostgreSQL included, good free tier
**Cons**: Limited customization

#### Setup Steps:

1. **Connect Repository**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli
   
   # Login and link project
   railway login
   railway link
   ```

2. **Configure Environment**
   ```bash
   # Set environment variables
   railway variables set NODE_ENV=production
   railway variables set PORT=3000
   ```

3. **Deploy**
   ```bash
   railway up
   ```

4. **Database Setup**
   ```bash
   # Add PostgreSQL service
   railway add
   # Select PostgreSQL
   ```

### 3. Render (Full-Stack)

**Best for**: Full-stack with custom domains
**Pros**: Free tier, custom domains, good documentation
**Cons**: Cold starts on free tier

#### Setup Steps:

1. **Create Render Account**
   - Sign up at [render.com](https://render.com)

2. **Connect Repository**
   - Link your GitHub repository
   - Select "Web Service"

3. **Configure Service**
   ```bash
   # Build Command
   npm install && cd client && npm install && npm run build
   
   # Start Command
   npm start
   
   # Environment Variables
   NODE_ENV=production
   PORT=3000
   ```

4. **Database Setup**
   - Add PostgreSQL service
   - Link to web service

### 4. Heroku (Full-Stack)

**Best for**: Traditional hosting with add-ons
**Pros**: Mature platform, extensive add-ons
**Cons**: No free tier, more expensive

#### Setup Steps:

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Download from heroku.com
   ```

2. **Create App**
   ```bash
   heroku create your-portfolio-app
   ```

3. **Configure Buildpacks**
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set PORT=3000
   ```

5. **Add Database**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm ci --only=production
RUN cd client && npm ci

# Copy source code
COPY . .

# Build frontend
RUN cd client && npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy built application
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DATABASE_URL=postgresql://postgres:password@db:5432/portfolio
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=portfolio
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

### Docker Deployment Commands

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build and run manually
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## ☁️ Cloud Platform Deployments

### AWS (Advanced)

#### EC2 Deployment

1. **Launch EC2 Instance**
   ```bash
   # Ubuntu 22.04 LTS recommended
   # t3.micro for free tier
   ```

2. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   ```

3. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   
   # Install dependencies
   npm install
   cd client && npm install
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "portfolio" -- start
   pm2 startup
   pm2 save
   ```

#### RDS Database Setup

```bash
# Create RDS PostgreSQL instance
# Configure security groups
# Update DATABASE_URL in environment
```

### Google Cloud Platform

#### App Engine Deployment

1. **Create app.yaml**
   ```yaml
   runtime: nodejs18
   
   env_variables:
     NODE_ENV: production
     PORT: 8080
   
   handlers:
     - url: /.*
       script: auto
   ```

2. **Deploy**
   ```bash
   gcloud app deploy
   ```

#### Cloud SQL Setup

```bash
# Create Cloud SQL instance
gcloud sql instances create portfolio-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1
```

### Microsoft Azure

#### App Service Deployment

1. **Create App Service**
   ```bash
   az webapp create \
     --resource-group myResourceGroup \
     --plan myAppServicePlan \
     --name myPortfolioApp \
     --runtime "NODE|18-lts"
   ```

2. **Deploy**
   ```bash
   az webapp deployment source config-local-git \
     --name myPortfolioApp \
     --resource-group myResourceGroup
   
   git remote add azure <git-url>
   git push azure main
   ```

## 🔧 Environment Configuration

### Production Environment Variables

```bash
# Required
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:port/db

# Optional
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX=100
```

### Database Setup

#### PostgreSQL (Recommended)

```sql
-- Create database
CREATE DATABASE portfolio;

-- Create user (if needed)
CREATE USER portfolio_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio TO portfolio_user;
```

#### SQLite (Development Only)

```bash
# SQLite is fine for development
# For production, use PostgreSQL
```

## 📊 Monitoring and Logging

### Application Monitoring

#### PM2 Monitoring (Node.js)

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "portfolio" -- start

# Monitor
pm2 monit

# View logs
pm2 logs portfolio

# Restart on file changes
pm2 start npm --name "portfolio" -- start --watch
```

#### Health Checks

```typescript
// Add health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Logging

#### Winston Logger Setup

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

## 🔒 Security Considerations

### SSL/TLS Configuration

#### Let's Encrypt (Free SSL)

```bash
# Install Certbot
sudo apt install certbot

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/portfolio
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Security Headers

```typescript
// Add security middleware
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

## 🚀 Performance Optimization

### CDN Configuration

#### Cloudflare Setup

1. **Add Domain to Cloudflare**
2. **Configure DNS Records**
3. **Enable Auto Minify**
4. **Enable Brotli Compression**

#### Static Asset Optimization

```typescript
// Serve static files with caching
app.use('/static', express.static('client/dist', {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));
```

### Database Optimization

```sql
-- Add indexes for better performance
CREATE INDEX idx_visitors_timestamp ON visitors(timestamp);
CREATE INDEX idx_logs_timestamp ON logs(timestamp);
CREATE INDEX idx_metrics_category ON metrics(category);
```

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: |
        npm ci
        cd client && npm ci
    
    - name: Build application
      run: cd client && npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - build
  - deploy

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - cd client && npm ci
    - npm run build
  artifacts:
    paths:
      - client/dist/

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - ssh -o StrictHostKeyChecking=no $USER@$HOST "cd /var/www/portfolio && git pull && npm install && pm2 restart portfolio"
```

## 📈 Analytics and Monitoring

### Google Analytics

```typescript
// Add Google Analytics
const GA_TRACKING_ID = 'G-XXXXXXXXXX';

// In index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_TRACKING_ID}');
</script>
```

### Application Performance Monitoring

#### Sentry Setup

```typescript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// Capture errors
app.use(Sentry.Handlers.errorHandler());
```

## 🔧 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

#### Database Connection Issues
```bash
# Test database connection
psql $DATABASE_URL -c "SELECT 1;"

# Check database logs
docker logs <container-name>
```

#### Build Failures
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npx tsc --noEmit
```

### Performance Issues

#### Memory Leaks
```bash
# Monitor memory usage
node --inspect app.js

# Use heap snapshots in Chrome DevTools
```

#### Slow Database Queries
```sql
-- Enable query logging
SET log_statement = 'all';
SET log_min_duration_statement = 1000;
```

---

This deployment guide covers the most common deployment scenarios. Choose the option that best fits your needs and budget. For production deployments, always use HTTPS, set up monitoring, and follow security best practices. 