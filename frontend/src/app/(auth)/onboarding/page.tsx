"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Loader2, ArrowRight, ArrowLeft, X } from 'lucide-react';
import toast from 'react-hot-toast';
import AvatarSelector from '@/components/ui/AvatarSelector';

const TARGET_ROLES = ["Data Analyst","Data Scientist","AI Engineer","ML Engineer","Full Stack Developer","Frontend Developer","Backend Developer","DevOps Engineer","Cloud Engineer","Product Manager","Cybersecurity Analyst","Mobile Developer","Data Engineer","Solution Architect","Blockchain Developer"
];

export default function OnboardingPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  // Step 1 - Avatar
  const [avatarType, setAvatarType] = useState<"uploaded" | "preset" | "initials" | undefined>();
  const [avatarValue, setAvatarValue] = useState<string | undefined>();

  useEffect(() => {
    if (userProfile && !avatarType) {
      setAvatarType(userProfile.avatarType);
      setAvatarValue(userProfile.avatarValue);
    }
  }, [userProfile]);

  // Step 2
  const [currentRole, setCurrentRole] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");

  // Step 3
  const [targetRole, setTargetRole] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [timePerWeek, setTimePerWeek] = useState("");
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);

  // Step 4
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    if (!loading && userProfile?.onboardingCompleted) {
      router.replace("/dashboard");
    }
  }, [loading, userProfile, router]);

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = skillInput.trim().replace(/,/g, '');
      if (val && !skills.includes(val)) {
        setSkills([...skills, val]);
      }
      setSkillInput("");
    }
  };

  const handleFinish = async (isSkip: boolean = false) => {
    if (!user) return;
    setIsSaving(true);

    try {
      const data = isSkip ? { onboardingCompleted: true } : {
        onboardingCompleted: true,
        avatarType: avatarType || "initials",
        avatarValue: avatarValue || "",
        currentRole,
        experience,
        location,
        targetRole,
        primaryGoal,
        timePerWeek,
        skills
      };

      await updateDoc(doc(db,"users", user.uid), data);
      toast.success(`Welcome to CareerPilot AI, ${userProfile?.fullName || 'Explorer'}! 🎉`);
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to save profile. Please try again.");
      setIsSaving(false);
    }
  };

  if (loading || !user || userProfile?.onboardingCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-2xl bg-background border border-muted rounded-3xl p-8 md:p-12 shadow-2xl">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black">Profile Setup</h1>
          <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            Step {step} of 4
          </div>
        </div>

        <div className="w-full bg-muted rounded-full h-2 mb-10">
          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>

        {/* STEP 1: Avatar */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-1">Choose your avatar</h2>
              <p className="text-sm text-muted-foreground mb-4">Pick a professional avatar, or upload your own photo.</p>
            </div>
            <AvatarSelector 
              currentType={avatarType} 
              currentValue={avatarValue} 
              onSelect={(type, val) => {
                setAvatarType(type);
                setAvatarValue(val);
              }}
            />
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Tell us about yourself</h2>
            
            <div>
              <label className="block text-sm font-bold mb-2">Current Role / Background</label>
              <input 
                type="text" value={currentRole} onChange={e => setCurrentRole(e.target.value)}
                className="w-full bg-muted/30 border border-muted rounded-xl px-4 py-3 text-sm focus:border-primary/50"
                placeholder="e.g. Final year CSE student"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Experience Level</label>
              <div className="flex flex-wrap gap-2">
                {['Student', 'Fresher', 'Junior', 'Mid', 'Senior'].map(opt => (
                  <button
                    key={opt} onClick={() => setExperience(opt)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border ${experience === opt ? 'bg-foreground text-background border-foreground' : 'bg-background border-muted text-muted-foreground hover:border-foreground/30'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Location</label>
              <input 
                type="text" value={location} onChange={e => setLocation(e.target.value)}
                className="w-full bg-muted/30 border border-muted rounded-xl px-4 py-3 text-sm focus:border-primary/50"
                placeholder="City, Country"
              />
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Your career goals</h2>
            
            <div className="relative">
              <label className="block text-sm font-bold mb-2">Target Role</label>
              <input 
                type="text" value={targetRole}
                onFocus={() => setShowRoleSuggestions(true)}
                onBlur={() => setTimeout(() => setShowRoleSuggestions(false), 200)}
                onChange={e => { setTargetRole(e.target.value); setShowRoleSuggestions(true); }}
                className="w-full bg-muted/30 border border-muted rounded-xl px-4 py-3 text-sm focus:border-primary/50"
                placeholder="e.g. Data Analyst"
              />
              {showRoleSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-muted rounded-xl shadow-xl z-20 max-h-48 overflow-y-auto p-2 flex flex-wrap gap-2">
                  {TARGET_ROLES.filter(s => s.toLowerCase().includes(targetRole.toLowerCase())).map(s => (
                    <button key={s} onMouseDown={(e) => { e.preventDefault(); setTargetRole(s); setShowRoleSuggestions(false); }}
                      className="px-3 py-1.5 bg-muted/50 text-xs font-semibold rounded-lg hover:bg-primary transition-colors duration-150 ease-out hover:text-white transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Primary Goal</label>
              <div className="flex flex-wrap gap-2">
                {['Get First Job', 'Switch Careers', 'Get Promoted', 'Freelancing', 'Upskill Only'].map(opt => (
                  <button
                    key={opt} onClick={() => setPrimaryGoal(opt)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border ${primaryGoal === opt ? 'bg-foreground text-background border-foreground' : 'bg-background border-muted text-muted-foreground hover:border-foreground/30'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Available Time Per Week</label>
              <div className="flex flex-wrap gap-2">
                {['5 hrs', '10 hrs', '20 hrs', '40 hrs'].map(opt => (
                  <button
                    key={opt} onClick={() => setTimePerWeek(opt)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border ${timePerWeek === opt ? 'bg-foreground text-background border-foreground' : 'bg-background border-muted text-muted-foreground hover:border-foreground/30'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Your current skills</h2>
            
            <div>
              <label className="block text-sm font-bold mb-2">Skills (Press Enter to add)</label>
              <div className="w-full min-h-[120px] bg-muted/30 border border-muted rounded-xl p-4 focus-within:border-primary/50 transition-colors flex flex-wrap gap-2 content-start">
                {skills.map(skill => (
                  <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-muted rounded-lg text-xs font-bold">
                    {skill}
                    <button onClick={() => setSkills(skills.filter(s => s !== skill))} className="text-muted-foreground hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <input 
                  type="text" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={handleAddSkill}
                  className="flex-1 min-w-[200px] bg-transparent outline-none px-2 py-1 text-sm h-8"
                  placeholder={skills.length === 0 ?"Type a skill e.g. Python, React..." :""}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between pt-6 border-t border-muted">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div></div>}

          {step < 4 ? (
            <button onClick={() => setStep(step + 1)} className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-bold hover:bg-foreground/90 transition-colors duration-150 ease-out transition-colors">
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={() => handleFinish(false)} 
              disabled={isSaving || skills.length === 0}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors duration-150 ease-out transition-colors disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Finish Setup <ArrowRight className="w-4 h-4" /></>}
            </button>
          )}
        </div>

        <div className="mt-6 text-center">
          <button onClick={() => handleFinish(true)} disabled={isSaving} className="text-xs font-bold text-muted-foreground hover:text-foreground underline underline-offset-4">
            Skip for now →
          </button>
        </div>

      </div>
    </div>
  );
}
