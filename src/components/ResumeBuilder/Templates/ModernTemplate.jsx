import React from 'react';

export default function ModernTemplate({ data }) {
  const { profile, experience, education, skills, color } = data;

  return (
    <div style={{ display: 'flex', minHeight: '297mm', fontFamily: 'Inter, sans-serif', color: '#222' }}>
      {/* Sidebar */}
      <div style={{ width: '35%', backgroundColor: color || '#2c3e50', color: '#fff', padding: '2.5rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', margin: '0 0 0.5rem 0', fontWeight: '800', lineHeight: '1.2' }}>{profile.name || 'Your Name'}</h1>
        <h2 style={{ fontSize: '1.2rem', margin: '0 0 2rem 0', fontWeight: '400', opacity: 0.9 }}>{profile.title || 'Professional Title'}</h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Contact</h3>
          <div style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
            {profile.email && <div>{profile.email}</div>}
            {profile.phone && <div>{profile.phone}</div>}
            {profile.location && <div>{profile.location}</div>}
            {profile.linkedin && <div style={{ marginTop: '0.5rem' }}>{profile.linkedin}</div>}
          </div>
        </div>

        {skills && skills.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {skills.map(s => (
                <div key={s.id} style={{ fontSize: '0.95rem' }}>• {s.name}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ width: '65%', padding: '2.5rem 2rem', backgroundColor: '#fff' }}>
        
        {/* Summary */}
        {profile.summary && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: color || '#2c3e50', borderBottom: `2px solid ${color || '#2c3e50'}`, paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: '700' }}>Profile</h3>
            <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6', color: '#444' }}>{profile.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: color || '#2c3e50', borderBottom: `2px solid ${color || '#2c3e50'}`, paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: '700' }}>Experience</h3>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: '#222' }}>{exp.title || 'Job Title'}</h4>
                  <span style={{ fontSize: '0.9rem', color: color || '#2c3e50', fontWeight: '600' }}>{exp.startDate || 'Start'} - {exp.endDate || 'End'}</span>
                </div>
                <div style={{ fontWeight: '500', marginBottom: '0.5rem', color: '#555', fontSize: '1rem' }}>{exp.company || 'Company Name'}</div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.95rem', lineHeight: '1.5', color: '#444' }}>
                  {exp.description ? (
                    exp.description.split('\n').map((line, i) => line.trim() ? <li key={i} style={{marginBottom: '0.25rem'}}>{line.replace(/^[-*]\s*/, '')}</li> : null)
                  ) : (
                    <li>Describe your responsibilities and achievements.</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: color || '#2c3e50', borderBottom: `2px solid ${color || '#2c3e50'}`, paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: '700' }}>Education</h3>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.05rem', color: '#222' }}>{edu.degree || 'Degree'}</h4>
                  <span style={{ fontSize: '0.9rem', color: color || '#2c3e50', fontWeight: '600' }}>{edu.year || 'Year'}</span>
                </div>
                <div style={{ color: '#555', fontSize: '0.95rem' }}>{edu.school || 'School Name'}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
