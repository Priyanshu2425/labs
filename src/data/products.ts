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
}

export const productsData: Record<string, Product> = {
  "boss-os": {
    id: "boss-os",
    title: "Boss OS",
    subtitle: "Contributed the browser module to BOSS Linux — India's national open-source operating system with 6M+ deployments across government and institutional installations.",
    client: "CDAC, Govt. of India",
    categories: ["Government", "Open Source"],
    status: "live",
    overview: "Developed and contributed the browser module for BOSS Linux. This is a core component of the desktop experience used across government installations nationwide. The browser module integrates with the BOSS desktop environment, handles web standards compliance, and supports Indian language rendering for regional scripts (Devanagari, Tamil, Bengali, etc.).",
    features: [
      "Browser engine integration with BOSS Linux desktop environment",
      "Multi-script rendering support for 18+ Indian languages",
      "Compliance with government IT security standards",
      "Package management integration with BOSS software repositories",
      "Lightweight footprint for deployment on government-standard hardware"
    ],
    techStack: ["Linux", "C/C++", "GTK+", "WebKit", "Python"],
    metrics: [
      { label: "Deployments", value: "6M+" },
      { label: "Languages", value: "18+" }
    ]
  },
  "weather-prediction": {
    id: "weather-prediction",
    title: "Weather Prediction System",
    subtitle: "ML-based weather analysis and prediction for the Indian Meteorological Department — real-time forecasting and environmental data processing at national scale.",
    client: "IMD, Govt. of India",
    categories: ["Government", "ML"],
    status: "live",
    overview: "Weather analysis devices and ML-based prediction algorithms built for IMD. Processes real-time environmental sensor data through LSTM and deep learning models to generate accurate short-term and long-term weather forecasts used by government agencies.",
    features: [
      "Real-time data ingestion from weather sensor hardware",
      "LSTM-based time-series forecasting for temperature, humidity, rainfall",
      "Multi-region model training with regional climate parameters",
      "Dashboard for meteorologists with confidence intervals",
      "Automated alert generation for extreme weather events"
    ],
    techStack: ["Python", "TensorFlow", "LSTM", "FastAPI", "PostgreSQL"],
    metrics: [
      { label: "Model type", value: "ML/DL" },
      { label: "Devices", value: "Hardware" }
    ]
  },
  "sanad": {
    id: "sanad",
    title: "AI-Native Clinical Notes",
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
    ]
  },
  "grospace": {
    id: "grospace",
    title: "AI-Native Lease Management",
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
  },
  "ai-native-real-estate-fund": {
    id: "ai-native-real-estate-fund",
    title: "AI-Native Real Estate Fund",
    subtitle: "4 AI agents handle deal scouting, underwriting, outreach, and structuring across distressed properties and land parcels.",
    client: "Bethun Bhowmik (ex-Oracle, ex-Amazon, ex-Ola)",
    categories: ["Real Estate"],
    status: "live",
    overview: "4 AI agents powering a Scout → Underwrite → Outreach → Deal Structure pipeline. 13-rule distress detection engine. XGBoost ML scoring (0-100%). Claude underwriting agent generates Buy/Pass/Watch briefs. 3D Mapbox with Street View popups.",
    features: [
      "3 parallel data providers: ATTOM (8 API endpoints), RESO MLS (OData client), Probate (signal-based detection)",
      "13-rule distress classification across 2 tiers",
      "XGBoost on Flask for distress scoring (11 features)",
      "Claude agents for underwriting briefs and deal structuring from 9-strategy library",
      "3D Mapbox with Street View popups",
      "Subscription tier gating across SFR, multifamily, commercial, and land"
    ],
    techStack: ["Python", "Claude", "XGBoost", "Mapbox", "Flask", "ATTOM API"],
    metrics: [
      { label: "AI Agents", value: "4" },
      { label: "Distress Rules", value: "13" }
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
    ]
  },
  "crawl360": {
    id: "crawl360",
    title: "Crawl360",
    subtitle: "Production-grade web scraping API with auto-escalating fetcher modes, structured data extraction and multi-page crawling.",
    client: "Internal SaaS",
    categories: ["Web Scraping", "API", "SaaS"],
    status: "live",
    overview: "Production-grade web scraping API with auto-escalating fetcher strategies: fast HTTP → headless browser → stealth mode. Structured data extraction, recursive crawling, AI-powered parsing.",
    features: [
      "3 fetcher modes: fast HTTP, headless browser, stealth Playwright",
      "Structured data extraction with CSS/XPath selectors",
      "Multi-page recursive crawling with depth control",
      "AI-powered content parsing and schema extraction",
      "Rate limiting, proxy rotation, and session management",
      "REST API with webhook support for async jobs"
    ],
    techStack: ["Python", "FastAPI", "Playwright", "Redis", "PostgreSQL"],
    metrics: [
      { label: "API Capabilities", value: "7" },
      { label: "Fetcher Modes", value: "3" }
    ]
  },
  "slm360": {
    id: "slm360",
    title: "SLM360",
    subtitle: "On-device NLU engine with 98-100% accuracy, 39ms latency, and 50MB footprint. Solves the NLU trilemma.",
    client: "Open Edge AI",
    categories: ["Edge AI", "Research"],
    status: "live",
    overview: "On-device natural language understanding engine that simultaneously achieves high accuracy, low latency, and small memory footprint — running entirely in the browser via WebAssembly. No cloud, no round trips.",
    features: [
      "98-100% NLU accuracy on standard benchmarks",
      "39ms end-to-end inference latency in browser",
      "50MB total model footprint (weights + runtime)",
      "Runs in browser via ONNX Runtime + WebAssembly",
      "No network requirement — fully offline capable",
      "TypeScript SDK with zero external dependencies"
    ],
    techStack: ["TypeScript", "ONNX Runtime", "WebAssembly", "Python (training)"],
    metrics: [
      { label: "Latency", value: "39ms" },
      { label: "Footprint", value: "50MB" }
    ]
  },
  "investor-update-drafter": {
    id: "investor-update-drafter",
    title: "Investor Update Drafter",
    subtitle: "AI-drafted monthly investor updates that write themselves from your live metrics — tone toggles, send history, one-click delivery.",
    client: "Public — labs prototype",
    categories: ["Founder Tools"],
    status: "prototype",
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
  },
  "sales-call-coach": {
    id: "sales-call-coach",
    title: "Sales Call Coach",
    subtitle: "Gong-style call review with AI-flagged moments, transcripts, and rep scorecards — coaching at the speed of sales.",
    client: "Public — labs prototype",
    categories: ["Sales AI"],
    status: "prototype",
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
  },
  "inbox-zero": {
    id: "inbox-zero",
    title: "Inbox Zero",
    subtitle: "AI email triage that gets you to inbox zero by lunch — smart lanes, drafted replies, and a daily debrief.",
    client: "Public — labs prototype",
    categories: ["Productivity AI"],
    status: "prototype",
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
  }
};
