/* — FaQ Systems product case studies (Concordia + Staffist) — */

export type Accent = 'cobalt' | 'navy';

export type Panel =
  | {
      kind: 'kpis';
      title: string;
      kpis: { label: string; value: string; trend: string; up: boolean }[];
    }
  | { kind: 'bars'; title: string; bars: { label: string; value: number }[] }
  | { kind: 'modules'; title: string; modules: { name: string; pct: number }[] }
  | { kind: 'feed'; title: string; items: { text: string; time: string }[] }
  | {
      kind: 'gantt';
      title: string;
      rows: { name: string; blocks: { start: number; width: number; solid?: boolean }[] }[];
    }
  | {
      kind: 'availability';
      title: string;
      staff: { name: string; status: 'on' | 'soon' | 'off' }[];
    }
  | { kind: 'funnel'; title: string; stages: { label: string; value: number }[] };

export interface CaseStudy {
  slug: string;
  name: string;
  logo: string;
  logoHeightClass: string;
  sector: string;
  badge: string;
  accent: Accent;
  tagline: string;
  summary: string;
  tags: string[];
  cardMetrics: { value: string; label: string }[];
  status: string;
  keyMetrics: { value: string; label: string; note: string }[];
  overview: string;
  challenge: { title: string; body: string; painPoints: string[] };
  solution: {
    title: string;
    body: string;
    approach: { title: string; body: string }[];
  };
  features: { title: string; body: string }[];
  tech: { layer: string; stack: string[] }[];
  outcomes: { value: string; label: string; note: string }[];
  dashboard: { url: string; title: string; panels: Panel[] };
  quote: { text: string; author: string; role: string };
  cta: { title: string; body: string };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'concordia',
    name: 'Concordia',
    logo: '/products/concordia.png',
    logoHeightClass: 'h-12 sm:h-14 w-auto',
    sector: 'Education',
    badge: 'Flagship Product',
    accent: 'cobalt',
    tagline:
      'A complete college management system — every workflow, one platform, even biometric attendance.',
    summary:
      'Concordia Colleges runs its entire campus on this system: admissions, biometric attendance, fees, examinations, HR, payroll and academic records — twelve modules, one calm console.',
    tags: [
      'Biometric Attendance',
      'Admissions',
      'Finance & Fees',
      'Examinations',
      'HR & Payroll',
      'Academic Records',
    ],
    cardMetrics: [
      { value: '12', label: 'Modules' },
      { value: '96.4%', label: 'Attendance' },
      { value: '4,200', label: 'Students' },
    ],
    status: 'Live in production',
    keyMetrics: [
      { value: '4,200', label: 'Students managed', note: 'every campus record, one system' },
      { value: '96.4%', label: 'Daily attendance', note: 'biometric check-in, live' },
      { value: '87%', label: 'Fee collection', note: 'from billing to receipts' },
      { value: '12', label: 'Integrated modules', note: 'admissions to payroll' },
    ],
    overview:
      'Concordia is a full college management system built for a network of campuses. Before it existed, the college ran on paper registers, spreadsheets and disconnected tools — one system for attendance, another for fees, a third for exams. Concordia replaces all of it with a single platform where every module talks to the others: attendance feeds the attendance register, fees feed finance, exams feed transcripts. Even biometric devices are first-class citizens — fingerprint check-ins land in the system in real time.',
    challenge: {
      title: 'The problem',
      body: 'A growing campus network with thousands of students was drowning in manual processes. Attendance was taken on paper and typed up days later. Fee records lived in spreadsheets that drifted from reality. Exam results were compiled by hand. Nothing reconciled with anything.',
      painPoints: [
        'Paper attendance delayed records by days and made audits painful',
        'Fee collection tracked in spreadsheets with no receipts, no reminders, no reconciliation',
        'Exam results compiled manually across departments — slow and error-prone',
        'HR, payroll and academic records each in a separate silo with no single source of truth',
      ],
    },
    solution: {
      title: 'The solution',
      body: 'We built Concordia as one platform with twelve integrated modules sharing a single database and a consistent, calm admin console. Every workflow — from a prospective student\u2019s first inquiry to their final transcript — is designed, engineered and operated end-to-end by FaQ Systems.',
      approach: [
        {
          title: 'Single source of truth',
          body: 'One typed schema for students, staff, courses, fees and grades. Every module reads and writes the same records — no exports, no syncing.',
        },
        {
          title: 'Biometric-first attendance',
          body: 'Fingerprint devices push check-ins to the platform in real time. Late arrivals, absences and proxy attempts are flagged instantly.',
        },
        {
          title: 'Money as a module',
          body: 'Fee structures, discounts, installments, reminders and receipts — finance is a first-class citizen, not a spreadsheet bolted on the side.',
        },
        {
          title: 'Role-based console',
          body: 'Admins, accountants, teachers and exam officers each get a focused view of the same system — with an audit trail on every action.',
        },
      ],
    },
    features: [
      {
        title: 'Biometric attendance',
        body: 'Fingerprint check-ins sync live; the daily register assembles itself.',
      },
      {
        title: 'Admissions pipeline',
        body: 'From inquiry to enrollment — application forms, merit lists, document checks.',
      },
      {
        title: 'Finance & fees',
        body: 'Structures, installments, reminders, receipts and full reconciliation.',
      },
      {
        title: 'Examinations',
        body: 'Scheduling, seating plans, marks entry, moderation and report cards.',
      },
      {
        title: 'HR & payroll',
        body: 'Staff records, contracts, leave and salary runs computed from attendance.',
      },
      {
        title: 'Academic records',
        body: 'Transcripts, character certificates and verifiable academic history.',
      },
    ],
    tech: [
      { layer: 'Client', stack: ['Next.js', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Services', stack: ['Node.js', 'REST API', 'Role-based access'] },
      { layer: 'Data', stack: ['PostgreSQL', 'Redis cache', 'Audit trail'] },
      { layer: 'Devices', stack: ['Biometric SDK', 'Webhooks', 'Offline sync'] },
    ],
    outcomes: [
      { value: '96.4%', label: 'daily attendance', note: 'recorded live, not typed up days later' },
      { value: '87%', label: 'fee collection', note: 'up from manual spreadsheet tracking' },
      { value: '12', label: 'modules shipped', note: 'all live in production today' },
      { value: '1', label: 'source of truth', note: 'for every record on campus' },
    ],
    dashboard: {
      url: 'admin.concordia.edu',
      title: 'Admin Console',
      panels: [
        {
          kind: 'kpis',
          title: 'Today at a glance',
          kpis: [
            { label: 'Students', value: '4,200', trend: '+38 this term', up: true },
            { label: 'Attendance', value: '96.4%', trend: '+1.2% vs last week', up: true },
            { label: 'Fees collected', value: '87%', trend: 'on plan', up: true },
            { label: 'Modules live', value: '12', trend: 'all systems normal', up: true },
          ],
        },
        {
          kind: 'bars',
          title: 'Attendance — last 12 weeks',
          bars: [
            { label: 'W1', value: 91 },
            { label: 'W2', value: 93 },
            { label: 'W3', value: 92 },
            { label: 'W4', value: 95 },
            { label: 'W5', value: 94 },
            { label: 'W6', value: 96 },
            { label: 'W7', value: 95 },
            { label: 'W8', value: 97 },
            { label: 'W9', value: 96 },
            { label: 'W10', value: 96 },
            { label: 'W11', value: 97 },
            { label: 'W12', value: 96 },
          ],
        },
        {
          kind: 'modules',
          title: 'Module uptime',
          modules: [
            { name: 'Admissions', pct: 92 },
            { name: 'Finance', pct: 88 },
            { name: 'Examinations', pct: 95 },
            { name: 'HR & Payroll', pct: 80 },
            { name: 'Academic Records', pct: 90 },
          ],
        },
        {
          kind: 'feed',
          title: 'Live activity',
          items: [
            { text: 'New admission inquiry — ICS Part 1', time: '2m ago' },
            { text: 'Fee receipt #R-2481 issued — Rs 18,500', time: '9m ago' },
            { text: 'Biometric sync complete — Block C', time: '14m ago' },
            { text: 'Marks entry submitted — Physics XI-B', time: '31m ago' },
            { text: 'Payroll run confirmed — October', time: '1h ago' },
          ],
        },
      ],
    },
    quote: {
      text: 'FaQ Systems delivered what three vendors said was impossible — one system for the whole campus, running on real devices, live within a term.',
      author: 'Campus Director',
      role: 'Concordia Colleges',
    },
    cta: {
      title: 'Want a system like this?',
      body: 'Tell us what slows your institution down — we\u2019ll show you what it looks like solved.',
    },
  },
  {
    slug: 'staffist',
    name: 'Staffist',
    logo: '/products/staffist-logo.png',
    logoHeightClass: 'h-[58px] sm:h-[68px] w-auto',
    sector: 'Recruitment · UK',
    badge: 'Client Project',
    accent: 'navy',
    tagline:
      'A UK recruitment and staff management platform — matching, scheduling and compliance in real time.',
    summary:
      'Staffist runs shift-based staffing end to end for UK clients: real-time staff matching, shift scheduling, compliance tracking and placements — from application to clock-in.',
    tags: [
      'Shift Management',
      'Compliance',
      'Placement',
      'Real-time Matching',
      'Staff Scheduling',
    ],
    cardMetrics: [
      { value: '340', label: 'Active staff' },
      { value: '128', label: 'Shifts today' },
      { value: '99.1%', label: 'Compliance' },
    ],
    status: 'Live in production',
    keyMetrics: [
      { value: '340', label: 'Active staff', note: 'vetted and compliance-checked' },
      { value: '128', label: 'Shifts today', note: 'scheduled, filled and tracked' },
      { value: '99.1%', label: 'Compliance rate', note: 'documents, training, right-to-work' },
      { value: '42', label: 'Placements this month', note: 'from application to clock-in' },
    ],
    overview:
      'Staffist is a recruitment and staff management platform built for a UK client. It connects employers who need shift-based staff with a pool of vetted candidates — and carries the whole relationship: application, screening, compliance checks, real-time matching to open shifts, scheduling, and placement tracking. The platform\u2019s job is to make a heavily regulated, fast-moving staffing operation feel calm.',
    challenge: {
      title: 'The problem',
      body: 'UK staffing is regulated, fast and unforgiving: right-to-work checks, training certificates and shift compliance all have deadlines, while shifts need filling in hours, not days. The client\u2019s existing process mixed phone calls, spreadsheets and goodwill — compliance gaps were discovered late, and filling shifts meant hours of calls.',
      painPoints: [
        'Compliance documents tracked manually — expirations discovered after the fact',
        'Filling one shift meant calling down a list until someone answered',
        'No real-time view of who is available, qualified and compliant right now',
        'Placement history scattered across inboxes — no single record of who worked where',
      ],
    },
    solution: {
      title: 'The solution',
      body: 'We built Staffist as a real-time staffing platform: a vetted staff pool with living compliance profiles, an engine that matches staff to shifts on availability and qualifications, and a console that shows the whole operation — coverage, gaps and compliance — at a glance.',
      approach: [
        {
          title: 'Living compliance profiles',
          body: 'Right-to-work, training and certification documents with expiry tracking — the platform knows who is compliant before a shift is offered.',
        },
        {
          title: 'Real-time matching',
          body: 'Open shifts are matched against availability, qualifications and proximity — and offered to the best-fit staff first.',
        },
        {
          title: 'Shift console',
          body: 'A 24-hour coverage view with per-staff shift blocks, gaps visible instantly, and one-click fill actions.',
        },
        {
          title: 'Placement pipeline',
          body: 'From application through screening, interview and placement — every stage tracked with its own funnel metrics.',
        },
      ],
    },
    features: [
      {
        title: 'Shift scheduling',
        body: 'A 24h coverage board — create, fill and track shifts in one view.',
      },
      {
        title: 'Compliance tracking',
        body: 'Document and certification expiry monitored per staff member.',
      },
      {
        title: 'Real-time matching',
        body: 'Shifts offered to best-fit available staff automatically.',
      },
      {
        title: 'Staff availability',
        body: 'Live on / soon / off status so dispatch never calls the wrong person.',
      },
      {
        title: 'Placement funnel',
        body: 'Applications to placements tracked stage by stage with metrics.',
      },
      {
        title: 'Audit-ready records',
        body: 'Every placement, check-in and change logged and exportable.',
      },
    ],
    tech: [
      { layer: 'Client', stack: ['Next.js', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Services', stack: ['Node.js', 'Matching engine', 'Notifications'] },
      { layer: 'Data', stack: ['PostgreSQL', 'Scheduling store', 'Audit trail'] },
      { layer: 'Integrations', stack: ['Payments', 'SMS/Email', 'Calendar sync'] },
    ],
    outcomes: [
      { value: '340', label: 'active staff', note: 'in the vetted, compliant pool' },
      { value: '99.1%', label: 'compliance rate', note: 'gaps surface before deadlines, not after' },
      { value: '42', label: 'placements / month', note: 'application to clock-in, fully tracked' },
      { value: '128', label: 'shifts daily', note: 'scheduled and filled through the console' },
    ],
    dashboard: {
      url: 'console.staffist.co.uk',
      title: 'Shift Console',
      panels: [
        {
          kind: 'kpis',
          title: 'Operations today',
          kpis: [
            { label: 'Active staff', value: '340', trend: '+12 this week', up: true },
            { label: 'Shifts today', value: '128', trend: '96% filled', up: true },
            { label: 'Compliance', value: '99.1%', trend: '2 docs expiring soon', up: false },
            { label: 'Placements', value: '42', trend: 'this month', up: true },
          ],
        },
        {
          kind: 'gantt',
          title: 'Shift coverage — next 24h',
          rows: [
            { name: 'Amelia R.', blocks: [{ start: 0, width: 25 }, { start: 55, width: 30 }] },
            { name: 'Daniel K.', blocks: [{ start: 15, width: 30, solid: true }] },
            { name: 'Priya S.', blocks: [{ start: 40, width: 35 }, { start: 85, width: 15 }] },
            { name: 'Marcus T.', blocks: [{ start: 60, width: 25, solid: true }] },
          ],
        },
        {
          kind: 'availability',
          title: 'Staff availability',
          staff: [
            { name: 'Amelia R.', status: 'on' },
            { name: 'Daniel K.', status: 'on' },
            { name: 'Priya S.', status: 'soon' },
            { name: 'Marcus T.', status: 'soon' },
            { name: 'Elena V.', status: 'off' },
            { name: 'Jonas B.', status: 'off' },
          ],
        },
        {
          kind: 'funnel',
          title: 'Placement funnel — 30 days',
          stages: [
            { label: 'Applied', value: 1240 },
            { label: 'Screened', value: 480 },
            { label: 'Interviewed', value: 180 },
            { label: 'Placed', value: 42 },
          ],
        },
      ],
    },
    quote: {
      text: 'FaQ Systems took our mess of calls and spreadsheets and turned it into one console we actually trust. Compliance is no longer a surprise.',
      author: 'Operations Lead',
      role: 'Staffist, UK',
    },
    cta: {
      title: 'Want a system like this?',
      body: 'Bring us the workflow that eats your week — we\u2019ll show you the platform that gives it back.',
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
