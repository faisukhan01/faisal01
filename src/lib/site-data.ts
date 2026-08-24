// NETSOL site content data - sourced from PDF specification

export const NAV_ITEMS = [
  {
    label: "Platform",
    href: "#platform",
    children: [
      { label: "Transcend Platform", href: "#platform" },
      { label: "Digital Retail", href: "#platform" },
      { label: "AI Labs", href: "#platform" },
      { label: "Marketplace", href: "#marketplace" },
    ],
  },
  { label: "Marketplace", href: "#marketplace" },
  {
    label: "Consultancy",
    href: "#consultancy",
    children: [
      { label: "Information Security", href: "#consultancy" },
      { label: "Digital Solutions", href: "#consultancy" },
      { label: "AI/ML & Data Analytics", href: "#consultancy" },
      { label: "Generative AI", href: "#consultancy" },
      { label: "Cloud Services", href: "#consultancy" },
    ],
  },
  {
    label: "Solutions",
    href: "#solutions",
    children: [
      { label: "Asset Finance", href: "#solutions" },
      { label: "Automotive Finance", href: "#solutions" },
      { label: "Equipment Finance", href: "#solutions" },
    ],
  },
  { label: "Insights", href: "#insights" },
  {
    label: "About Us",
    href: "#about",
    children: [
      { label: "Company Information", href: "#about" },
      { label: "Leadership", href: "#about" },
      { label: "News", href: "#about" },
      { label: "Investors", href: "#about" },
    ],
  },
  { label: "Contact Us", href: "#contact" },
];

export const TYPEWRITER_WORDS = ["seamless", "intelligent", "connected", "frictionless"];

export const HERO_SLIDES = [
  {
    id: 1,
    label: "Digital Retail",
    title: "End-to-end digital auto retail",
    image:
      "https://images.unsplash.com/photo-1492144534245-b3aa4f9b9e9b?auto=format&fit=crop&w=1200&q=80",
    alt: "Connected vehicle showroom",
  },
  {
    id: 2,
    label: "Finance",
    title: "Transcend Finance for lenders",
    image:
      "https://images.unsplash.com/photo-1552519983-d3a4d4b6a3a1?auto=format&fit=crop&w=1200&q=80",
    alt: "Auto finance platform",
  },
  {
    id: 3,
    label: "Marketplace",
    title: "One connected marketplace",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a6ecb3d70d?auto=format&fit=crop&w=1200&q=80",
    alt: "Marketplace of lenders",
  },
  {
    id: 4,
    label: "AI Labs",
    title: "AI that learns your business",
    image:
      "https://images.unsplash.com/photo-1535392461306-3cbaf619f9cd?auto=format&fit=crop&w=1200&q=80",
    alt: "AI-powered analytics",
  },
  {
    id: 5,
    label: "Consultancy",
    title: "Strategy for what's next",
    image:
      "https://images.unsplash.com/photo-1494972627056-56988630dcd1?auto=format&fit=crop&w=1200&q=80",
    alt: "Consultancy services",
  },
];

// 22 brand logos from PDF
export const BRAND_LOGOS = [
  "BMW",
  "BYD",
  "Chase",
  "Great Wall",
  "Peterbilt",
  "Volvo",
  "Yamaha",
  "Mercedes-Benz",
  "Close Brothers",
  "Nissan",
  "Toyota",
  "PACCAR",
  "Haydock",
  "Isuzu",
  "Ikano Bank",
  "Ford",
  "Hawaii Bank",
  "AIG",
  "EM Bank",
  "MINI",
  "Daimler",
  "BMO",
  "Bibby",
  "Charles S. Dean",
];

