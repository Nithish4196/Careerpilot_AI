import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CareerCopilot from './components/CareerCopilot';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import JobFinder from './pages/JobFinder';
import LearningSystem from './pages/LearningSystem';
import MockInterview from './pages/MockInterview';
import ProjectBuilder from './pages/ProjectBuilder';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resume" element={<ResumeBuilder />} />
              <Route path="/jobs" element={<JobFinder />} />
              <Route path="/learning" element={<LearningSystem />} />
              <Route path="/interviews" element={<MockInterview />} />
              <Route path="/projects" element={<ProjectBuilder />} />
            </Routes>
          </div>
        </main>
        <Sidebar />
        <CareerCopilot />
      </div>
    </BrowserRouter>
  );
}

export default App;
