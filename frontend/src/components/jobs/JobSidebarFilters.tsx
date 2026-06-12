import React from 'react';

const filters = {
  experience: ["Fresher (0 Years)", "0-2 Years", "2-5 Years", "5+ Years"],
  salary: ["₹3 LPA+", "₹5 LPA+", "₹8 LPA+", "₹10 LPA+", "₹15 LPA+", "₹20 LPA+"],
  jobType: ["Full-Time", "Internship", "Contract", "Remote", "Hybrid", "Onsite"],
  location: ["Anywhere in India", "Chennai", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Delhi NCR", "Coimbatore", "Kolkata"],
  source: ["LinkedIn", "Naukri", "Foundit", "Unstop", "Indeed", "Glassdoor", "Google Jobs", "Bing Jobs"]
};

interface JobSidebarFiltersProps {
  activeFilters: Record<string, string[]>;
  onFilterChange: (category: string, item: string, isChecked: boolean) => void;
  onClearAll: () => void;
}

export default function JobSidebarFilters({ activeFilters, onFilterChange, onClearAll }: JobSidebarFiltersProps) {
  return (
    <div className="w-64 shrink-0 bg-background border border-muted rounded-2xl p-6 h-fit hidden lg:block space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">Filters</h2>
        <button 
          onClick={onClearAll}
          className="text-xs text-muted-foreground hover:text-foreground underline"
        >
          Clear All
        </button>
      </div>

      <FilterSection title="Experience" category="experience" items={filters.experience} activeFilters={activeFilters} onChange={onFilterChange} />
      <FilterSection title="Salary Range (INR)" category="salary" items={filters.salary} activeFilters={activeFilters} onChange={onFilterChange} />
      <FilterSection title="Job Type" category="jobType" items={filters.jobType} activeFilters={activeFilters} onChange={onFilterChange} />
      <FilterSection title="Location" category="location" items={filters.location} activeFilters={activeFilters} onChange={onFilterChange} />
      <FilterSection title="Source Platform" category="source" items={filters.source} activeFilters={activeFilters} onChange={onFilterChange} />
    </div>
  );
}

function FilterSection({ title, category, items, activeFilters, onChange }: { title: string, category: string, items: string[], activeFilters: Record<string, string[]>, onChange: (cat: string, item: string, checked: boolean) => void }) {
  const currentSelections = activeFilters[category] || [];
  
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">{title}</h3>
      <div className="space-y-2">
        {items.map((item, idx) => {
          const isChecked = currentSelections.includes(item);
          return (
            <label key={idx} className="flex items-center gap-3 group cursor-pointer">
              <div className="w-4 h-4 rounded border border-muted-foreground group-hover:border-foreground flex items-center justify-center transition-colors">
                <input 
                  type="checkbox" 
                  checked={isChecked}
                  className="opacity-0 absolute w-0 h-0" 
                  onChange={(e) => onChange(category, item, e.target.checked)}
                />
                <div className={`w-2 h-2 rounded-sm bg-foreground ${isChecked ? 'block' : 'hidden'} group-has-[:checked]:block`} />
              </div>
              <span className={`text-sm transition-colors ${isChecked ? 'text-foreground font-semibold' : 'text-muted-foreground group-hover:text-foreground'}`}>{item}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
