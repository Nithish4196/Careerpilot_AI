"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, User, LayoutDashboard, Settings, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, userProfile, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const initial = userProfile?.fullName
    ? userProfile.fullName.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || "U";

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button 
        onClick={toggleDropdown}
        className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs hover:opacity-80 transition-opacity">
          {initial}
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-background border border-muted rounded-xl shadow-lg shadow-black/10 z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
          
          {/* Header Block */}
          <div className="p-4 border-b border-muted bg-muted/10">
            {userProfile ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 shrink-0 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-lg">
                  {initial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-sm truncate">{userProfile.fullName || "User"}</div>
                  <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
                  <div className="mt-1 inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {userProfile.plan || "Free"} Plan
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-muted"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-2 space-y-1">
            {/* Theme Switcher */}
            <div className="px-2 py-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Theme</span>
              <div className="flex bg-muted rounded-lg p-0.5">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    theme === "light" 
                      ? "bg-background text-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    theme === "dark" 
                      ? "bg-background text-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  Dark
                </button>
              </div>
            </div>

            <div className="h-px bg-muted my-1 mx-2"></div>

            {/* Links */}
            {pathname !== "/dashboard" && (
              <Link 
                href="/dashboard" 
                onClick={closeDropdown}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                View Dashboard
              </Link>
            )}
            
            <Link 
              href="/dashboard/settings" 
              onClick={closeDropdown}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              Profile Settings
            </Link>

            <button 
              onClick={() => {
                closeDropdown();
                signOut();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
