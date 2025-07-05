# Deployment Guide

This guide covers deploying your portfolio to GitHub Pages (frontend) and a backend service for the API.

## Overview

- **Frontend**: Deployed to GitHub Pages (static hosting)
- **Backend**: Deployed to a cloud service (Render, Railway, Vercel, etc.)
- **Database**: SQLite for development, PostgreSQL for production

## Frontend Deployment (GitHub Pages)

### 1. Repository Setup

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as source

2. **Set up GitHub Secrets**:
   - Go to repository settings → Secrets and variables → Actions
   - Add `VITE_API_URL` with your backend API URL (e.g., `https://your-app.onrender.com`)

### 2. Build Configuration

The project is already configured with:
- GitHub Actions workflow (`.github/workflows/deploy.yml`)
- Frontend-only build script (`npm run build:frontend`)
- API configuration for production

### 3. Deployment Process

1. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Monitor deployment**:
   - Check Actions tab in your repository
   - Wait for the workflow to complete
   - Your site will be available at `https://username.github.io/repository-name`

## Backend Deployment

### Option 1: Render (Recommended)

1. **Create Render account** at [render.com](https://render.com)

2. **Create new Web Service**:
   - Connect your GitHub repository
   - Set build command: `npm run build:backend`
   - Set start command: `npm start`
   - Set root directory: `server`

3. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=your_production_db_url
   ```

4. **Deploy**:
   - Render will automatically deploy on push to main
   - Get your API URL (e.g., `https://your-app.onrender.com`)

### Option 2: Railway

1. **Create Railway account** at [railway.app](https://railway.app)

2. **Deploy from GitHub**:
   - Connect your repository
   - Set root directory to `server`
   - Railway will auto-detect Node.js

3. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=your_production_db_url
   ```

### Option 3: Vercel

1. **Create Vercel account** at [vercel.com](https://vercel.com)

2. **Import project**:
   - Connect your GitHub repository
   - Set root directory to `server`
   - Vercel will auto-detect Node.js

3. **Environment Variables**:
   ```
   NODE_ENV=production
   DATABASE_URL=your_production_db_url
   ```

## Database Setup

### Development (SQLite)
- Already configured
- Database file: `dev.db`

### Production (PostgreSQL)

1. **Set up database**:
   - Use Render PostgreSQL, Railway PostgreSQL, or Neon
   - Get connection string

2. **Update environment**:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   ```

3. **Run migrations**:
   ```bash
   npm run db:push
   ```

## Environment Configuration

### Frontend Environment Variables

Create `.env.production` in the root:
```env
VITE_API_URL=https://your-backend-api.com
```

### Backend Environment Variables

Set in your deployment platform:
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=your_database_url
SESSION_SECRET=your_session_secret
```

## CORS Configuration

Update `server/index.ts` to allow your GitHub Pages domain:

```typescript
app.use(cors({
  origin: [
    'https://username.github.io',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

## WebSocket Configuration

For WebSocket support in production:

1. **Render**: WebSockets are supported by default
2. **Railway**: WebSockets are supported by default  
3. **Vercel**: WebSockets require Vercel Pro or use alternative

## Testing Deployment

1. **Test API endpoints**:
   ```bash
   curl https://your-backend-api.com/api/profile
   ```

2. **Test WebSocket connection**:
   ```javascript
   const ws = new WebSocket('wss://your-backend-api.com/ws');
   ```

3. **Verify frontend**:
   - Visit your GitHub Pages URL
   - Test API playground
   - Check real-time features

## Troubleshooting

### Common Issues

1. **CORS errors**:
   - Check CORS configuration
   - Verify API URL in frontend

2. **WebSocket connection fails**:
   - Ensure backend supports WebSockets
   - Check WebSocket URL configuration

3. **Database connection fails**:
   - Verify DATABASE_URL
   - Check database permissions

4. **Build fails**:
   - Check Node.js version (18+)
   - Verify all dependencies installed

### Debug Commands

```bash
# Test backend locally
cd server
npm run dev

# Test frontend build
npm run build:frontend

# Check environment variables
echo $VITE_API_URL
```

## Security Considerations

1. **Environment Variables**: Never commit secrets
2. **CORS**: Restrict origins to your domains
3. **Rate Limiting**: Implement API rate limiting
4. **HTTPS**: Always use HTTPS in production

## Performance Optimization

1. **Caching**: Implement API response caching
2. **CDN**: Use CDN for static assets
3. **Database**: Optimize database queries
4. **Monitoring**: Set up performance monitoring

## Maintenance

1. **Regular updates**: Keep dependencies updated
2. **Monitoring**: Monitor API performance
3. **Backups**: Regular database backups
4. **Logs**: Monitor application logs

## Support

For deployment issues:
1. Check platform documentation
2. Review error logs
3. Test locally first
4. Verify environment configuration 