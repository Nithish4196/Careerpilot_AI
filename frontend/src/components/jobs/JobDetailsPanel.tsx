import React from 'react';
import { Job } from '@/types/job';
import { X, ExternalLink, CheckCircle2, Building2, MapPin, Briefcase, IndianRupee } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { logActivity } from '@/lib/activity';

interface JobDetailsPanelProps {
  job: Job | null;
  isSaved?: boolean;
  isApplied?: boolean;
  onToggleSave?: () => void;
  onApply?: () => void;
  onClose: () => void;
}

export default function JobDetailsPanel({ job, isSaved = false, isApplied = false, onToggleSave, onApply, onClose }: JobDetailsPanelProps) {
  const { user } = useAuth();
  
  if (!job) return null;

  const handleApplyClick = () => {
    if (user) {
      logActivity(user.uid, "jobsApplied");
    }
    if (onApply) onApply();
  };

  const handleSaveClick = () => {
    if (user && !isSaved) {
      logActivity(user.uid, "jobsApplied");
    }
    if (onToggleSave) onToggleSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white border-l border-gray-200 h-full overflow-y-auto shadow-2xl">
        
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-gray-200 p-6 z-10 flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200">
              {job.companyLogo ? (
                <img src={job.companyLogo} alt={job.companyName} className="w-10 h-10 object-contain" />
              ) : (
                <Building2 className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-extrabold mb-1 text-black">{job.role}</h2>
              <p className="text-gray-600 font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4" /> {job.companyName}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 transition-colors duration-150 ease-out rounded-full text-gray-500 hover:text-black">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <IndianRupee className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Salary</p>
              <p className="font-bold text-sm text-black">{job.salaryMin ? `₹${job.salaryMin}L - ₹${job.salaryMax}L` : 'Not Disclosed'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <Briefcase className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Experience</p>
              <p className="font-bold text-sm text-black">{job.experienceLevel || "Not Specified"}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <MapPin className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</p>
              <p className="font-bold text-sm text-black truncate" title={job.location}>{job.location}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <Building2 className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Work Type</p>
              <p className="font-bold text-sm text-black">{job.workMode}</p>
            </div>
          </div>

          {/* Job Description */}
          <section>
            <h3 className="text-xl font-bold mb-4 text-black">Job Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
              {job.description || "No description provided."}
            </p>

            {job.skillsRequired && job.skillsRequired.length > 0 && (
              <div className="mb-6">
                <h4 className="font-bold mb-3 text-black">Skills Required</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skillsRequired.map((skill, idx) => (
                    <span key={idx} className="text-xs font-bold px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-gray-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {job.responsibilities && job.responsibilities.length > 0 && (
              <>
                <h4 className="font-bold mb-3 text-black">Key Responsibilities</h4>
                <ul className="space-y-2 mb-6">
                  {job.responsibilities.map((req, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-600 items-start">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <>
                <h4 className="font-bold mb-3 text-black">Benefits</h4>
                <ul className="list-disc list-inside space-y-1 mb-6 text-sm text-gray-600">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </>
            )}
          </section>

        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-gray-200 p-6 flex justify-end gap-4 mt-auto">
          <button 
            onClick={handleSaveClick}
            className={`px-6 py-3 rounded-xl font-bold text-sm border transition-colors ${isSaved ? 'bg-gray-100 border-gray-300 text-black' : 'border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-150 ease-out text-gray-700'}`}
          >
            {isSaved ? 'Saved' : 'Save Job'}
          </button>
          <a 
            href={isApplied ? "#" : job.applyLink}
            onClick={(e) => {
              if (isApplied) {
                e.preventDefault();
              } else {
                handleApplyClick();
              }
            }}
            target={isApplied ? undefined : "_blank"}
            rel={isApplied ? undefined : "noopener noreferrer"}
            className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-colors duration-150 ease-out shadow-sm ${isApplied ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {isApplied ? 'Applied' : 'Apply on Original Site'} {!isApplied && <ExternalLink className="w-4 h-4" />}
          </a>
        </div>

      </div>
    </div>
  );
}
