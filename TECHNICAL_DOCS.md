# Technical Documentation

## 🏗️ Architecture Overview

The portfolio is built as a full-stack TypeScript application with a React frontend and Node.js backend, featuring real-time WebSocket communication and a terminal-themed UI.

### System Architecture

```
┌─────────────────┐    WebSocket    ┌─────────────────┐
│   React Client  │ ◄─────────────► │  Node.js Server │
│   (Frontend)    │                 │   (Backend)     │
└─────────────────┘                 └─────────────────┘
         │                                   │
         │ HTTP/API                          │
         ▼                                   ▼
┌─────────────────┐                 ┌─────────────────┐
│   TanStack      │                 │   Drizzle ORM   │
│   Query Cache   │                 │   (Database)    │
└─────────────────┘                 └─────────────────┘
```

## 📁 Project Structure Deep Dive

### Frontend Architecture (`client/`)

```
client/src/
├── components/           # React components
│   ├── api-section.tsx   # API playground component
│   ├── experience-section.tsx
│   ├── hero-section.tsx  # Main landing section
│   ├── projects-section.tsx
│   ├── skills-section.tsx
│   ├── system-metrics.tsx # Real-time metrics display
│   ├── terminal-header.tsx # Terminal-style header
│   ├── theme-switcher.tsx # Theme management
│   └── ui/               # Reusable UI components
├── contexts/             # React contexts
│   ├── theme-context.tsx # Theme state management
│   └── view-context.tsx  # View mode state
├── hooks/                # Custom React hooks
│   ├── use-mobile.tsx    # Mobile detection
│   ├── use-toast.ts      # Toast notifications
│   └── use-websocket.tsx # WebSocket connection
├── pages/                # Page components
│   ├── not-found.tsx     # 404 page
│   └── portfolio.tsx     # Main portfolio page
└── lib/                  # Utilities
    ├── queryClient.ts    # TanStack Query config
    └── utils.ts          # Helper functions
```

### Backend Architecture (`server/`)

```
server/
├── index.ts              # Main server entry point
├── routes.ts             # API route definitions
└── storage.ts            # Data storage layer
```

### Shared Types (`shared/`)

```
shared/
└── schema.ts             # Database schema definitions
```

## 🔧 Component Documentation

### Core Components

#### 1. Hero Section (`hero-section.tsx`)
**Purpose**: Main landing section with terminal interface
**Key Features**:
- Terminal command prompt simulation
- Available commands navigation
- Profile card with system status
- Mobile disclaimer

**Props**: None
**State**: Local state for command execution
**Dependencies**: `useViewContext`, `useThemeContext`

#### 2. Terminal Header (`terminal-header.tsx`)
**Purpose**: Authentic terminal header with system indicators
**Key Features**:
- Window control buttons (minimize, maximize, close)
- Connection status indicator
- Real-time clock
- Professional terminal styling

**Props**:
```typescript
interface TerminalHeaderProps {
  theme: Theme;
  isConnected: boolean;
}
```

#### 3. API Section (`api-section.tsx`)
**Purpose**: Interactive API playground for testing endpoints
**Key Features**:
- Live API testing interface
- Syntax-highlighted JSON responses
- Response metadata (status, timing)
- Real-time activity logs

**Props**: None
**State**: API response state, loading states
**Dependencies**: `useQuery`, `useWebSocket`

#### 4. System Metrics (`system-metrics.tsx`)
**Purpose**: Real-time system monitoring display
**Key Features**:
- Live performance metrics
- Visitor tracking
- Business impact metrics (Normal view)
- Technical metrics (Developer view)

**Props**:
```typescript
interface SystemMetricsProps {
  view: 'normal' | 'dev';
}
```

### Context Providers

#### Theme Context (`contexts/theme-context.tsx`)
**Purpose**: Global theme state management
**Features**:
- Theme switching logic
- System theme detection
- Theme persistence
- Real-time theme updates

**Context Value**:
```typescript
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
}
```

#### View Context (`contexts/view-context.tsx`)
**Purpose**: View mode state management
**Features**:
- Normal/Developer view switching
- View-specific component rendering
- Smart navigation logic

**Context Value**:
```typescript
interface ViewContextType {
  view: 'normal' | 'dev';
  setView: (view: 'normal' | 'dev') => void;
  toggleView: () => void;
}
```

### Custom Hooks

