import { 
  profiles, skills, experiences, projects, metrics, activityLogs, visitors,
  type Profile, type Skill, type Experience, type Project, type Metric, type ActivityLog, type Visitor,
  type InsertProfile, type InsertSkill, type InsertExperience, type InsertProject, type InsertMetric, type InsertActivityLog, type InsertVisitor
} from "../shared/schema";

export interface IStorage {
  // Profile methods
  getProfile(): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;

  // Skills methods
  getAllSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;

  // Experience methods
  getAllExperiences(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;

  // Project methods
  getAllProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;

  // Metrics methods
  getAllMetrics(): Promise<Metric[]>;
  createMetric(metric: InsertMetric): Promise<Metric>;

  // Activity logs
  getRecentActivityLogs(limit?: number): Promise<ActivityLog[]>;
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;

  // Visitor tracking
  getActiveVisitors(): Promise<Visitor[]>;
  getVisitorStats(): Promise<{ totalVisitors: number; activeVisitors: number; totalVisits: number }>;
  trackVisitor(visitorData: InsertVisitor): Promise<Visitor>;
  updateVisitorActivity(visitorId: string, page?: string): Promise<Visitor>;
  endVisitorSession(visitorId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private profiles: Map<number, Profile>;
  private skills: Map<number, Skill>;
  private experiences: Map<number, Experience>;
  private projects: Map<number, Project>;
  private metrics: Map<number, Metric>;
  private activityLogs: Map<number, ActivityLog>;
  private visitors: Map<number, Visitor>;
  private currentId: number;

  constructor() {
    this.profiles = new Map();
    this.skills = new Map();
    this.experiences = new Map();
    this.projects = new Map();
    this.metrics = new Map();
    this.activityLogs = new Map();
    this.visitors = new Map();
    this.currentId = 1;
    this.initializeData();
  }

  private initializeData() {
    // Profile
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
      specialization: ["Backend Development", "Distributed Systems", "LLM Integration", "System Design"]
    });

    // Skills
    this.skills.set(2, { id: 2, category: "Languages & Backend", technologies: ["Python", "FastAPI", "Django", "REST APIs", "System Design", "Microservices", "Asynchronous Processing (Celery, WebSockets)"] });
    this.skills.set(3, { id: 3, category: "Databases & Caching", technologies: ["PostgreSQL", "Redis", "Elasticsearch", "Snowflake"] });
    this.skills.set(4, { id: 4, category: "Cloud & AI Systems", technologies: ["AWS (EC2, S3, Lambda)", "Azure", "Docker", "LLM Integration", "RAG (Retrieval-Augmented Generation)"] });

    // Experiences
    this.experiences.set(5, {
      id: 5,
      company: "Sierra Wireless (Semtech)",
      role: "Software Engineer 2",
      duration: "Sept 2023 - Present",
      location: "Pune, India",
      startDate: "2023-09",
      endDate: null,
      achievements: [
        "Designed and implemented a multi-stage NL→SQL pipeline adopted by 100+ users, reducing time-to-insight from days to minutes; built LLM-based query generation with entity extraction using Neo4j, async execution via Celery, WebSocket streaming and a Human-in-the-Loop (HITL) fallback for query validation on Snowflake.",
        "Designed a semantic caching layer using embedding-based similarity with Redis, reducing repeated query latency from minutes to under 100 ms and significantly lowering LLM inference costs for high-overlap queries across business units.",
        "Led development of a multi-level (L1/L2/L3) approval state machine replacing a manual spreadsheet and email-based workflow for $50M annually in Restricted Cash Awards; enforced strict Pydantic validation and parameterized SQL to ensure data integrity, mitigate injection risks and enable end-to-end auditability.",
        "Established code review practices and mentored junior engineers on distributed systems and performance optimization, reducing post-release defects by 20%."
      ],
      technologies: ["Python", "FastAPI", "REST APIs", "Database Design", "Distributed Systems", "Caching (Redis)", "Async Processing (Celery)"]
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
        "Implemented app-level retry logic with exponential backoff, reducing transient API failures by 8% and improving overall service reliability.",
        "Reduced peak-load API latency by 45% through query optimization, indexing and app-level caching, improving reliability under increased traffic.",
        "Led API contract standardization initiative adopted by multiple partner teams, improving cross-team integration velocity by 25%."
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
        "Revamped & automated ZCC-cloud build validation scripts, proactively detecting 8+ critical issues pre-release & accelerating deployment cycles.",
        "Created a cross-platform testing solution using Sikuli and OpenCV that reduced manual QA effort by 40% for repetitive workflows."
      ],
      technologies: ["Python", "Django", "Fedora", "RESTful APIs", "Ubuntu Linux", "Linux tools", "Scripting", "Git"]
    });

