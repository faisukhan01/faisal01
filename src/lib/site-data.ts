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

// ---------------------------------------------------------------------------
// Transcend vs Legacy / Generic competitors — comparison matrix
// ---------------------------------------------------------------------------
// Each competitor is a column. Each row is a capability.
// `value` is one of "full" | "partial" | "none" used to render the icon.
export const COMPARISON_MATRIX = {
  competitors: [
    {
      id: "netsol",
      name: "NETSOL Transcend",
      tagline: "The operating system for asset finance",
      highlight: true,
      badge: "Best value",
      accent: "#1d81f2",
    },
    {
      id: "legacy-saas",
      name: "Generic SaaS",
      tagline: "Point tools stitched together",
      highlight: false,
      accent: "#6b7280",
    },
    {
      id: "onprem",
      name: "On-prem suite",
      tagline: "Legacy licensed software",
      highlight: false,
      accent: "#6b7280",
    },
    {
      id: "custom",
      name: "Custom build",
      tagline: "In-house engineering team",
      highlight: false,
      accent: "#6b7280",
    },
  ],
  rows: [
    {
      label: "Time to first live origination",
      detail: "From contract to first digital contract signature.",
      values: { netsol: "8–12 weeks", "legacy-saas": "6–9 months", onprem: "12–18 months", custom: "18–36 months" },
    },
    {
      label: "Asset class coverage",
      detail: "Auto, equipment, fleet, marine, aviation, energy, banking.",
      values: { netsol: "full", "legacy-saas": "partial", onprem: "partial", custom: "none" },
    },
    {
      label: "AI underwriting & decisioning",
      detail: "Native AI Labs — credit scoring, fraud, document AI.",
      values: { netsol: "full", "legacy-saas": "partial", onprem: "none", custom: "none" },
    },
    {
      label: "Marketplace of pre-built modules",
      detail: "Calc engines, document gen, decisioning, customer portals.",
      values: { netsol: "full", "legacy-saas": "none", onprem: "none", custom: "none" },
    },
    {
      label: "Global 24/7 delivery across 6 centers",
      detail: "Follow-the-sun engineering + support model.",
      values: { netsol: "full", "legacy-saas": "partial", onprem: "partial", custom: "none" },
    },
    {
      label: "Compliance (ISO 27001, SOC 2, GDPR, PCI-DSS)",
      detail: "Audited annually, customer-tenant data residency controls.",
      values: { netsol: "full", "legacy-saas": "partial", onprem: "partial", custom: "none" },
    },
    {
      label: "Multi-tenant SaaS upgrade path",
      detail: "Quarterly feature releases with no re-deployment cost.",
      values: { netsol: "full", "legacy-saas": "full", onprem: "none", custom: "none" },
    },
    {
      label: "Total cost of ownership over 5 years",
      detail: "License + integration + ops + upgrades — lower is better.",
      values: { netsol: "1×", "legacy-saas": "2.4×", onprem: "3.8×", custom: "5.2×" },
    },
  ],
};

// ---------------------------------------------------------------------------
// Interactive ROI Calculator — calibration constants
// ---------------------------------------------------------------------------
export const ROI_CALCULATOR = {
  // Annual asset finance volume range (USD)
  volumeMin: 100_000_000,
  volumeMax: 10_000_000_000,
  volumeDefault: 1_500_000_000,
  volumeStep: 50_000_000,

  // Current automation level (%)
  automationMin: 0,
  automationMax: 80,
  automationDefault: 25,

  // Target automation level with Transcend (%)
  targetMin: 50,
  targetMax: 95,
  targetDefault: 82,

  // Operational savings — % of newly-automated volume that becomes hard savings
  savingsRate: 0.022,

  // Average fully-loaded cost per FTE (USD) — ops/admin staff
  fteCost: 95_000,

  // Hours per contract, baseline (manual ops)
  baselineHoursPerContract: 6.4,

  // Transcend automated time per contract
  transcendHoursPerContract: 1.1,

  // Industry multipliers — adjust savings % per asset class
  industries: [
    { id: "auto", label: "Automotive Finance", multiplier: 1.0, emoji: "CF" },
    { id: "equipment", label: "Equipment Finance", multiplier: 0.92, emoji: "EF" },
    { id: "fleet", label: "Fleet & Mobility", multiplier: 1.08, emoji: "FM" },
    { id: "marine", label: "Marine & Aviation", multiplier: 0.78, emoji: "MA" },
    { id: "energy", label: "Energy & Renewables", multiplier: 0.86, emoji: "ER" },
    { id: "banking", label: "Banking & Lessor", multiplier: 1.04, emoji: "BL" },
  ],

  // Average contract value (USD) — for contracts-per-year calc
  avgContractValue: 48_000,
};

