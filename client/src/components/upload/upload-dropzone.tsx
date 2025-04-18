import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
}

export default function UploadDropzone({ onFileSelect }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("video/")) {
        onFileSelect(file);
      } else {
        // Handle non-video file error
        toast({
          title: "Invalid file type",
          description: "Please select a video file",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const supportedFormats = [
    { name: "MP4", icon: "ri-file-video-line" },
    { name: "WebM", icon: "ri-file-video-line" },
    { name: "MOV", icon: "ri-file-video-line" },
    { name: "AVI", icon: "ri-file-video-line" },
    { name: "MKV", icon: "ri-file-video-line" },
    { name: "FLV", icon: "ri-file-video-line" },
  ];

  return (
    <div
      className={`relative border-2 ${
        isDragging 
          ? "border-primary bg-blue-50" 
          : isHovering 
            ? "border-blue-300 bg-blue-50" 
            : "border-dashed border-gray-300"
      } rounded-xl p-10 text-center transition-all duration-200 mb-6 overflow-hidden group`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background animation for drag state */}
      {isDragging && (
        <div className="absolute inset-0 bg-blue-100 opacity-50 z-0">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
        </div>
      )}
      
      <div className="relative z-10">
        <input
          type="file"
          id="file-input"
          ref={fileInputRef}
          accept="video/*"
          className="hidden"
          onChange={handleFileInputChange}
        />

        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <i className="ri-upload-cloud-2-line text-4xl text-primary"></i>
        </div>
        
        <h4 className="font-bold text-xl mb-3 text-gray-800">
          {isDragging ? "Drop your video here" : "Drag and drop your video"}
        </h4>
        
        <p className="text-gray-600 mb-6">
          or <span className="text-primary font-medium">browse files</span> from your computer
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {supportedFormats.map((format, index) => (
            <div key={index} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700 flex items-center">
              <i className={`${format.icon} mr-1`}></i>
              {format.name}
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center bg-blue-50 py-2 px-4 rounded-lg text-sm text-blue-700">
          <i className="ri-infinite-line mr-2"></i>
          <span className="font-medium">No file size limits – Upload videos of any size</span>
        </div>
      </div>
    </div>
  );
}