export const TRANSCEND_TABS = [
  {
    id: "digital-retail",
    label: "Digital Retail",
    title: "Transcend Digital Retail",
    description:
      "A unified online-to-showroom experience. Consumers configure, finance, and reserve vehicles online while dealers retain full visibility of every interaction.",
    categories: ["Originations", "E-Contracting", "Credit Decisioning", "Showroom Sync", "Inventory"],
    accent: "#1d81f2",
    bg: "#eaf3ff",
  },
  {
    id: "finance",
    label: "Finance",
    title: "Transcend Finance",
    description:
      "The end-to-end lease and loan management platform trusted by the world's leading captives, banks, and independent lessors across automotive, equipment, and fleet finance.",
    categories: ["Auto Finance", "Equipment Finance", "Fleet Finance", "Commercial Lenders", "Specialized Lenders"],
    accent: "#24a148",
    bg: "#f0f9f4",
  },
  {
    id: "ai-labs",
    label: "AI Labs",
    title: "NETSOL AI Labs",
    description:
      "Applied AI research focused on asset finance. Generative models for underwriting, document intelligence, and conversational servicing at enterprise scale.",
    categories: ["Underwriting AI", "Document AI", "Conversational Servicing", "Forecasting", "Risk Models"],
    accent: "#0f62fe",
    bg: "#eef4ff",
  },
  {
    id: "marketplace",
    label: "Marketplace",
    title: "NETSOL Marketplace",
    description:
      "A curated API library and SaaS modules that extend Transcend — calculation engines, document generation, decisioning, and customer care portals, all on one mesh.",
    categories: ["Calculation Engine", "Document Gen", "API Library", "LOS", "Credit Decisioning"],
    accent: "#2d9cdb",
    bg: "#e8f6fc",
  },
  {
    id: "consultancy",
    label: "Consultancy",
    title: "NETSOL Consultancy",
    description:
      "Domain experts who design, migrate, and operate asset finance platforms. From information security to generative AI and cloud engineering — delivered as outcomes.",
    categories: ["Info Security", "Digital Solutions", "AI/ML", "Generative AI", "Cloud Services"],
    accent: "#161616",
    bg: "#f5f7fa",
  },
];

export const WHO_WE_SERVE = [
  {
    id: 1,
    title: "Captives & Lenders",
    description:
      "Streamlines retail and wholesale finance. Originations, servicing and analytics for electric, connected and autonomous vehicles — across every channel.",
    icon: "building",
  },
  {
    id: 2,
    title: "OEMs & Dealers",
    description:
      "Future-ready mobility platform. Digital retail to connected journeys, financing, servicing and EVs unified across every channel — at the dealership and beyond.",
    icon: "car",
  },
  {
    id: 3,
    title: "Brokers & Aggregators",
    description:
      "Tools to manage multiple lender workflows, automate documentation and accelerate decisions with audit readiness — built for scale and compliance.",
    icon: "network",
  },
];

export const STATS = [
  { value: 200, suffix: "+", label: "Customers worldwide" },
  { value: 300, suffix: "+", label: "Successful implementations" },
  { value: 500, prefix: "$", suffix: "B+", label: "Assets managed globally" },
  { value: 25, suffix: "+", label: "Years on NASDAQ: NTWK" },
];

export const TESTIMONIALS = [
  {
    id: 1,
    company: "MINI",
    person: "Mike Peyton",
    title: "Chief Motorer & VP of MINI Americas",
    quote:
      "At MINI, we decided it was time to create an end-to-end purchasing and finance journey. Our partnership with NETSOL has enabled us to set new benchmarks in digital auto-retail — and the results speak for themselves.",
    portrait:
      "https://images.unsplash.com/photo-1507003931090-a5b7b9b5f4ab?auto=format&fit=crop&w=600&q=80",
    hasVideo: false,
  },
  {
    id: 2,
    company: "Ikano Bank",
    person: "Henrik Staulund",
    title: "Chief Commercial Officer",
    quote:
      "NETSOL's smart technology solutions are well-recognized across Europe. Deploying Transcend Finance enables us to maintain a competitive edge in today's highly dynamic marketplace — without compromising on compliance.",
    portrait:
      "https://images.unsplash.com/photo-1560250097-3497b5b66d7c?auto=format&fit=crop&w=600&q=80",
    hasVideo: false,
  },
  {
    id: 3,
    company: "Haydock",
    person: "Mike Boyes",
    title: "Head of Finance Vendor",
    quote:
      "I'd absolutely recommend both Appex Now and NETSOL. The products are brilliant. It works fantastically well. And NETSOL has been responsive to our needs at every step of the journey.",
    portrait:
      "https://images.unsplash.com/photo-1472099488014-2b6740ad5b1c?auto=format&fit=crop&w=600&q=80",
    hasVideo: true,
  },
];

