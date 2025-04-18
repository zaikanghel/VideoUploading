import { videos, type Video, type InsertVideo } from "@shared/schema";
import { users, type User, type InsertUser } from "@shared/schema";
import { createId } from "@paralleldrive/cuid2";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";

const pipelineAsync = promisify(pipeline);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Video related methods
  getVideo(id: number): Promise<Video | undefined>;
  getVideoByVideoId(videoId: string): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideo(id: number, video: Partial<Video>): Promise<Video | undefined>;
  deleteVideo(id: number): Promise<boolean>;
  listVideos(limit: number, offset: number): Promise<Video[]>;
  incrementViews(videoId: string): Promise<void>;
  saveVideoFile(videoId: string, fileStream: NodeJS.ReadableStream, filename: string, title?: string): Promise<string>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private videos: Map<number, Video>;
  private currentUserId: number;
  private currentVideoId: number;
  private videoStoragePath: string;

  constructor() {
    this.users = new Map();
    this.videos = new Map();
    this.currentUserId = 1;
    this.currentVideoId = 1;
    this.videoStoragePath = path.resolve(process.cwd(), "uploads");
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(this.videoStoragePath)) {
      fs.mkdirSync(this.videoStoragePath, { recursive: true });
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getVideo(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async getVideoByVideoId(videoId: string): Promise<Video | undefined> {
    return Array.from(this.videos.values()).find(
      (video) => video.videoId === videoId,
    );
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = this.currentVideoId++;
    const now = new Date();
    // Add 30 days to the current date
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + 30);

    const video: Video = { 
      ...insertVideo, 
      id, 
      views: 0, 
      createdAt: now, 
      expiresAt, 
      status: "processing"
    };
    
    this.videos.set(id, video);
    return video;
  }

  async updateVideo(id: number, videoUpdate: Partial<Video>): Promise<Video | undefined> {
    const currentVideo = this.videos.get(id);
    if (!currentVideo) return undefined;

    const updatedVideo = { ...currentVideo, ...videoUpdate };
    this.videos.set(id, updatedVideo);
    return updatedVideo;
  }

  async deleteVideo(id: number): Promise<boolean> {
    const video = this.videos.get(id);
    if (!video) return false;

    // Delete the file from the filesystem
    try {
      if (fs.existsSync(video.filePath)) {
        fs.unlinkSync(video.filePath);
      }
    } catch (error) {
      console.error(`Error deleting file: ${error}`);
    }

    return this.videos.delete(id);
  }

  async listVideos(limit: number = 10, offset: number = 0): Promise<Video[]> {
    const videos = Array.from(this.videos.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(offset, offset + limit);
    
    return videos;
  }

  async incrementViews(videoId: string): Promise<void> {
    const video = Array.from(this.videos.values()).find(
      (video) => video.videoId === videoId,
    );

    if (!video) return;

    const updatedVideo = { ...video, views: video.views + 1 };
    this.videos.set(video.id, updatedVideo);
  }

  async saveVideoFile(videoId: string, fileStream: NodeJS.ReadableStream, filename: string, title?: string): Promise<string> {
    const fileExtension = path.extname(filename);
    
    // Use title for filename if provided, otherwise use videoId
    let safeFilename;
    if (title) {
      // Ensure the title is safe to use as a filename by removing invalid characters
      let safeTitle = title.replace(/[^a-zA-Z0-9_\-\s]/g, '').replace(/\s+/g, '_');
      if (safeTitle.length === 0) safeTitle = videoId; // Fallback if title becomes empty
      safeFilename = `${safeTitle}${fileExtension}`;
    } else {
      safeFilename = `${videoId}${fileExtension}`;
    }
    
    const filePath = path.join(this.videoStoragePath, safeFilename);
    
    const fileWriteStream = fs.createWriteStream(filePath);
    
    try {
      await pipelineAsync(fileStream, fileWriteStream);
      return filePath;
    } catch (error) {
      throw new Error(`Failed to save video file: ${error}`);
    }
  }
}

export const storage = new MemStorage();
