export interface Loom {
  id: string;
  code: string;
  model: string;
  type: string;
  status: 'RUNNING' | 'MAINTENANCE' | 'IDLE' | 'QUALITY_CHECK';
  efficiency: number; // percentage
  speedRpm: number;
  outputMeters: number;
  targetMeters: number;
  operatorId: string;
  operatorName: string;
  yarnType: string;
  defectRate: number;
  shift: 'MORNING' | 'EVENING' | 'NIGHT';
}

export interface Worker {
  id: string;
  code: string;
  name: string;
  role: string;
  skillGrade: 'MASTER_WEAVER' | 'GRADE_A' | 'GRADE_B' | 'APPRENTICE';
  skillScore: number; // 0 - 100
  attendancePct: number;
  totalMetersProduced: number;
  avgEfficiency: number;
  qualityRating: number;
  loomAssigned: string;
  shift: string;
  joinDate: string;
  certifications: string[];
}

export interface ProductionShiftLog {
  id: string;
  date: string;
  shift: 'Shift A (Morning)' | 'Shift B (Evening)' | 'Shift C (Night)';
  loomCode: string;
  operatorName: string;
  warpBatch: string;
  fabricType: string;
  targetMeters: number;
  actualMeters: number;
  defectsCount: number;
  downtimeMins: number;
  downtimeReason: string;
  efficiency: number;
  status: 'VERIFIED' | 'PENDING' | 'REJECTED';
}

export interface SkillGapItem {
  id: string;
  category: string;
  requiredLevel: string;
  currentAvgScore: number;
  targetScore: number;
  workersAffected: number;
  status: 'CRITICAL' | 'MODERATE' | 'OPTIMAL';
  recommendedTraining: string;
}

export interface PayoutRecord {
  id: string;
  workerId: string;
  workerName: string;
  loomCode: string;
  payPeriod: string;
  shiftHours: number;
  outputMeters: number;
  pieceRatePerMeter: number;
  baseEarnings: number;
  qualityBonus: number;
  groupEfficiencyBonus: number;
  totalPayout: number;
  status: 'APPROVED' | 'PENDING_APPROVAL' | 'PAID';
}

export const INITIAL_LOOMS: Loom[] = [
  {
    id: "l-01",
    code: "Loom-01",
    model: "Toyota JAT810 Air Jet",
    type: "High-Speed Air Jet",
    status: "RUNNING",
    efficiency: 94.5,
    speedRpm: 850,
    outputMeters: 480,
    targetMeters: 500,
    operatorId: "W-101",
    operatorName: "Rajesh Kumar",
    yarnType: "30s Combed Cotton Indigo",
    defectRate: 0.8,
    shift: "MORNING"
  },
  {
    id: "l-02",
    code: "Loom-02",
    model: "Picanol OmniPlus i",
    type: "Air Jet Weaving",
    status: "RUNNING",
    efficiency: 92.1,
    speedRpm: 820,
    outputMeters: 460,
    targetMeters: 500,
    operatorId: "W-102",
    operatorName: "Priya Sharma",
    yarnType: "40s Khadi Twill Weave",
    defectRate: 1.2,
    shift: "MORNING"
  },
  {
    id: "l-03",
    code: "Loom-03",
    model: "Dornier P2 Rapier",
    type: "Heavy Rapier Loom",
    status: "QUALITY_CHECK",
    efficiency: 78.4,
    speedRpm: 600,
    outputMeters: 310,
    targetMeters: 450,
    operatorId: "W-103",
    operatorName: "Amitabh Patel",
    yarnType: "20s Raw Silk Warp",
    defectRate: 3.5,
    shift: "MORNING"
  },
  {
    id: "l-04",
    code: "Loom-04",
    model: "Toyota JAT810 Air Jet",
    type: "High-Speed Air Jet",
    status: "RUNNING",
    efficiency: 96.8,
    speedRpm: 890,
    outputMeters: 512,
    targetMeters: 500,
    operatorId: "W-104",
    operatorName: "Sunita Verma",
    yarnType: "30s Indigo Linen Blend",
    defectRate: 0.4,
    shift: "MORNING"
  },
  {
    id: "l-05",
    code: "Loom-05",
    model: "Picanol OptiMax-i",
    type: "Rapier Weaving",
    status: "MAINTENANCE",
    efficiency: 0,
    speedRpm: 0,
    outputMeters: 0,
    targetMeters: 450,
    operatorId: "W-105",
    operatorName: "Vikram Singh",
    yarnType: "Warp Tension Service",
    defectRate: 0.0,
    shift: "MORNING"
  },
  {
    id: "l-06",
    code: "Loom-06",
    model: "Toyota JAT810 Air Jet",
    type: "High-Speed Air Jet",
    status: "RUNNING",
    efficiency: 91.0,
    speedRpm: 830,
    outputMeters: 445,
    targetMeters: 480,
    operatorId: "W-106",
    operatorName: "Ananya Roy",
    yarnType: "60s Fine Handloom Cambric",
    defectRate: 1.1,
    shift: "MORNING"
  },
  {
    id: "l-07",
    code: "Loom-07",
    model: "Itema R9500-2",
    type: "Rapier Handloom Hybrid",
    status: "IDLE",
    efficiency: 0,
    speedRpm: 0,
    outputMeters: 120,
    targetMeters: 450,
    operatorId: "W-107",
    operatorName: "Ramesh Sen",
    yarnType: "Awaiting Beam Load",
    defectRate: 0.0,
    shift: "MORNING"
  },
  {
    id: "l-08",
    code: "Loom-08",
    model: "Picanol OmniPlus i",
    type: "Air Jet Weaving",
    status: "RUNNING",
    efficiency: 95.2,
    speedRpm: 865,
    outputMeters: 495,
    targetMeters: 500,
    operatorId: "W-108",
    operatorName: "Deepak Yadav",
    yarnType: "2/40s Organic Cotton Warp",
    defectRate: 0.6,
    shift: "MORNING"
  }
];

