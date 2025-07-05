import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { v4 as uuidv4 } from 'uuid';

// Visitor tracking middleware
function trackVisitor(req: any, res: any, next: any) {
  const visitorId = req.cookies?.visitorId || uuidv4();
  const ipAddress = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
  const userAgent = req.headers['user-agent'];
  const page = req.path;

  // Set visitor cookie if not exists
  if (!req.cookies?.visitorId) {
    res.cookie('visitorId', visitorId, { 
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true 
    });
  }

  // Track visitor activity
  storage.trackVisitor({
    visitorId,
    ipAddress,
    userAgent,
    pagesVisited: [page]
  }).then(() => {
    // Log visitor activity
    storage.createActivityLog({
      activity: `Visitor ${visitorId.slice(0, 8)}... visited ${page}`,
      type: 'visitor',
      visitorId,
      ipAddress,
      userAgent,
      page
    });
  }).catch(console.error);

  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: 200, 
      message: "Portfolio API is running",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // Apply visitor tracking only to page routes, not API routes
  app.use((req, res, next) => {
    // Only track visitors for page requests, not API calls
    if (!req.path.startsWith('/api/')) {
      trackVisitor(req, res, next);
    } else {
      next();
    }
  });

  // Server-Sent Events endpoint for real-time activity logs
  app.get("/api/events", (req, res) => {
    // Set SSE headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    });

    // Send initial connection message
    res.write(`data: ${JSON.stringify({
      type: 'connection',
      message: 'Connected to portfolio activity stream',
      timestamp: new Date().toISOString()
    })}\n\n`);

    // Send periodic system updates
    const systemUpdateInterval = setInterval(() => {
      const activities = [
        'Database connection pool: 8/10 connections active',
        'Cache hit ratio: 94.2%',
        'Background job processed: email_notification',
        'API rate limit check: 45/100 requests',
        'Health check: All services operational',
        'Memory usage: 2.1GB / 4GB',
        'CPU utilization: 32%',
        'Active sessions: 12'
      ];
      
      const activity = activities[Math.floor(Math.random() * activities.length)];
      
      // Store system activity in logs
      storage.createActivityLog({
        activity,
        type: 'system'
      });

      // Send SSE event
      res.write(`data: ${JSON.stringify({
        type: 'system_activity',
        message: activity,
        timestamp: new Date().toISOString()
      })}\n\n`);
    }, 3000);

    // Handle client disconnect
    req.on('close', () => {
      console.log('SSE client disconnected');
      clearInterval(systemUpdateInterval);
    });

    req.on('error', (error) => {
      console.error('SSE error:', error);
      clearInterval(systemUpdateInterval);
    });
  });

  // Visitor tracking endpoints
  app.get("/api/visitors/active", async (req, res) => {
    try {
      const activeVisitors = await storage.getActiveVisitors();
      res.json({ status: 200, data: activeVisitors });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch active visitors" });
    }
  });

  app.get("/api/visitors/stats", async (req, res) => {
    try {
      const stats = await storage.getVisitorStats();
      res.json({ status: 200, data: stats });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch visitor stats" });
    }
  });

  app.post("/api/visitors/activity", async (req, res) => {
    try {
      const { visitorId, page } = req.body;
      const visitor = await storage.updateVisitorActivity(visitorId, page);
      
      // Log page visit
      await storage.createActivityLog({
        activity: `Visitor ${visitorId.slice(0, 8)}... navigated to ${page}`,
        type: 'visitor',
        visitorId,
        page
      });

      res.json({ status: 200, data: visitor });
    } catch (error) {
      res.status(500).json({ message: "Failed to update visitor activity" });
    }
  });

  app.post("/api/visitors/end-session", async (req, res) => {
    try {
      const { visitorId } = req.body;
      await storage.endVisitorSession(visitorId);
      
      // Log session end
      await storage.createActivityLog({
        activity: `Visitor ${visitorId.slice(0, 8)}... ended session`,
        type: 'visitor',
        visitorId
      });

      res.json({ status: 200, message: "Session ended" });
    } catch (error) {
      res.status(500).json({ message: "Failed to end visitor session" });
    }
  });

  // Profile endpoints
  app.get("/api/profile", async (req, res) => {
    try {
      const profile = await storage.getProfile();
      await storage.createActivityLog({
        activity: `GET /api/profile - 200 OK - ${Math.floor(Math.random() * 50) + 20}ms`,
        type: "api"
      });
      // Add cache-busting headers
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Last-Modified': new Date().toUTCString()
      });
      res.json({ status: 200, data: profile });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  // Skills endpoints
  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getAllSkills();
      await storage.createActivityLog({
        activity: `GET /api/skills - 200 OK - ${Math.floor(Math.random() * 50) + 20}ms`,
        type: "api"
      });
      // Add cache-busting headers
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Last-Modified': new Date().toUTCString()
      });
      res.json({ status: 200, data: skills });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  // Experience endpoints
  app.get("/api/experience", async (req, res) => {
    try {
      const experiences = await storage.getAllExperiences();
      await storage.createActivityLog({
        activity: `GET /api/experience - 200 OK - ${Math.floor(Math.random() * 50) + 20}ms`,
        type: "api"
      });
      // Add cache-busting headers
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Last-Modified': new Date().toUTCString()
      });
      res.json({ status: 200, data: experiences });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experience" });
    }
  });

  // Projects endpoints
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      await storage.createActivityLog({
        activity: `GET /api/projects - 200 OK - ${Math.floor(Math.random() * 50) + 20}ms`,
        type: "api"
      });
      // Add cache-busting headers
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Last-Modified': new Date().toUTCString()
      });
      res.json({ status: 200, data: projects });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Metrics endpoints
  app.get("/api/metrics", async (req, res) => {
    try {
      const metrics = await storage.getAllMetrics();
      await storage.createActivityLog({
        activity: `GET /api/metrics - 200 OK - ${Math.floor(Math.random() * 50) + 20}ms`,
        type: "api"
      });
      // Add cache-busting headers
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Last-Modified': new Date().toUTCString()
      });
      res.json({ status: 200, data: metrics });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch metrics" });
    }
  });

  // Activity logs endpoints
  app.get("/api/logs", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const logs = await storage.getRecentActivityLogs(limit);
      res.json({ status: 200, data: logs });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activity logs" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
