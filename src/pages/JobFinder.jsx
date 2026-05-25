import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, MapPin } from 'lucide-react';
import JobCard from '../components/JobFinder/JobCard';

export default function JobFinder() {
  const [searchTerm, setSearchTerm] = useState('Frontend Developer');
  const [searchLocation, setSearchLocation] = useState('India');

  const [inputRole, setInputRole] = useState('Frontend Developer');
  const [inputLocation, setInputLocation] = useState('India');

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs(searchTerm, searchLocation);
  }, [searchTerm, searchLocation]);



  const fetchJobs = async (role, location) => {
    if (!role) return;

    setIsLoading(true);
    setError(null);

    try {
      const encodedQuery = encodeURIComponent(role);
      const encodedLoc = encodeURIComponent(location || 'Worldwide');
      
      const response = await fetch(`http://localhost:3001/api/jobs/search?role=${encodedQuery}&location=${encodedLoc}`);
      
      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`);
      }

      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (err) {
      console.error("Error fetching jobs from backend:", err);
      setError("Unable to connect to the backend job aggregator at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputRole.trim()) {
      setSearchTerm(inputRole.trim());
      setSearchLocation(inputLocation.trim());
    }
  };

  return (
    <div className="page-container animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div>
        <h1 className="page-title">Multi-Platform Job Finder</h1>
        <p className="page-subtitle">Discover real remote jobs sourced directly from across the web.</p>
      </div>

      <form className="search-container" onSubmit={handleSearch}>
        <div className="search-input-wrapper" style={{ flex: 2 }}>
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Role: Software Engineer, Data Scientist..."
            value={inputRole}
            onChange={(e) => setInputRole(e.target.value)}
          />
        </div>
        <div className="search-input-wrapper" style={{ flex: 1 }}>
          <MapPin className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Location: India, Worldwide..."
            value={inputLocation}
            onChange={(e) => setInputLocation(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ padding: '0 2rem', whiteSpace: 'nowrap' }}>
          Search Roles
        </button>
      </form>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '2rem' }}>
        {isLoading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Scouring the web for <strong>{searchTerm}</strong> roles available in <strong>{searchLocation || 'Worldwide'}</strong>...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--error-color)', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <AlertCircle size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.8 }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Oops! Something went wrong</h3>
            <p>{error}</p>
          </div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <Search size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No jobs found</h3>
            <p>We couldn't find any roles matching "{searchTerm}" for "{searchLocation || 'Worldwide'}". Try different keywords or broader locations.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
              Found {jobs.length} opportunities for "{searchTerm}" (Available in {searchLocation || 'Worldwide'})
            </div>
            <div className="job-grid">
              {jobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
