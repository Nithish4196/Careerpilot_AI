"use client";

import React, { useState } from 'react';
import { Sparkles, BrainCircuit, TrendingUp, Target, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AIRecommendationsProps {
  onSuggestJobs: (userSkills: string[], userTargetRole: string) => void;
  jobsCount: number;
}

export default function AIRecommendations({ onSuggestJobs, jobsCount }: AIRecommendationsProps) {
  const { userProfile } = useAuth();
  const [analyzing, setAnalyzing] = useState(false);

  const handleSuggest = () => {
    if (!userProfile) return;
    setAnalyzing(true);
    // Simulate a brief AI parsing delay for UX
    setTimeout(() => {
      setAnalyzing(false);
      onSuggestJobs(userProfile.skills || [], userProfile.targetRole || "Any");
    }, 1200);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Suggest Jobs Feature */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-black">Auto Job Matcher</h3>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          We can extract your saved resume and profile skills to automatically find and rank the best jobs for you.
        </p>
        
        <button
          onClick={handleSuggest}
          disabled={!userProfile || analyzing}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-bold text-sm transition-all disabled:opacity-50"
        >
          {analyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Parsing Resume...
            </>
          ) : (
            <>
              Suggest Jobs For Me
            </>
          )}
        </button>
        {!userProfile && (
          <p className="text-xs text-red-500 mt-3 text-center font-medium">Complete your profile to use this feature.</p>
        )}
      </div>

      {/* Resume Insights */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <BrainCircuit className="w-5 h-5 text-black" />
          <h3 className="font-bold text-black">Profile Overview</h3>
        </div>
        
        {userProfile ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Target Role</p>
              <p className="text-sm font-bold text-black">{userProfile.targetRole || "Not Set"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">Top Skills Detected</p>
              <div className="flex flex-wrap gap-1.5">
                {(userProfile.skills || []).slice(0, 5).map((skill: string, i: number) => (
                  <span key={i} className="bg-white border border-gray-200 px-2 py-1 rounded text-xs font-bold text-gray-600">
                    {skill}
                  </span>
                ))}
                {(!userProfile.skills || userProfile.skills.length === 0) && (
                  <span className="text-sm text-gray-500">No skills added yet.</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 font-medium">Log in to view your profile insights.</p>
        )}
      </div>

      {/* Market Insights */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-black" />
          <h3 className="font-bold text-black">Market Pulse</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">Jobs available today</span>
            <span className="text-sm font-bold text-black">{jobsCount > 0 ? `${jobsCount}+` : "..."}</span>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Trending Roles</p>
            <div className="space-y-2">
              {["Data Scientist", "Full Stack Developer", "AI Engineer"].map((role, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <Target className="w-3.5 h-3.5 text-blue-600" />
                  {role}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
