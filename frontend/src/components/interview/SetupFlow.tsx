import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { InterviewConfig, RoundType, ROUND_ICONS, ROUND_DESCRIPTIONS } from '@/types/interview';

interface SetupFlowProps {
  onComplete: (config: InterviewConfig) => void;
}

export default function SetupFlow({ onComplete }: SetupFlowProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [config, setConfig] = useState<InterviewConfig>({
    name: "",
    role: "",
    company: "",
    level: "Fresher",
    difficulty: "Medium",
    rounds: [],
    sessionType: "custom"
  });

  const [numRounds, setNumRounds] = useState(3);
  const [rounds, setRounds] = useState<(RoundType | null)[]>([null, null, null]);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleNextStep1 = () => {
    if (config.name && config.role) setStep(2);
  };

  const handleNextStep2 = () => {
    if (rounds.every(r => r !== null)) {
      setConfig({ ...config, rounds: rounds as RoundType[] });
      setStep(3);
    }
  };

  const handleNumRoundsChange = (delta: number) => {
    const newNum = Math.max(1, Math.min(5, numRounds + delta));
    setNumRounds(newNum);
    
    setRounds(prev => {
      const newRounds = [...prev];
      if (newNum > prev.length) {
        while (newRounds.length < newNum) newRounds.push(null);
      } else {
        newRounds.length = newNum;
      }
      return newRounds;
    });
  };

  const setRound = (index: number, type: RoundType) => {
    const newRounds = [...rounds];
    newRounds[index] = type;
    setRounds(newRounds);
    setActiveDropdown(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500">
      
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-12">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className={`flex flex-col items-center ${s <= step ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${
                s === step ? 'bg-foreground text-background' : s < step ? 'bg-muted text-foreground' : 'bg-muted/50 text-muted-foreground'
              }`}>
                {s}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">
                {s === 1 ? 'Details' : s === 2 ? 'Rounds' : 'Review'}
              </span>
            </div>
            {s < 3 && (
              <div className={`flex-1 h-0.5 mx-4 ${s < step ? 'bg-muted-foreground/30' : 'bg-muted/30'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Basic Details */}
      {step === 1 && (
        <div className="bg-background border border-muted rounded-2xl p-8 shadow-sm animate-in slide-in-from-right-4">
          <h2 className="text-2xl font-bold mb-6">Basic Details</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-bold mb-2 block">Your Name</label>
                <input 
                  type="text" 
                  value={config.name}
                  onChange={(e) => setConfig({...config, name: e.target.value})}
                  className="w-full bg-muted/50 border border-muted rounded-xl px-4 py-3 focus:outline-none focus:border-foreground/30"
                  placeholder="e.g. Alex"
                />
              </div>
              <div>
                <label className="text-sm font-bold mb-2 block">Target Role</label>
                <input 
                  type="text" 
                  value={config.role}
                  onChange={(e) => setConfig({...config, role: e.target.value})}
                  className="w-full bg-muted/50 border border-muted rounded-xl px-4 py-3 focus:outline-none focus:border-foreground/30"
                  placeholder="e.g. Frontend Engineer"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-bold mb-2 block">Target Company <span className="text-muted-foreground font-normal">(Optional)</span></label>
                <input 
                  type="text" 
                  value={config.company}
                  onChange={(e) => setConfig({...config, company: e.target.value})}
                  className="w-full bg-muted/50 border border-muted rounded-xl px-4 py-3 focus:outline-none focus:border-foreground/30"
                  placeholder="e.g. Amazon"
                />
              </div>
              <div>
                <label className="text-sm font-bold mb-2 block">Experience Level</label>
                <select 
                  value={config.level}
                  onChange={(e) => setConfig({...config, level: e.target.value})}
                  className="w-full bg-muted/50 border border-muted rounded-xl px-4 py-3 focus:outline-none focus:border-foreground/30 appearance-none"
                >
                  <option>Fresher</option>
                  <option>1–3 Years</option>
                  <option>3–5 Years</option>
                  <option>5+ Years</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-bold mb-2 block">Difficulty</label>
              <div className="flex gap-4">
                {(["Easy", "Medium", "Hard"] as const).map(d => (
                  <button 
                    key={d}
                    onClick={() => setConfig({...config, difficulty: d})}
                    className={`flex-1 py-3 text-sm font-bold rounded-xl border transition-colors ${
                      config.difficulty === d ? "bg-foreground text-background border-foreground" : "bg-background text-muted-foreground border-muted hover:border-foreground/30"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleNextStep1}
              disabled={!config.name || !config.role}
              className="flex items-center gap-2 bg-foreground text-background px-8 py-3 rounded-xl font-bold hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Choose Rounds */}
      {step === 2 && (
        <div className="bg-background border border-muted rounded-2xl p-8 shadow-sm animate-in slide-in-from-right-4">
          <h2 className="text-2xl font-bold mb-2">Configure Rounds</h2>
          <p className="text-muted-foreground mb-8">Choose up to 5 rounds to simulate your exact interview process.</p>
          
          <div className="flex items-center justify-between bg-muted/30 border border-muted rounded-xl p-4 mb-8">
            <span className="font-bold">Number of Rounds</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleNumRoundsChange(-1)}
                className="w-8 h-8 rounded-full bg-background border border-muted flex items-center justify-center font-bold hover:bg-muted"
              >
                -
              </button>
              <span className="font-bold text-xl w-4 text-center">{numRounds}</span>
              <button 
                onClick={() => handleNumRoundsChange(1)}
                className="w-8 h-8 rounded-full bg-background border border-muted flex items-center justify-center font-bold hover:bg-muted"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-4 relative">
            {rounds.map((round, idx) => {
              const RoundIcon = round ? ROUND_ICONS[round] : null;
              
              return (
                <div key={idx} className="relative">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${
                      round ? 'bg-foreground/5 border-foreground/20' : 'bg-background border-muted hover:border-foreground/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${round ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'}`}>
                        {RoundIcon ? <RoundIcon className="w-4 h-4" /> : <span className="font-bold text-xs">{idx + 1}</span>}
                      </div>
                      <span className={`font-bold ${round ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {round ? round : `Select Round ${idx + 1}`}
                      </span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Panel */}
                  {activeDropdown === idx && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-muted rounded-xl shadow-xl z-10 overflow-hidden animate-in fade-in slide-in-from-top-2">
                      {(Object.keys(ROUND_ICONS) as RoundType[]).map(type => {
                        const Icon = ROUND_ICONS[type];
                        return (
                          <button
                            key={type}
                            onClick={() => setRound(idx, type)}
                            className="w-full flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors text-left border-b border-muted last:border-0"
                          >
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                              <Icon className="w-5 h-5 text-foreground" />
                            </div>
                            <div>
                              <h4 className="font-bold text-foreground">{type}</h4>
                              <p className="text-xs text-muted-foreground">{ROUND_DESCRIPTIONS[type]}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between">
            <button 
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-xl font-bold text-muted-foreground hover:bg-muted transition-colors"
            >
              Back
            </button>
            <button 
              onClick={handleNextStep2}
              disabled={rounds.includes(null)}
              className="flex items-center gap-2 bg-foreground text-background px-8 py-3 rounded-xl font-bold hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Review Configuration <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Start */}
      {step === 3 && (
        <div className="bg-background border border-muted rounded-2xl p-8 shadow-sm animate-in slide-in-from-right-4">
          <h2 className="text-2xl font-bold mb-8">Review Interview Plan</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Candidate</p>
              <p className="font-bold">{config.name}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Role</p>
              <p className="font-bold">{config.role} {config.company && `at ${config.company}`}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Profile</p>
              <p className="font-bold">{config.level}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Difficulty</p>
              <p className="font-bold">{config.difficulty}</p>
            </div>
          </div>

          <div className="bg-muted/20 border border-muted rounded-xl p-6 mb-8">
            <h3 className="font-bold mb-4 flex items-center justify-between">
              Interview Stages
              <span className="text-sm font-medium text-muted-foreground">Est. {config.rounds.length * 15} mins</span>
            </h3>
            <div className="space-y-4 relative">
              <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-muted"></div>
              {config.rounds.map((round, idx) => {
                const Icon = ROUND_ICONS[round];
                return (
                  <div key={idx} className="relative flex items-center gap-4 z-10">
                    <div className="w-10 h-10 rounded-full bg-background border-2 border-muted flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase">Round {idx + 1}</p>
                      <p className="font-bold">{round}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between">
            <button 
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl font-bold text-muted-foreground hover:bg-muted transition-colors"
            >
              Back
            </button>
            <button 
              onClick={() => onComplete(config)}
              className="flex items-center gap-2 bg-foreground text-background px-8 py-3 rounded-xl font-bold hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Start Interview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