#### useWebSocket (`hooks/use-websocket.tsx`)
**Purpose**: WebSocket connection management
**Features**:
- Automatic connection handling
- Reconnection logic
- Event handling
- Connection status tracking

**Return Value**:
```typescript
interface WebSocketHook {
  isConnected: boolean;
  sendMessage: (message: any) => void;
  lastMessage: any;
}
```

#### useMobile (`hooks/use-mobile.tsx`)
**Purpose**: Mobile device detection
**Features**:
- Screen size detection
- Touch device detection
- Responsive behavior triggers

## 🔌 API Documentation

### REST Endpoints

#### Profile Endpoint
```http
GET /api/profile
```
**Response**:
```json
{
  "status": 200,
  "data": {
    "id": 1,
    "name": "Shubham Singh",
    "title": "Software Engineer 2 (Backend)",
    "location": "Remote",
    "linkedin": "https://linkedin.com/in/shubhxcluzive",
    "leetcode": "https://leetcode.com/shubhxcluzive",
    "experience": 4
  }
}
```

#### Skills Endpoint
```http
GET /api/skills
```
**Response**:
```json
{
  "status": 200,
  "data": [
    {
      "id": 2,
      "category": "Backend",
      "skills": ["Node.js", "Python", "Java", "Go"],
      "description": "Core backend technologies"
    }
  ]
}
```

#### Experience Endpoint
```http
GET /api/experience
```
**Response**:
```json
{
  "status": 200,
  "data": [
    {
      "id": 5,
      "company": "Sierra Nevada Corporation",
      "position": "Software Engineer 2",
      "duration": "2022 - Present",
      "description": "Backend development..."
    }
  ]
}
```

#### Projects Endpoint
```http
GET /api/projects
```
**Response**:
```json
{
  "status": 200,
  "data": [
    {
      "id": 8,
      "name": "Natural Language Processing API",
      "description": "Advanced NLP service...",
      "technologies": ["Python", "FastAPI", "TensorFlow"],
      "github": "https://github.com/...",
      "image": "project-image.jpg"
    }
  ]
}
```

#### Metrics Endpoint
```http
GET /api/metrics
```
**Response**:
```json
{
  "status": 200,
  "data": [
    {
      "id": 10,
      "category": "performance",
      "metric": "API Response Time",
      "value": "12ms",
      "description": "Average API response time"
    }
  ]
}
```

#### Logs Endpoint
```http
GET /api/logs
```
**Response**:
```json
{
  "status": 200,
  "data": [
    {
      "activity": "API rate limit check",
      "timestamp": "2024-01-15T10:30:00Z",
      "type": "system"
    }
  ]
}
```

### WebSocket Events

#### System Activity Event
```typescript
// Emitted by server
{
  type: 'system_activity',
  data: {
    activity: string;
    timestamp: string;
    type: 'system' | 'api' | 'visitor';
  }
}
```

#### Visitor Connected Event
```typescript
// Emitted when new visitor connects
{
  type: 'visitor_connected',
  data: {
    visitorId: string;
    timestamp: string;
    userAgent: string;
  }
}
```

## 🎨 Theme System

### Theme Definitions

```typescript
interface Theme {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
    terminal: string;
    matrix: string;
  };
}
```

### Available Themes

1. **Matrix Theme**
   - Classic black/green terminal aesthetic
   - Matrix rain background effect
   - High contrast for readability

2. **macOS Terminal**
   - Soft dark theme with neon colors
   - Professional appearance
   - Good for extended viewing

3. **Ubuntu Terminal**
   - Dark purple with Ubuntu green
   - Linux terminal aesthetic
   - Balanced contrast

### Theme Switching Logic

```typescript
const themes: Theme[] = [
  matrixTheme,
  macosTheme,
  ubuntuTheme
];

const cycleTheme = () => {
  const currentIndex = themes.findIndex(t => t.name === theme.name);
  const nextIndex = (currentIndex + 1) % themes.length;
  setTheme(themes[nextIndex]);
};
```

## 📊 Real-Time Features

### WebSocket Implementation

#### Server-Side (`server/routes.ts`)
```typescript
// WebSocket server setup
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  // Handle new connections
  broadcastVisitorConnected();
  
  ws.on('message', (data) => {
    // Handle incoming messages
  });
  
  ws.on('close', () => {
    // Handle disconnections
  });
});
```