export const INSIGHTS = [
  {
    id: 1,
    tag: "Blog",
    title: "The payment on your website is a promise your desk has to keep",
    excerpt:
      "Why the digital promise made online has to be honoured offline — and how leading lenders are rebuilding the bridge between showroom and back office.",
    image:
      "https://images.unsplash.com/photo-1554224155-6b2e8d9b9e2c?auto=format&fit=crop&w=900&q=80",
    date: "Apr 14, 2026",
    readTime: "6 min",
  },
  {
    id: 2,
    tag: "Blog",
    title: "A dealer portal is how you see your own channel",
    excerpt:
      "Visibility is the new currency of distribution finance. Here's what every captive should be measuring — and what most dashboards still miss.",
    image:
      "https://images.unsplash.com/photo-1492144534245-b3aa4f9b9e9b?auto=format&fit=crop&w=900&q=80",
    date: "Apr 02, 2026",
    readTime: "8 min",
  },
  {
    id: 3,
    tag: "Guide",
    title: "Equipment finance software has to hold a schedule and a meter",
    excerpt:
      "From usage-based billing to residual optimisation, modern equipment finance lives or dies by the integrity of its schedule engine.",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314b4a42655?auto=format&fit=crop&w=900&q=80",
    date: "Mar 21, 2026",
    readTime: "11 min",
  },
  {
    id: 4,
    tag: "Blog",
    title: "Slow economy, fast EVs: Decoding Thailand's 2026 auto finance shift",
    excerpt:
      "Thailand's EV penetration is accelerating despite macro headwinds. What does that mean for captives and lenders across Southeast Asia?",
    image:
      "https://images.unsplash.com/photo-1593941706650-9a35b3a4d1e8?auto=format&fit=crop&w=900&q=80",
    date: "Mar 09, 2026",
    readTime: "9 min",
  },
  {
    id: 5,
    tag: "Case Study",
    title: "How a top-3 European bank rebuilt originations in 9 months",
    excerpt:
      "A migration case study — replacing a 14-year-old core with Transcend Finance without dropping a single live contract.",
    image:
      "https://images.unsplash.com/photo-1518181612892-293d8b3e1c4e?auto=format&fit=crop&w=900&q=80",
    date: "Feb 24, 2026",
    readTime: "14 min",
  },
  {
    id: 6,
    tag: "Blog",
    title: "Generative AI in servicing: from pilot to production",
    excerpt:
      "Three patterns that separate the AI servicing pilots that ship from the ones that stall — drawn from NETSOL AI Labs engagements.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc46d2b6e2a?auto=format&fit=crop&w=900&q=80",
    date: "Feb 11, 2026",
    readTime: "7 min",
  },
  {
    id: 7,
    tag: "Guide",
    title: "The residual value question no one wants to answer",
    excerpt:
      "Residual setting is part science, part policy. A framework for captives to align RV strategy with brand and balance sheet.",
    image:
      "https://images.unsplash.com/photo-1494972627056-56988630dcd1?auto=format&fit=crop&w=900&q=80",
    date: "Jan 30, 2026",
    readTime: "10 min",
  },
  {
    id: 8,
    tag: "Blog",
    title: "Why your LOS and your servicing platform should be friends",
    excerpt:
      "The hidden cost of the originations-to-servicing handoff — and how a unified data model removes it.",
    image:
      "https://images.unsplash.com/photo-1556761175-59b4e64b7d5f?auto=format&fit=crop&w=900&q=80",
    date: "Jan 18, 2026",
    readTime: "6 min",
  },
  {
    id: 9,
    tag: "Event",
    title: "NETSOL at Auto Finance Summit 2026 — what we're announcing",
    excerpt:
      "A preview of the Transcend releases landing at this year's summit — plus three sessions you won't want to miss.",
    image:
      "https://images.unsplash.com/photo-1540575464645-9d3e8f3d4e8f?auto=format&fit=crop&w=900&q=80",
    date: "Jan 05, 2026",
    readTime: "5 min",
  },
];

