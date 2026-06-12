import React from "react";
import { 
  FileText, 
  Briefcase, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Video,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Resume Score",
    value: "85/100",
    change: "+5%",
    trend: "up",
    icon: FileText,
    color: "bg-primary/10 text-primary",
    link: "/dashboard/resume"
  },
  {
    title: "Applied Jobs",
    value: "12",
    change: "+3 this week",
    trend: "up",
    icon: Briefcase,
    color: "bg-primary/10 text-primary",
    link: "/dashboard/jobs"
  },
  {
    title: "Interview Readiness",
    value: "72%",
    change: "Needs work",
    trend: "neutral",
    icon: Target,
    color: "bg-primary/10 text-primary",
    link: "/dashboard/interviews"
  },
  {
    title: "Skills Progress",
    value: "4 Active",
    change: "+1 master skill",
    trend: "up",
    icon: TrendingUp,
    color: "bg-primary/10 text-primary",
    link: "/dashboard/learning"
  },
  {
    title: "Courses Completed",
    value: "3",
    change: "Top 20% learner",
    trend: "up",
    icon: BookOpen,
    color: "bg-primary/10 text-primary",
    link: "/dashboard/learning"
  },
  {
    title: "Mock Interviews",
    value: "5 Taken",
    change: "Avg Score: 78",
    trend: "up",
    icon: Video,
    color: "bg-primary/10 text-primary",
    link: "/dashboard/interviews"
  }
];

import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import ResumeProgress from "@/components/dashboard/ResumeProgress";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Career Explorer!</h1>
          <p className="text-muted-foreground mt-1">Here's your career progress overview for today.</p>
        </div>
        <Link 
          href="/dashboard/roadmaps"
          className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors shadow-sm w-fit"
        >
          <Sparkles className="w-4 h-4" />
          Build New Roadmap
        </Link>
      </div>

      {/* Progress & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ResumeProgress percentage={85} />
        </div>
        <div className="lg:col-span-2">
          <ActivityHeatmap />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-background rounded-xl p-6 border border-muted shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <Link href={stat.link} className="text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
            <div>
              <h3 className="text-muted-foreground text-sm font-medium">{stat.title}</h3>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold tracking-tight">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity / Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        
        {/* Recommended Actions */}
        <div className="bg-background rounded-xl border border-muted p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Recommended Next Steps</h3>
          <div className="space-y-4">
            {[
              { title: "Improve Resume Keywords", desc: "Add 'TypeScript' to match recent job applications.", action: "Edit Resume", link: "/dashboard/resume" },
              { title: "Practice System Design", desc: "Your technical score in the last mock interview was 65%.", action: "Start Interview", link: "/dashboard/interviews" },
              { title: "Apply to Saved Job", desc: "Frontend Developer at Stripe matches 92% of your skills.", action: "View Job", link: "/dashboard/jobs" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/30 border border-muted/50 hover:bg-muted/50 transition-colors">
                <div>
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
                <Link href={item.link} className="text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap">
                  {item.action}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Streak / Goals */}
        <div className="bg-background rounded-xl border border-muted p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Target className="w-48 h-48" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 bg-foreground/10 text-foreground text-xs font-bold px-2.5 py-1 rounded-full mb-4">
              🔥 5 Day Streak
            </div>
            <h3 className="text-xl font-bold">You're on fire!</h3>
            <p className="text-muted-foreground text-sm mt-2 max-w-[80%]">
              Complete your daily Python algorithms quiz to maintain your streak and earn the "Consistency" badge.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/dashboard/learning" className="inline-flex items-center justify-center w-full bg-foreground text-background font-medium text-sm px-4 py-3 rounded-lg hover:bg-foreground/90 transition-colors">
              Continue Learning
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
