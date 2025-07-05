# Shubham Singh - Backend Engineer Portfolio

A modern, interactive terminal-themed portfolio showcasing backend engineering skills, projects, and real-time system metrics. Built with React, TypeScript, Node.js, and real-time WebSocket connections.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)

## Features

### Dual View Modes
- **Normal View**: Business-focused presentation for HR and non-technical visitors
- **Developer View**: Technical showcase with API playground and system monitoring

### Terminal-Themed Interface
- Authentic terminal aesthetic with matrix rain background
- Real-time command prompt with system status
- Professional terminal header with connection indicators
- Responsive design optimized for desktop viewing

### Interactive API Playground
- Live API testing with `/api/skills`, `/api/experience`, `/api/projects` endpoints
- Real-time JSON response display with syntax highlighting
- WebSocket-powered live activity logs
- Rate limiting and system health monitoring

### Real-Time System Metrics
- Live performance monitoring (API response time, database queries, server load)
- Visitor tracking and analytics
- Business impact metrics for normal view
- Technical metrics for developer view

### Smart Navigation
- Context-aware command buttons that switch views automatically
- Seamless transitions between normal and developer views
- Smooth scrolling to relevant sections

### Multi-Theme Support
- **Matrix Theme**: Classic black/green terminal aesthetic
- **macOS Terminal**: Soft dark theme with neon colors
- **Ubuntu Terminal**: Dark purple with Ubuntu green
- Professional terminal styling with smooth transitions

### Mobile Responsive
- Mobile disclaimer for optimal desktop viewing
- Responsive grid layouts
- Touch-friendly interface elements

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubhxcluzive/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Deployment

### Recommended Stack: Vercel + Render + Neon

This project is optimized for the best free deployment stack:

- **Frontend**: Vercel (React app with global CDN)
- **Backend**: Render (Node.js API with WebSocket support)
- **Database**: Neon (Serverless PostgreSQL)

#### Quick Deploy

1. **Run the deployment script**:
   ```bash
   ./scripts/deploy.sh
   ```

2. **Choose option 1** for the complete Vercel + Render + Neon stack

3. **Follow the step-by-step guide** to deploy all components

#### Alternative Options

- **GitHub Pages + Render**: Traditional static hosting
- **Railway**: All-in-one platform
- **Vercel**: Frontend-only deployment

#### Why This Stack?

| Component | Platform | Free Tier | Performance | Features |
|-----------|----------|-----------|-------------|----------|
| **Frontend** | Vercel | ✅ Unlimited | ⭐⭐⭐⭐⭐ | Global CDN, Auto-deploy |
| **Backend** | Render | ✅ 750h/month | ⭐⭐⭐⭐⭐ | WebSocket support, No cold starts |
| **Database** | Neon | ✅ 3GB storage | ⭐⭐⭐⭐⭐ | Serverless, Auto-scaling |

For detailed deployment instructions, see [DEPLOYMENT-VERCEL-RENDER-NEON.md](DEPLOYMENT-VERCEL-RENDER-NEON.md).

## Project Structure

```
Portfolio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts (view, theme)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   └── ui/             # Reusable UI components
│   ├── index.html
│   └── package.json
├── server/                 # Backend Node.js server
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage
├── shared/                 # Shared TypeScript types
│   └── schema.ts
├── drizzle.config.ts      # Database configuration
└── package.json
```

## Usage Guide

### View Modes

#### Normal View (Default)
- **Target Audience**: HR professionals, recruiters, non-technical stakeholders
- **Features**:
  - Professional summary and business metrics
  - Work experience timeline
  - Project highlights
  - Simplified system metrics

#### Developer View
- **Target Audience**: Technical recruiters, fellow developers
- **Features**:
  - Interactive API playground
  - Live system monitoring
  - Real-time activity logs
  - Technical skills tree
  - Detailed project information

### Navigation Commands

| Command | Normal View | Developer View |
|---------|-------------|----------------|
| `./Skills` | View technical stack | View technical stack |
| `./Experience` | Work history | Switch to Normal View |
| `./Projects` | Code repositories | Code repositories |
| `./API` | Switch to Developer View | Interactive playground |

### Theme Switching

Click the theme switcher in the control panel to cycle through:
1. **Matrix** - Classic terminal green
2. **macOS Terminal** - Soft dark theme
3. **Ubuntu Terminal** - Dark purple theme

## API Endpoints

### Available Endpoints

| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `/api/profile` | GET | Personal information | Profile data |
| `/api/skills` | GET | Technical skills | Skills categories |
| `/api/experience` | GET | Work experience | Experience timeline |
| `/api/projects` | GET | Project portfolio | Project details |
| `/api/metrics` | GET | System metrics | Performance data |
| `/api/logs` | GET | Activity logs | Real-time logs |
| `/api/visitors/stats` | GET | Visitor statistics | Analytics data |

### WebSocket Events

| Event | Description | Data |
|-------|-------------|------|
| `system_activity` | System monitoring updates | Activity logs |
| `visitor_connected` | New visitor connection | Visitor data |
| `api_request` | API call tracking | Request details |

## Technical Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **TanStack Query** - Data fetching
- **WebSocket** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database operations
- **SQLite** - Database (development)

### Development Tools
- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Drizzle Kit** - Database migrations

## Customization

### Adding New Projects

1. **Update the database schema** in `shared/schema.ts`
2. **Add project data** to the database
3. **The project will automatically appear** in the projects section

### Modifying Skills

1. **Edit skills data** in the database
2. **Skills are categorized** by backend, database/cloud, AI/ML & DevOps
3. **Different displays** for normal vs developer views

### Customizing Themes

1. **Add new theme** in `client/src/components/theme-switcher.tsx`
2. **Define CSS variables** for colors and styling
3. **Update theme array** with new theme information

## Performance Features

### Real-Time Monitoring
- **API Response Time**: Live monitoring of endpoint performance
- **Database Queries**: Query count and performance tracking
- **Server Load**: CPU and memory usage monitoring
- **Visitor Analytics**: Real-time visitor tracking

### Optimization
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Optimized project images
- **Caching**: API response caching
- **WebSocket**: Efficient real-time updates

## Security Features

- **Rate Limiting**: API endpoint protection
- **Input Validation**: Sanitized user inputs
- **CORS Configuration**: Cross-origin request handling
- **Environment Variables**: Secure configuration management

## Deployment

### Production Build

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Set up production environment**
   ```bash
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=your_production_db_url
   ```

3. **Start production server**
   ```bash
   npm start
   ```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 3000 |
| `DATABASE_URL` | Database connection | sqlite:./dev.db |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: shubh.message@gmail.com
- **LinkedIn**: [shubhxcluzive](https://linkedin.com/in/shubhxcluzive)
- **GitHub**: [shubhxcluzive](https://github.com/shubhxcluzive)
- **LeetCode**: [shubhxcluzive](https://leetcode.com/shubhxcluzive)

## Acknowledgments

- Terminal UI inspiration from classic Unix terminals
- Matrix rain effect for authentic terminal aesthetic
- Real-time features powered by WebSocket technology
- Modern React patterns and best practices

---

**Built by Shubham Singh**

*Backend Engineer | API Developer | System Architect*