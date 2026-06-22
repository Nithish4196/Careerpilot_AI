import React from 'react';
import { Search, MapPin, Briefcase, IndianRupee } from 'lucide-react';

const chips = ["Freshers Hiring Now","High Package Jobs","Quick Hiring Jobs","Remote Jobs","Internship Opportunities","Top MNC Hiring","Startup Hiring","AI Recommended"
];
interface JobSearchQuery {
  role: string;
  location: string;
  experience: string;
  salary: string;
}

interface JobSearchHeaderProps {
  onSearch: (q: JobSearchQuery) => void;
  onChipSelect: (chip: string) => void;
}

export default function JobSearchHeader({ onSearch, onChipSelect }: JobSearchHeaderProps) {
  const [role, setRole] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const [salary, setSalary] = React.useState("");

  const handleSearch = () => {
    onSearch({ role, location, experience, salary });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm flex flex-col md:flex-row items-center gap-2">
        <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200 w-full">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input 
            type="text" 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for roles (Data Analyst, Software Engineer...)"
            className="w-full bg-transparent border-none outline-none text-sm text-black focus:ring-0 placeholder:text-gray-400"
          />
        </div>
        <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200 w-full">
          <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Location (e.g. Bangalore, Remote)"
            className="w-full bg-transparent border-none outline-none text-sm text-black focus:ring-0 placeholder:text-gray-400"
          />
        </div>
        <div className="w-full md:w-auto flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
          <Briefcase className="w-5 h-5 text-gray-400 shrink-0" />
          <select 
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="bg-transparent border-none outline-none text-sm cursor-pointer text-gray-600 focus:ring-0 w-full md:w-32"
          >
            <option value="">Experience</option>
            <option value="Fresher">Fresher</option>
            <option value="1-3 Years">1-3 Years</option>
            <option value="3-5 Years">3-5 Years</option>
            <option value="5+ Years">5+ Years</option>
          </select>
        </div>
        <div className="w-full md:w-auto flex items-center gap-3 px-4 py-2">
          <IndianRupee className="w-5 h-5 text-gray-400 shrink-0" />
          <select 
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="bg-transparent border-none outline-none text-sm cursor-pointer text-gray-600 focus:ring-0 w-full md:w-32"
          >
            <option value="">Salary</option>
            <option value="3">₹3 LPA+</option>
            <option value="5">₹5 LPA+</option>
            <option value="10">₹10 LPA+</option>
            <option value="20">₹20 LPA+</option>
          </select>
        </div>
        <button 
          onClick={handleSearch}
          className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors duration-150 ease-out shrink-0 mt-2 md:mt-0"
        >
          Find Jobs
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {chips.map((chip, idx) => (
          <button 
            key={idx}
            onClick={() => onChipSelect(chip)}
            className="whitespace-nowrap px-4 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
