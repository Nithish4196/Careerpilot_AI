"use client";

import React, { useState } from 'react';
import { RoadmapRequest } from '@/types/roadmap';
import { MapIcon, FolderOpen, ArrowRight, X } from 'lucide-react';

interface LandingFormProps {
  onSubmit: (request: RoadmapRequest) => void;
  onViewSaved: () => void;
  hasSaved: boolean;
}

const TARGET_ROLE_SUGGESTIONS = [
  "Data Analyst", "Data Scientist", "AI Engineer", "ML Engineer",
  "Full Stack Developer", "Frontend Developer", "Backend Developer",
  "DevOps Engineer", "Cloud Engineer", "Product Manager",
  "Cybersecurity Analyst", "Mobile Developer", "Data Engineer",
  "Solution Architect", "Blockchain Developer"
];

const PREFILL_CHIPS = [
  { label: "Zero to Data Analyst", target: "Data Analyst", current: "Beginner / Zero Experience" },
  { label: "CS Student to SDE at FAANG", target: "Software Development Engineer", current: "Final Year CS Student" },
  { label: "Manual Tester to SDET", target: "Software Development Engineer in Test", current: "Manual Tester" },
  { label: "Commerce Graduate to Full Stack Dev", target: "Full Stack Developer", current: "Commerce Graduate" },
  { label: "Python Dev to AI Engineer", target: "AI Engineer", current: "Python Developer" },
  { label: "Fresher to DevOps Engineer", target: "DevOps Engineer", current: "Fresher" }
];

