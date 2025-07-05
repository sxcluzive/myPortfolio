# Development Guide

This guide covers the development setup, coding standards, and workflow for contributing to the portfolio project.

## 🛠️ Development Setup

### Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm or yarn** - Package managers
- **Git** - Version control
- **VS Code** (Recommended) - Code editor

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubhxcluzive/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   ```

3. **Environment setup**
   ```bash
   # Create environment file
   cp .env.example .env
   
   # Edit .env with your configuration
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=sqlite:./dev.db
   ```

4. **Database setup**
   ```bash
   # Push database schema
   npm run db:push
   
   # Optional: Open database studio
   npm run db:studio
   ```

5. **Start development server**
   ```bash
   cd client
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

### Directory Organization

```
Portfolio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ui/         # Reusable UI components
│   │   │   └── *.tsx       # Feature components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   └── lib/            # Utilities and configurations
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Backend Node.js server
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage
├── shared/                 # Shared TypeScript types
│   └── schema.ts          # Database schema
├── drizzle.config.ts      # Database configuration
└── package.json
```

### File Naming Conventions

- **Components**: `kebab-case.tsx` (e.g., `hero-section.tsx`)
- **Hooks**: `use-kebab-case.tsx` (e.g., `use-websocket.tsx`)
- **Contexts**: `kebab-case-context.tsx` (e.g., `theme-context.tsx`)
- **Utilities**: `kebab-case.ts` (e.g., `utils.ts`)
- **Types**: `kebab-case.ts` (e.g., `schema.ts`)

## 🎨 Coding Standards

### TypeScript Guidelines

#### Type Definitions

```typescript
// Use interfaces for object shapes
interface User {
  id: number;
  name: string;
  email: string;
}

// Use types for unions and complex types
type Theme = 'matrix' | 'macos' | 'ubuntu' | 'light';

// Use enums sparingly, prefer const assertions
const API_ENDPOINTS = {
  PROFILE: '/api/profile',
  SKILLS: '/api/skills',
  EXPERIENCE: '/api/experience',
  PROJECTS: '/api/projects',
} as const;
```

#### Component Props

```typescript
// Define props interface
interface ComponentProps {
  title: string;
  description?: string; // Optional props
  onAction: (id: number) => void; // Function props
  children?: React.ReactNode; // Children prop
}

// Use destructuring with defaults
const Component = ({ 
  title, 
  description = 'Default description',
  onAction,
  children 
}: ComponentProps) => {
  // Component implementation
};
```

#### Error Handling

```typescript
// Use try-catch for async operations
const fetchData = async (): Promise<Data> => {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

// Use Result pattern for better error handling
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

const safeFetch = async (url: string): Promise<Result<Data>> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};
```

### React Best Practices

#### Component Structure

