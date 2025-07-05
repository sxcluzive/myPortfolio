import { 
  profiles, skills, experiences, projects, metrics, activityLogs, visitors,
  type Profile, type Skill, type Experience, type Project, type Metric, type ActivityLog, type Visitor,
  type InsertProfile, type InsertSkill, type InsertExperience, type InsertProject, type InsertMetric, type InsertActivityLog, type InsertVisitor
} from "../shared/schema";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq, desc } from 'drizzle-orm';

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

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  private db: any;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is required for DatabaseStorage');
    }
    
    const client = postgres(process.env.DATABASE_URL);
    this.db = drizzle(client);
  }

  async getProfile(): Promise<Profile | undefined> {
    const result = await this.db.select().from(profiles).limit(1);
    return result[0];
  }

  async createProfile(profile: InsertProfile): Promise<Profile> {
    const result = await this.db.insert(profiles).values(profile).returning();
    return result[0];
  }

  async getAllSkills(): Promise<Skill[]> {
    return await this.db.select().from(skills);
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const result = await this.db.insert(skills).values(skill).returning();
    return result[0];
  }

  async getAllExperiences(): Promise<Experience[]> {
    return await this.db.select().from(experiences).orderBy(desc(experiences.startDate));
  }

  async createExperience(experience: InsertExperience): Promise<Experience> {
    const result = await this.db.insert(experiences).values(experience).returning();
    return result[0];
  }

  async getAllProjects(): Promise<Project[]> {
    return await this.db.select().from(projects).orderBy(desc(projects.year));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const result = await this.db.insert(projects).values(project).returning();
    return result[0];
  }

  async getAllMetrics(): Promise<Metric[]> {
    return await this.db.select().from(metrics);
  }

  async createMetric(metric: InsertMetric): Promise<Metric> {
    const result = await this.db.insert(metrics).values(metric).returning();
    return result[0];
  }

  async getRecentActivityLogs(limit: number = 10): Promise<ActivityLog[]> {
    return await this.db.select().from(activityLogs).orderBy(desc(activityLogs.timestamp)).limit(limit);
  }

  async createActivityLog(log: InsertActivityLog): Promise<ActivityLog> {
    const result = await this.db.insert(activityLogs).values({
      ...log,
      timestamp: new Date()
    }).returning();
    return result[0];
  }

  async getActiveVisitors(): Promise<Visitor[]> {
    return await this.db.select().from(visitors).where(eq(visitors.isActive, 'true'));
  }

  async getVisitorStats(): Promise<{ totalVisitors: number; activeVisitors: number; totalVisits: number }> {
    const allVisitors = await this.db.select().from(visitors);
    const activeVisitors = await this.db.select().from(visitors).where(eq(visitors.isActive, 'true'));
    const visitorLogs = await this.db.select().from(activityLogs).where(eq(activityLogs.type, 'visitor'));
    
    return {
      totalVisitors: allVisitors.length,
      activeVisitors: activeVisitors.length,
      totalVisits: visitorLogs.length
    };
  }

  async trackVisitor(visitorData: InsertVisitor): Promise<Visitor> {
    const result = await this.db.insert(visitors).values({
      ...visitorData,
      isActive: 'true',
      firstVisit: new Date(),
      lastVisit: new Date(),
      visitCount: 1,
      totalSessionTime: 0
    }).returning();
    return result[0];
  }

  async updateVisitorActivity(visitorId: string, page?: string): Promise<Visitor> {
    const visitor = await this.db.select().from(visitors).where(eq(visitors.visitorId, visitorId)).limit(1);
    if (visitor.length === 0) {
      throw new Error("Visitor not found");
    }
    
    const updatedVisitor = await this.db.update(visitors)
      .set({
        lastVisit: new Date(),
        visitCount: visitor[0].visitCount + 1
      })
      .where(eq(visitors.visitorId, visitorId))
      .returning();
    
    return updatedVisitor[0];
  }

  async endVisitorSession(visitorId: string): Promise<void> {
    await this.db.update(visitors)
      .set({ isActive: 'false' })
      .where(eq(visitors.visitorId, visitorId));
  }
}

export const storage = new DatabaseStorage();
