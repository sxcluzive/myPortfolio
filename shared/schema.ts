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
  type: text("type").notNull(), // 'api', 'system', 'user'
});

export const insertProfileSchema = createInsertSchema(profiles);
export const insertSkillSchema = createInsertSchema(skills);
export const insertExperienceSchema = createInsertSchema(experiences);
export const insertProjectSchema = createInsertSchema(projects);
export const insertMetricSchema = createInsertSchema(metrics);
export const insertActivityLogSchema = createInsertSchema(activityLogs);

export type Profile = typeof profiles.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Metric = typeof metrics.$inferSelect;
export type ActivityLog = typeof activityLogs.$inferSelect;

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertMetric = z.infer<typeof insertMetricSchema>;
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