```typescript
// 1. Imports
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Types/Interfaces
interface ComponentProps {
  // Props definition
}

// 3. Component
export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 4. State
  const [localState, setLocalState] = useState<string>('');
  
  // 5. Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 6. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

#### Custom Hooks

```typescript
// Custom hook for data fetching
export const useData = (id: number) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await api.getData(id);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};
```

#### Context Usage

```typescript
// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('matrix');

  const value = {
    theme,
    setTheme,
    cycleTheme: () => {
      // Theme cycling logic
    }
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

### CSS/Styling Guidelines

#### Tailwind CSS Usage

```typescript
// Use Tailwind classes for styling
const Button: React.FC<ButtonProps> = ({ variant = 'primary', children }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
};
```

#### CSS Variables for Themes

```css
/* Define CSS variables for themes */
:root {
  --primary: #00ff00;
  --background: #000000;
  --text: #ffffff;
}

[data-theme="macos"] {
  --primary: #007aff;
  --background: #1e1e1e;
  --text: #ffffff;
}

[data-theme="light"] {
  --primary: #2563eb;
  --background: #ffffff;
  --text: #000000;
}
```

## 🔧 Development Workflow

### Git Workflow

#### Branch Naming

```bash
# Feature branches
feature/add-api-playground
feature/theme-switcher
feature/real-time-metrics

# Bug fixes
fix/websocket-connection
fix/theme-persistence

# Hotfixes
hotfix/security-vulnerability
```

#### Commit Messages

```bash
# Use conventional commits
feat: add API playground component
fix: resolve WebSocket connection issues
docs: update README with deployment instructions
style: improve button hover effects
refactor: extract theme logic into custom hook
test: add unit tests for API endpoints
```

#### Pull Request Process

1. **Create feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/new-feature
   # Create PR on GitHub
   ```

4. **Code review and merge**
   - Request review from maintainers
   - Address feedback
   - Merge when approved

### Development Scripts

#### Available Commands

```json
{
  "scripts": {
    "dev": "cd client && npm run dev",
    "build": "cd client && npm run build",
    "start": "cd client && npm start",
    "test": "npm run test:unit && npm run test:integration",
    "test:unit": "jest",
    "test:integration": "playwright test",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "db:generate": "drizzle-kit generate"
  }
}
```

#### Development Workflow

```bash
# 1. Start development
npm run dev

# 2. In another terminal, run tests
npm run test

# 3. Check code quality
npm run lint
npm run type-check

# 4. Format code
npm run format

# 5. Build for production
npm run build
```

## 🧪 Testing Strategy

### Unit Testing

#### Component Testing

```typescript
// __tests__/components/hero-section.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroSection } from '../../components/hero-section';

describe('HeroSection', () => {
  it('renders available commands', () => {
    render(<HeroSection />);
    
    expect(screen.getByText('./Skills')).toBeInTheDocument();
    expect(screen.getByText('./Experience')).toBeInTheDocument();
    expect(screen.getByText('./Projects')).toBeInTheDocument();
  });

  it('handles command clicks', () => {
    const mockScrollTo = jest.fn();
    window.scrollTo = mockScrollTo;
    
    render(<HeroSection />);
    
    fireEvent.click(screen.getByText('./Skills'));
    
    expect(mockScrollTo).toHaveBeenCalled();
  });
});
```

#### Hook Testing

```typescript
// __tests__/hooks/use-websocket.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useWebSocket } from '../../hooks/use-websocket';

describe('useWebSocket', () => {
  it('connects to WebSocket', () => {
    const { result } = renderHook(() => useWebSocket());
    
    expect(result.current.isConnected).toBe(false);
    
    // Simulate connection
    act(() => {
      // Mock WebSocket connection
    });
    
    expect(result.current.isConnected).toBe(true);
  });
});
```

#### API Testing

```typescript
// __tests__/api/routes.test.ts
import request from 'supertest';
import { app } from '../../server';

describe('API Routes', () => {
  describe('GET /api/profile', () => {
    it('returns profile data', async () => {
      const response = await request(app)
        .get('/api/profile')
        .expect(200);
      
      expect(response.body.data.name).toBe('Shubham Singh');
      expect(response.body.data.title).toBe('Software Engineer 2 (Backend)');
    });
  });

  describe('GET /api/skills', () => {
    it('returns skills data', async () => {
      const response = await request(app)
        .get('/api/skills')
        .expect(200);
      
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data[0]).toHaveProperty('category');
      expect(response.body.data[0]).toHaveProperty('skills');
    });
  });
});
```

### Integration Testing

#### End-to-End Testing

```typescript
// tests/e2e/portfolio.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Portfolio', () => {
  test('loads main page', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    await expect(page.locator('h1')).toContainText('Shubham Singh');
    await expect(page.locator('text=./Skills')).toBeVisible();
  });

  test('switches themes', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const themeButton = page.locator('[data-testid="theme-switcher"]');
    await themeButton.click();
    
    // Check if theme changed
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'macos');
  });

  test('navigates to sections', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    await page.click('text=./Skills');
    await expect(page.locator('#skills')).toBeVisible();
    
    await page.click('text=./Projects');
    await expect(page.locator('#projects')).toBeVisible();
  });
});
```

### Test Configuration

#### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

#### Playwright Configuration

```typescript
// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Chrome',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'Safari',
      use: { browserName: 'webkit' },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
