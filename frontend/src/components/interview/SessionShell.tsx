import React, { useState, useEffect } from 'react';
import { RoundType, ROUND_ICONS } from '@/types/interview';

interface SessionShellProps {
  roundType: RoundType;
  currentRoundNum: number;
  totalRounds: number;
  onEndInterview: () => void;
  onTimeUp: () => void;
  modalState: { show: boolean; score: number; feedback: string[] } | null;
  onNextRound: () => void;
  children: React.ReactNode;
}

export default function SessionShell({ 
  roundType, 
  currentRoundNum, 
  totalRounds, 
  onEndInterview, 
  onTimeUp,
  modalState,
  onNextRound,
  children
}: SessionShellProps) {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const Icon = ROUND_ICONS[roundType];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!modalState?.show) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [roundType, modalState?.show]); // Pause timer if modal is showing

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-500">
      
      {/* Top Bar */}
      <div className="bg-background border border-muted rounded-2xl p-4 mb-4 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <h2 className="font-bold">Round {currentRoundNum} — {roundType}</h2>
            <p className="text-xs text-muted-foreground font-medium">{currentRoundNum} of {totalRounds} Rounds</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className={`text-2xl font-extrabold font-mono tracking-wider ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-foreground'}`}>
            {formatTime(timeLeft)}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Time Remaining</span>
        </div>

        <button 
          onClick={onEndInterview}
          className="px-4 py-2 border border-red-500/20 text-red-500 hover:bg-red-500/10 rounded-xl text-sm font-bold transition-colors"
        >
          End Interview
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-muted rounded-full mb-6 shrink-0 overflow-hidden">
        <div 
          className="h-full bg-foreground transition-all duration-500"
          style={{ width: `${(currentRoundNum / totalRounds) * 100}%` }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>

      {/* Round Complete Modal */}
      {modalState?.show && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-background border border-muted rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-xl font-extrabold">{modalState.score}%</span>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-2">Round Complete!</h2>
            <p className="text-center text-muted-foreground mb-8">
              You've successfully completed the {roundType} round.
            </p>

            <div className="bg-muted/30 border border-muted rounded-xl p-4 mb-8">
              <h4 className="text-sm font-bold mb-3">Quick Feedback:</h4>
              <ul className="space-y-2">
                {modalState.feedback.length > 0 ? modalState.feedback.map((fb, idx) => (
                  <li key={idx} className="text-sm text-foreground flex gap-2">
                    <span className="text-muted-foreground">•</span> {fb}
                  </li>
                )) : (
                  <li className="text-sm text-foreground flex gap-2">
                    <span className="text-muted-foreground">•</span> Good performance overall.
                  </li>
                )}
              </ul>
            </div>

            <button 
              onClick={onNextRound}
              className="w-full bg-foreground text-background font-bold py-3.5 rounded-xl hover:bg-foreground/90 transition-all"
            >
              {currentRoundNum === totalRounds ? 'View Final Report' : 'Next Round →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
