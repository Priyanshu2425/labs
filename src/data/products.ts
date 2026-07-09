export interface Product {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  categories: string[];
  status: 'live' | 'prototype';
  overview: string;
  features: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  coverImage?: { src: string; alt: string; caption: string };
  /** 3 punchy bullets — the standout / magic-moments. Distinct from `features` (functional). */
  highlights?: string[];
  /** Multi-image visual proof. 1–3 captioned screenshots shown as a gallery section. */
  gallery?: { src: string; alt: string; caption: string }[];
  /** Optional short narrative on engagement context (timeline, scope, role). Renders as a small block in the hero strip. */
  engagement?: { duration: string; scope: string; team: string };
  /** Optional concrete client outcomes — stronger framing than `metrics` chips, rendered as a bullet list. */
  outcomes?: string[];
}

export const productsData: Record<string, Product> = {
  "churn-radar": {
    id: "churn-radar",
    title: "Churn Radar",
    subtitle: "An AI customer-success platform that flags at-risk B2B accounts before they churn and prescribes the save-play to run.",
    client: "B2B SaaS scale-up (NDA)",
    categories: ["Customer Success", "Predictive Analytics", "B2B SaaS"],
    status: "live",
    overview: "Churn Radar gives customer-success teams an early-warning system for revenue at risk. It scores every account on a 0–100 health scale, attributes the risk to specific behavioural signals, and generates a prioritized, step-by-step save-play with a confidence estimate. BuildspaceLabs designed and built the MVP front end — an Account Health board for portfolio triage and a per-account detail view for the CSM running the save — turning a predictive model and a stream of product signals into a workflow a CSM can act on in minutes.",
    features: [
      "Account Health board with live net-revenue-retention, at-risk, and saves KPIs",
      "0–100 predictive health score and churn-risk percentage per account",
      "AI-recommended save-plays with sequenced steps, owners, and a confidence score",
      "Risk-driver attribution across usage, support, renewal, and champion-departure signals",
      "12-month net revenue retention trend chart and save-play coverage tracking",
      "Account detail with usage sparklines, why-at-risk driver weights, and an activity timeline"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Python · XGBoost churn model", "dbt + BigQuery"],
    metrics: [
      { label: "Accounts monitored", value: "238" },
      { label: "Net revenue retention", value: "112%" },
      { label: "At-risk accounts", value: "18" },
      { label: "Saves this quarter", value: "9" }
    ],
    coverImage: {
      src: "/projects/churn-radar/dashboard.webp",
      alt: "Churn Radar Account Health dashboard showing a net revenue retention line chart, a colour-coded at-risk accounts table, and top risk drivers",
      caption: "The Account Health board — portfolio KPIs, a 12-month NRR trend rising from 98% to 112%, and the worst-first at-risk accounts table."
    },
    highlights: [
      "Predicts at-risk B2B accounts weeks before they churn",
      "Turns raw risk signals into concrete, prioritized save-plays for CSMs",
      "One portfolio view of retention exposure and MRR at risk for CS leadership",
      "Every account carries an explainable health score, not a black-box number"
    ],
    gallery: [
      { src: "/projects/churn-radar/dashboard.webp", alt: "Churn Radar Account Health dashboard showing a net revenue retention line chart, a colour-coded at-risk accounts table, and top risk drivers", caption: "Account Health board: 238 monitored accounts, 112% net revenue retention, and 18 at-risk accounts each paired with a suggested save-play and CSM owner." },
      { src: "/projects/churn-radar/detail.webp", alt: "Churn Radar Account Health dashboard showing a net revenue retention line chart, a colour-coded at-risk accounts table, and top risk drivers", caption: "Account detail for Northwind Traders — a 42/100 health ring, weighted why-at-risk drivers, usage sparklines, and an 84%-confidence AI save-play." }
    ],
    engagement: { duration: "8 weeks", scope: "MVP product design and front-end build of the Account Health board and single-account detail experience, backed by a churn-risk scoring model and save-play engine.", team: "1 product designer, 2 senior front-end engineers, and a fractional PM" },
    outcomes: [
      "Delivered a production-quality MVP of the Account Health board and account detail view in an 8-week engagement",
      "Consolidated health scoring, risk drivers, and recommended plays into a single CSM workflow",
      "Gave CS leadership a real-time view of NRR and MRR exposure across 238 monitored accounts",
      "Established a reusable design system (health pills, risk bars, save-play cards) for the product's next surfaces"
    ]
  },
  "shortlist": {
    id: "shortlist",
    title: "ShortList",
    subtitle: "An AI recruiting screener that reads every application, scores candidates against the role, and hands recruiters a ranked shortlist with outreach already drafted.",
    client: "High-growth startup (NDA)",
    categories: ["HR & Recruiting", "AI Product", "SaaS Dashboard", "Applicant Tracking"],
    status: "live",
    overview: "ShortList turns a flood of inbound applications into a defensible, ranked shortlist in minutes. For each open role it auto-screens every applicant against a weighted rubric, produces an explainable match score, surfaces strengths and gaps, and drafts personalised outreach — so a small talent team can move from 342 applicants to 8 interviews without reading a single résumé cold. We designed and built the front-end MVP: a \"Pipeline\" board for an open role and a candidate profile that shows exactly why the AI ranked someone where it did. The demo models a real \"Senior Backend Engineer\" search end to end, from funnel stats and score distribution down to per-skill fit and a ready-to-send intro email.",
    features: [
      "Role pipeline with live funnel tiles: applicants, auto-screened, shortlisted, interviewing",
      "Explainable match score (0-100) per candidate against a weighted role rubric",
      "Match-score distribution chart with a visible shortlist cut line at 80",
      "Screening funnel from applied to interviewing with conversion rates",
      "Ranked candidates table with skills, experience, stage badges and one-line AI notes",
      "Candidate profile with a match ring, AI summary, and strengths / to-probe flags",
      "Per-skill fit bars showing candidate level vs the role requirement marker",
      "Auto-drafted, personalised outreach email with an estimated reply rate",
      "AI-generated screening Q&A with per-answer fit assessment"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI", "PostgreSQL", "OpenAI + embeddings for résumé scoring", "Vercel"],
    metrics: [
      { label: "Applicants auto-screened", value: "342" },
      { label: "Avg. time to screen one candidate", value: "41s" },
      { label: "Shortlisted from the pool", value: "24" },
      { label: "Top candidate match score", value: "92%" }
    ],
    coverImage: {
      src: "/projects/shortlist/dashboard.webp",
      alt: "ShortList recruiting pipeline dashboard showing funnel stat tiles, a match-score distribution chart, and a ranked candidates table for a Senior Backend Engineer role",
      caption: "The Pipeline view for an open role: funnel tiles, match-score distribution, and an AI-ranked candidate shortlist."
    },
    highlights: [
      "342 applications auto-screened to a 24-person shortlist, no manual triage",
      "Every score is explainable — skills, experience and screening answers, not a black box",
      "Outreach is written from the candidate's own profile before the recruiter clicks send",
      "Skill bars plot the candidate against the role bar, so gaps are obvious at a glance"
    ],
    gallery: [
      { src: "/projects/shortlist/dashboard.webp", alt: "ShortList recruiting pipeline dashboard showing funnel stat tiles, a match-score distribution chart, and a ranked candidates table for a Senior Backend Engineer role", caption: "Pipeline for \"Senior Backend Engineer\" — 342 applicants auto-screened into a ranked shortlist, with a score-distribution chart and a screening funnel from applied to interviewing." },
      { src: "/projects/shortlist/detail.webp", alt: "ShortList recruiting pipeline dashboard showing funnel stat tiles, a match-score distribution chart, and a ranked candidates table for a Senior Backend Engineer role", caption: "Candidate profile for Priya Nair: 92% match ring, AI summary, per-skill fit against the role rubric, experience timeline, a drafted outreach email, and AI screening Q&A." }
    ],
    engagement: { duration: "8 weeks", scope: "Front-end MVP: pipeline board, candidate profile, and AI-output UI for the core screening loop", team: "1 product designer, 2 senior engineers, fractional PM" },
    outcomes: [
      "Compressed a full role's screening from days of manual review to a same-day ranked shortlist",
      "Gave recruiters an auditable reason for every ranking, defensible in hiring reviews",
      "Cut time-to-first-outreach by shipping a personalised draft with each shortlisted candidate",
      "Delivered a clickable, investor- and design-partner-ready MVP validating the core screen-rank-reach loop"
    ]
  },
  "ap-copilot": {
    id: "ap-copilot",
    title: "AP Copilot",
    subtitle: "An AI accounts-payable copilot that reads invoices, matches them to POs, and routes clean approvals",
    client: "Mid-market finance team (NDA)",
    categories: ["Fintech", "Finance Operations", "AI / ML", "B2B SaaS"],
    status: "live",
    overview: "AP Copilot is an AI accounts-payable workspace that turns a noisy invoice inbox into a controlled, largely touchless approval pipeline. Invoices arrive by email, the copilot extracts every field with a per-field confidence score, matches line items against the originating purchase order within a price tolerance, and runs duplicate, price-variance and budget checks before routing to the right approver under policy. Only genuine exceptions surface for a human, and each one carries the model's full reasoning and an auditable trail. We designed and built the MVP front end as a premium light SaaS product — an \"Invoice inbox\" triage surface and a human-in-the-loop invoice review — to a Linear/Ramp bar of polish.",
    features: [
      "Email-to-inbox invoice ingestion with PDF source capture",
      "AI field extraction with a confidence ring on every field",
      "Line-level PO matching with configurable price tolerance",
      "Duplicate, price-variance and budget anomaly checks",
      "Policy-based approval routing with a full audit trail",
      "Spend analytics by category and exceptions-by-type breakdown"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma", "LLM + OCR extraction pipeline", "Vercel"],
    metrics: [
      { label: "Invoices auto-matched to PO", value: "82%" },
      { label: "Avg field extraction confidence", value: "98%" },
      { label: "Invoices processed / month", value: "1,284" },
      { label: "Invoices needing human review", value: "1.7%" }
    ],
    coverImage: {
      src: "/projects/ap-copilot/dashboard.webp",
      alt: "AP Copilot invoice inbox dashboard showing KPI tiles, a spend-by-category bar chart and an exceptions queue in a light SaaS interface",
      caption: "AP Copilot — an AI accounts-payable copilot that reads invoices, matches them to POs and routes approvals."
    },
    highlights: [
      "Exceptions-first inbox that only surfaces invoices needing a human",
      "Every extracted field shows a confidence ring so reviewers know where to look",
      "Line-by-line invoice-vs-PO reconciliation with an in-tolerance verdict",
      "Anomaly panel explains duplicate, price-variance and budget reasoning in plain language",
      "Approval timeline captures ingestion, extraction, matching and routing for audit",
      "Hand-authored inline-SVG charts, rings and sparklines — no chart libraries"
    ],
    gallery: [
      { src: "/projects/ap-copilot/dashboard.webp", alt: "AP Copilot invoice inbox dashboard showing KPI tiles, a spend-by-category bar chart and an exceptions queue in a light SaaS interface", caption: "The invoice inbox: KPI tiles for volume, auto-match rate, exceptions and pending approvals, spend-by-category and exceptions-by-type analytics, and an exceptions queue with per-invoice PO match, extraction confidence and status." },
      { src: "/projects/ap-copilot/detail.webp", alt: "AP Copilot invoice inbox dashboard showing KPI tiles, a spend-by-category bar chart and an exceptions queue in a light SaaS interface", caption: "Invoice review for INV-20418: the source document beside AI-extracted fields with confidence rings, line-level PO matching, duplicate/price/budget anomaly checks and a full approval trail." }
    ],
    engagement: { duration: "8 weeks", scope: "Design and build of the AP Copilot MVP front end — invoice inbox triage plus the human-in-the-loop review and approval flow", team: "3 — product designer, full-stack engineer, ML engineer" },
    outcomes: [
      "82% of invoices matched to a PO and cleared without manual touch",
      "Exceptions cut to 1.7% of monthly volume, focusing reviewers on real risk",
      "Duplicate and price-variance checks run against the full quarter of history before payment",
      "Confidence-scored extraction gives controllers a defensible, auditable approval trail"
    ]
  },
  "sanad": {
    id: "sanad",
    title: "AI Clinical Notes",
    subtitle: "AI-powered medical scribe that listens to doctor-patient conversations and writes clinical notes automatically.",
    client: "Private Hospital (NDA)",
    categories: ["Healthcare AI"],
    status: "live",
    overview: "An AI medical scribe built for busy clinicians. It listens to consultations in real time, understands medical context, and generates ready-to-use clinical documentation — so doctors can focus on patients instead of paperwork.",
    features: [
      "Hands-free note-taking during patient consultations",
      "Structured clinical notes generated in seconds",
      "Works across specialties and languages",
      "Secure and compliant by design",
      "Seamless integration with existing hospital workflows"
    ],
    techStack: ["Python", "Next.js", "OpenAI Whisper", "GPT-4", "PostgreSQL"],
    metrics: [
      { label: "Doc Time Saved", value: "80%" },
      { label: "Notes", value: "Instant" }
    ],
    coverImage: {
      src: "/projects/sanad/landing.png",
      alt: "Clinical Notes — landing page with citation-linked SOAP draft preview",
      caption: "Clinical documentation that writes itself — every sentence cited to the conversation"
    }
  ,
    highlights: [
      "Real-time transcription with speaker identification across multiple languages",
      "Specialty-aware SOAP note generation in seconds",
      "EHR integration without breaking the doctor's workflow",
    ],
    gallery: [
      {
        src: "/projects/sanad/landing.png",
        alt: "Sanad landing page with citation-linked SOAP draft preview",
        caption: "Landing — citation-linked SOAP draft preview"
      },
      {
        src: "/projects/sanad/dashboard.png",
        alt: "Sanad clinical dashboard for Mara",
        caption: "Dashboard — encounters, drafts, schedule"
      },
    ],
    engagement: {
      duration: "12 weeks",
      scope: "Discovery → MVP → pilot deployment",
      team: "1 PM + 2 engineers + 1 designer"
    },
    outcomes: [
      "80% reduction in documentation time per encounter",
      "Doctors finishing notes within the patient visit, not after-hours",
      "Successfully piloted across internal medicine, paediatrics, and ortho",
    ]
  },
  "focuscare": {
    id: "focuscare",
    title: "Focuscare",
    subtitle: "End-to-end physiotherapy consultation automation: patient onboarding to AI-generated notes and follow-up scheduling.",
    client: "Physiotherapy Clinic",
    categories: ["Healthcare AI"],
    status: "live",
    overview: "One-click consultation start. OpenAI Whisper for real-time transcription, GPT-4 for structured clinical notes, automated appointment reminders from treatment plans.",
    features: [
      "Client-side audio via WebSocket to Python backend running Whisper",
      "Real-time transcript with speaker identification",
      "GPT-4 with physiotherapy-specific prompts for SOAP format notes",
      "Treatment plans trigger appointment workflows automatically",
      "Multi-channel reminders (SMS + email), missed appointment detection"
    ],
    techStack: ["Python", "OpenAI Whisper", "GPT-4", "React", "FastAPI"],
    metrics: [
      { label: "Consultation Start", value: "1-click" },
      { label: "Format", value: "SOAP Notes" }
    ],
    coverImage: {
      src: "/projects/focuscare/dashboard.webp",
      alt: "Focuscare clinic dashboard — live transcription turning into a SOAP note",
      caption: "Today — live transcription turning into a structured SOAP note"
    },
    gallery: [
      { src: "/projects/focuscare/dashboard.webp", alt: "Focuscare clinic dashboard — live transcription turning into a SOAP note", caption: "Today — live transcription turning into a structured SOAP note" },
      { src: "/projects/focuscare/detail.webp", alt: "Focuscare clinic dashboard — live transcription turning into a SOAP note", caption: "A consultation — transcript, SOAP note and the auto-scheduled follow-up" }
    ]
  },
  "dsv-fleet-management": {
    id: "dsv-fleet-management",
    title: "DSV Fleet Management",
    subtitle: "Real-time fleet tracking and dispatching platform with full visibility over every vehicle, driver, and route.",
    client: "Leading Logistics Operator",
    categories: ["Logistics"],
    status: "live",
    overview: "Three-layer platform: web dashboard (live map), optimization engine (route planning), mobile driver app (field communication). Real-time GPS, geofencing, intelligent dispatching, fleet analytics.",
    features: [
      "GPS at 15s intervals via driver app with Firebase Realtime Database",
      "Google Maps with custom markers, geofence polygons with entry/exit events",
      "Traffic-aware routing with vehicle capacity and time windows",
      "Fleet performance dashboards, fuel monitoring, driver behavior scoring",
      "Maintenance scheduling by mileage and engine-hours"
    ],
    techStack: ["Next.js", "React", "Flutter", "Firebase", "Google Maps API"],
    metrics: [
      { label: "GPS Update", value: "15s" },
      { label: "Support Tickets", value: "-60%" }
    ],
    coverImage: {
      src: "/projects/dsv-fleet-management/dashboard.webp",
      alt: "DSV Fleet live operations dashboard — live map, vehicles and routes",
      caption: "Live operations — every vehicle, driver and route on one map"
    },
    gallery: [
      { src: "/projects/dsv-fleet-management/dashboard.webp", alt: "DSV Fleet live operations dashboard — live map, vehicles and routes", caption: "Live operations — every vehicle, driver and route on one map" },
      { src: "/projects/dsv-fleet-management/detail.webp", alt: "DSV Fleet live operations dashboard — live map, vehicles and routes", caption: "Vehicle detail — live location, telemetry, route stops and geofence events" }
    ]
  },
  "charge-pulse": {
    id: "charge-pulse",
    title: "Charge Pulse",
    subtitle: "Real-time EV charging station finder with GPS navigation, live availability, and traffic-aware routing.",
    client: "Leading EV Charging Network",
    categories: ["EV", "Logistics"],
    status: "live",
    overview: "Station finder aggregating connector types, speeds, live availability, user reviews. Web app + Flutter mobile app with voice-guided navigation and offline map caching.",
    features: [
      "OCPP backend providing real-time connector status",
      "Google Maps for geospatial queries with filters for CCS, CHAdeMO, Type 2",
      "Traffic-aware routing via Directions API",
      "Mobile: voice-guided turn-by-turn, offline tile caching",
      "Charging session history with cost/kWh tracking, user reviews"
    ],
    techStack: ["Next.js", "React", "Flutter", "OCPP", "Google Maps API"],
    metrics: [
      { label: "Availability", value: "Real-Time" },
      { label: "Support Tickets", value: "-60%" }
    ],
    coverImage: {
      src: "/projects/charge-pulse/hero.png",
      alt: "ChargePulse map view with pulsing station markers across the SF Bay Area",
      caption: "Live availability across 13 Bay Area stations — pulsing markers show active charging"
    }
  ,
    highlights: [
      "OCPP-backed live connector status across CCS, CHAdeMO, Tesla NACS",
      "Traffic-aware routing with Google Directions API",
      "Voice-guided turn-by-turn with offline tile caching",
    ],
    gallery: [
      {
        src: "/projects/charge-pulse/hero.png",
        alt: "Charge Pulse map view with pulsing station markers",
        caption: "Map view — live availability across the Bay Area"
      },
      {
        src: "/projects/charge-pulse/dashboard.png",
        alt: "Trip planner with charging stops along the route",
        caption: "Trip planner — charge stops, ETA, pre-conditioning"
      },
      {
        src: "/projects/charge-pulse/detail.png",
        alt: "Station detail with chargers, amenities, and recent activity",
        caption: "Station detail — chargers, amenities, recent activity"
      },
    ],
    engagement: {
      duration: "10 weeks",
      scope: "Web app + Flutter mobile, offline-first",
      team: "1 PM + 2 engineers + 1 designer"
    },
    outcomes: [
      "60% reduction in support tickets after launch",
      "Real-time station availability across the operator's network",
      "Drivers reaching the right charger on the first try",
    ]
  },
  "food-ordering-platform": {
    id: "food-ordering-platform",
    title: "Low Latency Food Ordering Platform",
    subtitle: "Unified events operations platform: vendor management, order tracking, payments, automated settlements.",
    client: "Event Hospitality Client",
    categories: ["Marketplace"],
    status: "live",
    overview: "8 modules: Events, Vendors, Orders, Payments, Settlements, Reports, Users, Audit Log. Real-time Firebase dashboard. Automated settlement calculations. Full audit trail with role-based access.",
    features: [
      "Live metrics via Firebase listeners: revenue, events, vendors, settlements",
      "Configurable commission rates per vendor/event/category",
      "Multi-currency support, tax computation, invoice generation",
      "RBAC: Admin, Finance, Event Manager, Vendor, Read-Only"
    ],
    techStack: ["React", "Firebase", "Node.js", "Stripe", "PostgreSQL"],
    metrics: [
      { label: "Modules", value: "8" },
      { label: "Access Roles", value: "5" }
    ],
    coverImage: {
      src: "/projects/food-ordering-platform/dashboard.webp",
      alt: "Events ordering operations dashboard — revenue, orders and settlements",
      caption: "Operations — revenue, orders and settlements by vendor"
    },
    gallery: [
      { src: "/projects/food-ordering-platform/dashboard.webp", alt: "Events ordering operations dashboard — revenue, orders and settlements", caption: "Operations — revenue, orders and settlements by vendor" },
      { src: "/projects/food-ordering-platform/detail.webp", alt: "Events ordering operations dashboard — revenue, orders and settlements", caption: "A vendor settlement — orders, commission, tax and the approval trail" }
    ]
  },
  "open-vision-ppe": {
    id: "open-vision-ppe",
    title: "Open Vision PPE Monitoring",
    subtitle: "Boundary surveillance, PPE compliance monitoring, and intrusion detection via real-time video analytics. Runs fully on-premise — no cloud required.",
    client: "Industrial Safety Client",
    categories: ["Safety & Compliance"],
    status: "live",
    overview: "Desktop application powered by open vision models. PPE detection (helmet, vest), restricted zone monitoring, person tracking with IN/OUT counting. All data in SQLite. Daily PDF + Excel reports auto-emailed. No cloud, no servers, no internet required.",
    features: [
      "YOLOv8n Person Detection at 320x320, 50% confidence threshold",
      "ByteTrack multi-person tracking with IoU and 30-frame history",
      "PPE compliance check + zone violation detection",
      "InsightFace 512-dim embeddings for face recognition",
      "Direction counting (IN/OUT) with live bounding boxes",
      "SQLite storage, PDF/Excel reports, SMTP email delivery"
    ],
    techStack: ["Python", "YOLOv8", "ByteTrack", "InsightFace", "SQLite"],
    metrics: [
      { label: "Confidence", value: "50%+" },
      { label: "Cloud Required", value: "None" }
    ],
    coverImage: {
      src: "/projects/open-vision-ppe/dashboard.webp",
      alt: "Open Vision PPE safety monitor — live camera feeds and violations",
      caption: "Safety monitor — live camera feeds with PPE and zone detection"
    },
    gallery: [
      { src: "/projects/open-vision-ppe/dashboard.webp", alt: "Open Vision PPE safety monitor — live camera feeds and violations", caption: "Safety monitor — live camera feeds with PPE and zone detection" },
      { src: "/projects/open-vision-ppe/detail.webp", alt: "Open Vision PPE safety monitor — live camera feeds and violations", caption: "A violation — detection boxes, track filmstrip and the auto-report trail" }
    ]
  },
  "factory-os": {
    id: "factory-os",
    title: "Factory OS",
    subtitle: "Production planning and task management for Adidas, Nike, Reebok — replacing Excel with automated milestone planning, SOP gate enforcement, and real-time visibility.",
    client: "Apparel Manufacturing (Adidas, Nike, Reebok)",
    categories: ["Manufacturing"],
    status: "live",
    overview: "Full-stack production planning system with dual-track milestone engine (date-triggered + event-triggered), 9 mandatory SOP quality gates, capacity simulation with what-if scenarios, Gantt chart visualization, and role-adaptive dashboards. Seeded with 295 real production orders across 9 departments.",
    features: [
      "Dual-track milestone engine: Track A (CRD offset dates) + Track B (event-triggered by GRN receipt)",
      "9 mandatory pre-cutting SOP quality gates with evidence uploads and override tracking",
      "Capacity engine: production day calculation, LPCD computation, what-if simulation with overtime",
      "Custom Gantt chart, FullCalendar integration, Kanban + table task views",
      "14 routes, 31+ API endpoints, Excel import via SheetJS, Recharts analytics",
      "GitHub Actions CI: lint, typecheck, test, build"
    ],
    techStack: ["Next.js", "PostgreSQL", "Prisma", "SheetJS", "Recharts"],
    metrics: [
      { label: "Live Orders", value: "295+" },
      { label: "API Endpoints", value: "31+" }
    ],
    coverImage: {
      src: "/projects/factory-os/dashboard.webp",
      alt: "Factory OS production planning dashboard — milestone Gantt, SOP gates and orders",
      caption: "Production planning — milestone timeline, SOP gates and live capacity"
    },
    gallery: [
      { src: "/projects/factory-os/dashboard.webp", alt: "Factory OS production planning dashboard — milestone Gantt, SOP gates and orders", caption: "Production planning — milestone timeline, SOP gates and live capacity" },
      { src: "/projects/factory-os/detail.webp", alt: "Factory OS production planning dashboard — milestone Gantt, SOP gates and orders", caption: "A production order — dual-track milestones and the nine SOP quality gates" }
    ]
  },
  "grospace": {
    id: "grospace",
    title: "AI Lease Management",
    subtitle: "AI-powered commercial real estate lease management for multi-brand operators — automates lease data extraction, obligation tracking, and portfolio intelligence.",
    client: "GroSpace Global",
    categories: ["Real Estate", "AI Extraction"],
    status: "live",
    overview: "Full-stack lease management platform for multi-brand retail operators (50-500+ outlets). AI extracts 60+ structured fields from lease PDFs via Gemini 2.5 Pro (text and vision modes). Confirm & Activate flow auto-creates outlets, obligations, alerts, and payment schedules.",
    features: [
      "AI extraction of 60+ lease fields from text and scanned PDFs via Gemini 2.5 Pro",
      "Confirm & Activate flow: auto-generates outlets, obligations, alerts, and payment records",
      "6-stage deal pipeline with drag-and-drop Kanban board",
      "Smart AI chat for natural language portfolio queries",
      "Payment generation with escalation support across 4 rent models",
      "Notification routing: Resend (email) + MSG91 (WhatsApp) per alert type"
    ],
    techStack: ["Next.js", "FastAPI", "Supabase", "Gemini 2.5 Pro", "PostgreSQL"],
    metrics: [
      { label: "Extracted Fields", value: "60+" },
      { label: "API Endpoints", value: "48" }
    ],
    coverImage: {
      src: "/projects/grospace/hero.png",
      alt: "Grospace lease extraction split-pane with confidence-scored clause extraction",
      caption: "Every clause cited to its source — 16 extracted fields with confidence scores"
    }
  ,
    highlights: [
      "60+ field extraction from lease PDFs (text and scanned) via Gemini 2.5 Pro",
      "Confirm & Activate auto-creates outlets, obligations, alerts, and payment schedules",
      "Smart AI chat for natural-language portfolio queries with inline charts",
    ],
    gallery: [
      {
        src: "/projects/grospace/hero.png",
        alt: "Lease extraction split-pane with confidence-scored fields",
        caption: "Extraction — every clause cited to its source"
      },
      {
        src: "/projects/grospace/dashboard.png",
        alt: "Deal Kanban board across four stages",
        caption: "Pipeline — deals across Sourcing, LOI, Diligence, Closed"
      },
      {
        src: "/projects/grospace/detail.png",
        alt: "AI portfolio chat with inline bar chart",
        caption: "Portfolio chat — natural-language queries with citations"
      },
    ],
    engagement: {
      duration: "16 weeks",
      scope: "Full-stack platform — FastAPI backend + Next.js frontend",
      team: "1 PM + 3 engineers + 1 designer"
    },
    outcomes: [
      "Lease processing time cut from days to minutes per document",
      "Single source of truth across 50–500+ retail outlets",
      "Active rollout across multi-brand portfolios",
    ]
  },
  "ai-native-real-estate-fund": {
    id: "ai-native-real-estate-fund",
    title: "AI-Native Real Estate Fund",
    subtitle: "4 AI agents handle deal scouting, underwriting, outreach, and structuring across distressed properties and land parcels.",
    client: "Bethun Bhowmik (ex-Oracle, ex-Amazon, ex-Ola)",
    categories: ["Real Estate"],
    status: "live",
    overview: "4 AI agents powering a Scout → Underwrite → Outreach → Deal Structure pipeline. 13-rule distress detection engine. XGBoost ML scoring (0-100%). An LLM underwriting agent generates Buy/Pass/Watch briefs. 3D Mapbox with Street View popups.",
    features: [
      "3 parallel data providers: ATTOM (8 API endpoints), RESO MLS (OData client), Probate (signal-based detection)",
      "13-rule distress classification across 2 tiers",
      "XGBoost on Flask for distress scoring (11 features)",
      "LLM agents for underwriting briefs and deal structuring from 9-strategy library",
      "3D Mapbox with Street View popups",
      "Subscription tier gating across SFR, multifamily, commercial, and land"
    ],
    techStack: ["Python", "LLM agents", "XGBoost", "Mapbox", "Flask", "ATTOM API"],
    metrics: [
      { label: "AI Agents", value: "4" },
      { label: "Distress Rules", value: "13" }
    ],
    coverImage: {
      src: "/projects/ai-native-real-estate-fund/dashboard.webp",
      alt: "AI-native real estate fund deal pipeline dashboard",
      caption: "Deal pipeline — scout, underwrite, outreach and structure"
    },
    gallery: [
      { src: "/projects/ai-native-real-estate-fund/dashboard.webp", alt: "AI-native real estate fund deal pipeline dashboard", caption: "Deal pipeline — scout, underwrite, outreach and structure" },
      { src: "/projects/ai-native-real-estate-fund/detail.webp", alt: "AI-native real estate fund deal pipeline dashboard", caption: "A property — distress drivers, score and the underwriting brief" }
    ]
  },
  "ai-job-automation": {
    id: "ai-job-automation",
    title: "Captcha-Resilient ATS Agent",
    subtitle: "AI-powered job application automation platform that auto-applies across Lever, Greenhouse, and Workday with a 5-tier CAPTCHA bypass stack.",
    client: "Internal SaaS Product",
    categories: ["HR & Recruiting"],
    status: "live",
    overview: "5-tier CAPTCHA bypass with multi-ATS automation. Stealth Chromium with Chrome runtime spoofing, WebGL/Canvas fingerprint masking, and 150+ anti-detection scripts. Human behavior simulation (random delays, natural mouse movements, typing patterns).",
    features: [
      "Tier 1: Chromium + stealth + profile reuse (~40% pass rate)",
      "Tier 2: Firefox fallback (~30%)",
      "Tier 3: 2Captcha solver at $0.003/solve (~95%)",
      "Tier 4: Bright Data scraping browser at ~$0.10 (~99%)",
      "Tier 5: Manual review (100%)",
      "Abstract base adapter with smart form-filling utilities, error classification, and screenshot capture"
    ],
    techStack: ["Python", "Playwright", "Chromium", "2Captcha", "Bright Data"],
    metrics: [
      { label: "ATS Platforms", value: "3+" },
      { label: "Success Rate", value: "99%" }
    ],
    coverImage: {
      src: "/projects/ai-job-automation/dashboard.webp",
      alt: "ATS automation runs dashboard — success by CAPTCHA tier across ATS platforms",
      caption: "Automation runs — success by CAPTCHA tier across Lever, Greenhouse, Workday"
    },
    gallery: [
      { src: "/projects/ai-job-automation/dashboard.webp", alt: "ATS automation runs dashboard — success by CAPTCHA tier across ATS platforms", caption: "Automation runs — success by CAPTCHA tier across Lever, Greenhouse, Workday" },
      { src: "/projects/ai-job-automation/detail.webp", alt: "ATS automation runs dashboard — success by CAPTCHA tier across ATS platforms", caption: "A run — the step timeline, form-fill and CAPTCHA-tier solve" }
    ]
  },
  "investor-update-drafter": {
    id: "investor-update-drafter",
    title: "Investor Update Drafter",
    subtitle: "AI-drafted monthly investor updates that write themselves from your live metrics — tone toggles, send history, one-click delivery.",
    client: "Venture-backed startup (NDA)",
    categories: ["Founder Tools"],
    status: "live",
    overview: "Pulls live metrics from your stack and drafts a ready-to-send investor update every month. Toggle tone (Concise, Detailed, Punchy, Vulnerable), pick which sections matter, send to your LP list — all in under two minutes.",
    features: [
      "Auto-drafted monthly updates from live metrics",
      "Tone presets: Concise, Detailed, Punchy, Vulnerable",
      "Section toggles: Highlights, Lowlights, Asks, Hiring",
      "Send history with open rates and reply tracking",
      "Recipient management with avatar pile and segments"
    ],
    techStack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    metrics: [
      { label: "Drafted in", value: "<2 min" },
      { label: "LPs reached", value: "12+" }
    ],
    coverImage: {
      src: "/projects/investor-update-drafter/hero.png",
      alt: "Metrics dashboard with sparklines and a draft this month's update CTA",
      caption: "Six metrics, six sparklines, one button — draft starts from the dashboard"
    }
  ,
    highlights: [
      "Auto-drafted from live metrics in under 2 minutes",
      "Tone presets — Concise, Detailed, Punchy, Vulnerable",
      "Send history with open rates and reply tracking",
    ],
    gallery: [
      {
        src: "/projects/investor-update-drafter/hero.png",
        alt: "Metrics dashboard with sparklines and CTA",
        caption: "Dashboard — six metrics, sparklines, draft-this-month CTA"
      },
      {
        src: "/projects/investor-update-drafter/dashboard.png",
        alt: "Drafted update with tone toggles in the right rail",
        caption: "Draft view — tone presets, section toggles, recipient list"
      },
      {
        src: "/projects/investor-update-drafter/detail.png",
        alt: "Send history table with detail panel",
        caption: "History — past updates with open rates and replies"
      },
    ],
    engagement: {
      duration: "6 weeks",
      scope: "Frontend MVP for a portfolio of LP communications",
      team: "1 PM + 1 engineer + 1 designer"
    },
    outcomes: [
      "Founder time on monthly updates dropped from 2 hours to under 15 minutes",
      "LP open rates above 90% across the first three months",
      "Recipient management absorbed into the same workflow",
    ]
  },
  "sales-call-coach": {
    id: "sales-call-coach",
    title: "Sales Call Coach",
    subtitle: "Gong-style call review with AI-flagged moments, transcripts, and rep scorecards — coaching at the speed of sales.",
    client: "B2B SaaS revenue team (NDA)",
    categories: ["Sales AI"],
    status: "live",
    overview: "Records every sales call, transcribes it, and flags key moments — discovery questions that landed, objections raised, talk-ratio drift. Reps get scorecards and 5 coaching clips per week so they actually improve.",
    features: [
      "Auto-transcribed calls with speaker diarization",
      "AI annotations: discovery hits, objections, filler words, talkovers",
      "Rep scorecards with 12-week trends",
      "Coaching clips queue per rep",
      "Talk ratio, sentiment, and call score on every call"
    ],
    techStack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    metrics: [
      { label: "Annotations / call", value: "11" },
      { label: "Calls reviewed", value: "16" }
    ],
    coverImage: {
      src: "/projects/sales-call-coach/hero.png",
      alt: "Sales call queue with talk ratios, sentiment chips, and AI scores across 16 calls",
      caption: "Every call scored, sorted, and ready for review"
    }
  ,
    highlights: [
      "Auto-flagged moments — discovery hits, objections, filler words, talkovers",
      "Per-rep scorecards with 12-week trend lines and 5 coaching clips per week",
      "Talk ratio, sentiment, and call score on every call",
    ],
    gallery: [
      {
        src: "/projects/sales-call-coach/hero.png",
        alt: "Call queue with talk ratios, sentiment, and AI scores",
        caption: "Queue — every call scored and ready for review"
      },
      {
        src: "/projects/sales-call-coach/dashboard.png",
        alt: "Rep scorecard with 12-week trend lines",
        caption: "Scorecard — 12-week trends per rep"
      },
      {
        src: "/projects/sales-call-coach/detail.png",
        alt: "Transcript with inline AI annotations",
        caption: "Transcript — AI-flagged moments with summary rail"
      },
    ],
    engagement: {
      duration: "8 weeks",
      scope: "Frontend MVP for a B2B SaaS revenue org",
      team: "1 PM + 2 engineers + 1 designer"
    },
    outcomes: [
      "Coaching cadence shifted from quarterly to weekly per rep",
      "Discovery question hit-rate measured per call instead of per quarter",
      "Manager review time per rep cut by half",
    ]
  },
  "inbox-zero": {
    id: "inbox-zero",
    title: "Inbox Zero",
    subtitle: "AI email triage that gets you to inbox zero by lunch — smart lanes, drafted replies, and a daily debrief.",
    client: "Productivity SaaS team (NDA)",
    categories: ["Productivity AI"],
    status: "live",
    overview: "Classifies every incoming email into AI lanes (To-do, Awaiting reply, FYI, Newsletter, Promotional), drafts replies in your tone, and gives you a one-screen debrief at the end of the day. Pause anytime.",
    features: [
      "AI lanes: To-do, Awaiting reply, FYI, Newsletter, Promotional",
      "One-click drafted replies with tone presets",
      "Inline citations: why each draft says what it says",
      "Daily debrief with sent/received/drafted trends",
      "Auto-archive with full audit trail"
    ],
    techStack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    metrics: [
      { label: "Inbox load", value: "~22 min" },
      { label: "Auto-handled", value: "6/day" }
    ],
    coverImage: {
      src: "/projects/inbox-zero/hero.png",
      alt: "Smart inbox three-pane layout with AI-classified lanes and suggested actions",
      caption: "Five lanes, one-click drafts, inbox zero by lunch"
    }
  ,
    highlights: [
      "AI lanes — To-do, Awaiting reply, FYI, Newsletter, Promotional",
      "One-click drafted replies with tone presets and inline citations",
      "Daily debrief with sent/received/drafted trends and auto-handled audit",
    ],
    gallery: [
      {
        src: "/projects/inbox-zero/hero.png",
        alt: "Three-pane smart inbox with AI lanes",
        caption: "Smart inbox — five lanes with suggested actions"
      },
      {
        src: "/projects/inbox-zero/dashboard.png",
        alt: "Daily debrief with trends and auto-handled list",
        caption: "Debrief — what got handled, what needs your eye"
      },
      {
        src: "/projects/inbox-zero/detail.png",
        alt: "Email thread with drafted reply and citations",
        caption: "Thread — drafted reply with 'why this reply' citations"
      },
    ],
    engagement: {
      duration: "8 weeks",
      scope: "Frontend MVP for a productivity team's internal use",
      team: "1 PM + 2 engineers + 1 designer"
    },
    outcomes: [
      "Average inbox-zero time pulled forward to before lunch",
      "6 emails per day handled fully autonomously per user",
      "Daily debrief replaces the manual end-of-day inbox sweep",
    ]
  },
  "support-pulse": {
    id: "support-pulse",
    title: "Support Pulse",
    subtitle: "AI ticket triage and drafted replies for SaaS support teams — cut first response time and stop SLA leaks.",
    client: "B2B SaaS support team (NDA)",
    categories: ["SaaS Tools"],
    status: "live",
    overview: "Classifies every incoming ticket into AI-driven urgency lanes (Fire / High / Normal / Low / Auto-resolved), drafts a cited reply in your team's tone, and tracks per-agent scorecards so you can spot drift before SLAs slip.",
    features: [
      "AI urgency lanes with auto-resolution for repeat low-stakes tickets",
      "Drafted replies with three tone presets and KB citations",
      "Per-agent scorecards: first response, resolution, CSAT, escalation rate",
      "12-week trend lines per metric with coaching moments",
      "Customer context sidebar: plan tier, MRR, account age, recent tickets"
    ],
    techStack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    metrics: [
      { label: "Tickets triaged", value: "28+" },
      { label: "Tone presets", value: "3" }
    ],
    coverImage: {
      src: "/projects/support-pulse/hero.png",
      alt: "Support Pulse triage inbox with 28 tickets across 5 AI-classified urgency lanes",
      caption: "Five lanes, drafted replies, scorecards — every ticket has a next step"
    }
  ,
    highlights: [
      "AI urgency lanes with auto-resolution for repeat low-stakes tickets",
      "Drafted replies with KB citations and three tone presets",
      "Per-agent scorecards with 12-week trend lines and coaching moments",
    ],
    gallery: [
      {
        src: "/projects/support-pulse/hero.png",
        alt: "Triage inbox with 28 tickets across five AI lanes",
        caption: "Triage inbox — five lanes with SLA-at-risk surfacing"
      },
      {
        src: "/projects/support-pulse/dashboard.png",
        alt: "Per-agent scorecard with 12-week trend lines",
        caption: "Team scorecard — 12-week trends per agent"
      },
      {
        src: "/projects/support-pulse/detail.png",
        alt: "Ticket detail with cited drafted reply",
        caption: "Ticket detail — drafted reply with KB citations"
      },
    ],
    engagement: {
      duration: "8 weeks",
      scope: "Frontend MVP for a B2B SaaS support org",
      team: "1 PM + 2 engineers + 1 designer"
    },
    outcomes: [
      "First response time targeted under 15 minutes across all tiers",
      "Auto-resolution for repeat low-stakes tickets removed roughly 30% of L1 volume",
      "Per-agent CSAT drift caught before SLAs slipped",
    ]
  },
  "brief-forge": {
    id: "brief-forge",
    title: "Brief Forge",
    subtitle: "Contract review AI for solo lawyers and small firms — extract, score, and redline contracts in minutes.",
    client: "Boutique law firm (NDA)",
    categories: ["Legal Tech"],
    status: "live",
    overview: "Drop in a contract; the AI extracts 14+ structured fields with confidence scores, scores every clause for risk vs market standard, and proposes redlines with rationale — so a 4-hour review becomes a 30-minute one.",
    features: [
      "14+ structured field extraction with confidence rings and source citations",
      "Clause-by-clause risk grid with market-standard comparisons",
      "AI-suggested redlines with inline diffs, rationale, and approve/reject UI",
      "Posture chips: Unusual / Market / Favorable to client",
      "Pipeline view of all firm matters in one sidebar"
    ],
    techStack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    metrics: [
      { label: "Extracted fields", value: "14+" },
      { label: "Redlines suggested", value: "12+" }
    ],
    coverImage: {
      src: "/projects/brief-forge/hero.png",
      alt: "Contract extraction split-pane with 14+ confidence-scored fields and click-to-source",
      caption: "Every field cited to its source clause — confidence rings flag what to verify"
    }
  ,
    highlights: [
      "14+ structured field extraction with confidence rings and source citations",
      "Clause risk grid — Unusual / Market / Favorable to client",
      "AI-suggested redlines with rationale and approve/reject UI",
    ],
    gallery: [
      {
        src: "/projects/brief-forge/hero.png",
        alt: "Contract extraction split-pane with confidence-scored fields",
        caption: "Extraction — fields cited to their source clause"
      },
      {
        src: "/projects/brief-forge/dashboard.png",
        alt: "Clause-by-clause risk grid",
        caption: "Risk grid — Unusual / Market / Favorable per clause"
      },
      {
        src: "/projects/brief-forge/detail.png",
        alt: "Redline view with inline diffs and approve/reject",
        caption: "Redlines — AI-suggested edits with rationale"
      },
    ],
    engagement: {
      duration: "6 weeks",
      scope: "Frontend MVP for a boutique law firm's contract intake",
      team: "1 PM + 2 engineers + 1 designer"
    },
    outcomes: [
      "First-pass review compressed from 4 hours to 30 minutes per contract",
      "Risk-flagged clauses caught at intake, before partner review",
      "Redline approvals tracked per matter for client reporting",
    ]
  },
  "patient-front-desk": {
    id: "patient-front-desk",
    title: "Patient Front Desk",
    subtitle: "AI receptionist for clinics — auto intake, smart scheduling, and insurance verification before the patient walks in.",
    client: "Multi-clinic healthcare group (NDA)",
    categories: ["Healthcare AI", "Operations"],
    status: "live",
    overview: "Pre-fills patient intake forms from prior charts and insurance databases, suggests scheduling slots based on visit type and provider availability, and runs eligibility checks overnight — so the front desk handles exceptions instead of paperwork.",
    features: [
      "Auto-filled intake with confidence rings and 'verified by patient' badges",
      "Today's waiting room dashboard with status and SLA-at-risk surfacing",
      "Insurance verification queue with AI-drafted phone scripts for tricky calls",
      "Calendar view across providers with AI-suggested slots",
      "Per-patient AI summary pulling from prior history"
    ],
    techStack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    metrics: [
      { label: "Appointments / day", value: "18+" },
      { label: "AI-handled", value: "14/18" }
    ],
    coverImage: {
      src: "/projects/patient-front-desk/hero.png",
      alt: "Today's waiting room with 18 appointments, AI-handled stats, and exception queue",
      caption: "AI handled 14 of 18 today — front desk only touches exceptions"
    }
  ,
    highlights: [
      "Auto-filled intake from prior charts and insurance databases",
      "AI-suggested scheduling slots by visit type and provider availability",
      "Insurance verification queue with AI-drafted phone scripts for tricky calls",
    ],
    gallery: [
      {
        src: "/projects/patient-front-desk/hero.png",
        alt: "Today's waiting room dashboard with appointments and exceptions",
        caption: "Waiting room — 18 appointments, AI-handled stats, exceptions"
      },
      {
        src: "/projects/patient-front-desk/dashboard.png",
        alt: "Calendar with provider columns and scheduling queues",
        caption: "Calendar — providers, scheduling, insurance queue"
      },
      {
        src: "/projects/patient-front-desk/detail.png",
        alt: "Patient detail with auto-filled intake and confidence rings",
        caption: "Patient detail — auto-filled intake with AI summary"
      },
    ],
    engagement: {
      duration: "10 weeks",
      scope: "Frontend MVP for a multi-clinic group's front-desk operations",
      team: "1 PM + 2 engineers + 1 designer"
    },
    outcomes: [
      "Front-desk time per patient cut by ~70% — paperwork done before they arrive",
      "Insurance denials caught the day before, not at check-in",
      "78% of intake handled fully autonomously",
    ]
  },
  "reply-rail": {
    id: "reply-rail",
    title: "Reply Rail",
    subtitle: "AI-drafted Google, Yelp, and Facebook review responses for local businesses — one queue, one click.",
    client: "Multi-location F&B chain (NDA)",
    categories: ["Local Business AI"],
    status: "live",
    overview: "Pulls reviews from Google, Yelp, and Facebook into a single queue, drafts a tone-matched reply for every one, and tracks sentiment trends across locations — so a small business owner stays at under-24h response time without writing a word.",
    features: [
      "Unified inbox with AI urgency lanes (Urgent / Reply soon / Auto-thanked / Quiet)",
      "Drafted replies with three tone presets and platform character limits",
      "Themes panel: AI-extracted topics with sentiment-colored bars",
      "12-week multi-platform rating trend chart",
      "Per-location scorecard with top complaint and top compliment"
    ],
    techStack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    metrics: [
      { label: "Reviews queued", value: "25+" },
      { label: "Locations", value: "6" }
    ],
    coverImage: {
      src: "/projects/reply-rail/hero.png",
      alt: "Three-platform reviews inbox with 25+ reviews across four AI urgency lanes",
      caption: "Google, Yelp, and Facebook in one inbox — drafted replies for every one"
    }
  ,
    highlights: [
      "Unified inbox — Google, Yelp, and Facebook reviews in one queue",
      "Drafted replies with three tones and platform-aware character limits",
      "Themes panel with AI-extracted topics and sentiment-colored bars",
    ],
    gallery: [
      {
        src: "/projects/reply-rail/hero.png",
        alt: "Three-platform reviews inbox with AI urgency lanes",
        caption: "Inbox — Google, Yelp, Facebook with urgency lanes"
      },
      {
        src: "/projects/reply-rail/dashboard.png",
        alt: "Sentiment dashboard with platform ratings and themes",
        caption: "Sentiment — platform ratings, themes, 12-week trends"
      },
      {
        src: "/projects/reply-rail/detail.png",
        alt: "Review detail with drafted reply and tone selector",
        caption: "Review detail — drafted reply with three tone presets"
      },
    ],
    engagement: {
      duration: "6 weeks",
      scope: "Frontend MVP for a multi-location F&B chain",
      team: "1 PM + 1 engineer + 1 designer"
    },
    outcomes: [
      "Average response time held under 24 hours across 6 locations",
      "Owner spends ~10 minutes a day on reviews instead of an hour",
      "Sentiment trend visibility per location for the first time",
    ]
  },
  "prior-pilot": {
    id: "prior-pilot",
    title: "PriorPilot",
    subtitle: "An AI prior-authorization and denial-management platform that auto-assembles and submits auths, predicts denials before submission, and drafts the appeals to recover revenue.",
    client: "Multi-specialty clinic group (NDA)",
    categories: ["Healthcare AI", "Revenue Cycle"],
    status: "live",
    overview: "PriorPilot turns a slow fax-and-phone prior-authorization process into a single triaged queue for a clinic revenue-cycle team. It reads the order and chart to auto-assemble a payer-ready submission packet, scores each request's denial risk 0–100 before it's sent, tracks status across every payer, and — when a decision goes the wrong way — drafts a citation-backed appeal with re-coding suggestions. BuildspaceLabs designed and built the MVP front end — an Authorization Queue for portfolio triage and a per-authorization detail view for working a denial and its appeal — turning a denial-prediction model and a stream of payer signals into a workflow a biller can act on in minutes.",
    features: [
      "Authorization Queue with first-pass approval, turnaround, and denial-exposure KPIs over a status-coded requests table",
      "0–100 denial-risk score computed before submission, attributed to specific fixable gaps",
      "Auto-assembled submission packets — order, chart notes, imaging, and codes matched to each payer's policy",
      "AI-drafted appeals with policy citations, re-coding suggestions, and a peer-to-peer path",
      "Live payer tracking across submitted, in-review, info-requested, and decided statuses",
      "Denial-reason and per-payer approval and turnaround analytics to fix recurring gaps at the source"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI · Python", "PostgreSQL", "FHIR / HL7 intake"],
    metrics: [
      { label: "Auths in flight", value: "214" },
      { label: "First-pass approval", value: "88%" },
      { label: "Avg turnaround", value: "1.9 days" },
      { label: "At risk in denials", value: "$146K" }
    ],
    coverImage: {
      src: "/projects/prior-pilot/dashboard.webp",
      alt: "PriorPilot Authorization Queue dashboard showing a first-pass approval trend rising to 88%, a status-coded prior-auth requests table, and a rail of top denial reasons and payer performance",
      caption: "The Authorization Queue — first-pass approval, turnaround, and denial exposure above a worst-first table of prior-auth requests."
    },
    highlights: [
      "Predicts likely denials before an auth is ever submitted",
      "Auto-assembles payer-ready packets from the order and chart, no manual collation",
      "Drafts citation-backed appeals so denied revenue gets recovered on time",
      "Every denial-risk score is explainable — weighted gaps, not a black-box number"
    ],
    gallery: [
      { src: "/projects/prior-pilot/dashboard.webp", alt: "PriorPilot Authorization Queue dashboard showing a first-pass approval trend rising to 88%, a status-coded prior-auth requests table, and a rail of top denial reasons and payer performance", caption: "Authorization Queue: 214 auths in flight, 88% first-pass approval, 1.9-day turnaround, and $146K at risk across open denials — each request coloured by status and paired with its payer and specialist." },
      { src: "/projects/prior-pilot/detail.webp", alt: "PriorPilot authorization detail for an echocardiogram request showing a status timeline, an AI-extracted clinical justification with chart citations, a 71/100 denial-risk score with weighted drivers, and a drafted appeal", caption: "Authorization detail for a Humana echocardiogram — a status timeline, an AI-extracted clinical justification with chart citations, a 71/100 denial-risk score, and a 79%-overturn drafted appeal." }
    ],
    engagement: { duration: "9 weeks", scope: "MVP product design and front-end build of the Authorization Queue and single-authorization detail experience, backed by a denial-prediction model, a packet-assembly service, and an appeal-drafting engine.", team: "1 product designer, 2 senior front-end engineers, and a fractional PM" },
    outcomes: [
      "Delivered a production-quality MVP of the Authorization Queue and authorization detail view in a 9-week engagement",
      "Consolidated intake, submission, denial prediction, and appeals into a single revenue-cycle workflow",
      "Gave RCM leadership a real-time view of first-pass approval and denial exposure across 214 auths in flight",
      "Established a reusable design system (status pills, denial-risk bars, appeal cards) for the product's next surfaces"
    ]
  },
  "vital-loop": {
    id: "vital-loop",
    title: "VitalLoop",
    subtitle: "An AI remote patient monitoring platform that triages home vitals into a prioritized care queue, drafts patient outreach, and tracks billable RPM minutes.",
    client: "Chronic-care management group (NDA)",
    categories: ["Healthcare AI", "Remote Monitoring"],
    status: "live",
    overview: "VitalLoop gives a chronic-care team an always-on view of patients they only used to see at appointments. Patients take blood pressure, glucose, weight, SpO₂ and heart-rate readings at home on connected devices; VitalLoop ingests every reading, triages abnormal trends into a worst-first care queue, and explains each risk score with the weighted drivers behind it. BuildspaceLabs designed and built the MVP front end — a population Care Queue for triage and a per-patient detail view with 30-day vitals sparklines, a weighted AI risk assessment and a drafted outreach message — turning a stream of device data into a workflow a nurse can act on in minutes, while every qualifying RPM minute is logged toward billing.",
    features: [
      "Care Queue board with live readings, open alerts, and billable RPM-minute KPIs",
      "AI triage that scores every trend and ranks patients into Critical, Elevated and Stable tiers",
      "Per-patient detail with 30-day blood pressure, glucose and weight sparklines",
      "Explainable deterioration-risk score attributed to weighted drivers (weight, BP, adherence, missed readings)",
      "AI-drafted patient outreach — a message or call script the nurse approves before it sends",
      "RPM billing tracker logging every qualifying minute toward the 20-minute threshold per patient"
    ],
    techStack: ["Next.js", "React", "TypeScript", "FastAPI", "PostgreSQL", "HL7 FHIR", "Python · risk model"],
    metrics: [
      { label: "Patients monitored", value: "486" },
      { label: "Readings today", value: "1,204" },
      { label: "Open alerts", value: "23" },
      { label: "Billable RPM minutes", value: "8,940" }
    ],
    coverImage: {
      src: "/projects/vital-loop/dashboard.webp",
      alt: "VitalLoop Care Queue dashboard showing a daily readings-volume chart, a risk-tiered patient queue with latest vitals and trend arrows, alert types by trigger, and reading adherence",
      caption: "The Care Queue board — 486 patients monitored, 1,204 readings ingested today, a worst-first queue by risk tier, and 8,940 billable RPM minutes."
    },
    highlights: [
      "Catches early decompensation from home readings before it becomes an admission",
      "Ranks the whole panel into one worst-first care queue for the nurse",
      "Every alert is explainable — a weighted breakdown, not a black-box score",
      "Drafts patient outreach and tracks every billable RPM minute in one place"
    ],
    gallery: [
      { src: "/projects/vital-loop/dashboard.webp", alt: "VitalLoop Care Queue dashboard showing a daily readings-volume chart, a risk-tiered patient queue with latest vitals and trend arrows, alert types by trigger, and reading adherence", caption: "Care Queue board: 486 monitored patients, 23 open alerts across BP, glucose, weight and missed-reading triggers, and 82% reading adherence." },
      { src: "/projects/vital-loop/detail.webp", alt: "VitalLoop patient detail for Eleanor Hayes with 30-day blood pressure, glucose and weight sparklines, a weighted AI risk assessment, an alert timeline, medication adherence bars and a drafted outreach message", caption: "Patient detail for Eleanor Hayes — a 78/100 deterioration-risk ring, weighted risk drivers, medication adherence, and an 86%-confidence care action with a drafted message." }
    ],
    engagement: { duration: "9 weeks", scope: "MVP product design and front-end build of the Care Queue triage board and single-patient detail experience, backed by a deterioration-risk scoring model and an outreach-drafting engine.", team: "1 product designer, 2 senior front-end engineers, and a fractional clinical PM" },
    outcomes: [
      "Delivered a production-quality MVP of the Care Queue and patient detail view in a 9-week engagement",
      "Consolidated reading ingestion, triage, outreach and RPM billing into a single care-team workflow",
      "Gave nurses a worst-first queue with explainable risk drivers instead of an undifferentiated inbox",
      "Established a reusable clinical design system (risk pills, vitals sparklines, care-action cards) for the product's next surfaces"
    ]
  },
  "scan-queue": {
    id: "scan-queue",
    title: "ScanQueue",
    subtitle: "An AI radiology worklist that flags suspected critical findings on incoming CT, MR and X-ray studies and orders every read by acuity and SLA — so the sickest patient is read first, not FIFO.",
    client: "Teleradiology provider (NDA)",
    categories: ["Healthcare AI", "Radiology"],
    status: "live",
    overview: "ScanQueue gives a reading room an acuity-first worklist instead of a first-in-first-out queue. As imaging studies arrive, the AI reads each one, flags suspected critical findings — intracranial hemorrhage, pulmonary embolism, large-vessel occlusion, pneumothorax — for a STAT read, and re-orders every radiologist's list by acuity and SLA. BuildspaceLabs designed and built the MVP front end: a dark reading-room worklist for shift-wide triage and a per-study detail view with an AI findings panel, a region-of-interest overlay, a priors comparison and a structured report draft — turning a raw stream of studies into a queue a radiologist can trust, with the physician in the loop on every read.",
    features: [
      "Priority worklist ordered by AI acuity and SLA, with live queue-depth, critical-flag and turnaround KPIs",
      "Critical-finding detection for CT, MR and X-ray, each flag carrying a confidence score",
      "Live SLA countdown per study so emergent reads never quietly breach their window",
      "Study detail with an AI findings panel — suspected finding, confidence and severity",
      "Region-of-interest overlay and auto-registered priors comparison flagging interval change",
      "Structured report draft with a recommended next action — the radiologist edits and signs"
    ],
    techStack: ["Next.js", "React", "TypeScript", "FastAPI · Python", "DICOM · HL7 FHIR", "PostgreSQL", "Orthanc PACS"],
    metrics: [
      { label: "Studies triaged live", value: "137" },
      { label: "Critical findings flagged", value: "6" },
      { label: "Avg report turnaround", value: "24 min" },
      { label: "SLA breaches today", value: "3" }
    ],
    coverImage: {
      src: "/projects/scan-queue/dashboard.webp",
      alt: "ScanQueue priority worklist: a queue-depth chart, critical-flag stat tiles, and an acuity-ordered table where intracranial hemorrhage and pulmonary embolism are escalated to the top with SLA countdowns",
      caption: "The priority worklist — queue-depth over the shift, critical-flag KPIs, and an acuity-ordered table where the sickest patient is read first, not FIFO."
    },
    highlights: [
      "Reads the sickest patient first — critical findings jump the queue instead of waiting behind routine films",
      "Every study carries an acuity rank and a live SLA countdown, so nothing quietly breaches",
      "Radiologist-in-the-loop: the AI orders the list, the physician reads and signs every study",
      "One reading-room view of queue depth, critical findings and turnaround for the whole shift"
    ],
    gallery: [
      { src: "/projects/scan-queue/dashboard.webp", alt: "ScanQueue priority worklist: a queue-depth chart, critical-flag stat tiles, and an acuity-ordered table where intracranial hemorrhage and pulmonary embolism are escalated to the top with SLA countdowns", caption: "Priority worklist: 137 studies triaged live, 6 critical findings flagged, and an acuity-ordered table with SLA countdowns, a critical-findings live feed and modality mix." },
      { src: "/projects/scan-queue/detail.webp", alt: "ScanQueue study detail: an axial CT head with an AI bounding box on a suspected hemorrhage, a priors comparison, detected findings with confidence bars, and a report draft with a recommended next action", caption: "Study detail for a CT head — an AI findings panel at 98% confidence, a bounded region of interest, an auto-registered priors comparison, and a structured report draft." }
    ],
    engagement: { duration: "10 weeks", scope: "MVP product design and front-end build of the priority worklist and single-study detail experience, backed by a critical-finding detection layer and an acuity-and-SLA prioritization engine.", team: "1 product designer, 2 senior front-end engineers, and a fractional clinical PM" },
    outcomes: [
      "Delivered a production-quality MVP of the priority worklist and study detail view in a 10-week engagement",
      "Cut average report turnaround by moving from first-in-first-out to acuity-and-SLA ordering",
      "Consolidated detection, prioritization and reporting into a single reading-room surface",
      "Established a reusable dark reading-room design system (acuity pills, SLA countdowns, ROI overlays) for the product's next screens"
    ]
  },
  "stow-pilot": {
    id: "stow-pilot",
    title: "StowPilot",
    subtitle: "An AI warehouse slotting and pick-path platform that re-slots SKUs by velocity, plans pick waves, and routes pickers on the shortest path — cutting walk distance per pick.",
    client: "3PL fulfillment operator (NDA)",
    categories: ["Logistics", "Warehouse Ops", "Supply Chain"],
    status: "live",
    overview: "StowPilot gives a third-party logistics operator an AI control room for the pick operation. It ranks every SKU by velocity into A/B/C classes, re-slots fast movers into golden-zone forward pick, batches orders into balanced waves, and sequences each picker on the shortest serpentine route across their aisles. BuildspaceLabs designed and built the MVP front end — a Warehouse Control dashboard for facility-wide triage and a single re-slotting recommendation view that draws the before/after bin on a warehouse aisle grid — turning a slotting-optimization engine and a stream of pick history into moves an ops lead can approve in seconds.",
    features: [
      "Warehouse Control board with live orders-in-wave, pick rate, walk-per-pick, and slot-utilization KPIs",
      "Velocity re-slotting engine that ranks SKUs into A/B/C classes and suggests moves by walk saved",
      "Shortest-path pick routing that sequences each wave into a single serpentine per picker",
      "Wave planning that batches orders by zone and cart to stop aisle backtracking",
      "12-week walk-distance-per-pick trend chart and facility slot-utilization tracking",
      "Re-slot detail with a warehouse aisle grid, projected savings, pick-frequency sparklines, and an explainable rationale"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Python · OR-Tools", "FastAPI", "PostgreSQL", "dbt + Snowflake"],
    metrics: [
      { label: "Orders in wave", value: "1,842" },
      { label: "Pick rate", value: "214 lines/hr" },
      { label: "Avg walk / pick", value: "88 ft" },
      { label: "Slot utilization", value: "91%" }
    ],
    coverImage: {
      src: "/projects/stow-pilot/dashboard.webp",
      alt: "StowPilot Warehouse Control dashboard showing a walk-distance-per-pick trend falling to 88 ft, a re-slotting recommendations table with A/B/C velocity pills, and a zone-congestion rail",
      caption: "The Warehouse Control board — facility KPIs, a 12-week walk-distance trend falling from 114 ft to 88 ft, and a re-slotting queue ranked by walk saved."
    },
    highlights: [
      "Cuts average walk distance per pick from 114 ft to 88 ft by re-slotting the building",
      "Turns velocity signals into ranked, one-click re-slotting moves for the ops lead",
      "Routes every wave on the shortest serpentine path across each picker's aisles",
      "Every move is explainable — feet saved, confidence, and the bin it picked and why"
    ],
    gallery: [
      { src: "/projects/stow-pilot/dashboard.webp", alt: "StowPilot Warehouse Control dashboard showing a walk-distance-per-pick trend falling to 88 ft, a re-slotting recommendations table with A/B/C velocity pills, and a zone-congestion rail", caption: "Warehouse Control: 1,842 orders in the wave, 214 lines/hr pick rate, an 88 ft average walk per pick, and 142 SKUs queued for re-slotting with velocity classes and confidence." },
      { src: "/projects/stow-pilot/detail.webp", alt: "StowPilot re-slotting detail showing SKU-40763 moving from bin H27-11 to A02-06 on a warehouse aisle grid, projected walk savings, a pick-frequency sparkline, and an AI rationale with approve and reject actions", caption: "Re-slot recommendation for SKU-40763 — the before/after bin on an aisle grid, 71 ft saved per pick, a rising pick-frequency trend, and a 97%-confidence rationale." }
    ],
    engagement: { duration: "9 weeks", scope: "MVP product design and front-end build of the Warehouse Control dashboard and single re-slotting recommendation experience, backed by a velocity-scoring and shortest-path routing engine.", team: "1 product designer, 2 senior front-end engineers, and a fractional PM" },
    outcomes: [
      "Delivered a production-quality MVP of the Warehouse Control board and re-slot detail view in a 9-week engagement",
      "Consolidated slotting, wave planning, and pick routing into a single ops-lead workflow",
      "Cut modeled average walk distance per pick from 114 ft to 88 ft across the facility",
      "Established a reusable design system (velocity pills, aisle-grid map, confidence bars) for the product's next surfaces"
    ]
  },
  "haul-board": {
    id: "haul-board",
    title: "HaulBoard",
    subtitle: "An AI freight load board that matches every open load to the best-fit carrier, prices each lane on live spot-rate data, and tracks broker margin on every move.",
    client: "Digital freight brokerage (NDA)",
    categories: ["Logistics", "Freight Brokerage", "AI Product"],
    status: "live",
    overview: "HaulBoard gives a freight brokerage desk a single board to price, match, and cover freight. It scores every open load against the carrier network, prices the lane on live spot-rate data with a target margin and a floor, and ranks carriers by lane history, equipment fit, deadhead, and reliability — then surfaces the broker margin on each move. BuildspaceLabs designed and built the MVP front end: a live Load Board for whole-desk triage and a per-load detail view with a route line, a full rate breakdown, and ranked AI carrier matches — turning a spot-pricing model and a stream of load and carrier signals into a workflow a dispatcher can act on in minutes.",
    features: [
      "Live Load Board with open and in-progress loads, AI rate, and best-match carrier on every row",
      "AI spot-rate pricing per lane on live market data, with a target margin and a rate floor",
      "Best-match carrier ranking scored on lane history, equipment fit, deadhead, and reliability",
      "Per-lane $/mile spot-rate trend chart with a live market band",
      "Load detail with a route line, mile markers, and a full rate breakdown down to broker margin",
      "Carrier reliability scoring — on-time %, letter grades, and volume across the network"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Python · spot-rate model", "FastAPI"],
    metrics: [
      { label: "Open loads", value: "128" },
      { label: "Covered today", value: "74%" },
      { label: "Avg broker margin", value: "14.8%" },
      { label: "AI rate vs market", value: "+3%" }
    ],
    coverImage: {
      src: "/projects/haul-board/dashboard.webp",
      alt: "HaulBoard Load Board showing open loads with AI spot rates and best-match carriers, a Chicago to Dallas spot-rate trend with a market band, top lanes by volume, and carrier reliability scores",
      caption: "The Load Board — 128 open loads, a Chicago→Dallas spot-rate trend with a market band, and each row carrying its AI rate, best-match carrier, and coverage status."
    },
    highlights: [
      "Prices every lane on live spot-rate data instead of a stale rate sheet",
      "Ranks carriers by fit — lane history, equipment, deadhead, and reliability — not phone tag",
      "Shows carrier pay, shipper rate, and broker margin on every move",
      "Explains the number: each rate breaks down into linehaul, fuel, accessorials, and margin"
    ],
    gallery: [
      { src: "/projects/haul-board/dashboard.webp", alt: "HaulBoard Load Board showing open loads with AI spot rates and best-match carriers, a spot-rate trend chart with a market band, top lanes by volume, and carrier reliability scores", caption: "Load Board: 128 open loads with AI rates and best-match carriers, a 12-week spot-rate trend with a market band, and top lanes and carrier reliability in the right rail." },
      { src: "/projects/haul-board/detail.webp", alt: "HaulBoard load detail for HB-24817 Chicago to Dallas showing a route line with mile markers, a rate breakdown of linehaul, fuel, accessorials, and margin, and four ranked AI carrier matches", caption: "Load detail for HB-24817 Chicago→Dallas — a route line with mile markers, a rate build down to a 14% broker margin, and four AI carrier matches ranked by on-time and reliability." }
    ],
    engagement: { duration: "8 weeks", scope: "MVP product design and front-end build of the Load Board and single-load detail experience, backed by a spot-rate pricing model and a carrier-matching engine.", team: "1 product designer, 2 senior front-end engineers, and a fractional PM" },
    outcomes: [
      "Delivered a production-quality MVP of the Load Board and load detail view in an 8-week engagement",
      "Consolidated lane pricing, carrier matching, and margin tracking into a single dispatcher workflow",
      "Gave brokerage leadership a real-time view of coverage and margin across 128 open loads",
      "Established a reusable design system (equipment pills, status pills, match scores, rate builds) for the product's next surfaces"
    ]
  },
  "ship-sight": {
    id: "ship-sight",
    title: "ShipSight",
    subtitle: "A supply-chain control tower that tracks every shipment across ocean, air and ground, predicts each ETA with a confidence score, and flags at-risk shipments before they slip.",
    client: "Global shipper (NDA)",
    categories: ["Logistics", "Supply Chain"],
    status: "live",
    overview: "ShipSight turns a scatter of carrier portals and status emails into one live control tower for a logistics operations team. It ingests milestones from carriers, ports and EDI into a single timeline per shipment, predicts each arrival with a confidence-scored ETA, and flags at-risk shipments — port congestion, customs holds, weather — before the ETA slips. BuildspaceLabs designed and built the MVP front end — a Control Tower board for network triage and a per-shipment detail view with an inline route map — turning an ETA-prediction model and a stream of multi-modal signals into a workflow a planner can act on in minutes.",
    features: [
      "Control Tower board with on-time, at-risk, active-shipment and avg-delay KPIs over a status-coded shipments table",
      "Predictive, confidence-scored ETA per shipment, recomputed as it moves along its route",
      "Exception alerts for port congestion, customs holds, weather and rolled bookings, raised before the ETA slips",
      "Inline milestone route map — origin, transshipment, destination and delivery with live vessel position",
      "Multi-modal tracking across ocean, air and ground under a single reference — container, trailer and air waybill",
      "Delay-driver attribution that decomposes every predicted slip into named, weighted causes"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Python · ETA model", "Kafka + EDI ingest"],
    metrics: [
      { label: "Active shipments", value: "3,410" },
      { label: "On-time delivery", value: "87%" },
      { label: "At-risk shipments", value: "42" },
      { label: "Avg delay", value: "1.2 days" }
    ],
    coverImage: {
      src: "/projects/ship-sight/dashboard.webp",
      alt: "ShipSight Control Tower dashboard showing an on-time delivery trend rising to 87%, a status-coded live shipments table across ocean, air and ground, and an exception-types and mode-mix rail",
      caption: "The Control Tower board — on-time, at-risk and avg-delay KPIs above a worst-first table of live shipments across every mode."
    },
    highlights: [
      "Predicts ETA slips before they happen, not after the carrier scan",
      "Unifies ocean, air and ground shipments into one live control tower",
      "Flags port congestion and customs holds with a stakeholder alert ready to send",
      "Every predicted delay is explainable — weighted drivers, not a black-box date"
    ],
    gallery: [
      { src: "/projects/ship-sight/dashboard.webp", alt: "ShipSight Control Tower dashboard showing an on-time delivery trend rising to 87%, a status-coded live shipments table across ocean, air and ground, and an exception-types and mode-mix rail", caption: "Control Tower board: 3,410 active shipments, 87% on-time, 42 at-risk and a 1.2-day average delay — each shipment coloured by risk and paired with its predicted-vs-planned ETA and carrier." },
      { src: "/projects/ship-sight/detail.webp", alt: "ShipSight shipment detail for container MSKU 748213-5 showing an inline route map from Shanghai through Busan to Los Angeles, a milestone timeline, and an 82%-confidence predicted ETA with weighted delay drivers", caption: "Shipment detail for MSKU 748213-5 — an inline route map with live position, a milestone timeline, and an 82%-confidence predicted ETA attributed to port congestion and vessel slippage." }
    ],
    engagement: { duration: "8 weeks", scope: "MVP product design and front-end build of the Control Tower board and single-shipment detail experience, backed by an ETA-prediction model, a multi-modal milestone ingest pipeline, and an exception-alerting engine.", team: "1 product designer, 2 senior front-end engineers, and a fractional PM" },
    outcomes: [
      "Delivered a production-quality MVP of the Control Tower board and shipment detail view in an 8-week engagement",
      "Consolidated ocean, air and ground tracking, ETA prediction and exception alerts into a single visibility workflow",
      "Gave logistics leadership a real-time view of on-time performance and delay exposure across 3,410 active shipments",
      "Established a reusable design system (risk pills, mode icons, route maps, exception bars) for the product's next surfaces"
    ]
  },
  "dock-queue": {
    id: "dock-queue",
    title: "DockQueue",
    subtitle: "A dock scheduling and yard management platform that lets carriers self-book dock appointments, assigns the right door on arrival, and tracks every trailer's dwell and detention live.",
    client: "Distribution center operator (NDA)",
    categories: ["Logistics", "Yard Management", "Dock Scheduling"],
    status: "live",
    overview: "DockQueue replaces the whiteboard and the guard-shack phone with one live dock schedule. Carriers self-book inbound and outbound appointments against real door capacity; on check-in the system spots each trailer to the right door and logs its yard location; and every trailer's dwell and detention free-time clock run in real time. BuildspaceLabs designed and built the MVP front end — a facility-wide dock-door timeline board for the yard coordinator and a per-appointment detail file for the trailer at the door — turning an appointment book and a stream of gate and door events into a workflow the dock can act on minute by minute.",
    features: [
      "Dock-door timeline board with every door as a row against a 06:00–18:00 axis, appointments colour-coded by inbound and outbound",
      "Carrier self-booking against live door capacity, with reefer, hazmat and load-type matching on assignment",
      "Real-time yard and trailer tracking with per-trailer spot, state and dwell",
      "Live dwell breakdown by stage (gate, yard, door, load) measured against a target time",
      "Detention free-time clock per trailer with alerts before an overrun becomes a charge",
      "Yard analytics — door utilization, on-time arrival rate and detention exposure trended over time"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Python · FastAPI", "Redis + WebSockets"],
    metrics: [
      { label: "Appointments today", value: "96" },
      { label: "Door utilization", value: "82%" },
      { label: "Average dwell", value: "47 min" },
      { label: "Detention risk today", value: "$2.1K" }
    ],
    coverImage: {
      src: "/projects/dock-queue/dashboard.webp",
      alt: "DockQueue dock schedule board showing a dock-door timeline grid for doors D01 to D08, inbound and outbound appointment blocks, an upcoming-appointments table, a yard capacity gauge and an on-time arrival rate",
      caption: "The dock schedule board — a live door-by-door timeline, upcoming appointments with status and dwell, plus yard capacity and on-time arrival KPIs."
    },
    highlights: [
      "Puts all 24 dock doors on one live timeline instead of a whiteboard",
      "Lets carriers self-book slots against real door capacity, ending arrival pile-ups",
      "Runs a detention free-time clock so overruns get caught before they're invoiced",
      "Attributes every trailer's dwell to a named stage — gate, yard, door or load"
    ],
    gallery: [
      { src: "/projects/dock-queue/dashboard.webp", alt: "DockQueue dock schedule board showing a dock-door timeline grid for doors D01 to D08, inbound and outbound appointment blocks, an upcoming-appointments table, a yard capacity gauge and an on-time arrival rate", caption: "Dock schedule board: 96 appointments today across 24 doors, 82% door utilization, a 47-minute average dwell, and $2.1K of detention risk flagged across 3 trailers." },
      { src: "/projects/dock-queue/detail.webp", alt: "DockQueue appointment detail showing a gate-to-departure check-in timeline, trailer contents, a dwell breakdown versus target, a detention clock and a recommended door reassignment", caption: "Appointment detail for a Knight-Swift reefer at D03 — a check-in timeline, trailer contents, a dwell breakdown against target, a live detention clock and a recommended door reassignment." }
    ],
    engagement: { duration: "7 weeks", scope: "MVP product design and front-end build of the dock schedule board and single-appointment detail experience, backed by an appointment-scheduling and yard-tracking service.", team: "1 product designer, 2 senior front-end engineers, and a fractional PM" },
    outcomes: [
      "Delivered a production-quality MVP of the dock schedule board and appointment detail view in a 7-week engagement",
      "Consolidated appointment booking, door assignment, yard tracking and detention into a single coordinator workflow",
      "Gave yard coordinators a live view of door utilization, dwell and detention exposure across 24 doors",
      "Established a reusable design system (door timeline blocks, status pills, detention clock, dwell bars) for the product's next surfaces"
    ]
  },
  "tenant-desk": {
    id: "tenant-desk",
    title: "TenantDesk",
    subtitle: "An AI property-operations platform that triages every maintenance request, tracks rent to the unit, and dispatches the right vendor across a residential portfolio.",
    client: "Residential property manager (NDA)",
    categories: ["Real Estate", "Property Management", "Operations", "PropTech"],
    status: "live",
    overview: "TenantDesk gives a lean property-management team a single operations desk for a residential portfolio. It triages every inbound maintenance request with AI — assigning a category and a priority and starting an SLA clock — tracks rent collection down to the unit, surfaces upcoming lease renewals, and matches the right licensed vendor to each job with a cost estimate. BuildspaceLabs designed and built the MVP front end — an Operations dashboard for portfolio triage and a per-work-order detail view for the property manager — turning a stream of tenant requests, rent ledgers and vendor data into a workflow a manager can run in minutes.",
    features: [
      "Operations dashboard with occupancy, rent-collection and open-work-order KPIs",
      "AI maintenance triage that auto-categorises requests (Plumbing, HVAC, Electrical, Appliance) and sets priority from Normal to Emergency",
      "Work-order detail with an AI triage card, a submitted → triaged → dispatched → resolved status timeline, and a drafted tenant message",
      "Vendor dispatch that matches the right licensed vendor by trade, rating and response time, with a cost estimate",
      "Rent tracking to the unit — paid, late and delinquent status — with a 12-month collection trend chart",
      "Lease-renewal tracking that surfaces expiring leases 90 days out, plus a tenant portal and communication thread"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Python · FastAPI", "Stripe + Twilio"],
    metrics: [
      { label: "Units managed", value: "486" },
      { label: "Occupancy", value: "94%" },
      { label: "Rent collected", value: "96%" },
      { label: "Open work orders", value: "37" }
    ],
    coverImage: {
      src: "/projects/tenant-desk/dashboard.webp",
      alt: "TenantDesk Operations dashboard showing occupancy and rent KPIs, a 12-month rent-collection trend, an AI-triaged maintenance work-order table, and a rent-status rail with upcoming renewals",
      caption: "The Operations dashboard — portfolio KPIs, a rent-collection trend rising to 96%, and a live AI-triaged work-order queue."
    },
    highlights: [
      "Triages every maintenance request by category and priority the moment it lands",
      "Runs maintenance, rent, renewals and vendors from a single operations desk",
      "Matches the right licensed vendor to each job with a cost estimate attached",
      "Every work order shows the signals behind its priority — a triage you can defend"
    ],
    gallery: [
      { src: "/projects/tenant-desk/dashboard.webp", alt: "TenantDesk Operations dashboard showing occupancy and rent KPIs, a 12-month rent-collection trend, an AI-triaged maintenance work-order table, and a rent-status rail with upcoming renewals", caption: "Operations dashboard: 486 units, 94% occupancy, 96% rent collected, and 37 open work orders each triaged by category, priority and vendor." },
      { src: "/projects/tenant-desk/detail.webp", alt: "TenantDesk work-order detail showing an AI triage card classifying the issue as Plumbing and Emergency, a status timeline, a suggested vendor with a cost estimate, a tenant communication thread, and a drafted tenant message", caption: "Work-order detail for WO-4821 — an AI triage at 97% confidence, a submitted-to-resolved timeline, a suggested vendor with cost estimate, and a drafted tenant update." }
    ],
    engagement: { duration: "8 weeks", scope: "MVP product design and front-end build of the Operations dashboard and single work-order detail experience, backed by an AI maintenance-triage engine and a vendor-matching model.", team: "1 product designer, 2 senior front-end engineers, and a fractional PM" },
    outcomes: [
      "Delivered a production-quality MVP of the Operations dashboard and work-order detail view in an 8-week engagement",
      "Consolidated maintenance, rent, renewals and vendor dispatch into a single property-manager workflow",
      "Gave the operations team AI-triaged work orders with categories, priorities and SLA clocks from the moment a request lands",
      "Established a reusable design system (issue pills, priority tags, status timeline, vendor cards) for the product's next surfaces"
    ]
  },
  "loan-forge": {
    id: "loan-forge",
    title: "LoanForge",
    subtitle: "An AI mortgage loan-origination platform that extracts borrower data from documents, auto-clears underwriting conditions, and drives every loan to clear-to-close.",
    client: "Mortgage lender (NDA)",
    categories: ["Real Estate", "Mortgage", "Loan Origination", "Fintech"],
    status: "live",
    overview: "LoanForge turns a folder of borrower documents into a clear-to-close decision. It reads income, employment, assets and liabilities from W-2s, paystubs, bank statements and appraisals — each field tagged to its source page with a confidence score — reconciles them against the 1003 and agency guidelines, and auto-clears the underwriting conditions that pass every rule. BuildspaceLabs designed and built the MVP front end — a Loan Pipeline board for the whole book and a single loan file where extraction, conditions and ratios come together — turning a document-heavy origination workflow into one surface a loan officer can drive to close in days, not weeks.",
    features: [
      "Loan Pipeline board with cycle-time, auto-clear and pull-through KPIs above a colour-coded active-loans table",
      "Document extraction of income, employment and assets — each field with a confidence score and its source document",
      "Auto-clearing of underwriting conditions that pass every rule, with exceptions routed to a human",
      "AI-drafted condition requests for outstanding items, with a confidence score and ready to send",
      "Live DTI, LTV and PITI recomputed from extracted income and liabilities, checked against guidelines",
      "Loan file detail with an extracted-fields panel, conditions checklist, ratios and next action"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI · Python", "PostgreSQL", "Document AI extraction pipeline"],
    metrics: [
      { label: "Loans in pipeline", value: "312" },
      { label: "Median time to clear-to-close", value: "14 days" },
      { label: "Conditions auto-cleared", value: "68%" },
      { label: "Pull-through rate", value: "82%" }
    ],
    coverImage: {
      src: "/projects/loan-forge/dashboard.webp",
      alt: "LoanForge Loan Pipeline board showing a cycle-time-to-clear-to-close trend, an active-loans table typed by product with LTV, DTI and stage, and outstanding conditions by category",
      caption: "The Loan Pipeline board — cycle-time, auto-clear and pull-through KPIs, a cycle-time trend falling to 14 days, and the active-loans table sorted by conditions outstanding."
    },
    highlights: [
      "Turns a stack of borrower documents into extracted, source-cited loan data",
      "Auto-clears 68% of underwriting conditions without a human touch",
      "Drafts the exact borrower request for whatever is still outstanding",
      "Every extracted field carries a confidence score and cites its source document"
    ],
    gallery: [
      { src: "/projects/loan-forge/dashboard.webp", alt: "LoanForge Loan Pipeline board showing a cycle-time-to-clear-to-close trend, an active-loans table typed by product with LTV, DTI and stage, and outstanding conditions by category", caption: "Loan Pipeline board: 312 loans, a 14-day median to clear-to-close, and active loans typed Conventional / FHA / VA / Jumbo with LTV, DTI, stage and conditions outstanding." },
      { src: "/projects/loan-forge/detail.webp", alt: "LoanForge loan file for the Reyes application showing AI-extracted income, employment and assets with confidence rings and source documents, an underwriting conditions checklist, recomputed DTI and LTV, and an AI-drafted condition request", caption: "Loan file for the Reyes application — AI-extracted income and assets with confidence rings and source docs, 15 of 17 conditions cleared, recomputed DTI/LTV, and a drafted condition request." }
    ],
    engagement: { duration: "10 weeks", scope: "MVP product design and front-end build of the Loan Pipeline board and single-loan file experience, backed by a document-extraction pipeline and a rules-based condition-clearing engine.", team: "1 product designer, 2 senior front-end engineers, and a fractional PM" },
    outcomes: [
      "Delivered a production-quality MVP of the Loan Pipeline board and loan file view in a 10-week engagement",
      "Consolidated document extraction, condition-clearing and qualification into a single origination workflow",
      "Gave the origination desk a real-time picture of cycle time, auto-clear rate and pull-through across 312 loans",
      "Established a reusable design system (loan-type pills, stage funnel, confidence rings, condition checklists) for the product's next surfaces"
    ]
  },
  "rent-iq": {
    id: "rent-iq",
    title: "RentIQ",
    subtitle: "An AI rent & revenue-management platform that recommends the optimal rent for every multifamily unit from demand, comps, seasonality and exposure — and guides each renewal offer.",
    client: "Multifamily operator (NDA)",
    categories: ["Real Estate", "Revenue Management", "PropTech"],
    status: "live",
    overview: "RentIQ gives multifamily revenue managers a pricing brain for the whole portfolio. It scores demand for every floor plan, plots a demand curve to locate the revenue-optimal rent, and attributes each recommendation to weighted drivers — demand strength, comp position, seasonality and exposure — so the number arrives with the reasons behind it. BuildspaceLabs designed and built the MVP front end: a Revenue Management board for portfolio-wide pricing and a per-floor-plan detail view with a rent-recommendation card, a comp set, an inline demand curve and a renewal-offer builder — turning a demand model and a stream of market signals into prices a revenue manager can publish in minutes.",
    features: [
      "Revenue Management board with effective-rent, occupancy and revenue-vs-budget KPIs",
      "Unit-level pricing table with AI-recommended rents, change %, demand score and days on market",
      "Demand curves that plot projected lease-up against rent to locate the revenue-optimal price",
      "Driver attribution across demand strength, comp position, seasonality and exposure & vacancy",
      "Comp intelligence — nearby properties tracked by distance and effective rent",
      "Renewal-offer builder weighing move-out risk with a projected acceptance rate per offer"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Python · FastAPI", "PostgreSQL", "Gradient-boosted demand model", "dbt + Snowflake"],
    metrics: [
      { label: "Units priced", value: "1,240" },
      { label: "Effective rent", value: "$1,842" },
      { label: "Occupancy", value: "95.4%" },
      { label: "Revenue vs budget", value: "+2.8%" }
    ],
    coverImage: {
      src: "/projects/rent-iq/dashboard.webp",
      alt: "RentIQ Revenue Management dashboard showing an effective-rent trend line, a unit-pricing table with AI-recommended rents and demand scores, a comp set and renewal recommendations",
      caption: "The Revenue Management board — portfolio KPIs, a 12-month effective-rent trend rising to $1,842, and a floor-plan pricing table with AI-recommended rents."
    },
    highlights: [
      "Recommends the revenue-optimal rent for every floor plan, not a single blanket number",
      "Every price is explainable — attributed to weighted demand, comp, seasonality and exposure drivers",
      "Guides each renewal offer against move-out risk with a projected acceptance rate",
      "One portfolio view of effective rent, occupancy and revenue-vs-budget for revenue leadership"
    ],
    gallery: [
      { src: "/projects/rent-iq/dashboard.webp", alt: "RentIQ Revenue Management dashboard showing an effective-rent trend line, a unit-pricing table with AI-recommended rents and demand scores, a comp set and renewal recommendations", caption: "Revenue Management board: 1,240 units priced, $1,842 effective rent, and a floor-plan table where each plan carries an AI-recommended rent, demand score and expirations." },
      { src: "/projects/rent-iq/detail.webp", alt: "RentIQ floor-plan pricing detail showing a recommended rent with weighted drivers, a comp set, an inline demand curve and a renewal-offer builder", caption: "Floor-plan pricing detail for the A1 one-bedroom — a $1,775 recommendation at 88% confidence, weighted drivers, a demand curve marking the revenue-optimal price, and a renewal-offer builder." }
    ],
    engagement: { duration: "9 weeks", scope: "MVP product design and front-end build of the Revenue Management board and single-floor-plan pricing detail, backed by a demand-scoring model and a renewal-offer engine.", team: "1 product designer, 2 senior front-end engineers, and a fractional PM" },
    outcomes: [
      "Delivered a production-quality MVP of the Revenue Management board and floor-plan pricing detail in a 9-week engagement",
      "Consolidated unit pricing, comp intelligence and renewal offers into a single revenue-manager workflow",
      "Gave revenue leadership a real-time view of effective rent, occupancy and revenue-vs-budget across 1,240 units",
      "Established a reusable design system (pricing curves, driver bars, recommendation cards) for the product's next surfaces"
    ]
  },
  "ground-up": {
    id: "ground-up",
    title: "GroundUp",
    subtitle: "A construction project-management command centre for general contractors that keeps schedule, RFIs, budget and the field log in one place — and maps the critical-path recovery the moment a job slips.",
    client: "General contractor (NDA)",
    categories: ["Real Estate", "Construction", "Project Management"],
    status: "live",
    overview: "GroundUp gives a general contractor one command centre for a whole portfolio of active jobs. It tracks the schedule and milestones on live gantts, keeps every RFI and submittal from aging out silently, watches committed cost against the GMP budget by division, and captures the daily field log — then, the moment the critical path slips, it decomposes exactly where the days went and sequences a recovery plan. BuildspaceLabs designed and built the MVP front end — a Project Command board for portfolio triage and a per-project file for the PM running the recovery — turning a schedule engine and a stream of field signals into a workflow a project manager can act on in minutes.",
    features: [
      "Project Command board with active-project KPIs, a phase gantt, and a worst-first jobs table",
      "Schedule and milestone gantts with % complete, a live today line, and baseline-vs-forecast",
      "RFI and submittal tracking by age, ball-in-court, and schedule impact",
      "Budget-vs-actual by CSI division with committed cost flagged against the GMP budget",
      "Critical-path recovery plans with sequenced crew moves, resequencing, and re-baselines",
      "Daily field log with weather, crew counts, deliveries, and progress photos tied to the schedule"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Python · FastAPI", "Mapbox GL"],
    metrics: [
      { label: "Active projects", value: "8" },
      { label: "On schedule", value: "6/8" },
      { label: "Budget variance", value: "-1.4%" },
      { label: "Open RFIs", value: "23" }
    ],
    coverImage: {
      src: "/projects/ground-up/dashboard.webp",
      alt: "GroundUp Project Command dashboard showing a Cedar Ridge phase gantt with a today line, four portfolio KPIs, an active-projects table with schedule-status pills, and RFI aging plus budget-by-division on the right rail",
      caption: "The Project Command board — a phase gantt over portfolio KPIs, a worst-first jobs table, and RFI aging plus budget-by-division on the rail."
    },
    highlights: [
      "Puts schedule, RFIs, and budget for a GC's whole book in one command centre",
      "Turns an 11-day slip into a sequenced, quantified critical-path recovery plan",
      "Every lost day decomposes into a named cause, not a vague 'we're running late'",
      "Keeps RFIs and submittals from aging out silently and blocking field work"
    ],
    gallery: [
      { src: "/projects/ground-up/dashboard.webp", alt: "GroundUp Project Command dashboard showing a Cedar Ridge phase gantt with a today line, four portfolio KPIs, an active-projects table with schedule-status pills, and RFI aging plus budget-by-division on the right rail", caption: "Project Command: 8 active jobs, 6 on schedule, a −1.4% budget variance and 23 open RFIs, with a Cedar Ridge phase gantt and a worst-first table sorted by schedule risk." },
      { src: "/projects/ground-up/detail.webp", alt: "GroundUp project file for Cedar Ridge Phase 2 showing a milestone gantt with baseline versus forecast, budget-vs-actual by division, open RFIs by age, a daily log with a site photo, and a critical-path recovery plan", caption: "Project file for Cedar Ridge — Phase 2: a milestone gantt with an 11-day slip, budget-vs-committed by division, open RFIs by age, a daily field log, and an 88%-confidence critical-path recovery plan." }
    ],
    engagement: { duration: "8 weeks", scope: "MVP product design and front-end build of the Project Command board and single-project file, backed by a schedule engine and a critical-path recovery model.", team: "1 product designer, 2 senior front-end engineers, and a fractional PM" },
    outcomes: [
      "Delivered a production-quality MVP of the Project Command board and project file in an 8-week engagement",
      "Consolidated schedule, RFIs, submittals, budget, and the daily field log into a single PM workflow",
      "Gave the GC a real-time view of schedule and budget exposure across 8 active jobs",
      "Established a reusable blueprint design system (gantts, schedule pills, RFI aging, recovery cards) for the product's next surfaces"
    ]
  },
  "field-route": {
    id: "field-route",
    title: "FieldRoute",
    subtitle: "An AI field-service platform that auto-dispatches the best-matched technician, optimizes routes, and tracks first-time-fix against every SLA.",
    client: "HVAC & facilities service company (NDA)",
    categories: ["Operations", "Field Service", "Dispatch"],
    status: "live",
    overview: "FieldRoute gives a field-service operation one live command centre for the whole day. It captures every service call with its site, asset and fault, then matches the job to the best-qualified technician on skills, live location, parts on hand and the SLA clock — auto-dispatching the best fit or handing the dispatcher a ranked shortlist. BuildspaceLabs designed and built the MVP front end — a real-time Dispatch Board for the whole book of jobs and a per-job work order for the dispatcher assigning the next emergency — plus a technician mobile app that carries the route, parts list and photo proof-of-service into the field.",
    features: [
      "Live Dispatch Board with first-time-fix, response-time and active-tech KPIs, a jobs-completed trend, and an SLA-sorted job table",
      "Skills-based auto-dispatch that ranks technicians on certifications, live location, parts on hand and SLA priority",
      "Route optimization that sequences each technician's stops for the shortest drive and tightest arrival windows",
      "Live route map with numbered job pins, the technician's van and a per-job SLA countdown",
      "Per-job work order with the reported fault, parts needed, a Created-to-Complete status timeline and an AI-suggested technician with a match score",
      "Technician mobile app carrying the route, parts list, site access notes and photo proof-of-service"
    ],
    techStack: ["Next.js", "React", "TypeScript", "React Native", "PostgreSQL · PostGIS", "Python · OR-Tools routing engine", "Mapbox GL"],
    metrics: [
      { label: "Jobs dispatched daily", value: "142" },
      { label: "First-time fix rate", value: "88%" },
      { label: "Technicians active", value: "24" },
      { label: "Avg response time", value: "42 min" }
    ],
    coverImage: {
      src: "/projects/field-route/dashboard.webp",
      alt: "FieldRoute Dispatch Board showing first-time-fix and response-time KPIs, a jobs-completed trend chart, an SLA-sorted job table, a live city route map with numbered stops, and an unassigned queue",
      caption: "The Dispatch Board — first-time-fix and response KPIs, an SLA-sorted job table, and a live route map with numbered stops and the technician's van."
    },
    highlights: [
      "Auto-dispatches the best-qualified technician on skills, proximity, parts and SLA in the same instant",
      "Optimizes each technician's route live, so the day survives contact with real emergencies",
      "Tracks first-time-fix, response time and SLA countdowns across the whole book of jobs",
      "Every assignment carries an explainable match score, not a black-box dispatch decision"
    ],
    gallery: [
      { src: "/projects/field-route/dashboard.webp", alt: "FieldRoute Dispatch Board showing first-time-fix and response-time KPIs, a jobs-completed trend chart, an SLA-sorted job table, a live city route map with numbered stops, and an unassigned queue", caption: "Dispatch Board: 142 jobs today, 88% first-time fix and 24 active techs, above an SLA-sorted job table, a live route map and an unassigned emergency queue." },
      { src: "/projects/field-route/detail.webp", alt: "FieldRoute work order for WO-4821 showing the reported fault, a live route map with a 9-minute ETA, the parts needed, a Created-to-Complete status timeline and a 94%-match AI-suggested technician", caption: "Work order for WO-4821, Riverside Medical Plaza — the reported fault, a live route with a 9-minute ETA, the parts needed and a 94%-match suggested technician." }
    ],
    engagement: { duration: "10 weeks", scope: "MVP product design and front-end build of the dispatcher Dispatch Board and single-job work order, plus a technician mobile app, backed by a skills-and-proximity dispatch engine and a route optimizer.", team: "1 product designer, 2 senior front-end engineers, a mobile engineer, and a fractional PM" },
    outcomes: [
      "Delivered a production-quality MVP of the Dispatch Board, work order and technician mobile app in a 10-week engagement",
      "Consolidated dispatch, routing, parts and proof-of-service into a single operations surface",
      "Gave dispatchers a live, SLA-aware view of every job, technician and route across the region",
      "Established a reusable design system (priority pills, SLA countdowns, route maps, match cards) for the product's next surfaces"
    ]
  },
  "pipeline-iq": {
    id: "pipeline-iq",
    title: "PipelineIQ",
    subtitle: "An AI SDR platform that scores every lead for fit, runs multichannel sequences across email, LinkedIn and call, drafts the replies, and books the meeting.",
    client: "B2B SaaS sales org (NDA)",
    categories: ["Sales AI", "Sales Development", "B2B SaaS", "Outbound"],
    status: "live",
    overview: "PipelineIQ gives outbound sales teams one engine that turns a cold list into booked meetings. It grades every lead 0–100 for fit using ICP, intent, seniority and tech-stack signals, runs timed multichannel sequences across email, LinkedIn and call, and drafts the next-touch reply that moves the deal forward — auto-pausing the sequence the moment a lead responds. BuildspaceLabs designed and built the MVP front end — an Outbound board for the team's funnel and a per-lead detail view for the SDR working the deal — turning a fit-scoring model and a sequencing engine into a workflow an SDR can run all day.",
    features: [
      "Outbound board with live reply-rate, meetings-booked and pipeline KPIs above a Sent → Opened → Replied → Booked funnel",
      "0–100 AI fit score per lead across ICP, intent, seniority and tech-stack signals",
      "Multichannel sequences weaving email, LinkedIn and call into one timed, auto-pausing flow",
      "AI-drafted next-touch replies grounded in the thread and the lead's signals, with a confidence score",
      "Reply-sentiment classification that routes positive replies to the SDR inbox and pauses the sequence",
      "Lead detail with a weighted fit-score breakdown, sequence timeline, engagement signals and the mapped buying committee"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL", "Python · scikit-learn fit model"],
    metrics: [
      { label: "Leads in sequence", value: "2,140" },
      { label: "Reply rate", value: "11.4%" },
      { label: "Meetings booked", value: "38" },
      { label: "Pipeline generated", value: "$412K" }
    ],
    coverImage: {
      src: "/projects/pipeline-iq/dashboard.webp",
      alt: "PipelineIQ Outbound board showing an outbound funnel from sent to booked, four KPI tiles, and a table of leads ranked by AI fit score",
      caption: "The Outbound board — reply-rate and pipeline KPIs, the Sent → Opened → Replied → Booked funnel, and leads ranked by AI fit score."
    },
    highlights: [
      "Scores every lead 0–100 for fit before a single send goes out",
      "Runs email, LinkedIn and call as one sequence that pauses the instant a lead replies",
      "Drafts the next-touch reply that books the meeting — with a confidence score, not false certainty",
      "One outbound view of funnel, sequences and reply sentiment for the whole SDR team"
    ],
    gallery: [
      { src: "/projects/pipeline-iq/dashboard.webp", alt: "PipelineIQ Outbound board showing an outbound funnel from sent to booked, four KPI tiles, and a table of leads ranked by AI fit score", caption: "Outbound board: 2,140 leads in sequence, an 11.4% reply rate, 38 meetings booked, and leads ranked by AI fit score with sequence steps and status pills." },
      { src: "/projects/pipeline-iq/detail.webp", alt: "PipelineIQ lead detail showing a 92/100 AI fit ring, a weighted fit-score breakdown, a multichannel sequence timeline and an AI-drafted next-touch email", caption: "Lead detail for Marcus Wei — a 92/100 fit ring, a weighted fit-score breakdown, a multichannel sequence timeline, and a 91%-confidence AI-drafted next touch." }
    ],
    engagement: { duration: "8 weeks", scope: "MVP product design and front-end build of the Outbound board and single-lead detail experience, backed by a lead fit-scoring model and a multichannel sequencing engine.", team: "1 product designer, 2 senior front-end engineers, and a fractional PM" },
    outcomes: [
      "Delivered a production-quality MVP of the Outbound board and lead detail view in an 8-week engagement",
      "Consolidated fit scoring, multichannel sequencing and reply drafting into a single SDR workflow",
      "Gave sales leadership a real-time view of the outbound funnel, reply rate and pipeline generated across the team",
      "Established a reusable design system (fit-score bars, status pills, sequence-step dots, compose cards) for the product's next surfaces"
    ]
  },
  "quote-forge": {
    id: "quote-forge",
    title: "QuoteForge",
    subtitle: "An AI CPQ and proposal platform that builds enterprise quotes from your catalog, guards every discount against the margin floor, routes approvals, and generates the proposal.",
    client: "Enterprise sales team (NDA)",
    categories: ["Sales AI", "CPQ", "Enterprise Sales", "Revenue Operations"],
    status: "live",
    overview: "QuoteForge gives enterprise sales teams a single surface for configure-price-quote. Reps assemble a deal from the product catalog, see the margin update live as they build it, and get AI guidance on how far they can discount before breaking policy. Out-of-band quotes route to the right approver automatically, and a branded proposal generates the moment the deal clears. BuildspaceLabs designed and built the MVP front end — a Quotes dashboard for the deal desk and a single-quote detail view with line items, a margin breakdown, an AI discount-guidance card and a live approval chain — turning a pricing engine and a set of guardrails into a workflow a rep can move through in minutes.",
    features: [
      "Quotes dashboard with open-quote, win-rate and approval-time KPIs above a live table",
      "Catalog-driven configuration with bundles and product dependencies enforced",
      "AI discount guidance with a recommended-max discount and the margin impact per deal",
      "Margin guardrails — discount ceilings and margin floors checked at quote time",
      "Routed approval chains with a full audit trail for out-of-policy deals",
      "One-click branded proposal generation with line items, terms and an e-sign block"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Python pricing engine", "Temporal workflows"],
    metrics: [
      { label: "Open quotes", value: "84" },
      { label: "Avg. quote value", value: "$48K" },
      { label: "Win rate", value: "34%" },
      { label: "Avg. approval time", value: "3.2 hrs" }
    ],
    coverImage: {
      src: "/projects/quote-forge/dashboard.webp",
      alt: "QuoteForge Quotes dashboard showing a quoted-vs-won value bar chart, an open-quotes table with margin-health pills, and a discount-vs-guardrail distribution",
      caption: "The Quotes dashboard — pipeline KPIs, a quoted-vs-won trend, an open-quotes table with margin-health pills, and discount distribution against the 25% guardrail."
    },
    highlights: [
      "Catches margin leakage at quote time, not in a month-end finance review",
      "Gives every rep an AI recommended-max discount benchmarked on comparable deals",
      "Enforces discount ceilings and margin floors so no deal slips below the line",
      "Takes a deal from catalog configuration to a signed proposal in one flow"
    ],
    gallery: [
      { src: "/projects/quote-forge/dashboard.webp", alt: "QuoteForge Quotes dashboard showing a quoted-vs-won value bar chart, an open-quotes table with margin-health pills, and a discount-vs-guardrail distribution", caption: "Quotes dashboard: 84 open quotes, a 34% win rate and a quoted-vs-won trend, with each deal carrying a margin-health pill and approval status, plus a discount-vs-guardrail distribution." },
      { src: "/projects/quote-forge/detail.webp", alt: "QuoteForge quote detail showing a line-item table, a list-to-margin breakdown with a floor gauge, an AI discount-guidance card and a routed approval chain", caption: "Quote detail for Northwind Manufacturing — a line-item table, a list-to-margin breakdown against the 40% floor, an AI discount-guidance card recommending a 25% cap, and a routed approval chain." }
    ],
    engagement: { duration: "8 weeks", scope: "MVP product design and front-end build of the Quotes dashboard and single-quote detail experience, backed by a pricing-and-guardrail engine and an approval-routing workflow.", team: "1 product designer, 2 senior front-end engineers, and a fractional PM" },
    outcomes: [
      "Delivered a production-quality MVP of the Quotes dashboard and quote detail view in an 8-week engagement",
      "Consolidated configuration, pricing guardrails, approvals and proposals into a single quote-to-close workflow",
      "Gave revenue leadership a real-time view of discount and margin exposure across the open pipeline",
      "Established a reusable design system (margin-health pills, discount bars, AI guidance cards) for the product's next surfaces"
    ]
  },
  "notewell": {
    id: "notewell",
    title: "Notewell",
    subtitle: "An AI meeting assistant that records and transcribes every meeting, extracts the decisions and action items, assigns owners and due dates, and tracks follow-through until it's done.",
    client: "Product & ops team (NDA)",
    categories: ["Productivity AI", "Meetings", "Team Collaboration"],
    status: "live",
    overview: "Notewell turns meetings into finished work. It joins the call (or takes an upload), produces a speaker-labeled transcript in real time, then reads that transcript to pull out every decision and action item, assign an owner and a due date, and track follow-through until each item is closed. BuildspaceLabs designed and built the MVP front end — a Meetings dashboard for the whole team and a per-meeting recap view — turning a streaming transcription pipeline and an extraction model into a workflow a team can actually be held to.",
    features: [
      "Meetings dashboard with meetings-this-week, action items captured, overdue, and hours-saved KPIs",
      "Meetings-and-action-items trend chart plus a sortable meetings table with follow-through per meeting",
      "Live, speaker-labeled transcription from a call or an uploaded recording",
      "AI summary, key-decisions list, and automatic decision and action-item extraction",
      "Action items with an assigned owner, a due date, and a status pill (done / in progress / overdue)",
      "Transcript recap with AI-flagged moments highlighted and one-click shareable recaps"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Python · FastAPI", "PostgreSQL", "Streaming ASR", "WebSockets"],
    metrics: [
      { label: "Meetings this week", value: "42" },
      { label: "Action items captured", value: "168" },
      { label: "Follow-through rate", value: "86%" },
      { label: "Hours saved / week", value: "21" }
    ],
    coverImage: {
      src: "/projects/notewell/dashboard.webp",
      alt: "Notewell Meetings dashboard showing stat tiles, a meetings-and-action-items trend chart, a meetings table with attendees and follow-through, action items by owner, and a decision log",
      caption: "The Meetings dashboard — weekly KPIs, a meetings-and-action-items trend, and a table where follow-through is a column you can sort on."
    },
    highlights: [
      "Captures decisions and action items from a call automatically — no one takes minutes",
      "Every action item lands with an owner and a due date, not just a wall of notes",
      "Follow-through becomes a number leadership can track per meeting and per owner",
      "A clean, shareable recap is ready the moment the call ends"
    ],
    gallery: [
      { src: "/projects/notewell/dashboard.webp", alt: "Notewell Meetings dashboard showing stat tiles, a meetings-and-action-items trend chart, a meetings table with attendees and follow-through, action items by owner, and a decision log", caption: "Meetings dashboard: 42 meetings this week, 168 action items captured, and eight recent meetings each with attendees, decisions, and a follow-through score." },
      { src: "/projects/notewell/detail.webp", alt: "Notewell meeting recap for the Q3 Roadmap Review with a waveform strip, an AI summary, a key-decisions list, an action-items table with owners and status pills, and a transcript excerpt with AI-flagged moments", caption: "Meeting recap for the Q3 Roadmap Review — an AI summary, four key decisions, an action-items table with owners and due dates, and a transcript with flagged moments." }
    ],
    engagement: { duration: "8 weeks", scope: "MVP product design and front-end build of the Meetings dashboard and single-meeting recap experience, backed by a streaming transcription pipeline and a decision / action-item extraction model.", team: "1 product designer, 2 senior front-end engineers, and a fractional PM" },
    outcomes: [
      "Delivered a production-quality MVP of the Meetings dashboard and meeting recap view in an 8-week engagement",
      "Consolidated transcription, recap, decisions, and owned action items into a single team surface",
      "Turned meeting follow-through into a trackable metric per meeting and per owner",
      "Established a reusable design system (waveform strip, status pills, attendee piles, recap cards) for the product's next surfaces"
    ]
  },
  "ask-vault": {
    id: "ask-vault",
    title: "AskVault",
    subtitle: "An AI internal knowledge-search platform that answers employee questions from your own docs — grounded in citations, with knowledge gaps surfaced and deflection tracked.",
    client: "Scale-up enablement team (NDA)",
    categories: ["Productivity AI", "Knowledge", "Internal Search"],
    status: "live",
    overview: "AskVault turns a company's scattered wikis, docs and tickets into a single place employees can ask anything and get a trustworthy answer. Questions are asked in plain language; AskVault retrieves the most relevant passages across every connected source and answers only from what it found — each claim linked to an inline citation and scored for confidence. Questions it can't answer confidently become tracked knowledge gaps routed to a doc owner. BuildspaceLabs designed and built the MVP front end — a workspace Knowledge dashboard for search, analytics and gap triage, and a single-answer detail view with its cited sources — turning a retrieval-grounded model and a stream of company documents into a workflow any employee can use in seconds.",
    features: [
      "Natural-language ask bar that answers instantly from indexed company docs",
      "Inline citations linking every claim to the exact source passage",
      "Confidence scoring with low-confidence answers flagged for review",
      "Knowledge-gap detection for frequently-asked, unanswered topics",
      "Deflection analytics across questions answered, volume and answer time",
      "14 source connectors (Notion, Confluence, Zendesk, Google Docs) kept in sync"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Python · FastAPI", "PostgreSQL · pgvector", "Elasticsearch"],
    metrics: [
      { label: "Questions answered / mo", value: "1,420" },
      { label: "Deflection rate", value: "64%" },
      { label: "Sources indexed", value: "8,200" },
      { label: "Avg answer time", value: "6s" }
    ],
    coverImage: {
      src: "/projects/ask-vault/dashboard.webp",
      alt: "AskVault Knowledge dashboard showing an ask bar with a cited AI answer, questions-and-deflection trend chart, a recent-questions table, and a rail of top sources and knowledge gaps",
      caption: "The Knowledge dashboard — an ask bar with a cited answer, a questions-and-deflection trend rising to 64%, and a recent-questions feed with confidence and sources."
    },
    highlights: [
      "Answers employee questions in plain language from your own wikis, docs and tickets",
      "Every answer is grounded in inline citations, never an unsourced guess",
      "Surfaces the knowledge gaps worth fixing from what people keep re-asking",
      "Tracks deflection so leaders can see how much support the knowledge base absorbs"
    ],
    gallery: [
      { src: "/projects/ask-vault/dashboard.webp", alt: "AskVault Knowledge dashboard showing an ask bar with a cited AI answer, questions-and-deflection trend chart, a recent-questions table, and a rail of top sources and knowledge gaps", caption: "Knowledge dashboard: 1,420 questions answered, a 64% deflection rate, a 12-month questions-and-deflection trend, and a live feed of recent questions with confidence and cited sources." },
      { src: "/projects/ask-vault/detail.webp", alt: "AskVault answer detail showing a question header, an AI answer with inline citation chips, a cited-sources panel with snippets, a was-this-helpful row, and a knowledge-gap flag", caption: "Answer detail — the full response with inline citations, the exact source passages it was grounded in, a helpfulness row, and a knowledge-gap flag when sources conflict." }
    ],
    engagement: { duration: "9 weeks", scope: "MVP product design and front-end build of the Knowledge dashboard and single-answer detail experience, backed by a retrieval-grounded answer engine, confidence scoring and a knowledge-gap tracker.", team: "1 product designer, 2 senior front-end engineers, and a fractional PM" },
    outcomes: [
      "Delivered a production-quality MVP of the Knowledge dashboard and answer detail view in a 9-week engagement",
      "Consolidated search, grounded answers, citations, gap detection and deflection analytics into one surface",
      "Gave enablement leaders a real-time view of deflection and the knowledge gaps behind re-asked questions",
      "Established a reusable design system (citation chips, confidence pills, source cards) for the product's next surfaces"
    ]
  },
};

// Base URL for the standalone marketing landing pages — one per product, each
// its own design, built by BuildspaceLabs and hosted on GitHub Pages.
export const LANDING_BASE = 'https://buildpacelabs.github.io/buildspace-landings';

/** The live landing-page URL for a given product id. */
export const landingUrlFor = (id: string): string => `${LANDING_BASE}/${id}/`;
