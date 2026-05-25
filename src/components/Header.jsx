import React from 'react';
import { Compass } from 'lucide-react';
import './Header.css';

export default function Header() {
  return (
    <header className="top-header">
      <div className="logo-section">
        <Compass className="logo-icon" size={28} />
        <h1 className="logo-text">CareerPilot<span className="accent-dot">.</span>AI</h1>
      </div>
      
      <div className="header-actions">
        <div className="user-profile">
          <div className="avatar">U</div>
          <div className="user-info">
            <p className="user-name">User Profile</p>
            <p className="user-status">Free Tier</p>
          </div>
        </div>
      </div>
    </header>
  );
}
