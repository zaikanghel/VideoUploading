import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  videoId: text("video_id").notNull().unique(),
  title: text("title").notNull(),
  filename: text("filename").notNull(),
  filePath: text("file_path").notNull(),
  fileSize: integer("file_size").notNull(),
  duration: integer("duration"),
  format: text("format"),
  resolution: text("resolution"),
  status: text("status").notNull().default("processing"),
  views: integer("views").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at"),
  privacy: text("privacy").notNull().default("public"),
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  views: true,
  createdAt: true,
  expiresAt: true,
});

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
