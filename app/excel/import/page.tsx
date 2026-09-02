'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  Upload,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Sparkles,
  ChevronRight,
  XCircle,
  SlidersHorizontal
} from 'lucide-react';
import { SAMPLE_EXCEL_DATA, ExcelImportRow } from '@/lib/data';

// Column mapping configuration
interface ColumnMapping {
  spreadsheetCol: string;
  appField: string;
}

const SPREADSHEET_COLUMNS = ['Date', 'Shift', 'Loom Code', 'Worker Code', 'Meters Produced', 'Defects Count', 'Warp Batch'];

const APP_FIELDS = [
  { label: 'Date', required: true },
  { label: 'Shift', required: true },
  { label: 'Loom Code', required: true },
  { label: 'Worker Code', required: true },
  { label: 'Meters Produced', required: true },
  { label: 'Defects Count', required: false },
  { label: 'Warp Batch', required: false },
];

const DEFAULT_MAPPINGS: ColumnMapping[] = SPREADSHEET_COLUMNS.map((col) => ({
  spreadsheetCol: col,
  appField: col, // auto-matched by name
}));

export default function ExcelImportWizardPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [fileName, setFileName] = useState<string | null>(null);
  const [rows, setRows] = useState<ExcelImportRow[]>(SAMPLE_EXCEL_DATA);
  const [parsingProgress, setParsingProgress] = useState<number>(0);
  const [columnMappings, setColumnMappings] = useState<ColumnMapping[]>(DEFAULT_MAPPINGS);

  const totalRows = rows.length;
  const validRows = rows.filter((r) => r.isValid).length;
  const invalidRows = rows.filter((r) => !r.isValid).length;

  const requiredFieldsMapped = APP_FIELDS.filter((f) => f.required).every((f) =>
    columnMappings.some((m) => m.appField === f.label)
  );

  // Step 1 -> Step 2 transition with simulated parsing timer
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setCurrentStep(2);
      simulateParsing();
    }
  };

  const handleDragDropDemo = () => {
    setFileName('Asgard_Shift_Production_2026_09_02.xlsx');
    setCurrentStep(2);
    simulateParsing();
  };

  const simulateParsing = () => {
    setParsingProgress(0);
    const interval = setInterval(() => {
      setParsingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Goes to Column Mapping (step 3) after parsing
          setTimeout(() => setCurrentStep(3), 500);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const updateMapping = (spreadsheetCol: string, newAppField: string) => {
    setColumnMappings((prev) =>
      prev.map((m) => (m.spreadsheetCol === spreadsheetCol ? { ...m, appField: newAppField } : m))
    );
  };

  const WIZARD_STEPS = [
    { step: 1, title: '1. File Upload' },
    { step: 2, title: '2. Parsing' },
    { step: 3, title: '3. Column Mapping' },
    { step: 4, title: '4. Validation' },
    { step: 5, title: '5. Review' },
    { step: 6, title: '6. Success' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Step Indicator Header */}
      <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-6 shadow-sm texture-bg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-label-caps uppercase text-outline tracking-wider font-semibold">
              Batch Import Flow
            </span>
            <h1 className="font-headline-md text-2xl text-primary font-bold">
              Excel Data Import Wizard
            </h1>
          </div>
          <span className="font-data-mono text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded border border-primary/20">
            Step {currentStep} of {WIZARD_STEPS.length}
          </span>
        </div>

        {/* Wizard Stepper */}
        <div className="grid grid-cols-6 gap-2">
          {WIZARD_STEPS.map((s) => {
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;

            return (
              <div key={s.step} className="space-y-1.5">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-600'
                      : isCurrent
                      ? 'bg-primary animate-pulse'
                      : 'bg-surface-container-high'
                  }`}
                ></div>
                <span
                  className={`text-[11px] font-semibold block truncate font-data-mono ${
                    isCurrent ? 'text-primary font-bold' : isCompleted ? 'text-emerald-800' : 'text-outline'
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: UPLOAD SCREEN */}
      {currentStep === 1 && (
        <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-8 shadow-md text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20">
            <Upload className="w-8 h-8 text-primary" />
          </div>

          <div>
            <h2 className="font-headline-sm text-xl text-primary font-bold">Upload Shift Production Spreadsheet</h2>
            <p className="text-xs text-outline mt-1 max-w-md mx-auto">
              Select an .XLSX or .CSV file containing loom output, warp batch codes, worker IDs, and shift downtime.
            </p>
          </div>

          {/* Dropzone Container */}
          <div
            onClick={handleDragDropDemo}
            className="border-2 border-dashed border-natural-beige rounded-lg p-10 hover:border-primary transition-colors cursor-pointer bg-surface-container-low/40 max-w-xl mx-auto space-y-3"
          >
            <FileSpreadsheet className="w-10 h-10 text-outline mx-auto" />
            <p className="text-xs font-semibold text-on-surface">
              Click to browse or drag &amp; drop factory spreadsheet here
            </p>
            <p className="text-[11px] text-outline">Supports .xlsx, .xls, .csv up to 25MB</p>
            <input type="file" onChange={handleFileUpload} className="hidden" id="excel-file-input" />
          </div>

          <div className="pt-4 border-t border-natural-beige flex justify-center space-x-3">
            <button
              onClick={handleDragDropDemo}
              className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded text-xs font-bold shadow-sm transition-colors inline-flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Use Sample Factory Excel File</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PARSING SCREEN */}
      {currentStep === 2 && (
        <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-10 shadow-md text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-800 mx-auto flex items-center justify-center animate-spin">
            <RefreshCw className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-headline-sm text-xl text-primary font-bold">Parsing Spreadsheet Data...</h2>
            <p className="text-xs text-outline mt-1">Reading headers, validating data types, and mapping column structures.</p>
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <div className="flex justify-between text-xs font-data-mono font-bold text-primary">
              <span>{fileName}</span>
              <span>{parsingProgress}%</span>
            </div>
            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${parsingProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: COLUMN MAPPING SCREEN — fixes TC013 */}
      {currentStep === 3 && (
        <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-6 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-natural-beige pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-headline-sm text-xl text-primary font-bold">Column Mapping</h2>
                <span className="text-xs font-bold bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded font-data-mono">
                  {SPREADSHEET_COLUMNS.length} columns detected
                </span>
              </div>
              <p className="text-xs text-outline mt-1">
                Map your spreadsheet columns to the correct application fields. Auto-matched by column name.
              </p>
            </div>
            {requiredFieldsMapped ? (
              <span className="inline-flex items-center space-x-1 text-emerald-700 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>All required fields mapped</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 text-amber-700 text-xs font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Missing required mappings</span>
              </span>
            )}
          </div>

          {/* Mapping Table */}
          <div className="border border-natural-beige rounded overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-container-low font-label-caps text-outline uppercase border-b border-natural-beige">
                  <th className="p-3">Spreadsheet Column (Map columns)</th>
                  <th className="p-3">Preview (first row)</th>
                  <th className="p-3">Maps To (Application Field)</th>
                  <th className="p-3 text-center">Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-natural-beige/50">
                {columnMappings.map((mapping, idx) => {
                  const appField = APP_FIELDS.find((f) => f.label === mapping.appField);
                  return (
                    <tr key={idx} className="hover:bg-surface-container-low/50">
                      <td className="p-3 font-data-mono font-bold text-primary">{mapping.spreadsheetCol}</td>
                      <td className="p-3 font-data-mono text-outline text-[11px]">
                        {/* Show a sample value based on column */}
                        {mapping.spreadsheetCol === 'Date' && '2026-09-02'}
                        {mapping.spreadsheetCol === 'Shift' && 'Shift A'}
                        {mapping.spreadsheetCol === 'Loom Code' && 'Loom-01'}
                        {mapping.spreadsheetCol === 'Worker Code' && 'EMP-8801'}
                        {mapping.spreadsheetCol === 'Meters Produced' && '480'}
                        {mapping.spreadsheetCol === 'Defects Count' && '4'}
                        {mapping.spreadsheetCol === 'Warp Batch' && 'IND-2026-091'}
                      </td>
                      <td className="p-3">
                        <select
                          value={mapping.appField}
                          onChange={(e) => updateMapping(mapping.spreadsheetCol, e.target.value)}
                          className="px-2 py-1.5 text-xs bg-surface-container-low border border-natural-beige rounded text-on-surface needle-focus font-medium w-full max-w-[200px]"
                        >
                          <option value="">-- Skip this column --</option>
                          {APP_FIELDS.map((f) => (
                            <option key={f.label} value={f.label}>{f.label}{f.required ? ' *' : ''}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3 text-center">
                        {appField?.required ? (
                          <span className="text-[10px] font-bold text-textile-red font-label-caps uppercase">Required</span>
                        ) : (
                          <span className="text-[10px] text-outline font-label-caps uppercase">Optional</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-natural-beige flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-semibold text-outline hover:text-on-surface transition-colors"
            >
              Re-upload File
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              disabled={!requiredFieldsMapped}
              className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded text-xs font-bold shadow-md transition-colors inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Proceed to Validation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: VALIDATION SCREEN */}
      {currentStep === 4 && (
        <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-6 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-natural-beige pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-headline-sm text-xl text-primary font-bold">Interactive Data Validation</h2>
                <span className="text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded font-data-mono">
                  {invalidRows} Alert(s) Detected
                </span>
              </div>
              <p className="text-xs text-outline mt-1">
                Review parsed records. Rows with invalid loom IDs or negative meterage are highlighted below.
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs font-data-mono">
              <span className="text-emerald-700 font-bold">{validRows} Valid</span>
              <span>•</span>
              <span className="text-textile-red font-bold">{invalidRows} Action Required</span>
            </div>
          </div>

          {/* Validation Table */}
          <div className="overflow-x-auto border border-natural-beige rounded">
            <table className="w-full text-left text-xs border-collapse font-body-sm">
              <thead>
                <tr className="bg-surface-container-low font-label-caps text-outline uppercase border-b border-natural-beige">
                  <th className="p-3">Row #</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Shift</th>
                  <th className="p-3">Loom Code</th>
                  <th className="p-3">Worker Code</th>
                  <th className="p-3 text-right">Output (m)</th>
                  <th className="p-3">Warp Batch</th>
                  <th className="p-3 text-center">Validation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-natural-beige/50">
                {rows.map((row) => (
                  <tr
                    key={row.rowId}
                    className={!row.isValid ? 'bg-red-50/80 font-semibold' : 'hover:bg-surface-container-low/50'}
                  >
                    <td className="p-3 font-data-mono font-bold">{row.rowId}</td>
                    <td className="p-3 font-data-mono">{row.date}</td>
                    <td className="p-3">{row.shift}</td>
                    <td className="p-3 font-bold text-primary">{row.loomCode}</td>
                    <td className="p-3 font-data-mono">{row.workerCode}</td>
                    <td className="p-3 text-right font-data-mono font-bold">{row.metersProduced}m</td>
                    <td className="p-3 font-data-mono text-outline">{row.warpBatch}</td>
                    <td className="p-3">
                      {row.isValid ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-800 text-[11px] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Valid</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-textile-red text-[11px] font-bold">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>{row.validationMessage}</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-natural-beige flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 text-xs font-semibold text-outline hover:text-on-surface transition-colors"
            >
              Back to Column Mapping
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded text-xs font-bold shadow-md transition-colors inline-flex items-center space-x-2"
            >
              <span>Proceed to Review ({validRows} valid rows)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: REVIEW SCREEN */}
      {currentStep === 5 && (
        <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-6 shadow-md space-y-6 texture-bg">
          <div className="border-b border-natural-beige pb-4">
            <h2 className="font-headline-sm text-xl text-primary font-bold">Final Import Confirmation</h2>
            <p className="text-xs text-outline mt-1">Review aggregated totals before writing records to the database.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface-container-lowest p-4 rounded border border-natural-beige">
              <span className="text-[11px] font-label-caps uppercase text-outline block">Valid Records</span>
              <span className="font-headline-md text-2xl font-bold text-emerald-700 font-data-mono">{validRows} Rows</span>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded border border-natural-beige">
              <span className="text-[11px] font-label-caps uppercase text-outline block">Total Meterage Added</span>
              <span className="font-headline-md text-2xl font-bold text-primary font-data-mono">1,947 Meters</span>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded border border-natural-beige">
              <span className="text-[11px] font-label-caps uppercase text-outline block">Destination Fleet</span>
              <span className="font-headline-md text-2xl font-bold text-on-surface font-data-mono">Floor A Looms</span>
            </div>
          </div>

          <div className="pt-4 border-t border-natural-beige flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 text-xs font-semibold text-outline hover:text-on-surface"
            >
              Back to Validation
            </button>
            <button
              onClick={() => setCurrentStep(6)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded text-xs font-bold shadow-lg transition-colors inline-flex items-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Commit Import to Database</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: SUCCESS CONFIRMATION */}
      {currentStep === 6 && (
        <div className="bg-surface-container-lowest border border-natural-beige rounded-lg p-10 shadow-lg text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center border-2 border-emerald-300">
            <CheckCircle2 className="w-10 h-10 text-emerald-700" />
          </div>

          <div>
            <h2 className="font-headline-sm text-2xl text-primary font-bold">Import Batch Committed Successfully!</h2>
            <p className="text-xs text-outline mt-1 max-w-md mx-auto font-data-mono">
              Batch Reference ID: BATCH-IMP-{Math.floor(10000 + Math.random() * 90000)}
            </p>
          </div>

          <div className="p-4 bg-surface-container-low rounded border border-natural-beige max-w-sm mx-auto text-xs space-y-1 font-data-mono">
            <div className="flex justify-between">
              <span>Rows Imported:</span>
              <span className="font-bold text-emerald-800">{validRows}</span>
            </div>
            <div className="flex justify-between">
              <span>Timestamp:</span>
              <span className="font-bold text-on-surface">{new Date().toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="pt-4 flex justify-center space-x-3">
            <Link
              href="/"
              className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded text-xs font-bold shadow-md transition-colors"
            >
              Return to Overview Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
