'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Factory,
  PenSquare,
  Award,
  Wallet,
  FileSpreadsheet,
  Users,
  Search,
  Bell,
  Activity,
  Menu,
  X,
  SlidersHorizontal,
  ChevronDown,
  LogOut,
  Sparkles
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // If on login page, render full screen without layout
  if (pathname === '/login') {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Overview Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Daily Production Log', href: '/production', icon: Factory },
    { label: 'Shift & Production Entry', href: '/production/entry', icon: PenSquare },
    { label: 'Skill-Gap Matrix', href: '/skills', icon: Award },
    { label: 'Group Payout Ledger & Payout totals', href: '/payouts', icon: Wallet },
    { label: 'Excel Batch Import', href: '/excel/import', icon: FileSpreadsheet, badge: 'Wizard' },
    { label: 'Worker Skill Profile', href: '/workers/W-101', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row font-body-md text-on-surface">
      {/* Mobile Top Navbar */}
      <div className="md:hidden bg-primary text-on-primary px-4 py-3 flex items-center justify-between border-b border-natural-beige/20 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center border border-natural-beige/30">
            <span className="material-symbols-outlined text-lg">precision_manufacturing</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-base text-on-primary leading-tight font-bold tracking-tight">ASGARD LABS</h1>
            <p className="text-[10px] text-surface-container-highest tracking-widest uppercase">Production Hub</p>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded hover:bg-primary-container text-on-primary"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-72 bg-surface-container-lowest border-r border-natural-beige flex flex-col transition-transform duration-300 md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-6 border-b border-natural-beige texture-bg relative">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center shadow-sm border border-natural-beige">
              <span className="material-symbols-outlined text-2xl">precision_manufacturing</span>
            </div>
            <div>
              <h1 className="font-headline-md text-lg text-primary font-bold tracking-tight">ASGARD LABS</h1>
              <p className="font-label-caps text-[11px] text-on-surface-variant tracking-wider uppercase font-semibold">PRODUCTION HUB</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-outline pt-2 border-t border-natural-beige/50">
            <span className="inline-flex items-center gap-1 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Loom Network Active
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-label-caps uppercase text-outline tracking-wider font-semibold">
            Operations & Fleet
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`group relative flex items-center justify-between px-3 py-2.5 rounded text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-on-primary' : 'text-outline group-hover:text-primary'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      isActive ? 'bg-surface-container-lowest text-primary' : 'bg-primary/10 text-primary border border-primary/20'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {/* Active Stitch Pattern Line */}
                {isActive && (
                  <div className="absolute left-0 top-1 bottom-1 w-1 bg-natural-beige rounded-r" />
                )}
              </Link>
            );
          })}

          <div className="pt-6 px-3 pb-2 text-[11px] font-label-caps uppercase text-outline tracking-wider font-semibold">
            System & Previews
          </div>

          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded text-sm text-outline hover:bg-surface-container-low hover:text-primary transition-colors"
          >
            <div className="flex items-center space-x-3">
              <LogOut className="w-4 h-4 text-outline" />
              <span>Login Screen</span>
            </div>
            <span className="text-[10px] text-outline font-data-mono">Auth</span>
          </Link>
        </nav>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-natural-beige bg-surface-container-low">
          <div className="bg-surface-container-lowest p-3 rounded border border-natural-beige flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">
                RK
              </div>
              <div>
                <p className="text-xs font-semibold text-on-surface leading-snug">Rajesh Kumar</p>
                <p className="text-[10px] text-outline font-data-mono">Master Weaver (W-101)</p>
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Online"></span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-surface-container-lowest border-b border-natural-beige px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          {/* Left: Quick Search */}
          <div className="flex items-center space-x-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                placeholder="Search Loom ID, Worker Code, Warp Batch..."
                className="w-full pl-9 pr-12 py-1.5 text-xs bg-surface-container-low border border-natural-beige rounded text-on-surface placeholder:text-outline needle-focus transition-all"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-data-mono text-[10px] text-outline border border-natural-beige bg-surface-container-lowest px-1.5 py-0.5 rounded">
                Ctrl+K
              </span>
            </div>
          </div>

          {/* Right: Fleet Health, Notifications, User */}
          <div className="flex items-center space-x-4">
            {/* Active Shift & Fleet Status Pill */}
            <div className="hidden lg:flex items-center space-x-2 bg-surface-container border border-natural-beige px-3 py-1 rounded text-xs">
              <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="font-medium text-on-surface">14/16 Looms Running</span>
              <span className="text-outline">|</span>
              <span className="font-data-mono text-primary font-semibold">94.2% Fleet Eff.</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded hover:bg-surface-container-low text-on-surface-variant transition-colors border border-natural-beige/50"
              >
                <Bell className="w-4 h-4 text-primary" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-textile-red ring-2 ring-white"></span>
              </button>

              {/* Notification Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest border border-natural-beige rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-natural-beige flex items-center justify-between">
                    <h3 className="text-xs font-bold text-primary tracking-wide uppercase font-label-caps">Production Alerts</h3>
                    <span className="text-[10px] bg-error-container text-on-error-container px-1.5 py-0.5 rounded font-semibold">
                      2 Urgent
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-natural-beige/40">
                    <div className="p-3 hover:bg-surface-container-low text-xs cursor-pointer">
                      <div className="flex items-center justify-between text-textile-red font-semibold mb-1">
                        <span>Loom-05 Stopped</span>
                        <span className="font-data-mono text-[10px] text-outline">10m ago</span>
                      </div>
                      <p className="text-on-surface-variant">Maintenance stop required: Warp Tension Let-Off recalibration.</p>
                    </div>
                    <div className="p-3 hover:bg-surface-container-low text-xs cursor-pointer">
                      <div className="flex items-center justify-between text-amber-700 font-semibold mb-1">
                        <span>Skill Gap Threshold Alert</span>
                        <span className="font-data-mono text-[10px] text-outline">45m ago</span>
                      </div>
                      <p className="text-on-surface-variant">Air-Jet Weft Timing proficiency dropped below 70% in Shift B.</p>
                    </div>
                  </div>
                  <div className="p-2 border-t border-natural-beige text-center">
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Dismiss all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Shift Selector */}
            <div className="hidden sm:flex items-center space-x-2 text-xs border-l border-natural-beige pl-4">
              <span className="text-outline font-label-caps uppercase text-[10px]">Current Shift:</span>
              <span className="bg-primary/10 text-primary border border-primary/20 font-medium px-2 py-0.5 rounded font-data-mono">
                Morning (Shift A)
              </span>
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
