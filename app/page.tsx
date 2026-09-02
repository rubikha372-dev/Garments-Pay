'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Factory,
  Activity,
  AlertTriangle,
  TrendingUp,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  SlidersHorizontal,
  PenSquare,
  FileSpreadsheet,
  Award,
  ChevronRight,
  RefreshCw,
  Zap,
  Users,
  Wallet
} from 'lucide-react';
import { INITIAL_LOOMS, INITIAL_SHIFT_LOGS, INITIAL_WORKERS, INITIAL_PAYOUTS, Loom } from '@/lib/data';

export default function DashboardPage() {
  const [looms, setLooms] = useState<Loom[]>(INITIAL_LOOMS);
  const [selectedShift, setSelectedShift] = useState('ALL');

  const runningCount = looms.filter((l) => l.status === 'RUNNING').length;
  const maintenanceCount = looms.filter((l) => l.status === 'MAINTENANCE').length;
  const idleCount = looms.filter((l) => l.status === 'IDLE' || l.status === 'QUALITY_CHECK').length;

  const totalOutput = looms.reduce((acc, curr) => acc + curr.outputMeters, 0);
  const totalTarget = looms.reduce((acc, curr) => acc + curr.targetMeters, 0);
  const avgEfficiency = (
    looms.filter((l) => l.status === 'RUNNING').reduce((acc, c) => acc + c.efficiency, 0) /
    (runningCount || 1)
  ).toFixed(1);

  const totalPayoutSum = INITIAL_PAYOUTS.reduce((acc, curr) => acc + curr.totalPayout, 0);
  const approvedPayoutSum = INITIAL_PAYOUTS
    .filter((p) => p.status === 'APPROVED' || p.status === 'PAID')
    .reduce((acc, curr) => acc + curr.totalPayout, 0);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-outline mb-1 font-label-caps uppercase tracking-wider">
            <span>Factory Floor A</span>
            <span>•</span>
            <span className="text-primary font-semibold">Morning Shift (06:00 - 14:00)</span>
          </div>
          <h1 className="font-headline-md text-2xl md:text-3xl text-primary font-bold tracking-tight">
            Asgard Production Hub
          </h1>
          <p className="font-body-sm text-sm text-on-surface-variant mt-1">
            Real-time weaving fleet monitoring, skill utilization, and batch quality tracking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/production/entry"
            className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded text-xs font-semibold shadow-sm transition-colors"
          >
            <PenSquare className="w-4 h-4" />
            <span>New Shift Entry</span>
          </Link>
          <Link
            href="/excel/import"
            className="inline-flex items-center space-x-2 bg-surface-container-lowest border border-primary/30 text-primary hover:bg-primary/5 px-4 py-2 rounded text-xs font-semibold transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Excel Batch Import</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest border border-natural-beige p-5 rounded-lg shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-label-caps uppercase text-outline font-semibold tracking-wider">
              Shift Production
            </span>
            <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center">
              <Factory className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-headline-md text-3xl font-bold text-primary font-data-mono">{totalOutput.toLocaleString()}</span>
            <span className="text-xs text-outline ml-1.5 font-data-mono">/ {totalTarget.toLocaleString()} m</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-natural-beige/60">
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +4.8% vs target
            </span>
            <span className="text-outline text-[11px]">88.5% Target Met</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest border border-natural-beige p-5 rounded-lg shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-label-caps uppercase text-outline font-semibold tracking-wider">
              Fleet Status
            </span>
            <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="font-headline-md text-3xl font-bold text-on-surface font-data-mono">{runningCount}</span>
            <span className="text-xs text-outline font-data-mono">/ {looms.length} Looms Active</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-natural-beige/60">
            <span className="text-amber-700 font-medium">{maintenanceCount} Maintenance</span>
            <span className="text-outline text-[11px]">{idleCount} Idle / QC</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest border border-natural-beige p-5 rounded-lg shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-label-caps uppercase text-outline font-semibold tracking-wider">
              Avg Fleet Efficiency
            </span>
            <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-800 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-headline-md text-3xl font-bold text-primary font-data-mono">{avgEfficiency}%</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-natural-beige/60">
            <span className="text-emerald-700 font-medium">+2.2% above standard</span>
            <span className="text-outline text-[11px]">Benchmark: 92%</span>
          </div>
        </div>

        {/* Metric 4 — Defect Rate */}
        <div className="bg-surface-container-lowest border border-natural-beige p-5 rounded-lg shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-label-caps uppercase text-outline font-semibold tracking-wider">
              Defect Rate
            </span>
            <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-headline-md text-3xl font-bold text-emerald-700 font-data-mono">0.94%</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-natural-beige/60">
            <span className="text-emerald-700 font-medium">Optimal (&lt; 1.5%)</span>
            <span className="text-outline text-[11px]">18 Total Defects</span>
          </div>
        </div>

        {/* Metric 5 — Payout Summary (fixes TC002) */}
        <Link
          href="/payouts"
          className="bg-surface-container-lowest border border-natural-beige p-5 rounded-lg shadow-sm relative overflow-hidden hover:border-primary/50 transition-all group block"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-label-caps uppercase text-outline font-semibold tracking-wider">
              Cycle Payroll
            </span>
            <div className="w-8 h-8 rounded bg-amber-100 text-amber-900 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-headline-md text-3xl font-bold text-primary font-data-mono">₹{(totalPayoutSum / 1000).toFixed(1)}K</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-natural-beige/60">
            <span className="text-emerald-700 font-medium">₹{(approvedPayoutSum / 1000).toFixed(1)}K Approved</span>
            <span className="text-outline text-[11px] group-hover:text-primary">View Ledger →</span>
          </div>
        </Link>
      </div>

      {/* Fleet Monitoring & Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-headline-sm text-xl text-primary font-bold">Live Loom Fleet Monitor</h2>
            <p className="text-xs text-outline">Real-time status, weaving speed, and assigned master operators.</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLooms([...INITIAL_LOOMS])}
              className="p-1.5 rounded border border-natural-beige bg-surface-container-lowest hover:bg-surface-container-low text-outline hover:text-primary transition-colors text-xs flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <Link
              href="/production"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              View Full Logs <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Loom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {looms.map((loom) => {
            const isRunning = loom.status === 'RUNNING';
            const isMaint = loom.status === 'MAINTENANCE';
            const isQC = loom.status === 'QUALITY_CHECK';

            return (
              <div
                key={loom.id}
                className="bg-surface-container-lowest border border-natural-beige rounded-lg p-4 shadow-sm hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center justify-between border-b border-natural-beige pb-3">
                  <div>
                    <h3 className="font-headline-sm text-base text-primary font-bold group-hover:text-primary-container">
                      {loom.code}
                    </h3>
                    <p className="text-[11px] text-outline truncate max-w-[140px]">{loom.model}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider font-label-caps ${
                      isRunning
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isMaint
                        ? 'bg-red-100 text-textile-red border border-red-300 animate-pulse'
                        : isQC
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {loom.status}
                  </span>
                </div>

                <div className="py-3 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-outline">Operator:</span>
                    <span className="font-semibold text-on-surface">{loom.operatorName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-outline">Fabric Batch:</span>
                    <span className="font-data-mono text-[11px] bg-surface-container px-1.5 py-0.5 rounded border border-natural-beige">
                      {loom.yarnType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-outline">Speed RPM:</span>
                    <span className="font-data-mono font-bold text-primary">{loom.speedRpm} RPM</span>
                  </div>

                  {/* Efficiency Progress Bar */}
                  <div className="pt-1">
                    <div className="flex justify-between text-[11px] mb-1 font-data-mono">
                      <span className="text-outline">Efficiency</span>
                      <span className="font-semibold text-primary">{loom.efficiency}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          loom.efficiency > 90
                            ? 'bg-emerald-600'
                            : loom.efficiency > 80
                            ? 'bg-indigo-600'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${loom.efficiency}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-natural-beige/60 flex items-center justify-between text-[11px]">
                  <span className="text-outline">Output Today:</span>
                  <span className="font-data-mono font-bold text-on-surface">{loom.outputMeters} m</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Production Analytics & Quick Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Shift Submissions & Alerts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shift Submissions Table */}
          <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-lg text-primary font-bold">Recent Shift Logs</h3>
                <p className="text-xs text-outline">Verified output submissions from shift operators.</p>
              </div>
              <Link href="/production" className="text-xs text-primary font-semibold hover:underline">
                View All Logs
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary/30 bg-surface-container-low font-label-caps text-outline uppercase tracking-wider">
                    <th className="p-3">Log ID</th>
                    <th className="p-3">Loom & Operator</th>
                    <th className="p-3">Warp Batch</th>
                    <th className="p-3 text-right">Actual / Target</th>
                    <th className="p-3 text-right">Efficiency</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-natural-beige/50">
                  {INITIAL_SHIFT_LOGS.map((log) => (
                    <tr key={log.id} className="hover:bg-surface-container-low/60 transition-colors">
                      <td className="p-3 font-data-mono font-semibold text-primary">{log.id}</td>
                      <td className="p-3">
                        <div className="font-semibold text-on-surface">{log.loomCode}</div>
                        <div className="text-[11px] text-outline">{log.operatorName}</div>
                      </td>
                      <td className="p-3 font-data-mono text-[11px] text-on-surface-variant">{log.warpBatch}</td>
                      <td className="p-3 text-right font-data-mono">
                        <span className="font-bold text-on-surface">{log.actualMeters}</span>
                        <span className="text-outline"> / {log.targetMeters}m</span>
                      </td>
                      <td className="p-3 text-right font-data-mono font-bold text-emerald-700">{log.efficiency}%</td>
                      <td className="p-3 text-center">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            log.status === 'VERIFIED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: Quick Actions & Skill Spotlight */}
        <div className="space-y-6">
          {/* Quick Action Navigation Card */}
          <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-5 shadow-sm space-y-4 texture-bg">
            <h3 className="font-headline-sm text-base text-primary font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" /> Quick Workflow Actions
            </h3>

            <div className="space-y-2">
              <Link
                href="/excel/import"
                className="group flex items-center justify-between p-3 rounded bg-surface-container-lowest border border-natural-beige hover:border-primary transition-all shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary group-hover:text-primary-container">Import Excel Batch</h4>
                    <p className="text-[11px] text-outline">Validate & upload shift spreadsheets</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-outline group-hover:text-primary" />
              </Link>

              <Link
                href="/skills"
                className="group flex items-center justify-between p-3 rounded bg-surface-container-lowest border border-natural-beige hover:border-primary transition-all shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-800 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary group-hover:text-primary-container">Skill-Gap Analysis</h4>
                    <p className="text-[11px] text-outline">Review operator proficiency scores</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-outline group-hover:text-primary" />
              </Link>

              <Link
                href="/payouts"
                className="group flex items-center justify-between p-3 rounded bg-surface-container-lowest border border-natural-beige hover:border-primary transition-all shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-amber-100 text-amber-900 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary group-hover:text-primary-container">Group Payout Ledger</h4>
                    <p className="text-[11px] text-outline">Approve piece-rate worker earnings</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-outline group-hover:text-primary" />
              </Link>
            </div>
          </div>

          {/* Master Weaver Spotlight Card */}
          <div className="bg-primary text-on-primary rounded-lg p-5 shadow-sm space-y-3 relative overflow-hidden border border-natural-beige">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-label-caps uppercase text-surface-container-highest tracking-wider">
                Shift Top Operator
              </span>
              <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">98.5% Eff.</span>
            </div>

            <div>
              <h4 className="font-headline-sm text-lg font-bold text-white">Sunita Verma</h4>
              <p className="text-xs text-surface-container-high">Loom-04 Specialist • Master Weaver Grade</p>
            </div>

            <div className="pt-2 border-t border-white/20 flex justify-between text-xs text-surface-container-highest">
              <span>Shift Output: 512 meters</span>
              <span>Defects: 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
