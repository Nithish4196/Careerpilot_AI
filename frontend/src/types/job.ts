export interface Job {
  id: string;
  companyName: string;
  companyLogo?: string;
  role: string;
  salaryMin: number | null;
  salaryMax: number | null;
  location: string;
  experienceLevel: string; // e.g., '0-2 Years'
  workType: string;
  workMode: 'Remote' | 'Hybrid' | 'Onsite' | string;
  skillsRequired: string[];
  postedDate: string | null;
  source: string;
  matchScore?: number | null;
  
  // Details
  description: string;
  companyOverview: string;
  responsibilities: string[];
  benefits: string[];
  hiringProcess: string[];
  applyLink: string;
  locationType?: string;
  jobType?: string;
  company?: string;
  title?: string;
  applyUrl?: string;
  sourcePlatform?: string;
  skills?: string[];
  experienceRequired?: string;
}

export const mockJobs: Job[] = [];
