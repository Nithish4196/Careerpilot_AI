"use client";

import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";

export default function ResumeProgress({ percentage = 85 }: { percentage?: number }) {
  const [offset, setOffset] = useState(0);
  const circleRadius = 45;
  const circumference = 2 * Math.PI * circleRadius;

  useEffect(() => {
    const progressOffset = circumference - (percentage / 100) * circumference;
    setOffset(progressOffset);
  }, [percentage, circumference]);

  return (
    <div className="bg-background rounded-xl border border-muted p-6 shadow-sm flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold mb-1">Resume Level</h3>
        <p className="text-sm text-muted-foreground max-w-[200px]">
          Your resume is looking great! Add a few more projects to reach 100%.
        </p>
      </div>
      
      <div className="relative flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            className="text-muted"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={circleRadius}
            cx="64"
            cy="64"
          />
          {/* Progress Circle */}
          <circle
            className="text-foreground transition-all duration-1000 ease-out"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={circleRadius}
            cx="64"
            cy="64"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <FileText className="w-5 h-5 text-foreground mb-1" />
          <span className="text-xl font-bold tracking-tight">{percentage}%</span>
        </div>
      </div>
    </div>
  );
}
