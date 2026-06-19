"use client";

import React, { createContext, useContext, useEffect, useState } from"react";
import { onAuthStateChanged, User } from"firebase/auth";
import { doc, getDoc, onSnapshot } from"firebase/firestore";
import { auth, db } from"@/lib/firebase";
import { UserProfile, signOutUser } from"@/lib/auth";
import { useRouter } from"next/navigation";
import toast from"react-hot-toast";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let unsubscribeProfile: () => void;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // Subscribe to user document changes in Firestore
        const userDocRef = doc(db,"users", firebaseUser.uid);
        unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            setUserProfile(null);
          }
          setLoading(false);
        });
      } else {
        setUserProfile(null);
        setLoading(false);
        if (unsubscribeProfile) {
          unsubscribeProfile();
        }
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  // Apply appearance settings globally
  useEffect(() => {
    if (userProfile?.settings?.appearance) {
      const { fontSize, compactMode } = userProfile.settings.appearance;
      const html = document.documentElement;
      
      html.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xl');
      if (fontSize === 'Small') html.classList.add('text-sm');
      else if (fontSize === 'Large') html.classList.add('text-lg');
      else if (fontSize === 'Extra Large') html.classList.add('text-xl');
      else html.classList.add('text-base'); // Default

      if (compactMode) {
        html.classList.add('compact-mode');
      } else {
        html.classList.remove('compact-mode');
      }
    }
  }, [userProfile?.settings?.appearance]);

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
    setUserProfile(null);
    toast.success("You've been signed out.");
    router.replace("/sign-in");
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
