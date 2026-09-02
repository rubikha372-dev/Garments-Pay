'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Users,
  Award,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Factory,
  Zap,
  Star
} from 'lucide-react';
import { INITIAL_WORKERS } from '@/lib/data';

export default function WorkerProfilePage() {
  const params = useParams();
  const workerId = (params?.id as string) || 'W-101';
  const worker = INITIAL_WORKERS.find((w) => w.id === workerId) || INITIAL_WORKERS[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back Link */}
      <div>
        <Link
          href="/skills"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Skill-Gap Matrix</span>
        </Link>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-6 md:p-8 shadow-md texture-bg relative overflow-hidden">
        <div className="h-2 bg-primary absolute top-0 left-0 right-0"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-primary text-on-primary font-bold text-xl flex items-center justify-center border-2 border-natural-beige shadow-sm">
              {worker.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-headline-md text-2xl text-primary font-bold">{worker.name}</h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded font-data-mono">
                  {worker.skillGrade.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-outline mt-0.5">{worker.role} • {worker.code}</p>
              <div className="flex items-center space-x-4 text-xs text-on-surface-variant mt-2 font-data-mono">
                <span>Assigned: <strong className="text-primary">{worker.loomAssigned}</strong></span>
                <span>Shift: <strong>{worker.shift}</strong></span>
                <span>Joined: <strong>{worker.joinDate}</strong></span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container p-4 rounded-lg border border-natural-beige flex items-center space-x-4 text-center">
            <div>
              <span className="text-[10px] font-label-caps uppercase text-outline block">Overall Skill</span>
              <span className="font-headline-md text-2xl font-bold text-primary font-data-mono">{worker.skillScore}%</span>
            </div>
            <div className="h-8 w-[1px] bg-natural-beige"></div>
            <div>
              <span className="text-[10px] font-label-caps uppercase text-outline block">Quality Rating</span>
              <span className="font-headline-md text-2xl font-bold text-emerald-700 font-data-mono flex items-center gap-1 justify-center">
                {worker.qualityRating} <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Statistics & Skill Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest border border-natural-beige p-5 rounded-lg shadow-sm">
          <span className="text-xs font-label-caps uppercase text-outline font-semibold">Total Meterage Output</span>
          <p className="font-headline-md text-3xl font-bold text-primary mt-2 font-data-mono">
            {worker.totalMetersProduced.toLocaleString()} m
          </p>
          <p className="text-xs text-emerald-700 mt-1 font-medium">Top 5% Factory Producer</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest border border-natural-beige p-5 rounded-lg shadow-sm">
          <span className="text-xs font-label-caps uppercase text-outline font-semibold">Average Shift Efficiency</span>
          <p className="font-headline-md text-3xl font-bold text-primary mt-2 font-data-mono">
            {worker.avgEfficiency}%
          </p>
          <p className="text-xs text-emerald-700 mt-1 font-medium">+3.2% above target</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest border border-natural-beige p-5 rounded-lg shadow-sm">
          <span className="text-xs font-label-caps uppercase text-outline font-semibold">Shift Attendance Record</span>
          <p className="font-headline-md text-3xl font-bold text-emerald-700 mt-2 font-data-mono">
            {worker.attendancePct}%
          </p>
          <p className="text-xs text-outline mt-1 font-medium">Zero unscheduled absences</p>
        </div>
      </div>

      {/* Certifications & Badges */}
      <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-6 shadow-sm space-y-4">
        <h3 className="font-headline-sm text-lg text-primary font-bold flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" /> Active Weaving Certifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {worker.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-3 rounded border border-natural-beige bg-surface-container-low flex items-center space-x-3"
            >
              <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-on-surface">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