export const INITIAL_WORKERS: Worker[] = [
  {
    id: "W-101",
    code: "EMP-8801",
    name: "Rajesh Kumar",
    role: "Senior Loom Technician & Master Weaver",
    skillGrade: "MASTER_WEAVER",
    skillScore: 96,
    attendancePct: 98.5,
    totalMetersProduced: 14250,
    avgEfficiency: 95.2,
    qualityRating: 4.9,
    loomAssigned: "Loom-01",
    shift: "Morning (06:00 - 14:00)",
    joinDate: "2019-03-15",
    certifications: ["Air-Jet Master Cert", "Tension Calibration", "Zero Defect Weave"]
  },
  {
    id: "W-102",
    code: "EMP-8802",
    name: "Priya Sharma",
    role: "Loom Operator - Grade A",
    skillGrade: "GRADE_A",
    skillScore: 89,
    attendancePct: 96.0,
    totalMetersProduced: 11800,
    avgEfficiency: 92.4,
    qualityRating: 4.7,
    loomAssigned: "Loom-02",
    shift: "Morning (06:00 - 14:00)",
    joinDate: "2021-06-10",
    certifications: ["Twill Weave Expert", "Rapier Setup Level II"]
  },
  {
    id: "W-103",
    code: "EMP-8803",
    name: "Amitabh Patel",
    role: "Silk & Heavy Rapier Operator",
    skillGrade: "GRADE_B",
    skillScore: 74,
    attendancePct: 91.2,
    totalMetersProduced: 8900,
    avgEfficiency: 81.5,
    qualityRating: 4.1,
    loomAssigned: "Loom-03",
    shift: "Morning (06:00 - 14:00)",
    joinDate: "2022-11-01",
    certifications: ["Raw Silk Handling"]
  },
  {
    id: "W-104",
    code: "EMP-8804",
    name: "Sunita Verma",
    role: "High-Speed Air Jet Specialist",
    skillGrade: "MASTER_WEAVER",
    skillScore: 98,
    attendancePct: 99.1,
    totalMetersProduced: 16400,
    avgEfficiency: 96.8,
    qualityRating: 5.0,
    loomAssigned: "Loom-04",
    shift: "Morning (06:00 - 14:00)",
    joinDate: "2018-01-20",
    certifications: ["Toyota Certified Master", "Indigo Dye Handling", "Advanced Maintenance"]
  },
  {
    id: "W-105",
    code: "EMP-8805",
    name: "Vikram Singh",
    role: "Maintenance Technician",
    skillGrade: "GRADE_A",
    skillScore: 88,
    attendancePct: 94.5,
    totalMetersProduced: 9600,
    avgEfficiency: 89.0,
    qualityRating: 4.6,
    loomAssigned: "Loom-05",
    shift: "Morning (06:00 - 14:00)",
    joinDate: "2020-08-12",
    certifications: ["Mechanical Overhaul", "Picanol Tech Cert"]
  },
  {
    id: "W-106",
    code: "EMP-8806",
    name: "Ananya Roy",
    role: "Handloom Cambric Specialist",
    skillGrade: "GRADE_B",
    skillScore: 82,
    attendancePct: 95.0,
    totalMetersProduced: 10200,
    avgEfficiency: 88.6,
    qualityRating: 4.5,
    loomAssigned: "Loom-06",
    shift: "Morning (06:00 - 14:00)",
    joinDate: "2022-02-14",
    certifications: ["Fine Yarn Management"]
  }
];

