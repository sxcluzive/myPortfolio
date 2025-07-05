# replit.md

## Overview

This is a React-based portfolio application built with Express.js backend, featuring a terminal-themed UI that showcases a backend engineer's profile, skills, experience, and projects. The application uses a full-stack TypeScript architecture with modern tooling and practices.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom terminal/matrix theme
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Storage**: connect-pg-simple for PostgreSQL session storage
- **Real-time Communication**: WebSocket server for live activity feeds
- **Development**: Hot module replacement via Vite integration

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Session Store**: PostgreSQL-based session storage
- **Development Fallback**: In-memory storage implementation for development

## Key Components

### Database Schema
Located in `shared/schema.ts`, defines:
- **Profiles**: Personal information and contact details
- **Skills**: Categorized technical skills and technologies
- **Experiences**: Work history with achievements and technologies used
- **Projects**: Portfolio projects with code previews and GitHub links
- **Metrics**: Performance and system metrics
- **Activity Logs**: API request logging and system activity tracking

### API Layer
RESTful API endpoints:
- `GET /api/profile` - Fetch personal profile information
- `GET /api/skills` - Retrieve categorized skills
- `GET /api/experience` - Get work experience history
- `GET /api/projects` - Fetch portfolio projects
- `GET /api/metrics` - System performance metrics
- `GET /api/logs` - Activity logs with pagination

### Frontend Components
- **Terminal Interface**: Matrix-themed UI with authentic terminal aesthetics
- **Interactive Sections**: Profile, skills tree, experience timeline, project showcase
- **Real-time Features**: Live API monitoring and WebSocket activity feeds
- **Responsive Design**: Mobile-first approach with terminal styling

### Real-time Features
- WebSocket server for live activity broadcasting
- Real-time API request monitoring
- Live system metrics updates
- Activity log streaming

## Data Flow

1. **Client Request**: React components use TanStack Query to fetch data from API endpoints
2. **API Processing**: Express routes handle requests and interact with storage layer
3. **Data Retrieval**: Storage layer (Drizzle ORM or MemStorage) queries database/memory
4. **Response**: JSON data returned to client with consistent error handling
5. **State Management**: TanStack Query caches responses and manages loading states
6. **Real-time Updates**: WebSocket broadcasts system activities to connected clients

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management for React
- **@radix-ui/***: Headless UI component primitives
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type safety and development experience
- **drizzle-kit**: Database schema management and migrations
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Deployment Strategy

### Build Process
1. Frontend build via Vite (`vite build`)
2. Backend compilation with esbuild for Node.js target
3. Static assets served from `dist/public`
4. Server bundle output to `dist/index.js`

### Environment Configuration
- **Development**: Uses Vite dev server with HMR and WebSocket proxy
- **Production**: Serves static files through Express with WebSocket support
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Deployment Commands
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build
- `npm run start`: Production server
- `npm run db:push`: Database schema deployment

## Changelog
```
Changelog:
- July 05, 2025. Initial setup
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```