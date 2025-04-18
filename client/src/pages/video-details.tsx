import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Video } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import VideoPlayer from "@/components/video/video-player";
import VideoShare from "@/components/video/video-share";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
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
import { useLocation } from "wouter";

export default function VideoDetails() {
  const { videoId } = useParams();
  const [title, setTitle] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const { toast } = useToast();
  const [location, navigate] = useLocation();

  // Fetch video details
  const { data: video, isLoading, error } = useQuery<Video>({
    queryKey: [`/api/videos/${videoId}`],
    onSuccess: (data) => {
      setTitle(data.title);
      setPrivacy(data.privacy);
    }
  });

  // Update video mutation
  const updateMutation = useMutation({
    mutationFn: async (data: { title: string; privacy: string }) => {
      const res = await apiRequest('PUT', `/api/videos/${videoId}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/videos/${videoId}`] });
      toast({
        title: "Success",
        description: "Video settings updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update video: ${error}`,
        variant: "destructive",
      });
    }
  });

  // Delete video mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('DELETE', `/api/videos/${videoId}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Video deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
      navigate('/');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete video: ${error}`,
        variant: "destructive",
      });
    }
  });

  const handleSaveChanges = () => {
    updateMutation.mutate({ title, privacy });
  };

  const handleDeleteVideo = () => {
    deleteMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center">
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
          <i className="ri-loader-4-line text-xl text-primary animate-spin"></i>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-red-500 text-6xl mb-4">
            <i className="ri-error-warning-line"></i>
          </div>
          <h3 className="text-xl font-semibold mb-2">Video Not Found</h3>
          <p className="text-gray-600 mb-6">
            The video you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Calculate human-readable file size
  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  // Format duration in seconds to MM:SS
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const timeAgo = video.createdAt ? format(new Date(video.createdAt), 'PPpp') : 'Recently';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <i className="ri-video-line mr-2 text-primary"></i>
            Video Details
          </h3>
          
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="lg:w-2/3">
              <div className="relative bg-black aspect-video rounded-lg overflow-hidden mb-4">
                <VideoPlayer videoId={videoId} />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <h4 className="text-lg font-medium mb-2 sm:mb-0">
                  {video.title}
                </h4>
                <div className="flex items-center text-sm text-gray-500">
                  <i className="ri-time-line mr-1"></i>
                  <span>Uploaded <time dateTime={video.createdAt?.toString()}>{timeAgo}</time></span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {video.resolution && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <i className="ri-hd-line mr-1"></i> {video.resolution}
                  </span>
                )}
                {video.format && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <i className="ri-film-line mr-1"></i> {video.format.toUpperCase()}
                  </span>
                )}
                {video.duration && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <i className="ri-timer-line mr-1"></i> {formatDuration(video.duration)}
                  </span>
                )}
                {video.fileSize && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <i className="ri-hard-drive-2-line mr-1"></i> {formatFileSize(video.fileSize)}
                  </span>
                )}
              </div>
            </div>
            
            <div className="lg:w-1/3 bg-gray-50 rounded-lg p-5">
              <VideoShare videoId={videoId} videoTitle={video.title} />
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-medium mb-4">Video Settings</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Title Setting */}
              <div>
                <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input
                  id="edit-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                />
              </div>
              
              {/* Privacy Setting */}
              <div>
                <label htmlFor="privacy-setting" className="block text-sm font-medium text-gray-700 mb-1">
                  Privacy
                </label>
                <Select value={privacy} onValueChange={setPrivacy}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select privacy setting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Anyone with the link can view</SelectItem>
                    <SelectItem value="unlisted">Unlisted - Only people with the link can view</SelectItem>
                    <SelectItem value="private">Private - Only you can view</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    Delete Video
                  </Button>
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
                      onClick={handleDeleteVideo}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <Button onClick={handleSaveChanges} disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
