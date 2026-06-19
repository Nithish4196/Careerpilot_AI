import { Puzzle, Users, Code, Cpu, UserCheck } from 'lucide-react';
import React from 'react';

export type AppState ="landing" |"setup" |"session" |"report";
export type SetupStep = 1 | 2 | 3;
export type SessionType ="quick" |"custom";
export type RoundType ="Aptitude" |"Group Discussion" |"Coding" |"Technical" |"HR";

export interface InterviewConfig {
  name: string;
  role: string;
  company?: string;
  level: string;
  difficulty:"Easy" |"Medium" |"Hard";
  rounds: RoundType[];
  duration?: string; // used for quick start
  sessionType?: SessionType;
}

export interface RoundResult {
  type: RoundType;
  score: number;
  feedback: string[];
}

export const ROUND_ICONS: Record<RoundType, React.ElementType> = {"Aptitude": Puzzle,"Group Discussion": Users,"Coding": Code,"Technical": Cpu,"HR": UserCheck
};

export const ROUND_DESCRIPTIONS: Record<RoundType, string> = {"Aptitude":"Logical reasoning, quantitative, verbal ability","Group Discussion":"AI simulates other candidates, topic-based discussion","Coding":"Live code editor, DSA problems","Technical":"Core technical questions for your role","HR":"Behavioral, situational, culture fit questions"
};

// STATIC DATA BANKS
export const APTITUDE_QUESTIONS = [
  { q:"Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?", options: ["(1/3)","(1/8)","(2/8)","(1/16)"], answer:"(1/8)" },
  { q:"Odometer is to mileage as compass is to:", options: ["speed","hiking","needle","direction"], answer:"direction" },
  { q:"A store pays $100 for a bicycle. The markup is 20%. What is the selling price?", options: ["$120","$80","$100","$110"], answer:"$120" },
  { q:"If 5 machines can make 5 widgets in 5 minutes, how long does it take 100 machines to make 100 widgets?", options: ["5 minutes","100 minutes","50 minutes","10 minutes"], answer:"5 minutes" },
  { q:"Choose the word that is mostly nearly opposite to 'Expand'.", options: ["Enlarge","Condense","Prolong","Vast"], answer:"Condense" },
  { q:"In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written?", options: ["EOJDJEFM","MFEDJJOE","MFEJDJOE","EOJDEJFM"], answer:"EOJDJEFM" },
  { q:"Find the odd one out.", options: ["Apple","Banana","Carrot","Mango"], answer:"Carrot" },
  { q:"What is 15% of 200?", options: ["20","30","40","15"], answer:"30" },
  { q:"A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?", options: ["120 metres","180 metres","324 metres","150 metres"], answer:"150 metres" },
  { q:"Identify the correctly spelled word.", options: ["Accomodate","Acommodate","Accommodate","Acomodate"], answer:"Accommodate" },
];

export const HR_QUESTIONS = ["Tell me about yourself.","Why do you want to join this company?","What is your greatest strength?","What is your greatest weakness?","Where do you see yourself in 5 years?","Describe a challenging situation you handled.","Why are you leaving your current role?","What motivates you at work?","How do you handle pressure and tight deadlines?","Do you have any questions for us?"
];

export const TECH_FRONTEND = ["Explain the virtual DOM and how React uses it.","What is the difference between useEffect and useLayoutEffect?","How does CSS specificity work?","What are closures in JavaScript?","Explain the event loop in JavaScript.","What is SSR and when would you use Next.js?"
];

export const TECH_DATA = ["What is the difference between WHERE and HAVING?","Explain window functions with an example.","What is a star schema vs snowflake schema?","How do you handle missing values in a dataset?","What is the difference between INNER JOIN and LEFT JOIN?","Explain what an index is and when you'd use one."
];

export const TECH_BACKEND = ["What is the difference between a list and a tuple?","Explain how decorators work in Python.","What is the GIL in Python?","How does async/await work?","What is REST vs GraphQL?","Explain database transactions and ACID properties."
];

export const TECH_DEFAULT = ["Explain the concept of OOP with a real-world example.","What is time complexity? Give examples of O(n) and O(n²).","What is the difference between stack and heap memory?","Explain what an API is and how HTTP works.","What is the difference between SQL and NoSQL?","How would you design a URL shortener system?"
];

export const CODING_PROBLEMS = {"Easy": {
    title:"Two Sum",
    desc:"Given an array of integers and a target, return indices of two numbers that add up to the target.",
    examples:"Input: nums = [2, 7, 11, 15], target = 9 → Output: [0, 1]",
    hints: ["Try using a hash map to store previously seen values.","You can do this in O(n) time complexity."]
  },"Medium": {
    title:"Longest Substring Without Repeating Characters",
    desc:"Find the length of the longest substring without repeating characters.",
    examples:"Input: 'abcabcbb' → Output: 3",
    hints: ["Use a sliding window approach with two pointers.","Store the last seen index of each character in a hash map."]
  },"Hard": {
    title:"LRU Cache",
    desc:"Implement an LRU (Least Recently Used) cache with get and put operations in O(1) time.",
    examples:"Input: put(1,1), put(2,2), get(1) → Output: 1",
    hints: ["You need a combination of a Hash Map and a Doubly Linked List.","The hash map provides O(1) access, the linked list provides O(1) removals."]
  }
};

export const GD_TOPICS = ["Is remote work more productive than office work?","Should AI replace human jobs?","Social media does more harm than good.","Is college education still relevant in 2025?"
];
