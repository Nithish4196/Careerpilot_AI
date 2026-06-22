"use client";

import React, { useState, useEffect } from 'react';
import JobSearchHeader from '@/components/jobs/JobSearchHeader';
import JobSidebarFilters from '@/components/jobs/JobSidebarFilters';
import JobCard from '@/components/jobs/JobCard';
import JobDetailsPanel from '@/components/jobs/JobDetailsPanel';
import ApplicationTrackerView from '@/components/jobs/ApplicationTrackerView';
import AIRecommendations from '@/components/jobs/AIRecommendations';
import { Job } from '@/types/job';
import { Sparkles, Loader2, AlertCircle, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp, collection, getDocs } from 'firebase/firestore';
import { logActivity } from '@/lib/activity';

export default function JobsPage() {
  const { user, userProfile } = useAuth();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState<'search' | 'tracker'>('search');
  
  // Real API State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  // Unified Search State
  const [searchParams, setSearchParams] = useState({
    query: "",
    location: "",
    experience: [] as string[],
    salaryMin: 0,
    jobType: [] as string[],
    locationType: [] as string[],
    sourcePlatforms: [] as string[],
    freshness: "all",
    page: 1,
    quickFilter: ""
  });

  // Sidebar specific active state (for checkboxes UI)
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!user) return;
    const fetchApplied = async () => {
      const q = collection(db, `users/${user.uid}/appliedJobs`);
      const snap = await getDocs(q);
      const appliedIds = snap.docs.map(d => d.id);
      setAppliedJobs(appliedIds);
    };
    fetchApplied();
  }, [user]);

  // The debounced fetch effect
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const payload = {
          ...searchParams,
          userTargetRole: userProfile?.targetRole || "",
          userSkills: userProfile?.skills || [],
          userExperience: userProfile?.experience || "Fresher"
        };

        const res = await fetch("/api/jobs/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch jobs");
        }

        if (searchParams.page === 1) {
          setJobs(data.jobs);
        } else {
          setJobs(prev => [...prev, ...data.jobs]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchJobs, 500);
    return () => clearTimeout(timeoutId);
  }, [searchParams]);


  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]);
  };

  const handleApply = async (job: Job) => {
    if (!user) return;
    try {
      const docRef = doc(db, `users/${user.uid}/appliedJobs`, job.id);
      await setDoc(docRef, {
        jobId: job.id,
        title: job.role,
        company: job.companyName,
        appliedAt: serverTimestamp(),
        status: 'Applied'
      });
      logActivity(user.uid, "jobsApplied");
      setAppliedJobs(prev => [...prev, job.id]);
    } catch (err) {
      console.error("Failed to apply", err);
    }
  };

  const handleSearch = (q: any) => {
    if (typeof q === 'string') {
      // Chip click
      let exp = activeFilters.experience || [];
      let salMin = searchParams.salaryMin;
      
      if (q === "Freshers Hiring Now") exp = ["Fresher (0 Years)"];
      if (q === "High Package Jobs") salMin = 1500000;

      setActiveFilters(prev => ({ ...prev, experience: exp }));

      setSearchParams(prev => ({ 
        ...prev, 
        quickFilter: q, 
        experience: exp,
        salaryMin: salMin,
        page: 1 
      }));
    } else {
      // Header search
      const salMin = q.salary ? parseInt(q.salary) * 100000 : 0;
      setSearchParams(prev => ({ 
        ...prev, 
        query: q.role, 
        location: q.location, 
        experience: q.experience ? [q.experience] : prev.experience,
        salaryMin: salMin,
        page: 1,
        quickFilter: ""
      }));
    }
  };

  const handleFilterChange = (category: string, item: string, isChecked: boolean) => {
    setActiveFilters(prev => {
      const current = prev[category] || [];
      const updated = isChecked ? [...current, item] : current.filter(i => i !== item);
      
      const newActive = { ...prev, [category]: updated };
      
      // Map UI filters to API params
      let minSal = 0;
      if (newActive.salary && newActive.salary.length > 0) {
        const vals = newActive.salary.map(s => parseInt(s.replace(/[^0-9]/g, '')) * 100000);
        minSal = Math.min(...vals);
      }

      const employmentTypes = ["Full-Time", "Internship", "Contract", "Part-Time"];
      const locTypes = ["Remote", "Hybrid", "Onsite"];
      
      const selectedJobTypes = newActive.jobType || [];
      const filterJobType = selectedJobTypes.filter(t => employmentTypes.includes(t));
      const filterLocationType = selectedJobTypes.filter(t => locTypes.includes(t));

      setSearchParams({
        ...searchParams,
        experience: newActive.experience || [],
        jobType: filterJobType,
        locationType: filterLocationType,
        sourcePlatforms: newActive.source || [],
        freshness: (newActive.freshness && newActive.freshness.length > 0) ? newActive.freshness[0] : "all",
        location: (newActive.location && newActive.location.length > 0) ? newActive.location[0] : searchParams.location,
        salaryMin: minSal,
        page: 1
      });

      return newActive;
    });
  };

  const handleClearAll = () => {
    setActiveFilters({});
    setSearchParams({
      query: "",
      location: "",
      experience: [],
      salaryMin: 0,
      jobType: [],
      locationType: [],
      sourcePlatforms: [],
      freshness: "all",
      page: 1,
      quickFilter: ""
    });
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* Page Tabs */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-200">
        <h1 className="text-3xl font-extrabold tracking-tight mb-4 text-black">Find Your Next Opportunity</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'search' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
            Search Jobs
          </button>
          <button 
            onClick={() => setActiveTab('tracker')}
            className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'tracker' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
            Application Tracker
          </button>
        </div>
      </div>

      {activeTab === 'tracker' ? (
        <ApplicationTrackerView />
      ) : (
        <>
          {/* Header & Search */}
          <div>
            <JobSearchHeader 
              onSearch={handleSearch} 
              onChipSelect={(chip) => handleSearch(chip)} 
            />
          </div>

          {/* Main Layout - 3 Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sidebar */}
            <div className="lg:col-span-3">
              <JobSidebarFilters 
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange} 
                onClearAll={handleClearAll}
              />
            </div>

            {/* Right Job Feed (Center) */}
            <div className="lg:col-span-6 space-y-4 w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg text-black">
                  {loading && searchParams.page === 1 ? "Searching..." : `Found ${jobs.length} Jobs`}
                </h2>
                <select className="bg-transparent text-sm font-medium border-none outline-none cursor-pointer focus:ring-0 text-gray-700">
                  <option>Sort by: Best Match</option>
                  <option>Sort by: Most Recent</option>
                  <option>Sort by: Salary (High to Low)</option>
                </select>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-6 text-center space-y-4">
                  <AlertCircle className="w-8 h-8 mx-auto" />
                  <p className="font-medium">{error}</p>
                  <button 
                    onClick={() => setSearchParams({ ...searchParams })} 
                    className="bg-red-500 text-white px-6 py-2 rounded-lg text-sm font-bold"
                  >
                    Retry
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {jobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    isSaved={savedJobs.includes(job.id)}
                    onToggleSave={() => toggleSaveJob(job.id)}
                    onClick={(job) => setSelectedJob(job)} 
                    isApplied={appliedJobs.includes(job.id)}
                  />
                ))}

                {loading && (
                  <div className="space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="bg-gray-100 animate-pulse h-40 rounded-xl border border-gray-200" />
                    ))}
                  </div>
                )}

                {!loading && !error && jobs.length === 0 && (
                  <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200 border-dashed text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-20 text-black" />
                    <p className="font-medium text-lg text-black">No jobs found matching your filters.</p>
                    <p className="text-sm mt-1">Try broadening your search or removing some filters.</p>
                    <button 
                      onClick={handleClearAll}
                      className="mt-6 text-blue-600 hover:underline text-sm font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>

              {/* Load More */}
              {!loading && !error && jobs.length > 0 && (
                <button 
                  onClick={() => setSearchParams(prev => ({ ...prev, page: prev.page + 1 }))}
                  className="w-full py-4 text-sm font-bold border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors duration-150 ease-out hover:text-black mt-8 flex justify-center items-center gap-2"
                >
                  Load More Opportunities
                </button>
              )}
            </div>

            {/* Right Sidebar - AI Insights */}
            <div className="lg:col-span-3">
              <AIRecommendations 
                onSuggestJobs={(skills, role) => {
                  setSearchParams(prev => ({
                    ...prev,
                    query: role,
                    page: 1
                  }));
                }} 
                jobsCount={jobs.length} 
              />
            </div>
          </div>

          <JobDetailsPanel 
            job={selectedJob} 
            isSaved={selectedJob ? savedJobs.includes(selectedJob.id) : false}
            onToggleSave={() => selectedJob && toggleSaveJob(selectedJob.id)}
            onClose={() => setSelectedJob(null)} 
            onApply={() => selectedJob && handleApply(selectedJob)}
            isApplied={selectedJob ? appliedJobs.includes(selectedJob.id) : false}
          />
        </>
      )}

    </div>
  );
}
