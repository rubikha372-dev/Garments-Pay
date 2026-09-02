'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Users,
  Search,
  BookOpen,
  ChevronRight,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { INITIAL_SKILL_GAPS, INITIAL_WORKERS, SkillGapItem } from '@/lib/data';

export default function SkillGapPage() {
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>(INITIAL_SKILL_GAPS);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const criticalCount = skillGaps.filter((s) => s.status === 'CRITICAL').length;
  const totalWorkers = INITIAL_WORKERS.length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 texture-bg">
        <div>
          <div className="flex items-center space-x-2 text-xs text-outline mb-1 font-label-caps uppercase tracking-wider">
            <span>Workforce Management</span>
            <span>•</span>
            <span className="text-primary font-semibold">Skill Gap Matrix</span>
          </div>
          <h1 className="font-headline-md text-2xl md:text-3xl text-primary font-bold tracking-tight">
            Worker Skill-Gap Dashboard
          </h1>
          <p className="font-body-sm text-sm text-on-surface-variant mt-1">
            Identify machine operation bottlenecks, upskilling needs, and weaving mastery metrics.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-surface-container-lowest p-3 rounded border border-natural-beige flex items-center space-x-3 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-xs font-bold text-on-surface block font-data-mono">
                {totalWorkers} Certified Technicians
              </span>
              <span className="text-[11px] text-emerald-700 font-medium">92.4% Fleet Skill Match</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grade Distribution Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest border border-natural-beige p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center text-xs">
            <span className="font-label-caps uppercase text-outline font-semibold">Master Weavers</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded font-data-mono">
              Grade 4
            </span>
          </div>
          <p className="font-headline-md text-2xl font-bold text-primary mt-2 font-data-mono">2</p>
          <p className="text-[11px] text-outline mt-1">Rajesh Kumar, Sunita Verma</p>
        </div>

        <div className="bg-surface-container-lowest border border-natural-beige p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center text-xs">
            <span className="font-label-caps uppercase text-outline font-semibold">Grade A Operators</span>
            <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded font-data-mono">
              Grade 3
            </span>
          </div>
          <p className="font-headline-md text-2xl font-bold text-primary mt-2 font-data-mono">2</p>
          <p className="text-[11px] text-outline mt-1">Priya Sharma, Vikram Singh</p>
        </div>

        <div className="bg-surface-container-lowest border border-natural-beige p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center text-xs">
            <span className="font-label-caps uppercase text-outline font-semibold">Grade B Operators</span>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded font-data-mono">
              Grade 2
            </span>
          </div>
          <p className="font-headline-md text-2xl font-bold text-primary mt-2 font-data-mono">2</p>
          <p className="text-[11px] text-outline mt-1">Amitabh Patel, Ananya Roy</p>
        </div>

        <div className="bg-surface-container-lowest border border-natural-beige p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center text-xs">
            <span className="font-label-caps uppercase text-outline font-semibold">Skill Deficits</span>
            <span className="text-xs bg-red-100 text-textile-red font-bold px-2 py-0.5 rounded font-data-mono">
              Action Req.
            </span>
          </div>
          <p className="font-headline-md text-2xl font-bold text-textile-red mt-2 font-data-mono">{criticalCount}</p>
          <p className="text-[11px] text-outline mt-1">Air-Jet Weft Pneumatics Module</p>
        </div>
      </div>

      {/* Main Skill Gap Analysis Table & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Matrix Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-lg text-primary font-bold">Skill Competency Matrix</h3>
                <p className="text-xs text-outline">Target score benchmarks vs current floor proficiency.</p>
              </div>
              <span className="text-xs text-outline font-data-mono">Updated Today</span>
            </div>

            <div className="space-y-4">
              {skillGaps.map((item) => {
                const isCritical = item.status === 'CRITICAL';
                const gap = item.targetScore - item.currentAvgScore;

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-lg border border-natural-beige bg-surface-container-lowest hover:border-primary/50 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-primary">{item.category}</h4>
                        <span className="text-[11px] text-outline">Required: {item.requiredLevel}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded font-label-caps uppercase ${
                          isCritical
                            ? 'bg-red-100 text-textile-red border border-red-300'
                            : item.status === 'MODERATE'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-data-mono mb-1">
                        <span className="text-outline">Current Floor Score: {item.currentAvgScore}%</span>
                        <span className="font-bold text-primary">Target: {item.targetScore}%</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isCritical ? 'bg-textile-red' : item.status === 'MODERATE' ? 'bg-amber-600' : 'bg-emerald-600'
                          }`}
                          style={{ width: `${item.currentAvgScore}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-natural-beige/60">
                      <span className="text-outline text-[11px]">{item.workersAffected} Operators require upskilling</span>
                      <span className="text-xs font-semibold text-primary flex items-center gap-1">
                        Recommended: {item.recommendedTraining}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Individual Roster & Quick Profile */}
        <div className="space-y-6">
          <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-natural-beige pb-3">
              <h3 className="font-headline-sm text-base text-primary font-bold">Technician Roster</h3>
              <Link href="/workers/W-101" className="text-xs text-primary font-semibold hover:underline">
                View Profiles
              </Link>
            </div>

            <div className="space-y-3">
              {INITIAL_WORKERS.map((worker) => (
                <Link
                  key={worker.id}
                  href={`/workers/${worker.id}`}
                  className="group flex items-center justify-between p-3 rounded border border-natural-beige hover:border-primary transition-all bg-surface-container-low/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary font-bold flex items-center justify-center text-xs">
                      {worker.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-on-surface group-hover:text-primary">{worker.name}</h4>
                      <p className="text-[10px] text-outline font-data-mono">{worker.code} • {worker.loomAssigned}</p>
                    </div>
                  </div>
                  <div className="text-right font-data-mono">
                    <span className="text-xs font-bold text-primary block">{worker.skillScore}%</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">{worker.skillGrade.replace('_', ' ')}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
