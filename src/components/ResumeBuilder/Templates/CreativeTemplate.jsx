import React from 'react';

export default function CreativeTemplate({ data }) {
  const { profile, experience, education, skills, color } = data;

  return (
    <div style={{ padding: '3rem', minHeight: '297mm', fontFamily: 'system-ui, sans-serif', color: '#333', backgroundColor: '#fdfdfd' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ 
          width: '120px', 
          height: '120px', 
          backgroundColor: color || '#e11d48', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#fff',
          fontSize: '3rem',
          fontWeight: 'bold',
          flexShrink: 0
        }}>
          {profile.name ? profile.name.charAt(0).toUpperCase() : 'A'}
        </div>
        <div>
          <h1 style={{ fontSize: '3.5rem', margin: '0 0 0.5rem 0', fontWeight: '900', letterSpacing: '-1px', color: '#111' }}>{profile.name || 'Your Name'}</h1>
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: color || '#e11d48', fontWeight: '600' }}>{profile.title || 'Professional Title'}</h2>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '3rem' }}>
        {/* Left Column */}
        <div style={{ flex: '1' }}>
          {/* Contact */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: '800', borderBottom: `3px solid ${color || '#e11d48'}`, display: 'inline-block', paddingBottom: '0.2rem', marginBottom: '1rem' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '1rem' }}>
              {profile.email && <div><strong>Email:</strong><br/>{profile.email}</div>}
              {profile.phone && <div><strong>Phone:</strong><br/>{profile.phone}</div>}
              {profile.location && <div><strong>Location:</strong><br/>{profile.location}</div>}
              {profile.linkedin && <div><strong>LinkedIn:</strong><br/>{profile.linkedin}</div>}
            </div>
          </div>

          {/* Education */}
          {education && education.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: '800', borderBottom: `3px solid ${color || '#e11d48'}`, display: 'inline-block', paddingBottom: '0.2rem', marginBottom: '1rem' }}>Education</h3>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.9rem', color: color || '#e11d48', fontWeight: '700', marginBottom: '0.2rem' }}>{edu.year || 'Year'}</div>
                  <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem' }}>{edu.degree || 'Degree'}</h4>
                  <div style={{ color: '#666', fontSize: '0.95rem' }}>{edu.school || 'School Name'}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: '800', borderBottom: `3px solid ${color || '#e11d48'}`, display: 'inline-block', paddingBottom: '0.2rem', marginBottom: '1rem' }}>Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.map(s => (
                  <span key={s.id} style={{ backgroundColor: '#f0f0f0', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '500' }}>{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: '2' }}>
          {/* Profile Summary */}
          {profile.summary && (
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: '800', borderBottom: `3px solid ${color || '#e11d48'}`, display: 'inline-block', paddingBottom: '0.2rem', marginBottom: '1rem' }}>Profile</h3>
              <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.7', color: '#444' }}>{profile.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: '800', borderBottom: `3px solid ${color || '#e11d48'}`, display: 'inline-block', paddingBottom: '0.2rem', marginBottom: '1.5rem' }}>Experience</h3>
              <div style={{ borderLeft: `2px solid ${color || '#e11d48'}`, paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
                {experience.map((exp, idx) => (
                  <div key={exp.id} style={{ marginBottom: '2rem', position: 'relative' }}>
                    {/* Timeline dot */}
                    <div style={{ position: 'absolute', left: '-1.85rem', top: '0.3rem', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: color || '#e11d48', border: '3px solid #fdfdfd' }}></div>
                    
                    <div style={{ fontSize: '0.9rem', color: color || '#e11d48', fontWeight: '700', marginBottom: '0.2rem' }}>{exp.startDate || 'Start'} - {exp.endDate || 'End'}</div>
                    <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.2rem', color: '#111' }}>{exp.title || 'Job Title'}</h4>
                    <div style={{ fontWeight: '600', marginBottom: '0.8rem', color: '#666', fontSize: '1rem' }}>{exp.company || 'Company Name'}</div>
                    
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '1rem', lineHeight: '1.6', color: '#444' }}>
                      {exp.description ? (
                        exp.description.split('\n').map((line, i) => line.trim() ? <li key={i} style={{marginBottom: '0.4rem'}}>{line.replace(/^[-*]\s*/, '')}</li> : null)
                      ) : (
                        <li>Describe your responsibilities and achievements.</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
