export interface Experience {
  id: string;
  company: string;
  role: string;
  date: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  date: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Experience[];
  education: Education[];
  skills: string[];
  design: {
    template: 'professional' | 'casual';
    themeColor: string; // e.g. #2563eb
    fontFamily: string; // e.g. Inter, Roboto, Merriweather
    fontSize: 'sm' | 'base' | 'lg';
  };
}

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Jane Doe',
    jobTitle: 'Software Engineer',
    email: 'jane.doe@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Passionate software engineer with 5+ years of experience building scalable web applications. Proficient in React, Node.js, and TypeScript.'
  },
  experience: [
    {
      id: '1',
      company: 'Tech Innovators Inc.',
      role: 'Senior Frontend Developer',
      date: 'Jan 2021 - Present',
      description: 'Led the migration of a legacy monolithic frontend to a modern React-based micro-frontend architecture, improving load times by 40%. Mentored junior developers and established CI/CD pipelines.'
    },
    {
      id: '2',
      company: 'WebSolutions Co.',
      role: 'Frontend Developer',
      date: 'Jun 2018 - Dec 2020',
      description: 'Developed responsive e-commerce interfaces using Vue.js and Vuex. Collaborated with UX designers to implement accessible components.'
    }
  ],
  education: [
    {
      id: '1',
      school: 'University of Technology',
      degree: 'B.S. in Computer Science',
      date: '2014 - 2018'
    }
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'CSS/Tailwind', 'GraphQL', 'Git'],
  design: {
    template: 'professional',
    themeColor: '#000000',
    fontFamily: 'font-sans',
    fontSize: 'base'
  }
};
