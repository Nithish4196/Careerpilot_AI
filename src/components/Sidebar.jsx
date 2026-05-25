import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Mic2, 
  Code2
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/resume', label: 'Resume Builder', icon: FileText },
  { path: '/jobs', label: 'Job Finder', icon: Briefcase },
  { path: '/learning', label: 'Learning System', icon: GraduationCap },
  { path: '/interviews', label: 'Mock Interviews', icon: Mic2 },
  { path: '/projects', label: 'Project Builder', icon: Code2 },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
