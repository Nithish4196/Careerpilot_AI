import React, { useState } from 'react';
import { CODING_PROBLEMS } from '@/types/interview';
import { Play, Check, Lightbulb } from 'lucide-react';

interface CodingRoundProps {
  difficulty: "Easy" | "Medium" | "Hard";
  onFinish: (score: number, feedback: string[]) => void;
}

export default function CodingRound({ difficulty, onFinish }: CodingRoundProps) {
  const problem = CODING_PROBLEMS[difficulty];
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Python");
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [output, setOutput] = useState<string | null>(null);

  const handleRun = () => {
    setOutput("Compiling...\nRunning tests...\n\nOutput:\nExpected: " + problem.examples.split("→ Output: ")[1] + "\nActual: null (Logic not implemented)\n\nResult: Failed 1/3 hidden test cases.");
  };

  const handleSubmit = () => {
    // Mock logic: pass if they wrote more than 50 characters
    const passed = code.length > 50;
    const score = passed ? Math.floor(Math.random() * (100 - 85) + 85) : Math.floor(Math.random() * (40 - 20) + 20);
    const feedback = passed 
      ? ["Good algorithmic approach.", "Clean syntax and code structure.", "Optimal time complexity achieved."]
      : ["Code is incomplete or contains syntax errors.", "Try testing with edge cases before submitting.", "Review data structures required for this problem."];
    
    onFinish(score, feedback);
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-4 p-4">
      
      {/* Left Panel - Problem */}
      <div className="w-full md:w-2/5 bg-background border border-muted rounded-2xl p-6 overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{problem.title}</h2>
          <span className={`px-2 py-1 text-xs font-bold rounded uppercase tracking-wider ${
            difficulty === 'Easy' ? 'bg-green-500/10 text-green-600' :
            difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-600' :
            'bg-red-500/10 text-red-600'
          }`}>
            {difficulty}
          </span>
        </div>
        
        <p className="text-muted-foreground leading-relaxed mb-6">
          {problem.desc}
        </p>
        
        <div className="bg-muted/30 p-4 rounded-xl border border-muted font-mono text-sm mb-6 whitespace-pre-wrap">
          {problem.examples}
        </div>

        <div className="mt-auto space-y-3">
          {Array.from({ length: hintsRevealed }).map((_, idx) => (
            <div key={idx} className="bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 p-3 rounded-xl text-sm flex gap-2">
              <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
              <p>{problem.hints[idx]}</p>
            </div>
          ))}
          
          {hintsRevealed < problem.hints.length && (
            <button 
              onClick={() => setHintsRevealed(h => h + 1)}
              className="text-sm font-bold text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
            >
              <Lightbulb className="w-4 h-4" /> Reveal Hint ({hintsRevealed}/{problem.hints.length})
            </button>
          )}
        </div>
      </div>

      {/* Right Panel - Editor */}
      <div className="w-full md:w-3/5 bg-[#1e1e1e] rounded-2xl overflow-hidden flex flex-col border border-muted shadow-inner">
        
        {/* Editor Header */}
        <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between">
          <div className="flex gap-2">
            {["Python", "JavaScript", "Java", "C++"].map(lang => (
              <button 
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                  language === lang ? 'bg-[#1e1e1e] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleRun}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white rounded-md text-xs font-bold hover:bg-white/20 transition-colors"
            >
              <Play className="w-3.5 h-3.5" /> Run Code
            </button>
            <button 
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-md text-xs font-bold hover:bg-green-500 transition-colors"
            >
              <Check className="w-3.5 h-3.5" /> Submit
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 relative flex">
          {/* Line Numbers */}
          <div className="w-12 bg-[#1e1e1e] text-gray-600 font-mono text-sm py-4 text-right pr-4 select-none border-r border-[#333]">
            {Array.from({ length: Math.max(15, code.split('\n').length) }).map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          {/* Textarea */}
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 bg-transparent text-gray-300 font-mono text-sm p-4 focus:outline-none resize-none leading-relaxed"
            placeholder={`// Write your ${language} solution here...`}
          />
        </div>

        {/* Output Panel */}
        {output && (
          <div className="h-40 bg-[#111] border-t border-[#333] p-4 overflow-y-auto">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Console Output</div>
            <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>

    </div>
  );
}
