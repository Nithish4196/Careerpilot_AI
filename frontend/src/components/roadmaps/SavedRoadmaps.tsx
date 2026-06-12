"use client";

import React from 'react';
import { CareerRoadmap } from '@/types/roadmap';
import { Clock, Folder, Trash2, ArrowRight, ArrowLeft, Target, CalendarCheck } from 'lucide-react';

interface SavedRoadmapsProps {
  savedRoadmaps: CareerRoadmap[];
  onView: (rm: CareerRoadmap) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

export default function SavedRoadmaps({ savedRoadmaps, onView, onDelete, onBack }: SavedRoadmapsProps) {
  
  if (savedRoadmaps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] animate-in fade-in duration-500">
        <Folder className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">No saved roadmaps yet</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-sm">
          Generate a new career roadmap and click the "Save" button to track your progress here.
        </p>
        <button 
          onClick={onBack}
          className="px-6 py-3 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-all"
        >
          Create New Roadmap
        </button>
      </div>
    );
  }

  // Calculate summaries
  const totalWeeksCompleted = savedRoadmaps.reduce((acc, rm) => acc + rm.weeklyPlan.filter(w => w.completed).length, 0);
  const totalSkillsLearned = savedRoadmaps.reduce((acc, rm) => {
    let count = 0;
    rm.skillTree.forEach(cat => cat.skills.forEach(s => { if (s.currentLevel === 'Advanced') count++; }));
    return acc + count;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto py-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 pb-8 border-b border-muted gap-6">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-4 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Generator
          </button>
          <h1 className="text-4xl font-extrabold tracking-tight">Saved Roadmaps</h1>
        </div>

        <div className="flex gap-4">
          <div className="bg-background border border-muted p-4 rounded-xl text-center min-w-[120px]">
            <div className="text-2xl font-black">{savedRoadmaps.length}</div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Roadmaps</div>
          </div>
          <div className="bg-background border border-muted p-4 rounded-xl text-center min-w-[120px]">
            <div className="text-2xl font-black">{totalWeeksCompleted}</div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Weeks Done</div>
          </div>
          <div className="bg-background border border-muted p-4 rounded-xl text-center min-w-[120px]">
            <div className="text-2xl font-black">{totalSkillsLearned}</div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Skills Mastered</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedRoadmaps.map(rm => {
          const completedWeeks = rm.weeklyPlan.filter(w => w.completed).length;
          const totalWeeks = rm.weeklyPlan.length;
          const progress = Math.round((completedWeeks / totalWeeks) * 100) || 0;

          return (
            <div key={rm.id} className="bg-background border border-muted rounded-2xl p-6 flex flex-col hover:border-foreground/30 transition-colors group">
              
              <div className="flex items-start justify-between mb-4">
                <span className="px-2 py-1 bg-green-500/10 text-green-600 text-[10px] uppercase tracking-widest font-extrabold rounded-md flex items-center gap-1">
                  <Target className="w-3 h-3" /> {rm.overview.readinessScore}% Ready
                </span>
                <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {rm.overview.estimatedTimeline}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-1 line-clamp-1">{rm.request.targetRole}</h3>
              <p className="text-xs font-semibold text-muted-foreground mb-6 line-clamp-1">
                Path: {rm.request.currentRole} → {rm.request.targetRole}
              </p>

              <div className="mb-6 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <CalendarCheck className="w-3.5 h-3.5"/> Plan Progress
                  </span>
                  <span className="text-xs font-bold text-foreground">{progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-auto">
                <button 
                  onClick={() => onView(rm)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-colors text-sm"
                >
                  Continue Roadmap <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onDelete(rm.id)}
                  className="p-2.5 border border-red-500/20 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors shrink-0"
                  title="Delete Roadmap"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
            </div>
          );
        })}
      </div>

    </div>
  );
}
