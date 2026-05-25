import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Star, Clock, Award, Filter, X, TrendingUp, ChevronRight, PlayCircle, Target } from 'lucide-react';
import { courses } from '../components/LearningSystem/courseData';
import CourseCard from '../components/LearningSystem/CourseCard';
import DailyQuiz from '../components/LearningSystem/DailyQuiz';

export default function LearningSystem() {
  const [viewState, setViewState] = useState('home'); // 'home', 'search', 'results', 'tech_skills', 'daily_quiz'
  const [searchInput, setSearchInput] = useState('');
  const [searchedRole, setSearchedRole] = useState(null);
  const [activeFilter, setActiveFilter] = useState('high_demand'); // 'all', 'high_demand', 'free', 'short_time', 'certified'

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchedRole(searchInput.trim());
      setViewState('results');
    }
  };

  const clearSearch = () => {
    setSearchedRole(null);
    setSearchInput('');
    setActiveFilter('high_demand');
    setViewState('search');
  };

  // Compute displayed courses
  const displayedCourses = useMemo(() => {
    if (!searchedRole) return [];

    const searchTerms = searchedRole.toLowerCase().split(' ');

    // 1. Filter by Role Relevance
    let filtered = courses.filter(course => {
      const match = course.roleKeywords.some(keyword => 
        searchTerms.some(term => keyword.includes(term) || term.includes(keyword))
      );
      return match;
    });

    // Fallback if no specific role matches: just show top courses
    if (filtered.length === 0) {
      filtered = [...courses]; 
    }

    // 2. Apply Sort/Filter
    switch (activeFilter) {
      case 'free':
        filtered = filtered.filter(c => c.price === 'Free');
        break;
      case 'certified':
        filtered = filtered.filter(c => c.hasCertification);
        break;
      case 'short_time':
        filtered.sort((a, b) => a.durationHours - b.durationHours);
        break;
      case 'high_demand':
      default:
        filtered.sort((a, b) => b.demandScore - a.demandScore);
        break;
    }

    return filtered;
  }, [searchedRole, activeFilter]);

  return (
    <div className="page-container animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {viewState === 'home' && (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 className="page-title">AI Learning System</h1>
            <p className="page-subtitle">Personalized roadmaps, skill progress, and curated courses.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', flex: 1 }}>
            
            {/* Box Section: Discover Trending Courses (Left Side) */}
            <div 
              className="glass-panel" 
              style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid rgba(59, 130, 246, 0.3)', position: 'relative', overflow: 'hidden' }}
              onClick={() => setViewState('search')}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05 }}>
                <BookOpen size={200} />
              </div>
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
                <TrendingUp size={32} />
              </div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Discover Trending Courses</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', flex: 1 }}>
                Search for your dream job and we will curate a list of the best online courses, professional certificates, and free learning paths available right now.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary-color)', fontWeight: '600', gap: '8px' }}>
                Start Exploring <ChevronRight size={18} />
              </div>
            </div>

            {/* Box Section: Build Your Technical Skills */}
            <div 
              className="glass-panel" 
              style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid rgba(16, 185, 129, 0.3)', position: 'relative', overflow: 'hidden' }}
              onClick={() => setViewState('tech_skills')}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05 }}>
                <Target size={200} />
              </div>
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--success-color)' }}>
                <Target size={32} />
              </div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Build Your Technical Skills</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', flex: 1 }}>
                Master DSA, SQL, Problem Solving, and Aptitude with curated, top-asked questions from LeetCode, HackerRank, and CodeChef.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--success-color)', fontWeight: '600', gap: '8px' }}>
                Start Practicing <ChevronRight size={18} />
              </div>
            </div>

            {/* Box Section: Daily Quizzes */}
            <div 
              className="glass-panel" 
              style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid rgba(245, 158, 11, 0.3)', position: 'relative', overflow: 'hidden' }}
              onClick={() => setViewState('daily_quiz')}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05 }}>
                <PlayCircle size={200} />
              </div>
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#fbbf24' }}>
                <PlayCircle size={32} />
              </div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Daily Quizzes</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', flex: 1 }}>
                Keep your technical skills sharp with timed, AI-generated daily coding quizzes across DSA, SQL, Python, Java, and Aptitude.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', color: '#fbbf24', fontWeight: '600', gap: '8px' }}>
                Take a Quiz <ChevronRight size={18} />
              </div>
            </div>

          </div>
        </div>
      )}

      {viewState === 'search' && (
        <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <button 
            onClick={() => setViewState('home')} 
            style={{ position: 'absolute', top: '2rem', left: '2rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            ← Back to Home
          </button>
          
          <div style={{ marginBottom: '2rem' }}>
            <BookOpen size={64} color="var(--primary-color)" style={{ margin: '0 auto 1.5rem auto' }} />
            <h1 className="page-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Course Search</h1>
            <p className="page-subtitle" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
              What role are you aiming for? We'll find the best courses to get you there.
            </p>
          </div>

          <form onSubmit={handleSearch} style={{ width: '100%', position: 'relative' }}>
            <div className="search-input-wrapper" style={{ padding: '8px', backgroundColor: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
              <Search size={24} color="var(--text-muted)" style={{ margin: '0 1rem' }} />
              <input
                type="text"
                placeholder="e.g. Frontend Developer, Data Scientist, UI Designer"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '1.1rem',
                  outline: 'none',
                  padding: '1rem 0'
                }}
                autoFocus
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem', borderRadius: '10px' }}>
                Search
              </button>
            </div>
          </form>
          
          <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={20} color="var(--success-color)"/> Verified Certificates</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={20} color="#fbbf24"/> Top Rated</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={20} color="var(--primary-color)"/> Self-Paced</div>
          </div>
        </div>
      )}

      {viewState === 'results' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 className="page-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Courses for "{searchedRole}"</h1>
              <p className="page-subtitle" style={{ margin: 0 }}>Showing {displayedCourses.length} trending learning paths</p>
            </div>
            <button onClick={clearSearch} className="btn" style={{ backgroundColor: 'var(--bg-card-hover)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <X size={16} /> New Search
            </button>
          </div>

          <div style={{ display: 'flex', gap: '2rem', flex: 1, overflow: 'hidden' }}>
            
            {/* Sidebar Filters */}
            <div style={{ width: '250px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={18} /> Sort & Filter
              </div>
              
              <button 
                className={`filter-btn ${activeFilter === 'high_demand' ? 'active' : ''}`}
                onClick={() => setActiveFilter('high_demand')}
                style={filterBtnStyle(activeFilter === 'high_demand')}
              >
                <TrendingUp size={16} /> High Demand
              </button>
              
              <button 
                className={`filter-btn ${activeFilter === 'free' ? 'active' : ''}`}
                onClick={() => setActiveFilter('free')}
                style={filterBtnStyle(activeFilter === 'free')}
              >
                <Star size={16} /> Free Courses
              </button>
              
              <button 
                className={`filter-btn ${activeFilter === 'short_time' ? 'active' : ''}`}
                onClick={() => setActiveFilter('short_time')}
                style={filterBtnStyle(activeFilter === 'short_time')}
              >
                <Clock size={16} /> Shorter Duration
              </button>
              
              <button 
                className={`filter-btn ${activeFilter === 'certified' ? 'active' : ''}`}
                onClick={() => setActiveFilter('certified')}
                style={filterBtnStyle(activeFilter === 'certified')}
              >
                <Award size={16} /> Includes Certification
              </button>
            </div>

            {/* Course Grid */}
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem' }}>
              {displayedCourses.length > 0 ? (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                  gap: '1.5rem',
                  paddingBottom: '2rem'
                }}>
                  {displayedCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                  <BookOpen size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No courses found</h3>
                  <p>Try adjusting your search terms to see more results.</p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      )}

      {viewState === 'tech_skills' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: '1rem', paddingBottom: '2rem' }}>
          <button 
            onClick={() => setViewState('home')} 
            style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}
          >
            ← Back to Home
          </button>
          
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <Target size={64} color="var(--success-color)" style={{ margin: '0 auto 1.5rem auto' }} />
            <h1 className="page-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Build Your Technical Skills</h1>
            <p className="page-subtitle" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
              We've gathered the most critical interview questions and practice tracks from top coding platforms to help you master DSA, SQL, and Aptitude.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            
            {/* DSA Section */}
            <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid #f59e0b' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Data Structures & Algorithms</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong>LeetCode</strong>
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderRadius: '12px' }}>Must Do</span>
                  </div>
                  <a href="https://leetcode.com/study-plan/top-interview-150/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none', display: 'block', fontSize: '0.9rem' }}>Top Interview 150 Questions →</a>
                  <a href="https://leetcode.com/problem-list/top-100-liked-questions/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none', display: 'block', fontSize: '0.9rem', marginTop: '0.5rem' }}>Top 100 Liked Questions →</a>
                </li>
                <li style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ marginBottom: '0.5rem' }}><strong>Coding Ninjas</strong></div>
                  <a href="https://www.codingninjas.com/studio/guided-paths/data-structures-algorithms" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none', display: 'block', fontSize: '0.9rem' }}>DSA Guided Path & Top Patterns →</a>
                </li>
                <li style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ marginBottom: '0.5rem' }}><strong>GeeksforGeeks</strong></div>
                  <a href="https://practice.geeksforgeeks.org/explore?page=1&company[]=Amazon&company[]=Microsoft&sortBy=submissions" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none', display: 'block', fontSize: '0.9rem' }}>Top FAANG Interview Questions →</a>
                </li>
              </ul>
            </div>

            {/* SQL Section */}
            <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid #3b82f6' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>SQL & Database Design</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong>HackerRank</strong>
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '12px' }}>Recommended</span>
                  </div>
                  <a href="https://www.hackerrank.com/domains/sql" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none', display: 'block', fontSize: '0.9rem' }}>SQL Basic to Advanced Track →</a>
                </li>
                <li style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ marginBottom: '0.5rem' }}><strong>LeetCode</strong></div>
                  <a href="https://leetcode.com/study-plan/sql-50/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none', display: 'block', fontSize: '0.9rem' }}>SQL 50 Study Plan →</a>
                </li>
                <li style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ marginBottom: '0.5rem' }}><strong>Mode Analytics</strong></div>
                  <a href="https://mode.com/sql-tutorial/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none', display: 'block', fontSize: '0.9rem' }}>Interactive SQL Tutorial →</a>
                </li>
              </ul>
            </div>

            {/* Problem Solving & Logic */}
            <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid #10b981' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Problem Solving</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ marginBottom: '0.5rem' }}><strong>CodeChef</strong></div>
                  <a href="https://www.codechef.com/practice" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none', display: 'block', fontSize: '0.9rem' }}>Beginner to Advanced Practice →</a>
                </li>
                <li style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ marginBottom: '0.5rem' }}><strong>HackerEarth</strong></div>
                  <a href="https://www.hackerearth.com/practice/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none', display: 'block', fontSize: '0.9rem' }}>Basic Programming & Logic →</a>
                </li>
                <li style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ marginBottom: '0.5rem' }}><strong>Codeforces</strong></div>
                  <a href="https://codeforces.com/problemset?order=BY_RATING_ASC" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none', display: 'block', fontSize: '0.9rem' }}>Competitive Programming Problemset →</a>
                </li>
              </ul>
            </div>

            {/* Aptitude Section */}
            <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid #8b5cf6' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Aptitude & Reasoning</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong>IndiaBIX</strong>
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', borderRadius: '12px' }}>Most Popular</span>
                  </div>
                  <a href="https://www.indiabix.com/aptitude/questions-and-answers/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none', display: 'block', fontSize: '0.9rem' }}>Quantitative Aptitude Questions →</a>
                  <a href="https://www.indiabix.com/logical-reasoning/questions-and-answers/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none', display: 'block', fontSize: '0.9rem', marginTop: '0.5rem' }}>Logical Reasoning Puzzles →</a>
                </li>
                <li style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ marginBottom: '0.5rem' }}><strong>PrepInsta</strong></div>
                  <a href="https://prepinsta.com/aptitude/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none', display: 'block', fontSize: '0.9rem' }}>Company-Specific Aptitude Tests →</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {viewState === 'daily_quiz' && <DailyQuiz onBack={() => setViewState('home')} />}
    </div>
  );
}

// Helper style function
const filterBtnStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '12px 16px',
  backgroundColor: isActive ? 'var(--primary-color)' : 'var(--bg-card)',
  color: isActive ? 'white' : 'var(--text-secondary)',
  border: isActive ? '1px solid var(--primary-color)' : '1px solid var(--border-light)',
  borderRadius: '12px',
  cursor: 'pointer',
  fontWeight: '500',
  transition: 'all 0.2s ease',
  textAlign: 'left',
  width: '100%'
});
