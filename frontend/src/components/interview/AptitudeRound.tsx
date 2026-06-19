import React, { useState } from 'react';
import { APTITUDE_QUESTIONS } from '@/types/interview';

interface AptitudeRoundProps {
  onFinish: (score: number, feedback: string[]) => void;
}

export default function AptitudeRound({ onFinish }: AptitudeRoundProps) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const question = APTITUDE_QUESTIONS[currentQIndex];

  const handleNext = () => {
    let currentScore = score;
    if (selectedOption === question.answer) {
      currentScore += 1;
      setScore(currentScore);
    }

    if (currentQIndex < APTITUDE_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
    } else {
      // Finish
      const finalPercentage = Math.round((currentScore / APTITUDE_QUESTIONS.length) * 100);
      let fb = [];
      if (finalPercentage >= 80) fb.push("Excellent logical and quantitative reasoning.");
      else if (finalPercentage >= 50) fb.push("Good effort, but brush up on quantitative basics.");
      else fb.push("You need significant practice in aptitude and reasoning.");
      
      onFinish(finalPercentage, fb);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 flex flex-col">
      <div className="w-full max-w-2xl mx-auto my-auto">
        <div className="mb-8">
          <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
            Question {currentQIndex + 1} of {APTITUDE_QUESTIONS.length}
          </span>
          <h3 className="text-2xl font-bold mt-2 leading-relaxed">
            {question.q}
          </h3>
        </div>

        <div className="space-y-4 mb-8">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            const labels = ['A', 'B', 'C', 'D'];
            return (
              <button
                key={idx}
                onClick={() => setSelectedOption(opt)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left ${
                  isSelected 
                    ? 'border-foreground bg-foreground/5' 
                    : 'border-muted bg-background hover:border-foreground/30 hover:bg-muted/50 transition-colors duration-150 ease-out '
                }`}
              >
                <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm ${
                  isSelected ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'
                }`}>
                  {labels[idx]}
                </div>
                <span className={`font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className="px-8 py-3.5 bg-foreground text-background rounded-xl font-bold hover:bg-foreground/90 transition-colors duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQIndex === APTITUDE_QUESTIONS.length - 1 ? 'Finish Round' : 'Next Question →'}
          </button>
        </div>
      </div>
    </div>
  );
}
