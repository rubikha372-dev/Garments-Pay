'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Wallet,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Search,
  DollarSign,
  ShieldCheck,
  Building,
  X,
  Calendar
} from 'lucide-react';
import { INITIAL_PAYOUTS, PayoutRecord } from '@/lib/data';

export default function PayoutLedgerPage() {
  const [payouts, setPayouts] = useState<PayoutRecord[]>(INITIAL_PAYOUTS);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterPeriod, setFilterPeriod] = useState('ALL');
  const [selectedPayout, setSelectedPayout] = useState<PayoutRecord | null>(null);

  const totalPayoutSum = payouts.reduce((acc, curr) => acc + curr.totalPayout, 0);
  const approvedSum = payouts
    .filter((p) => p.status === 'APPROVED' || p.status === 'PAID')
    .reduce((acc, curr) => acc + curr.totalPayout, 0);
  const pendingSum = payouts
    .filter((p) => p.status === 'PENDING_APPROVAL')
    .reduce((acc, curr) => acc + curr.totalPayout, 0);

  const toggleApproval = (id: string) => {
    setPayouts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'APPROVED' ? 'PENDING_APPROVAL' : 'APPROVED' }
          : p
      )
    );
    // Also update selected payout if open
    if (selectedPayout?.id === id) {
      setSelectedPayout((prev) =>
        prev
          ? { ...prev, status: prev.status === 'APPROVED' ? 'PENDING_APPROVAL' : 'APPROVED' }
          : null
      );
    }
  };

  // Get unique pay periods from data
  const payPeriods = Array.from(new Set(payouts.map((p) => p.payPeriod))).sort();

  const filteredPayouts = payouts.filter((p) => {
    const matchesStatus = filterStatus === 'ALL' || p.status === filterStatus;
    const matchesPeriod = filterPeriod === 'ALL' || p.payPeriod === filterPeriod;
    return matchesStatus && matchesPeriod;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 texture-bg">
        <div>
          <div className="flex items-center space-x-2 text-xs text-outline mb-1 font-label-caps uppercase tracking-wider">
            <span>Financial Operations</span>
            <span>•</span>
            <span className="text-primary font-semibold">Group Payout Ledger</span>
          </div>
          <h1 className="font-headline-md text-2xl md:text-3xl text-primary font-bold tracking-tight">
            Group Payout Ledger
          </h1>
          <p className="font-body-sm text-sm text-on-surface-variant mt-1">
            Piece-rate wage calculation, quality performance incentives, and group efficiency bonuses.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-surface-container-lowest p-3 rounded border border-natural-beige flex items-center space-x-4 shadow-sm font-data-mono">
            <div>
              <span className="text-[10px] text-outline uppercase block">Total Cycle Payroll</span>
              <span className="font-headline-md text-xl font-bold text-primary">₹{totalPayoutSum.toLocaleString()}</span>
            </div>
            <div className="h-8 w-[1px] bg-natural-beige"></div>
            <div>
              <span className="text-[10px] text-outline uppercase block">Approved</span>
              <span className="font-headline-md text-xl font-bold text-emerald-700">₹{approvedSum.toLocaleString()}</span>
            </div>
            <div className="h-8 w-[1px] bg-natural-beige"></div>
            <div>
              <span className="text-[10px] text-outline uppercase block">Pending</span>
              <span className="font-headline-md text-xl font-bold text-amber-700">₹{pendingSum.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar — fixes TC011, TC015 */}
      <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Pay Period Filter */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-outline" />
            <label className="text-xs font-label-caps text-outline uppercase font-semibold">Pay Period:</label>
            <select
              aria-label="Pay period filter"
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="px-3 py-1.5 text-xs bg-surface-container-low border border-natural-beige rounded text-on-surface font-semibold needle-focus"
            >
              <option value="ALL">Pay Period (All)</option>
              {payPeriods.map((period) => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-outline" />
            <label className="text-xs font-label-caps text-outline uppercase font-semibold">Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 text-xs bg-surface-container-low border border-natural-beige rounded text-on-surface font-semibold needle-focus"
            >
              <option value="ALL">All Records</option>
              <option value="APPROVED">Approved Only</option>
              <option value="PENDING_APPROVAL">Pending Approval</option>
            </select>
          </div>
        </div>

        <button className="inline-flex items-center space-x-2 text-xs font-semibold text-primary hover:underline">
          <Download className="w-4 h-4" />
          <span>Export Payroll CSV</span>
        </button>
      </div>

      {/* Ledger Table */}
      <div className="bg-surface-container-lowest border border-natural-beige rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-body-sm">
            <thead>
              <tr className="border-b-2 border-primary/30 bg-surface-container-low font-label-caps text-outline uppercase tracking-wider">
                <th className="p-3.5">Record ID</th>
                <th className="p-3.5">Technician Name</th>
                <th className="p-3.5">Loom Unit</th>
                <th className="p-3.5">Pay Period</th>
                <th className="p-3.5 text-right">Output (m)</th>
                <th className="p-3.5 text-right">Base Wage (₹)</th>
                <th className="p-3.5 text-right">Quality Bonus</th>
                <th className="p-3.5 text-right">Group Bonus</th>
                <th className="p-3.5 text-right">Total Payout</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Approval Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-natural-beige/50">
              {filteredPayouts.map((record) => {
                const isApproved = record.status === 'APPROVED' || record.status === 'PAID';

                return (
                  <tr
                    key={record.id}
                    onClick={() => setSelectedPayout(record)}
                    className="hover:bg-surface-container-low/70 transition-colors font-data-mono cursor-pointer"
                    title="Click to view payout details"
                  >
                    <td className="p-3.5 font-bold text-primary">{record.id}</td>
                    <td className="p-3.5 font-sans font-bold text-on-surface">{record.workerName}</td>
                    <td className="p-3.5 text-on-surface-variant font-semibold">{record.loomCode}</td>
                    <td className="p-3.5 text-outline">{record.payPeriod}</td>
                    <td className="p-3.5 text-right text-on-surface font-bold">{record.outputMeters} m</td>
                    <td className="p-3.5 text-right text-outline">₹{record.baseEarnings.toLocaleString()}</td>
                    <td className="p-3.5 text-right text-emerald-700 font-semibold">+₹{record.qualityBonus}</td>
                    <td className="p-3.5 text-right text-indigo-700 font-semibold">+₹{record.groupEfficiencyBonus}</td>
                    <td className="p-3.5 text-right font-bold text-primary text-sm">
                      ₹{record.totalPayout.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded font-label-caps uppercase ${
                          isApproved
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleApproval(record.id)}
                        className={`px-3 py-1 text-[11px] font-bold rounded transition-colors ${
                          isApproved
                            ? 'bg-surface-container text-outline hover:bg-surface-container-high'
                            : 'bg-primary text-on-primary hover:bg-primary-container shadow-sm'
                        }`}
                      >
                        {isApproved ? 'Revoke' : 'Approve Wage'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Detail Modal — fixes TC015 */}
      {selectedPayout && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-natural-beige rounded-lg max-w-lg w-full shadow-2xl texture-bg relative overflow-hidden">
            {/* Top accent */}
            <div className="h-1.5 bg-primary w-full"></div>

            <div className="p-6 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-label-caps uppercase text-outline tracking-wider">Payout Statement</span>
                  <h3 className="font-headline-sm text-xl text-primary font-bold font-data-mono">{selectedPayout.id}</h3>
                  <p className="text-xs text-outline mt-0.5">{selectedPayout.payPeriod}</p>
                </div>
                <button
                  onClick={() => setSelectedPayout(null)}
                  className="p-1.5 rounded-full hover:bg-surface-container text-outline hover:text-on-surface transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Worker info */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-surface-container-low rounded border border-natural-beige text-xs">
                <div>
                  <span className="text-outline block mb-0.5">Technician</span>
                  <span className="font-bold text-on-surface text-sm">{selectedPayout.workerName}</span>
                </div>
                <div>
                  <span className="text-outline block mb-0.5">Loom Assignment</span>
                  <span className="font-bold text-primary">{selectedPayout.loomCode}</span>
                </div>
                <div>
                  <span className="text-outline block mb-0.5">Shift Hours</span>
                  <span className="font-data-mono font-semibold">{selectedPayout.shiftHours} hrs</span>
                </div>
                <div>
                  <span className="text-outline block mb-0.5">Output Metered</span>
                  <span className="font-data-mono font-bold text-primary">{selectedPayout.outputMeters} m</span>
                </div>
              </div>

              {/* Earnings breakdown */}
              <div className="space-y-2 text-xs">
                <p className="font-label-caps uppercase text-outline tracking-wider font-semibold">Earnings Breakdown</p>
                <div className="border border-natural-beige rounded overflow-hidden">
                  <div className="flex justify-between items-center p-3 bg-surface-container-low font-data-mono border-b border-natural-beige">
                    <span className="text-outline">Base Wage (piece-rate ₹{selectedPayout.pieceRatePerMeter}/m)</span>
                    <span className="font-bold text-on-surface">₹{selectedPayout.baseEarnings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 font-data-mono border-b border-natural-beige">
                    <span className="text-emerald-700">+ Quality Performance Bonus</span>
                    <span className="font-bold text-emerald-700">₹{selectedPayout.qualityBonus.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 font-data-mono border-b border-natural-beige">
                    <span className="text-indigo-700">+ Group Efficiency Bonus</span>
                    <span className="font-bold text-indigo-700">₹{selectedPayout.groupEfficiencyBonus.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-primary/5 font-data-mono">
                    <span className="font-bold text-primary text-sm uppercase tracking-wider">Total Payout</span>
                    <span className="font-bold text-primary text-xl">₹{selectedPayout.totalPayout.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Status & actions */}
              <div className="flex items-center justify-between pt-2 border-t border-natural-beige">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded font-label-caps uppercase ${
                    selectedPayout.status === 'APPROVED' || selectedPayout.status === 'PAID'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {selectedPayout.status}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedPayout(null)}
                    className="px-4 py-2 text-xs text-outline font-semibold hover:text-on-surface transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => toggleApproval(selectedPayout.id)}
                    className={`px-4 py-2 text-xs font-bold rounded transition-colors ${
                      selectedPayout.status === 'APPROVED' || selectedPayout.status === 'PAID'
                        ? 'bg-surface-container text-outline hover:bg-surface-container-high border border-natural-beige'
                        : 'bg-primary text-on-primary hover:bg-primary-container shadow-sm'
                    }`}
                  >
                    {selectedPayout.status === 'APPROVED' || selectedPayout.status === 'PAID'
                      ? 'Revoke Approval'
                      : 'Approve Wage'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
