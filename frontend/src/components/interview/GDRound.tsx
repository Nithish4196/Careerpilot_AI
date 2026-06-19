import React, { useState, useEffect, useRef } from 'react';
import { GD_TOPICS } from '@/types/interview';
import { Send, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import UserAvatar from '@/components/ui/UserAvatar';

interface GDRoundProps {
  onFinish: (score: number, feedback: string[]) => void;
  triggerEnd?: boolean;
}

interface GDMessage {
  id: string;
  sender: string;
  text: string;
  isUser: boolean;
  color: string;
}

const AI_PARTICIPANTS = [
  { name: 'Rahul', color: 'bg-blue-500' },
  { name: 'Sneha', color: 'bg-purple-500' },
  { name: 'Vikram', color: 'bg-emerald-500' }
];

const AI_RESPONSES = ["I completely agree with that point.","That's a valid perspective, however, we must also consider the alternatives.","Adding to what was just said, the long-term impact is significant.","I disagree slightly. In my experience, the data shows otherwise.","Can we look at this from an economic standpoint?","That is a great example. Furthermore, we see this pattern globally.","To summarize the current thoughts, it seems we have two main camps here.","What about the ethical implications of that approach?","Let's not forget the human element in this equation.","If we implement that, the short-term costs might be too high."
];

export default function GDRound({ onFinish, triggerEnd }: GDRoundProps) {
  const [topic] = useState(() => GD_TOPICS[Math.floor(Math.random() * GD_TOPICS.length)]);
  const [messages, setMessages] = useState<GDMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [isReading, setIsReading] = useState(true);
  const [readTime, setReadTime] = useState(15); // Shortened reading time for UX
  
  const { userProfile, user } = useAuth();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Topic Reading Timer
  useEffect(() => {
    if (readTime > 0) {
      const timer = setTimeout(() => setReadTime(r => r - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsReading(false);
      // First AI message kicks off
      setTimeout(() => {
        setMessages([{
          id: `ai_${Date.now()}`,
          sender: AI_PARTICIPANTS[0].name,
          color: AI_PARTICIPANTS[0].color,
          isUser: false,
          text: `I'd like to start. Regarding"${topic}", I believe it's one of the most pressing issues today.`
        }]);
      }, 1000);
    }
  }, [readTime, topic]);

  // AI Chat Simulation
  useEffect(() => {
    if (isReading) return;

    const interval = setInterval(() => {
      setMessages(prev => {
        const participant = AI_PARTICIPANTS[Math.floor(Math.random() * AI_PARTICIPANTS.length)];
        const response = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
        
        // Prevent AI from talking to itself too many times in a row
        if (prev.length > 0 && prev[prev.length - 1].sender === participant.name) return prev;

        return [...prev, {
          id: `ai_${Date.now()}_${Math.random()}`,
          sender: participant.name,
          color: participant.color,
          isUser: false,
          text: response
        }];
      });
    }, Math.random() * (12000 - 8000) + 8000); // 8-12 seconds

    return () => clearInterval(interval);
  }, [isReading]);

  // Handle external trigger end
  useEffect(() => {
    if (triggerEnd) {
      handleFinish();
    }
  }, [triggerEnd]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    setMessages(prev => [...prev, {
      id: `u_${Date.now()}`,
      sender:"You",
      color:"bg-foreground",
      isUser: true,
      text: inputText
    }]);
    setUserMsgCount(c => c + 1);
    setInputText("");
  };

  const handleFinish = () => {
    let score = 20;
    if (userMsgCount >= 5) score = 95;
    else if (userMsgCount >= 3) score = 75;
    else if (userMsgCount >= 1) score = 50;

    const feedback = [];
    if (userMsgCount === 0) feedback.push("You did not participate in the discussion.");
    else if (userMsgCount < 3) feedback.push("Try to contribute more points to drive the discussion.");
    else feedback.push("Excellent participation and point articulation.");

    if (userMsgCount > 0) feedback.push("Good professional tone maintained.");

    onFinish(score, feedback);
  };

  if (isReading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="bg-background border border-muted rounded-2xl p-12 max-w-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-foreground animate-pulse" />
          <h2 className="text-xl font-bold text-muted-foreground uppercase tracking-widest mb-4">Group Discussion Topic</h2>
          <p className="text-3xl font-extrabold leading-tight mb-12">"{topic}"</p>
          
          <div className="flex flex-col items-center gap-2">
            <Clock className="w-8 h-8 text-muted-foreground animate-pulse" />
            <span className="text-2xl font-mono font-bold">{readTime}s</span>
            <span className="text-sm text-muted-foreground">Reading Time</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full relative bg-muted/10">
      
      {/* Sticky Topic Header */}
      <div className="bg-background border-b border-muted p-4 shadow-sm z-10 flex items-center justify-between shrink-0">
        <div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">Topic</span>
          <span className="font-bold">{topic}</span>
        </div>
        <div className="flex items-center gap-2">
          {AI_PARTICIPANTS.map(p => (
            <div key={p.name} className="flex items-center gap-1.5 px-2 py-1 bg-muted rounded-md text-xs font-bold">
              <div className={`w-2 h-2 rounded-full ${p.color}`} />
              {p.name}
            </div>
          ))}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-foreground text-background rounded-md text-xs font-bold ml-2">
            You
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="text-center text-xs font-bold text-muted-foreground uppercase tracking-widest my-4">
          Discussion Started
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 max-w-2xl ${msg.isUser ? 'ml-auto flex-row-reverse' : ''}`}>
            {msg.isUser ? (
              <UserAvatar profile={userProfile} user={user} className="w-10 h-10 text-sm" />
            ) : (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-white text-sm ${msg.color}`}>
                {msg.sender.charAt(0)}
              </div>
            )}
            <div className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}>
              <span className="text-xs font-bold text-muted-foreground mb-1 ml-1">{msg.sender}</span>
              <div className={`p-4 rounded-2xl ${
                msg.isUser 
                  ? 'bg-foreground text-background rounded-tr-sm' 
                  : 'bg-background border border-muted shadow-sm rounded-tl-sm'
              }`}>
                <p className="leading-relaxed text-sm">{msg.text}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-background border-t border-muted shrink-0">
        <div className="relative max-w-4xl mx-auto flex gap-4 items-end">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Share your perspective... (Press Enter to send)"
            className="flex-1 bg-muted/30 border border-muted rounded-2xl px-4 py-4 focus:outline-none focus:border-foreground/30 resize-none min-h-[60px] max-h-[120px]"
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="p-4 bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-colors duration-150 ease-out transition-colors disabled:opacity-50 h-[60px] w-[60px] flex items-center justify-center shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
