export interface AIMatchAnalysis {
  score: number;
  missingSkills: string[];
  recommendations: string[];
  whyItMatches: string;
}

export interface Job {
  id: string;
  companyName: string;
  companyLogo?: string;
  role: string;
  salaryMin: number;
  salaryMax: number;
  location: string;
  experienceLevel: string; // e.g., '0-2 Years'
  workType: 'Full-Time' | 'Internship' | 'Contract';
  workMode: 'Remote' | 'Hybrid' | 'Onsite';
  skillsRequired: string[];
  postedDate: string;
  source: 'LinkedIn' | 'Naukri' | 'Foundit' | 'Unstop' | 'Indeed' | 'Glassdoor' | 'Google Jobs' | 'Bing Jobs' | 'Company Career Page';
  aiMatch: AIMatchAnalysis;
  
  // Details
  description: string;
  companyOverview: string;
  responsibilities: string[];
  benefits: string[];
  hiringProcess: string[];
  applyLink: string;
}

const baseMockJobs: Job[] = [
  {
    id: "job_1",
    companyName: "TCS",
    role: "Data Analyst",
    salaryMin: 6,
    salaryMax: 10,
    location: "Chennai, Tamil Nadu",
    experienceLevel: "0-2 Years",
    workType: "Full-Time",
    workMode: "Hybrid",
    skillsRequired: ["SQL", "Power BI", "Excel", "Python"],
    postedDate: "2 days ago",
    source: "LinkedIn",
    aiMatch: {
      score: 92,
      whyItMatches: "Your resume shows strong Python and Excel experience, which are core to this role.",
      missingSkills: ["Power BI", "Advanced SQL"],
      recommendations: ["Learn Power BI", "Complete SQL Certification"]
    },
    description: "We are looking for a highly motivated Data Analyst to join our expanding team. You will be responsible for interpreting data, analyzing results using statistical techniques, and providing ongoing reports.",
    companyOverview: "Tata Consultancy Services is an IT services, consulting and business solutions organization that has been partnering with many of the world's largest businesses in their transformation journeys for over 50 years.",
    responsibilities: [
      "Acquire data from primary or secondary data sources and maintain databases/data systems",
      "Identify, analyze, and interpret trends or patterns in complex data sets",
      "Filter and 'clean' data by reviewing computer reports, printouts, and performance indicators"
    ],
    benefits: [
      "Comprehensive Health Insurance",
      "Flexible hybrid work schedule",
      "Performance bonus"
    ],
    hiringProcess: ["Aptitude Test", "Technical Interview", "HR Round"],
    applyLink: "https://www.linkedin.com/jobs/search/?keywords=Data%20Analyst%20TCS"
  },
  {
    id: "job_2",
    companyName: "Google",
    role: "Software Engineer, Frontend",
    salaryMin: 15,
    salaryMax: 25,
    location: "Bangalore, Karnataka",
    experienceLevel: "2-5 Years",
    workType: "Full-Time",
    workMode: "Onsite",
    skillsRequired: ["React", "TypeScript", "Next.js", "System Design"],
    postedDate: "1 day ago",
    source: "Google Jobs",
    aiMatch: {
      score: 85,
      whyItMatches: "You have matching skills in React and Next.js from your recent projects.",
      missingSkills: ["System Design"],
      recommendations: ["Practice Frontend System Design"]
    },
    description: "Google's software engineers develop the next-generation technologies that change how billions of users connect, explore, and interact with information and one another.",
    companyOverview: "Google’s mission is to organize the world’s information and make it universally accessible and useful.",
    responsibilities: [
      "Write client-side code for web-based applications",
      "Develop prototypes quickly",
      "Build fast and efficient next-generation web applications"
    ],
    benefits: [
      "Free meals and snacks",
      "Top-tier health coverage",
      "Generous equity package"
    ],
    hiringProcess: ["Phone Screen", "4 Onsite Technical Interviews", "Team Matching"],
    applyLink: "https://careers.google.com/jobs/results/?q=Software%20Engineer%20Frontend&location=Bangalore"
  },
  {
    id: "job_3",
    companyName: "Stripe",
    role: "Frontend Developer",
    salaryMin: 20,
    salaryMax: 35,
    location: "Anywhere in India",
    experienceLevel: "5+ Years",
    workType: "Full-Time",
    workMode: "Remote",
    skillsRequired: ["TypeScript", "React", "Node.js", "GraphQL"],
    postedDate: "5 hours ago",
    source: "LinkedIn",
    aiMatch: {
      score: 78,
      whyItMatches: "Strong match on TypeScript and React. Significant overlap in core competencies.",
      missingSkills: ["GraphQL"],
      recommendations: ["Build a small project using Apollo GraphQL"]
    },
    description: "We're looking for a Frontend Developer to join our team building the future of online payments.",
    companyOverview: "Stripe is a financial infrastructure platform for the internet.",
    responsibilities: [
      "Design, build, and maintain APIs, services, and systems across Stripe's engineering teams",
      "Debug production issues across services and multiple levels of the stack",
      "Improve engineering standards, tooling, and processes"
    ],
    benefits: [
      "Fully remote work environment",
      "Home office stipend",
      "Wellness allowance"
    ],
    hiringProcess: ["Take-home assignment", "Technical Interview", "System Design Interview", "Culture Fit"],
    applyLink: "https://www.linkedin.com/jobs/search/?keywords=Frontend%20Developer%20Stripe"
  },
  {
    id: "job_4",
    companyName: "Infosys",
    role: "Full Stack Developer",
    salaryMin: 5,
    salaryMax: 8,
    location: "Bangalore, Karnataka",
    experienceLevel: "0-2 Years",
    workType: "Full-Time",
    workMode: "Hybrid",
    skillsRequired: ["React", "Node.js", "MongoDB", "Express"],
    postedDate: "Just now",
    source: "Naukri",
    aiMatch: {
      score: 88,
      whyItMatches: "Your profile indicates strong familiarity with the MERN stack which fits perfectly here.",
      missingSkills: [],
      recommendations: ["Highlight your full-stack projects in the interview"]
    },
    description: "Looking for an energetic Full Stack Developer to build scalable enterprise solutions.",
    companyOverview: "Infosys is a global leader in next-generation digital services and consulting.",
    responsibilities: [
      "Develop both client-side and server-side software",
      "Build APIs and integrate third-party services",
      "Ensure cross-platform optimization for mobile phones"
    ],
    benefits: [
      "Comprehensive Training",
      "Health coverage",
      "Performance bonus"
    ],
    hiringProcess: ["Online Assessment", "Technical Interview", "HR Interview"],
    applyLink: "https://www.naukri.com/full-stack-developer-jobs-in-bangalore"
  },
  {
    id: "job_5",
    companyName: "Amazon",
    role: "Data Analyst",
    salaryMin: 7,
    salaryMax: 12,
    location: "Bangalore, Karnataka",
    experienceLevel: "0-2 Years",
    workType: "Full-Time",
    workMode: "Hybrid",
    skillsRequired: ["SQL", "Excel", "Python", "Tableau"],
    postedDate: "1 hour ago",
    source: "LinkedIn",
    aiMatch: {
      score: 95,
      whyItMatches: "Your background in Data Science and Python perfectly aligns with Amazon's data team requirements.",
      missingSkills: ["Tableau"],
      recommendations: ["Brush up on Tableau dashboard creation"]
    },
    description: "Amazon is looking for a Data Analyst to dive deep into complex datasets and provide actionable insights.",
    companyOverview: "Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.",
    responsibilities: [
      "Analyze and solve business problems at their root",
      "Design and develop metrics, reports, and dashboards",
      "Collaborate with engineering teams to build data pipelines"
    ],
    benefits: [
      "Health, dental, and vision insurance",
      "Paid time off",
      "Employee discount"
    ],
    hiringProcess: ["Online Assessment", "Phone Screen", "Loop Interviews"],
    applyLink: "https://www.linkedin.com/jobs/search/?keywords=Data%20Analyst%20Amazon"
  }
];

export const mockJobs: Job[] = [
  ...baseMockJobs,
  ...baseMockJobs.map(job => ({ ...job, id: job.id + "_copy1" })),
  ...baseMockJobs.map(job => ({ ...job, id: job.id + "_copy2" })),
  ...baseMockJobs.map(job => ({ ...job, id: job.id + "_copy3" }))
];