export const FOOTER_LINKS = {
  products: [
    "Transcend Platform",
    "Digital Retail",
    "Intermediary Portals",
    "Originations",
    "Servicing",
    "Wholesale Finance",
    "Mobility Solutions",
  ],
  consultancy: [
    "Information Security",
    "Digital Solutions",
    "AI/ML/Data Analytics",
    "Generative AI",
    "Emerging Technologies",
    "Cloud Services",
    "Data Engineering",
  ],
  solutions: ["Asset Finance", "Automotive Finance", "Equipment Finance"],
  investors: ["Company Information", "News", "Stock Data", "SEC Filings"],
  marketplace: [
    "Calculation Engine",
    "Document Generation",
    "API Library",
    "Loan Origination System",
    "Customer Care Portal",
    "Tax Calculation Engine",
    "Credit Decisioning Engine",
  ],
  insights: ["Case Studies", "Guides", "Blogs", "Events"],
};

export const CONTACT_INFO = {
  label: "Corporate Headquarters",
  address: "16000 Ventura Blvd, Suite 770 Encino, CA 91436, USA",
  phone: "+1 818 222 9195",
};

// === Round 2 additions ===

export const DIFFERENTIATORS = [
  {
    id: "platform",
    title: "One connected platform",
    short: "One mesh",
    description:
      "Originations, servicing, marketplace and analytics on a single data model — no fragile handoffs, no nightly batch reconciliations.",
    metric: "1",
    metricLabel: "unified data layer",
    icon: "mesh",
    accent: "#1d81f2",
  },
  {
    id: "scale",
    title: "Proven at enterprise scale",
    short: "Enterprise scale",
    description:
      "From 14-language rollouts to 30+ country deployments, Transcend powers some of the largest captives, banks, and OEMs in the world.",
    metric: "$500B+",
    metricLabel: "assets managed",
    icon: "globe",
    accent: "#24a148",
  },
  {
    id: "ai",
    title: "Applied AI, not vaporware",
    short: "Applied AI",
    description:
      "NETSOL AI Labs ships underwriting, document intelligence, and conversational servicing models that run in production — not in decks.",
    metric: "9",
    metricLabel: "production AI models",
    icon: "spark",
    accent: "#0f62fe",
  },
  {
    id: "trust",
    title: "Built for regulated finance",
    short: "Compliance-first",
    description:
      "ISO 27001 certified, SOC 2 Type II aligned, with regional data residency across 6 global delivery centers — audited annually.",
    metric: "ISO 27001",
    metricLabel: "certified security",
    icon: "shield",
    accent: "#2d9cdb",
  },
];

// Rich article body content for the insight modal (rendered as paragraphs)
export const INSIGHT_BODIES: Record<
  number,
  { paragraphs: string[]; bullets?: string[]; pullQuote?: string }
