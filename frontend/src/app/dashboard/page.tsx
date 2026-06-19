"use client";

import React, { useState } from"react";
import { Sparkles, Target } from"lucide-react";
import Link from"next/link";
import ActivityHeatmap from"@/components/dashboard/ActivityHeatmap";

import ResumeStatCard from"@/components/dashboard/stats/ResumeStatCard";
import JobsStatCard from"@/components/dashboard/stats/JobsStatCard";
import TrendingJobsStatCard from"@/components/dashboard/stats/TrendingJobsStatCard";
import ActiveLearningStatCard from"@/components/dashboard/stats/ActiveLearningStatCard";
import WeeklyActivityStatCard from"@/components/dashboard/stats/WeeklyActivityStatCard";
import InterviewsStatCard from"@/components/dashboard/stats/InterviewsStatCard";
import RecommendedActions from"@/components/dashboard/RecommendedActions";
import IndustryInsightsStatCard from"@/components/dashboard/stats/IndustryInsightsStatCard";

export default function DashboardPage() {

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your career activity tracker.</h1>
          <p className="text-muted-foreground mt-1">Monitor your interview readiness and active applications.</p>
        </div>
        <Link 
          href="/dashboard/roadmaps"
          className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors duration-150 ease-out shadow-sm w-fit"
        >
          <Sparkles className="w-4 h-4" />
          Build New Roadmap
        </Link>
      </div>

      {/* Activity Heatmap - Full Width */}
      <div className="w-full">
        <ActivityHeatmap />
      </div>

      {/* Core Vitals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ResumeStatCard />
        <JobsStatCard />
        <InterviewsStatCard />
        <WeeklyActivityStatCard />
      </div>

      {/* Secondary Stats - Varied dense row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrendingJobsStatCard />
        <ActiveLearningStatCard />
      </div>

      {/* Recent Activity / Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <RecommendedActions />
        <IndustryInsightsStatCard />
      </div>
    </div>
  );
}