// ---------------------------------------------------------------------------
// Solutions / Customer Stories — case studies with metrics + modal content
// ---------------------------------------------------------------------------
export const SOLUTION_CASES = [
  {
    id: "case-1",
    industry: "Automotive Finance",
    industryId: "auto",
    company: "Top-3 European OEM captive",
    headline: "Cut origination time from 11 days to 36 hours",
    accent: "#1d81f2",
    logo: "EU",
    metrics: [
      { value: "-93%", label: "Origination cycle time" },
      { value: "+27%", label: "Approval conversion" },
      { value: "$84M", label: "Annual cost savings" },
    ],
    challenge:
      "A leading European OEM captive was running origination on a 14-year-old on-prem stack. Manual credit checks, paper document review, and slow dealer handoffs meant customers waited up to 11 days for a decision — and a third of them walked away.",
    solution:
      "NETSOL migrated the captive onto Transcend Digital Retail in 14 weeks. The dealer portal, AI credit decisioning engine, and digital document workflow replaced 23 legacy systems. A Marketplace document-generation module was turned on without a re-deployment.",
    results:
      "Origination fell from 11 days to 36 hours. Approval conversion rose 27%. The captive saved $84M annually in opex and recovered 142 FTEs that were redeployed to credit risk and dealer success.",
    quote:
      "We stopped apologising to dealers. The system now closes loans before the customer leaves the showroom.",
    quoteBy: "VP of Retail Credit",
    year: "2024",
    duration: "14 weeks",
  },
  {
    id: "case-2",
    industry: "Equipment Finance",
    industryId: "equipment",
    company: "Global equipment lessor",
    headline: "Automated 96% of mid-ticket applications",
    accent: "#24a148",
    logo: "EQ",
    metrics: [
      { value: "96%", label: "Automated decisioning" },
      { value: "-71%", label: "Per-decision cost" },
      { value: "4.2h", label: "Avg decision SLA" },
    ],
    challenge:
      "A $4B equipment finance book was scoring every application manually. Underwriters spent two-thirds of their day on applications below $250K — the segment that contributed the least margin but the most volume.",
    solution:
      "NETSOL AI Labs trained a custom decisioning model on the lessor's 11-year application history. The model was deployed as a Marketplace module inside Transcend Finance, with full audit logs and human-in-the-loop override on edge cases.",
    results:
      "96% of mid-ticket applications now auto-decision within a 4.2-hour SLA. Per-decision cost fell 71%. Underwriters were redeployed to structured deals above $5M — where human judgement drives margin.",
    quote:
      "The model isn't a black box. We can explain every decision to a regulator — and we do.",
    quoteBy: "Chief Risk Officer",
    year: "2025",
    duration: "11 weeks",
  },
  {
    id: "case-3",
    industry: "Fleet & Mobility",
    industryId: "fleet",
    company: "Pan-APAC fleet operator",
    headline: "Onboarded 38,000 vehicles in 7 months",
    accent: "#0f62fe",
    logo: "FL",
    metrics: [
      { value: "38K", label: "Vehicles onboarded" },
      { value: "7 mo", label: "Rollout duration" },
      { value: "99.98%", label: "Telemetry uptime" },
    ],
    challenge:
      "A post-IPO pan-APAC fleet operator needed to consolidate 6 regional leasing entities onto one platform within a single fiscal year — or face delisting risk on its reporting covenant.",
    solution:
      "NETSOL deployed Transcend across 7 markets with localised regulatory modules, multi-currency ledger, and a unified fleet telemetry pipeline. The Marketplace telematics adapter ingested 14 million events per day across 38,000 vehicles.",
    results:
      "The operator consolidated 6 ledgers into 1 in 7 months. Telemetry uptime held at 99.98% — the operator passed its reporting audit and avoided delisting.",
    quote:
      "Seven months. Six markets. One ledger. We made covenant.",
    quoteBy: "Group CFO",
    year: "2024",
    duration: "7 months",
  },
  {
    id: "case-4",
    industry: "Marine & Aviation",
    industryId: "marine",
    company: "Aviation lessor",
    headline: "Closed a $310M aircraft portfolio in 9 days",
    accent: "#2d9cdb",
    logo: "AV",
    metrics: [
      { value: "$310M", label: "Portfolio closed" },
      { value: "9 days", label: "Close cycle" },
      { value: "100%", label: "Regulatory audit pass" },
    ],
    challenge:
      "An aviation lessor was acquiring a $310M portfolio of 12 mid-life aircraft from a distressed seller. The deal window was 9 days — including regulatory filings in 3 jurisdictions.",
    solution:
      "NETSOL spun up a tenant-specific Transcend workspace with the aviation asset module, regulatory packs for FAA, EASA, and CAAC, and a Marketplace document-generation pack pre-loaded with 41 lease transfer templates.",
    results:
      "The lessor closed the portfolio in 9 days. Every regulatory filing was audit-traceable. The lessor used the same workspace to manage the portfolio post-close.",
    quote:
      "We closed a deal in 9 days that would have taken our previous platform 9 weeks.",
    quoteBy: "Head of Portfolio Acquisitions",
    year: "2025",
    duration: "9 days",
  },
  {
    id: "case-5",
    industry: "Energy & Renewables",
    industryId: "energy",
    company: "Solar developer finance arm",
    headline: "Funded $1.2B of residential solar in 18 months",
    accent: "#56ccf2",
    logo: "SO",
    metrics: [
      { value: "$1.2B", label: "Funded volume" },
      { value: "18 mo", label: "Programme duration" },
      { value: "23%", label: "Approval lift" },
    ],
    challenge:
      "A renewable-energy company's captive finance arm needed to originate residential solar loans at scale across 14 US states, each with its own disclosure and licensing regime — and it had to launch before the federal ITC window closed.",
    solution:
      "NETSOL stood up Transcend Finance with a Marketplace compliance pack covering 14 states, an AI scoring model trained on solar-specific default data, and a 90-second digital application flow embedded in the developer's quoting tool.",
    results:
      "The captive funded $1.2B of residential solar loans in 18 months. Approval conversion rose 23% versus the prior broker channel. The captive cleared the ITC window with margin to spare.",
    quote:
      "We hit our programme target before the tax credit window closed. That's the only metric that mattered.",
    quoteBy: "President, Solar Finance",
    year: "2024",
    duration: "9 weeks to launch",
  },
  {
    id: "case-6",
    industry: "Banking & Lessor",
    industryId: "banking",
    company: "Tier-1 APAC bank",
    headline: "Consolidated 4 legacy lessor systems into 1",
    accent: "#1d81f2",
    logo: "BK",
    metrics: [
      { value: "4 → 1", label: "Systems consolidated" },
      { value: "-58%", label: "Run cost" },
      { value: "0", label: "Regulatory breaches" },
    ],
    challenge:
      "A tier-1 APAC bank had inherited 4 separate lessor platforms across 3 acquisitions. Each ran on different ledgers, different calendars, and different compliance regimes. The bank's regulator had given it 18 months to consolidate.",
    solution:
      "NETSOL migrated all 4 lessor books onto a single Transcend tenant with multi-currency, multi-jurisdiction ledger and a unified compliance pack. A 6-month parallel-run window validated every reconciliation before cut-over.",
    results:
      "The bank consolidated 4 systems into 1 in 14 months — 4 months ahead of the regulator's deadline. Run cost fell 58%. The bank reported zero reconciliation breaks during the parallel run and zero regulatory breaches post-cutover.",
    quote:
      "We met the regulator's deadline — and we still sleep at night.",
    quoteBy: "Head of Leasing Operations",
    year: "2023",
    duration: "14 months",
  },
];