    // Projects
    this.projects.set(8, {
      id: 8,
      name: "Natural Language Querying AI chatbot",
      description: "Developed a Slack bot enabling users to interact with a SQLite database using intuitive natural language queries. Integrated Google Bard API for accurate natural language understanding and SQL query translation.",
      githubUrl: "https://github.com/sxcluzive/Slack-Bot",
      technologies: ["Slack-Bolt Python Framework", "Google Bard API", "Docker", "SQLite"],
      year: 2023,
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
      description: "Built e-commerce backend with FastAPI, PostgreSQL and SQLAlchemy with asynchronous request handling, indexed DB schema, and optimized queries to ensure high performance under concurrent user load.",
      githubUrl: "https://github.com/sxcluzive/ecommerce-api",
      technologies: ["FastAPI", "Celery", "Asyncio", "Redis", "JWT", "API design"],
      year: 2021,
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

    // Metrics
    this.metrics.set(10, { id: 10, category: "performance", metric: "cache_latency", value: "<100ms", description: "Semantic cache hit latency with Redis" });
    this.metrics.set(11, { id: 11, category: "performance", metric: "api_optimization", value: "45%", description: "Peak-load API latency reduction" });
    this.metrics.set(12, { id: 12, category: "performance", metric: "time_to_insight", value: "Days→Min", description: "NL→SQL pipeline reducing analyst wait time" });
    this.metrics.set(13, { id: 13, category: "impact", metric: "pipeline_adoption", value: "100+", description: "Users adopted the NL→SQL pipeline" });
    this.metrics.set(14, { id: 14, category: "impact", metric: "workflow_value", value: "$50M", description: "Annual Restricted Cash Awards managed via approval system" });
    this.metrics.set(15, { id: 15, category: "impact", metric: "qa_efficiency", value: "40%", description: "Reduction in manual QA effort" });
    this.metrics.set(16, { id: 16, category: "impact", metric: "defect_reduction", value: "20%", description: "Post-release defect reduction through code reviews & mentoring" });
    this.metrics.set(17, { id: 17, category: "impact", metric: "integration_velocity", value: "25%", description: "Cross-team integration velocity improvement" });

    this.currentId = 18;
  }

  async getProfile(): Promise<Profile | undefined> {
    return Array.from(this.profiles.values())[0];
  }

  async createProfile(profile: InsertProfile): Promise<Profile> {
    const id = this.currentId++;
    const newProfile: Profile = { 
      ...profile, 
      id,
      phone: profile.phone ?? null,
      leetcode: profile.leetcode ?? null,
    };
    this.profiles.set(id, newProfile);
    return newProfile;
  }

  async getAllSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const id = this.currentId++;
    const newSkill: Skill = { ...skill, id };
    this.skills.set(id, newSkill);
    return newSkill;
  }

  async getAllExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values()).sort((a, b) => 
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  }

  async createExperience(experience: InsertExperience): Promise<Experience> {
    const id = this.currentId++;
    const newExperience: Experience = { 
      ...experience, 
      id,
      endDate: experience.endDate ?? null,
    };
    this.experiences.set(id, newExperience);
    return newExperience;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => b.year - a.year);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentId++;
    const newProject: Project = { 
      ...project, 
      id,
      githubUrl: project.githubUrl ?? null,
      codePreview: project.codePreview ?? null,
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async getAllMetrics(): Promise<Metric[]> {
    return Array.from(this.metrics.values());
  }

  async createMetric(metric: InsertMetric): Promise<Metric> {
    const id = this.currentId++;
    const newMetric: Metric = { 
      ...metric, 
      id,
      description: metric.description ?? null,
    };
    this.metrics.set(id, newMetric);
    return newMetric;
  }

  async getRecentActivityLogs(limit: number = 10): Promise<ActivityLog[]> {
    return Array.from(this.activityLogs.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  async createActivityLog(log: InsertActivityLog): Promise<ActivityLog> {
    const id = this.currentId++;
    const newLog: ActivityLog = { 
      ...log, 
      id,
      timestamp: new Date(),
      visitorId: log.visitorId || null,
      ipAddress: log.ipAddress || null,
      userAgent: log.userAgent || null,
      page: log.page || null,
      sessionDuration: log.sessionDuration || null
    };
    this.activityLogs.set(id, newLog);
    return newLog;
  }

  async getActiveVisitors(): Promise<Visitor[]> {
    return Array.from(this.visitors.values()).filter(v => v.isActive === 'true');
  }

  async getVisitorStats(): Promise<{ totalVisitors: number; activeVisitors: number; totalVisits: number }> {
    const totalVisitors = this.visitors.size;
    const activeVisitors = Array.from(this.visitors.values()).filter(v => v.isActive === 'true').length;
    const totalVisits = Array.from(this.activityLogs.values()).filter(l => l.type === 'visitor').length;
    return { totalVisitors, activeVisitors, totalVisits };
  }

  async trackVisitor(visitorData: InsertVisitor): Promise<Visitor> {
    // Check if visitor already exists
    const existingVisitor = Array.from(this.visitors.values()).find(v => v.visitorId === visitorData.visitorId);
    
    if (existingVisitor) {
      // Update existing visitor
      existingVisitor.lastVisit = new Date();
      existingVisitor.visitCount = (existingVisitor.visitCount || 0) + 1;
      existingVisitor.isActive = 'true';
      if (visitorData.pagesVisited && visitorData.pagesVisited.length > 0) {
        existingVisitor.pagesVisited = [...(existingVisitor.pagesVisited || []), ...visitorData.pagesVisited];
      }
      return existingVisitor;
    }
    
    // Create new visitor
    const id = this.currentId++;
    const newVisitor: Visitor = { 
      ...visitorData, 
      id,
      isActive: 'true',
      firstVisit: new Date(),
      lastVisit: new Date(),
      visitCount: 1,
      totalSessionTime: 0,
      pagesVisited: visitorData.pagesVisited || [],
      country: null,
      city: null,
      ipAddress: visitorData.ipAddress || null,
      userAgent: visitorData.userAgent || null
    };
    this.visitors.set(id, newVisitor);
    return newVisitor;
  }

  async updateVisitorActivity(visitorId: string, page?: string): Promise<Visitor> {
    const visitor = Array.from(this.visitors.values()).find(v => v.visitorId === visitorId);
    if (visitor) {
      visitor.lastVisit = new Date();
      if (page && visitor.pagesVisited) {
        visitor.pagesVisited.push(page);
      }
      return visitor;
    }
    throw new Error("Visitor not found");
  }

  async endVisitorSession(visitorId: string): Promise<void> {
    const visitor = Array.from(this.visitors.values()).find(v => v.visitorId === visitorId);
    if (visitor) {
      visitor.isActive = 'false';
    }
  }
}

export const storage = new MemStorage();
