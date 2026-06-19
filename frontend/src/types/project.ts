export interface ProjectRequest {
  type: string;
  title: string;
  description?: string;
  level:"Beginner" |"Intermediate" |"Advanced";
  tech?: string;
  goal: string;
}

export interface BlueprintPhase {
  phase: string;
  duration: string;
  tasks: string[];
  milestone: string;
}

export interface BlueprintArchitecture {
  overview: string;
  components: { name: string; responsibility: string; tech: string }[];
  dataFlow: string[];
  databaseSchema: string[];
  endpoints: { method: string; path: string; purpose: string }[];
  folderStructure: string;
}

export interface ReferenceProject {
  name: string;
  description: string;
  relevance: string;
  github: string;
  tech: string[];
  difficulty:"Easy" |"Medium" |"Hard";
}

export interface BuildStep {
  title: string;
  instructions: string;
  codeSnippet?: string;
  warning?: string;
}

export interface BlueprintHowTo {
  prerequisites: string[];
  steps: BuildStep[];
  testing: { howTo: string; tools: string[]; cases: string[] };
  deployment: { steps: string[]; envVars: string[]; commonErrors: string[] };
}

export interface BlueprintExtraFeatures {
  intermediate: { name: string; description: string; time: string; tech: string }[];
  advanced: { name: string; description: string; time: string; tech: string }[];
  resumeUpgrades: { name: string; why: string; how: string }[];
  spinOffs: { title: string; description: string }[];
}

export interface ProjectBlueprint {
  id: string;
  createdAt: number;
  overview: {
    title: string;
    description: string;
    complexity:"Easy" |"Medium" |"Hard";
    estimatedTime: string;
    techStack: string[];
    whatYouWillLearn: string[];
    whoIsItFor: string;
    similarProducts: { name: string; relation: string }[];
  };
  roadmap: {
    phases: BlueprintPhase[];
    hours: { coding: number; research: number; testing: number; deployment: number };
  };
  architecture: BlueprintArchitecture;
  existingProjects: ReferenceProject[];
  howToBuild: BlueprintHowTo;
  extraFeatures: BlueprintExtraFeatures;
}

