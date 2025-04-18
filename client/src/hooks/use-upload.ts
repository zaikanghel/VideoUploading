import { useState, useCallback, useEffect } from 'react';
import { VideoService } from '@/lib/video-service';
import { useToast } from './use-toast';

export function useUpload() {
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'uploaded' | 'processing' | 'complete' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Reset upload state
  const resetUpload = useCallback(() => {
    setUploadState('idle');
    setUploadProgress(0);
    setProcessingProgress(0);
    setCurrentFile(null);
    setVideoId(null);
    setError(null);
  }, []);

  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a video file",
        variant: "destructive",
      });
      return;
    }

    setCurrentFile(file);
    setUploadState('uploading');
    setUploadProgress(0);

    // Start the upload
    VideoService.uploadVideo(file, (progress) => {
      setUploadProgress(progress);
    })
    .then(response => {
      setVideoId(response.videoId);
      setUploadState('uploaded');
      
      // Move to processing state after a short delay
      setTimeout(() => {
        setUploadState('processing');
        setProcessingProgress(0);
      }, 1500);
    })
    .catch(err => {
      console.error('Upload error:', err);
      setUploadState('error');
      setError(err.message);
      toast({
        title: "Upload failed",
        description: err.message,
        variant: "destructive",
      });
    });
  }, [toast]);

  // Handle upload completion
  const handleUploadComplete = useCallback(() => {
    setUploadState('complete');
    toast({
      title: "Upload completed",
      description: "Your video has been uploaded successfully",
    });
  }, [toast]);

  // Handle processing completion
  const handleProcessingComplete = useCallback(() => {
    setUploadState('complete');
    toast({
      title: "Processing completed",
      description: "Your video is now ready to be shared",
    });
  }, [toast]);

  return {
    uploadState,
    uploadProgress,
    processingProgress,
    currentFile,
    videoId,
    error,
    handleFileSelect,
    resetUpload,
    handleUploadComplete,
    handleProcessingComplete,
  };
}
