# Deployment Quick Reference

## 🚀 Vercel + Render + Neon Stack

### Step 1: Neon Database (5 min)
1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub
3. Create project: `portfolio-db`
4. Copy connection string: `postgresql://user:pass@ep-xxx-xxx-xxx.region.aws.neon.tech/database`

### Step 2: Render Backend (8 min)
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Create Web Service:
   - **Name**: `portfolio-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
4. Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=your_neon_connection_string
   ```
5. Deploy and get URL: `https://your-app.onrender.com`

### Step 3: Vercel Frontend (5 min)
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build:frontend`
   - **Output Directory**: `dist/public`
4. Environment Variables:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
5. Deploy and get URL: `https://your-project.vercel.app`

### Step 4: CORS Configuration
Update `server/routes.ts`:
```typescript
app.use(cors({
  origin: [
    'https://your-project.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

## 🔧 Build Scripts (Already Configured)

### Backend (server/package.json)
```json
{
  "scripts": {
    "start": "node dist/index.js",
    "build": "esbuild index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist"
  }
}
```

### Frontend (package.json)
```json
{
  "scripts": {
    "build:frontend": "vite build --config vite.config.frontend.ts"
  }
}
```

### Render Configuration
- **Build Command**: `npm run build` ✅
- **Start Command**: `npm start` ✅
- **Root Directory**: `server` ✅

## 🧪 Testing

### Test Backend
```bash
curl https://your-backend.onrender.com/api/profile
```

### Test WebSocket
```javascript
const ws = new WebSocket('wss://your-backend.onrender.com/ws');
ws.onopen = () => console.log('Connected!');
```

### Test Frontend
- Visit your Vercel URL
- Check API playground
- Verify real-time features

## 🚨 Common Issues

### Build Failures
- Check build logs in Render/Vercel
- Verify all dependencies are installed
- Ensure build script names match exactly

### Database Connection
- Verify DATABASE_URL format
- Check Neon database is active
- Ensure connection string is correct

### CORS Errors
- Update CORS origin in server/routes.ts
- Add your Vercel domain
- Check browser console for errors

## 💰 Free Tier Limits
- **Vercel**: Unlimited deployments, 100GB bandwidth
- **Render**: 750 hours/month (24/7 coverage)
- **Neon**: 3GB storage, 10GB transfer

## 🎯 Success Checklist
- [ ] Neon database connected
- [ ] Render backend deployed
- [ ] Vercel frontend deployed
- [ ] API endpoints working
- [ ] WebSocket connection working
- [ ] Real-time features functional

## 📞 Support
- **Render**: [docs.render.com](https://docs.render.com)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Neon**: [neon.tech/docs](https://neon.tech/docs)