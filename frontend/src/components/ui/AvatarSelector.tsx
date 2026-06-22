"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Check } from 'lucide-react';

interface AvatarSelectorProps {
  currentType?: "uploaded" | "preset" | "initials";
  currentValue?: string;
  onSelect: (type: "uploaded" | "preset" | "initials", value: string) => void;
  onSkip?: () => void;
}

export default function AvatarSelector({ currentType, currentValue, onSelect, onSkip }: AvatarSelectorProps) {
  const [activeTab, setActiveTab] = useState<"male" | "female">("male");

  const MALE_AVATARS = [
    "/avatars/male/male1.png",
    "/avatars/male/male2.png",
    "/avatars/male/male3.png",
    "/avatars/male/male4.png",
    "/avatars/male/male5.png"
  ];

  const FEMALE_AVATARS = [
    "/avatars/female/female1.jpg",
    "/avatars/female/female2.jpg",
    "/avatars/female/female3.jpg",
    "/avatars/female/female4.jpg",
    "/avatars/female/female5.jpg"
  ];

  const currentList = activeTab === "male" ? MALE_AVATARS : FEMALE_AVATARS;

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 bg-muted/30 p-1.5 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("male")}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === "male" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Male
        </button>
        <button
          onClick={() => setActiveTab("female")}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === "female" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Female
        </button>
      </div>

      {/* Grid */}
      {currentList.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {currentList.map((avatarPath, index) => {
            const isSelected = currentType === "preset" && currentValue === avatarPath;
            return (
              <div 
                key={index}
                onClick={() => onSelect("preset", avatarPath)}
                className={`relative cursor-pointer rounded-2xl overflow-hidden aspect-square border-4 transition-all duration-200 ${
                  isSelected ? "border-primary scale-105 shadow-xl" : "border-transparent hover:border-muted hover:scale-105"
                }`}
              >
                <img src={avatarPath} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover bg-muted" />
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 shadow-md">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-12 text-center border-2 border-dashed border-muted rounded-2xl bg-muted/10">
          <p className="text-muted-foreground font-medium">Coming Soon...</p>
        </div>
      )}

    </div>
  );
}
