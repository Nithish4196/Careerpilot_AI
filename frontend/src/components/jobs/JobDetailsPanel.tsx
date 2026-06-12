import React from 'react';
import { Job } from '@/types/job';
import { X, ExternalLink, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { logActivity } from '@/lib/activity';

interface JobDetailsPanelProps {
  job: Job | null;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onClose: () => void;
}

export default function JobDetailsPanel({ job, isSaved = false, onToggleSave, onClose }: JobDetailsPanelProps) {
  const { user } = useAuth();
  
  if (!job) return null;

  const handleApplyClick = () => {
    if (user) {
      logActivity(user.uid, "jobsApplied");
    }
  };

  const handleSaveClick = () => {
    if (user && !isSaved) {
      // Only log on save, not unsave
      logActivity(user.uid, "jobsApplied");
    }
    if (onToggleSave) onToggleSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-background/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-background border-l border-muted h-full overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Sticky Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-muted p-6 z-10 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">{job.role}</h2>
            <p className="text-muted-foreground font-medium">{job.companyName} • {job.location}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/30 p-4 rounded-xl border border-muted">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Expected Salary</p>
              <p className="font-bold text-lg">₹{job.salaryMin}L - ₹{job.salaryMax}L</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-xl border border-muted">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Experience</p>
              <p className="font-bold text-lg">{job.experienceLevel}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-xl border border-muted">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Work Type</p>
              <p className="font-bold text-lg">{job.workType} • {job.workMode}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-xl border border-muted">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Source</p>
              <p className="font-bold text-lg">{job.source}</p>
            </div>
          </div>

          {/* AI Skill Gap Analysis */}
          <div className="border border-muted rounded-xl overflow-hidden">
            <div className="bg-foreground text-background p-4 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                AI Match Analysis
              </h3>
              <span className="font-extrabold text-xl">{job.aiMatch.score}%</span>
            </div>
            <div className="p-5 space-y-5">
              <div>
                <p className="text-sm font-semibold mb-2">Why this matches you:</p>
                <p className="text-sm text-muted-foreground">{job.aiMatch.whyItMatches}</p>
              </div>
              
              {job.aiMatch.missingSkills.length > 0 && (
                <div className="bg-muted/30 border border-muted-foreground/30 rounded-lg p-4">
                  <p className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Missing Skills
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.aiMatch.missingSkills.map(skill => (
                      <span key={skill} className="text-xs font-medium bg-background border border-muted-foreground text-foreground px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-foreground">
                    <strong>Recommendation:</strong> {job.aiMatch.recommendations.join(', ')}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Job Description */}
          <section>
            <h3 className="text-xl font-bold mb-4">Job Description</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {job.description}
            </p>

            <h4 className="font-bold mb-3">Key Responsibilities</h4>
            <ul className="space-y-2 mb-6">
              {job.responsibilities.map((req, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-muted-foreground items-start">
                  <CheckCircle2 className="w-5 h-5 text-foreground shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>

            <h4 className="font-bold mb-3">Benefits</h4>
            <ul className="list-disc list-inside space-y-1 mb-6 text-sm text-muted-foreground">
              {job.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </section>

          {/* Company Overview */}
          <section className="bg-muted/20 p-6 rounded-xl border border-muted">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              About {job.companyName}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {job.companyOverview}
            </p>
          </section>

        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-muted p-6 flex justify-end gap-4 mt-auto">
          <button 
            onClick={handleSaveClick}
            className={`px-6 py-3 rounded-xl font-bold text-sm border transition-colors ${isSaved ? 'bg-muted border-foreground/20 text-foreground' : 'border-muted hover:bg-muted text-foreground'}`}
          >
            {isSaved ? 'Saved' : 'Save Job'}
          </button>
          <a 
            href={job.applyLink}
            onClick={handleApplyClick}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-foreground text-background px-8 py-3 rounded-xl font-bold text-sm hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Apply Now <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
