import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const MESSAGES = ["Analyzing your project idea…","Researching similar projects…","Building your roadmap…","Finding the best resources…","Writing your project guide…"
];

export default function GeneratingScreen() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % MESSAGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="relative flex items-center justify-center w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
        <div className="absolute inset-0 border-4 border-foreground rounded-full border-t-transparent animate-spin"></div>
        <Loader2 className="w-8 h-8 text-foreground animate-pulse" />
      </div>
      
      <h2 className="text-2xl font-extrabold tracking-tight mb-2">Generating Blueprint</h2>
      
      <div className="h-8 overflow-hidden relative w-full max-w-sm text-center">
        {MESSAGES.map((msg, idx) => (
          <p 
            key={idx}
            className={`absolute inset-0 text-muted-foreground font-medium ${
              idx === msgIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
}
