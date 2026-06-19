"use client";

import React, { useState } from 'react';
import { CareerRoadmap, SkillCategory, WeeklyPlan, ResourceItem, SkillResources, ProjectPhase, CertificationsGroup, InterviewPrep } from '@/types/roadmap';
import { 
  Map, LayoutDashboard, GitMerge, Calendar, BookOpen, Code2, 
  Award, MessageSquare, ArrowRight, CheckCircle2, Clock, 
  ExternalLink, Copy, ChevronRight, CheckSquare, Square
} from 'lucide-react';

interface RoadmapViewProps {
  roadmap: CareerRoadmap;
  onSave: () => void;
  onRegenerate: () => void;
  isSaved: boolean;
}

export default function RoadmapView({ roadmap, onSave, onRegenerate, isSaved }: RoadmapViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id:"overview", label:"Overview", icon: LayoutDashboard },
    { id:"skilltree", label:"Skill Tree", icon: GitMerge },
    { id:"weekly", label:"Week Plan", icon: Calendar },
    { id:"resources", label:"Resources", icon: BookOpen },
    { id:"projects", label:"Projects", icon: Code2 },
    { id:"certs", label:"Certifications", icon: Award },
    { id:"interview", label:"Interview", icon: MessageSquare }
  ];

  const handleCopyKeywords = () => {
    navigator.clipboard.writeText(roadmap.interviewPrep.resumeKeywords.join(","));
  };

  return (
    <div className="flex flex-col h-full">
      
      {/* Header */}
      <div className="bg-background border border-muted rounded-2xl p-6 mb-6 shrink-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
            <span>{roadmap.request.currentRole}</span>
            <ArrowRight className="w-4 h-4" />
            <span className="text-foreground">{roadmap.request.targetRole}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">{roadmap.request.targetRole} Roadmap</h1>
          <div className="flex flex-wrap gap-4 items-center text-sm">
            <span className="flex items-center gap-1.5 font-semibold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4" /> {roadmap.overview.estimatedTimeline}
            </span>
            <span className="flex items-center gap-1.5 font-bold text-green-600 bg-green-500/10 px-3 py-1.5 rounded-lg">
              Readiness: {roadmap.overview.readinessScore}%
            </span>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={onRegenerate}
            className="flex-1 md:flex-none px-4 py-2 border border-muted text-foreground font-semibold rounded-xl hover:bg-muted transition-colors duration-150 ease-out transition-colors"
          >
            Regenerate
          </button>
          <button 
            onClick={onSave}
            disabled={isSaved}
            className="flex-1 md:flex-none px-6 py-2 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-colors duration-150 ease-out transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSaved ? <><CheckCircle2 className="w-4 h-4" /> Saved</> :"Save Roadmap"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 mb-6 border-b border-muted scrollbar-hide shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'border-foreground text-foreground' 
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-12">
        {activeTab ==="overview" && <TabOverview roadmap={roadmap} />}
        {activeTab ==="skilltree" && <TabSkillTree tree={roadmap.skillTree} onFindResource={() => setActiveTab('resources')} />}
        {activeTab ==="weekly" && <TabWeekly plan={roadmap.weeklyPlan} />}
        {activeTab ==="resources" && <TabResources resources={roadmap.resources} />}
        {activeTab ==="projects" && <TabProjects phases={roadmap.projects} />}
        {activeTab ==="certs" && <TabCerts groups={roadmap.certifications} />}
        {activeTab ==="interview" && <TabInterview prep={roadmap.interviewPrep} onCopy={handleCopyKeywords} />}
      </div>

    </div>
  );
}

// ==========================================
// TAB COMPONENTS
// ==========================================

