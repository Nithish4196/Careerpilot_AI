import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TECH_FRONTEND, TECH_DATA, TECH_BACKEND, TECH_DEFAULT } from '@/types/interview';
import { Send } from 'lucide-react';

interface TechnicalRoundProps {
  role: string;
  onFinish: (score: number, feedback: string[]) => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export default function TechnicalRound({ role, onFinish }: TechnicalRoundProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions = useMemo(() => {
    const r = role.toLowerCase();
    if (r.includes('frontend') || r.includes('react')) return TECH_FRONTEND;
    if (r.includes('data') || r.includes('sql') || r.includes('analyst')) return TECH_DATA;
    if (r.includes('python') || r.includes('backend')) return TECH_BACKEND;
    return TECH_DEFAULT;
  }, [role]);

  useEffect(() => {
    setMessages([{
      id:"ai_init",
      sender: 'ai',
      text: `Hello! I'll be conducting your technical round for the ${role} position. Let's start with the first question: ${questions[0]}`
    }]);
  }, [questions, role]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessages = [...messages, { id: `u_${Date.now()}`, sender: 'user' as const, text: inputText }];
    setMessages(newMessages);
    setInputText("");

    setTimeout(() => {
      const nextQIndex = currentQIndex + 1;
      if (nextQIndex < questions.length) {
        const acks = ["Good explanation.","I understand your approach.","That makes sense.","Valid point."];
        const randomAck = acks[Math.floor(Math.random() * acks.length)];
        
        setMessages(prev => [...prev, {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: randomAck +"Next question:" + questions[nextQIndex]
        }]);
        setCurrentQIndex(nextQIndex);
      } else {
        const score = Math.floor(Math.random() * (98 - 65) + 65); 
        onFinish(score, ["Demonstrated solid understanding of core concepts.","Could optimize explanations with more practical examples.","Strong domain knowledge for the target role."
        ]);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            {msg.sender === 'ai' && (
              <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 font-bold text-xs mt-1">
                AI
              </div>
            )}
            <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.sender === 'ai' && <span className="text-xs font-bold text-muted-foreground mb-1 ml-1">Arjun — Senior Engineer</span>}
              <div className={`p-4 rounded-2xl ${
                msg.sender === 'user' 
                  ? 'bg-foreground text-background rounded-tr-sm' 
                  : 'bg-muted/50 border border-muted text-foreground rounded-tl-sm'
              }`}>
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-background border-t border-muted">
        <div className="relative max-w-4xl mx-auto">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your technical answer here... (Press Enter to send)"
            className="w-full bg-muted/30 border border-muted rounded-2xl pl-4 pr-14 py-4 focus:outline-none focus:border-foreground/30 resize-none min-h-[80px] font-mono text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="absolute right-3 bottom-3 p-2 bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-colors duration-150 ease-out transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
