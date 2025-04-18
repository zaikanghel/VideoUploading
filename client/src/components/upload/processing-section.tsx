import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ProcessingSectionProps {
  filename: string;
  progress: number;
  onComplete: () => void;
  onUploadAnother?: () => void;
}

export default function ProcessingSection({ 
  filename, 
  progress, 
  onComplete,
  onUploadAnother 
}: ProcessingSectionProps) {
  const [internalProgress, setInternalProgress] = useState(progress);

  // Simulate processing progress
  useEffect(() => {
    if (internalProgress < 100) {
      const timer = setTimeout(() => {
        const newProgress = Math.min(internalProgress + 5, 100);
        setInternalProgress(newProgress);
        
        if (newProgress === 100) {
          setTimeout(() => {
            onComplete();
          }, 1000);
        }
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [internalProgress, onComplete]);

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
          <i className="ri-loader-4-line text-xl text-primary animate-spin"></i>
        </div>
        <div>
          <h4 className="font-medium">{filename}</h4>
          <p className="text-sm text-gray-500">Processing video for optimal playback...</p>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${internalProgress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>This may take a few minutes</span>
        <span>{internalProgress}%</span>
      </div>

      {onUploadAnother && (
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 mb-4">
            You can leave this page and come back later. Your video will be available in "My Videos" once processing is complete.
          </p>
          <Button onClick={onUploadAnother}>
            Upload Another Video
          </Button>
        </div>
      )}
    </div>
  );
}
