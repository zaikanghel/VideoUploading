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
  const generateThumbnail = (title: string): string => {
    // Use a placeholder image generator service
    const sanitizedTitle = encodeURIComponent(title.substring(0, 20));
    return `https://via.placeholder.com/600x340/3B82F6/FFFFFF?text=${sanitizedTitle}`;
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
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Link href={`/video/${video.videoId}`}>
        <a className="block relative">
          <img 
            src={generateThumbnail(video.title)}
            alt={video.title} 
            className="w-full aspect-video object-cover"
          />
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {formatDuration(video.duration)}
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50">
            <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
              <i className="ri-play-fill text-3xl text-primary"></i>
            </div>
          </div>
        </a>
      </Link>
      <div className="p-4">
        <Link href={`/video/${video.videoId}`}>
          <a className="block">
            <h4 className="font-medium mb-1 truncate hover:text-primary transition-colors">
              {video.title}
            </h4>
          </a>
        </Link>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Uploaded {getTimeAgo(video.createdAt)}</span>
          <span className="flex items-center">
            <i className="ri-eye-line mr-1"></i> {video.views}
          </span>
        </div>
        <div className="flex mt-3 pt-3 border-t border-gray-100 text-sm">
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-gray-600 hover:text-primary transition-colors mr-3">
                <i className="ri-link"></i> Share
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Share Video</h5>
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
                  <button className="w-8 h-8 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white flex items-center justify-center transition-colors">
                    <i className="ri-facebook-fill"></i>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-[#1DA1F2] hover:bg-blue-500 text-white flex items-center justify-center transition-colors">
                    <i className="ri-twitter-fill"></i>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-[#0A66C2] hover:bg-blue-700 text-white flex items-center justify-center transition-colors">
                    <i className="ri-linkedin-fill"></i>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-green-500 text-white flex items-center justify-center transition-colors">
                    <i className="ri-whatsapp-fill"></i>
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button className="text-gray-600 hover:text-primary transition-colors mr-3">
                <i className="ri-code-line"></i> Embed
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Embed Video</h5>
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

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-gray-600 hover:text-red-500 transition-colors ml-auto">
                <i className="ri-delete-bin-line"></i>
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
                  className="bg-red-500 hover:bg-red-600"
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
