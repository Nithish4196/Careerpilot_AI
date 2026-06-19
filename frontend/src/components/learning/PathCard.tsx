import React from 'react';
import { CareerPath } from '@/types/learning';
import { ArrowRight } from 'lucide-react';

interface PathCardProps {
  path: CareerPath;
  onClick: (path: CareerPath) => void;
}

export default function PathCard({ path, onClick }: PathCardProps) {
  const Icon = path.icon;

  return (
    <div 
      onClick={() => onClick(path)}
      className="bg-background border border-muted rounded-2xl p-6 hover:border-foreground/20 cursor-pointer group flex flex-col h-full"
    >
      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0 mb-4 group-hover:bg-foreground transition-colors duration-150 ease-out group-hover:text-background transition-colors text-muted-foreground">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-lg mb-2 text-foreground">{path.title}</h3>
      <p className="text-xs font-medium text-muted-foreground mb-6 flex-grow">{path.description}</p>
      
      <div className="flex items-center text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors mt-auto">
        View courses
        <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
      </div>
    </div>
  );
}
