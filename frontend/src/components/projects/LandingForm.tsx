import React, { useState } from 'react';
import { ProjectRequest } from '@/types/project';
import { Code, Terminal, Database, Cloud, Sparkles, Smartphone, Layout, Blocks, Lock, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { logActivity } from '@/lib/activity';

interface LandingFormProps {
  onSubmit: (req: ProjectRequest) => void;
  onViewSaved: () => void;
  hasSaved: boolean;
}

const PROJECT_TYPES = [
  { id: "Full Stack Web", icon: Globe },
  { id: "Frontend", icon: Layout },
  { id: "Backend", icon: Terminal },
  { id: "AI / ML", icon: Sparkles },
  { id: "DSA / Algorithms", icon: Blocks },
  { id: "Data Analytics", icon: Database },
  { id: "Mobile App", icon: Smartphone },
  { id: "DevOps / Cloud", icon: Cloud },
  { id: "Cybersecurity", icon: Lock },
  { id: "Open Source", icon: Code }
];

const PROMPT_CHIPS = [
  "Real-time collaborative whiteboard",
  "AI resume analyzer using LLMs",
  "DSA visualizer for sorting algorithms",
  "Full stack e-commerce with payments",
  "Sentiment analysis dashboard",
  "Expense tracker mobile app",
  "Kubernetes deployment pipeline",
  "Vulnerability scanner tool"
];

export default function LandingForm({ onSubmit, onViewSaved, hasSaved }: LandingFormProps) {
  const [type, setType] = useState("Full Stack Web");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");
  const [tech, setTech] = useState("");
  const [goal, setGoal] = useState("Build Portfolio");

  const { user } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    
    if (user) {
      logActivity(user.uid, "projectsWorked");
    }
    
    onSubmit({ type, title, description, level, tech, goal });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-500 pb-20">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">What do you want to build?</h1>
          <p className="text-muted-foreground text-lg">
            Describe your project idea. AI will generate a complete build guide, roadmap, and resources.
          </p>
        </div>
        {hasSaved && (
          <button 
            onClick={onViewSaved}
            className="px-5 py-2.5 bg-muted text-foreground font-bold rounded-xl hover:bg-muted-foreground/20 transition-colors"
          >
            Saved Blueprints
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* Project Type */}
        <div>
          <label className="text-sm font-bold mb-3 block">Project Type</label>
          <div className="flex flex-wrap gap-3">
            {PROJECT_TYPES.map(pt => {
              const Icon = pt.icon;
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => setType(pt.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                    type === pt.id 
                      ? "bg-foreground text-background border-foreground shadow-md" 
                      : "bg-background text-muted-foreground border-muted hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {pt.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Title and Description */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-bold mb-2 block">Project Title or Idea</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Build a real-time chat app"
              className="w-full bg-background border-2 border-muted rounded-2xl px-5 py-4 focus:outline-none focus:border-foreground/40 transition-colors text-lg font-medium shadow-sm"
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold mb-2 block">Description <span className="text-muted-foreground font-normal">(Optional)</span></label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details about what you want the project to do, who it's for, and any specific features..."
              className="w-full bg-background border border-muted rounded-2xl px-5 py-4 focus:outline-none focus:border-foreground/40 transition-colors resize-y min-h-[120px]"
            />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-sm font-bold mb-3 block">Your Skill Level</label>
            <div className="flex bg-muted/30 p-1.5 rounded-xl border border-muted">
              {(["Beginner", "Intermediate", "Advanced"] as const).map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                    level === lvl ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-bold mb-3 block">Primary Language or Tech <span className="text-muted-foreground font-normal">(Optional)</span></label>
            <input 
              type="text" 
              value={tech}
              onChange={(e) => setTech(e.target.value)}
              placeholder="e.g. Python, React, Java, Go"
              className="w-full bg-background border border-muted rounded-xl px-4 py-2.5 focus:outline-none focus:border-foreground/30 transition-colors h-[42px]"
            />
          </div>
        </div>

        {/* Goal */}
        <div>
          <label className="text-sm font-bold mb-3 block">Primary Goal</label>
          <div className="flex flex-wrap gap-2">
            {["Learn Concepts", "Build Portfolio", "Contribute to Open Source", "Freelance / Client Work", "Startup / Product"].map(g => (
              <button
                key={g}
                type="button"
                onClick={() => setGoal(g)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                  goal === g 
                    ? "bg-foreground text-background border-foreground" 
                    : "bg-background text-muted-foreground border-muted hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          disabled={!title}
          className="w-full bg-foreground text-background font-extrabold py-4 rounded-2xl text-lg hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Generate Project Blueprint →
        </button>

      </form>

      <div className="mt-12 pt-8 border-t border-muted">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Don't know what to build? Try an example:</h3>
        <div className="flex flex-wrap gap-2">
          {PROMPT_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => setTitle(chip)}
              className="px-3 py-1.5 bg-muted/50 border border-muted rounded-lg text-xs font-semibold text-foreground hover:bg-muted transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
