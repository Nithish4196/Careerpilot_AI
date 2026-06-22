import React from 'react';

const filters = {
  freshness: ["Any Time", "Posted Today", "Last 7 Days", "Last 30 Days"],
  experience: ["Fresher (0 Years)","0-2 Years","2-5 Years","5+ Years"],
  salary: ["₹3 LPA+","₹5 LPA+","₹8 LPA+","₹10 LPA+","₹15 LPA+","₹20 LPA+"],
  jobType: ["Remote","Hybrid","Onsite"],
  location: ["Anywhere in India","Chennai","Bangalore","Hyderabad","Pune","Mumbai","Delhi NCR","Coimbatore","Kolkata"],
};

interface JobSidebarFiltersProps {
  activeFilters: Record<string, string[]>;
  onFilterChange: (category: string, item: string, isChecked: boolean) => void;
  onClearAll: () => void;
}

export default function JobSidebarFilters({ activeFilters, onFilterChange, onClearAll }: JobSidebarFiltersProps) {
  return (
    <div className="w-64 shrink-0 bg-white border border-gray-200 shadow-sm rounded-2xl p-6 h-fit hidden lg:block space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg text-black">Filters</h2>
        <button 
          onClick={onClearAll}
          className="text-xs text-gray-500 hover:text-blue-600 font-medium underline transition-colors"
        >
          Clear All
        </button>
      </div>

      <FilterSection title="Date Posted" category="freshness" items={filters.freshness} activeFilters={activeFilters} onChange={onFilterChange} />
      <FilterSection title="Location" category="location" items={filters.location} activeFilters={activeFilters} onChange={onFilterChange} />
      <FilterSection title="Experience" category="experience" items={filters.experience} activeFilters={activeFilters} onChange={onFilterChange} />
      <FilterSection title="Salary Range" category="salary" items={filters.salary} activeFilters={activeFilters} onChange={onFilterChange} />
      <FilterSection title="Work Type" category="jobType" items={filters.jobType} activeFilters={activeFilters} onChange={onFilterChange} />
    </div>
  );
}

function FilterSection({ title, category, items, activeFilters, onChange }: { title: string, category: string, items: string[], activeFilters: Record<string, string[]>, onChange: (cat: string, item: string, checked: boolean) => void }) {
  const currentSelections = activeFilters[category] || [];
  
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-black">{title}</h3>
      <div className="space-y-2">
        {items.map((item, idx) => {
          const isChecked = currentSelections.includes(item);
          return (
            <label key={idx} className="flex items-center gap-3 group cursor-pointer">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white group-hover:border-blue-400'}`}>
                <input 
                  type="checkbox" 
                  checked={isChecked}
                  className="opacity-0 absolute w-0 h-0" 
                  onChange={(e) => onChange(category, item, e.target.checked)}
                />
                <svg className={`w-3 h-3 text-white ${isChecked ? 'block' : 'hidden'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className={`text-sm transition-colors ${isChecked ? 'text-black font-semibold' : 'text-gray-600 group-hover:text-black'}`}>{item}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
