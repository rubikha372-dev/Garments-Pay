'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Factory,
  PenSquare,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronDown,
  Download,
  Eye,
  FileSpreadsheet,
  Activity
} from 'lucide-react';
import { INITIAL_SHIFT_LOGS, INITIAL_LOOMS, ProductionShiftLog } from '@/lib/data';

export default function ProductionPage() {
  const [logs, setLogs] = useState<ProductionShiftLog[]>(INITIAL_SHIFT_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShift, setSelectedShift] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedLoomStatus, setSelectedLoomStatus] = useState('ALL');
  const [activeLogModal, setActiveLogModal] = useState<ProductionShiftLog | null>(null);

  // Merge any newly submitted entries from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('asgard_shift_logs') || '[]') as ProductionShiftLog[];
      if (stored.length > 0) {
        // Merge: localStorage entries first (newest), then initial data, dedup by id
        const existingIds = new Set(INITIAL_SHIFT_LOGS.map((l) => l.id));
        const newEntries = stored.filter((l) => !existingIds.has(l.id));
        setLogs([...newEntries, ...INITIAL_SHIFT_LOGS]);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Build a lookup: loomCode -> loom operational status
  const loomStatusMap = Object.fromEntries(INITIAL_LOOMS.map((l) => [l.code, l.status]));

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.loomCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.operatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.warpBatch.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesShift = selectedShift === 'ALL' || log.shift.includes(selectedShift);
    const matchesStatus = selectedStatus === 'ALL' || log.status === selectedStatus;

    const loomOpStatus = loomStatusMap[log.loomCode] || 'RUNNING';
    const matchesLoomStatus =
      selectedLoomStatus === 'ALL' ||
      (selectedLoomStatus === 'RUNNING' && loomOpStatus === 'RUNNING') ||
      (selectedLoomStatus === 'IDLE' && (loomOpStatus === 'IDLE' || loomOpStatus === 'QUALITY_CHECK')) ||
      (selectedLoomStatus === 'MAINTENANCE' && loomOpStatus === 'MAINTENANCE');

    return matchesSearch && matchesShift && matchesStatus && matchesLoomStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-outline mb-1 font-label-caps uppercase tracking-wider">
            <span>Operations Management</span>
            <span>•</span>
            <span className="text-primary font-semibold">Production Audit Trail</span>
          </div>
          <h1 className="font-headline-md text-2xl md:text-3xl text-primary font-bold tracking-tight">
            Daily Production Logs
          </h1>
          <p className="font-body-sm text-sm text-on-surface-variant mt-1">
            Track shift output, meterage targets, warp batch quality, and downtime reasons.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/production/entry"
            className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded text-xs font-semibold shadow-sm transition-colors"
          >
            <PenSquare className="w-4 h-4" />
            <span>Record Shift Entry</span>
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

      {/* Filter Toolbar */}
      <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="text"
              placeholder="Search by Loom, Operator, or Warp Batch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface-container-low border border-natural-beige rounded text-on-surface needle-focus"
            />
          </div>

          <select
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
            className="px-3 py-1.5 text-xs bg-surface-container-low border border-natural-beige rounded text-on-surface needle-focus font-medium"
          >
            <option value="ALL">All Shifts</option>
            <option value="Morning">Shift A (Morning)</option>
            <option value="Evening">Shift B (Evening)</option>
            <option value="Night">Shift C (Night)</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 text-xs bg-surface-container-low border border-natural-beige rounded text-on-surface needle-focus font-medium"
          >
            <option value="ALL">All Verification Statuses</option>
            <option value="VERIFIED">Verified Only</option>
            <option value="PENDING">Pending Review</option>
          </select>

          {/* NEW: Loom Status Filter — fixes TC014 */}
          <select
            value={selectedLoomStatus}
            onChange={(e) => setSelectedLoomStatus(e.target.value)}
            className="px-3 py-1.5 text-xs bg-surface-container-low border border-natural-beige rounded text-on-surface needle-focus font-medium"
          >
            <option value="ALL">All Loom Status</option>
            <option value="RUNNING">Active (Running)</option>
            <option value="IDLE">Idle / QC</option>
            <option value="MAINTENANCE">Maintenance</option>
          </select>
        </div>

        <div className="text-xs text-outline font-data-mono">
          Showing <span className="font-bold text-primary">{filteredLogs.length}</span> of {logs.length} logs
        </div>
      </div>

      {/* Production Logs Table */}
      <div className="bg-surface-container-lowest border border-natural-beige rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/30 bg-surface-container-low font-label-caps text-outline uppercase tracking-wider">
                <th className="p-3.5">Date & Shift</th>
                <th className="p-3.5">Loom & Operator</th>
                <th className="p-3.5">Fabric & Warp Batch</th>
                <th className="p-3.5 text-right">Target (m)</th>
                <th className="p-3.5 text-right">Actual (m)</th>
                <th className="p-3.5 text-right">Defects</th>
                <th className="p-3.5 text-right">Efficiency</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-natural-beige/50 font-body-sm">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-container-low/70 transition-colors">
                  <td className="p-3.5">
                    <div className="font-semibold text-primary font-data-mono">{log.date}</div>
                    <div className="text-[11px] text-outline">{log.shift}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-on-surface">{log.loomCode}</div>
                    <div className="text-[11px] text-outline">{log.operatorName}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-medium text-on-surface">{log.fabricType}</div>
                    <div className="font-data-mono text-[11px] text-outline">{log.warpBatch}</div>
                  </td>
                  <td className="p-3.5 text-right font-data-mono text-outline">{log.targetMeters}m</td>
                  <td className="p-3.5 text-right font-data-mono font-bold text-on-surface">
                    {log.actualMeters}m
                  </td>
                  <td className="p-3.5 text-right font-data-mono">
                    <span className={log.defectsCount > 5 ? 'text-textile-red font-bold' : 'text-on-surface-variant'}>
                      {log.defectsCount}
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-data-mono font-bold">
                    <span className={log.efficiency >= 95 ? 'text-emerald-700' : log.efficiency >= 85 ? 'text-primary' : 'text-amber-700'}>
                      {log.efficiency}%
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded font-label-caps uppercase ${
                        log.status === 'VERIFIED'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => setActiveLogModal(log)}
                      className="p-1 rounded text-primary hover:bg-primary/10 transition-colors"
                      title="Inspect Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {activeLogModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-natural-beige rounded-lg max-w-lg w-full p-6 shadow-2xl space-y-4 texture-bg relative">
            <div className="flex items-center justify-between border-b border-natural-beige pb-3">
              <div>
                <span className="text-[10px] font-label-caps uppercase text-outline">Production Record Detail</span>
                <h3 className="font-headline-sm text-xl text-primary font-bold">{activeLogModal.id}</h3>
              </div>
              <button
                onClick={() => setActiveLogModal(null)}
                className="text-outline hover:text-on-surface text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-surface-container-lowest p-3 rounded border border-natural-beige">
                <div>
                  <span className="text-outline block">Loom Identifier</span>
                  <span className="font-bold text-primary text-sm">{activeLogModal.loomCode}</span>
                </div>
                <div>
                  <span className="text-outline block">Operator Name</span>
                  <span className="font-bold text-on-surface text-sm">{activeLogModal.operatorName}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-outline block">Fabric Weave</span>
                  <span className="font-medium">{activeLogModal.fabricType}</span>
                </div>
                <div>
                  <span className="text-outline block">Warp Batch</span>
                  <span className="font-data-mono font-semibold">{activeLogModal.warpBatch}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-surface-container p-3 rounded border border-natural-beige font-data-mono text-center">
                <div>
                  <span className="text-outline text-[10px] uppercase block">Target</span>
                  <span className="font-bold text-on-surface">{activeLogModal.targetMeters}m</span>
                </div>
                <div>
                  <span className="text-outline text-[10px] uppercase block">Actual Output</span>
                  <span className="font-bold text-primary">{activeLogModal.actualMeters}m</span>
                </div>
                <div>
                  <span className="text-outline text-[10px] uppercase block">Efficiency</span>
                  <span className="font-bold text-emerald-700">{activeLogModal.efficiency}%</span>
                </div>
              </div>

              <div className="p-3 bg-surface-container-low rounded border border-natural-beige space-y-1">
                <span className="text-outline font-semibold block">Downtime & Reason</span>
                <p className="text-on-surface font-medium">
                  {activeLogModal.downtimeMins} mins — {activeLogModal.downtimeReason}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-natural-beige flex justify-end space-x-2">
              <button
                onClick={() => setActiveLogModal(null)}
                className="px-4 py-2 bg-primary text-on-primary rounded text-xs font-semibold hover:bg-primary-container transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
