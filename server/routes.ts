import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVideoSchema } from "@shared/schema";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import multer from "multer";
import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import { promisify } from "util";

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up multer storage for temp files
const tempStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads/temp"));
  },
  filename: function (req, file, cb) {
    // Create a unique filename
    const uniqueId = createId();
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueId}${extension}`);
  },
});

// Create temp directory if it doesn't exist
const tempDir = path.join(process.cwd(), "uploads/temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Configure multer for file uploads
const upload = multer({
  storage: tempStorage,
  limits: {
    fileSize: Infinity, // No file size limit
  },
  fileFilter: (req, file, cb) => {
    // Accept video files only
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed"));
    }
  },
});

// Helper function to get video metadata
const getVideoMetadata = (filePath: string): Promise<{ duration: number, resolution: string }> => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        return resolve({ duration: 0, resolution: "unknown" });
      }
      
      try {
        const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
        const durationSeconds = Math.floor(parseFloat(metadata.format.duration || "0"));
        const resolution = videoStream ? `${videoStream.width}x${videoStream.height}` : "unknown";
        
        resolve({ duration: durationSeconds, resolution });
      } catch (error) {
        resolve({ duration: 0, resolution: "unknown" });
      }
    });
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Serve static videos from uploads directory
  app.use("/uploads", (req, res, next) => {
    // Validate the file exists and is within the uploads directory
    const requestedPath = path.join(uploadsDir, req.path);

    if (!requestedPath.startsWith(uploadsDir) || !fs.existsSync(requestedPath)) {
      return res.status(404).send("File not found");
    }

    next();
  }, express.static(uploadsDir));

  // API Routes
  app.post("/api/videos/upload", upload.single("video"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No video file provided" });
      }

      const videoId = createId();
      const title = req.body.title || path.basename(req.file.originalname, path.extname(req.file.originalname));
      
      // Move the file from temp to permanent storage
      const fileExtension = path.extname(req.file.originalname);
      
      // Ensure the title is safe to use as a filename by removing invalid characters
      let safeTitle = title.replace(/[^a-zA-Z0-9_\-\s]/g, '').replace(/\s+/g, '_');
      if (safeTitle.length === 0) safeTitle = videoId; // Fallback if title becomes empty
      
      const safeFilename = `${safeTitle}${fileExtension}`;
      const permanentPath = path.join(uploadsDir, safeFilename);
      
      fs.renameSync(req.file.path, permanentPath);
      
      // Get video metadata
      const { duration, resolution } = await getVideoMetadata(permanentPath);
      
      // Create the video record
      const newVideo = await storage.createVideo({
        videoId,
        title,
        filename: req.file.originalname,
        filePath: permanentPath,
        fileSize: req.file.size,
        format: path.extname(req.file.originalname).substring(1),
        resolution,
        duration,
        status: "ready", // Mark as ready since we're not actually processing
        privacy: "public",
      });

      res.status(201).json(newVideo);
    } catch (error) {
      console.error("Error uploading video:", error);
      res.status(500).json({ message: "Failed to upload video", error: String(error) });
    }
  });

  // Get video by ID
  app.get("/api/videos/:videoId", async (req, res) => {
    try {
      const { videoId } = req.params;
      const video = await storage.getVideoByVideoId(videoId);
      
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      // Increment view count
      await storage.incrementViews(videoId);
      
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: "Failed to get video", error: String(error) });
    }
  });

  // List recent videos
  app.get("/api/videos", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      
      const videos = await storage.listVideos(limit, offset);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to list videos", error: String(error) });
    }
  });

  // Update video
  app.put("/api/videos/:videoId", async (req, res) => {
    try {
      const { videoId } = req.params;
      const video = await storage.getVideoByVideoId(videoId);
      
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      const updateSchema = z.object({
        title: z.string().optional(),
        privacy: z.enum(["public", "unlisted", "private"]).optional(),
      });
      
      const parsedData = updateSchema.safeParse(req.body);
      
      if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid update data", errors: parsedData.error });
      }
      
      const updatedVideo = await storage.updateVideo(video.id, parsedData.data);
      res.json(updatedVideo);
    } catch (error) {
      res.status(500).json({ message: "Failed to update video", error: String(error) });
    }
  });

  // Delete video
  app.delete("/api/videos/:videoId", async (req, res) => {
    try {
      const { videoId } = req.params;
      const video = await storage.getVideoByVideoId(videoId);
      
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      const success = await storage.deleteVideo(video.id);
      
      if (success) {
        res.status(204).send();
      } else {
        res.status(500).json({ message: "Failed to delete video" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete video", error: String(error) });
    }
  });

  // Embed endpoint
  app.get("/embed/:videoId", async (req, res) => {
    try {
      const { videoId } = req.params;
      const video = await storage.getVideoByVideoId(videoId);
      
      if (!video) {
        return res.status(404).send("Video not found");
      }
      
      // Increment view count
      await storage.incrementViews(videoId);
      
      // Return a minimal HTML page with the video player
      const embedHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${video.title}</title>
          <style>
            body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
            video { width: 100%; height: 100%; object-fit: contain; }
          </style>
        </head>
        <body>
          <video controls autoplay src="/uploads/${path.basename(video.filePath)}"></video>
        </body>
        </html>
      `;
      
      res.send(embedHtml);
    } catch (error) {
      res.status(500).send("Error loading video");
    }
  });

  return httpServer;
}

// Import express here to avoid TypeScript errors
import express from "express";