// ---------------------------------------------------------------------------
// Round 6: Live Operations Pulse — animated real-time-feel metrics stream
// ---------------------------------------------------------------------------
export const LIVE_PULSE = {
  // Headline metric (animated ticker)
  headline: {
    label: "Live contracts originated (last 24h)",
    baseValue: 18462,
    jitterMin: 1,
    jitterMax: 14,
    suffix: "",
  },
  // 4 satellite metrics
  metrics: [
    {
      id: "decisions",
      label: "AI decisions / min",
      baseValue: 312,
      jitterMin: 1,
      jitterMax: 9,
      suffix: "",
      trend: "+18%",
      trendDir: "up" as const,
      accent: "#1d81f2",
    },
    {
      id: "volume",
      label: "Funded (24h)",
      baseValue: 412_800_000,
      jitterMin: 50_000,
      jitterMax: 950_000,
      prefix: "$",
      suffix: "",
      trend: "+6.4%",
      trendDir: "up" as const,
      accent: "#24a148",
    },
    {
      id: "sla",
      label: "Decision SLA",
      baseValue: 4.2,
      jitterMin: -0.18,
      jitterMax: 0.22,
      suffix: "h",
      trend: "-12%",
      trendDir: "down" as const,
      accent: "#0f62fe",
    },
    {
      id: "uptime",
      label: "Servicing uptime",
      baseValue: 99.98,
      jitterMin: -0.012,
      jitterMax: 0.014,
      suffix: "%",
      trend: "Stable",
      trendDir: "flat" as const,
      accent: "#2d9cdb",
    },
  ],
  // Region activity feed — top 6 regions processed in last hour
  regions: [
    { id: "na", label: "North America", volume: 38, color: "#1d81f2" },
    { id: "eu", label: "Europe", volume: 28, color: "#0f62fe" },
    { id: "apac", label: "Asia-Pacific", volume: 22, color: "#2d9cdb" },
    { id: "latam", label: "Latin America", volume: 7, color: "#24a148" },
    { id: "mea", label: "Middle East / Africa", volume: 3, color: "#56ccf2" },
    { id: "oce", label: "Oceania", volume: 2, color: "#1d81f2" },
  ],
  // Live activity stream messages
  activityStream: [
    { type: "originated", text: "Pensioner lease originated · Munich", amount: "$48,200" },
    { type: "decisioned", text: "Mid-ticket app auto-approved · Singapore", amount: "$214,500" },
    { type: "funded", text: "Aircraft lease funded · Dubai", amount: "$8.2M" },
    { type: "originated", text: "EV retail contract signed · Oslo", amount: "$52,900" },
    { type: "decisioned", text: "Equipment refinance approved · Houston", amount: "$1.1M" },
    { type: "originated", text: "Fleet vehicle onboarded · Bangkok", amount: "$32,400" },
    { type: "funded", text: "Solar residential loan funded · Phoenix", amount: "$28,100" },
    { type: "decisioned", text: "Marine lease auto-approved · Sydney", amount: "$172,000" },
    { type: "originated", text: "Auto contract originated · Mexico City", amount: "$34,800" },
    { type: "funded", text: "Construction equipment funded · Dubai", amount: "$642,000" },
    { type: "originated", text: "Hybrid SUV lease originated · Tokyo", amount: "$58,300" },
    { type: "decisioned", text: "Used-vehicle loan approved · Madrid", amount: "$21,400" },
  ],
};

