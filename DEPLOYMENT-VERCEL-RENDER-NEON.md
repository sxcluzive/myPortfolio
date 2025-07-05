# Deployment Guide: Vercel + Render + Neon Stack

This guide covers deploying your portfolio using the optimal free stack:
- **Frontend**: Vercel (React app)
- **Backend**: Render (Node.js API)
- **Database**: Neon (PostgreSQL)

## 🎯 Why This Stack is Perfect

| Component | Platform | Free Tier | Performance | Features |
|-----------|----------|-----------|-------------|----------|
| **Frontend** | Vercel | ✅ Unlimited | ⭐⭐⭐⭐⭐ | Global CDN, Auto-deploy |
| **Backend** | Render | ✅ 750h/month | ⭐⭐⭐⭐⭐ | WebSocket support, No cold starts |
| **Database** | Neon | ✅ 3GB storage | ⭐⭐⭐⭐⭐ | Serverless, Auto-scaling |

## 🚀 Quick Deployment (15 minutes)

### Step 1: Database Setup (Neon)

1. **Create Neon Account**
   ```bash
   # Visit: https://neon.tech
   # Sign up with GitHub (free)
   ```

2. **Create Database Project**
   - Click "Create Project"
   - Name: `portfolio-db`
   - Region: Choose closest to your users
   - Click "Create Project"

3. **Get Connection String**
   - Copy the connection string from dashboard
   - Format: `postgresql://user:pass@ep-xxx-xxx-xxx.region.aws.neon.tech/database`

### Step 2: Backend Deployment (Render)

1. **Create Render Account**
   ```bash
   # Visit: https://render.com
   # Sign up with GitHub (free)
   ```

2. **Create Web Service**
   - Click "New Web Service"
   - Connect your GitHub repository
   - Configure settings:
     ```
     Name: portfolio-backend
     Root Directory: server
     Build Command: npm run build:backend
     Start Command: npm start
     ```

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=your_neon_connection_string
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Get your API URL: `https://your-app.onrender.com`

### Step 3: Frontend Deployment (Vercel)

1. **Create Vercel Account**
   ```bash
   # Visit: https://vercel.com
   # Sign up with GitHub (free)
   ```

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Configure settings:
     ```
     Framework Preset: Vite
     Root Directory: ./
     Build Command: npm run build:frontend
     Output Directory: dist/public
     ```

3. **Set Environment Variables**
   ```
   VITE_API_URL=https://your-app.onrender.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment (1-2 minutes)
   - Get your URL: `https://your-project.vercel.app`

## 🔧 Detailed Setup Instructions

### Database Schema Setup

Your schema is already PostgreSQL-ready. Neon will automatically create tables:

```bash
# The schema is in shared/schema.ts
# Tables will be created automatically on first deployment
```

### Backend Configuration

Update `server/package.json` for Render:

```json
{
  "scripts": {
    "start": "node index.js",
    "build:backend": "esbuild index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist"
  }
}
```

### Frontend Configuration

Update `vite.config.frontend.ts` for Vercel:

```typescript
export default defineConfig({
  // ... existing config
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'https://your-backend.onrender.com'),
  },
});
```

## 🌐 Environment Variables

### Render (Backend)
```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://user:pass@ep-xxx-xxx-xxx.region.aws.neon.tech/database
```

### Vercel (Frontend)
```env
VITE_API_URL=https://your-backend.onrender.com
```

## 🔗 CORS Configuration

Update `server/routes.ts` to allow Vercel domain:

```typescript
import cors from 'cors';

app.use(cors({
  origin: [
    'https://your-project.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

## 📊 Performance Optimization

### Database (Neon)
- ✅ **Serverless**: No cold starts
- ✅ **Auto-scaling**: Handles traffic spikes
- ✅ **Connection pooling**: Built-in optimization

### Backend (Render)
- ✅ **No cold starts**: Always running
- ✅ **WebSocket support**: Real-time features work
- ✅ **Auto-deploy**: Updates on git push

### Frontend (Vercel)
- ✅ **Global CDN**: Fast worldwide
- ✅ **Edge caching**: Instant page loads
- ✅ **Auto-optimization**: Images, fonts, etc.

## 🔍 Testing Your Deployment

### 1. Test Database Connection
```bash
# Check if database is accessible
curl https://your-backend.onrender.com/api/profile
```

### 2. Test WebSocket Connection
```javascript
// In browser console
const ws = new WebSocket('wss://your-backend.onrender.com/ws');
ws.onopen = () => console.log('WebSocket connected!');
```

### 3. Test Frontend
- Visit your Vercel URL
- Check API playground
- Verify real-time features

## 🛠️ Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   # Check DATABASE_URL in Render
   # Ensure Neon database is active
   ```

2. **CORS Errors**
   ```bash
   # Update CORS origin in server/routes.ts
   # Add your Vercel domain
   ```

3. **WebSocket Not Working**
   ```bash
   # Render supports WebSockets by default
   # Check if backend is deployed correctly
   ```

4. **Build Failures**
   ```bash
   # Check build logs in Vercel/Render
   # Ensure all dependencies are installed
   ```

### Debug Commands

```bash
# Test backend locally
cd server
npm run dev

# Test frontend build
npm run build:frontend

# Check environment variables
echo $DATABASE_URL
echo $VITE_API_URL
```

## 🔄 Continuous Deployment

### Automatic Deployments
- **Vercel**: Deploys on push to main branch
- **Render**: Deploys on push to main branch
- **Neon**: No deployment needed (serverless)

### Manual Deployments
```bash
# Backend (Render)
git push origin main

# Frontend (Vercel)
git push origin main
```

## 💰 Cost Breakdown

### Free Tier Limits
- **Vercel**: Unlimited deployments, 100GB bandwidth
- **Render**: 750 hours/month (enough for 24/7)
- **Neon**: 3GB storage, 10GB transfer

### Upgrade Path
- **Vercel Pro**: $20/month (custom domains, analytics)
- **Render**: $7/month (unlimited hours)
- **Neon**: $10/month (more storage, compute)

## 🎉 Success Checklist

- [ ] Neon database created and connected
- [ ] Render backend deployed and accessible
- [ ] Vercel frontend deployed and loading
- [ ] API endpoints responding correctly
- [ ] WebSocket connection working
- [ ] Real-time features functional
- [ ] Custom domain configured (optional)

## 🚀 Next Steps

1. **Set up custom domain** (optional)
2. **Add analytics** (Google Analytics, Vercel Analytics)
3. **Monitor performance** (Render logs, Vercel insights)
4. **Set up alerts** (database usage, API errors)

Your portfolio is now live with a production-grade stack! 🎉 