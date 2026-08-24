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
