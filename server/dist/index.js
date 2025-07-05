// index.ts
import express2 from "express";
import cookieParser from "cookie-parser";

// routes.ts
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";

// storage.ts
var MemStorage = class {
  profiles;
  skills;
  experiences;
  projects;
  metrics;
  activityLogs;
  visitors;
  currentId;
  constructor() {
    this.profiles = /* @__PURE__ */ new Map();
    this.skills = /* @__PURE__ */ new Map();
    this.experiences = /* @__PURE__ */ new Map();
    this.projects = /* @__PURE__ */ new Map();
    this.metrics = /* @__PURE__ */ new Map();
    this.activityLogs = /* @__PURE__ */ new Map();
    this.visitors = /* @__PURE__ */ new Map();
    this.currentId = 1;
    this.initializeData();
  }
  initializeData() {
    this.profiles.set(1, {
      id: 1,
      name: "Shubham Singh",
      role: "Software Engineer 2",
      company: "Sierra Wireless (Semtech)",
      location: "Pune, India",
      email: "shubh.message@gmail.com",
      github: "github.com/shubhxcluzive",
      linkedin: "linkedin.com/in/shubhxcluzive",
      leetcode: "leetcode.com/u/shubhxcluzive/",
      phone: "+91 9956023261",
      experienceYears: 4,
      specialization: ["Backend Development", "API Design", "Cloud Services", "System Design"]
    });
    this.skills.set(2, { id: 2, category: "Backend Development", technologies: ["Python", "Django", "FastAPI", "Flask", "RESTful APIs", "System Design", "SQL", "Celery", "Microservices"] });
    this.skills.set(3, { id: 3, category: "Database & Cloud", technologies: ["PostgreSQL", "Elasticsearch", "Redis", "AWS (EC2, S3)", "Azure", "Zscaler ZIA cloud"] });
    this.skills.set(4, { id: 4, category: "AI/ML & DevOps", technologies: ["Model Context Protocol (MCP)", "LLM Integration", "Predictive Analytics", "Docker", "CI/CD (Jenkins)", "Git"] });
    this.experiences.set(5, {
      id: 5,
      company: "Sierra Wireless (Semtech)",
      role: "Software Engineer 2",
      duration: "Sept 2023 - Present",
      location: "Pune, India",
      startDate: "2023-09",
      endDate: null,
      achievements: [
        "Developed a FastAPI application on Azure App Service with PostgreSQL backend for test result analytics that reduced debugging time by 40%",
        "Integrated MCP with test result data, reducing recurring failures by 35% and uncovering patterns across 1,000 daily tests",
        "Optimized core web service by migrating from Elasticsearch to PostgreSQL, resulting in a 97-second reduction in latency",
        "Designed and implemented Jenkins CI/CD pipelines with automated testing, reducing deployment time by 60%",
        "Accelerated junior developer onboarding, reducing production bugs by 20% through code reviews"
      ],
      technologies: ["Python", "Django", "FastAPI", "PostgreSQL", "RESTful APIs", "database design", "Stored Procedures"]
    });
    this.experiences.set(6, {
      id: 6,
      company: "Zscaler",
      role: "Associate Software Engineer",
      duration: "Dec 2021 - Feb 2023",
      location: "Mohali, India",
      startDate: "2021-12",
      endDate: "2023-02",
      achievements: [
        "Engineered resilient REST APIs supporting automatic tunnel failover, resulting in 98.9% uptime for critical cloud services",
        "Improved API response time by 45% under peak load via optimized queries and caching",
        "Updated technical documentation post-release to align with user feedback and improve onboarding"
      ],
      technologies: ["Python", "Django", "Linux", "RESTful APIs", "Ubuntu Linux", "Linux tools", "Scripting", "Git"]
    });
    this.experiences.set(7, {
      id: 7,
      company: "Zscaler",
      role: "Intern - Cloud Reliability",
      duration: "Mar 2021 - Nov 2021",
      location: "Mohali, India",
      startDate: "2021-03",
      endDate: "2021-11",
      achievements: [
        "Revamped and deployed automated test scripts for ZCC cloud builds that identified 15+ critical issues before production release",
        "Created a cross-platform testing solution using Sikuli and OpenCV that reduced manual QA effort by 40% for repetitive workflows"
      ],
      technologies: ["Python", "Django", "Fedora", "RESTful APIs", "Ubuntu Linux", "Linux tools", "Scripting", "Git"]
    });
    this.projects.set(8, {
      id: 8,
      name: "Natural Language Querying AI chatbot",
      description: "Developed a Slack bot enabling users to interact with a SQLite database using intuitive natural language queries. Integrated Google Bard API for accurate natural language understanding and SQL query translation.",
      githubUrl: "https://github.com/sxcluzive/Slack-Bot",
      technologies: ["Slack-Bolt Python Framework", "Google Bard API", "Docker", "SQLite"],
      year: 2020,
      codePreview: `from slack_bolt import App
import google.generativeai as genai
import sqlite3

# Natural language to SQL translation
def process_query(user_input):
    return bard_api.translate_to_sql(user_input)

@app.message("query")
def handle_query(message, say):
    sql = process_query(message['text'])
    result = execute_sql(sql)
    say(f"Results: {result}")`
    });
    this.projects.set(9, {
      id: 9,
      name: "E-commerce API",
      description: "Built e-commerce backend with FastAPI, PostgreSQL and SQLAlchemy to explore modern API patterns. Implemented asynchronous request handling with asyncio to maintain performance under concurrent user load.",
      githubUrl: "https://github.com/sxcluzive/ecommerce-api",
      technologies: ["FastAPI", "Celery", "Asyncio", "Redis", "JWT", "API design"],
      year: 2020,
      codePreview: `from fastapi import FastAPI
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession

# Asynchronous request handling
async def get_products(session: AsyncSession):
    return await session.execute(query)

@app.get("/products")
async def list_products(db: AsyncSession = Depends(get_db)):
    products = await get_products(db)
    return {"products": products}`
    });
    this.metrics.set(10, { id: 10, category: "performance", metric: "latency_reduction", value: "97 seconds", description: "Latency reduction achieved through optimization" });
    this.metrics.set(11, { id: 11, category: "performance", metric: "deployment_efficiency", value: "60%", description: "Deployment time reduction" });
    this.metrics.set(12, { id: 12, category: "performance", metric: "uptime_achievement", value: "98.9%", description: "Critical service availability" });
    this.metrics.set(13, { id: 13, category: "performance", metric: "api_optimization", value: "45%", description: "API response time improvement" });
    this.metrics.set(14, { id: 14, category: "impact", metric: "bugs_prevented", value: "15+", description: "Critical issues identified before production" });
    this.metrics.set(15, { id: 15, category: "impact", metric: "qa_efficiency", value: "40%", description: "Reduction in manual QA effort" });
    this.metrics.set(16, { id: 16, category: "impact", metric: "team_productivity", value: "20%", description: "Bug reduction through code reviews" });
    this.currentId = 17;
  }
  async getProfile() {
    return Array.from(this.profiles.values())[0];
  }
  async createProfile(profile) {
    const id = this.currentId++;
    const newProfile = {
      ...profile,
      id,
      phone: profile.phone ?? null,
      leetcode: profile.leetcode ?? null
    };
    this.profiles.set(id, newProfile);
    return newProfile;
  }
  async getAllSkills() {
    return Array.from(this.skills.values());
  }
  async createSkill(skill) {
    const id = this.currentId++;
    const newSkill = { ...skill, id };
    this.skills.set(id, newSkill);
    return newSkill;
  }
  async getAllExperiences() {
    return Array.from(this.experiences.values()).sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  }
  async createExperience(experience) {
    const id = this.currentId++;
    const newExperience = {
      ...experience,
      id,
      endDate: experience.endDate ?? null
    };
    this.experiences.set(id, newExperience);
    return newExperience;
  }
  async getAllProjects() {
    return Array.from(this.projects.values()).sort((a, b) => b.year - a.year);
  }
  async createProject(project) {
    const id = this.currentId++;
    const newProject = {
      ...project,
      id,
      githubUrl: project.githubUrl ?? null,
      codePreview: project.codePreview ?? null
    };
    this.projects.set(id, newProject);
    return newProject;
  }
  async getAllMetrics() {
    return Array.from(this.metrics.values());
  }
  async createMetric(metric) {
    const id = this.currentId++;
    const newMetric = {
      ...metric,
      id,
      description: metric.description ?? null
    };
    this.metrics.set(id, newMetric);
    return newMetric;
  }
  async getRecentActivityLogs(limit = 10) {
    return Array.from(this.activityLogs.values()).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, limit);
  }
  async createActivityLog(log2) {
    const id = this.currentId++;
    const newLog = {
      ...log2,
      id,
      timestamp: /* @__PURE__ */ new Date(),
      visitorId: log2.visitorId || null,
      ipAddress: log2.ipAddress || null,
      userAgent: log2.userAgent || null,
      page: log2.page || null,
      sessionDuration: log2.sessionDuration || null
    };
    this.activityLogs.set(id, newLog);
    return newLog;
  }
  async getActiveVisitors() {
    return Array.from(this.visitors.values()).filter((v) => v.isActive === "true");
  }
  async getVisitorStats() {
    const totalVisitors = this.visitors.size;
    const activeVisitors = Array.from(this.visitors.values()).filter((v) => v.isActive === "true").length;
    const totalVisits = Array.from(this.activityLogs.values()).filter((l) => l.type === "visitor").length;
    return { totalVisitors, activeVisitors, totalVisits };
  }
  async trackVisitor(visitorData) {
    const id = this.currentId++;
    const newVisitor = {
      ...visitorData,
      id,
      isActive: "true",
      firstVisit: /* @__PURE__ */ new Date(),
      lastVisit: /* @__PURE__ */ new Date(),
      visitCount: 1,
      totalSessionTime: 0,
      pagesVisited: [],
      country: null,
      city: null,
      ipAddress: visitorData.ipAddress || null,
      userAgent: visitorData.userAgent || null
    };
    this.visitors.set(id, newVisitor);
    return newVisitor;
  }
  async updateVisitorActivity(visitorId, page) {
    const visitor = Array.from(this.visitors.values()).find((v) => v.visitorId === visitorId);
    if (visitor) {
      visitor.lastVisit = /* @__PURE__ */ new Date();
      if (page && visitor.pagesVisited) {
        visitor.pagesVisited.push(page);
      }
      return visitor;
    }
    throw new Error("Visitor not found");
  }
  async endVisitorSession(visitorId) {
    const visitor = Array.from(this.visitors.values()).find((v) => v.visitorId === visitorId);
    if (visitor) {
      visitor.isActive = "false";
    }
  }
};
var storage = new MemStorage();