// ---------------------------------------------------------------------------
// Round 6: Product Tour — interactive guided walkthrough of Transcend
// ---------------------------------------------------------------------------
export const PRODUCT_TOUR = {
  title: "Tour the Transcend platform",
  subtitle: "Click through a 5-step interactive walkthrough of NETSOL's flagship asset finance platform.",
  cta: "Start the tour",
  steps: [
    {
      id: "dashboard",
      number: 1,
      label: "Dashboard",
      title: "One pane of glass across the asset lifecycle",
      description:
        "Operators see originations, servicing, residuals, and dealer activity in a single live view. Filter by book, region, asset class, or stage — drill into any contract in two clicks.",
      accent: "#1d81f2",
      moduleLabel: "Transcend Command Center",
      moduleCode: "CC-01",
      kpis: [
        { label: "Live originations", value: "1,284", trend: "+18%" },
        { label: "Decisions / min", value: "312", trend: "+6%" },
        { label: "Funded (24h)", value: "$412M", trend: "+6.4%" },
        { label: "Decision SLA", value: "4.2h", trend: "-12%" },
      ],
    },
    {
      id: "origination",
      number: 2,
      label: "Origination",
      title: "Originations in 36 hours, not 11 days",
      description:
        "Digital application capture, AI credit decisioning, document generation, and e-signature in one workflow. Dealer portal syncs showroom activity back to the lender in real time.",
      accent: "#24a148",
      moduleLabel: "Transcend Digital Retail",
      moduleCode: "DR-02",
      kpis: [
        { label: "Avg cycle time", value: "36h", trend: "-93%" },
        { label: "Approval conversion", value: "+27%", trend: "+27%" },
        { label: "Doc accuracy", value: "99.6%", trend: "+4.2pp" },
        { label: "Dealer NPS", value: "78", trend: "+22" },
      ],
    },
    {
      id: "decisioning",
      number: 3,
      label: "AI Decisioning",
      title: "96% of mid-ticket apps auto-decisioned",
      description:
        "NETSOL AI Labs trains tenant-specific models on your historical book. Full audit logs, regulator-grade explanations, human-in-the-loop override on edge cases — no black box.",
      accent: "#0f62fe",
      moduleLabel: "NETSOL AI Labs",
      moduleCode: "AI-03",
      kpis: [
        { label: "Auto-decisioned", value: "96%", trend: "+71pp" },
        { label: "Per-decision cost", value: "-71%", trend: "-71%" },
        { label: "Avg SLA", value: "4.2h", trend: "-12%" },
        { label: "Model AUC", value: "0.91", trend: "+0.04" },
      ],
    },
    {
      id: "servicing",
      number: 4,
      label: "Servicing",
      title: "99.98% servicing uptime across 7 markets",
      description:
        "Multi-currency, multi-jurisdiction ledger. Lease schedules, billing, collections, payoffs, residuals, and remarketing in one book of record — with telemetry on every asset.",
      accent: "#2d9cdb",
      moduleLabel: "Transcend Finance",
      moduleCode: "SF-04",
      kpis: [
        { label: "Servicing uptime", value: "99.98%", trend: "Stable" },
        { label: "Recon breaks", value: "0", trend: "0" },
        { label: "Markets live", value: "7", trend: "+2" },
        { label: "Vehicles tracked", value: "38K", trend: "+12K" },
      ],
    },
    {
      id: "marketplace",
      number: 5,
      label: "Marketplace",
      title: "42 modules, one mesh, zero redeploys",
      description:
        "Calculation engines, document generation, compliance packs, telematics adapters — extend Transcend without a re-deployment. Activate a module in hours, not quarters.",
      accent: "#56ccf2",
      moduleLabel: "NETSOL Marketplace",
      moduleCode: "MK-05",
      kpis: [
        { label: "Modules live", value: "42", trend: "+6" },
        { label: "Activation time", value: "8h", trend: "-94%" },
        { label: "API calls / day", value: "14M", trend: "+3M" },
        { label: "Partner integrations", value: "120+", trend: "+18" },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Round 6: Glossary / Knowledge Hub — filterable industry dictionary
// ---------------------------------------------------------------------------
export const GLOSSARY = {
  title: "Asset Finance Knowledge Hub",
  subtitle:
    "A curated glossary of the terms, regulations, and platform concepts that define modern asset finance. Filter by category or search to jump straight to a definition.",
  categories: [
    { id: "all", label: "All terms" },
    { id: "origination", label: "Origination" },
    { id: "servicing", label: "Servicing" },
    { id: "ai", label: "AI / Decisioning" },
    { id: "regulatory", label: "Regulatory" },
    { id: "platform", label: "Platform" },
  ],
  terms: [
    {
      id: "term-1",
      term: "Captive finance company",
      category: "origination",
      short: "A finance company owned by a manufacturer (OEM) to finance the parent company's products.",
      long: "Captive finance companies — like Ford Motor Credit or Toyota Financial Services — exist primarily to drive sales of the parent manufacturer's products. They typically offer subsidised rates, residuals, and lease structures that third-party lenders cannot match. Captives are the largest single channel for new-vehicle finance globally.",
      accent: "#1d81f2",
    },
    {
      id: "term-2",
      term: "Origination cycle time",
      category: "origination",
      short: "The elapsed time from application submission to funded contract.",
      long: "Origination cycle time is the single most-watched operational metric in retail asset finance. Industry average sits between 4 and 11 days for automotive; Transcend customers routinely cut this to under 36 hours. Cycle time compresses conversion lift and dealer NPS — it is the lever most correlated with margin.",
      accent: "#24a148",
    },
    {
      id: "term-3",
      term: "E-contracting",
      category: "origination",
      short: "Digital execution of finance contracts — replacing paper signatures with e-signature.",
      long: "E-contracting replaces wet-ink signatures with compliant e-signature, digital document generation, and secure archive. Transcend's e-contracting module supports ESIGN, UETA, and EBA e-IDAS requirements across 14 jurisdictions. Customers report a 4.2pp lift in document accuracy and a 27% lift in approval conversion post-implementation.",
      accent: "#0f62fe",
    },
    {
      id: "term-4",
      term: "Lease schedule",
      category: "servicing",
      short: "The contractual payment timetable that governs a lease — base rent, taxes, fees, residuals.",
      long: "A lease schedule defines every payment, every date, and every obligation across the lease term. Modern lease schedules must accommodate variable usage, mileage true-ups, balloon structures, and multi-currency settlements. Transcend's schedule engine supports 41 schedule types out of the box — and a calculation-engine Marketplace module for the long tail.",
      accent: "#2d9cdb",
    },
    {
      id: "term-5",
      term: "Residual value",
      category: "servicing",
      short: "The forecast value of an asset at the end of a lease — set at origination, true at maturity.",
      long: "Residual value is the single largest driver of lease profitability. Setting residuals too low loses deals; setting them too high loses money at remarketing. AI residual models — like those built in NETSOL AI Labs — typically cut residual loss variance by 38% versus book-value approaches.",
      accent: "#56ccf2",
    },
    {
      id: "term-6",
      term: "Payoff & payoff quote",
      category: "servicing",
      short: "The amount required to settle a finance contract before scheduled maturity.",
      long: "A payoff quote is a per-day accrual calculation that includes principal, interest, fees, and any early-termination charge. Transcend's payoff engine supports same-day, good-through-date, and 10-day quotes — with per-jurisdiction regulatory disclosure packs. Customers report 96% of payoff quotes now auto-generated, freeing servicing agents for exception handling.",
      accent: "#1d81f2",
    },
    {
      id: "term-7",
      term: "Underwriting model",
      category: "ai",
      short: "A statistical model that predicts the probability of default for a given applicant.",
      long: "Modern underwriting models are gradient-boosted tree ensembles — sometimes with deep-learning overlays for unstructured income/bank data. NETSOL AI Labs builds tenant-specific models — never shared across customers — and ships them with full audit logs and SHAP-based explanations for every decision. AUC routinely exceeds 0.90 on real customer books.",
      accent: "#24a148",
    },
    {
      id: "term-8",
      term: "Document AI",
      category: "ai",
      short: "AI that extracts structured data from unstructured documents — pay stubs, IDs, bank statements.",
      long: "Document AI replaces manual data entry with an extraction pipeline that reads pay stubs, government IDs, bank statements, and tax returns — and structures the output for the origination workflow. Transcend's Document AI module achieves 99.6% field-level accuracy on the top 30 document types, with human-in-the-loop review on low-confidence fields.",
      accent: "#0f62fe",
    },
    {
      id: "term-9",
      term: "Explainability (SHAP)",
      category: "ai",
      short: "A technique that attributes a model's prediction back to its input features.",
      long: "SHAP (SHapley Additive exPlanations) is the dominant explainability framework for credit decisioning. It produces a per-feature contribution for every prediction — letting a lender explain to a regulator why a specific applicant was declined. Transcend ships SHAP explanations with every decision by default.",
      accent: "#2d9cdb",
    },
    {
      id: "term-10",
      term: "ISO 27001",
      category: "regulatory",
      short: "International standard for information security management systems.",
      long: "ISO 27001 is the global benchmark for information security management. NETSOL holds ISO 27001 certification across all 6 delivery centers — audited annually by an accredited registrar. Certification covers access control, cryptography, operations security, and supplier relationships.",
      accent: "#56ccf2",
    },
    {
      id: "term-11",
      term: "SOC 2 Type II",
      category: "regulatory",
      short: "AICPA attestation covering security, availability, processing integrity, confidentiality, and privacy.",
      long: "SOC 2 Type II attests that a service organisation's controls are not just designed but operated effectively over a minimum 6-month observation window. NETSOL publishes a SOC 2 Type II report annually — available to customers under NDA via our Trust Center.",
      accent: "#1d81f2",
    },
    {
      id: "term-12",
      term: "PCI-DSS",
      category: "regulatory",
      short: "Payment Card Industry Data Security Standard — required for any system that touches card data.",
      long: "PCI-DSS governs how cardholder data is stored, processed, and transmitted. Transcend's payment modules are PCI-DSS Level 1 certified — the highest tier — letting customers process card data without scope bleeding into their own audit. Net Sol's tokenisation layer further reduces customer scope by up to 80%.",
      accent: "#24a148",
    },
    {
      id: "term-13",
      term: "Multi-tenant SaaS",
      category: "platform",
      short: "A single shared software instance serving multiple customers — with logical isolation per tenant.",
      long: "Multi-tenant SaaS lets every customer benefit from a single, continuously-improved codebase. Transcend ships quarterly feature releases with zero re-deployment cost — every customer is always on the current version. Tenants are logically isolated at the database row, network, and encryption-key level.",
      accent: "#0f62fe",
    },
    {
      id: "term-14",
      term: "Marketplace module",
      category: "platform",
      short: "A self-contained extension that adds capability to Transcend without a re-deployment.",
      long: "Marketplace modules are NETSOL-curated capabilities — calculation engines, document packs, compliance kits, telematics adapters — that activate in hours, not quarters. Customers switch them on from the Marketplace catalog and pay per active module. 42 modules are live today.",
      accent: "#2d9cdb",
    },
    {
      id: "term-15",
      term: "Follow-the-sun delivery",
      category: "platform",
      short: "A 24/7 engineering and support model that hands off work across global centers by time zone.",
      long: "NETSOL operates 6 delivery centers — Beijing, Bangkok, Lahore, Manchester, São Paulo, and San Ramon — with continuous handoff. A blocking issue raised at end-of-day in one center is picked up at start-of-day in the next. Customers see round-the-clock delivery without premium night-shift pricing.",
      accent: "#56ccf2",
    },
  ],
};

// ---------------------------------------------------------------------------
// Round 7: Investor Relations — NTWK financial KPIs
// ---------------------------------------------------------------------------
export const INVESTOR_RELATIONS = {
  title: "Investor relations",
  subtitle:
    "NETSOL Technologies (NASDAQ: NTWK) — 25+ years listed, profitable, and trusted by 200+ enterprise customers across 6 continents.",
  cta: "View full investor kit",
  // Headline KPIs
  kpis: [
    {
      id: "revenue",
      label: "FY25 Revenue",
      value: 248.6,
      prefix: "$",
      suffix: "M",
      trend: 11.4,
      trendLabel: "YoY",
      accent: "#1d81f2",
    },
    {
      id: "arr",
      label: "Annual Recurring Revenue",
      value: 184.2,
      prefix: "$",
      suffix: "M",
      trend: 18.2,
      trendLabel: "YoY",
      accent: "#24a148",
    },
    {
      id: "ebitda",
      label: "Adjusted EBITDA",
      value: 42.8,
      prefix: "$",
      suffix: "M",
      trend: 14.7,
      trendLabel: "YoY",
      accent: "#0f62fe",
    },
    {
      id: "fcf",
      label: "Free Cash Flow",
      value: 28.4,
      prefix: "$",
      suffix: "M",
      trend: 22.1,
      trendLabel: "YoY",
      accent: "#2d9cdb",
    },
  ],
  // 6-quarter revenue trend (in $M) — for sparkline / bar chart
  quarterly: [
    { quarter: "Q1'24", value: 51.2, arr: 121.0 },
    { quarter: "Q2'24", value: 56.8, arr: 132.5 },
    { quarter: "Q3'24", value: 58.4, arr: 145.2 },
    { quarter: "Q4'24", value: 61.0, arr: 155.8 },
    { quarter: "Q1'25", value: 60.4, arr: 168.1 },
    { quarter: "Q2'25", value: 63.2, arr: 184.2 },
  ],
  // Backlog & retention
  retention: [
    { label: "Services backlog", value: "$312M", trend: "+22% YoY", accent: "#1d81f2" },
    { label: "Net revenue retention", value: "118%", trend: "+6pp YoY", accent: "#24a148" },
    { label: "Gross revenue retention", value: "97%", trend: "+2pp YoY", accent: "#0f62fe" },
    { label: "Rule of 40", value: "47", trend: "+8pts", accent: "#2d9cdb" },
  ],
  // Stock snapshot (simulated)
  stock: {
    ticker: "NTWK",
    exchange: "NASDAQ",
    price: 8.42,
    change: 0.18,
    changePercent: 2.19,
    volume: "284K",
    dayRange: "$8.21 – $8.51",
    yearRange: "$5.94 – $9.18",
    marketCap: "$98.4M",
  },
  // Upcoming events
  events: [
    { id: "e1", date: "Aug 14, 2026", type: "Earnings", title: "Q4 FY26 earnings release", location: "Webcast", accent: "#1d81f2" },
    { id: "e2", date: "Sep 09, 2026", type: "Conference", title: "B Riley Industrial Conference", location: "San Francisco", accent: "#0f62fe" },
    { id: "e3", date: "Oct 22, 2026", type: "Annual Meeting", title: "Annual Shareholder Meeting", location: "Beverly Hills, CA", accent: "#24a148" },
    { id: "e4", date: "Nov 12, 2026", type: "Investor Day", title: "NETSOL Investor Day 2026", location: "New York", accent: "#2d9cdb" },
  ],
};

// ---------------------------------------------------------------------------
// Round 7: Press / Media Center archive — filterable press releases
// ---------------------------------------------------------------------------
export const PRESS_CENTER = {
  title: "Press & media center",
  subtitle:
    "The latest from NETSOL's newsroom — product launches, customer wins, executive moves, and analyst recognitions. Filter by category or date.",
  categories: [
    { id: "all", label: "All" },
    { id: "product", label: "Product" },
    { id: "customer", label: "Customer wins" },
    { id: "investor", label: "Investor" },
    { id: "award", label: "Awards" },
    { id: "esg", label: "ESG" },
  ],
  releases: [
    {
      id: "pr-1",
      date: "2026-04-14",
      displayDate: "Apr 14, 2026",
      category: "product",
      categoryLabel: "Product",
      title: "NETSOL launches generative underwriting copilot for Transcend Finance customers",
      excerpt:
        "New copilot accelerates underwriter productivity by 38% on mid-ticket applications, with regulator-grade SHAP explanations on every decision.",
      accent: "#1d81f2",
      featured: true,
    },
    {
      id: "pr-2",
      date: "2026-03-21",
      displayDate: "Mar 21, 2026",
      category: "customer",
      categoryLabel: "Customer win",
      title: "NETSOL and a top-3 European bank complete 9-month core migration",
      excerpt:
        "The bank consolidated 4 legacy lessor platforms onto a single Transcend tenant — 4 months ahead of the regulator's deadline.",
      accent: "#24a148",
      featured: true,
    },
    {
      id: "pr-3",
      date: "2026-02-08",
      displayDate: "Feb 08, 2026",
      category: "award",
      categoryLabel: "Award",
      title: "NETSOL named 'Asset Finance Platform of the Year' by Frost & Sullivan",
      excerpt:
        "Recognition for the third consecutive year — citing Transcend's measurable customer outcomes and NETSOL's investments in AI Labs.",
      accent: "#0f62fe",
      featured: false,
    },
    {
      id: "pr-4",
      date: "2026-01-22",
      displayDate: "Jan 22, 2026",
      category: "investor",
      categoryLabel: "Investor",
      title: "Q2 FY26 results: revenue up 11.4% YoY, services backlog at record $312M",
      excerpt:
        "Net revenue retention reaches 118%. Company raises FY26 full-year guidance on continued strong new logo momentum.",
      accent: "#2d9cdb",
      featured: false,
    },
    {
      id: "pr-5",
      date: "2025-12-04",
      displayDate: "Dec 04, 2025",
      category: "esg",
      categoryLabel: "ESG",
      title: "2025 Sustainability Report published — 4.2M sheets of paper eliminated",
      excerpt:
        "Company reports 38% reduction in customer-tenant paper usage, 41% renewable energy mix across delivery centers, and ISO 27001 re-certification.",
      accent: "#24a148",
      featured: false,
    },
    {
      id: "pr-6",
      date: "2025-11-18",
      displayDate: "Nov 18, 2025",
      category: "product",
      categoryLabel: "Product",
      title: "NETSOL AI Labs ships Document AI 2.0 with 99.6% field-level accuracy",
      excerpt:
        "Document AI 2.0 adds support for 14 new document types and a low-confidence human-in-the-loop review queue that cuts exception handling by 71%.",
      accent: "#1d81f2",
      featured: false,
    },
    {
      id: "pr-7",
      date: "2025-10-09",
      displayDate: "Oct 09, 2025",
      category: "customer",
      categoryLabel: "Customer win",
      title: "Pan-APAC fleet operator onboards 38,000 vehicles in 7 months on Transcend",
      excerpt:
        "Post-IPO operator consolidates 6 regional leasing entities onto one platform — passing its reporting audit and avoiding delisting risk.",
      accent: "#56ccf2",
      featured: false,
    },
    {
      id: "pr-8",
      date: "2025-09-22",
      displayDate: "Sep 22, 2025",
      category: "investor",
      categoryLabel: "Investor",
      title: "NETSOL announces $25M share repurchase program",
      excerpt:
        "Board authorises repurchase of up to $25M of common stock over 24 months — signalling confidence in long-term free cash flow generation.",
      accent: "#2d9cdb",
      featured: false,
    },
    {
      id: "pr-9",
      date: "2025-08-15",
      displayDate: "Aug 15, 2025",
      category: "award",
      categoryLabel: "Award",
      title: "NETSOL wins Stevie Gold — Tech Company of the Year (Large)",
      excerpt:
        "Recognition cited NETSOL's compound annual growth rate, customer retention metrics, and AI Labs investments over the prior 36 months.",
      accent: "#0f62fe",
      featured: false,
    },
  ],
};

// ---------------------------------------------------------------------------
// Round 7: Careers detail data — extended role info for modal
// ---------------------------------------------------------------------------
export const CAREER_DETAILS = {
  // Maps to existing CAREERS_ROLES by id — adds detail fields
  details: {
    "eng-1": {
      team: "Platform Engineering",
      reportsTo: "VP, Platform Engineering",
      compensation: "$180K – $240K base + equity",
      responsibilities: [
        "Own end-to-end reliability for the Transcend core servicing platform serving 200+ enterprise customers.",
        "Design and ship multi-region Postgres replication, Kubernetes blue/green deploys, and 99.98% uptime SLAs.",
        "Lead architecture review for new Marketplace modules — calculating blast radius before activation.",
        "Mentor 4–6 senior engineers across the Lahore, Manila, and Bangkok delivery centers.",
        "Partner with AI Labs to ship the generative underwriting copilot without regressing core SLAs.",
      ],
      requirements: [
        "10+ years building production distributed systems in TypeScript and Go.",
        "Deep Postgres operational expertise — including logical replication, partitioning, and PITR.",
        "Kubernetes at production scale (200+ services, multi-region).",
        "Track record of 99.9%+ uptime on a Tier-1 financial system.",
      ],
      perks: [
        "Above-market compensation + meaningful equity grant.",
        "$3,500 annual learning budget (books, conferences, certifications).",
        "Annual travel to one of the six delivery centers for in-person collaboration week.",
        "Wellness stipend + premium health coverage for the engineer and dependents.",
      ],
    },
    "ai-1": {
      team: "AI Labs",
      reportsTo: "Director, AI Labs",
      compensation: "£140K – £180K base + equity",
      responsibilities: [
        "Drive the generative underwriting copilot from prototype to GA across 14 tenant customers.",
        "Build RAG pipelines over customer document corpora (pay stubs, bank statements, tax returns).",
        "Design offline + online evals — including SHAP-based explanations for every model decision.",
        "Partner with the customer's chief risk officer to onboard the model into their audit framework.",
        "Publish internal research notes and present at one industry conference per year.",
      ],
      requirements: [
        "8+ years shipping ML/AI systems in production — at least 3 with LLM applications.",
        "Deep Python + PyTorch + Hugging Face stack expertise.",
        "Production RAG experience including chunking, retrieval, and re-ranking strategies.",
        "Strong written communication — must be able to explain AI to a regulator.",
      ],
      perks: [
        "Above-market compensation + meaningful equity grant.",
        "Dedicated GPU budget — 4 H100s reserved for your use.",
        "Annual $5,000 conference + paper-reading learning budget.",
        "Co-author papers accepted at NeurIPS, ICML, or similar.",
      ],
    },
    "design-1": {
      team: "Product Design",
      reportsTo: "VP, Product",
      compensation: "$170K – $220K base + equity",
      responsibilities: [
        "Set the design language for the next generation of NETSOL dealer and broker portals.",
        "Lead the design system overhaul — accessibility, motion, dark mode.",
        "Partner with PM + engineering to ship 4 portal launches in the first year.",
        "Mentor 3 mid-level designers and run weekly design critiques.",
        "Represent NETSOL design at one industry event per year.",
      ],
      requirements: [
        "12+ years designing enterprise SaaS products — at least 5 in financial services.",
        "Mastery of Figma — including variables, component libraries, and design tokens.",
        "Track record of shipping accessible (WCAG 2.2 AA) products.",
        "Strong motion design skills (Framer, Rive, or similar).",
      ],
      perks: [
        "Above-market compensation + meaningful equity grant.",
        "Annual design conference budget (Config, AWWWARDS, etc.).",
        "Choice of hardware + calibrated displays for home office.",
        "Annual team offsite at one of the six delivery centers.",
      ],
    },
    "sales-1": {
      team: "Sales",
      reportsTo: "VP, APAC Sales",
      compensation: "$220K – $280K OTE (50/50 base + variable)",
      responsibilities: [
        "Own NETSOL's expansion across Southeast Asia asset finance — captives, banks, OEMs.",
        "Build and execute the regional GTM plan with marketing, product, and leadership.",
        "Close 4–6 new enterprise logos per year at $1M+ ACV.",
        "Hire and mentor 2–3 account executives in years 2–3.",
        "Represent NETSOL at major APAC financial services events.",
      ],
      requirements: [
        "12+ years enterprise SaaS sales — at least 5 in financial services.",
        "Demonstrated $5M+ ARR closed in APAC over the prior 24 months.",
        "Existing relationships at Tier-1 banks and OEM captives in the region.",
        "Fluent English + one of Bahasa, Thai, or Vietnamese.",
      ],
      perks: [
        "Above-market OTE with uncapped accelerators.",
        "Annual President's Club trip for top performers.",
        "Travel budget + premium airline status.",
        "Stocked apartment in Bangkok during initial 12 months.",
      ],
    },
    "eng-2": {
      team: "Cloud & Reliability",
      reportsTo: "Director, Cloud Engineering",
      compensation: "$160K – $210K base + equity",
      responsibilities: [
        "Lead NETSOL's multi-cloud (AWS + Azure) migration for the next generation of customer tenants.",
        "Design disaster recovery and business continuity — including 99.99% uptime targets.",
        "Own the Terraform module library and CI/CD pipeline for infrastructure.",
        "Drive cost optimisation — target 18% reduction in cloud unit cost over 24 months.",
        "Mentor 3–4 engineers and lead a quarterly reliability game day.",
      ],
      requirements: [
        "8+ years operating production cloud infrastructure at scale.",
        "Deep AWS + Azure expertise (solutions architect or equivalent).",
        "Terraform at production scale (100+ modules).",
        "Track record of measurable cost reductions in a previous role.",
      ],
      perks: [
        "Above-market compensation + meaningful equity grant.",
        "Annual AWS re:Invent + KubeCon attendance.",
        "$3,500 annual learning budget.",
        "Wellness stipend + premium health coverage.",
      ],
    },
    "consult-1": {
      team: "Consultancy",
      reportsTo: "VP, Consultancy",
      compensation: "$200K – $260K base + bonus",
      responsibilities: [
        "Lead GenAI advisory engagements for top-tier bank and captive clients.",
        "Translate AI capability into board-level outcomes — measurable, defensible, fundable.",
        "Author 2 thought-leadership pieces per year for NETSOL's insights channel.",
        "Mentor 2–3 senior consultants on GenAI delivery patterns.",
        "Speak at 2 industry conferences per year on NETSOL's behalf.",
      ],
      requirements: [
        "15+ years in financial services consulting — at least 3 in GenAI delivery.",
        "Demonstrated $10M+ in consulting revenue sourced personally.",
        "Existing relationships with C-suite at Tier-1 banks or captives.",
        "Excellent written and verbal communication — must be able to brief a board.",
      ],
      perks: [
        "Above-market compensation + meaningful equity grant.",
        "Thought-leadership platform — publish under your name.",
        "Premium travel + business development budget.",
        "Annual team offsite at one of the six delivery centers.",
      ],
    },
  },
};