> = {
  1: {
    paragraphs: [
      "Every digital promise your website makes — a payment quote, an approval, a delivery date — is a promise your back office has to honour in ink. Yet at most captives and lenders, the bridge between showroom and back office is a stack of nightly batch jobs and a queue of exception cases.",
      "The result is well-documented: contract rework, dealer friction, and the slow erosion of trust that costs a brand its premium positioning. Leading lenders are now rebuilding that bridge in real time, treating the digital channel not as a lead funnel but as the first hop of a continuous contract.",
      "The most successful teams start by mapping every 'promise' the website can make — rate, term, residual, document set — and giving each one a single owner in the servicing stack. From there, version control, audit, and exception workflows follow naturally.",
    ],
    bullets: [
      "Treat the website quote as the first version of the contract, not a teaser",
      "Move from nightly reconciliation to event-level sync between LOS and servicing",
      "Give dealers a real-time view of where each promise sits in the pipeline",
    ],
    pullQuote:
      "The website is not a funnel. It is the first version of the contract.",
  },
  2: {
    paragraphs: [
      "A dealer portal is how a captive sees its own distribution channel. Yet most portals in production today are little more than a thin web layer over a 1990s LOS — long load times, brittle dropdowns, and no concept of state.",
      "Modern distribution finance lives or dies by visibility. Captives that can see — in real time — which dealer is structuring which contract, against which programme, with which residual set, are the ones that can move pricing and inventory quickly enough to win.",
      "The shift is from 'application dashboard' to 'operating console' — a portal that lets the captive act, not just observe.",
    ],
    pullQuote:
      "Visibility is the new currency of distribution finance.",
  },
  3: {
    paragraphs: [
      "Equipment finance software has to hold two things at once: a schedule and a meter. The schedule is the contract — the legal promise of when payments are due. The meter is reality — hours, miles, cycles, uptime.",
      "From usage-based billing to residual optimisation, modern equipment finance lives or dies by the integrity of its schedule engine. A platform that can't reconcile the two ends up either overbilling loyal customers or undercharging on contracts that bleed the book.",
      "The teams winning in this space treat the schedule and the meter as a single source of truth — versioned, audited, and exposed through a unified API that lets dealers, OEMs, and the captive itself agree on the same number at the same moment.",
    ],
    bullets: [
      "Unify contract schedule and asset meter in one data model",
      "Expose both through a single audited API",
      "Enable usage-based billing without nightly reconciliation jobs",
    ],
  },
  4: {
    paragraphs: [
      "Thailand's EV penetration is accelerating despite macro headwinds. For captives and lenders across Southeast Asia, that creates both an opportunity and a real risk — residual books built on combustion assumptions, with infrastructure investment racing to catch up.",
      "The 2026 inflection is being driven less by consumer demand than by fleet and ride-hail operators swapping combustion assets for electric ones — a different buyer profile, with different residual behaviour.",
      "Lenders that survive the shift will be the ones that re-underwrite their residual books against actual EV usage data — not legacy combustion curves.",
    ],
    pullQuote:
      "Re-underwrite your residual book against actual EV usage — not combustion curves.",
  },
  5: {
    paragraphs: [
      "When a top-3 European bank set out to replace a 14-year-old core with Transcend Finance in nine months, the question was not whether the new platform could do the job — it was whether a cutover of that size could happen without dropping a single live contract.",
      "The team chose a parallel-run strategy: every contract was mirrored between legacy and Transcend for 60 days, with daily reconciliation reports surfaced to the CFO. Discrepancies were triaged within hours, not weeks.",
      "On day 61, the legacy core was read-only. On day 90, it was off. Not a single live contract was lost in the migration.",
    ],
    bullets: [
      "60-day parallel run with daily reconciliation reports to the CFO",
      "Every discrepancy triaged within hours, not weeks",
      "Zero contract loss across the full cutover",
    ],
    pullQuote: "Zero contract loss. Nine months. A 14-year core retired.",
  },
  6: {
    paragraphs: [
      "Three patterns separate the AI servicing pilots that ship from the ones that stall — drawn from NETSOL AI Labs engagements across captives and lenders in 2025–2026.",
      "First, the pilots that ship start with a known, narrow, expensive workflow — not a horizontal 'AI for servicing' vision. Second, they put a human in the loop from day one, treating the model as a copilot rather than an autonomous agent. Third, they measure model drift in dollars, not in F1 score.",
      "Pilots that ignore any of the three tend to stall inside 90 days — and quietly become case studies of why 'AI doesn't work in finance'.",
    ],
    bullets: [
      "Start narrow — one expensive workflow, not a horizontal vision",
      "Human-in-the-loop from day one, not bolted on at the end",
      "Measure drift in dollars, not in F1 score",
    ],
  },
  7: {
    paragraphs: [
      "Residual setting is part science, part policy. The science is the forecast — what will this asset be worth in 36 months? The policy is the brand decision — what residual are we willing to underwrite to defend our positioning?",
      "Most captives conflate the two. The result is residual books that are neither defensible to the board nor competitive in the market.",
      "A modern framework separates forecast from policy, exposes both to the right stakeholders, and creates an audit trail for every residual decision the captive commits to.",
    ],
    pullQuote: "Residual setting is part science, part policy. Most captives conflate the two.",
  },
  8: {
    paragraphs: [
      "The hidden cost of the originations-to-servicing handoff is not the cost of the handoff itself — it's the cost of the data reconciliation that has to happen every night to make the two systems agree.",
      "A unified data model — where origination and servicing read and write the same contract record — removes the handoff entirely. There is no reconciliation, because there is nothing to reconcile.",
      "The teams that have made the switch report a 40–60% reduction in back-office exception volume, and a corresponding drop in customer-facing errors.",
    ],
    bullets: [
      "Eliminate nightly reconciliation between LOS and servicing",
      "Cut back-office exception volume by 40–60%",
      "Reduce customer-facing errors proportionally",
    ],
  },
  9: {
    paragraphs: [
      "At this year's Auto Finance Summit, NETSOL is announcing three new Transcend releases: a generative underwriting copilot, a real-time residual re-pricing engine, and a unified dealer portal that brings inventory, finance, and contract status into a single console.",
      "Three sessions to add to your agenda: 'Re-underwriting residuals in an EV world', 'Generative AI in production servicing', and 'The death of the nightly reconciliation'.",
      "The NETSOL booth will feature live demos of all three new releases, plus a private preview of the 2027 Transcend roadmap for captives and banks.",
    ],
  },
};

