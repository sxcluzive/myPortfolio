import { 
  profiles, skills, experiences, projects, metrics, activityLogs,
  type Profile, type Skill, type Experience, type Project, type Metric, type ActivityLog,
  type InsertProfile, type InsertSkill, type InsertExperience, type InsertProject, type InsertMetric, type InsertActivityLog
} from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private profiles: Map<number, Profile>;
  private skills: Map<number, Skill>;
  private experiences: Map<number, Experience>;
  private projects: Map<number, Project>;
  private metrics: Map<number, Metric>;
  private activityLogs: Map<number, ActivityLog>;
  private currentId: number;

  constructor() {
    this.profiles = new Map();
    this.skills = new Map();
    this.experiences = new Map();
    this.projects = new Map();
    this.metrics = new Map();
    this.activityLogs = new Map();
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
      experienceYears: 3,
      specialization: ["Backend Development", "API Design", "Cloud Services", "System Design"]
    });

    // Skills
    this.skills.set(2, { id: 2, category: "Backend Development", technologies: ["Python", "Django", "FastAPI", "Flask", "RESTful APIs", "System Design", "SQL", "Celery", "Microservices"] });
    this.skills.set(3, { id: 3, category: "Database & Cloud", technologies: ["PostgreSQL", "Elasticsearch", "Redis", "AWS (EC2, S3)", "Azure", "Zscaler ZIA cloud"] });
    this.skills.set(4, { id: 4, category: "AI/ML & DevOps", technologies: ["Model Context Protocol (MCP)", "LLM Integration", "Predictive Analytics", "Docker", "CI/CD (Jenkins)", "Git"] });

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

    // Projects
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

    // Metrics
    this.metrics.set(10, { id: 10, category: "performance", metric: "latency_reduction", value: "97 seconds", description: "Latency reduction achieved through optimization" });
    this.metrics.set(11, { id: 11, category: "performance", metric: "deployment_efficiency", value: "60%", description: "Deployment time reduction" });
    this.metrics.set(12, { id: 12, category: "performance", metric: "uptime_achievement", value: "98.9%", description: "Critical service availability" });
    this.metrics.set(13, { id: 13, category: "performance", metric: "api_optimization", value: "45%", description: "API response time improvement" });
    this.metrics.set(14, { id: 14, category: "impact", metric: "bugs_prevented", value: "15+", description: "Critical issues identified before production" });
    this.metrics.set(15, { id: 15, category: "impact", metric: "qa_efficiency", value: "40%", description: "Reduction in manual QA effort" });
    this.metrics.set(16, { id: 16, category: "impact", metric: "team_productivity", value: "20%", description: "Bug reduction through code reviews" });

    this.currentId = 17;
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
      timestamp: log.timestamp || new Date()
    };
    this.activityLogs.set(id, newLog);
    return newLog;
  }
}

export const storage = new MemStorage();
