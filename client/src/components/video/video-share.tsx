import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface VideoShareProps {
  videoId: string;
  videoTitle: string;
}

export default function VideoShare({ videoId, videoTitle }: VideoShareProps) {
  const { toast } = useToast();
  const directLinkRef = useRef<HTMLInputElement>(null);
  const embedCodeRef = useRef<HTMLTextAreaElement>(null);

  // Generate direct link
  const directLink = `${window.location.origin}/video/${videoId}`;
  
  // Generate embed code
  const embedCode = `<iframe width="560" height="315" src="${window.location.origin}/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;

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

  return (
    <div>
      <h4 className="font-medium mb-4">Share Your Video</h4>
      
      {/* Direct Link */}
      <div className="mb-4">
        <label htmlFor="direct-link" className="block text-sm font-medium text-gray-700 mb-1">
          Direct Link
        </label>
        <div className="flex">
          <Input
            ref={directLinkRef}
            id="direct-link"
            value={directLink}
            readOnly
            className="flex-grow rounded-r-none focus:ring-0"
          />
          <Button 
            variant="outline" 
            className="border-l-0 rounded-l-none"
            onClick={() => copyToClipboard(directLink, "Link copied to clipboard")}
          >
            <i className="ri-clipboard-line"></i>
          </Button>
        </div>
      </div>
      
      {/* Embed Code */}
      <div className="mb-4">
        <label htmlFor="embed-code" className="block text-sm font-medium text-gray-700 mb-1">
          Embed Code
        </label>
        <div className="flex">
          <Textarea
            ref={embedCodeRef}
            id="embed-code"
            rows={3}
            readOnly
            value={embedCode}
            className="flex-grow rounded-r-none focus:ring-0 resize-none font-mono text-sm"
          />
          <Button 
            variant="outline" 
            className="border-l-0 rounded-l-none h-auto"
            onClick={() => copyToClipboard(embedCode, "Embed code copied to clipboard")}
          >
            <i className="ri-clipboard-line"></i>
          </Button>
        </div>
      </div>
      
      {/* Social Sharing */}
      <div>
        <h5 className="text-sm font-medium text-gray-700 mb-2">Share on Social Media</h5>
        <div className="flex gap-2">
          <button 
            className="w-10 h-10 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(directLink)}`, '_blank')}
          >
            <i className="ri-facebook-fill"></i>
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-[#1DA1F2] hover:bg-blue-500 text-white flex items-center justify-center transition-colors"
            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(directLink)}&text=${encodeURIComponent(`Check out this video: ${videoTitle}`)}`, '_blank')}
          >
            <i className="ri-twitter-fill"></i>
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-[#0A66C2] hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
            onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(directLink)}`, '_blank')}
          >
            <i className="ri-linkedin-fill"></i>
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-green-500 text-white flex items-center justify-center transition-colors"
            onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this video: ${videoTitle} ${directLink}`)}`, '_blank')}
          >
            <i className="ri-whatsapp-fill"></i>
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: videoTitle,
                  url: directLink
                });
              } else {
                toast({
                  title: "Sharing not supported",
                  description: "Your browser doesn't support the Web Share API",
                  variant: "destructive",
                });
              }
            }}
          >
            <i className="ri-more-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
