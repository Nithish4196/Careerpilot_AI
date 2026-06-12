import { 
  ChartBar, Brain, Bot, Layout, Layers, Briefcase, 
  Database, Server, Cpu, ShieldCheck, Cloud, Smartphone 
} from 'lucide-react';
import React from 'react';

export interface Course {
  id: string;
  title: string;
  platform: string;
  type: "certification" | "course" | "tutorial";
  demand: "high" | "medium" | "standard";
  free: boolean;
  duration: string;
  rating: number;
  enrolled: string;
  url: string;
}

export interface RoadmapPhase {
  phase: string;
  weeks: string;
  skills: string[];
}

export interface SourceVideo {
  id: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  thumb: string;
  url: string;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  roadmap: RoadmapPhase[];
  courses: Course[];
  videos: SourceVideo[];
}

export const COURSE_DATA: Record<string, CareerPath> = {
  "data-analyst": {
    id: "data-analyst",
    title: "Data Analyst",
    description: "SQL, Power BI, Python, Excel",
    icon: ChartBar,
    roadmap: [
      { phase: "Foundation", weeks: "Weeks 1–4", skills: ["Excel Advanced", "SQL Basics", "Statistics Fundamentals"] },
      { phase: "Core Tools", weeks: "Weeks 5–10", skills: ["Python (Pandas, NumPy)", "Power BI / Tableau", "Data Cleaning"] },
      { phase: "Advanced", weeks: "Weeks 11–16", skills: ["Advanced SQL", "Business Analytics", "Dashboard Design"] },
      { phase: "Job Ready", weeks: "Weeks 17–20", skills: ["Portfolio Projects", "Case Studies", "Interview Prep"] }
    ],
    courses: [
      { id: "da_1", title: "Google Data Analytics Professional Certificate", platform: "Coursera", type: "certification", demand: "high", free: false, duration: "6 months", rating: 4.8, enrolled: "1.5M", url: "https://www.coursera.org/professional-certificates/google-data-analytics" },
      { id: "da_2", title: "Data Analysis with Python Certification", platform: "FreeCodeCamp", type: "certification", demand: "high", free: true, duration: "300 hours", rating: 4.9, enrolled: "800K", url: "https://www.freecodecamp.org/learn/data-analysis-with-python/" },
      { id: "da_3", title: "The Complete SQL Bootcamp 2024", platform: "Udemy", type: "course", demand: "high", free: false, duration: "9 hours", rating: 4.7, enrolled: "600K", url: "https://www.udemy.com/course/the-complete-sql-bootcamp/" },
      { id: "da_4", title: "Data Analyst Full Course in 10 Hours", platform: "YouTube", type: "tutorial", demand: "standard", free: true, duration: "10 hours", rating: 4.8, enrolled: "2.1M views", url: "https://www.youtube.com/results?search_query=Data+Analyst+Full+Course" },
      { id: "da_5", title: "IBM Data Analyst Professional Certificate", platform: "Coursera", type: "certification", demand: "medium", free: false, duration: "11 months", rating: 4.6, enrolled: "400K", url: "https://www.coursera.org/professional-certificates/ibm-data-analyst" },
      { id: "da_6", title: "Microsoft Power BI Desktop for Business Intelligence", platform: "Udemy", type: "course", demand: "high", free: false, duration: "15 hours", rating: 4.6, enrolled: "550K", url: "https://www.udemy.com/course/microsoft-power-bi-up-running-with-power-bi-desktop/" }
    ],
    videos: [
      { id: "v_da_1", title: "Data Analyst Portfolio Project | SQL Data Exploration", channel: "Alex The Analyst", duration: "1:05:22", views: "1.2M", thumb: "📊", url: "https://www.youtube.com/results?search_query=Data+Analyst+Portfolio+Project" },
      { id: "v_da_2", title: "Learn SQL In 60 Minutes", channel: "Web Dev Simplified", duration: "0:56:15", views: "3.4M", thumb: "💾", url: "https://www.youtube.com/results?search_query=Learn+SQL+In+60+Minutes" },
      { id: "v_da_3", title: "Tableau Full Course - Learn Tableau in 6 Hours", channel: "Edureka", duration: "6:10:05", views: "2.1M", thumb: "📈", url: "https://www.youtube.com/results?search_query=Tableau+Full+Course" },
      { id: "v_da_4", title: "Python for Data Analysis: Pandas & NumPy", channel: "freeCodeCamp", duration: "4:00:10", views: "900K", thumb: "🐍", url: "https://www.youtube.com/results?search_query=Python+for+Data+Analysis+Pandas+NumPy" }
    ]
  },
  "data-scientist": {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Machine Learning, Math, Python",
    icon: Brain,
    roadmap: [
      { phase: "Foundation", weeks: "Weeks 1–6", skills: ["Linear Algebra", "Calculus Basics", "Python Programming"] },
      { phase: "Data & Stats", weeks: "Weeks 7–12", skills: ["Probability", "Inferential Statistics", "Data Wrangling"] },
      { phase: "Machine Learning", weeks: "Weeks 13–20", skills: ["Scikit-Learn", "Supervised/Unsupervised Learning", "Model Evaluation"] },
      { phase: "Specialization", weeks: "Weeks 21–24", skills: ["Deep Learning (Intro)", "NLP/CV Basics", "Deployment"] }
    ],
    courses: [
      { id: "ds_1", title: "Machine Learning Specialization", platform: "Coursera", type: "certification", demand: "high", free: false, duration: "2 months", rating: 4.9, enrolled: "1.8M", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
      { id: "ds_2", title: "Data Science: Machine Learning", platform: "edX", type: "course", demand: "medium", free: true, duration: "8 weeks", rating: 4.6, enrolled: "350K", url: "https://www.edx.org/course/data-science-machine-learning" },
      { id: "ds_3", title: "Python for Data Science and Machine Learning Bootcamp", platform: "Udemy", type: "course", demand: "high", free: false, duration: "25 hours", rating: 4.6, enrolled: "650K", url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/" },
      { id: "ds_4", title: "IBM Data Science Professional Certificate", platform: "Coursera", type: "certification", demand: "high", free: false, duration: "10 months", rating: 4.6, enrolled: "1.2M", url: "https://www.coursera.org/professional-certificates/ibm-data-science" },
      { id: "ds_5", title: "Machine Learning for Everybody", platform: "YouTube", type: "tutorial", demand: "standard", free: true, duration: "3.5 hours", rating: 4.8, enrolled: "3.5M views", url: "https://www.youtube.com/results?search_query=Machine+Learning+for+Everybody" },
      { id: "ds_6", title: "Deep Learning Specialization", platform: "Coursera", type: "certification", demand: "high", free: false, duration: "3 months", rating: 4.9, enrolled: "1M", url: "https://www.coursera.org/specializations/deep-learning" }
    ],
    videos: [
      { id: "v_ds_1", title: "Data Science Full Course 10 Hours", channel: "Edureka", duration: "10:15:20", views: "4.5M", thumb: "🧠", url: "https://www.youtube.com/results?search_query=Data+Science+Full+Course+10+Hours" },
      { id: "v_ds_2", title: "Neural Networks from Scratch", channel: "Sentdex", duration: "1:00:00", views: "800K", thumb: "🤖", url: "https://www.youtube.com/results?search_query=Neural+Networks+from+Scratch" },
      { id: "v_ds_3", title: "StatQuest: Machine Learning Fundamentals", channel: "StatQuest", duration: "2:30:00", views: "1.5M", thumb: " BAM!", url: "https://www.youtube.com/results?search_query=StatQuest+Machine+Learning" }
    ]
  },
  "ai-engineer": {
    id: "ai-engineer",
    title: "AI Engineer",
    description: "LLMs, Neural Networks, PyTorch",
    icon: Bot,
    roadmap: [
      { phase: "Fundamentals", weeks: "Weeks 1–6", skills: ["Python Advanced", "Math for AI", "Deep Learning Basics"] },
      { phase: "Frameworks", weeks: "Weeks 7–12", skills: ["PyTorch / TensorFlow", "Computer Vision", "NLP Foundations"] },
      { phase: "Generative AI", weeks: "Weeks 13–18", skills: ["Transformers", "Hugging Face", "LLM Fine-Tuning"] },
      { phase: "Production", weeks: "Weeks 19–24", skills: ["MLOps", "Model Deployment", "LangChain"] }
    ],
    courses: [
      { id: "ai_1", title: "Generative AI with Large Language Models", platform: "Coursera", type: "certification", demand: "high", free: false, duration: "3 weeks", rating: 4.8, enrolled: "150K", url: "https://www.coursera.org/learn/generative-ai-with-llms" },
      { id: "ai_2", title: "Hugging Face NLP Course", platform: "Hugging Face", type: "course", demand: "high", free: true, duration: "30 hours", rating: 4.9, enrolled: "250K", url: "https://huggingface.co/learn/nlp-course/chapter1/1" },
      { id: "ai_3", title: "Deep Learning with PyTorch", platform: "Udemy", type: "course", demand: "standard", free: false, duration: "14 hours", rating: 4.6, enrolled: "80K", url: "https://www.udemy.com/course/pytorch-for-deep-learning-with-python-bootcamp/" },
      { id: "ai_4", title: "LangChain & Vector Databases in Production", platform: "YouTube", type: "tutorial", demand: "high", free: true, duration: "4 hours", rating: 4.7, enrolled: "500K views", url: "https://www.youtube.com/results?search_query=LangChain+Vector+Databases" },
      { id: "ai_5", title: "AI for Everyone", platform: "Coursera", type: "course", demand: "standard", free: false, duration: "4 weeks", rating: 4.8, enrolled: "1.1M", url: "https://www.coursera.org/learn/ai-for-everyone" },
      { id: "ai_6", title: "Practical Deep Learning for Coders", platform: "fast.ai", type: "course", demand: "high", free: true, duration: "7 weeks", rating: 4.9, enrolled: "500K", url: "https://course.fast.ai/" }
    ],
    videos: [
      { id: "v_ai_1", title: "Let's build GPT: from scratch", channel: "Andrej Karpathy", duration: "1:56:12", views: "3.2M", thumb: "📝", url: "https://www.youtube.com/results?search_query=Let%27s+build+GPT+from+scratch" },
      { id: "v_ai_2", title: "LangChain Crash Course", channel: "Fireship", duration: "0:15:20", views: "1.1M", thumb: "🔥", url: "https://www.youtube.com/results?search_query=LangChain+Crash+Course" },
      { id: "v_ai_3", title: "Vector Databases Explained", channel: "NetworkChuck", duration: "0:20:15", views: "850K", thumb: "☕", url: "https://www.youtube.com/results?search_query=Vector+Databases+Explained" }
    ]
  },
  "frontend-developer": {
    id: "frontend-developer",
    title: "Frontend Developer",
    description: "React, CSS, TypeScript",
    icon: Layout,
    roadmap: [
      { phase: "The Basics", weeks: "Weeks 1–4", skills: ["HTML5", "CSS3 / Flexbox", "JavaScript (ES6+)"] },
      { phase: "Frameworks", weeks: "Weeks 5–10", skills: ["React fundamentals", "Hooks", "State Management"] },
      { phase: "Advanced UI", weeks: "Weeks 11–16", skills: ["Tailwind CSS", "TypeScript", "Next.js"] },
      { phase: "Polish & Deploy", weeks: "Weeks 17–20", skills: ["Performance", "Testing (Jest)", "Vercel / Netlify"] }
    ],
    courses: [
      { id: "fe_1", title: "Meta Front-End Developer Professional Certificate", platform: "Coursera", type: "certification", demand: "high", free: false, duration: "7 months", rating: 4.7, enrolled: "250K", url: "https://www.coursera.org/professional-certificates/meta-front-end-developer" },
      { id: "fe_2", title: "Responsive Web Design", platform: "FreeCodeCamp", type: "certification", demand: "high", free: true, duration: "300 hours", rating: 4.9, enrolled: "4M", url: "https://www.freecodecamp.org/learn/responsive-web-design/" },
      { id: "fe_3", title: "React - The Complete Guide (incl Hooks, React Router, Redux)", platform: "Udemy", type: "course", demand: "high", free: false, duration: "50 hours", rating: 4.7, enrolled: "800K", url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/" },
      { id: "fe_4", title: "TypeScript for Beginners", platform: "YouTube", type: "tutorial", demand: "medium", free: true, duration: "3 hours", rating: 4.8, enrolled: "1.5M views", url: "https://www.youtube.com/results?search_query=TypeScript+for+Beginners" },
      { id: "fe_5", title: "CSS Bootcamp - Master CSS", platform: "Udemy", type: "course", demand: "standard", free: false, duration: "12 hours", rating: 4.7, enrolled: "100K", url: "https://www.udemy.com/course/css-bootcamp-master-css/" },
      { id: "fe_6", title: "Next.js 14 Full Course 2024", platform: "YouTube", type: "tutorial", demand: "high", free: true, duration: "5 hours", rating: 4.9, enrolled: "800K views", url: "https://www.youtube.com/results?search_query=Next.js+14+Full+Course" }
    ],
    videos: [
      { id: "v_fe_1", title: "React Course - Beginner's Tutorial for React", channel: "freeCodeCamp", duration: "11:55:00", views: "5.5M", thumb: "⚛️", url: "https://www.youtube.com/results?search_query=React+Course+Beginner" },
      { id: "v_fe_2", title: "10 React Hooks Explained", channel: "Fireship", duration: "0:12:05", views: "2.1M", thumb: "🪝", url: "https://www.youtube.com/results?search_query=10+React+Hooks+Explained" },
      { id: "v_fe_3", title: "Tailwind CSS Crash Course", channel: "Traversy Media", duration: "1:15:30", views: "1.8M", thumb: "🎨", url: "https://www.youtube.com/results?search_query=Tailwind+CSS+Crash+Course" }
    ]
  },
  "full-stack-developer": {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    description: "MERN, APIs, Databases",
    icon: Layers,
    roadmap: [
      { phase: "Frontend", weeks: "Weeks 1–8", skills: ["React", "HTML/CSS", "JavaScript"] },
      { phase: "Backend", weeks: "Weeks 9–14", skills: ["Node.js", "Express", "REST APIs"] },
      { phase: "Databases", weeks: "Weeks 15–18", skills: ["MongoDB", "PostgreSQL", "Prisma ORM"] },
      { phase: "Full Stack", weeks: "Weeks 19–24", skills: ["Auth", "Deployment", "CI/CD basics"] }
    ],
    courses: [
      { id: "fs_1", title: "The Complete Web Development Bootcamp", platform: "Udemy", type: "course", demand: "high", free: false, duration: "65 hours", rating: 4.7, enrolled: "1.1M", url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/" },
      { id: "fs_2", title: "Full Stack Open", platform: "FreeCodeCamp", type: "course", demand: "high", free: true, duration: "120 hours", rating: 4.9, enrolled: "100K", url: "https://fullstackopen.com/en/" },
      { id: "fs_3", title: "IBM Full Stack Software Developer Certificate", platform: "Coursera", type: "certification", demand: "medium", free: false, duration: "14 months", rating: 4.6, enrolled: "200K", url: "https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer" },
      { id: "fs_4", title: "MERN Stack Front To Back", platform: "Udemy", type: "course", demand: "high", free: false, duration: "12 hours", rating: 4.7, enrolled: "150K", url: "https://www.udemy.com/course/mern-stack-front-to-back/" },
      { id: "fs_5", title: "Build and Deploy a Full Stack App", platform: "YouTube", type: "tutorial", demand: "standard", free: true, duration: "3 hours", rating: 4.8, enrolled: "1.5M views", url: "https://www.youtube.com/results?search_query=Build+Full+Stack+App" },
      { id: "fs_6", title: "CS50's Web Programming with Python and JavaScript", platform: "edX", type: "course", demand: "high", free: true, duration: "12 weeks", rating: 4.8, enrolled: "900K", url: "https://www.edx.org/course/cs50s-web-programming-with-python-and-javascript" }
    ],
    videos: [
      { id: "v_fs_1", title: "MERN Stack Tutorial", channel: "Net Ninja", duration: "2:00:00", views: "1.2M", thumb: "🥷", url: "https://www.youtube.com/results?search_query=MERN+Stack+Tutorial+Net+Ninja" },
      { id: "v_fs_2", title: "Backend Web Development - Build a Node.js App", channel: "freeCodeCamp", duration: "5:30:00", views: "2.8M", thumb: "⚙️", url: "https://www.youtube.com/results?search_query=Backend+Web+Development+Node.js" },
      { id: "v_fs_3", title: "Docker Crash Course for Absolute Beginners", channel: "TechWorld with Nana", duration: "1:30:00", views: "3M", thumb: "🐳", url: "https://www.youtube.com/results?search_query=Docker+Crash+Course" }
    ]
  },
  "product-manager": {
    id: "product-manager",
    title: "Product Manager",
    description: "Agile, Strategy, User Research",
    icon: Briefcase,
    roadmap: [
      { phase: "Fundamentals", weeks: "Weeks 1–4", skills: ["Product Lifecycle", "Market Research", "User Personas"] },
      { phase: "Strategy", weeks: "Weeks 5–8", skills: ["Roadmapping", "Prioritization", "OKRs"] },
      { phase: "Execution", weeks: "Weeks 9–14", skills: ["Agile/Scrum", "Writing Specs (PRDs)", "Jira/Confluence"] },
      { phase: "Metrics", weeks: "Weeks 15–18", skills: ["A/B Testing", "Analytics", "Go-To-Market"] }
    ],
    courses: [
      { id: "pm_1", title: "Google Project Management: Professional Certificate", platform: "Coursera", type: "certification", demand: "high", free: false, duration: "6 months", rating: 4.8, enrolled: "1.5M", url: "https://www.coursera.org/professional-certificates/google-project-management" },
      { id: "pm_2", title: "Become a Product Manager | Learn the Skills", platform: "Udemy", type: "course", demand: "high", free: false, duration: "13 hours", rating: 4.6, enrolled: "250K", url: "https://www.udemy.com/course/become-a-product-manager-learn-the-skills-get-the-job/" },
      { id: "pm_3", title: "Product Management 101", platform: "YouTube", type: "tutorial", demand: "standard", free: true, duration: "2 hours", rating: 4.7, enrolled: "500K views", url: "https://www.youtube.com/results?search_query=Product+Management+101" },
      { id: "pm_4", title: "Digital Product Management", platform: "Coursera", type: "course", demand: "medium", free: false, duration: "4 weeks", rating: 4.7, enrolled: "180K", url: "https://www.coursera.org/learn/uva-darden-digital-product-management" },
      { id: "pm_5", title: "Agile Crash Course", platform: "Udemy", type: "course", demand: "standard", free: false, duration: "2.5 hours", rating: 4.5, enrolled: "150K", url: "https://www.udemy.com/course/agile-crash-course/" },
      { id: "pm_6", title: "Product Strategy", platform: "edX", type: "course", demand: "medium", free: true, duration: "6 weeks", rating: 4.6, enrolled: "50K", url: "https://www.edx.org/course/product-strategy" }
    ],
    videos: [
      { id: "v_pm_1", title: "What is Product Management?", channel: "Product School", duration: "0:55:00", views: "800K", thumb: "📊", url: "https://www.youtube.com/results?search_query=What+is+Product+Management" },
      { id: "v_pm_2", title: "How to Write a PRD", channel: "Lenny Rachitsky", duration: "0:25:00", views: "150K", thumb: "📝", url: "https://www.youtube.com/results?search_query=How+to+write+a+PRD" },
      { id: "v_pm_3", title: "Agile Project Management Tutorial", channel: "Simplilearn", duration: "2:10:00", views: "1M", thumb: "🔄", url: "https://www.youtube.com/results?search_query=Agile+Project+Management" }
    ]
  },
  "data-engineer": {
    id: "data-engineer",
    title: "Data Engineer",
    description: "ETL, Spark, Cloud Data",
    icon: Database,
    roadmap: [
      { phase: "SQL & Python", weeks: "Weeks 1–6", skills: ["Advanced SQL", "Python Scripting", "Bash/Linux"] },
      { phase: "Data Warehousing", weeks: "Weeks 7–12", skills: ["PostgreSQL", "Snowflake / BigQuery", "Data Modeling"] },
      { phase: "Big Data", weeks: "Weeks 13–18", skills: ["Apache Spark", "Kafka", "Hadoop ecosystem"] },
      { phase: "Orchestration", weeks: "Weeks 19–24", skills: ["Airflow", "dbt", "AWS/GCP/Azure"] }
    ],
    courses: [
      { id: "de_1", title: "IBM Data Engineering Professional Certificate", platform: "Coursera", type: "certification", demand: "high", free: false, duration: "5 months", rating: 4.6, enrolled: "150K", url: "https://www.coursera.org/professional-certificates/ibm-data-engineer" },
      { id: "de_2", title: "Data Engineering with AWS", platform: "Udemy", type: "course", demand: "high", free: false, duration: "18 hours", rating: 4.7, enrolled: "120K", url: "https://www.udemy.com/course/aws-data-engineering/" },
      { id: "de_3", title: "Data Engineering Zoomcamp", platform: "YouTube", type: "tutorial", demand: "high", free: true, duration: "40 hours", rating: 4.9, enrolled: "50K views", url: "https://www.youtube.com/results?search_query=Data+Engineering+Zoomcamp" },
      { id: "de_4", title: "Apache Spark for Java Developers", platform: "Udemy", type: "course", demand: "medium", free: false, duration: "10 hours", rating: 4.5, enrolled: "50K", url: "https://www.udemy.com/course/apache-spark-for-java-developers/" },
      { id: "de_5", title: "Google Cloud Data Engineering", platform: "Coursera", type: "certification", demand: "high", free: false, duration: "4 months", rating: 4.7, enrolled: "200K", url: "https://www.coursera.org/professional-certificates/gcp-data-engineering" },
      { id: "de_6", title: "dbt Fundamentals", platform: "FreeCodeCamp", type: "tutorial", demand: "medium", free: true, duration: "4 hours", rating: 4.8, enrolled: "100K", url: "https://www.youtube.com/results?search_query=dbt+fundamentals" }
    ],
    videos: [
      { id: "v_de_1", title: "Data Engineering Full Course", channel: "Edureka", duration: "8:00:00", views: "1.5M", thumb: "🗄️", url: "https://www.youtube.com/results?search_query=Data+Engineering+Full+Course" },
      { id: "v_de_2", title: "Apache Airflow Tutorial", channel: "TechWithTim", duration: "1:20:00", views: "300K", thumb: "🌬️", url: "https://www.youtube.com/results?search_query=Apache+Airflow+Tutorial" },
      { id: "v_de_3", title: "What is a Data Warehouse?", channel: "IBM Technology", duration: "0:08:15", views: "600K", thumb: "🏢", url: "https://www.youtube.com/results?search_query=What+is+a+Data+Warehouse" }
    ]
  },
  "devops-engineer": {
    id: "devops-engineer",
    title: "DevOps Engineer",
    description: "CI/CD, Docker, Kubernetes",
    icon: Server,
    roadmap: [
      { phase: "Linux & Scripting", weeks: "Weeks 1–4", skills: ["Linux Admin", "Bash Scripting", "Networking"] },
      { phase: "Containers", weeks: "Weeks 5–10", skills: ["Docker", "Docker Compose", "Container Security"] },
      { phase: "CI/CD", weeks: "Weeks 11–16", skills: ["Git / GitHub Actions", "Jenkins", "GitLab CI"] },
      { phase: "Orchestration & Cloud", weeks: "Weeks 17–24", skills: ["Kubernetes", "Terraform (IaC)", "AWS/Azure"] }
    ],
    courses: [
      { id: "do_1", title: "DevOps Beginners to Advanced", platform: "Udemy", type: "course", demand: "high", free: false, duration: "30 hours", rating: 4.7, enrolled: "250K", url: "https://www.udemy.com/course/decodingdevops/" },
      { id: "do_2", title: "Docker and Kubernetes: The Complete Guide", platform: "Udemy", type: "course", demand: "high", free: false, duration: "22 hours", rating: 4.8, enrolled: "350K", url: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/" },
      { id: "do_3", title: "DevOps Bootcamp", platform: "YouTube", type: "tutorial", demand: "high", free: true, duration: "15 hours", rating: 4.8, enrolled: "1.2M views", url: "https://www.youtube.com/results?search_query=DevOps+Bootcamp" },
      { id: "do_4", title: "AWS Certified Solutions Architect", platform: "Coursera", type: "certification", demand: "high", free: false, duration: "2 months", rating: 4.7, enrolled: "500K", url: "https://www.coursera.org/learn/aws-cloud-technical-essentials" },
      { id: "do_5", title: "Terraform for AWS", platform: "FreeCodeCamp", type: "tutorial", demand: "medium", free: true, duration: "10 hours", rating: 4.9, enrolled: "400K views", url: "https://www.youtube.com/results?search_query=Terraform+for+AWS" },
      { id: "do_6", title: "IBM DevOps and Software Engineering Professional Certificate", platform: "Coursera", type: "certification", demand: "medium", free: false, duration: "6 months", rating: 4.6, enrolled: "80K", url: "https://www.coursera.org/professional-certificates/devops-and-software-engineering" }
    ],
    videos: [
      { id: "v_do_1", title: "DevOps Tutorial for Beginners", channel: "TechWorld with Nana", duration: "2:45:00", views: "4M", thumb: "♾️", url: "https://www.youtube.com/results?search_query=DevOps+Tutorial+Nana" },
      { id: "v_do_2", title: "Kubernetes Explained in 100 Seconds", channel: "Fireship", duration: "0:02:15", views: "1.5M", thumb: "🚢", url: "https://www.youtube.com/results?search_query=Kubernetes+Explained" },
      { id: "v_do_3", title: "Jenkins Full Course", channel: "Simplilearn", duration: "5:20:00", views: "800K", thumb: "👨‍🍳", url: "https://www.youtube.com/results?search_query=Jenkins+Full+Course" }
    ]
  },
  "ml-engineer": {
    id: "ml-engineer",
    title: "ML Engineer",
    description: "Models, Pipelines, MLOps",
    icon: Cpu,
    roadmap: [
      { phase: "Python & Data", weeks: "Weeks 1–5", skills: ["Python Data Stack", "EDA", "Feature Engineering"] },
      { phase: "Core ML", weeks: "Weeks 6–12", skills: ["Regression", "Classification", "Ensembles"] },
      { phase: "Deep Learning", weeks: "Weeks 13–18", skills: ["Neural Networks", "PyTorch/TF", "CNNs/RNNs"] },
      { phase: "MLOps", weeks: "Weeks 19–24", skills: ["MLflow", "Model Serving", "Cloud ML (SageMaker)"] }
    ],
    courses: [
      { id: "ml_1", title: "Machine Learning Specialization", platform: "Coursera", type: "certification", demand: "high", free: false, duration: "2 months", rating: 4.9, enrolled: "1.8M", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
      { id: "ml_2", title: "Machine Learning Engineering for Production (MLOps)", platform: "Coursera", type: "certification", demand: "high", free: false, duration: "4 months", rating: 4.7, enrolled: "120K", url: "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops" },
      { id: "ml_3", title: "PyTorch for Deep Learning", platform: "FreeCodeCamp", type: "tutorial", demand: "high", free: true, duration: "25 hours", rating: 4.8, enrolled: "800K views", url: "https://www.youtube.com/results?search_query=PyTorch+for+Deep+Learning+FreeCodeCamp" },
      { id: "ml_4", title: "Deployment of Machine Learning Models", platform: "Udemy", type: "course", demand: "medium", free: false, duration: "10 hours", rating: 4.6, enrolled: "40K", url: "https://www.udemy.com/course/deployment-of-machine-learning-models/" },
      { id: "ml_5", title: "TensorFlow Developer Certificate in 2024", platform: "Udemy", type: "course", demand: "standard", free: false, duration: "64 hours", rating: 4.7, enrolled: "150K", url: "https://www.udemy.com/course/tensorflow-developer-certificate-machine-learning-deep-learning/" },
      { id: "ml_6", title: "MLOps Crash Course", platform: "YouTube", type: "tutorial", demand: "standard", free: true, duration: "2.5 hours", rating: 4.8, enrolled: "250K views", url: "https://www.youtube.com/results?search_query=MLOps+Crash+Course" }
    ],
    videos: [
      { id: "v_ml_1", title: "MLOps Explained", channel: "IBM Technology", duration: "0:09:30", views: "400K", thumb: "⚙️", url: "https://www.youtube.com/results?search_query=MLOps+Explained+IBM" },
      { id: "v_ml_2", title: "Deploying ML Models as APIs", channel: "TechWithTim", duration: "0:45:00", views: "200K", thumb: "🌐", url: "https://www.youtube.com/results?search_query=Deploying+ML+Models+as+APIs" },
      { id: "v_ml_3", title: "Kaggle Competitions Masterclass", channel: "Abhishek Thakur", duration: "2:00:00", views: "150K", thumb: "🏅", url: "https://www.youtube.com/results?search_query=Kaggle+Competitions+Masterclass" }
    ]
  },
  "cybersecurity": {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Security, Networks, Pentesting",
    icon: ShieldCheck,
    roadmap: [
      { phase: "IT Foundations", weeks: "Weeks 1–6", skills: ["Networking (TCP/IP)", "Linux/Windows Internals", "CompTIA A+ basics"] },
      { phase: "Security Basics", weeks: "Weeks 7–12", skills: ["Cryptography", "Network Security", "Security+ prep"] },
      { phase: "Offensive (Red)", weeks: "Weeks 13–18", skills: ["Ethical Hacking", "Metasploit", "Web Vulnerabilities"] },
      { phase: "Defensive (Blue)", weeks: "Weeks 19–24", skills: ["SIEM (Splunk)", "Incident Response", "Digital Forensics"] }
    ],
    courses: [
      { id: "cy_1", title: "Google Cybersecurity Professional Certificate", platform: "Coursera", type: "certification", demand: "high", free: false, duration: "6 months", rating: 4.8, enrolled: "400K", url: "https://www.coursera.org/professional-certificates/google-cybersecurity" },
      { id: "cy_2", title: "CompTIA Security+ (SY0-701) Complete Course", platform: "Udemy", type: "course", demand: "high", free: false, duration: "21 hours", rating: 4.7, enrolled: "250K", url: "https://www.udemy.com/course/securityplus/" },
      { id: "cy_3", title: "Ethical Hacking Full Course", platform: "FreeCodeCamp", type: "tutorial", demand: "high", free: true, duration: "15 hours", rating: 4.8, enrolled: "5M views", url: "https://www.youtube.com/results?search_query=Ethical+Hacking+FreeCodeCamp" },
      { id: "cy_4", title: "IBM Cybersecurity Analyst Professional Certificate", platform: "Coursera", type: "certification", demand: "medium", free: false, duration: "8 months", rating: 4.6, enrolled: "300K", url: "https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst" },
      { id: "cy_5", title: "Cyber Security Full Course for Beginner", platform: "YouTube", type: "tutorial", demand: "standard", free: true, duration: "8 hours", rating: 4.7, enrolled: "2M views", url: "https://www.youtube.com/results?search_query=Cyber+Security+Full+Course+Beginner" },
      { id: "cy_6", title: "Practical Ethical Hacking", platform: "TCM Security", type: "course", demand: "high", free: false, duration: "25 hours", rating: 4.9, enrolled: "100K", url: "https://academy.tcm-sec.com/p/practical-ethical-hacking-the-complete-course" }
    ],
    videos: [
      { id: "v_cy_1", title: "How to become a Hacker", channel: "NetworkChuck", duration: "0:15:30", views: "3M", thumb: "💻", url: "https://www.youtube.com/results?search_query=How+to+become+a+Hacker+NetworkChuck" },
      { id: "v_cy_2", title: "Nmap Tutorial for Beginners", channel: "HackerSploit", duration: "0:45:00", views: "800K", thumb: "🔍", url: "https://www.youtube.com/results?search_query=Nmap+Tutorial" },
      { id: "v_cy_3", title: "What is SOC? (Security Operations Center)", channel: "IBM Technology", duration: "0:07:20", views: "500K", thumb: "🛡️", url: "https://www.youtube.com/results?search_query=What+is+SOC+IBM" }
    ]
  },
  "cloud-engineer": {
    id: "cloud-engineer",
    title: "Cloud Engineer",
    description: "AWS, Azure, Cloud Architecture",
    icon: Cloud,
    roadmap: [
      { phase: "Cloud Basics", weeks: "Weeks 1–4", skills: ["Cloud Computing Concepts", "Virtualization", "Linux basics"] },
      { phase: "AWS / Azure Core", weeks: "Weeks 5–12", skills: ["Compute (EC2/VMs)", "Storage (S3/Blob)", "Networking (VPC)"] },
      { phase: "Security & Scaling", weeks: "Weeks 13–18", skills: ["IAM", "Load Balancing", "Auto-scaling"] },
      { phase: "Infrastructure as Code", weeks: "Weeks 19–24", skills: ["Terraform", "CloudFormation", "Serverless"] }
    ],
    courses: [
      { id: "ce_1", title: "Ultimate AWS Certified Solutions Architect Associate", platform: "Udemy", type: "course", demand: "high", free: false, duration: "27 hours", rating: 4.7, enrolled: "800K", url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/" },
      { id: "ce_2", title: "Microsoft Azure Fundamentals AZ-900", platform: "FreeCodeCamp", type: "tutorial", demand: "high", free: true, duration: "8 hours", rating: 4.8, enrolled: "1.5M views", url: "https://www.youtube.com/results?search_query=AZ-900+FreeCodeCamp" },
      { id: "ce_3", title: "Google Cloud Digital Leader", platform: "Coursera", type: "certification", demand: "medium", free: false, duration: "1 month", rating: 4.7, enrolled: "100K", url: "https://www.coursera.org/professional-certificates/google-cloud-digital-leader" },
      { id: "ce_4", title: "AWS Cloud Practitioner Certification Course", platform: "YouTube", type: "tutorial", demand: "high", free: true, duration: "14 hours", rating: 4.9, enrolled: "4M views", url: "https://www.youtube.com/results?search_query=AWS+Cloud+Practitioner" },
      { id: "ce_5", title: "Terraform Bootcamp", platform: "Udemy", type: "course", demand: "medium", free: false, duration: "12 hours", rating: 4.6, enrolled: "50K", url: "https://www.udemy.com/course/terraform-beginner-to-advanced/" },
      { id: "ce_6", title: "Cloud Architecture Foundations", platform: "edX", type: "course", demand: "standard", free: false, duration: "6 weeks", rating: 4.5, enrolled: "80K", url: "https://www.edx.org/course/cloud-architecture-foundations" }
    ],
    videos: [
      { id: "v_ce_1", title: "AWS vs Azure vs GCP", channel: "Simplilearn", duration: "0:25:00", views: "1.2M", thumb: "☁️", url: "https://www.youtube.com/results?search_query=AWS+vs+Azure+vs+GCP" },
      { id: "v_ce_2", title: "What is Serverless?", channel: "Fireship", duration: "0:03:15", views: "1M", thumb: "⚡", url: "https://www.youtube.com/results?search_query=Serverless+Explained+Fireship" },
      { id: "v_ce_3", title: "AWS EC2 Tutorial", channel: "TechWithTim", duration: "0:30:00", views: "400K", thumb: "🖥️", url: "https://www.youtube.com/results?search_query=AWS+EC2+Tutorial" }
    ]
  },
  "mobile-developer": {
    id: "mobile-developer",
    title: "Mobile Developer",
    description: "React Native, Flutter, Swift",
    icon: Smartphone,
    roadmap: [
      { phase: "Programming Basics", weeks: "Weeks 1–4", skills: ["JavaScript / Dart / Swift", "OOP Concepts", "UI Basics"] },
      { phase: "Framework Core", weeks: "Weeks 5–10", skills: ["React Native / Flutter", "Components/Widgets", "State Management"] },
      { phase: "Device Features", weeks: "Weeks 11–16", skills: ["Camera & Location", "Local Storage", "Push Notifications"] },
      { phase: "Publishing", weeks: "Weeks 17–20", skills: ["App Store Connect", "Google Play Console", "App Optimization"] }
    ],
    courses: [
      { id: "md_1", title: "Meta React Native Professional Certificate", platform: "Coursera", type: "certification", demand: "high", free: false, duration: "6 months", rating: 4.7, enrolled: "200K", url: "https://www.coursera.org/professional-certificates/meta-react-native" },
      { id: "md_2", title: "The Complete Flutter Development Bootcamp", platform: "Udemy", type: "course", demand: "high", free: false, duration: "29 hours", rating: 4.6, enrolled: "300K", url: "https://www.udemy.com/course/flutter-bootcamp-with-dart/" },
      { id: "md_3", title: "React Native Tutorial for Beginners", platform: "YouTube", type: "tutorial", demand: "standard", free: true, duration: "4 hours", rating: 4.8, enrolled: "1.5M views", url: "https://www.youtube.com/results?search_query=React+Native+Tutorial" },
      { id: "md_4", title: "iOS & Swift - The Complete iOS App Development Bootcamp", platform: "Udemy", type: "course", demand: "high", free: false, duration: "60 hours", rating: 4.8, enrolled: "400K", url: "https://www.udemy.com/course/ios-13-app-development-bootcamp/" },
      { id: "md_5", title: "Flutter Crash Course", platform: "FreeCodeCamp", type: "tutorial", demand: "medium", free: true, duration: "8 hours", rating: 4.9, enrolled: "1.2M views", url: "https://www.youtube.com/results?search_query=Flutter+FreeCodeCamp" },
      { id: "md_6", title: "Android App Development Specialization", platform: "Coursera", type: "certification", demand: "medium", free: false, duration: "5 months", rating: 4.6, enrolled: "150K", url: "https://www.coursera.org/specializations/android-app-development" }
    ],
    videos: [
      { id: "v_md_1", title: "React Native vs Flutter", channel: "Fireship", duration: "0:06:20", views: "2M", thumb: "📱", url: "https://www.youtube.com/results?search_query=React+Native+vs+Flutter+Fireship" },
      { id: "v_md_2", title: "Build your first iOS App", channel: "CodeWithChris", duration: "2:00:00", views: "1.5M", thumb: "🍏", url: "https://www.youtube.com/results?search_query=Build+iOS+App+CodeWithChris" },
      { id: "v_md_3", title: "Publishing to Google Play Store", channel: "Traversy Media", duration: "0:45:00", views: "300K", thumb: "🚀", url: "https://www.youtube.com/results?search_query=Publishing+Google+Play" }
    ]
  }
};
