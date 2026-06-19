import React from 'react';
import { UserProfile } from '@/lib/auth';
import { User as FirebaseUser } from 'firebase/auth';

interface UserAvatarProps {
  profile?: UserProfile | null;
  user?: FirebaseUser | null;
  className?: string;
}

export default function UserAvatar({ profile, user, className = "w-8 h-8 text-xs" }: UserAvatarProps) {
  const avatarType = profile?.avatarType;
  const avatarValue = profile?.avatarValue;

  const getInitials = () => {
    if (profile?.fullName) {
      const parts = profile.fullName.trim().split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return parts[0][0].toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  // 1. Uploaded Photo
  if (avatarType === "uploaded" && avatarValue) {
    return (
      <div className={`rounded-full overflow-hidden shrink-0 bg-muted ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatarValue} alt="User Avatar" className="w-full h-full object-cover" />
      </div>
    );
  }

  // 2. Preset Avatar (Local)
  if (avatarType === "preset" && avatarValue) {
    return (
      <div className={`rounded-full overflow-hidden shrink-0 bg-muted ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatarValue} alt="User Avatar" className="w-full h-full object-cover" />
      </div>
    );
  }

  // 3. Initials / Fallback
  return (
    <div className={`rounded-full shrink-0 bg-foreground text-background flex items-center justify-center font-bold tracking-wider ${className}`}>
      {getInitials()}
    </div>
  );
}
