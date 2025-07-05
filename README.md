# Backend Developer Portfolio

A modern, terminal-themed portfolio website designed specifically for backend developers. Features an interactive API playground, real-time system monitoring, and a matrix-style interface that showcases backend development skills through an authentic hacker aesthetic.

## 🚀 Live Demo

The portfolio simulates a real backend engineer's terminal environment with:
- Interactive command-line navigation
- Live API endpoint testing
- Real-time WebSocket connections
- System metrics monitoring
- Code preview with syntax highlighting

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for development and building
- **Tailwind CSS** with custom terminal theme
- **shadcn/ui** component library
- **TanStack Query** for state management
- **Wouter** for routing
- **WebSocket** for real-time features

### Backend
- **Express.js** with TypeScript
- **WebSocket Server** for live activity feeds
- **Drizzle ORM** with PostgreSQL support
- **In-memory storage** for development
- **RESTful API** architecture

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5000`

## 🏗️ Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and configurations
│   │   └── pages/          # Page components
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes and WebSocket
│   ├── storage.ts         # Data storage layer
│   └── vite.ts            # Vite integration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema definitions
└── README.md
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Database (optional - uses in-memory storage by default)
DATABASE_URL=postgresql://username:password@localhost:5432/portfolio

# Development
NODE_ENV=development
PORT=5000
```

### Customization

#### Personal Information
Update your details in `server/storage.ts`:
- Profile information
- Skills and technologies
- Work experience
- Projects and achievements

#### Theme Colors
Modify the terminal theme in `client/src/index.css`:
- Matrix green: `--matrix`
- Terminal background: `--terminal-bg`
- Accent colors: `--cyan-glow`, `--amber-glow`

## 🚀 Deployment

### Replit (Recommended)
1. Import project to Replit
2. Click "Deploy" button
3. Get your `.replit.app` domain

### Vercel
```bash
npm run build
npx vercel --prod
```

### Railway
```bash
railway login
railway init
railway up
```

### Docker
```bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 5000:5000 portfolio
```

## 📡 API Endpoints

The portfolio includes a complete REST API:

- `GET /api/profile` - Personal profile information
- `GET /api/skills` - Technical skills categorized
- `GET /api/experience` - Work experience history
- `GET /api/projects` - Portfolio projects with code
- `GET /api/metrics` - Performance achievements
- `GET /api/logs` - Activity logs with pagination
- `WebSocket /ws` - Real-time system updates

## 🎨 Features

### Interactive Terminal
- Authentic command-line interface
- Smooth scrolling navigation
- Matrix rain background effect
- Terminal-style typography

### API Playground
- Test all endpoints interactively
- Real-time response display
- HTTP status and timing information
- Live activity monitoring

### Real-time Monitoring
- WebSocket connections
- Live system metrics
- Animated progress bars
- Background activity feeds

### Code Showcase
- Syntax-highlighted code previews
- Database schema visualizations
- Project demonstrations
- GitHub integration

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:push      # Deploy database schema
```

### Adding New Sections
1. Update `shared/schema.ts` for data models
2. Add storage methods in `server/storage.ts`
3. Create API routes in `server/routes.ts`
4. Build React components in `client/src/components/`

### WebSocket Integration
Real-time features use WebSocket connections:
- System activity broadcasting
- Live metrics updates
- API request monitoring

## 🔒 Security

- Input validation with Zod schemas
- CORS configuration
- Rate limiting ready
- Environment variable protection

## 📄 License

MIT License - feel free to use this template for your own portfolio.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Contact

- **Email**: shubh.message@gmail.com
- **GitHub**: [github.com/shubhxcluzive](https://github.com/shubhxcluzive)
- **LinkedIn**: [linkedin.com/in/shubhxcluzive](https://linkedin.com/in/shubhxcluzive)

---

Built with ❤️ for the backend developer community