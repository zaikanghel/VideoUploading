import { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useQuery } from '@tanstack/react-query';
import { Video } from '@shared/schema';

interface VideoPlayerProps {
  videoId: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  const { data: video, isLoading, error } = useQuery<Video>({
    queryKey: [`/api/videos/${videoId}`],
  });

  const playerRef = useRef<ReactPlayer>(null);

  if (isLoading) {
    return (
      <div className="aspect-video bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-gray-600 border-t-primary animate-spin"></div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="aspect-video bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <i className="ri-error-warning-line text-3xl mb-2"></i>
          <p>Error loading video</p>
        </div>
      </div>
    );
  }

  // Determine actual video URL based on videoId
  const videoUrl = `/uploads/${videoId}${video.filePath.substring(video.filePath.lastIndexOf('.'))}`;

  return (
    <ReactPlayer
      ref={playerRef}
      url={videoUrl}
      width="100%"
      height="100%"
      controls
      playing={false}
      pip={true}
      stopOnUnmount={true}
      config={{
        file: {
          attributes: {
            controlsList: 'nodownload',
            disablePictureInPicture: false,
          }
        }
      }}
    />
  );
}
