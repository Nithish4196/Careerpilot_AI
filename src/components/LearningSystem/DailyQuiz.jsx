import React, { useState, useEffect } from 'react';
import { PlayCircle, Clock, CheckCircle2, XCircle, ArrowRight, RotateCcw, Target, Settings, Award, Loader2, Sparkles } from 'lucide-react';
import { generateText } from '../../services/huggingface';

export default function DailyQuiz({ onBack }) {
  const [quizState, setQuizState] = useState('topic_selection'); // 'topic_selection', 'config', 'generating', 'active', 'results', 'error'
  
  // Config state
  const [topicInput, setTopicInput] = useState('');
  const [numQuestions, setNumQuestions] = useState(3);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(5); // in minutes
  
  // Active quiz state
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  // Timer Effect
  useEffect(() => {
    let timer;
    if (quizState === 'active' && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => prev - 1);
      }, 1000);
    } else if (quizState === 'active' && timeLeftSeconds <= 0) {
      handleFinishQuiz();
    }
    return () => clearInterval(timer);
  }, [quizState, timeLeftSeconds]);

  const handleNextToConfig = (e) => {
    e.preventDefault();
    if (topicInput.trim()) {
      setQuizState('config');
    }
  };

  const startQuiz = async () => {
    setQuizState('generating');
    setErrorMsg('');
    
    const prompt = `[INST] You are an expert quiz generator. Generate a quiz about "${topicInput}" with exactly ${numQuestions} multiple-choice questions. 
    You MUST respond ONLY with a valid JSON array. Do not include any intro, markdown, or backticks.
    Format each object like this:
    [
      {
        "question": "The question text?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 0
      }
    ]
    Make sure correctAnswer is an integer representing the index of the correct option (0-3).[/INST]`;

    try {
      const response = await generateText(prompt);
      
      // Attempt to parse the JSON. Since LLMs can sometimes wrap in markdown, we clean it.
      let cleanedResponse = response.trim();
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      } else if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.replace(/```/g, '').trim();
      }

      // Find the first '[' and last ']'
      const startIdx = cleanedResponse.indexOf('[');
      const endIdx = cleanedResponse.lastIndexOf(']');
      
      if (startIdx === -1 || endIdx === -1) {
        throw new Error("AI did not return a valid JSON array format.");
      }

      const jsonString = cleanedResponse.substring(startIdx, endIdx + 1);
      const generatedQuestions = JSON.parse(jsonString);

      if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
        throw new Error("AI returned an empty quiz.");
      }

      setCurrentQuestions(generatedQuestions.slice(0, numQuestions)); // ensure we only get requested amount
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setTimeLeftSeconds(timeLimitMinutes * 60);
      setQuizState('active');

    } catch (err) {
      console.error("Quiz Generation Failed:", err);
      setErrorMsg("Failed to generate quiz. The AI might be rate-limited or returned malformed data. Try again or check your API key.");
      setQuizState('error');
    }
  };

  const handleAnswer = (optionIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setQuizState('results');
  };

  const calculateScore = () => {
    let score = 0;
    currentQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) score += 1;
    });
    return score;
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: '1rem', paddingBottom: '2rem' }}>
      
      {/* Header Back Button */}
      {quizState !== 'active' && (
        <button 
          onClick={() => quizState === 'topic_selection' ? onBack() : setQuizState('topic_selection')} 
          style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}
        >
          ← {quizState === 'topic_selection' ? 'Back to Home' : 'Back to Topics'}
        </button>
      )}

      {/* 1. TOPIC SELECTION */}
      {quizState === 'topic_selection' && (
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <Sparkles size={64} color="var(--primary-color)" style={{ margin: '0 auto 1.5rem auto' }} />
          <h1 className="page-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>AI Quiz Generator</h1>
          <p className="page-subtitle" style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
            Enter any technical topic, library, or language, and our AI will instantly generate a custom quiz for you.
          </p>
          
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <form onSubmit={handleNextToConfig}>
              <label style={{ display: 'block', textAlign: 'left', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>What do you want to be tested on?</label>
              <input 
                type="text" 
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="e.g., React Hooks, Advanced SQL Joins, System Design, Python Basics"
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: 'var(--text-primary)',
                  fontSize: '1.1rem',
                  marginBottom: '2rem',
                  outline: 'none'
                }}
                autoFocus
                required
              />
              <button 
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                Configure Quiz <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1.5 GENERATING & ERROR STATES */}
      {quizState === 'generating' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: '4rem' }}>
          <Loader2 size={64} color="var(--primary-color)" style={{ animation: 'spin 2s linear infinite', marginBottom: '2rem' }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Crafting Your Custom Quiz...</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Our AI is generating questions about "{topicInput}". This may take a few moments.</p>
        </div>
      )}

      {quizState === 'error' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: '4rem', textAlign: 'center' }}>
          <XCircle size={64} color="#ef4444" style={{ marginBottom: '2rem' }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ef4444' }}>Generation Failed</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', marginBottom: '2rem' }}>{errorMsg}</p>
          <button 
            onClick={() => setQuizState('topic_selection')}
            className="btn btn-primary"
            style={{ padding: '0.75rem 2rem' }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* 2. CONFIGURATION */}
      {quizState === 'config' && (
        <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <Settings size={48} color="var(--primary-color)" style={{ margin: '0 auto 1rem auto' }} />
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Configure Your Quiz</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Topic: <strong style={{ color: 'var(--text-primary)' }}>{topicInput}</strong></p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>Number of Questions</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {[3, 5, 10].map(num => (
                  <button 
                    key={num}
                    onClick={() => setNumQuestions(num)}
                    style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: numQuestions === num ? '2px solid var(--primary-color)' : '1px solid var(--border-light)', backgroundColor: numQuestions === num ? 'rgba(59, 130, 246, 0.1)' : 'transparent', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' }}
                  >
                    {num} Questions
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>Time Limit</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {[2, 5, 10].map(min => (
                  <button 
                    key={min}
                    onClick={() => setTimeLimitMinutes(min)}
                    style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: timeLimitMinutes === min ? '2px solid var(--primary-color)' : '1px solid var(--border-light)', backgroundColor: timeLimitMinutes === min ? 'rgba(59, 130, 246, 0.1)' : 'transparent', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' }}
                  >
                    {min} Mins
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={startQuiz}
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              Start Quiz <PlayCircle size={20} />
            </button>
          </div>
        </div>
      )}

      {/* 3. ACTIVE QUIZ */}
      {quizState === 'active' && currentQuestions.length > 0 && (
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          
          {/* Top Bar: Progress & Timer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
            <div style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>
              Question {currentQuestionIndex + 1} of {currentQuestions.length}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: timeLeftSeconds < 60 ? '#ef4444' : 'var(--primary-light)', fontSize: '1.2rem' }}>
              <Clock size={20} /> {formatTime(timeLeftSeconds)}
            </div>
          </div>

          {/* Question Card */}
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', lineHeight: '1.5' }}>
              {currentQuestions[currentQuestionIndex].question}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {currentQuestions[currentQuestionIndex].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  style={{
                    padding: '1.25rem',
                    textAlign: 'left',
                    borderRadius: '8px',
                    border: userAnswers[currentQuestionIndex] === idx ? '2px solid var(--primary-color)' : '1px solid var(--border-light)',
                    backgroundColor: userAnswers[currentQuestionIndex] === idx ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    color: 'var(--text-primary)',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                  onMouseEnter={(e) => { if (userAnswers[currentQuestionIndex] !== idx) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={(e) => { if (userAnswers[currentQuestionIndex] !== idx) e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    border: userAnswers[currentQuestionIndex] === idx ? '6px solid var(--primary-color)' : '2px solid var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}></div>
                  {option}
                </button>
              ))}
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={nextQuestion}
                disabled={userAnswers[currentQuestionIndex] === undefined}
                className="btn btn-primary"
                style={{ padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', gap: '8px', opacity: userAnswers[currentQuestionIndex] === undefined ? 0.5 : 1, cursor: userAnswers[currentQuestionIndex] === undefined ? 'not-allowed' : 'pointer' }}
              >
                {currentQuestionIndex < currentQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. RESULTS */}
      {quizState === 'results' && (
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
            <Award size={80} color="var(--success-color)" style={{ margin: '0 auto 1.5rem auto' }} />
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Quiz Completed!</h2>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', margin: '2rem 0' }}>
              <div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Your Score</p>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-light)' }}>
                  {calculateScore()} / {currentQuestions.length}
                </div>
              </div>
              <div style={{ width: '1px', height: '60px', backgroundColor: 'var(--border-light)' }}></div>
              <div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Accuracy</p>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
                  {Math.round((calculateScore() / currentQuestions.length) * 100)}%
                </div>
              </div>
            </div>

            <button 
              onClick={() => setQuizState('topic_selection')}
              className="btn btn-primary"
              style={{ padding: '0.75rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <RotateCcw size={18} /> Take Another Quiz
            </button>
          </div>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Review Answers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {currentQuestions.map((q, idx) => {
              const isCorrect = userAnswers[idx] === q.correctAnswer;
              const notAnswered = userAnswers[idx] === undefined;
              
              return (
                <div key={idx} className="glass-panel" style={{ padding: '1.5rem', borderLeft: isCorrect ? '4px solid var(--success-color)' : '4px solid #ef4444' }}>
                  <p style={{ fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>{idx + 1}. {q.question}</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {q.options.map((opt, optIdx) => {
                      const isUserChoice = userAnswers[idx] === optIdx;
                      const isActualCorrect = q.correctAnswer === optIdx;
                      
                      let color = 'var(--text-secondary)';
                      let bg = 'transparent';
                      let icon = null;

                      if (isActualCorrect) {
                        color = 'var(--success-color)';
                        bg = 'rgba(16, 185, 129, 0.1)';
                        icon = <CheckCircle2 size={18} />;
                      } else if (isUserChoice && !isCorrect) {
                        color = '#ef4444';
                        bg = 'rgba(239, 68, 68, 0.1)';
                        icon = <XCircle size={18} />;
                      }

                      return (
                        <div key={optIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem', borderRadius: '6px', backgroundColor: bg, color: color, border: '1px solid', borderColor: bg !== 'transparent' ? bg : 'var(--border-light)' }}>
                          {icon || <div style={{ width: '18px' }}></div>}
                          {opt}
                          {isUserChoice && <span style={{ fontSize: '0.8rem', marginLeft: 'auto', opacity: 0.8 }}>(Your Answer)</span>}
                        </div>
                      );
                    })}
                  </div>
                  {notAnswered && <p style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.9rem' }}>You did not answer this question.</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
