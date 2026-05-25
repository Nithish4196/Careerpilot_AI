import React from 'react';
import { ExternalLink, Clock, Award, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function CourseCard({ course }) {
  return (
    <div className="course-card" style={{
      backgroundColor: 'var(--bg-card)',
      borderRadius: '16px',
      border: '1px solid var(--border-light)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      height: '100%',
      position: 'relative'
    }}>
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* Top Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {course.price === 'Free' ? (
              <span style={{ 
                backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                color: 'var(--success-color)', 
                padding: '4px 10px', 
                borderRadius: '12px', 
                fontSize: '0.75rem', 
                fontWeight: '600',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                Free Course
              </span>
            ) : (
              <span style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                color: 'var(--text-secondary)', 
                padding: '4px 10px', 
                borderRadius: '12px', 
                fontSize: '0.75rem', 
                fontWeight: '600',
                border: '1px solid var(--border-light)'
              }}>
                Paid
              </span>
            )}

            {course.demandScore >= 90 && (
              <span style={{ 
                backgroundColor: 'rgba(245, 158, 11, 0.1)', 
                color: '#fbbf24', 
                padding: '4px 10px', 
                borderRadius: '12px', 
                fontSize: '0.75rem', 
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: '1px solid rgba(245, 158, 11, 0.2)'
              }}>
                <TrendingUp size={12} /> High Demand
              </span>
            )}
          </div>
          
          {course.image && (
            <div style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '4px',
              border: '1px solid var(--border-light)'
            }}>
              <img src={course.image} alt={course.provider} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
          )}
        </div>

        {/* Title & Provider */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
            {course.title}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--primary-light)', fontWeight: '500' }}>{course.provider}</span>
            {course.provider.includes('Meta') || course.provider.includes('Google') || course.provider.includes('Harvard') || course.provider.includes('Stanford') ? (
               <CheckCircle2 size={14} color="var(--primary-color)" />
            ) : null}
          </p>
        </div>

        {/* Info Tags */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <Clock size={16} />
            {course.durationText}
          </div>
          {course.hasCertification && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              <Award size={16} color="var(--success-color)" />
              Certified
            </div>
          )}
        </div>

        {/* Enroll Button */}
        <a 
          href={course.url} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            marginTop: '1.5rem', 
            width: '100%', 
            padding: '10px', 
            backgroundColor: 'var(--primary-color)', 
            color: 'white', 
            borderRadius: '8px', 
            textAlign: 'center', 
            textDecoration: 'none', 
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
        >
          Enroll Now <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
