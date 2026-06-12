import React, { useState } from 'react';
import { Bot, Settings2 } from 'lucide-react';
import { InterviewConfig, SessionType } from '@/types/interview';

interface LandingPageProps {
  onStartQuick: (config: InterviewConfig) => void;
  onStartCustom: () => void;
}

export default function LandingPage({ onStartQuick, onStartCustom }: LandingPageProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("Fresher");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [duration, setDuration] = useState("30 min");

  const handleQuickStart = () => {
    if (!name || !role) return;
    onStartQuick({
      name,
      role,
      level,
      difficulty,
      duration,
      rounds: ["Technical", "HR", "Aptitude"], // Mixed round defaults for quick start
      sessionType: "quick"
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Mock Interviews</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Practice makes perfect. Experience realistic AI-driven interview scenarios tailored to your target role.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Card 1: Quick Start */}
        <div className="bg-background border border-muted rounded-2xl p-8 shadow-sm flex flex-col hover:border-foreground/20 transition-colors">
          <div className="w-14 h-14 bg-foreground text-background rounded-xl flex items-center justify-center mb-6">
            <Bot className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold mb-2">AI Mock Interview</h2>
          <p className="text-muted-foreground mb-8">
            Jump straight into a full interview. AI will ask questions, evaluate your answers, and give instant feedback.
          </p>

          <div className="space-y-5 flex-grow">
            <div>
              <label className="text-sm font-bold mb-1.5 block">Your Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex" 
                className="w-full bg-muted/50 border border-muted rounded-xl px-4 py-2.5 focus:outline-none focus:border-foreground/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-bold mb-1.5 block">Target Role</label>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Software Engineer at Google" 
                className="w-full bg-muted/50 border border-muted rounded-xl px-4 py-2.5 focus:outline-none focus:border-foreground/30 transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold mb-1.5 block">Experience</label>
                <select 
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-muted/50 border border-muted rounded-xl px-4 py-2.5 focus:outline-none focus:border-foreground/30 transition-colors appearance-none"
                >
                  <option>Fresher</option>
                  <option>1–3 Years</option>
                  <option>3–5 Years</option>
                  <option>5+ Years</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-bold mb-1.5 block">Duration</label>
                <div className="flex gap-2">
                  {["15 min", "30 min", "45 min"].map(d => (
                    <button 
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-colors ${
                        duration === d ? "bg-foreground text-background border-foreground" : "bg-background text-muted-foreground border-muted hover:border-foreground/30"
                      }`}
                    >
                      {d.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold mb-1.5 block">Difficulty</label>
              <div className="flex gap-2">
                {(["Easy", "Medium", "Hard"] as const).map(d => (
                  <button 
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-colors ${
                      difficulty === d ? "bg-foreground text-background border-foreground" : "bg-background text-muted-foreground border-muted hover:border-foreground/30"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={handleQuickStart}
            disabled={!name || !role}
            className="w-full mt-8 bg-foreground text-background font-bold py-3.5 rounded-xl hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start AI Interview →
          </button>
        </div>

        {/* Card 2: Custom Interview */}
        <div className="bg-background border border-muted rounded-2xl p-8 shadow-sm flex flex-col hover:border-foreground/20 transition-colors">
          <div className="w-14 h-14 bg-muted text-foreground rounded-xl flex items-center justify-center mb-6">
            <Settings2 className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Custom Mock Interview</h2>
          <p className="text-muted-foreground mb-8">
            Build your own interview. Choose specific rounds, fine-tune the difficulty, and simulate a real company's exact hiring process.
          </p>

          <div className="flex-grow flex flex-col justify-center items-center text-center p-6 bg-muted/20 border border-muted border-dashed rounded-xl mb-8">
            <ul className="space-y-3 text-sm text-muted-foreground font-medium text-left inline-block">
              <li className="flex items-center gap-2">✓ Select exactly which rounds you want</li>
              <li className="flex items-center gap-2">✓ Target specific companies</li>
              <li className="flex items-center gap-2">✓ Mix coding, aptitude, and HR together</li>
              <li className="flex items-center gap-2">✓ Detailed multi-stage reporting</li>
            </ul>
          </div>

          <button 
            onClick={onStartCustom}
            className="w-full bg-background border-2 border-foreground text-foreground font-bold py-3.5 rounded-xl hover:bg-foreground hover:text-background transition-all"
          >
            Configure Interview →
          </button>
        </div>

      </div>
    </div>
  );
}
