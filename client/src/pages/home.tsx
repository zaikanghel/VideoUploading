import { useState } from "react";
import UploadDropzone from "@/components/upload/upload-dropzone";
import ProcessingSection from "@/components/upload/processing-section";
import RecentVideos from "@/components/video/recent-videos";
import FeatureSection from "@/components/features/feature-section";
import { useUpload } from "@/hooks/use-upload";
import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();
  const { 
    uploadState, 
    uploadProgress, 
    currentFile,
    processingProgress,
    videoId,
    handleFileSelect, 
    handleUploadComplete,
    handleProcessingComplete,
    resetUpload
  } = useUpload();

  const scrollToUpload = () => {
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="mb-16 py-12 px-4 sm:px-6 lg:px-8 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white shadow-lg overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-white"></div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Share Your Videos <span className="block">Without Limits</span>
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg">
            Upload videos of any size, get an embed code instantly, and share with anyone - 
            <span className="font-semibold bg-blue-200 text-blue-800 px-2 py-1 rounded mx-1">no account required</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={scrollToUpload}
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-lg transition-colors flex items-center shadow-md transform hover:scale-105 transition-transform"
            >
              <i className="ri-upload-cloud-2-line mr-2 text-xl"></i>
              Upload Video
            </button>
            <a
              href="#recent-videos"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-lg transition-colors border border-blue-400"
            >
              <i className="ri-play-circle-line mr-2 text-xl"></i>
              View Recent Videos
            </a>
          </div>
          
          <div className="mt-10 flex justify-center space-x-8 text-blue-100">
            <div className="flex flex-col items-center">
              <i className="ri-infinite-line text-2xl mb-2"></i>
              <span className="text-sm">Unlimited Size</span>
            </div>
            <div className="flex flex-col items-center">
              <i className="ri-timer-line text-2xl mb-2"></i>
              <span className="text-sm">Fast Processing</span>
            </div>
            <div className="flex flex-col items-center">
              <i className="ri-share-line text-2xl mb-2"></i>
              <span className="text-sm">Easy Sharing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload-section" className="mb-16">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <i className="ri-upload-cloud-2-line mr-2 text-primary"></i>
              Upload New Video
            </h3>

            {uploadState === "idle" && (
              <UploadDropzone onFileSelect={handleFileSelect} />
            )}

            {(uploadState === "uploading" || uploadState === "uploaded") && (
              <div className="mb-6">
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
                        strokeDasharray="264" 
                        strokeDashoffset={264 - (264 * uploadProgress / 100)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-lg font-medium">
                      {uploadProgress}%
                    </div>
                  </div>
                  <h4 className="font-medium text-lg mb-2 text-center">
                    {uploadState === "uploading" ? "Uploading video..." : "Upload Successful!"}
                  </h4>
                  <p className="text-gray-500 mb-4 text-center">{currentFile?.name}</p>
                  {uploadState === "uploading" ? (
                    <div className="text-center">
                      <button 
                        onClick={resetUpload}
                        className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                      >
                        Cancel upload
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <button 
                        onClick={resetUpload}
                        className="text-primary hover:text-blue-600 transition-colors text-sm font-medium"
                      >
                        Upload another video
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {uploadState === "error" && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <div className="upload-error">
                  <i className="ri-error-warning-line text-4xl text-red-500 mb-4"></i>
                  <h4 className="font-medium text-lg mb-2">Upload Failed</h4>
                  <p className="text-gray-500 mb-4">There was a problem uploading your video. Please try again.</p>
                  <button 
                    onClick={resetUpload}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {uploadState === "processing" && (
              <ProcessingSection 
                filename={currentFile?.name || ""}
                progress={processingProgress}
                onComplete={() => {
                  handleProcessingComplete();
                  if (videoId) {
                    navigate(`/video/${videoId}`);
                  }
                }}
              />
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500">
              <div className="flex items-center mb-2 sm:mb-0">
                <i className="ri-information-line mr-1"></i>
                <span>Files are retained for 30 days</span>
              </div>
              <a href="#" className="text-primary hover:text-blue-600 transition-colors">
                Learn more about our retention policy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Videos Section */}
      <RecentVideos />

      {/* Features Section */}
      <FeatureSection />
    </div>
  );
}
