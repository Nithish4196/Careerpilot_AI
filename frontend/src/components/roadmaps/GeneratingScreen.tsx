"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, Map } from 'lucide-react';

const MESSAGES = ["Analyzing your current skills…","Identifying skill gaps…","Building your personalized roadmap…","Curating the best learning resources…","Calculating your timeline…","Finalizing your weekly plan…"
];

export default function GeneratingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
        <div className="relative w-24 h-24 bg-background border-2 border-primary/50 rounded-2xl flex items-center justify-center shadow-2xl">
          <Map className="w-10 h-10 text-primary animate-bounce" style={{ animationDuration: '2s' }} />
          <Sparkles className="absolute -top-3 -right-3 w-6 h-6 text-foreground animate-spin-slow" />
        </div>
      </div>

      <h2 className="text-2xl font-extrabold tracking-tight mb-4">Crafting Your Journey</h2>
      
      <div className="h-8 flex items-center justify-center overflow-hidden w-full max-w-md relative">
        {MESSAGES.map((msg, idx) => (
          <p
            key={msg}
            className={`absolute text-center text-muted-foreground font-medium w-full ${
              idx === messageIndex 
                ? 'opacity-100 translate-y-0' 
                : idx < messageIndex 
                  ? 'opacity-0 -translate-y-8' 
                  : 'opacity-0 translate-y-8'
            }`}
          >
            {msg}
          </p>
        ))}
      </div>

      <div className="mt-8 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>

    </div>
  );
}
