import React from 'react';
import { Course } from '@/types/learning';
import { Star, Users, Clock, ExternalLink } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <a 
      href={course.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-background border border-muted rounded-2xl p-5 hover:shadow-lg hover:border-foreground/20 transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Platform Badge - Monochromatic */}
        <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-muted text-foreground rounded-full">
          {course.platform}
        </span>
        
        {/* Conditional Badges */}
        {course.free && (
          <span className="px-2 py-1 text-[10px] font-bold border border-foreground text-foreground rounded-full">
            Free
          </span>
        )}
        {course.demand === 'high' && (
          <span className="px-2 py-1 text-[10px] font-bold border border-muted-foreground text-muted-foreground rounded-full">
            In Demand
          </span>
        )}
        {course.type === 'certification' && (
          <span className="px-2 py-1 text-[10px] font-bold bg-foreground text-background rounded-full">
            Certificate
          </span>
        )}
      </div>

      <h3 className="font-bold text-base mb-4 flex-grow group-hover:text-primary transition-colors leading-snug">
        {course.title}
      </h3>
      
      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground mt-auto">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {course.duration}
        </div>
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5" />
          {course.rating}
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          {course.enrolled}
        </div>
      </div>
      
      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink className="w-4 h-4 text-muted-foreground" />
      </div>
    </a>
  );
}