// === Round 3 additions ===

export const ESG_PILLARS = [
  {
    id: "environmental",
    title: "Environmental",
    headline: "Powering a paperless asset finance industry",
    description:
      "Every Transcend contract replaces a paper trail. In 2025 our customers saved an estimated 4.2 million sheets of paper — and the trucks, warehouses, and ink that came with them.",
    metric: "4.2M",
    metricLabel: "sheets of paper eliminated",
    progress: 78,
    accent: "#24a148",
    icon: "leaf",
  },
  {
    id: "social",
    title: "Social",
    headline: "Six delivery centers, one shared mission",
    description:
      "From Lahore to Los Angeles, we hire locally, train continuously, and pay above market median. Our 1,900+ engineers ship mission-critical software for the world's largest lenders.",
    metric: "1,900+",
    metricLabel: "engineers across 6 centers",
    progress: 84,
    accent: "#1d81f2",
    icon: "people",
  },
  {
    id: "governance",
    title: "Governance",
    headline: "Audited. Certified. Accountable.",
    description:
      "ISO 27001 certified, SOC 2 Type II aligned, with independent audit committees across our NASDAQ-listed entity. We treat governance as a feature, not a checkbox.",
    metric: "ISO 27001",
    metricLabel: "renewed 2025",
    progress: 92,
    accent: "#0f62fe",
    icon: "shield-check",
  },
  {
    id: "innovation",
    title: "Innovation",
    headline: "Reinvesting in the future of finance",
    description:
      "We reinvest a meaningfully higher share of revenue into R&D than the enterprise software industry average. AI Labs, sustainability reporting, and accessibility are all funded lines — not side projects.",
    metric: "18%",
    metricLabel: "of revenue reinvested in R&D",
    progress: 71,
    accent: "#2d9cdb",
    icon: "spark",
  },
];

