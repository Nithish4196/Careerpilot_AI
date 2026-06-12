import React from 'react';
import { Job } from '@/types/job';
import { MapPin, Briefcase, IndianRupee, Clock, Bookmark, Building2, Zap } from 'lucide-react';

interface JobCardProps {
  job: Job;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onClick: (job: Job) => void;
}

export default function JobCard({ job, isSaved = false, onToggleSave, onClick }: JobCardProps) {
  // Strict monochromatic styling for score
  const getScoreStyle = (score: number) => {
    if (score >= 90) return "text-foreground bg-foreground/10 border-foreground/20 font-extrabold";
    if (score >= 70) return "text-foreground bg-muted border-muted-foreground/30";
    return "text-muted-foreground bg-background border-muted";
  };

  return (
    <div 
      onClick={() => onClick(job)}
      className="bg-background border border-muted rounded-2xl p-6 hover:shadow-lg hover:border-foreground/20 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
            {job.companyLogo ? (
              <img src={job.companyLogo} alt={job.companyName} className="w-8 h-8 object-contain" />
            ) : (
              <Building2 className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{job.role}</h3>
            <p className="text-sm font-medium text-muted-foreground">{job.companyName}</p>
          </div>
        </div>
        
        {/* Save Bookmark */}
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            if (onToggleSave) onToggleSave(); 
          }}
          className={`p-2 rounded-full transition-colors ${isSaved ? 'text-foreground bg-muted border border-muted-foreground/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-1.5 text-sm font-semibold bg-muted/50 px-2.5 py-1 rounded-md">
          <IndianRupee className="w-4 h-4 text-muted-foreground" />
          <span>₹{job.salaryMin} LPA - ₹{job.salaryMax} LPA</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground bg-muted/30 px-2.5 py-1 rounded-md">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground bg-muted/30 px-2.5 py-1 rounded-md">
          <Briefcase className="w-4 h-4" />
          <span>{job.experienceLevel}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground bg-muted/30 px-2.5 py-1 rounded-md">
          <Clock className="w-4 h-4" />
          <span>{job.workType} • {job.workMode}</span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Required Skills</p>
        <div className="flex flex-wrap gap-2">
          {job.skillsRequired.map((skill, idx) => (
            <span key={idx} className="text-xs font-medium px-2 py-1 bg-background border border-muted rounded-md text-foreground">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-muted pt-4">
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-muted-foreground">Posted {job.postedDate}</span>
          <span className="text-xs font-medium px-2 py-1 bg-muted rounded text-foreground">Via {job.source}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm ${getScoreStyle(job.aiMatch.score)}`}>
            <Zap className="w-4 h-4 fill-current" />
            {job.aiMatch.score}% Match
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); /* quick apply */ }}
            className="bg-foreground text-background text-sm font-bold px-5 py-2 rounded-lg hover:bg-foreground/90 transition-colors"
          >
            Quick Apply
          </button>
        </div>
      </div>
    </div>
  );
}