export default function LandingForm({ onSubmit, onViewSaved, hasSaved }: LandingFormProps) {
  const [currentRole, setCurrentRole] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);
  
  const [currentSkillInput, setCurrentSkillInput] = useState("");
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  
  const [experienceLevel, setExperienceLevel] = useState("Junior (1–3 yrs)");
  const [timePerWeek, setTimePerWeek] = useState("10 hrs/week");
  const [learningStyle, setLearningStyle] = useState("Mixed");
  const [primaryGoal, setPrimaryGoal] = useState("Switch Careers");
  const [targetTimeline, setTargetTimeline] = useState("");

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = currentSkillInput.trim().replace(/,/g, '');
      if (val && !currentSkills.includes(val)) {
        setCurrentSkills([...currentSkills, val]);
      }
      setCurrentSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setCurrentSkills(currentSkills.filter(s => s !== skill));
  };

  const handlePrefill = (chip: typeof PREFILL_CHIPS[0]) => {
    setTargetRole(chip.target);
    setCurrentRole(chip.current);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRole.trim() || !targetRole.trim()) return;

    onSubmit({
      currentRole,
      targetRole,
      currentSkills,
      experienceLevel,
      timePerWeek,
      learningStyle,
      primaryGoal,
      targetTimeline
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
            <MapIcon className="w-8 h-8 text-primary" />
            Build Your Career Roadmap
          </h1>
          <p className="text-muted-foreground text-lg">
            Tell us where you are and where you want to go. AI will build a personalized step-by-step roadmap to get you there.
          </p>
        </div>
        {hasSaved && (
          <button 
            onClick={onViewSaved}
            className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 border border-muted text-foreground font-semibold rounded-xl hover:bg-muted transition-colors"
          >
            <FolderOpen className="w-4 h-4" /> Saved Roadmaps
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-background border border-muted rounded-3xl p-6 md:p-8 shadow-sm">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Current Role */}
          <div>
            <label className="block text-sm font-bold mb-2">Current Role / Background</label>
            <input 
              required
              type="text"
              value={currentRole}
              onChange={e => setCurrentRole(e.target.value)}
              placeholder='e.g. "Final year CS student" or "2 years manual tester"'
              className="w-full bg-muted/30 border border-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Target Role with Auto-suggest */}
          <div className="relative">
            <label className="block text-sm font-bold mb-2">Target Role</label>
            <input 
              required
              type="text"
              value={targetRole}
              onFocus={() => setShowRoleSuggestions(true)}
              onBlur={() => setTimeout(() => setShowRoleSuggestions(false), 200)}
              onChange={e => {
                setTargetRole(e.target.value);
                setShowRoleSuggestions(true);
              }}
              placeholder='e.g. "Data Analyst" or "ML Engineer"'
              className="w-full bg-muted/30 border border-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
            {showRoleSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-muted rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto p-2 flex flex-wrap gap-2">
                {TARGET_ROLE_SUGGESTIONS.filter(s => s.toLowerCase().includes(targetRole.toLowerCase())).map(suggestion => (
                  <button
                    key={suggestion}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent onBlur from hiding immediately
                      setTargetRole(suggestion);
                      setShowRoleSuggestions(false);
                    }}
                    className="px-3 py-1.5 bg-muted/50 text-xs font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Current Skills */}
        <div className="mb-8">
          <label className="block text-sm font-bold mb-2">Current Skills (Press Enter to add)</label>
          <div className="w-full min-h-[50px] bg-muted/30 border border-muted rounded-xl p-2 flex flex-wrap gap-2 focus-within:border-primary/50 transition-colors">
            {currentSkills.map(skill => (
              <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-muted rounded-lg text-xs font-bold">
                {skill}
                <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-muted-foreground hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input 
              type="text"
              value={currentSkillInput}
              onChange={e => setCurrentSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder={currentSkills.length === 0 ? "Type a skill and press Enter (e.g. Python, SQL)" : ""}
              className="flex-1 min-w-[200px] bg-transparent outline-none px-2 py-1 text-sm"
            />
          </div>
        </div>

        {/* Pill Selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          <div className="space-y-4">
            <label className="block text-sm font-bold">Experience Level</label>
            <div className="flex flex-wrap gap-2">
              {['Student', 'Fresher (0–1 yr)', 'Junior (1–3 yrs)', 'Mid-level (3–5 yrs)', 'Senior (5+ yrs)'].map(opt => (
                <button
                  key={opt} type="button" onClick={() => setExperienceLevel(opt)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${experienceLevel === opt ? 'bg-foreground text-background border-foreground' : 'bg-background border-muted text-muted-foreground hover:border-foreground/30'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold">Available Time Per Week</label>
            <div className="flex flex-wrap gap-2">
              {['5 hrs/week', '10 hrs/week', '20 hrs/week', '40 hrs/week (Full-time)'].map(opt => (
                <button
                  key={opt} type="button" onClick={() => setTimePerWeek(opt)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${timePerWeek === opt ? 'bg-foreground text-background border-foreground' : 'bg-background border-muted text-muted-foreground hover:border-foreground/30'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold">Learning Style</label>
            <div className="flex flex-wrap gap-2">
              {['Video Courses', 'Reading / Docs', 'Project-based', 'Mixed'].map(opt => (
                <button
                  key={opt} type="button" onClick={() => setLearningStyle(opt)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${learningStyle === opt ? 'bg-foreground text-background border-foreground' : 'bg-background border-muted text-muted-foreground hover:border-foreground/30'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold">Primary Goal</label>
            <div className="flex flex-wrap gap-2">
              {['Get First Job', 'Switch Careers', 'Get Promoted', 'Freelancing', 'Upskill Only'].map(opt => (
                <button
                  key={opt} type="button" onClick={() => setPrimaryGoal(opt)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${primaryGoal === opt ? 'bg-foreground text-background border-foreground' : 'bg-background border-muted text-muted-foreground hover:border-foreground/30'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Target Timeline */}
        <div className="mb-8">
          <label className="block text-sm font-bold mb-2">Target Timeline (Optional)</label>
          <input 
            type="text"
            value={targetTimeline}
            onChange={e => setTargetTimeline(e.target.value)}
            placeholder='e.g. "6 months" or "by December 2025"'
            className="w-full md:w-1/2 bg-muted/30 border border-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <button 
          type="submit"
          disabled={!currentRole.trim() || !targetRole.trim()}
          className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate My Roadmap <ArrowRight className="w-5 h-5" />
        </button>

      </form>

      {/* Prefill Chips */}
      <div className="mt-8">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Or try an example:</p>
        <div className="flex flex-wrap gap-3">
          {PREFILL_CHIPS.map(chip => (
            <button
              key={chip.label}
              onClick={() => handlePrefill(chip)}
              className="px-4 py-2 bg-muted/30 border border-muted rounded-xl text-sm font-medium hover:border-foreground/30 hover:bg-muted/50 transition-colors"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
