export interface RoadmapRequest {
  currentRole: string;
  targetRole: string;
  currentSkills: string[];
  experienceLevel: string;
  timePerWeek: string;
  learningStyle: string;
  primaryGoal: string;
  targetTimeline?: string;
}

export type SkillPriority = 'Core' | 'Important' | 'Good to Know';
export type SkillStatus = 'Already have' | 'Partially know' | 'Need to learn';
export type SkillLevel = 'Not Started' | 'Beginner' | 'Intermediate' | 'Advanced';

export interface CareerProgressionNode {
  role: string;
  avgSalary: string;
  keySkills: string[];
}

export interface SkillGap {
  name: string;
  status: SkillStatus;
}

export interface RoadmapOverview {
  readinessScore: number;
  estimatedTimeline: string;
  totalSkills: number;
  coursesRecommended: number;
  projectsToBuild: number;
  estimatedWeeks: number;
  gapSummary: string;
  skillsYouHave: string[];
  skillsYouNeed: SkillGap[];
  careerProgression: CareerProgressionNode[];
}

export interface SkillNode {
  name: string;
  priority: SkillPriority;
  estimatedTime: string;
  currentLevel: SkillLevel;
}

export interface SkillCategory {
  category: string;
  skills: SkillNode[];
}

export type DayType = 'Learn' | 'Practice' | 'Project' | 'Revise' | 'Rest';

export interface DailyPlan {
  day: string;
  topic: string;
  time: string;
  type: DayType;
}

export interface WeeklyPlan {
  weekNumber: number;
  monthNumber: number;
  dateRange: string;
  theme: string;
  days: DailyPlan[];
  weekendTask: string;
  milestone?: string;
  completed?: boolean;
}

export interface ResourceItem {
  name: string;
  platform: string;
  type: string;
  duration?: string;
  rating?: string;
  url: string;
  priceRange?: string;
  hasCertification?: boolean;
}

export interface SkillResources {
  skillName: string;
  priority: SkillPriority;
  estimatedTime: string;
  free: ResourceItem[];
  paid: ResourceItem[];
  practice: ResourceItem[];
}

export interface ProjectRecommendation {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  buildTime: string;
  description: string;
  learnings: string[];
  resumeImpactScore: 'High' | 'Medium' | 'Low';
  impactReason: string;
}

export interface ProjectPhase {
  phaseName: string;
  projects: ProjectRecommendation[];
}

export interface Certification {
  name: string;
  issuer: string;
  whyItMatters: string;
  prerequisites: string[];
  prepTime: string;
  cost: string;
  priority: 'Must Have' | 'Recommended' | 'Optional';
  url: string;
}

export interface CertificationsGroup {
  category: 'Foundation' | 'Core' | 'Advanced';
  items: Certification[];
}

