import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export default function TemplateCasual({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, design } = data;
  
  const textSizes = {
    sm: { base: 'text-xs', h1: 'text-3xl', h2: 'text-sm', h3: 'text-xs' },
    base: { base: 'text-sm', h1: 'text-4xl', h2: 'text-base', h3: 'text-sm' },
    lg: { base: 'text-base', h1: 'text-5xl', h2: 'text-lg', h3: 'text-base' },
  };

  const sizes = textSizes[design.fontSize];

  return (
    <div 
      className={`w-full bg-white text-gray-800 p-12 ${design.fontFamily}`} 
      style={{ minHeight: '1056px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
    >
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Left Column (Main Content) */}
        <div className="flex-1">
          <header className="mb-10">
            <h1 className={`${sizes.h1} font-light tracking-tight mb-3`} style={{ color: design.themeColor }}>
              {personalInfo.fullName}
            </h1>
            <div className={`${sizes.base} text-gray-500 uppercase tracking-widest font-medium`}>
              {personalInfo.jobTitle}
            </div>
          </header>

          {personalInfo.summary && (
            <section className="mb-10">
              <p className={`${sizes.base} leading-relaxed text-gray-600`}>
                {personalInfo.summary}
              </p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="mb-10">
              <h2 className={`${sizes.h2} font-bold mb-6 border-b pb-2`} style={{ color: design.themeColor }}>
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className={`${sizes.h3} font-bold text-gray-900`}>{exp.role}</h3>
                    <div className={`${sizes.base} text-gray-500 mb-2`}>{exp.company} • {exp.date}</div>
                    <p className={`${sizes.base} leading-relaxed text-gray-600`}>{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-full md:w-1/3 space-y-10">
          <section>
            <h2 className={`${sizes.h2} font-bold mb-4 border-b pb-2`} style={{ color: design.themeColor }}>
              Contact
            </h2>
            <div className={`flex flex-col gap-2 ${sizes.base} text-gray-600`}>
              <span>{personalInfo.email}</span>
              <span>{personalInfo.phone}</span>
              <span>{personalInfo.location}</span>
            </div>
          </section>

          {education.length > 0 && (
            <section>
              <h2 className={`${sizes.h2} font-bold mb-4 border-b pb-2`} style={{ color: design.themeColor }}>
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className={`${sizes.h3} font-bold text-gray-900`}>{edu.school}</h3>
                    <div className={`${sizes.base} text-gray-600`}>{edu.degree}</div>
                    <div className={`${sizes.base} text-gray-400 text-sm`}>{edu.date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className={`${sizes.h2} font-bold mb-4 border-b pb-2`} style={{ color: design.themeColor }}>
                Skills
              </h2>
              <div className="flex flex-col gap-1">
                {skills.map((skill, index) => (
                  <span key={index} className={`${sizes.base} text-gray-600`}>
                    • {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

      </div>
    </div>
  );
}
