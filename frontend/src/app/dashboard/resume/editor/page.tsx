"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ResumeData, initialResumeData } from "@/types/resume";
import TemplateProfessional from "@/components/resume/TemplateProfessional";
import TemplateCasual from "@/components/resume/TemplateCasual";
import { Settings, User, Briefcase, GraduationCap, ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { useReactToPrint } from "react-to-print";
import { useAuth } from "@/context/AuthContext";
import { logActivity } from "@/lib/activity";

export default function ResumeEditorPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template") || "professional";
  
  const componentRef = useRef<HTMLDivElement>(null);
  const hasLoggedRef = useRef(false);

  const logEdit = () => {
    if (!hasLoggedRef.current && user) {
      logActivity(user.uid, "resumeEdits");
      hasLoggedRef.current = true;
    }
  };

  const handlePrint = useReactToPrint({ 
    contentRef: componentRef,
    documentTitle: "CareerPilot_Resume",
    onBeforePrint: async () => {
      if (user) logActivity(user.uid, "resumeEdits");
    }
  });
  
  const [data, setData] = useState<ResumeData>({
    ...initialResumeData,
    design: { ...initialResumeData.design, template: templateParam as any }
  });

  const [activeTab, setActiveTab] = useState<"content" | "design">("content");
  const [contentSection, setContentSection] = useState<"personal" | "experience" | "education">("personal");

  // Handle generic input changes
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    logEdit();
    setData({
      ...data,
      personalInfo: { ...data.personalInfo, [e.target.name]: e.target.value }
    });
  };

  const handleDesignChange = (name: string, value: string) => {
    setData({
      ...data,
      design: { ...data.design, [name]: value }
    });
  };

  const handleExperienceChange = (id: string, field: string, value: string) => {
    setData({
      ...data,
      experience: data.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    });
  };

  const addExperience = () => {
    setData({
      ...data,
      experience: [...data.experience, { id: Date.now().toString(), company: 'New Company', role: 'Role', date: 'Date', description: 'Description' }]
    });
  };

  const handleEducationChange = (id: string, field: string, value: string) => {
    setData({
      ...data,
      education: data.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    });
  };

  const addEducation = () => {
    setData({
      ...data,
      education: [...data.education, { id: Date.now().toString(), school: 'New School', degree: 'Degree', date: 'Date' }]
    });
  };

  const renderTemplate = () => {
    switch (data.design.template) {
      case "casual":
        return <TemplateCasual data={data} />;
      case "professional":
      default:
        return <TemplateProfessional data={data} />;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] -m-4">
      {/* Editor Top Bar */}
      <div className="h-14 border-b border-muted bg-background/95 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/resume" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Templates
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => handlePrint()} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-1.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Editor Controls */}
        <div className="w-1/3 min-w-[350px] max-w-[500px] border-r border-muted bg-background flex flex-col h-full">
          
          {/* Main Tabs */}
          <div className="flex border-b border-muted">
            <button 
              className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "content" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground"}`}
              onClick={() => setActiveTab("content")}
            >
              Content
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "design" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground"}`}
              onClick={() => setActiveTab("design")}
            >
              Design
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            {activeTab === "content" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Section Navigation */}
                <div className="flex gap-2">
                  <button onClick={() => setContentSection("personal")} className={`px-3 py-1.5 rounded-md text-xs font-medium ${contentSection === "personal" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}><User className="w-3 h-3 inline mr-1"/> Personal</button>
                  <button onClick={() => setContentSection("experience")} className={`px-3 py-1.5 rounded-md text-xs font-medium ${contentSection === "experience" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}><Briefcase className="w-3 h-3 inline mr-1"/> Experience</button>
                  <button onClick={() => setContentSection("education")} className={`px-3 py-1.5 rounded-md text-xs font-medium ${contentSection === "education" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}><GraduationCap className="w-3 h-3 inline mr-1"/> Education</button>
                </div>

                {contentSection === "personal" && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg mb-4">Personal Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
                        <input name="fullName" value={data.personalInfo.fullName} onChange={handlePersonalChange} className="w-full bg-background border border-muted rounded-md px-3 py-2 text-sm focus:border-foreground outline-none transition-colors" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">Job Title</label>
                        <input name="jobTitle" value={data.personalInfo.jobTitle} onChange={handlePersonalChange} className="w-full bg-background border border-muted rounded-md px-3 py-2 text-sm focus:border-foreground outline-none transition-colors" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">Email</label>
                        <input name="email" value={data.personalInfo.email} onChange={handlePersonalChange} className="w-full bg-background border border-muted rounded-md px-3 py-2 text-sm focus:border-foreground outline-none transition-colors" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">Phone</label>
                        <input name="phone" value={data.personalInfo.phone} onChange={handlePersonalChange} className="w-full bg-background border border-muted rounded-md px-3 py-2 text-sm focus:border-foreground outline-none transition-colors" />
                      </div>
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">Location</label>
                        <input name="location" value={data.personalInfo.location} onChange={handlePersonalChange} className="w-full bg-background border border-muted rounded-md px-3 py-2 text-sm focus:border-foreground outline-none transition-colors" />
                      </div>
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">Professional Summary</label>
                        <textarea name="summary" value={data.personalInfo.summary} onChange={handlePersonalChange} rows={4} className="w-full bg-background border border-muted rounded-md px-3 py-2 text-sm focus:border-foreground outline-none transition-colors resize-none" />
                      </div>
                    </div>
                  </div>
                )}
                
                {contentSection === "experience" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">Experience</h3>
                      <button onClick={addExperience} className="text-xs font-semibold bg-foreground text-background px-3 py-1.5 rounded-md hover:bg-foreground/90 transition-colors">+ Add Role</button>
                    </div>
                    {data.experience.map((exp) => (
                      <div key={exp.id} className="p-4 border border-muted rounded-lg space-y-3 bg-muted/10">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground">Company</label>
                            <input value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} className="w-full bg-background border border-muted rounded-md px-2 py-1.5 text-sm focus:border-foreground outline-none" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground">Role</label>
                            <input value={exp.role} onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)} className="w-full bg-background border border-muted rounded-md px-2 py-1.5 text-sm focus:border-foreground outline-none" />
                          </div>
                          <div className="space-y-1 col-span-2">
                            <label className="text-xs font-semibold text-muted-foreground">Date (e.g. Jan 2021 - Present)</label>
                            <input value={exp.date} onChange={(e) => handleExperienceChange(exp.id, 'date', e.target.value)} className="w-full bg-background border border-muted rounded-md px-2 py-1.5 text-sm focus:border-foreground outline-none" />
                          </div>
                          <div className="space-y-1 col-span-2">
                            <label className="text-xs font-semibold text-muted-foreground">Description</label>
                            <textarea value={exp.description} onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)} rows={3} className="w-full bg-background border border-muted rounded-md px-2 py-1.5 text-sm focus:border-foreground outline-none resize-none" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {contentSection === "education" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">Education</h3>
                      <button onClick={addEducation} className="text-xs font-semibold bg-foreground text-background px-3 py-1.5 rounded-md hover:bg-foreground/90 transition-colors">+ Add School</button>
                    </div>
                    {data.education.map((edu) => (
                      <div key={edu.id} className="p-4 border border-muted rounded-lg space-y-3 bg-muted/10">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1 col-span-2">
                            <label className="text-xs font-semibold text-muted-foreground">School / University</label>
                            <input value={edu.school} onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)} className="w-full bg-background border border-muted rounded-md px-2 py-1.5 text-sm focus:border-foreground outline-none" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground">Degree</label>
                            <input value={edu.degree} onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)} className="w-full bg-background border border-muted rounded-md px-2 py-1.5 text-sm focus:border-foreground outline-none" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground">Date</label>
                            <input value={edu.date} onChange={(e) => handleEducationChange(edu.id, 'date', e.target.value)} className="w-full bg-background border border-muted rounded-md px-2 py-1.5 text-sm focus:border-foreground outline-none" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "design" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Settings className="w-5 h-5"/> Global Settings</h3>
                  
                  <div className="space-y-6">
                    {/* Theme Color */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold">Theme Accent Color</label>
                      <div className="flex flex-wrap gap-3">
                        {['#000000', '#2563eb', '#16a34a', '#dc2626', '#9333ea', '#ea580c'].map(color => (
                          <button 
                            key={color}
                            onClick={() => handleDesignChange("themeColor", color)}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${data.design.themeColor === color ? 'border-foreground scale-110' : 'border-transparent hover:scale-105'}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                        <div className="relative">
                           <input 
                              type="color" 
                              value={data.design.themeColor} 
                              onChange={(e) => handleDesignChange("themeColor", e.target.value)}
                              className="w-8 h-8 opacity-0 absolute inset-0 cursor-pointer"
                           />
                           <div className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center text-xl pb-1">+</div>
                        </div>
                      </div>
                    </div>

                    {/* Typography */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold">Font Family</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'font-sans', label: 'Inter (Sans)' },
                          { id: 'font-serif', label: 'Georgia (Serif)' },
                          { id: 'font-mono', label: 'Roboto Mono' }
                        ].map(font => (
                          <button
                            key={font.id}
                            onClick={() => handleDesignChange("fontFamily", font.id)}
                            className={`px-3 py-2 text-sm rounded-md border transition-colors ${data.design.fontFamily === font.id ? 'border-foreground bg-foreground/5 font-medium' : 'border-muted hover:border-foreground/50'}`}
                          >
                            {font.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Font Size */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold">Base Font Size</label>
                      <div className="flex bg-muted rounded-md p-1">
                        {['sm', 'base', 'lg'].map(size => (
                          <button
                            key={size}
                            onClick={() => handleDesignChange("fontSize", size)}
                            className={`flex-1 py-1.5 text-sm rounded-sm capitalize transition-colors ${data.design.fontSize === size ? 'bg-background shadow-sm font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Live Preview */}
        <div className="flex-1 bg-muted/30 p-8 overflow-y-auto flex justify-center items-start">
          {/* Resume Paper Wrapper */}
          <div ref={componentRef} className="w-full max-w-[816px] origin-top bg-white shadow-xl transition-all duration-300">
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}