// Helper to generate mock blueprint
export const generateMockBlueprint = (req: ProjectRequest): ProjectBlueprint => {
  return {
    id: `proj_${Date.now()}`,
    createdAt: Date.now(),
    overview: {
      title: req.title,
      description: req.description || `A comprehensive ${req.type} project built to ${req.goal.toLowerCase()}.`,
      complexity: req.level ==="Advanced" ?"Hard" : req.level ==="Intermediate" ?"Medium" :"Easy",
      estimatedTime:"2–3 weeks",
      techStack: req.tech ? req.tech.split(',').map(s => s.trim()) : ["React","Node.js","PostgreSQL","Docker"],
      whatYouWillLearn: ["End-to-end system design","State management and data flow","Database schema design and querying","API creation and integration","Deployment and CI/CD pipelines"
      ],
      whoIsItFor:"This project is perfect for developers looking to bridge the gap between theoretical knowledge and practical implementation. It acts as a strong portfolio piece demonstrating full-stack capabilities.",
      similarProducts: [
        { name:"SimilarApp One", relation:"Uses the same core data architecture." },
        { name:"Industry Standard Tool", relation:"Solves a similar problem at enterprise scale." }
      ]
    },
    roadmap: {
      phases: [
        {
          phase:"Phase 1 — Project Setup",
          duration:"Day 1–2",
          tasks: ["Initialize Git repo","Setup frontend framework","Configure backend boilerplate","Setup environment variables"],
          milestone:"Basic Hello World app runs locally"
        },
        {
          phase:"Phase 2 — Database & Auth",
          duration:"Day 3–5",
          tasks: ["Design schema","Setup Supabase/Postgres","Implement user registration","Setup JWT auth"],
          milestone:"Users can sign up and log in securely"
        },
        {
          phase:"Phase 3 — Core Features",
          duration:"Day 6–10",
          tasks: ["Build main dashboard","Implement CRUD operations","Connect frontend to API endpoints"],
          milestone:"Core data can be created, read, updated, and deleted"
        },
        {
          phase:"Phase 4 — Real-time & Integrations",
          duration:"Day 11–13",
          tasks: ["Setup WebSockets","Integrate third-party APIs","Handle background jobs"],
          milestone:"System responds to live events"
        },
        {
          phase:"Phase 5 — Deployment & Polish",
          duration:"Day 14–15",
          tasks: ["Write unit tests","Setup CI/CD","Deploy to Vercel/Render","Write README"],
          milestone:"Project is live and accessible via URL"
        }
      ],
      hours: { coding: 40, research: 10, testing: 8, deployment: 5 }
    },
    architecture: {
      overview:"The system follows a standard client-server architecture with a RESTful API. The frontend handles state and UI rendering, communicating with the backend via secure HTTP requests. Data is persisted in a relational database, optimized for read-heavy operations.",
      components: [
        { name:"Frontend Client", responsibility:"Renders UI and handles user input", tech:"React / Next.js" },
        { name:"API Gateway", responsibility:"Routes requests and handles auth", tech:"Node.js / Express" },
        { name:"Primary Database", responsibility:"Stores persistent application data", tech:"PostgreSQL" }
      ],
      dataFlow: ["User triggers an action on the client interface.","Client sends an authenticated HTTP request to the API.","API validates the JWT and sanitizes input.","API executes the corresponding database query.","Database returns the result set to the API.","API formats the response and sends JSON back to the client."
      ],
      databaseSchema: ["users (id, email, password_hash, created_at)","resources (id, user_id, title, content, updated_at)","logs (id, event_type, timestamp)"
      ],
      endpoints: [
        { method:"POST", path:"/api/auth/login", purpose:"Authenticates user and returns JWT" },
        { method:"GET", path:"/api/resources", purpose:"Fetches paginated list of resources" },
        { method:"POST", path:"/api/resources", purpose:"Creates a new resource" }
      ],
      folderStructure: `project-root/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   └── package.json
└── README.md`
    },
    existingProjects: [
      {
        name:"Reference Project A",
        description:"An open-source alternative solving the same core problem.",
        relevance:"Study their folder structure and state management.",
        github:"https://github.com/example/project-a",
        tech: ["React","Node.js","MongoDB"],
        difficulty:"Medium"
      },
      {
        name:"Reference Project B",
        description:"A popular boilerplate for this specific tech stack.",
        relevance:"Great for understanding how to setup auth and database connections.",
        github:"https://github.com/example/project-b",
        tech: ["Next.js","Prisma","Postgres"],
        difficulty:"Easy"
      }
    ],
    howToBuild: {
      prerequisites: ["Basic understanding of modern JavaScript.","Node.js installed locally.","A free account on GitHub and Vercel/Render."
      ],
      steps: [
        {
          title:"Initialize Repository",
          instructions:"Start by creating a new directory and initializing a git repository. Set up your client and server folders.",
          codeSnippet:"mkdir my-project\ncd my-project\ngit init\nnpx create-next-app@latest client\nmkdir server && cd server && npm init -y",
          warning:"Don't forget to add node_modules to your .gitignore before making your first commit."
        },
        {
          title:"Setup Express Server",
          instructions:"Install the necessary dependencies for your backend. Create a basic Express server that listens on port 5000.",
          codeSnippet:"npm install express cors dotenv\n\n// index.js\nconst express = require('express');\nconst app = express();\napp.use(express.json());\napp.listen(5000, () => console.log('Server running'));"
        },
        {
          title:"Connect Database",
          instructions:"Set up your database connection string in a .env file. Use an ORM or query builder to establish the connection.",
          warning:"Never commit your .env file to GitHub."
        }
      ],
      testing: {
        howTo:"Focus on testing your API endpoints first, then add unit tests for complex frontend logic.",
        tools: ["Jest","Supertest","React Testing Library"],
        cases: ["User login fails with invalid credentials","API returns 401 when token is missing","Frontend renders error state when API is down"]
      },
      deployment: {
        steps: ["Push all code to a GitHub repository.","Connect your Vercel account to the repo to deploy the frontend.","Use Render or Railway to deploy your Express backend.","Update CORS settings on your backend to accept requests from your Vercel URL."
        ],
        envVars: ["DATABASE_URL","JWT_SECRET","NEXT_PUBLIC_API_URL"],
        commonErrors: ["CORS Policy Error: Ensure your backend explicitly allows the frontend origin.","Environment Variables Missing: Double check that you added the production variables in the hosting dashboard."
        ]
      }
    },
    extraFeatures: {
      intermediate: [
        { name:"OAuth Integration", description:"Allow users to log in with Google or GitHub.", time:"1 day", tech:"NextAuth / Passport.js" },
        { name:"Dark Mode Toggle", description:"Implement a robust theming system.", time:"4 hours", tech:"Tailwind CSS" }
      ],
      advanced: [
        { name:"Real-time Notifications", description:"Notify users instantly when an event occurs.", time:"2-3 days", tech:"Socket.io / Redis" },
        { name:"Advanced Analytics", description:"Track user behavior and generate reports.", time:"3 days", tech:"PostHog / Mixpanel" }
      ],
      resumeUpgrades: [
        { name:"Comprehensive CI/CD", why:"Shows you understand production deployments.", how:"Set up GitHub Actions to run your tests automatically on every pull request." },
        { name:"Docker Containerization", why:"Demonstrates DevOps awareness.", how:"Write a Dockerfile and docker-compose.yml to spin up the app and database with one command." }
      ],
      spinOffs: [
        { title:"Mobile App Version", description:"Rebuild the frontend using React Native." },
        { title:"Public API Offering", description:"Refactor the backend to offer a developer API." },
        { title:"Microservices Split", description:"Break the backend into separate auth and data services." }
      ]
    }
  };
};
