import React, { useState } from 'react';
import ResumeControls from '../components/ResumeBuilder/ResumeControls';
import ResumeCanvas from '../components/ResumeBuilder/ResumeCanvas';
import { Download } from 'lucide-react';

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    template: 'professional',
    color: '#2c3e50',
    profile: {
      name: 'John Doe',
      title: 'Senior Software Engineer',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      summary: 'Results-driven Senior Software Engineer with over 8 years of experience in designing and developing highly scalable web applications. Proven expertise in React, Node.js, and cloud architecture. Passionate about building robust systems and leading agile teams to deliver innovative solutions.'
    },
    experience: [
      {
        id: '1',
        title: 'Lead Frontend Developer',
        company: 'Tech Innovations Inc.',
        startDate: 'Jan 2020',
        endDate: 'Present',
        description: '- Spearheaded the migration of a monolithic application to a micro-frontend architecture using React and Vite, improving load times by 40%.\n- Mentored a team of 5 junior developers, improving code quality through strict code review processes.\n- Implemented comprehensive CI/CD pipelines using GitHub Actions.'
      },
      {
        id: '2',
        title: 'Software Engineer',
        company: 'Global Solutions LLC',
        startDate: 'Mar 2017',
        endDate: 'Dec 2019',
        description: '- Developed responsive web applications using React and Redux.\n- Integrated RESTful APIs and optimized database queries in Node.js.\n- Collaborated with UX designers to implement accessible and pixel-perfect UIs.'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'B.S. in Computer Science',
        school: 'University of Technology',
        year: '2013 - 2017'
      }
    ],
    skills: [
      { id: '1', name: 'React.js' },
      { id: '2', name: 'Node.js' },
      { id: '3', name: 'TypeScript' },
      { id: '4', name: 'AWS' },
      { id: '5', name: 'Docker' },
      { id: '6', name: 'GraphQL' }
    ]
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h1 className="page-title">AI Resume Builder</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>Design your perfect resume visually. Powered by AI.</p>
        </div>
        <button className="btn btn-primary" onClick={handlePrint}>
          <Download size={18} /> Download PDF
        </button>
      </div>

      <div className="resume-builder-container">
        <ResumeControls data={resumeData} setData={setResumeData} />
        <ResumeCanvas data={resumeData} />
      </div>
    </div>
  );
}
