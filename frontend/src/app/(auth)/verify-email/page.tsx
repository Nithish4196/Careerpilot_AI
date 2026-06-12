"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { resendVerificationEmail } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Mail, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VerifyEmailPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [countdown, setCountdown] = useState(60);
  const [isChecking, setIsChecking] = useState(false);

  // Auto-check email verification status
  useEffect(() => {
    if (!user) return;
    
    const interval = setInterval(async () => {
      await user.reload();
      if (user.emailVerified) {
        clearInterval(interval);
        router.replace("/onboarding");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [user, router]);

  // Resend countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleManualCheck = async () => {
    if (!user) return;
    setIsChecking(true);
    await user.reload();
    setIsChecking(false);

    if (user.emailVerified) {
      router.replace("/onboarding");
    } else {
      toast("Email not verified yet. Please check your inbox.", { icon: "⏳" });
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    const { success, error } = await resendVerificationEmail();
    if (success) {
      setCountdown(60);
      toast.success("Verification email resent!");
    } else {
      toast.error(error || "Failed to resend email.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-background border border-muted rounded-3xl p-8 shadow-xl text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <Mail className="w-10 h-10 text-primary animate-pulse" />
          <div className="absolute top-0 right-0 w-5 h-5 bg-green-500 rounded-full border-4 border-background"></div>
        </div>

        <h1 className="text-3xl font-black mb-4">Verify your email</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          We sent a verification link to <span className="font-bold text-foreground">{user.email}</span>. Click the link in the email to activate your account.
        </p>

        <div className="space-y-4">
          <button 
            onClick={handleManualCheck} disabled={isChecking}
            className="w-full py-3 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {isChecking ? <Loader2 className="w-5 h-5 animate-spin" /> : "I've verified my email"}
          </button>

          <button 
            onClick={handleResend} disabled={countdown > 0}
            className="w-full py-3 bg-muted text-foreground font-bold rounded-xl hover:bg-muted/80 transition-all disabled:opacity-50"
          >
            {countdown > 0 ? `Resend Email in ${countdown}s` : "Resend Email"}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-muted">
          <button onClick={() => signOut()} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
            Sign in with a different account
          </button>
        </div>

      </div>
    </div>
  );
}