export const INITIAL_SHIFT_LOGS: ProductionShiftLog[] = [
  {
    id: "LOG-9001",
    date: "2026-09-02",
    shift: "Shift A (Morning)",
    loomCode: "Loom-01",
    operatorName: "Rajesh Kumar",
    warpBatch: "IND-2026-091",
    fabricType: "30s Combed Cotton Indigo",
    targetMeters: 500,
    actualMeters: 480,
    defectsCount: 4,
    downtimeMins: 15,
    downtimeReason: "Warp Stop Knotting",
    efficiency: 96.0,
    status: "VERIFIED"
  },
  {
    id: "LOG-9002",
    date: "2026-09-02",
    shift: "Shift A (Morning)",
    loomCode: "Loom-02",
    operatorName: "Priya Sharma",
    warpBatch: "KHD-2026-044",
    fabricType: "40s Khadi Twill Weave",
    targetMeters: 500,
    actualMeters: 460,
    defectsCount: 6,
    downtimeMins: 25,
    downtimeReason: "Weft Insertion Timing Reset",
    efficiency: 92.0,
    status: "VERIFIED"
  },
  {
    id: "LOG-9003",
    date: "2026-09-02",
    shift: "Shift A (Morning)",
    loomCode: "Loom-04",
    operatorName: "Sunita Verma",
    warpBatch: "IND-2026-092",
    fabricType: "30s Indigo Linen Blend",
    targetMeters: 500,
    actualMeters: 512,
    defectsCount: 2,
    downtimeMins: 5,
    downtimeReason: "Scheduled Cleaning",
    efficiency: 102.4,
    status: "VERIFIED"
  },
  {
    id: "LOG-9004",
    date: "2026-09-01",
    shift: "Shift C (Night)",
    loomCode: "Loom-08",
    operatorName: "Deepak Yadav",
    warpBatch: "ORG-2026-118",
    fabricType: "2/40s Organic Cotton Warp",
    targetMeters: 500,
    actualMeters: 495,
    defectsCount: 3,
    downtimeMins: 10,
    downtimeReason: "Bobbin Reload",
    efficiency: 99.0,
    status: "VERIFIED"
  },
  {
    id: "LOG-9005",
    date: "2026-09-01",
    shift: "Shift B (Evening)",
    loomCode: "Loom-03",
    operatorName: "Amitabh Patel",
    warpBatch: "SLK-2026-009",
    fabricType: "20s Raw Silk Warp",
    targetMeters: 450,
    actualMeters: 310,
    defectsCount: 16,
    downtimeMins: 75,
    downtimeReason: "Heald Wire Friction Breakage",
    efficiency: 68.8,
    status: "PENDING"
  }
];

export const INITIAL_SKILL_GAPS: SkillGapItem[] = [
  {
    id: "sg-1",
    category: "Air-Jet Weft Timing & Pressure",
    requiredLevel: "Level 4 (Expert)",
    currentAvgScore: 68,
    targetScore: 90,
    workersAffected: 8,
    status: "CRITICAL",
    recommendedTraining: "Toyota Air Jet Pneumatics Module 3"
  },
  {
    id: "sg-2",
    category: "Warp Tension Calibration",
    requiredLevel: "Level 4 (Expert)",
    currentAvgScore: 74,
    targetScore: 85,
    workersAffected: 5,
    status: "MODERATE",
    recommendedTraining: "Electronic Let-off & Take-up Calibration"
  },
  {
    id: "sg-3",
    category: "Defect Detection & Reed Alignment",
    requiredLevel: "Level 3 (Proficient)",
    currentAvgScore: 82,
    targetScore: 88,
    workersAffected: 3,
    status: "MODERATE",
    recommendedTraining: "Quality Inspection & Knot-typing Speed"
  },
  {
    id: "sg-4",
    category: "Safety Protocols & Beam Loading",
    requiredLevel: "Level 5 (Master)",
    currentAvgScore: 94,
    targetScore: 95,
    workersAffected: 1,
    status: "OPTIMAL",
    recommendedTraining: "Annual Safety Refresher Course"
  }
];

