import React from 'react';
import { InterviewConfig, RoundResult, ROUND_ICONS } from '@/types/interview';
import { CheckCircle2, AlertCircle, RefreshCcw, Download, BookOpen } from 'lucide-react';

interface FinalReportProps {
  config: InterviewConfig;
  results: RoundResult[];
  onRetake: () => void;
  onGoToLearning: () => void;
}

export default function FinalReport({ config, results, onRetake, onGoToLearning }: FinalReportProps) {
  const targetScore = Math.round(results.reduce((acc, curr) => acc + curr.score, 0) / results.length);
  const [displayScore, setDisplayScore] = React.useState(0);

  React.useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setDisplayScore(Math.round(easeProgress * targetScore));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [targetScore]);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return"text-green-600";
    if (score >= 60) return"text-amber-600";
    return"text-red-600";
  };

  return (
    <div className="max-w-4xl mx-auto py-8 pb-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Interview Complete</h1>
        <p className="text-muted-foreground text-lg">
          Here is your comprehensive performance report for the <span className="font-bold text-foreground">{config.role}</span> role.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Overall Score Card */}
        <div className="md:col-span-1 bg-background border border-muted rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">Overall Score</h2>
          <div className="relative w-40 h-40 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
              <circle 
                cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" 
                className={getScoreColor(targetScore)}
                strokeDasharray={`${(displayScore / 100) * 283} 283`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-extrabold">{displayScore}%</span>
            </div>
          </div>
          <p className="font-medium text-muted-foreground">
            {targetScore >= 80 ?"Excellent performance! You're interview ready." : 
             targetScore >= 60 ?"Good effort, but there's room for improvement." :"Keep practicing. Focus on your core fundamentals."}
          </p>
        </div>

        {/* Action Items & Feedback */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
            <h3 className="font-bold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Key Strengths
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-green-900 dark:text-green-300">
                <span className="mt-1">•</span> Strong structural approach to problem-solving.
              </li>
              <li className="flex items-start gap-2 text-sm text-green-900 dark:text-green-300">
                <span className="mt-1">•</span> Clear and confident communication during behavioral questions.
              </li>
              <li className="flex items-start gap-2 text-sm text-green-900 dark:text-green-300">
                <span className="mt-1">•</span> Good grasp of fundamental concepts in the technical domain.
              </li>
            </ul>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
            <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> Areas to Improve
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-amber-900 dark:text-amber-300">
                <span className="mt-1">•</span> Dive deeper into advanced edge cases during coding rounds.
              </li>
              <li className="flex items-start gap-2 text-sm text-amber-900 dark:text-amber-300">
                <span className="mt-1">•</span> Try using the STAR method for more structured HR answers.
              </li>
              <li className="flex items-start gap-2 text-sm text-amber-900 dark:text-amber-300">
                <span className="mt-1">•</span> Manage time better during aptitude/quantitative sections.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Round Breakdown */}
      <h2 className="text-2xl font-bold mb-6">Round Breakdown</h2>
      <div className="space-y-4 mb-12">
        {results.map((result, idx) => {
          const Icon = ROUND_ICONS[result.type];
          return (
            <div key={idx} className="bg-background border border-muted rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4 min-w-[200px]">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold">{result.type}</h3>
                    <p className="text-sm text-muted-foreground">Round {idx + 1}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span>Score</span>
                    <span className={getScoreColor(result.score)}>{result.score}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-foreground rounded-full duration-1000"
                      style={{ width: `${result.score}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-muted">
                <h4 className="text-sm font-bold mb-3 text-muted-foreground">AI Feedback:</h4>
                <ul className="space-y-2">
                  {result.feedback.map((fb, fidx) => (
                    <li key={fidx} className="text-sm text-foreground flex gap-2">
                      <span className="text-muted-foreground">-</span> {fb}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button 
          onClick={onRetake}
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-background border border-muted rounded-xl font-bold hover:bg-muted transition-colors duration-150 ease-out transition-colors"
        >
          <RefreshCcw className="w-5 h-5" /> Retake Interview
        </button>
        <button 
          onClick={onGoToLearning}
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-background border border-muted rounded-xl font-bold hover:bg-muted transition-colors duration-150 ease-out transition-colors"
        >
          <BookOpen className="w-5 h-5" /> View Learning Resources
        </button>
        <button 
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-foreground text-background rounded-xl font-bold hover:bg-foreground/90 transition-colors duration-150 ease-out shadow-lg"
        >
          <Download className="w-5 h-5" /> Download Report
        </button>
      </div>
    </div>
  );
}
