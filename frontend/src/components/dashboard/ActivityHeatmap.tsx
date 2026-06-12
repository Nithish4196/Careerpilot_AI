"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ActivityCategory } from "@/lib/activity";
import { Loader2 } from "lucide-react";

interface ActivityDay {
  date: string; // YYYY-MM-DD
  actions: number;
  breakdown?: Record<ActivityCategory, number>;
}

interface MonthGroup {
  month: number;
  year: number;
  name: string;
  weeks: (Date | null)[][];
}

const getMonthsArray = (startDate: Date, endDate: Date) => {
  const months: MonthGroup[] = [];
  
  let currMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  const endMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

  while (currMonth <= endMonth) {
    const year = currMonth.getFullYear();
    const month = currMonth.getMonth();
    const name = currMonth.toLocaleDateString('en-US', { month: 'short' });
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const weeks: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = Array(7).fill(null);
    
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      const dayOfWeek = d.getDay();
      currentWeek[dayOfWeek] = d;
      
      if (dayOfWeek === 6 || i === daysInMonth) {
        weeks.push(currentWeek);
        currentWeek = Array(7).fill(null);
      }
    }
    
    months.push({ year, month, name, weeks });
    currMonth.setMonth(currMonth.getMonth() + 1);
  }
  
  return months;
};

// Helper to get color based on actions
const getColorClass = (actions: number) => {
  if (actions === 0) return "bg-[#161b22] dark:bg-[#161b22] bg-muted hover:opacity-80";
  if (actions <= 2) return "bg-[#0e4429] hover:opacity-80";
  if (actions <= 5) return "bg-[#006d32] hover:opacity-80";
  if (actions <= 10) return "bg-[#26a641] hover:opacity-80";
  return "bg-[#39d353] hover:opacity-80";
};

// Format category names for tooltip
const formatCategory = (cat: string) => {
  const map: Record<string, string> = {
    resumeEdits: "resume edits",
    jobsApplied: "jobs applied",
    coursesStudied: "courses studied",
    mockInterviews: "mock interviews",
    projectsWorked: "projects worked",
    aiChatMessages: "AI chat messages",
    roadmapTasksCompleted: "roadmap tasks",
  };
  return map[cat] || cat;
};

