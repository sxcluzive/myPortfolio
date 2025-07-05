import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from './storage.js';
import { v4 as uuidv4 } from 'uuid';
// Visitor tracking middleware
function trackVisitor(req, res, next) {
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
export async function registerRoutes(app) {
    // Health check endpoint
    app.get("/api/health", (req, res) => {
        res.json({
            status: 200,
            message: "Portfolio API is running",
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development'
        });
    });
    // Apply visitor tracking to all routes
    app.use(trackVisitor);
    // Visitor tracking endpoints
    app.get("/api/visitors/active", async (req, res) => {
        try {
            const activeVisitors = await storage.getActiveVisitors();
            res.json({ status: 200, data: activeVisitors });
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch active visitors" });
        }
    });
    app.get("/api/visitors/stats", async (req, res) => {
        try {
            const stats = await storage.getVisitorStats();
            res.json({ status: 200, data: stats });
        }
        catch (error) {
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
        }
        catch (error) {
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
        }
        catch (error) {
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
            res.json({ status: 200, data: profile });
        }
        catch (error) {
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
            res.json({ status: 200, data: skills });
        }
        catch (error) {
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
            res.json({ status: 200, data: experiences });
        }
        catch (error) {
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
            res.json({ status: 200, data: projects });
        }
        catch (error) {
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
            res.json({ status: 200, data: metrics });
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch metrics" });
        }
    });
    // Activity logs endpoints
    app.get("/api/logs", async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const logs = await storage.getRecentActivityLogs(limit);
            res.json({ status: 200, data: logs });
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch activity logs" });
        }
    });
    const httpServer = createServer(app);
    // WebSocket server for real-time features
    const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
    wss.on('connection', (ws) => {
        console.log('WebSocket client connected');
        // Send welcome message
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
                type: 'system',
                message: 'Connected to portfolio terminal',
                timestamp: new Date().toISOString()
            }));
        }
        // Send periodic system updates
        const systemUpdateInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
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
                ws.send(JSON.stringify({
                    type: 'system_activity',
                    message: activity,
                    timestamp: new Date().toISOString()
                }));
            }
        }, 3000);
        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message);
                console.log('Received:', data);
                // Echo back for now
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({
                        type: 'echo',
                        message: `Received: ${data.message}`,
                        timestamp: new Date().toISOString()
                    }));
                }
            }
            catch (error) {
                console.error('WebSocket message error:', error);
            }
        });
        ws.on('close', () => {
            console.log('WebSocket client disconnected');
            clearInterval(systemUpdateInterval);
        });
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
            clearInterval(systemUpdateInterval);
        });
    });
    return httpServer;
}
