import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  email: text("email").notNull(),
  github: text("github").notNull(),
  linkedin: text("linkedin").notNull(),
  leetcode: text("leetcode"),
  phone: text("phone"),
  experienceYears: integer("experience_years").notNull(),
  specialization: text("specialization").array().notNull(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  technologies: text("technologies").array().notNull(),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  duration: text("duration").notNull(),
  location: text("location").notNull(),
  achievements: text("achievements").array().notNull(),
  technologies: text("technologies").array().notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  githubUrl: text("github_url"),
  technologies: text("technologies").array().notNull(),
  codePreview: text("code_preview"),
  year: integer("year").notNull(),
});

export const metrics = pgTable("metrics", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  metric: text("metric").notNull(),
  value: text("value").notNull(),
  description: text("description"),
});

export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  activity: text("activity").notNull(),
  type: text("type").notNull(), // 'api', 'system', 'user', 'visitor'
  visitorId: text("visitor_id"), // Anonymous visitor identifier
  ipAddress: text("ip_address"), // Visitor's IP address
  userAgent: text("user_agent"), // Browser/device info
  page: text("page"), // Page visited
  sessionDuration: integer("session_duration"), // Session duration in seconds
});

export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  visitorId: text("visitor_id").notNull().unique(), // Anonymous visitor identifier
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  firstVisit: timestamp("first_visit").defaultNow().notNull(),
  lastVisit: timestamp("last_visit").defaultNow().notNull(),
  visitCount: integer("visit_count").default(1).notNull(),
  totalSessionTime: integer("total_session_time").default(0).notNull(), // Total time in seconds
  pagesVisited: text("pages_visited").array().default([]), // Array of pages visited
  country: text("country"), // Country from IP geolocation
  city: text("city"), // City from IP geolocation
  isActive: text("is_active").default('true'), // Whether visitor is currently active
});

export const insertProfileSchema = createInsertSchema(profiles);
export const insertSkillSchema = createInsertSchema(skills);
export const insertExperienceSchema = createInsertSchema(experiences);
export const insertProjectSchema = createInsertSchema(projects);
export const insertMetricSchema = createInsertSchema(metrics);
export const insertActivityLogSchema = createInsertSchema(activityLogs);
export const insertVisitorSchema = createInsertSchema(visitors);

export type Profile = typeof profiles.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Metric = typeof metrics.$inferSelect;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type Visitor = typeof visitors.$inferSelect;

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertMetric = z.infer<typeof insertMetricSchema>;
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type InsertVisitor = z.infer<typeof insertVisitorSchema>;
