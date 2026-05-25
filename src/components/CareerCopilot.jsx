import React, { useState } from 'react';
import { Bot, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import './CareerCopilot.css';

export default function CareerCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your Career Copilot. How can I help you today? E.g., 'Why am I not getting shortlisted?'", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { id: Date.now(), text: input, sender: 'user' }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "Analyzing your profile... I noticed your resume lacks targeted keywords for 'Data Analyst' roles. Let's fix that in the Resume Builder.", 
        sender: 'ai' 
      }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button className="copilot-toggle glass-panel" onClick={() => setIsOpen(true)}>
        <Bot size={24} />
        <span className="toggle-text">Career Copilot</span>
      </button>
    );
  }

  return (
    <div className="copilot-window glass-panel animate-fade-in">
      <div className="copilot-header">
        <div className="header-title">
          <Bot size={20} className="icon-ai" />
          <h3>Career Copilot</h3>
        </div>
        <div className="header-actions">
          <button onClick={() => setIsOpen(false)}><X size={18} /></button>
        </div>
      </div>
      
      <div className="copilot-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.sender === 'ai' && <Bot size={16} className="msg-icon" />}
            <div className="msg-bubble">{msg.text}</div>
          </div>
        ))}
      </div>
      
      <form className="copilot-input" onSubmit={handleSend}>
        <input 
          type="text" 
          placeholder="Ask me anything..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="btn btn-primary btn-send">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
