"use client";

import React, { useState, useEffect } from 'react';
import { sendPasswordReset } from '@/lib/auth';
import AuthLayout from '@/components/auth/AuthLayout';
import Link from 'next/link';
import { Loader2, MailCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"enter-email" |"check-email">("enter-email");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    const { success, error } = await sendPasswordReset(email);
    setIsLoading(false);

    if (success) {
      setState("check-email");
      setCountdown(60);
      toast.success("Password reset link sent!");
    } else {
      toast.error(error ||"Failed to send reset link.");
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    const { success, error } = await sendPasswordReset(email);
    setIsLoading(false);

    if (success) {
      setCountdown(60);
      toast.success("Reset link resent!");
    } else {
      toast.error(error ||"Failed to resend link.");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        {state ==="enter-email" ? (
          <>
            <h2 className="text-2xl font-extrabold mb-2">Reset your password</h2>
            <p className="text-muted-foreground mb-8">Enter the email you signed up with. We'll send you a reset link.</p>

            <form onSubmit={handleSendReset} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Email</label>
                <input 
                  required type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-muted/30 border border-muted rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <button 
                type="submit" disabled={isLoading}
                className="w-full py-3 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-colors duration-150 ease-out flex justify-center items-center gap-2 mt-4 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> :"Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MailCheck className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-extrabold mb-2">Check your email</h2>
            <p className="text-muted-foreground mb-8">
              We sent a password reset link to <span className="font-bold text-foreground">{email}</span>. It expires in 1 hour.
            </p>

            <button 
              onClick={handleResend} disabled={countdown > 0 || isLoading}
              className="w-full py-3 bg-muted text-foreground font-bold rounded-xl hover:bg-muted/80 transition-colors duration-150 ease-out flex justify-center items-center gap-2 mb-4 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : countdown > 0 ? `Resend Email in ${countdown}s` :"Resend Email"}
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/sign-in" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
            Back to Sign In →
          </Link>
        </div>

      </div>
    </AuthLayout>
  );
}
