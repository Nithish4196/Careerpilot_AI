import React from 'react';
import { Building2, MapPin, DollarSign, ExternalLink, CalendarDays, Briefcase } from 'lucide-react';

export default function JobCard({ job }) {
  // Format the publication date
  const date = new Date(job.publication_date);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Strip HTML tags from description for excerpt
  const stripHtml = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const excerpt = stripHtml(job.description);

  return (
    <div className="job-card animate-fade-in">
      <div className="job-card-header">
        <div className="company-logo-wrapper">
          {job.company_logo ? (
            <img src={job.company_logo} alt={`${job.company_name} logo`} className="company-logo" />
          ) : (
            <Building2 size={24} color="var(--text-muted)" />
          )}
        </div>
        <div className="job-header-info" style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 className="job-title" title={job.title} style={{ margin: 0, paddingRight: '1rem' }}>{job.title}</h3>
            {job.matchScore && (
              <div 
                className="ai-match-badge" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  backgroundColor: job.matchScore >= 80 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                  color: job.matchScore >= 80 ? 'var(--success-color)' : 'var(--primary-color)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  border: `1px solid ${job.matchScore >= 80 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`,
                  whiteSpace: 'nowrap'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'currentColor' }} />
                {job.matchScore}% AI Match
              </div>
            )}
          </div>
          <div className="company-name">{job.company_name}</div>
        </div>
      </div>

      <div className="job-tags">
        <span className="job-tag">
          <Briefcase size={14} />
          {job.job_type ? job.job_type.replace(/_/g, ' ') : 'Full Time'}
        </span>
        <span className="job-tag">
          <MapPin size={14} />
          {job.candidate_required_location || 'Remote'}
        </span>
        {job.salary && (
          <span className="job-tag" style={{ color: 'var(--success-color)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <DollarSign size={14} />
            {job.salary}
          </span>
        )}
      </div>

      <p className="job-description-excerpt">
        {excerpt}
      </p>

      <div className="job-footer">
        <div className="job-date">
          <CalendarDays size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
          {formattedDate}
        </div>
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="apply-btn"
        >
          Apply Now <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
