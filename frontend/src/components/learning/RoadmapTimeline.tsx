import React from 'react';
import { RoadmapPhase } from '@/types/learning';
import { CheckCircle2 } from 'lucide-react';

interface RoadmapTimelineProps {
  roadmap: RoadmapPhase[];
}

export default function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[27px] top-4 bottom-10 w-0.5 bg-muted"></div>
        
        {roadmap.map((phase, index) => {
          const isFirstOrLast = index === 0 || index === roadmap.length - 1;
          
          return (
            <div key={index} className="relative flex items-start gap-8 mb-12 last:mb-0 group">
              {/* Timeline Node */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-4 bg-background transition-colors ${
                  isFirstOrLast 
                    ? 'border-foreground text-foreground' 
                    : 'border-muted text-muted-foreground group-hover:border-foreground/50 group-hover:text-foreground'
                }`}>
                  {index + 1}
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-background border border-muted rounded-2xl p-6 group-hover:border-foreground/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h3 className="text-xl font-bold">{phase.phase}</h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full text-xs font-bold tracking-wide">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {phase.weeks}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {phase.skills.map(skill => (
                    <span 
                      key={skill}
                      className="px-3 py-1.5 bg-muted/50 border border-muted-foreground/20 text-foreground text-sm font-medium rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-muted/30 border border-muted rounded-xl p-4 text-center">
        <p className="text-sm text-muted-foreground font-medium">
          <strong className="text-foreground">Timelines are estimates.</strong> Consistency beats speed — 1–2 hours daily is enough.
        </p>
      </div>
    </div>
  );
}
