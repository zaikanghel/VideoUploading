import { useQuery } from '@tanstack/react-query';
import { Video } from '@shared/schema';
import VideoCard from './video-card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function RecentVideos() {
  const [limit, setLimit] = useState(6);
  
  const { data: videos, isLoading, error } = useQuery<Video[]>({
    queryKey: [`/api/videos?limit=${limit}&offset=0`],
  });

  const loadMore = () => {
    setLimit(prevLimit => prevLimit + 6);
  };

  return (
    <section id="recent-videos" className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <i className="ri-time-line mr-2 text-primary"></i>
          Recent Videos
        </h3>
        <div className="flex space-x-2">
          <button className="p-2 rounded hover:bg-gray-100 transition-colors">
            <i className="ri-list-check-2"></i>
          </button>
          <button className="p-2 rounded hover:bg-gray-100 transition-colors">
            <i className="ri-function-line"></i>
          </button>
        </div>
      </div>
      
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-primary animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <i className="ri-error-warning-line text-3xl text-red-500 mb-2"></i>
          <h4 className="font-medium text-lg mb-2">Failed to load videos</h4>
          <p className="text-gray-600">There was a problem loading the video list. Please try again later.</p>
        </div>
      )}

      {videos && videos.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <i className="ri-film-line text-5xl text-gray-400 mb-4"></i>
          <h4 className="font-medium text-lg mb-2">No Videos Yet</h4>
          <p className="text-gray-600 mb-6">Upload your first video to get started!</p>
          <Button
            onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-blue-600"
          >
            <i className="ri-upload-cloud-2-line mr-2"></i>
            Upload Now
          </Button>
        </div>
      )}
      
      {videos && videos.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
          
          {videos.length >= limit && (
            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                onClick={loadMore}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-3"
              >
                Load More Videos
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