export default function ActivityHeatmap() {
  const { user, userProfile } = useAuth();
  const [activityMap, setActivityMap] = useState<Map<string, ActivityDay>>(new Map());
  const [loading, setLoading] = useState(true);
  const [hoverInfo, setHoverInfo] = useState<{
    dateStr: string; 
    formattedDate: string;
    actions: number; 
    breakdown?: Record<ActivityCategory, number>;
    x: number; 
    y: number;
  } | null>(null);

  // Time calculations
  const today = new Date();
  const tzOffset = today.getTimezoneOffset() * 60000;
  const localTodayStr = new Date(today.getTime() - tzOffset).toISOString().split('T')[0];

  // Calculate Available Periods
  const availablePeriods = React.useMemo(() => {
    const periods: { label: string; startDate: Date; endDate: Date }[] = [];
    
    // Current Period (Last 6 months)
    const currentStart = new Date(today);
    currentStart.setMonth(today.getMonth() - 5);
    currentStart.setDate(1); // align to start of month
    periods.push({
      label: "Current",
      startDate: currentStart,
      endDate: today
    });

    if (userProfile?.createdAt) {
      let createdAtDate;
      if (typeof userProfile.createdAt === 'object' && 'seconds' in userProfile.createdAt) {
         createdAtDate = new Date(userProfile.createdAt.seconds * 1000);
      } else {
         createdAtDate = new Date(userProfile.createdAt as unknown as string);
      }

      const startYear = createdAtDate.getFullYear();
      const currentYear = today.getFullYear();

      for (let y = currentYear; y >= startYear; y--) {
        // H2: Jul - Dec
        if (y < currentYear || today.getMonth() >= 6) {
          if (y > startYear || createdAtDate.getMonth() <= 11) {
            periods.push({
              label: `${y} (Jul - Dec)`,
              startDate: new Date(y, 6, 1),
              endDate: new Date(y, 11, 31)
            });
          }
        }
        
        // H1: Jan - Jun
        if (y > startYear || createdAtDate.getMonth() <= 5) {
          periods.push({
            label: `${y} (Jan - Jun)`,
            startDate: new Date(y, 0, 1),
            endDate: new Date(y, 5, 30)
          });
        }
      }
    } else {
      // Default fallback if no createdAt
      const fallbackStart = new Date(today);
      fallbackStart.setMonth(today.getMonth() - 5);
      fallbackStart.setDate(1);
      if (!periods.find(p => p.label === "Current")) {
        periods.push({
          label: "Current",
          startDate: fallbackStart,
          endDate: today
        });
      }
    }
    return periods;
  }, [userProfile?.createdAt]);

  const [selectedPeriod, setSelectedPeriod] = useState(availablePeriods[0]);

  // Fetch all data for the user so streaks are accurate (and local filtering is fast)
  useEffect(() => {
    if (!user?.uid) return;

    let fetchStart = new Date(today);
    fetchStart.setFullYear(today.getFullYear() - 5); // Fetch up to 5 years of activity to calculate streaks properly
    if (availablePeriods.length > 1) {
      fetchStart = availablePeriods[availablePeriods.length - 1].startDate;
    }
    const startStr = new Date(fetchStart.getTime() - tzOffset).toISOString().split('T')[0];

    const q = query(
      collection(db, `users/${user.uid}/activityLog`),
      where("date", ">=", startStr),
      where("date", "<=", localTodayStr)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMap = new Map<string, ActivityDay>();
      snapshot.forEach((doc) => {
        const data = doc.data() as ActivityDay;
        newMap.set(data.date, data);
      });
      setActivityMap(newMap);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.uid, localTodayStr, tzOffset, availablePeriods]);

  // Calculate streaks
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  // Calculate streaks by iterating backwards from today
  const checkDate = new Date(today);
  let streakBroken = false;
  
  // Quick pass for longest streak over all data
  let currentRun = 0;
  // sort keys to find longest streak
  const sortedDates = Array.from(activityMap.keys()).sort();
  if (sortedDates.length > 0) {
    let prevDateStr = sortedDates[0];
    let run = activityMap.get(prevDateStr)!.actions > 0 ? 1 : 0;
    longestStreak = run;
    
    for (let i = 1; i < sortedDates.length; i++) {
      const currStr = sortedDates[i];
      const prevD = new Date(prevDateStr);
      const currD = new Date(currStr);
      
      // Calculate difference in days safely
      const diffTime = Math.abs(currD.getTime() - prevD.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays === 1 && activityMap.get(currStr)!.actions > 0) {
        run++;
        if (run > longestStreak) longestStreak = run;
      } else if (activityMap.get(currStr)!.actions > 0) {
        run = 1;
        if (run > longestStreak) longestStreak = run;
      } else {
        run = 0;
      }
      prevDateStr = currStr;
    }
  }

  // Calculate current streak
  for (let i = 0; i <= 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dStr = new Date(d.getTime() - tzOffset).toISOString().split('T')[0];
    
    const actions = activityMap.get(dStr)?.actions || 0;
    
    if (i === 0 && actions === 0) {
      // It's okay if they haven't done anything TODAY yet, check yesterday
      continue;
    }
    
    if (actions > 0) {
      if (!streakBroken) currentStreak++;
    } else {
      if (i > 0) streakBroken = true; // broken on a past day
    }
    
    if (streakBroken) break;
  }

  if (currentStreak > longestStreak) longestStreak = currentStreak;

  // Generate grid
  const months = getMonthsArray(selectedPeriod.startDate, selectedPeriod.endDate);

  const handleMouseEnter = (e: React.MouseEvent, d: Date) => {
    const dStr = new Date(d.getTime() - tzOffset).toISOString().split('T')[0];
    const data = activityMap.get(dStr);
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setHoverInfo({
      dateStr: dStr,
      formattedDate: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      actions: data?.actions || 0,
      breakdown: data?.breakdown,
      x: rect.left + rect.width / 2,
      y: rect.top
    });
  };

  return (
    <div className="bg-background rounded-xl border border-muted p-6 shadow-sm overflow-hidden relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold">Activity Heatmap</h3>
          <select 
            className="bg-muted/50 border border-muted text-foreground text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-foreground/30 font-semibold cursor-pointer hover:bg-muted transition-colors"
            value={selectedPeriod.label}
            onChange={(e) => {
              const p = availablePeriods.find(p => p.label === e.target.value);
              if (p) setSelectedPeriod(p);
            }}
          >
            {availablePeriods.map(p => (
              <option key={p.label} value={p.label}>{p.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <div className="text-muted-foreground"><span className="text-foreground">{currentStreak}</span> Day Streak</div>
          <div className="text-muted-foreground"><span className="text-foreground">{longestStreak}</span> Longest</div>
        </div>
      </div>
      
      {loading ? (
        <div className="h-[120px] flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {months.map((month, mIndex) => (
              <div key={`${month.year}-${month.month}-${mIndex}`} className="flex flex-col gap-2">
                <div className="flex gap-1">
                  {month.weeks.map((week, wIndex) => (
                    <div key={wIndex} className="flex flex-col gap-1">
                      {week.map((day, dIndex) => {
                        if (!day) return <div key={`empty-${dIndex}`} className="w-4 h-4 bg-transparent" />;
                        
                        const isFuture = day > today;
                        const dStr = new Date(day.getTime() - tzOffset).toISOString().split('T')[0];
                        const actions = activityMap.get(dStr)?.actions || 0;
                        
                        if (isFuture) {
                          return <div key={`${wIndex}-${dIndex}`} className="w-4 h-4 bg-transparent" />;
                        }

                        return (
                          <div 
                            key={`${wIndex}-${dIndex}`}
                            className={`w-4 h-4 rounded-sm border border-transparent transition-all cursor-pointer ${getColorClass(actions)}`}
                            onMouseEnter={(e) => handleMouseEnter(e, day)}
                            onMouseLeave={() => setHoverInfo(null)}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground text-center font-medium mt-1">{month.name}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-end text-xs text-muted-foreground gap-2">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-muted"></div>
              <div className="w-3 h-3 rounded-sm bg-foreground/20"></div>
              <div className="w-3 h-3 rounded-sm bg-foreground/40"></div>
              <div className="w-3 h-3 rounded-sm bg-foreground/70"></div>
              <div className="w-3 h-3 rounded-sm bg-foreground"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      )}
      
      {/* Tooltip Portal */}
      {hoverInfo && (
        <div 
          className="fixed bg-foreground text-background text-xs px-3 py-2 rounded shadow-xl pointer-events-none z-50 animate-in fade-in zoom-in duration-100"
          style={{ 
            left: hoverInfo.x, 
            top: hoverInfo.y - 10,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="font-bold mb-1">{hoverInfo.formattedDate}</div>
          <div>{hoverInfo.actions} {hoverInfo.actions === 1 ? 'action' : 'actions'}</div>
          
          {hoverInfo.actions > 0 && hoverInfo.breakdown && (
            <div className="mt-1 pt-1 border-t border-background/20 flex flex-col gap-0.5">
              {Object.entries(hoverInfo.breakdown)
                .filter(([_, count]) => count > 0)
                .map(([cat, count]) => (
                  <div key={cat} className="text-[10px] text-background/80">
                    {count} {formatCategory(cat)}
                  </div>
                ))}
            </div>
          )}
          <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-foreground rotate-45"></div>
        </div>
      )}
    </div>
  );
}