// Press / news ticker — short, recent-style NETSOL announcements
export const PRESS_ITEMS = [
  { id: 1, label: "Press release", text: "NETSOL launches generative underwriting copilot for Transcend Finance customers", href: "#insights", accent: "#1d81f2" },
  { id: 2, label: "Event", text: "Auto Finance Summit 2026 — NETSOL booth #226, Las Vegas, Sept 14–16", href: "#insights", accent: "#24a148" },
  { id: 3, label: "Investor", text: "Q2 FY26 results: revenue up 11.4% YoY, services backlog at record high", href: "#insights", accent: "#0f62fe" },
  { id: 4, label: "Press release", text: "NETSOL and a top-3 European bank complete 9-month core migration", href: "#insights", accent: "#1d81f2" },
  { id: 5, label: "Award", text: "NETSOL named 'Asset Finance Platform of the Year' by Frost & Sullivan", href: "#insights", accent: "#2d9cdb" },
  { id: 6, label: "ESG", text: "2025 Sustainability Report published — 4.2M sheets of paper eliminated", href: "#esg", accent: "#24a148" },
];

// === Round 4 additions ===

// Open positions for the Careers section
export const CAREERS_ROLES = [
  {
    id: "eng-1",
    team: "Engineering",
    title: "Senior Platform Engineer, Transcend",
    location: "Lahore, PK",
    type: "Full-time",
    accent: "#1d81f2",
    summary:
      "Own the core servicing platform that 200+ enterprise customers depend on. TypeScript, Go, Kubernetes, multi-region Postgres.",
    tags: ["TypeScript", "Go", "K8s", "Postgres"],
  },
  {
    id: "ai-1",
    team: "AI Labs",
    title: "Senior Research Engineer, Underwriting AI",
    location: "London, UK",
    type: "Full-time",
    accent: "#0f62fe",
    summary:
      "Ship the generative underwriting copilot from prototype to production. RAG, fine-tuning, evals, and human-in-the-loop UX.",
    tags: ["LLM", "RAG", "Python", "PyTorch"],
  },
  {
    id: "design-1",
    team: "Design",
    title: "Principal Product Designer, Dealer Portals",
    location: "Remote, US",
    type: "Full-time",
    accent: "#24a148",
    summary:
      "Set the design language for the next generation of dealer and broker portals. Design systems, accessibility, motion.",
    tags: ["Figma", "Design Systems", "Motion"],
  },
  {
    id: "sales-1",
    team: "Sales",
    title: "Enterprise Account Director, APAC",
    location: "Bangkok, TH",
    type: "Full-time",
    accent: "#2d9cdb",
    summary:
      "Lead NETSOL's expansion across Southeast Asia asset finance. Captives, banks, OEMs. 10+ year sales cycle experience required.",
    tags: ["Enterprise", "APAC", "SaaS"],
  },
  {
    id: "eng-2",
    team: "Engineering",
    title: "Staff Engineer, Cloud & Reliability",
    location: "Manila, PH",
    type: "Full-time",
    accent: "#56ccf2",
    summary:
      "Drive the next phase of NETSOL's cloud migration. Multi-cloud (AWS + Azure), disaster recovery, 99.99% uptime targets.",
    tags: ["AWS", "Azure", "Terraform", "Go"],
  },
  {
    id: "consult-1",
    team: "Consultancy",
    title: "Senior Consultant, Generative AI",
    location: "Los Angeles, US",
    type: "Full-time",
    accent: "#1d81f2",
    summary:
      "Lead GenAI advisory engagements for top-tier bank and captive clients. Translate AI capability into board-level outcomes.",
    tags: ["GenAI", "Advisory", "Finance"],
  },
];

// Awards / recognition
export const AWARDS = [
  { id: 1, year: 2025, body: "Frost & Sullivan", title: "Asset Finance Platform of the Year", accent: "#1d81f2" },
  { id: 2, year: 2025, body: "Stevie Awards", title: "Gold — Tech Company of the Year (Large)", accent: "#0f62fe" },
  { id: 3, year: 2024, body: "AFSA", title: "Innovation in Digital Retail", accent: "#24a148" },
  { id: 4, year: 2024, body: "Globee Awards", title: "Silver — Best AI in Financial Services", accent: "#2d9cdb" },
  { id: 5, year: 2023, body: "Brandon Hall", title: "Best Advance in Enterprise Software", accent: "#56ccf2" },
  { id: 6, year: 2023, body: "Asia CFO Awards", title: "Technology Excellence — APAC", accent: "#1d81f2" },
  { id: 7, year: 2022, body: "Forbes Asia", title: "Best Under A Billion — 200 Best", accent: "#0f62fe" },
  { id: 8, year: 2022, body: "ISO", title: "ISO 27001:2013 — Re-certified", accent: "#24a148" },
];

