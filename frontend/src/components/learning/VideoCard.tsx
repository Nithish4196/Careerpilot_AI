import React from 'react';
import { SourceVideo } from '@/types/learning';
import { PlayCircle, Clock, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { logActivity } from '@/lib/activity';

interface VideoCardProps {
  video: SourceVideo;
}

export default function VideoCard({ video }: VideoCardProps) {
  const { user } = useAuth();
  
  const handleVideoClick = () => {
    if (user) {
      logActivity(user.uid, "coursesStudied");
    }
  };

  return (
    <a 
      href={video.url}
      onClick={handleVideoClick}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-background border border-muted rounded-2xl overflow-hidden hover:shadow-lg hover:border-foreground/20 transition-all cursor-pointer group flex flex-col h-full"
    >
      {/* Thumbnail Area */}
      <div className="h-36 bg-muted/50 flex items-center justify-center relative group-hover:bg-muted transition-colors">
        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
          {video.thumb}
        </span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/20 backdrop-blur-[2px]">
          <PlayCircle className="w-12 h-12 text-foreground" />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-sm mb-3 flex-grow group-hover:text-primary transition-colors line-clamp-2">
          {video.title}
        </h3>
        
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground mb-3">
          <div className="w-5 h-5 rounded bg-foreground text-background flex items-center justify-center text-[10px]">
            YT
          </div>
          {video.channel}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium text-muted-foreground mt-auto">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {video.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            {video.views}
          </div>
        </div>
      </div>
    </a>
  );
}
