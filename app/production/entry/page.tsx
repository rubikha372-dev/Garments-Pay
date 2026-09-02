'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  PenSquare,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Calculator,
  Save,
  Clock,
  Sparkles
} from 'lucide-react';
import { INITIAL_LOOMS, ProductionShiftLog } from '@/lib/data';

export default function ShiftEntryPage() {
  const router = useRouter();
  const [selectedLoom, setSelectedLoom] = useState('Loom-01');
  const [operatorName, setOperatorName] = useState('Rajesh Kumar');
  const [shift, setShift] = useState<'Shift A (Morning)' | 'Shift B (Evening)' | 'Shift C (Night)'>('Shift A (Morning)');
  const [warpBatch, setWarpBatch] = useState('IND-2026-095');
  const [fabricType, setFabricType] = useState('30s Combed Cotton Indigo');
  const [targetMeters, setTargetMeters] = useState(500);
  const [actualMeters, setActualMeters] = useState(485);
  const [defectsCount, setDefectsCount] = useState(3);
  const [downtimeMins, setDowntimeMins] = useState(10);
  const [downtimeReason, setDowntimeReason] = useState('Warp Knot Reset');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  // Live calculation
  const calculatedEfficiency = targetMeters > 0 ? ((actualMeters / targetMeters) * 100).toFixed(1) : '0.0';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build new log entry
    const newLog: ProductionShiftLog = {
      id: `LOG-${Math.floor(9100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      shift,
      loomCode: selectedLoom,
      operatorName,
      warpBatch,
      fabricType,
      targetMeters,
      actualMeters,
      defectsCount,
      downtimeMins,
      downtimeReason,
      efficiency: parseFloat(calculatedEfficiency),
      status: 'PENDING',
    };

    // Persist to localStorage so Production Logs page can pick it up
    try {
      const existing = JSON.parse(localStorage.getItem('asgard_shift_logs') || '[]');
      localStorage.setItem('asgard_shift_logs', JSON.stringify([newLog, ...existing]));
    } catch {
      // localStorage unavailable — silently skip
    }

    setSubmittedId(newLog.id);
    setIsSubmitted(true);

    // Redirect to logs page after 2.5 seconds
    setTimeout(() => {
      router.push('/production');
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/production"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Production Logs</span>
        </Link>
        <span className="font-data-mono text-xs text-outline bg-surface-container px-2.5 py-1 rounded border border-natural-beige">
          Form ID: ENTRY-{Math.floor(1000 + Math.random() * 9000)}
        </span>
      </div>

      {/* Main Form Container */}
      <div className="bg-surface-container-lowest border border-natural-beige rounded-lg shadow-md overflow-hidden texture-bg">
        <div className="h-2 bg-primary w-full"></div>

        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h1 className="font-headline-md text-2xl text-primary font-bold tracking-tight">
              Shift Production Entry Log
            </h1>
            <p className="font-body-sm text-xs text-on-surface-variant mt-1">
              Enter official loom meterage, warp batch details, and downtime logs for validation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success Banner */}
            {isSubmitted && (
              <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-4 rounded flex items-center space-x-3 text-xs animate-in fade-in duration-300 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                <div>
                  <p className="font-bold">Shift Log Recorded Successfully! ({submittedId})</p>
                  <p className="text-[11px] text-emerald-800">
                    Data submitted for {selectedLoom} with calculated efficiency of {calculatedEfficiency}%. Redirecting to Production Logs…
                  </p>
                </div>
              </div>
            )}

            {/* Grid 1: Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-label-caps uppercase text-on-surface font-semibold mb-1.5">
                  Select Loom Unit *
                </label>
                <select
                  value={selectedLoom}
                  onChange={(e) => setSelectedLoom(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface-container-lowest border border-natural-beige rounded needle-focus text-on-surface font-semibold"
                >
                  {INITIAL_LOOMS.map((l) => (
                    <option key={l.id} value={l.code}>
                      {l.code} ({l.model})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-label-caps uppercase text-on-surface font-semibold mb-1.5">
                  Operator Name / ID *
                </label>
                <input
                  type="text"
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-surface-container-lowest border border-natural-beige rounded needle-focus text-on-surface"
                  placeholder="e.g. Rajesh Kumar (W-101)"
                />
              </div>

              <div>
                <label className="block text-xs font-label-caps uppercase text-on-surface font-semibold mb-1.5">
                  Production Shift *
                </label>
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value as 'Shift A (Morning)' | 'Shift B (Evening)' | 'Shift C (Night)')}
                  className="w-full px-3 py-2 text-xs bg-surface-container-lowest border border-natural-beige rounded needle-focus text-on-surface font-medium"
                >
                  <option value="Shift A (Morning)">Shift A (Morning 06:00 - 14:00)</option>
                  <option value="Shift B (Evening)">Shift B (Evening 14:00 - 22:00)</option>
                  <option value="Shift C (Night)">Shift C (Night 22:00 - 06:00)</option>
                </select>
              </div>
            </div>

            {/* Grid 2: Batch & Fabric details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-label-caps uppercase text-on-surface font-semibold mb-1.5">
                  Warp Batch Code *
                </label>
                <input
                  type="text"
                  value={warpBatch}
                  onChange={(e) => setWarpBatch(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs font-data-mono bg-surface-container-lowest border border-natural-beige rounded needle-focus text-on-surface"
                />
              </div>

              <div>
                <label className="block text-xs font-label-caps uppercase text-on-surface font-semibold mb-1.5">
                  Fabric Weave / Material
                </label>
                <input
                  type="text"
                  value={fabricType}
                  onChange={(e) => setFabricType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface-container-lowest border border-natural-beige rounded needle-focus text-on-surface"
                />
              </div>
            </div>

            {/* Grid 3: Output & Meterage Real-time Math */}
            <div className="p-4 bg-surface-container-low rounded border border-natural-beige space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-label-caps uppercase text-primary font-bold tracking-wider flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-primary" /> Output & Efficiency Math
                </span>
                <span className="text-xs font-data-mono font-bold text-primary bg-surface-container-lowest px-2 py-0.5 rounded border border-natural-beige">
                  Calculated Efficiency: {calculatedEfficiency}%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] text-outline mb-1 font-medium">Target Meters (m)</label>
                  <input
                    type="number"
                    value={targetMeters}
                    onChange={(e) => setTargetMeters(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-data-mono font-bold bg-surface-container-lowest border border-natural-beige rounded needle-focus"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-outline mb-1 font-medium">Actual Output (m)</label>
                  <input
                    type="number"
                    value={actualMeters}
                    onChange={(e) => setActualMeters(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-data-mono font-bold text-primary bg-surface-container-lowest border border-natural-beige rounded needle-focus"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-outline mb-1 font-medium">Defects Count</label>
                  <input
                    type="number"
                    value={defectsCount}
                    onChange={(e) => setDefectsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-data-mono font-bold text-textile-red bg-surface-container-lowest border border-natural-beige rounded needle-focus"
                  />
                </div>
              </div>
            </div>

            {/* Grid 4: Downtime & Remarks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-label-caps uppercase text-on-surface font-semibold mb-1.5">
                  Downtime Duration (mins)
                </label>
                <input
                  type="number"
                  value={downtimeMins}
                  onChange={(e) => setDowntimeMins(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-data-mono bg-surface-container-lowest border border-natural-beige rounded needle-focus"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-label-caps uppercase text-on-surface font-semibold mb-1.5">
                  Primary Downtime Reason
                </label>
                <input
                  type="text"
                  value={downtimeReason}
                  onChange={(e) => setDowntimeReason(e.target.value)}
                  placeholder="e.g. Warp stop, beam change, maintenance check..."
                  className="w-full px-3 py-2 text-xs bg-surface-container-lowest border border-natural-beige rounded needle-focus"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-natural-beige flex items-center justify-end space-x-3">
              <Link
                href="/production"
                className="px-4 py-2 text-xs text-outline hover:text-on-surface font-semibold transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitted}
                className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded text-xs font-bold shadow-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitted ? 'Success! Recorded' : 'Submit Production Record'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