// FAQ Q&A pairs — premium accordion content
export const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "What asset classes does Transcend support?",
    answer:
      "Transcend supports the full spectrum of asset finance — automotive (captive, dealer, retail, wholesale), equipment (yellow goods, construction, manufacturing), fleet & mobility (subscription, leasing), marine, aviation, and energy / renewables (PPAs, battery leasing, EV charging infrastructure). One platform, one data model.",
  },
  {
    id: "faq-2",
    question: "How long does a typical Transcend Finance migration take?",
    answer:
      "A standard Transcend Finance migration runs 6–9 months for a typical captive or bank, with a 60-day parallel-run period and zero-contract-loss cutover. Larger programs with multi-jurisdictional footprint run 12–18 months — but always with a 90-day stability period built in before legacy retirement.",
  },
  {
    id: "faq-3",
    question: "Is Transcend available as SaaS, on-prem, or both?",
    answer:
      "Both. Transcend ships as a fully managed SaaS deployment on AWS or Azure in your region of choice, or as a single-tenant deployment inside your own VPC. Hybrid models (SaaS for origination, single-tenant for servicing) are common — we'll match the deployment shape to your regulatory footprint.",
  },
  {
    id: "faq-4",
    question: "How does NETSOL handle data residency and regional compliance?",
    answer:
      "Transcend is deployed across six global delivery centers (LA, London, Beijing, Bangkok, Lahore, Manila) with regional data residency in each. We are ISO 27001 certified, SOC 2 Type II aligned, GDPR compliant, and PCI-DSS certified. Data residency decisions are made at contract-level — your data stays in the jurisdiction you specify.",
  },
  {
    id: "faq-5",
    question: "What does NETSOL AI Labs actually ship in production?",
    answer:
      "AI Labs ships models that run in production — not in decks. Current production deployments include a generative underwriting copilot (RAG over your credit policy), document intelligence for contract ingestion, conversational servicing for customer portals, and residual re-pricing models for EV books. Every model is human-in-the-loop from day one and measured in dollars, not in F1 score.",
  },
  {
    id: "faq-6",
    question: "How does Transcend integrate with our existing LOS or core banking stack?",
    answer:
      "Transcend exposes a complete REST + event API surface, plus pre-built integrations for the most common LOS, core banking, and credit bureau systems. We treat integration as a first-class engineering concern — every customer gets a dedicated integration architect for the first 90 days post-go-live.",
  },
  {
    id: "faq-7",
    question: "What's in the NETSOL Marketplace and how is it licensed?",
    answer:
      "The Marketplace is a curated library of SaaS modules — calculation engines, document generation, decisioning, customer care portals — that extend Transcend. Modules are licensed per-tenant, metered by usage, and can be turned on or off without a re-deployment. No long lock-in commitments.",
  },
  {
    id: "faq-8",
    question: "What does NETSOL do for sustainability and ESG reporting?",
    answer:
      "Every Transcend contract replaces a paper trail. In 2025 our customers saved an estimated 4.2 million sheets of paper. NETSOL publishes an annual Sustainability Report aligned to TCFD, GRI, CDP, and UN PRI frameworks — and is committed to carbon-neutral operations across all six delivery centers by 2028.",
  },
];

// Stock ticker for NASDAQ:NTWK — synthetic / demo data
export const STOCK_TICKER = {
  symbol: "NASDAQ: NTWK",
  price: 1.85,
  change: 0.04,
  changePercent: 2.21,
  // Sparkline points (relative scale 0-100, used by the SVG sparkline)
  sparkline: [62, 60, 65, 63, 68, 67, 70, 72, 71, 75, 78, 80, 82, 81, 84, 88, 90, 95],
};