// routes.ts
import { v4 as uuidv4 } from "uuid";
function trackVisitor(req, res, next) {
  const visitorId = req.cookies?.visitorId || uuidv4();
  const ipAddress = req.ip || req.connection.remoteAddress || req.headers["x-forwarded-for"];
  const userAgent = req.headers["user-agent"];
  const page = req.path;
  if (!req.cookies?.visitorId) {
    res.cookie("visitorId", visitorId, {
      maxAge: 24 * 60 * 60 * 1e3,
      // 24 hours
      httpOnly: true
    });
  }
  storage.trackVisitor({
    visitorId,
    ipAddress,
    userAgent,
    pagesVisited: [page]
  }).then(() => {
    storage.createActivityLog({
      activity: `Visitor ${visitorId.slice(0, 8)}... visited ${page}`,
      type: "visitor",
      visitorId,
      ipAddress,
      userAgent,
      page
    });
  }).catch(console.error);
  next();
}
async function registerRoutes(app2) {
  app2.use(trackVisitor);
  app2.get("/api/visitors/active", async (req, res) => {
    try {
      const activeVisitors = await storage.getActiveVisitors();
      res.json({ status: 200, data: activeVisitors });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch active visitors" });
    }
  });
  app2.get("/api/visitors/stats", async (req, res) => {
    try {
      const stats = await storage.getVisitorStats();
      res.json({ status: 200, data: stats });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch visitor stats" });
    }
  });
  app2.post("/api/visitors/activity", async (req, res) => {
    try {
      const { visitorId, page } = req.body;
      const visitor = await storage.updateVisitorActivity(visitorId, page);
      await storage.createActivityLog({
        activity: `Visitor ${visitorId.slice(0, 8)}... navigated to ${page}`,
        type: "visitor",
        visitorId,
        page
      });
      res.json({ status: 200, data: visitor });
    } catch (error) {
      res.status(500).json({ message: "Failed to update visitor activity" });
    }
  });
  app2.post("/api/visitors/end-session", async (req, res) => {
    try {
      const { visitorId } = req.body;
      await storage.endVisitorSession(visitorId);
      await storage.createActivityLog({
        activity: `Visitor ${visitorId.slice(0, 8)}... ended session`,
        type: "visitor",
        visitorId
      });
      res.json({ status: 200, message: "Session ended" });
    } catch (error) {
      res.status(500).json({ message: "Failed to end visitor session" });
    }
  });
  app2.get("/api/profile", async (req, res) => {
    try {
      const profile = await storage.getProfile();
      await storage.createActivityLog({
        activity: `GET /api/profile - 200 OK - ${Math.floor(Math.random() * 50) + 20}ms`,
        type: "api"
      });
      res.json({ status: 200, data: profile });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });
  app2.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getAllSkills();
      await storage.createActivityLog({
        activity: `GET /api/skills - 200 OK - ${Math.floor(Math.random() * 50) + 20}ms`,
        type: "api"
      });
      res.json({ status: 200, data: skills });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });
  app2.get("/api/experience", async (req, res) => {
    try {
      const experiences = await storage.getAllExperiences();
      await storage.createActivityLog({
        activity: `GET /api/experience - 200 OK - ${Math.floor(Math.random() * 50) + 20}ms`,
        type: "api"
      });
      res.json({ status: 200, data: experiences });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experience" });
    }
  });
  app2.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      await storage.createActivityLog({
        activity: `GET /api/projects - 200 OK - ${Math.floor(Math.random() * 50) + 20}ms`,
        type: "api"
      });
      res.json({ status: 200, data: projects });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  app2.get("/api/metrics", async (req, res) => {
    try {
      const metrics = await storage.getAllMetrics();
      await storage.createActivityLog({
        activity: `GET /api/metrics - 200 OK - ${Math.floor(Math.random() * 50) + 20}ms`,
        type: "api"
      });
      res.json({ status: 200, data: metrics });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch metrics" });
    }
  });
  app2.get("/api/logs", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const logs = await storage.getRecentActivityLogs(limit);
      res.json({ status: 200, data: logs });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activity logs" });
    }
  });
  const httpServer = createServer(app2);
  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });
  wss.on("connection", (ws) => {
    console.log("WebSocket client connected");
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: "system",
        message: "Connected to portfolio terminal",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }));
    }
    const systemUpdateInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        const activities = [
          "Database connection pool: 8/10 connections active",
          "Cache hit ratio: 94.2%",
          "Background job processed: email_notification",
          "API rate limit check: 45/100 requests",
          "Health check: All services operational",
          "Memory usage: 2.1GB / 4GB",
          "CPU utilization: 32%",
          "Active sessions: 12"
        ];
        const activity = activities[Math.floor(Math.random() * activities.length)];
        storage.createActivityLog({
          activity,
          type: "system"
        });
        ws.send(JSON.stringify({
          type: "system_activity",
          message: activity,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }));
      }
    }, 3e3);
    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message);
        console.log("Received:", data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: "echo",
            message: `Received: ${data.message}`,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }));
        }
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    });
    ws.on("close", () => {
      console.log("WebSocket client disconnected");
      clearInterval(systemUpdateInterval);
    });
    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      clearInterval(systemUpdateInterval);
    });
  });
  return httpServer;
}

// vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// ../vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = process.env.PORT || 3e3;
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
