import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
}

export default function UploadDropzone({ onFileSelect }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        alert("Please select a video file");
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

  return (
    <div
      className={`border-2 border-dashed ${
        isDragging ? "border-primary" : "border-gray-300"
      } rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer mb-6`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        id="file-input"
        ref={fileInputRef}
        accept="video/*"
        className="hidden"
        onChange={handleFileInputChange}
      />

      <i className="ri-upload-cloud-2-line text-5xl text-gray-400 mb-4"></i>
      <h4 className="font-medium text-lg mb-2">Drag and drop your video here</h4>
      <p className="text-gray-500 mb-4">or click to select a file</p>
      <p className="text-xs text-gray-400">
        Supports all common video formats (MP4, WebM, MOV, AVI, etc.)
      </p>
      <p className="text-xs text-gray-400 mt-1">No file size limits!</p>
    </div>
  );
}
