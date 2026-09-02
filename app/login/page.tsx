'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, LogIn, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('weaver@asgardlabs.com');
  const [password, setPassword] = useState('••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="texture-bg text-on-background min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container-lowest border border-natural-beige rounded-lg shadow-[0_8px_24px_rgba(26,35,126,0.08)] overflow-hidden relative">
        {/* Decorative Top Accent Bar */}
        <div className="h-2 bg-primary w-full"></div>

        <div className="p-8 sm:p-10">
          {/* Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-fixed-dim/20 text-primary mb-4 border border-natural-beige shadow-sm">
              <span className="material-symbols-outlined text-3xl">precision_manufacturing</span>
            </div>
            <h1 className="font-headline-md text-2xl text-primary font-bold tracking-tight mb-1">
              ASGARD LABS
            </h1>
            <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest font-semibold">
              PRODUCTION HUB
            </p>
            <div className="w-12 h-[1px] bg-outline-variant/30 mx-auto mt-4 mb-2"></div>
            <p className="font-body-sm text-xs text-outline">Garment Factory Management & Weaving Platform</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block font-body-sm text-xs text-on-surface font-semibold mb-2" htmlFor="email">
                Email or Operator Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline-variant">
                  <Mail className="w-4 h-4 text-outline" />
                </div>
                <input
                  id="email"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-natural-beige rounded bg-surface-container-lowest text-on-surface font-body-md text-xs needle-focus transition-all duration-200"
                  placeholder="weaver@asgardlabs.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block font-body-sm text-xs text-on-surface font-semibold" htmlFor="password">
                  Password
                </label>
                <a href="#" className="font-body-sm text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline-variant">
                  <Lock className="w-4 h-4 text-outline" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-natural-beige rounded bg-surface-container-lowest text-on-surface font-body-md text-xs needle-focus transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-natural-beige text-primary focus:ring-primary"
              />
              <label htmlFor="remember-me" className="ml-2 block font-body-sm text-xs text-on-surface-variant">
                Remember me on this workstation
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded bg-primary text-on-primary font-body-md text-xs font-bold hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 shadow-md"
              >
                <LogIn className="mr-2 w-4 h-4" />
                <span>Enter Asgard Production Hub</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-surface-container-low py-4 px-8 border-t border-natural-beige text-center">
          <p className="font-body-sm text-[11px] text-outline">
            © 2026 Asgard Labs. Indigo Loom Platform. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