export interface InterviewQuestion {
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface InterviewTopic {
  topic: string;
  questions: InterviewQuestion[];
}

export interface InterviewPrep {
  whatToExpect: string;
  questionBank: InterviewTopic[];
  resumeKeywords: string[];
  salaryInsights: {
    entry: string;
    mid: string;
    senior: string;
    topCompanies: string[];
    negotiationTips: string[];
  };
  actionPlan: {
    days30: string[];
    days60: string[];
    days90: string[];
  };
}

export interface CareerRoadmap {
  id: string;
  request: RoadmapRequest;
  overview: RoadmapOverview;
  skillTree: SkillCategory[];
  weeklyPlan: WeeklyPlan[];
  resources: SkillResources[];
  projects: ProjectPhase[];
  certifications: CertificationsGroup[];
  interviewPrep: InterviewPrep;
  createdAt: string;
}

// Generate Mock Data for 7-Tab Output
export function generateMockRoadmap(request: RoadmapRequest): CareerRoadmap {
  
  // Calculate some dynamic values based on request
  const weeks = request.timePerWeek.includes("5") ? 24 : request.timePerWeek.includes("10") ? 16 : 8;
  const readiness = Math.min(Math.round(request.currentSkills.length * 12.5), 85) || 10;
  
  return {
    id: `rm_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    request,
    createdAt: new Date().toISOString(),
    overview: {
      readinessScore: readiness,
      estimatedTimeline: `~${Math.round(weeks / 4)} months at ${request.timePerWeek}`,
      totalSkills: 14,
      coursesRecommended: 8,
      projectsToBuild: 5,
      estimatedWeeks: weeks,
      gapSummary: `Based on your background as a ${request.currentRole}, you have a solid foundation in ${request.currentSkills.join(', ') || 'basic concepts'}. To transition to a ${request.targetRole}, your biggest gaps are advanced backend architecture, distributed systems, and specific industry-standard cloud tools. We've structured a roadmap to bridge these gaps effectively.`,
      skillsYouHave: request.currentSkills,
      skillsYouNeed: [
        { name: "Advanced System Design", status: "Need to learn" },
        { name: "Docker & Kubernetes", status: "Need to learn" },
        { name: "CI/CD Pipelines", status: "Partially know" },
        { name: "Cloud Platforms (AWS/GCP)", status: "Need to learn" },
        { name: "TypeScript / Strong Typing", status: "Already have" },
        { name: "Microservices", status: "Need to learn" }
      ],
      careerProgression: [
        { role: request.currentRole, avgSalary: "₹4,00,000", keySkills: request.currentSkills },
        { role: `Junior ${request.targetRole}`, avgSalary: "₹8,00,000", keySkills: ["Basic Fullstack", "Version Control", "Core Language"] },
        { role: request.targetRole, avgSalary: "₹15,00,000", keySkills: ["System Design", "Cloud", "Microservices"] },
        { role: `Senior ${request.targetRole}`, avgSalary: "₹28,00,000", keySkills: ["Architecture", "Leadership", "Scalability"] }
      ]
    },
    skillTree: [
      {
        category: "Programming & Frameworks",
        skills: [
          { name: "TypeScript", priority: "Core", estimatedTime: "2 weeks", currentLevel: "Intermediate" },
          { name: "React / Next.js", priority: "Core", estimatedTime: "3 weeks", currentLevel: "Beginner" },
          { name: "Node.js", priority: "Core", estimatedTime: "2 weeks", currentLevel: "Not Started" }
        ]
      },
      {
        category: "Databases & Architecture",
        skills: [
          { name: "PostgreSQL", priority: "Core", estimatedTime: "2 weeks", currentLevel: "Not Started" },
          { name: "Redis Caching", priority: "Important", estimatedTime: "1 week", currentLevel: "Not Started" },
          { name: "System Design Patterns", priority: "Important", estimatedTime: "3 weeks", currentLevel: "Not Started" }
        ]
      },
      {
        category: "DevOps & Deployment",
        skills: [
          { name: "Docker", priority: "Important", estimatedTime: "1 week", currentLevel: "Not Started" },
          { name: "GitHub Actions", priority: "Good to Know", estimatedTime: "1 week", currentLevel: "Beginner" }
        ]
      }
    ],
    weeklyPlan: Array.from({ length: 4 }).map((_, i) => ({
      weekNumber: i + 1,
      monthNumber: 1,
      dateRange: `Week ${i + 1} from today`,
      theme: i === 0 ? "Fundamentals Refresher" : i === 1 ? "Core Tooling" : i === 2 ? "Database Design" : "Mini Project",
      days: [
        { day: "Monday", topic: "Theory & Concepts", time: "2 hrs", type: "Learn" },
        { day: "Tuesday", topic: "Code Along", time: "2 hrs", type: "Practice" },
        { day: "Wednesday", topic: "Deep Dive", time: "2 hrs", type: "Learn" },
        { day: "Thursday", topic: "Implementation", time: "2 hrs", type: "Project" },
        { day: "Friday", topic: "Review & Refactor", time: "1 hr", type: "Revise" }
      ],
      weekendTask: "Build a small CLI tool or API endpoint summarizing the week's concepts.",
      milestone: i === 3 ? "Complete Phase 1: Foundations" : undefined,
      completed: false
    })),
    resources: [
      {
        skillName: "System Design",
        priority: "Core",
        estimatedTime: "3 weeks",
        free: [
          { name: "System Design Primer", platform: "GitHub", type: "Documentation", duration: "20 hrs", url: "#" },
          { name: "Gaurav Sen System Design", platform: "YouTube", type: "Video", duration: "10 hrs", url: "#" }
        ],
        paid: [
          { name: "Grokking the System Design Interview", platform: "Educative", type: "Course", duration: "15 hrs", priceRange: "₹3,500/mo", url: "#", hasCertification: true }
        ],
        practice: [
          { name: "LeetCode System Design", platform: "LeetCode", type: "Platform", url: "#" }
        ]
      }
    ],
    projects: [
      {
        phaseName: "Phase 1: Core Skills",
        projects: [
          {
            title: "Task Management API with Authentication",
            difficulty: "Beginner",
            skills: ["Node.js", "Express", "JWT", "PostgreSQL"],
            buildTime: "1 week",
            description: "Build a robust REST API for a task management system. Implements secure user authentication, CRUD operations, and pagination.",
            learnings: [
              "Understand JWT-based authentication flows",
              "Design normalized database schemas",
              "Implement robust error handling and logging"
            ],
            resumeImpactScore: "Medium",
            impactReason: "Demonstrates foundational backend skills, though it is a common beginner project."
          }
        ]
      },
      {
        phaseName: "Phase 2: Advanced Architecture",
        projects: [
          {
            title: "Real-time Collaborative Whiteboard",
            difficulty: "Advanced",
            skills: ["WebSockets", "React", "Redis", "Docker"],
            buildTime: "3 weeks",
            description: "A full-stack application allowing multiple users to draw on a shared canvas in real-time.",
            learnings: [
              "Manage bi-directional data flow with WebSockets",
              "Use Redis pub/sub for scaling socket connections",
              "Containerize applications for consistent deployment"
            ],
            resumeImpactScore: "High",
            impactReason: "Shows ability to handle real-time concurrency and scalable infrastructure."
          }
        ]
      }
    ],
    certifications: [
      {
        category: "Foundation",
        items: [
          {
            name: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            whyItMatters: "Validates overall understanding of the AWS Cloud platform, covering basic cloud concepts and security.",
            prerequisites: ["Basic IT knowledge"],
            prepTime: "2-4 weeks",
            cost: "$100",
            priority: "Recommended",
            url: "#"
          }
        ]
      },
      {
        category: "Core",
        items: [
          {
            name: "Meta Back-End Developer Professional Certificate",
            issuer: "Coursera / Meta",
            whyItMatters: "Provides a comprehensive overview of backend engineering directly from industry leaders.",
            prerequisites: ["Basic Programming"],
            prepTime: "2 months",
            cost: "$39/mo",
            priority: "Must Have",
            url: "#"
          }
        ]
      }
    ],
    interviewPrep: {
      whatToExpect: `The hiring process for a ${request.targetRole} typically involves 3-4 rounds. It starts with an initial recruiter screen, followed by a coding/DSA round (either automated or live). The core round is the Technical/System Design interview focusing on architecture and problem-solving, concluding with a Behavioral/HR round.`,
      questionBank: [
        {
          topic: "System Design",
          questions: [
            { question: "Design a URL shortener like Bitly.", difficulty: "Medium" },
            { question: "How would you design Twitter's news feed?", difficulty: "Hard" }
          ]
        },
        {
          topic: "Core Languages & Frameworks",
          questions: [
            { question: "Explain the event loop in Node.js.", difficulty: "Medium" },
            { question: "What is the difference between SQL and NoSQL databases?", difficulty: "Easy" }
          ]
        }
      ],
      resumeKeywords: [
        "Microservices", "RESTful APIs", "CI/CD", "Docker", "Kubernetes", "PostgreSQL", 
        "Redis", "Scalability", "System Design", "Agile", "TypeScript", "Node.js"
      ],
      salaryInsights: {
        entry: "₹6,00,000 - ₹10,00,000",
        mid: "₹12,00,000 - ₹22,00,000",
        senior: "₹25,00,000 - ₹50,00,000+",
        topCompanies: ["Amazon", "Google", "Microsoft", "Uber", "Flipkart", "Swiggy", "Zomato", "Atlassian"],
        negotiationTips: [
          "Always negotiate on the base salary first before discussing bonuses.",
          "Highlight any competing offers to drive up the compensation package.",
          "If base salary is capped, ask for a higher joining bonus or more RSUs."
        ]
      },
      actionPlan: {
        days30: [
          "Meet key stakeholders and understand the team structure.",
          "Set up local development environment and run the core services.",
          "Push your first small bug fix or feature to production."
        ],
        days60: [
          "Take ownership of a minor feature from design to deployment.",
          "Participate actively in code reviews.",
          "Understand the CI/CD pipeline and monitoring tools."
        ],
        days90: [
          "Lead the design and implementation of a medium-sized feature.",
          "Identify and fix a tech debt or performance bottleneck.",
          "Present your work or a technical learning at a team knowledge-sharing session."
        ]
      }
    }
  };
}
