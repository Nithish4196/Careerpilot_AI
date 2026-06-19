import React from 'react';
import { ProjectBlueprint } from '@/types/project';
import { Clock, Folder, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';

interface SavedProjectsProps {
  savedBlueprints: ProjectBlueprint[];
  onView: (bp: ProjectBlueprint) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

export default function SavedProjects({ savedBlueprints, onView, onDelete, onBack }: SavedProjectsProps) {
  
  if (savedBlueprints.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Folder className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">No saved projects yet</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-sm">
          Generate a new project blueprint and click the"Save" button to access it here later.
        </p>
        <button 
          onClick={onBack}
          className="px-6 py-3 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-colors duration-150 ease-out "
        >
          Create New Project
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      
      <div className="flex items-center justify-between mb-8 border-b border-muted pb-8">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-4 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Builder
          </button>
          <h1 className="text-4xl font-extrabold tracking-tight">Saved Projects</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedBlueprints.map(bp => (
          <div key={bp.id} className="bg-background border border-muted rounded-2xl p-6 flex flex-col hover:border-foreground/30 transition-colors group">
            
            <div className="flex items-start justify-between mb-4">
              <span className={`px-2 py-1 text-[10px] uppercase tracking-widest font-extrabold rounded-md ${
                bp.overview.complexity === 'Easy' ? 'bg-green-500/10 text-green-600' :
                bp.overview.complexity === 'Medium' ? 'bg-amber-500/10 text-amber-600' :
                'bg-red-500/10 text-red-600'
              }`}>
                {bp.overview.complexity}
              </span>
              <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {bp.overview.estimatedTime}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2 line-clamp-1">{bp.overview.title}</h3>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-grow">
              {bp.overview.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {bp.overview.techStack.slice(0, 3).map(tech => (
                <span key={tech} className="px-2 py-1 bg-muted/50 text-[10px] font-bold rounded uppercase tracking-wider text-muted-foreground">
                  {tech}
                </span>
              ))}
              {bp.overview.techStack.length > 3 && (
                <span className="px-2 py-1 bg-muted/30 text-[10px] font-bold rounded text-muted-foreground">
                  +{bp.overview.techStack.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-auto">
              <button 
                onClick={() => onView(bp)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-colors duration-150 ease-out transition-colors text-sm"
              >
                View Blueprint <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onDelete(bp.id)}
                className="p-2.5 border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors duration-150 ease-out rounded-xl transition-colors shrink-0"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
          </div>
        ))}
      </div>

    </div>
  );
}