#### Client-Side (`hooks/use-websocket.tsx`)
```typescript
const useWebSocket = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    
    socket.onopen = () => setIsConnected(true);
    socket.onclose = () => setIsConnected(false);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle different message types
    };
    
    setWs(socket);
    
    return () => socket.close();
  }, []);
  
  return { isConnected, sendMessage: ws?.send };
};
```

### Activity Logging System

#### Server Activity Generation
```typescript
// Generate system activities
const generateSystemActivity = () => {
  const activities = [
    'API rate limit check',
    'Database connection pool',
    'Cache hit ratio: 94%',
    'Memory usage: 256MB',
    'CPU utilization: 12%',
    'Background job processing',
    'Health check: All systems operational'
  ];
  
  return activities[Math.floor(Math.random() * activities.length)];
};
```

#### Real-Time Broadcasting
```typescript
const broadcastActivity = (activity: string) => {
  const message = {
    type: 'system_activity',
    data: {
      activity,
      timestamp: new Date().toISOString(),
      type: 'system'
    }
  };
  
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};
```

## 🔒 Security Implementation

### Rate Limiting
```typescript
// Simple in-memory rate limiting
const rateLimit = new Map();

const checkRateLimit = (ip: string, limit: number = 100, window: number = 60000) => {
  const now = Date.now();
  const windowStart = now - window;
  
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, []);
  }
  
  const requests = rateLimit.get(ip).filter(time => time > windowStart);
  rateLimit.set(ip, requests);
  
  if (requests.length >= limit) {
    return false;
  }
  
  requests.push(now);
  return true;
};
```

### Input Validation
```typescript
// Using Zod for schema validation
import { z } from 'zod';

const apiRequestSchema = z.object({
  endpoint: z.string().min(1),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
  data: z.any().optional()
});

const validateRequest = (data: unknown) => {
  return apiRequestSchema.safeParse(data);
};
```

### CORS Configuration
```typescript
// CORS setup for development and production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000'],
  credentials: true
}));
```

## 📱 Responsive Design

### Mobile Detection
```typescript
const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};
```

### Responsive Breakpoints
```css
/* Tailwind CSS breakpoints */
.sm: 640px   /* Small devices */
.md: 768px   /* Medium devices */
.lg: 1024px  /* Large devices */
.xl: 1280px  /* Extra large devices */
```

## 🚀 Performance Optimization

### Code Splitting
```typescript
// Lazy loading for heavy components
const ApiSection = lazy(() => import('./components/api-section'));
const SystemMetrics = lazy(() => import('./components/system-metrics'));

// Suspense wrapper
<Suspense fallback={<div>Loading...</div>}>
  <ApiSection />
</Suspense>
```

### Query Caching
```typescript
// TanStack Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});
```

### Image Optimization
```typescript
// Lazy loading images
const LazyImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setIsLoaded(true)}
      className={`transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      {...props}
    />
  );
};
```

## 🧪 Testing Strategy

### Component Testing
```typescript
// Example test for HeroSection
import { render, screen } from '@testing-library/react';
import { HeroSection } from './hero-section';

describe('HeroSection', () => {
  it('renders available commands', () => {
    render(<HeroSection />);
    expect(screen.getByText('./Skills')).toBeInTheDocument();
    expect(screen.getByText('./Experience')).toBeInTheDocument();
  });
});
```

### API Testing
```typescript
// Example API test
describe('API Endpoints', () => {
  it('GET /api/profile returns profile data', async () => {
    const response = await request(app).get('/api/profile');
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe('Shubham Singh');
  });
});
```

## 🔧 Development Workflow

### Available Scripts
```json
{
  "scripts": {
    "dev": "cd client && npm run dev",
    "build": "cd client && npm run build",
    "start": "cd client && npm start",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
```

### Environment Setup
```bash
# Development
NODE_ENV=development
PORT=3000
DATABASE_URL=sqlite:./dev.db

# Production
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:port/db
```

## 📈 Monitoring and Analytics

### Performance Metrics
- API response times
- Database query performance
- Memory usage tracking
- CPU utilization monitoring

### Visitor Analytics
- Real-time visitor tracking
- Page view analytics
- Session duration tracking
- Geographic distribution

### Error Tracking
- API error logging
- Client-side error reporting
- Performance monitoring
- System health checks

---

This technical documentation provides a comprehensive overview of the portfolio's architecture, implementation details, and development guidelines. For specific implementation questions, refer to the source code in the respective files. 