function TabOverview({ roadmap }: { roadmap: CareerRoadmap }) {
  return (
    <div className="space-y-8">
      
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:"Skills to Learn", value: roadmap.overview.totalSkills },
          { label:"Recommended Courses", value: roadmap.overview.coursesRecommended },
          { label:"Projects to Build", value: roadmap.overview.projectsToBuild },
          { label:"Estimated Weeks", value: roadmap.overview.estimatedWeeks }
        ].map(stat => (
          <div key={stat.label} className="bg-background border border-muted rounded-2xl p-5 shadow-sm text-center">
            <div className="text-3xl font-extrabold text-foreground mb-1">{stat.value}</div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-background border border-muted rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">AI Gap Analysis</h2>
        <p className="text-muted-foreground leading-relaxed">{roadmap.overview.gapSummary}</p>
      </div>

      {/* Skill Gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-background border border-muted rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Skills You Have</h3>
          <div className="flex flex-wrap gap-2">
            {roadmap.overview.skillsYouHave.length > 0 ? roadmap.overview.skillsYouHave.map(s => (
              <span key={s} className="px-3 py-1.5 bg-green-500/10 text-green-600 font-semibold text-sm rounded-lg border border-green-500/20">{s}</span>
            )) : <span className="text-sm text-muted-foreground">No current skills provided.</span>}
          </div>
        </div>
        
        <div className="bg-background border border-muted rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Map className="w-5 h-5 text-foreground" /> Skills You Need</h3>
          <div className="flex flex-wrap gap-2">
            {roadmap.overview.skillsYouNeed.map(s => (
              <span key={s.name} className={`px-3 py-1.5 font-semibold text-sm rounded-lg border ${
                s.status === 'Already have' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                s.status === 'Partially know' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                'bg-muted/50 text-muted-foreground border-muted'
              }`}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Career Progression */}
      <div className="bg-background border border-muted rounded-2xl p-6 shadow-sm overflow-x-auto">
        <h2 className="text-xl font-bold mb-6">Career Progression Path</h2>
        <div className="flex items-center min-w-max">
          {roadmap.overview.careerProgression.map((node, idx) => (
            <React.Fragment key={node.role}>
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-12 h-12 rounded-full border-2 border-foreground bg-background flex items-center justify-center font-bold mb-3 transition-transform group-hover:scale-110 shadow-sm relative">
                  {idx + 1}
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-3 hidden group-hover:block w-48 p-3 bg-foreground text-background text-xs rounded-xl shadow-xl z-10 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-foreground">
                    <div className="font-bold mb-1">{node.role}</div>
                    <div className="text-background/70 mb-2">Avg: {node.avgSalary}</div>
                    <div className="flex flex-wrap gap-1">
                      {node.keySkills.map(ks => (
                        <span key={ks} className="px-1.5 py-0.5 bg-background/20 rounded text-[10px]">{ks}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-bold text-center max-w-[120px]">{node.role}</div>
              </div>
              {idx < roadmap.overview.careerProgression.length - 1 && (
                <div className="w-16 h-0.5 bg-muted mx-2 mb-8 relative">
                  <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-muted-foreground w-4 h-4 bg-background" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );
}

function TabSkillTree({ tree, onFindResource }: { tree: SkillCategory[], onFindResource: () => void }) {
  return (
    <div className="space-y-8">
      {tree.map(category => (
        <div key={category.category} className="bg-background border border-muted rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6 pb-4 border-b border-muted">{category.category}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {category.skills.map(skill => (
              <div key={skill.name} className="flex flex-col p-4 bg-muted/20 border border-muted rounded-xl hover:border-foreground/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold">{skill.name}</h3>
                  <span className={`px-2 py-1 text-[10px] uppercase tracking-widest font-extrabold rounded-md ${
                    skill.priority === 'Core' ? 'bg-red-500/10 text-red-600' :
                    skill.priority === 'Important' ? 'bg-amber-500/10 text-amber-600' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {skill.priority}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {skill.estimatedTime}</span>
                  <span className="flex items-center gap-1">Level: <span className="text-foreground">{skill.currentLevel}</span></span>
                </div>

                <div className="w-full bg-muted rounded-full h-1.5 mb-4">
                  <div className="bg-primary h-1.5 rounded-full" style={{ 
                    width: skill.currentLevel === 'Not Started' ? '5%' : 
                           skill.currentLevel === 'Beginner' ? '30%' : 
                           skill.currentLevel === 'Intermediate' ? '60%' : '100%' 
                  }}></div>
                </div>

                <button onClick={onFindResource} className="mt-auto flex items-center justify-between px-4 py-2 bg-background border border-muted text-sm font-bold rounded-lg hover:bg-muted transition-colors duration-150 ease-out transition-colors">
                  Find Resources <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

import { useAuth } from '@/context/AuthContext';
import { logActivity } from '@/lib/activity';

function TabWeekly({ plan }: { plan: WeeklyPlan[] }) {
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  const { user } = useAuth();

  const toggleWeek = (weekNo: number) => {
    if (completedWeeks.includes(weekNo)) {
      setCompletedWeeks(completedWeeks.filter(n => n !== weekNo));
    } else {
      setCompletedWeeks([...completedWeeks, weekNo]);
      if (user) logActivity(user.uid,"roadmapTasksCompleted");
    }
  };

  const progress = Math.round((completedWeeks.length / plan.length) * 100) || 0;

  return (
    <div className="">
      
      <div className="bg-background border border-muted rounded-2xl p-6 mb-8 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold">Overall Progress</h2>
          <span className="font-bold text-primary">{progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div className="bg-primary h-3 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="space-y-6">
        {plan.map(week => {
          const isDone = completedWeeks.includes(week.weekNumber);
          return (
            <div key={week.weekNumber} className={`bg-background border rounded-2xl p-6 ${isDone ? 'border-green-500/30 bg-green-500/5' : 'border-muted shadow-sm'}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-muted">
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Week {week.weekNumber} • {week.dateRange}</div>
                  <h3 className="text-xl font-extrabold">{week.theme}</h3>
                  {week.milestone && (
                    <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-amber-500/10 text-amber-600 text-xs font-bold rounded-lg border border-amber-500/20">
                      <Award className="w-3.5 h-3.5" /> Milestone: {week.milestone}
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => toggleWeek(week.weekNumber)}
                  className={`flex items-center gap-2 px-4 py-2 font-bold text-sm rounded-xl transition-colors ${isDone ? 'bg-green-500 text-white' : 'bg-muted text-foreground hover:bg-muted/70 transition-colors duration-150 ease-out '}`}
                >
                  {isDone ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                  {isDone ? 'Completed' : 'Mark Complete'}
                </button>
              </div>

              <div className="space-y-3">
                {week.days.map(day => (
                  <div key={day.day} className="flex items-center justify-between p-3 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors duration-150 ease-out transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="w-20 font-bold text-sm text-muted-foreground">{day.day}</span>
                      <span className="font-semibold text-sm">{day.topic}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-extrabold tracking-widest ${
                        day.type === 'Learn' ? 'bg-blue-500/10 text-blue-600' :
                        day.type === 'Practice' ? 'bg-purple-500/10 text-purple-600' :
                        day.type === 'Project' ? 'bg-orange-500/10 text-orange-600' :
                        day.type === 'Revise' ? 'bg-teal-500/10 text-teal-600' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {day.type}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground w-12 text-right">{day.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {week.weekendTask && (
                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Weekend Task</div>
                  <p className="text-sm font-medium">{week.weekendTask}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TabResources({ resources }: { resources: SkillResources[] }) {
  const [filter, setFilter] = useState("All");

  return (
    <div className="space-y-8">
      
      <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
        {['All', 'Video', 'Course', 'Documentation'].map(f => (
          <button 
            key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-colors whitespace-nowrap ${filter === f ? 'bg-foreground text-background border-foreground' : 'bg-background text-muted-foreground border-muted hover:border-foreground/30'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {resources.map(res => (
        <div key={res.skillName} className="bg-background border border-muted rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-muted">
            <h2 className="text-xl font-bold">{res.skillName}</h2>
            <span className="px-2 py-1 bg-muted text-[10px] uppercase font-bold rounded text-muted-foreground">{res.estimatedTime}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Free */}
            <div>
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-widest mb-4">Free Resources</h3>
              <div className="space-y-3">
                {res.free.filter(r => filter ==="All" || r.type === filter).map(item => (
                  <a key={item.name} href={item.url} target="_blank" className="block p-4 border border-muted rounded-xl hover:border-primary transition-colors group">
                    <div className="font-bold text-sm mb-1 group-hover:text-primary">{item.name}</div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.platform} • {item.type}</span>
                      {item.duration && <span>{item.duration}</span>}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Paid */}
            <div>
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-widest mb-4">Paid Courses</h3>
              <div className="space-y-3">
                {res.paid.filter(r => filter ==="All" || r.type === filter).map(item => (
                  <a key={item.name} href={item.url} target="_blank" className="block p-4 border border-muted rounded-xl hover:border-primary transition-colors group relative overflow-hidden">
                    {item.hasCertification && <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[8px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">Cert Included</div>}
                    <div className="font-bold text-sm mb-1 group-hover:text-primary pr-8">{item.name}</div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.platform}</span>
                      <span className="font-bold text-foreground">{item.priceRange}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Practice */}
            <div>
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-widest mb-4">Practice</h3>
              <div className="space-y-3">
                {res.practice.filter(r => filter ==="All" || r.type === filter).map(item => (
                  <a key={item.name} href={item.url} target="_blank" className="block p-4 border border-muted rounded-xl hover:border-primary transition-colors group">
                    <div className="font-bold text-sm mb-1 group-hover:text-primary">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.platform}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TabProjects({ phases }: { phases: ProjectPhase[] }) {
  return (
    <div className="space-y-10">
      {phases.map(phase => (
        <div key={phase.phaseName}>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center text-sm"><Code2 className="w-4 h-4"/></span>
            {phase.phaseName}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phase.projects.map(proj => (
              <div key={proj.title} className="bg-background border border-muted rounded-2xl p-6 shadow-sm flex flex-col">
                
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-lg leading-tight pr-4">{proj.title}</h3>
                  <span className={`shrink-0 px-2.5 py-1 text-[10px] uppercase tracking-widest font-extrabold rounded-md ${
                    proj.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-600' :
                    proj.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-600' :
                    'bg-red-500/10 text-red-600'
                  }`}>
                    {proj.difficulty}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{proj.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.skills.map(s => <span key={s} className="px-2 py-1 bg-muted/50 text-[10px] font-bold rounded uppercase text-muted-foreground">{s}</span>)}
                </div>

                <div className="bg-muted/20 rounded-xl p-4 mb-6 border border-muted">
                  <div className="text-xs font-bold mb-2">What you will learn:</div>
                  <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-4">
                    {proj.learnings.map(l => <li key={l}>{l}</li>)}
                  </ul>
                </div>

                <div className="mt-auto pt-4 border-t border-muted flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground">Impact:</span>
                    <span className={`text-xs font-extrabold ${proj.resumeImpactScore === 'High' ? 'text-green-500' : proj.resumeImpactScore === 'Medium' ? 'text-amber-500' : 'text-muted-foreground'}`}>{proj.resumeImpactScore}</span>
                  </div>
                  <button className="text-xs font-bold flex items-center gap-1 hover:text-primary transition-colors">
                    View Guide <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TabCerts({ groups }: { groups: CertificationsGroup[] }) {
  return (
    <div className="space-y-8">
      {groups.map(group => (
        <div key={group.category}>
          <h2 className="text-xl font-bold mb-6">{group.category} Certifications</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {group.items.map(cert => (
              <div key={cert.name} className="bg-background border border-muted rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{cert.name}</h3>
                  <span className="text-xs font-bold px-2 py-1 bg-foreground text-background rounded-md shrink-0 ml-4">{cert.priority}</span>
                </div>
                <div className="text-sm font-semibold text-primary mb-4">{cert.issuer}</div>
                
                <p className="text-sm text-muted-foreground mb-6">{cert.whyItMatters}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="bg-muted/30 p-3 rounded-lg border border-muted">
                    <div className="text-xs font-bold text-muted-foreground mb-1">Prep Time</div>
                    <div className="font-semibold">{cert.prepTime}</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg border border-muted">
                    <div className="text-xs font-bold text-muted-foreground mb-1">Exam Cost</div>
                    <div className="font-semibold">{cert.cost}</div>
                  </div>
                </div>

                <a href={cert.url} target="_blank" className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-muted text-sm font-bold rounded-xl hover:bg-muted transition-colors duration-150 ease-out transition-colors">
                  Official Exam Page <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TabInterview({ prep, onCopy }: { prep: InterviewPrep, onCopy: () => void }) {
  return (
    <div className="space-y-8">
      
      {/* Overview */}
      <div className="bg-background border border-muted rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Hiring Process Overview</h2>
        <p className="text-muted-foreground leading-relaxed">{prep.whatToExpect}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Q Bank & Plan */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-background border border-muted rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Topic-wise Question Bank</h2>
            <div className="space-y-6">
              {prep.questionBank.map(topic => (
                <div key={topic.topic} className="border border-muted rounded-xl overflow-hidden">
                  <div className="bg-muted/50 px-4 py-3 border-b border-muted flex items-center justify-between">
                    <h3 className="font-bold text-sm">{topic.topic}</h3>
                    <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                      Practice with AI <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="divide-y divide-muted">
                    {topic.questions.map((q, i) => (
                      <div key={i} className="p-4 flex items-start justify-between gap-4 bg-background">
                        <span className="text-sm font-medium">{q.question}</span>
                        <span className={`shrink-0 px-2 py-1 text-[10px] uppercase font-extrabold rounded ${
                          q.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600' :
                          q.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-600' :
                          'bg-red-500/10 text-red-600'
                        }`}>{q.difficulty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background border border-muted rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">30-60-90 Day Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(prep.actionPlan).map(([period, items]) => (
                <div key={period} className="bg-muted/20 border border-muted rounded-xl p-4">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-primary mb-4 border-b border-muted pb-2">
                    {period.replace('days', 'Day ')}
                  </h3>
                  <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4 marker:text-primary/50">
                    {items.map(item => <li key={item} className="leading-snug">{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Keywords & Salary */}
        <div className="space-y-8">
          
          <div className="bg-background border border-muted rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Resume Keywords</h2>
              <button onClick={onCopy} className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted transition-colors duration-150 ease-out " title="Copy Keywords">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {prep.resumeKeywords.map(kw => (
                <span key={kw} className="px-2.5 py-1 bg-muted/50 border border-muted text-xs font-bold rounded-lg text-foreground">{kw}</span>
              ))}
            </div>
          </div>

          <div className="bg-background border border-muted rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-6">Salary Insights</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-semibold">Entry Level</span>
                <span className="font-bold">{prep.salaryInsights.entry}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-semibold">Mid Level</span>
                <span className="font-bold">{prep.salaryInsights.mid}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-semibold">Senior Level</span>
                <span className="font-bold">{prep.salaryInsights.senior}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Top Companies Hiring</h3>
              <div className="flex flex-wrap gap-1.5">
                {prep.salaryInsights.topCompanies.map(tc => (
                  <span key={tc} className="text-xs font-semibold px-2 py-1 bg-foreground/5 rounded text-foreground">{tc}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Negotiation Tips</h3>
              <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                {prep.salaryInsights.negotiationTips.map(tip => <li key={tip}>{tip}</li>)}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
