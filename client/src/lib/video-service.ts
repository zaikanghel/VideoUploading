import { apiRequest } from './queryClient';
import { Video } from '@shared/schema';

export interface VideoUploadProgress {
  progress: number;
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
  videoId?: string;
  error?: string;
}

export class VideoService {
  /**
   * Upload a video file with progress tracking
   */
  static async uploadVideo(
    file: File, 
    onProgress: (progress: number) => void
  ): Promise<Video> {
    return new Promise<Video>((resolve, reject) => {
      const formData = new FormData();
      formData.append('video', file);
      formData.append('title', file.name.split('.').slice(0, -1).join('.'));

      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', '/api/videos/upload', true);
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          onProgress(progress);
        }
      };
      
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(new Error('Invalid response format'));
          }
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`));
        }
      };
      
      xhr.onerror = () => {
        reject(new Error('Network error occurred during upload'));
      };
      
      xhr.send(formData);
    });
  }

  /**
   * Retrieve a video by ID
   */
  static async getVideo(videoId: string): Promise<Video> {
    const response = await apiRequest('GET', `/api/videos/${videoId}`);
    return response.json();
  }

  /**
   * List videos with pagination
   */
  static async listVideos(limit: number = 10, offset: number = 0): Promise<Video[]> {
    const response = await apiRequest('GET', `/api/videos?limit=${limit}&offset=${offset}`);
    return response.json();
  }

  /**
   * Update video metadata
   */
  static async updateVideo(videoId: string, data: { title?: string; privacy?: string }): Promise<Video> {
    const response = await apiRequest('PUT', `/api/videos/${videoId}`, data);
    return response.json();
  }

  /**
   * Delete a video
   */
  static async deleteVideo(videoId: string): Promise<boolean> {
    await apiRequest('DELETE', `/api/videos/${videoId}`);
    return true;
  }
}
