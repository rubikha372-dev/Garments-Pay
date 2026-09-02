# Garments-Pay (Asgard Production Hub)

A factory floor and piece-rate payroll dashboard built for garment and weaving mills. It tracks loom operations, shift outputs, operator skill competency, and worker piece-rate wages with quality incentives.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data State**: Seed data in `lib/data.ts` + `localStorage` for shift entries

---

## Getting Started

### Prerequisites
- Node.js 18.17 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/rubikha372-dev/Garments-Pay.git
cd Garments-Pay

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To build and run in production mode:
```bash
npm run build
npm run start
```

---

## What's Included

| Route | Page | Description |
|---|---|---|
| `/` | **Overview Dashboard** | Real-time fleet status, target vs. actual meterage, defect rate, cycle payroll KPI card, and recent logs. |
| `/production` | **Daily Production Logs** | Audit log with multi-filter search (shift, verification status, loom operating status: Active / Idle / Maintenance). |
| `/production/entry` | **Shift Production Entry** | Form to record loom meterage, warp batch, downtime minutes, and calculate live efficiency. Submissions save to `localStorage`. |
| `/payouts` | **Group Payout Ledger** | Piece-rate wage breakdown (base wage + quality bonus + group efficiency bonus). Includes pay-period filtering and row detail drawers. |
| `/excel/import` | **Excel Batch Import** | 6-step wizard: Upload → Parse → Column Mapping → Validation → Review → Database Commit. |
| `/skills` | **Skill-Gap Matrix** | Operator skill tiers (Master Weaver to Grade B), competency gaps, and recommended training modules. |
| `/workers/[id]` | **Worker Profile** | Individual worker dashboard showing certifications, efficiency history, and total meterage. |
| `/login` | **Login Screen** | Clean authentication entry screen. |

---

## Current Architecture & Data Flow

Right now, the project is a **standalone frontend**:
- Pre-seeded records for looms, workers, logs, and payouts live in `lib/data.ts`.
- When an operator submits a new shift entry at `/production/entry`, it persists into browser `localStorage` under `asgard_shift_logs`.
- The `/production` page automatically merges those `localStorage` entries with the seed records so newly added shifts show up immediately in the table.

---

## How to Connect a Real Backend

To replace the simulated data with a real database and live loom sensors, follow these steps:

### 1. Database Setup
Pick your database (PostgreSQL, MySQL, or MongoDB).

Recommended core tables:
- `looms` (id, code, model, status, speed_rpm, current_operator_id)
- `workers` (id, emp_code, name, skill_grade, piece_rate)
- `shift_logs` (id, loom_id, worker_id, shift, actual_meters, target_meters, defects, downtime_mins, status)
- `payouts` (id, worker_id, pay_period, base_wage, quality_bonus, group_bonus, total_amount, status)

### 2. Create Next.js API Routes
You can add route handlers directly inside the `app/api/` folder:

- `app/api/production/route.ts`
  - `GET`: Fetch production logs from the DB with query params (`?shift=...&status=...`)
  - `POST`: Insert a new shift production entry into the database

- `app/api/payouts/route.ts`
  - `GET`: Calculate or retrieve worker payroll by pay period
  - `PATCH`: Update approval status (`APPROVED` / `PENDING_APPROVAL`)

- `app/api/looms/route.ts`
  - `GET`: Get current loom fleet metrics

### 3. Replace Client State with API Calls
In each page:
- In `app/production/page.tsx`: Replace `INITIAL_SHIFT_LOGS` with a `fetch('/api/production')` call or React Query / SWR.
- In `app/production/entry/page.tsx`: In `handleSubmit`, replace the `localStorage.setItem` with:
  ```ts
  await fetch('/api/production', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newLog),
  });
  ```
- In `app/payouts/page.tsx`: Fetch payout records from `/api/payouts?period=${filterPeriod}` and send patch requests when toggling approval.

### 4. Real-time Loom Telemetry (Optional)
If you connect physical looms via IoT (MQTT/Modbus):
- Set up a WebSocket endpoint or Server-Sent Events (SSE) route at `app/api/telemetry/route.ts`.
- In `app/page.tsx`, listen to incoming metrics and update loom cards live without page refreshes.

---

## Project Structure

```text
├── app/
│   ├── excel/import/page.tsx     # Excel bulk import wizard
│   ├── login/page.tsx            # Login screen
│   ├── payouts/page.tsx          # Payout ledger & period filtering
│   ├── production/
│   │   ├── entry/page.tsx        # Shift entry form
│   │   └── page.tsx              # Daily production audit logs
│   ├── skills/page.tsx           # Skill gap matrix
│   ├── workers/[id]/page.tsx     # Worker profile view
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # App root layout
│   └── page.tsx                  # Overview dashboard
├── components/
│   └── AppLayout.tsx             # Shared sidebar, header, navigation
├── lib/
│   └── data.ts                   # Types and mock data sets
└── testsprite_tests/             # Automated test suite & test plans
```

---

## License

Private / Internal project.
