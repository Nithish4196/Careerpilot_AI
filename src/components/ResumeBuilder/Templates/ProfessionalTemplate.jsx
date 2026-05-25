import React from 'react';

export default function ProfessionalTemplate({ data }) {
  const { profile, experience, education, skills, color } = data;

  return (
    <div style={{ padding: '2rem 3rem', fontFamily: 'Times New Roman, serif', color: '#333' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: `2px solid ${color}`, paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase', color: '#111' }}>{profile.name || 'Your Name'}</h1>
        <div style={{ fontSize: '1rem', color: '#555', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span>{profile.email || 'email@example.com'}</span>
          <span>•</span>
          <span>{profile.phone || '(123) 456-7890'}</span>
          <span>•</span>
          <span>{profile.location || 'City, State'}</span>
          {profile.linkedin && (
            <>
              <span>•</span>
              <span>{profile.linkedin}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {profile.summary && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: '1.6' }}>{profile.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', textTransform: 'uppercase', color: color, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem' }}>Professional Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111' }}>{exp.title || 'Job Title'}</h3>
                <span style={{ fontSize: '1rem', fontStyle: 'italic' }}>{exp.startDate || 'Start'} - {exp.endDate || 'End'}</span>
              </div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '1rem' }}>{exp.company || 'Company Name'}</div>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '1rem', lineHeight: '1.5' }}>
                {exp.description ? (
                  exp.description.split('\n').map((line, i) => line.trim() ? <li key={i}>{line.replace(/^[-*]\s*/, '')}</li> : null)
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
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', textTransform: 'uppercase', color: color, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem' }}>Education</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111' }}>{edu.degree || 'Degree'}</h3>
                <div style={{ fontSize: '1rem' }}>{edu.school || 'School Name'}</div>
              </div>
              <span style={{ fontSize: '1rem', fontStyle: 'italic' }}>{edu.year || 'Year'}</span>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.25rem', textTransform: 'uppercase', color: color, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem' }}>Skills</h2>
          <div style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            {skills.map(s => s.name).join(' • ')}
          </div>
        </div>
      )}
    </div>
  );
}
