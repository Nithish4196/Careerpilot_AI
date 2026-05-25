import React from 'react';

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Welcome back. Here is your career overview.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3>Resume Match Score</h3>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--success-color)', margin: '1rem 0' }}>85%</div>
          <p style={{ color: 'var(--text-secondary)' }}>You are well-matched for Data Analyst roles.</p>
        </div>
        
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3>Skill Gap Analyzer</h3>
          <div style={{ margin: '1rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>SQL</span>
              <span>90%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-dark)', borderRadius: '4px' }}>
              <div style={{ width: '90%', height: '100%', background: 'var(--accent-color)', borderRadius: '4px' }}></div>
            </div>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Power BI</span>
              <span>45%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-dark)', borderRadius: '4px' }}>
              <div style={{ width: '45%', height: '100%', background: 'var(--warning-color)', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3>Upcoming Mock Interview</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>Data Analyst Technical Round</p>
          <button className="btn btn-primary" style={{ width: '100%' }}>Start Now</button>
        </div>
      </div>
    </div>
  );
}
