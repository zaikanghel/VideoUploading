import { useEffect, useState } from 'react';

interface UploadProgressProps {
  filename: string;
  progress: number;
  onCancel: () => void;
  status: 'uploading' | 'success' | 'error';
  onRetry?: () => void;
  onUploadAnother?: () => void;
  errorMessage?: string;
}

export default function UploadProgress({
  filename,
  progress,
  onCancel,
  status,
  onRetry,
  onUploadAnother,
  errorMessage = 'There was a problem uploading your video. Please try again.'
}: UploadProgressProps) {
  // Calculate stroke-dashoffset based on progress
  const circumference = 2 * Math.PI * 42; // r=42
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (status === 'uploading') {
    return (
      <div className="upload-progress">
        <div className="w-20 h-20 mx-auto mb-4 relative">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle className="text-gray-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" />
            <circle 
              className="text-primary" 
              strokeWidth="8" 
              stroke="currentColor" 
              fill="transparent" 
              r="42" 
              cx="50" 
              cy="50" 
              strokeDasharray={`${circumference}`} 
              strokeDashoffset={strokeDashoffset} 
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-lg font-medium">{progress}%</div>
        </div>
        <h4 className="font-medium text-lg mb-2 text-center">Uploading video...</h4>
        <p className="text-gray-500 mb-4 text-center">{filename}</p>
        <div className="text-center">
          <button 
            onClick={onCancel}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Cancel upload
          </button>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="upload-success">
        <i className="ri-check-line text-4xl text-green-500 mb-4"></i>
        <h4 className="font-medium text-lg mb-2 text-center">Upload Successful!</h4>
        <p className="text-gray-500 mb-1 text-center">{filename}</p>
        <p className="text-sm text-gray-400 mb-4 text-center">Your video is now processing...</p>
        <div className="flex justify-center">
          <button 
            onClick={onUploadAnother}
            className="text-primary hover:text-blue-600 transition-colors text-sm font-medium"
          >
            Upload another video
          </button>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="upload-error">
        <i className="ri-error-warning-line text-4xl text-red-500 mb-4"></i>
        <h4 className="font-medium text-lg mb-2 text-center">Upload Failed</h4>
        <p className="text-gray-500 mb-4 text-center">{errorMessage}</p>
        <div className="text-center">
          <button 
            onClick={onRetry}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}