```

## 🔍 Code Quality Tools

### ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'jsx-a11y/anchor-is-valid': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

### Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

## 📊 Performance Monitoring

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Check for unused dependencies
npx depcheck
```

### Performance Testing

```typescript
// tests/performance/lighthouse.spec.ts
import { test, expect } from '@playwright/test';

test('Lighthouse performance audit', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const lighthouse = await page.evaluate(() => {
    // Run Lighthouse audit
    return window.lighthouse;
  });
  
  expect(lighthouse.performance).toBeGreaterThan(90);
  expect(lighthouse.accessibility).toBeGreaterThan(90);
  expect(lighthouse.bestPractices).toBeGreaterThan(90);
  expect(lighthouse.seo).toBeGreaterThan(90);
});
```

### Memory Leak Detection

```typescript
// Monitor memory usage in development
const logMemoryUsage = () => {
  const used = process.memoryUsage();
  console.log({
    rss: `${Math.round(used.rss / 1024 / 1024 * 100) / 100} MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100} MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`,
    external: `${Math.round(used.external / 1024 / 1024 * 100) / 100} MB`,
  });
};

setInterval(logMemoryUsage, 30000);
```

## 🔄 Database Development

### Schema Changes

```typescript
// shared/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Add new table
export const newTable = sqliteTable('new_table', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// Update existing table
export const updatedTable = sqliteTable('existing_table', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'), // New column
  updatedAt: integer('updated_at', { mode: 'timestamp' }), // New column
});
```

### Migration Commands

```bash
# Generate migration
npm run db:generate

# Apply migration
npm run db:push

# View database
npm run db:studio
```

### Seed Data

```typescript
// scripts/seed.ts
import { db } from '../server/storage';
import { profiles, skills, experiences, projects } from '../shared/schema';

const seedData = async () => {
  // Insert seed data
  await db.insert(profiles).values({
    name: 'Shubham Singh',
    title: 'Software Engineer 2 (Backend)',
    location: 'Remote',
    linkedin: 'https://linkedin.com/in/shubhxcluzive',
    leetcode: 'https://leetcode.com/shubhxcluzive',
    experience: 4,
  });
  
  // Add more seed data...
};

seedData().catch(console.error);
```

## 🚀 Debugging

### Development Tools

#### React DevTools
- Install React DevTools browser extension
- Use Profiler for performance analysis
- Check component tree and props

#### Redux DevTools (if using Redux)
- Install Redux DevTools browser extension
- Monitor state changes
- Time-travel debugging

#### Network Tab
- Monitor API requests
- Check WebSocket connections
- Analyze response times

### Debugging Techniques

#### Console Logging

```typescript
// Use structured logging
console.group('API Request');
console.log('Endpoint:', endpoint);
console.log('Method:', method);
console.log('Data:', data);
console.groupEnd();

// Use different log levels
console.debug('Debug info');
console.info('Info message');
console.warn('Warning message');
console.error('Error message');
```

#### Error Boundaries

```typescript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

#### Debug Mode

```typescript
// Enable debug mode in development
const DEBUG = process.env.NODE_ENV === 'development';

const debugLog = (...args: any[]) => {
  if (DEBUG) {
    console.log('[DEBUG]', ...args);
  }
};

// Use in components
useEffect(() => {
  debugLog('Component mounted');
}, []);
```

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)

### Tools
- [VS Code Extensions](https://marketplace.visualstudio.com/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Postman](https://www.postman.com/) - API testing
- [Insomnia](https://insomnia.rest/) - API client

### Best Practices
- [React Best Practices](https://react.dev/learn)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/)
- [Web Performance](https://web.dev/performance/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

This development guide provides comprehensive information for contributing to the portfolio project. Follow these guidelines to maintain code quality and consistency across the codebase. 