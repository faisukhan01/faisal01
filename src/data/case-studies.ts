export type Accent = 'ink' | 'cobalt' | 'violet';

export type GalleryPanel =
  | { title: string; kind: 'kpi'; data: { label: string; value: string; delta: string; trend: 'up' | 'down' | 'flat' }[] }
  | { title: string; kind: 'bars'; data: { label: string; value: number }[]; unit: string }
  | { title: string; kind: 'funnel'; data: { stage: string; value: number; pct: number }[] }
  | { title: string; kind: 'gantt'; data: { label: string; start: number; len: number; tone: Accent }[]; weeks: number }
  | { title: string; kind: 'list'; data: { title: string; meta: string; ts: string; tone: Accent }[] };

export interface CaseStudy {
  slug: string;
  name: string;
  sector: string;
  tag: string;
  tagline: string;
  accent: Accent;
  summary: string;
  cardTags: string[];
  heroMetric: { value: string; label: string };
  status: string;
  challenge: { title: string; body: string; painPoints: string[] };
  solution: { title: string; body: string; approach: { step: string; body: string }[] };
  stack: { layer: string; items: string[] }[];
  features: { icon: string; title: string; body: string }[];
  metrics: { value: string; label: string; sub?: string }[];
  gallery: GalleryPanel[];
  testimonial?: { quote: string; author: string; role: string };
  nextStep: { title: string; body: string; cta: string };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'faq-core',
    name: 'FaQ Core',
    sector: 'Flagship SaaS Platform',
    tag: 'Flagship',
    tagline: 'A focused platform that turns repetitive team workflows into one calm, reliable, multi-tenant product.',
    accent: 'cobalt',
    summary:
      'Our flagship SaaS platform — multi-tenant from day one, with REST API, role-based access, and a complete audit trail.',
    cardTags: ['Multi-tenant', 'REST API', 'RBAC', 'Audit trail'],
    heroMetric: { value: '99.98%', label: 'Uptime across 4 regions' },
    status: 'Shipping · v3.2',
    challenge: {
      title: 'The problem',
      body:
        'Teams were rebuilding the same primitives on every project — tenants, billing, roles, audit logs, background jobs. Each rebuild shipped late, leaked data between tenants, and broke at 3am. We wanted one calm surface that hides all of that without locking teams into a framework.',
      painPoints: [
        'Tenant isolation rebuilt per project, with at least one cross-tenant incident per quarter',
        'Role matrices hard-coded in controllers — every new customer meant a deploy',
        'Audit logs stored in the primary database, growing 40% / quarter',
        'Background jobs silently failing with no replay path',
      ],
    },
    solution: {
      title: 'How we built it',
      body:
        'FaQ Core is a thin, opinionated platform layer: a tenant context that flows through every request, a policy engine that reads from a versioned config, and an append-only event log that backs both the audit trail and the job queue. Nothing in the hot path touches the primary database for reads.',
      approach: [
        { step: 'Tenant context first', body: 'A request-scoped tenant resolver runs before routing — every downstream query is scoped automatically, no `where(tenantId)` to forget.' },
        { step: 'Policy as data', body: 'Role matrices live in a versioned YAML checked into git; the policy engine compiles to a decision tree on reload, no deploys for permission changes.' },
        { step: 'Event-sourced audit', body: 'Every mutation emits an immutable event to a log store; the audit UI is just a replay, the job queue is just a consumer.' },
        { step: 'Read replicas by default', body: 'All dashboard reads hit the replica; the primary is reserved for writes — dashboards stay fast as data grows.' },
      ],
    },
    stack: [
      { layer: 'Client', items: ['Next.js 16', 'React 19', 'Tailwind 4', 'TanStack Query'] },
      { layer: 'Edge', items: ['Caddy', 'Rate-limit', 'WAF', 'Edge cache'] },
      { layer: 'Services', items: ['Bun', 'tRPC', 'BullMQ', 'Policy engine'] },
      { layer: 'Data', items: ['PostgreSQL', 'Redis', 'S3', 'ClickHouse'] },
    ],
    features: [
      { icon: 'Building2', title: 'Tenant isolation', body: 'Row-level scoping enforced at the resolver — no cross-tenant access by construction.' },
      { icon: 'KeyRound', title: 'Policy as data', body: 'Roles and permissions in versioned config; changes ship without a deploy.' },
      { icon: 'ScrollText', title: 'Append-only audit', body: 'Every mutation is an event — the audit trail and the queue share one source of truth.' },
      { icon: 'Gauge', title: 'Dashboards that scale', body: 'All dashboard reads hit the replica; the primary stays free for writes.' },
      { icon: 'Webhook', title: 'Webhooks & retries', body: 'Outbound webhooks with exponential backoff and a replay console.' },
      { icon: 'ShieldCheck', title: 'SSO & SCIM', body: 'SAML + OIDC + SCIM provisioning out of the box, not an add-on.' },
    ],
    metrics: [
      { value: '99.98%', label: 'Uptime', sub: 'last 90 days' },
      { value: '38ms', label: 'p99 dashboard', sub: 'read replica' },
      { value: '0', label: 'Cross-tenant incidents', sub: 'since v3' },
      { value: '4.2M', label: 'Events / day', sub: 'audited' },
    ],
    gallery: [
      {
        title: 'Tenant overview',
        kind: 'kpi',
        data: [
          { label: 'Active tenants', value: '1,284', delta: '+6.2%', trend: 'up' },
          { label: 'Seats', value: '18,402', delta: '+3.1%', trend: 'up' },
          { label: 'MRR', value: '$214k', delta: '+8.7%', trend: 'up' },
          { label: 'Churn', value: '0.4%', delta: '-0.2pt', trend: 'down' },
        ],
      },
      {
        title: 'API traffic · last 12 weeks',
        kind: 'bars',
        unit: 'req/s',
        data: [
          { label: 'W1', value: 42 }, { label: 'W2', value: 51 }, { label: 'W3', value: 48 },
          { label: 'W4', value: 63 }, { label: 'W5', value: 71 }, { label: 'W6', value: 68 },
          { label: 'W7', value: 82 }, { label: 'W8', value: 79 }, { label: 'W9', value: 94 },
          { label: 'W10', value: 88 }, { label: 'W11', value: 102 }, { label: 'W12', value: 118 },
        ],
      },
      {
        title: 'Onboarding funnel',
        kind: 'funnel',
        data: [
          { stage: 'Sign-up', value: 10000, pct: 100 },
          { stage: 'Verified', value: 7200, pct: 72 },
          { stage: 'Workspace', value: 5400, pct: 54 },
          { stage: 'First event', value: 3850, pct: 38 },
          { stage: 'Paid', value: 1280, pct: 12 },
        ],
      },
      {
        title: 'Release timeline · Q3',
        kind: 'gantt',
        weeks: 8,
        data: [
          { label: 'Policy v2', start: 0, len: 2, tone: 'cobalt' },
          { label: 'SCIM', start: 1, len: 3, tone: 'ink' },
          { label: 'Replica cutover', start: 3, len: 1, tone: 'violet' },
          { label: 'Webhook replay', start: 4, len: 3, tone: 'cobalt' },
        ],
      },
    ],
    testimonial: {
      quote:
        'We replaced a six-month internal platform project with FaQ Core in two weeks. The audit log alone would have taken us a quarter to build.',
      author: 'Head of Platform',
      role: 'Series B fintech',
    },
    nextStep: {
      title: 'Want a tenant of your own?',
      body: 'We onboard one team at a time so the founders can shape the policy and event schema with you. Typical handover is under two weeks.',
      cta: 'Request a demo',
    },
  },
  {
    slug: 'faq-toolkit',
    name: 'FaQ Toolkit',
    sector: 'Productized Internal Tools',
    tag: 'Productized',
    tagline: 'The internal tools we built for ourselves — hardened, documented, and offered as subscriptions.',
    accent: 'ink',
    summary:
      'A CLI, an automation engine, and a library of integrations — the same primitives FaQ Core runs on, available standalone.',
    cardTags: ['CLI', 'Automations', 'Integrations', 'Templates'],
    heroMetric: { value: '12,400+', label: 'Automations run per week' },
    status: 'Shipping · v2.7',
    challenge: {
      title: 'The problem',
      body:
        'Every team we onboarded kept asking for the same three things: a CLI that could talk to their stack without a glue script, an automation runner that did not die on the first retry, and a set of integrations they could trust to not leak secrets. We had all three internally — so we productized them.',
      painPoints: [
        'CLI tools that required a 200-line wrapper before the first command',
        'Automation runners that lost state on restart and had no replay',
        'Integrations that hardcoded secrets instead of a vault',
        'No templates — every team rebuilt the same scaffolding',
      ],
    },
    solution: {
      title: 'How we built it',
      body:
        'FaQ Toolkit is the same CLI, automation engine, and integration pack that powers FaQ Core, packaged to run standalone. The CLI is a single binary with a plugin protocol. The automation engine is a deterministic state machine backed by the same append-only log. Integrations read from a local vault — never from env.',
      approach: [
        { step: 'Single binary', body: 'The CLI ships as one Bun-compiled binary with a stable plugin protocol — no node_modules, no wrapper.' },
        { step: 'Deterministic runner', body: 'Automations are state machines; every transition is an event, so a crash is a replay, not a data loss.' },
        { step: 'Vault-first secrets', body: 'Integrations resolve credentials from a local vault, never from env — secrets never reach logs or git.' },
        { step: 'Templates that compile', body: 'Templates are typed configs, not copy-paste — `toolkit init` produces a project that type-checks on day one.' },
      ],
    },
    stack: [
      { layer: 'Client', items: ['Bun binary', 'TypeScript', 'Ink (TUI)', 'Plugin host'] },
      { layer: 'Runtime', items: ['Bun', 'State machine', 'Scheduler', 'Replay log'] },
      { layer: 'Integrations', items: ['Slack', 'Linear', 'Stripe', 'Postgres'] },
      { layer: 'Storage', items: ['SQLite', 'Vault', 'S3 cache', 'Local FS'] },
    ],
    features: [
      { icon: 'Terminal', title: 'One binary', body: 'A single Bun-compiled binary with a stable plugin protocol — no node_modules.' },
      { icon: 'Workflow', title: 'Deterministic automations', body: 'State machines backed by an event log; a crash is a replay, not data loss.' },
      { icon: 'Lock', title: 'Vault-first secrets', body: 'Credentials resolve from a local vault — never from env, never in logs.' },
      { icon: 'Blocks', title: 'Typed templates', body: 'Templates are configs that type-check — `toolkit init` produces a project that compiles.' },
      { icon: 'Plug', title: 'Integration pack', body: 'Slack, Linear, Stripe, Postgres — same adapters FaQ Core ships, no glue.' },
      { icon: 'History', title: 'Replay console', body: 'Every automation run is inspectable step-by-step from the TUI.' },
    ],
    metrics: [
      { value: '12,400+', label: 'Runs / week', sub: 'deterministic' },
      { value: '0', label: 'Lost runs', sub: 'since v2' },
      { value: '1 binary', label: 'Footprint', sub: 'no runtime' },
      { value: '11ms', label: 'p99 dispatch', sub: 'event→handler' },
    ],
    gallery: [
      {
        title: 'Automation health',
        kind: 'kpi',
        data: [
          { label: 'Runs / week', value: '12,402', delta: '+11%', trend: 'up' },
          { label: 'Success rate', value: '99.7%', delta: '+0.3pt', trend: 'up' },
          { label: 'p99 dispatch', value: '11ms', delta: '-2ms', trend: 'down' },
          { label: 'Replays', value: '47', delta: '+9', trend: 'up' },
        ],
      },
      {
        title: 'Integration calls · last 12 weeks',
        kind: 'bars',
        unit: 'k calls',
        data: [
          { label: 'W1', value: 28 }, { label: 'W2', value: 34 }, { label: 'W3', value: 31 },
          { label: 'W4', value: 44 }, { label: 'W5', value: 49 }, { label: 'W6', value: 52 },
          { label: 'W7', value: 58 }, { label: 'W8', value: 61 }, { label: 'W9', value: 67 },
          { label: 'W10', value: 71 }, { label: 'W11', value: 78 }, { label: 'W12', value: 84 },
        ],
      },
      {
        title: 'Run log · live',
        kind: 'list',
        data: [
          { title: 'stripe.refund.sync', meta: '4 records · 11ms', ts: '12:04:21', tone: 'cobalt' },
          { title: 'linear.ticket.mirror', meta: '1 record · 7ms', ts: '12:04:18', tone: 'ink' },
          { title: 'slack.digest.daily', meta: '3 channels · 24ms', ts: '12:03:59', tone: 'violet' },
          { title: 'postgres.vacuum.notify', meta: 'skipped', ts: '12:03:40', tone: 'ink' },
          { title: 's3.backup.rotate', meta: '7 objects · 88ms', ts: '12:03:12', tone: 'cobalt' },
        ],
      },
    ],
    testimonial: {
      quote:
        'The CLI replaced a glue repo we had been hating for two years. The automations stopped dying on Fridays. That is worth the subscription alone.',
      author: 'Staff Engineer',
      role: 'Logistics scale-up',
    },
    nextStep: {
      title: 'Try the binary',
      body: 'The CLI is free for local use; the automation runner and integration pack are a flat monthly subscription. One founder handles onboarding.',
      cta: 'Request a demo',
    },
  },
  {
    slug: 'faq-labs',
    name: 'FaQ Labs',
    sector: 'Incubating Experiments',
    tag: 'Incubating',
    tagline: 'Early-stage bets on uncomfortable problems. Some graduate into products — most teach us something first.',
    accent: 'violet',
    summary:
      'A small lab for prototypes, AI tooling, and research. Public write-ups, honest post-mortems, and the occasional open-source release.',
    cardTags: ['Prototypes', 'AI tooling', 'Research', 'Open source'],
    heroMetric: { value: '7', label: 'Experiments in flight' },
    status: 'Incubating · rolling',
    challenge: {
      title: 'The problem',
      body:
        'A product company that stops experimenting stops being a product company. We wanted a sanctioned place to chase uncomfortable problems — where the goal is to learn, not to ship a logo. The hard part was making the lab honest: kill the things that do not work, in public.',
      painPoints: [
        'No sanctioned space for high-variance bets — they leaked into product work',
        'Experiments with no kill criteria ran for months and burned focus',
        'No public record, so the same dead-end got tried twice',
        'AI prototypes with no eval harness — vibes as a metric',
      ],
    },
    solution: {
      title: 'How we run it',
      body:
        'FaQ Labs is a lightweight process, not a product. Each experiment is a one-page brief with a falsifiable thesis, a kill metric, and a two-week budget. Results — including the kills — are published as write-ups. The few that graduate become products; the rest become lessons.',
      approach: [
        { step: 'One-page brief', body: 'Every experiment starts with a falsifiable thesis, a kill metric, and a two-week budget — written before the first commit.' },
        { step: 'Eval harness for AI', body: 'AI prototypes ship with a golden-set eval from day one — no vibes-as-a-metric.' },
        { step: 'Public post-mortems', body: 'Kills are published with the same care as launches — so the next team does not repeat the dead-end.' },
        { step: 'Graduation gate', body: 'An experiment becomes a product only after a real user pays or a real workload runs for 30 days.' },
      ],
    },
    stack: [
      { layer: 'Brief', items: ['Thesis', 'Kill metric', 'Budget'] },
      { layer: 'Prototype', items: ['Bun', 'Next.js', 'LLM SDK', 'Eval set'] },
      { layer: 'Eval', items: ['Golden set', 'Regression', 'Cost / token'] },
      { layer: 'Publish', items: ['Write-up', 'Post-mortem', 'Open source'] },
    ],
    features: [
      { icon: 'FlaskConical', title: 'One-page briefs', body: 'A falsifiable thesis, a kill metric, and a two-week budget — before the first commit.' },
      { icon: 'Microscope', title: 'Eval harness', body: 'AI prototypes ship with a golden-set eval from day one — no vibes as a metric.' },
      { icon: 'FileText', title: 'Public post-mortems', body: 'Kills are published with the same care as launches — the next team does not repeat the dead-end.' },
      { icon: 'GitBranch', title: 'Open source releases', body: 'When a primitive is generally useful, it ships to GitHub under a permissive license.' },
      { icon: 'Scale', title: 'Graduation gate', body: 'A real user pays or a real workload runs 30 days before an experiment becomes a product.' },
      { icon: 'Timer', title: 'Two-week budgets', body: 'Time-boxed by default — focus is the scarcest resource in a two-person company.' },
    ],
    metrics: [
      { value: '7', label: 'In flight', sub: 'this cycle' },
      { value: '23', label: 'Killed', sub: 'in public' },
      { value: '4', label: 'Graduated', sub: 'to products' },
      { value: '100%', label: 'Post-mortems', sub: 'published' },
    ],
    gallery: [
      {
        title: 'Lab board',
        kind: 'kpi',
        data: [
          { label: 'In flight', value: '7', delta: '+2', trend: 'up' },
          { label: 'Killed (cycle)', value: '3', delta: '+1', trend: 'flat' },
          { label: 'Graduated (yr)', value: '4', delta: '+1', trend: 'up' },
          { label: 'Open PRs', value: '18', delta: '+5', trend: 'up' },
        ],
      },
      {
        title: 'Eval scores · AI experiments',
        kind: 'bars',
        unit: 'pass %',
        data: [
          { label: 'E1', value: 62 }, { label: 'E2', value: 71 }, { label: 'E3', value: 58 },
          { label: 'E4', value: 79 }, { label: 'E5', value: 84 }, { label: 'E6', value: 67 },
          { label: 'E7', value: 91 }, { label: 'E8', value: 74 }, { label: 'E9', value: 88 },
          { label: 'E10', value: 81 }, { label: 'E11', value: 93 }, { label: 'E12', value: 86 },
        ],
      },
      {
        title: 'Cycle timeline · 8 weeks',
        kind: 'gantt',
        weeks: 8,
        data: [
          { label: 'Eval harness', start: 0, len: 2, tone: 'violet' },
          { label: 'Briefs ×3', start: 1, len: 2, tone: 'ink' },
          { label: 'Prototype', start: 2, len: 4, tone: 'cobalt' },
          { label: 'Graduation gate', start: 6, len: 2, tone: 'violet' },
        ],
      },
    ],
    nextStep: {
      title: 'Read the write-ups',
      body: 'Every experiment — killed or graduated — has a one-page public post-mortem. We publish the dead-ends with the same care as the launches.',
      cta: 'See the lab notes',
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
