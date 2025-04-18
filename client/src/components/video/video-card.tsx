import { Link } from 'wouter';
import { formatDistance } from 'date-fns';
import { Video } from '@shared/schema';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const { toast } = useToast();

  // Format duration in seconds to MM:SS
  const formatDuration = (seconds?: number): string => {
    if (!seconds) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Calculate time since upload
  const getTimeAgo = (date?: Date | string): string => {
    if (!date) return "Recently";
    return formatDistance(new Date(date), new Date(), { addSuffix: true });
  };

  // Generate placeholder thumbnail based on video title
  const generateThumbnail = (title: string, videoId: string): string => {
    // Use a placeholder image that looks more like a video thumbnail
    // Creating a deterministic color for each video based on videoId
    const hash = videoId.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const h = Math.abs(hash) % 360;
    const s = 50 + (Math.abs(hash) % 30); // Between 50-80%
    const l = 55 + (Math.abs(hash) % 15); // Between 55-70%
    
    const colorHsl = `hsl(${h}, ${s}%, ${l}%)`;
    const textColor = l > 65 ? '333333' : 'FFFFFF';
    
    const sanitizedTitle = encodeURIComponent(title.substring(0, 20));
    return `https://via.placeholder.com/600x340/${colorHsl.replace('#', '')}/FFFFFF?text=${sanitizedTitle}`;
  };

  // Delete video mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('DELETE', `/api/videos/${video.videoId}`);
    },
    onSuccess: () => {
      toast({
        title: "Video deleted",
        description: "Your video has been successfully deleted",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete video: ${error}`,
        variant: "destructive",
      });
    }
  });

  // Copy to clipboard function
  const copyToClipboard = (text: string, successMessage: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Copied!",
          description: successMessage,
        });
      })
      .catch((err) => {
        toast({
          title: "Failed to copy",
          description: "Could not copy to clipboard",
          variant: "destructive",
        });
      });
  };

  const getDirectLink = () => {
    return `${window.location.origin}/video/${video.videoId}`;
  };

  const getEmbedCode = () => {
    return `<iframe width="560" height="315" src="${window.location.origin}/embed/${video.videoId}" frameborder="0" allowfullscreen></iframe>`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1 group/card">
      <Link href={`/video/${video.videoId}`}>
        <a className="block relative">
          <div className="aspect-video relative overflow-hidden bg-gray-100">
            <img 
              src={generateThumbnail(video.title, video.videoId)}
              alt={video.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
            />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform -translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center ml-1">
                  <i className="ri-play-fill text-3xl text-white"></i>
                </div>
              </div>
            </div>
            
            {/* Format badge */}
            {video.format && (
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md uppercase tracking-wider font-medium">
                {video.format}
              </div>
            )}
            
            {/* Duration badge */}
            {video.duration && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium">
                {formatDuration(video.duration)}
              </div>
            )}
          </div>
        </a>
      </Link>
      
      <div className="p-5">
        <Link href={`/video/${video.videoId}`}>
          <a className="block">
            <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-primary transition-colors line-clamp-2">
              {video.title}
            </h3>
          </a>
        </Link>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white">
              <i className="ri-user-fill text-sm"></i>
            </div>
            <span className="text-sm text-gray-600 ml-2">Anonymous</span>
          </div>
          <div className="text-sm text-gray-500">
            {getTimeAgo(video.createdAt)}
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <div className="bg-blue-50 text-blue-600 py-1 px-2 rounded-full flex items-center mr-4">
            <i className="ri-eye-line mr-1"></i> {video.views}
          </div>
          {video.resolution && (
            <div className="bg-gray-100 text-gray-700 py-1 px-2 rounded-full flex items-center">
              <i className="ri-hd-line mr-1"></i> {video.resolution}
            </div>
          )}
        </div>
        
        <div className="flex justify-between pt-4 border-t border-gray-100">
          <div className="flex">
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-gray-700 hover:text-primary transition-colors mr-4 flex items-center">
                  <i className="ri-share-line mr-1"></i> Share
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="space-y-3">
                  <h5 className="font-semibold text-sm">Share Video</h5>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs text-gray-500">Direct Link</label>
                    <div className="flex">
                      <input 
                        className="flex-1 px-2 py-1 text-xs border rounded-l-md" 
                        value={getDirectLink()}
                        readOnly
                      />
                      <button 
                        className="px-2 border border-l-0 rounded-r-md hover:bg-gray-50"
                        onClick={() => copyToClipboard(getDirectLink(), "Link copied to clipboard")}
                      >
                        <i className="ri-clipboard-line"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <button className="w-8 h-8 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-sm hover:shadow">
                      <i className="ri-facebook-fill"></i>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-[#1DA1F2] hover:bg-blue-500 text-white flex items-center justify-center transition-colors shadow-sm hover:shadow">
                      <i className="ri-twitter-fill"></i>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-[#0A66C2] hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-sm hover:shadow">
                      <i className="ri-linkedin-fill"></i>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-green-500 text-white flex items-center justify-center transition-colors shadow-sm hover:shadow">
                      <i className="ri-whatsapp-fill"></i>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button className="text-gray-700 hover:text-primary transition-colors flex items-center">
                  <i className="ri-code-line mr-1"></i> Embed
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <h5 className="font-semibold text-sm">Embed Video</h5>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs text-gray-500">Embed Code</label>
                    <div className="flex">
                      <textarea 
                        className="flex-1 px-2 py-1 text-xs border rounded-l-md h-20 font-mono"
                        value={getEmbedCode()}
                        readOnly
                      />
                      <button 
                        className="px-2 border border-l-0 rounded-r-md hover:bg-gray-50 self-stretch"
                        onClick={() => copyToClipboard(getEmbedCode(), "Embed code copied to clipboard")}
                      >
                        <i className="ri-clipboard-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-gray-700 hover:text-red-500 transition-colors flex items-center">
                <i className="ri-delete-bin-line mr-1"></i> Delete
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your video.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteMutation.mutate()}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
