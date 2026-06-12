import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export default function TemplateProfessional({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, design } = data;
  
  // Font size scaling mapping based on 'sm' | 'base' | 'lg'
  const textSizes = {
    sm: { base: 'text-xs', h1: 'text-2xl', h2: 'text-sm', h3: 'text-xs' },
    base: { base: 'text-sm', h1: 'text-3xl', h2: 'text-base', h3: 'text-sm' },
    lg: { base: 'text-base', h1: 'text-4xl', h2: 'text-lg', h3: 'text-base' },
  };

  const sizes = textSizes[design.fontSize];

  return (
    <div 
      className={`w-full bg-white text-black p-10 ${design.fontFamily}`} 
      style={{ minHeight: '1056px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
    >
      {/* Header */}
      <header className="border-b-2 pb-4 mb-6" style={{ borderColor: design.themeColor }}>
        <h1 className={`${sizes.h1} font-bold mb-2 uppercase tracking-tight`} style={{ color: design.themeColor }}>
          {personalInfo.fullName}
        </h1>
        <div className={`flex flex-wrap gap-x-4 gap-y-1 ${sizes.base} text-gray-600`}>
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.location}</span>
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className={`${sizes.h2} font-bold mb-2 uppercase tracking-wider`} style={{ color: design.themeColor }}>
            Professional Summary
          </h2>
          <p className={`${sizes.base} leading-relaxed text-gray-800`}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className={`${sizes.h2} font-bold mb-3 uppercase tracking-wider`} style={{ color: design.themeColor }}>
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`${sizes.h3} font-bold text-gray-900`}>{exp.role}</h3>
                  <span className={`${sizes.base} text-gray-600 font-medium`}>{exp.date}</span>
                </div>
                <div className={`${sizes.base} font-medium text-gray-700 mb-1`}>{exp.company}</div>
                <p className={`${sizes.base} leading-relaxed text-gray-800`}>{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className={`${sizes.h2} font-bold mb-3 uppercase tracking-wider`} style={{ color: design.themeColor }}>
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`${sizes.h3} font-bold text-gray-900`}>{edu.school}</h3>
                  <span className={`${sizes.base} text-gray-600 font-medium`}>{edu.date}</span>
                </div>
                <div className={`${sizes.base} text-gray-800`}>{edu.degree}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className={`${sizes.h2} font-bold mb-3 uppercase tracking-wider`} style={{ color: design.themeColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className={`${sizes.base} px-2 py-1 bg-gray-100 text-gray-800 rounded`}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