export const INITIAL_PAYOUTS: PayoutRecord[] = [
  {
    id: "PAY-2026-0801",
    workerId: "W-104",
    workerName: "Sunita Verma",
    loomCode: "Loom-04",
    payPeriod: "September 2026",
    shiftHours: 40,
    outputMeters: 2560,
    pieceRatePerMeter: 4.5,
    baseEarnings: 11520,
    qualityBonus: 1200,
    groupEfficiencyBonus: 850,
    totalPayout: 13570,
    status: "APPROVED"
  },
  {
    id: "PAY-2026-0802",
    workerId: "W-101",
    workerName: "Rajesh Kumar",
    loomCode: "Loom-01",
    payPeriod: "September 2026",
    shiftHours: 40,
    outputMeters: 2400,
    pieceRatePerMeter: 4.5,
    baseEarnings: 10800,
    qualityBonus: 1000,
    groupEfficiencyBonus: 750,
    totalPayout: 12550,
    status: "APPROVED"
  },
  {
    id: "PAY-2026-0803",
    workerId: "W-102",
    workerName: "Priya Sharma",
    loomCode: "Loom-02",
    payPeriod: "September 2026",
    shiftHours: 40,
    outputMeters: 2300,
    pieceRatePerMeter: 4.5,
    baseEarnings: 10350,
    qualityBonus: 700,
    groupEfficiencyBonus: 600,
    totalPayout: 11650,
    status: "APPROVED"
  },
  {
    id: "PAY-2026-0804",
    workerId: "W-106",
    workerName: "Ananya Roy",
    loomCode: "Loom-06",
    payPeriod: "August 2026",
    shiftHours: 40,
    outputMeters: 2100,
    pieceRatePerMeter: 4.5,
    baseEarnings: 9450,
    qualityBonus: 500,
    groupEfficiencyBonus: 400,
    totalPayout: 10350,
    status: "PENDING_APPROVAL"
  },
  {
    id: "PAY-2026-0805",
    workerId: "W-103",
    workerName: "Amitabh Patel",
    loomCode: "Loom-03",
    payPeriod: "August 2026",
    shiftHours: 40,
    outputMeters: 1550,
    pieceRatePerMeter: 4.5,
    baseEarnings: 6975,
    qualityBonus: 0,
    groupEfficiencyBonus: 0,
    totalPayout: 6975,
    status: "PENDING_APPROVAL"
  }
];

export interface ExcelImportRow {
  rowId: number;
  date: string;
  shift: string;
  loomCode: string;
  workerCode: string;
  metersProduced: number;
  defectsCount: number;
  warpBatch: string;
  isValid: boolean;
  validationMessage?: string;
}

export const SAMPLE_EXCEL_DATA: ExcelImportRow[] = [
  { rowId: 1, date: "2026-09-02", shift: "Shift A", loomCode: "Loom-01", workerCode: "EMP-8801", metersProduced: 480, defectsCount: 4, warpBatch: "IND-2026-091", isValid: true },
  { rowId: 2, date: "2026-09-02", shift: "Shift A", loomCode: "Loom-02", workerCode: "EMP-8802", metersProduced: 460, defectsCount: 6, warpBatch: "KHD-2026-044", isValid: true },
  { rowId: 3, date: "2026-09-02", shift: "Shift A", loomCode: "Loom-99", workerCode: "EMP-8803", metersProduced: 310, defectsCount: 16, warpBatch: "SLK-2026-009", isValid: false, validationMessage: "Invalid Loom Code 'Loom-99' - Not registered in fleet" },
  { rowId: 4, date: "2026-09-02", shift: "Shift A", loomCode: "Loom-04", workerCode: "EMP-8804", metersProduced: 512, defectsCount: 2, warpBatch: "IND-2026-092", isValid: true },
  { rowId: 5, date: "2026-09-02", shift: "Shift A", loomCode: "Loom-06", workerCode: "EMP-INVALID", metersProduced: -50, defectsCount: 0, warpBatch: "CAM-2026-012", isValid: false, validationMessage: "Meters produced cannot be negative & Employee ID not found" },
  { rowId: 6, date: "2026-09-02", shift: "Shift A", loomCode: "Loom-08", workerCode: "EMP-8808", metersProduced: 495, defectsCount: 3, warpBatch: "ORG-2026-118", isValid: true },
];
