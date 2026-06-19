import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  updateProfile, 
  signOut,
  User
} from"firebase/auth";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from"firebase/firestore";
import { auth, db } from"./firebase";

export interface UserSettings {
  appearance: {
    fontSize:"Small" |"Default" |"Large" |"Extra Large";
    compactMode: boolean;
  };
  notifications: {
    dailyReminder: boolean;
    jobMatches: boolean;
    interviewReminders: boolean;
    weeklyProgress: boolean;
    streakReminder: boolean;
    productUpdates: boolean;
  };
  aiPreferences: {
    tone:"Professional" |"Friendly" |"Direct" |"Motivational";
    responseLength:"Concise" |"Balanced" |"Detailed";
    useProfileData: boolean;
  };
  privacy: {
    showLeaderboard: boolean;
    showHeatmap: boolean;
    allowDataUsage: boolean;
  };
}

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  onboardingCompleted: boolean;
  role?: string;
  experience?: string;
  location?: string;
  targetRole?: string;
  primaryGoal?: string;
  timePerWeek?: string;
  plan?: string;
  skills?: string[];
  settings?: UserSettings;
  createdAt: any;
  lastLoginAt: any;
  avatarType?: "uploaded" | "preset" | "initials";
  avatarValue?: string;
}

export const DEFAULT_SETTINGS: UserSettings = {
  appearance: {
    fontSize:"Default",
    compactMode: false,
  },
  notifications: {
    dailyReminder: true,
    jobMatches: true,
    interviewReminders: true,
    weeklyProgress: true,
    streakReminder: true,
    productUpdates: false,
  },
  aiPreferences: {
    tone:"Professional",
    responseLength:"Balanced",
    useProfileData: true,
  },
  privacy: {
    showLeaderboard: true,
    showHeatmap: true,
    allowDataUsage: true,
  },
};

export function getAuthErrorMessage(code: string): string {
  const messages: Record<string, string> = {"auth/email-already-in-use":"An account with this email already exists.","auth/invalid-email":"Please enter a valid email address.","auth/weak-password":"Password must be at least 6 characters.","auth/user-not-found":"No account found with this email.","auth/wrong-password":"Incorrect password. Try again.","auth/too-many-requests":"Too many attempts. Please wait a few minutes.","auth/network-request-failed":"Network error. Check your connection.","auth/popup-closed-by-user":"Sign in was cancelled.","auth/account-exists-with-different-credential":"An account already exists with this email using a different sign-in method.","auth/invalid-credential":"Invalid credentials. Please try again.","auth/user-disabled":"This account has been disabled. Contact support.","auth/requires-recent-login":"Please sign in again to complete this action.",
  };
  return messages[code] ||"Something went wrong. Please try again.";
}

export async function signUpWithEmail(email: string, password: string, fullName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: fullName });
    await sendEmailVerification(user);

    // Create user document in Firestore
    const userDocRef = doc(db,"users", user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      fullName,
      onboardingCompleted: false,
      settings: DEFAULT_SETTINGS,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: getAuthErrorMessage(error.code) };
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      await signOut(auth);
      return { success: false, error:"Please verify your email before signing in." };
    }

    // Update last login
    const userDocRef = doc(db,"users", user.uid);
    await updateDoc(userDocRef, {
      lastLoginAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: getAuthErrorMessage(error.code) };
  }
}

export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    const userDocRef = doc(db,"users", user.uid);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
      // First time login
      const initialData: any = {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName ||"",
        onboardingCompleted: false,
        settings: DEFAULT_SETTINGS,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      };

      if (user.photoURL) {
        initialData.avatarType = "uploaded";
        initialData.avatarValue = user.photoURL;
      }

      await setDoc(userDocRef, initialData);
    } else {
      // Returning user
      await updateDoc(userDocRef, {
        lastLoginAt: serverTimestamp(),
      });
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: getAuthErrorMessage(error.code) };
  }
}

export async function sendPasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: getAuthErrorMessage(error.code) };
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: getAuthErrorMessage(error.code) };
  }
}

export async function resendVerificationEmail() {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      return { success: true };
    }
    return { success: false, error:"No user found." };
  } catch (error: any) {
    if (error.code === 'auth/too-many-requests') {
      return { success: false, error:"Too many requests. Please wait before resending." };
    }
    return { success: false, error: getAuthErrorMessage(error.code) };
  }
}
