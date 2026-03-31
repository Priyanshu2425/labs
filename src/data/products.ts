export interface Product {
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  features: string[];
}

export const productsData: Record<string, Product> = {
  "sanad": {
    id: "sanad",
    title: "AI-Native Clinical Notes",
    subtitle: "AI-powered medical scribe that listens to doctor-patient conversations and writes clinical notes automatically.",
    overview: "An AI medical scribe built for busy clinicians. It listens to consultations in real time, understands medical context, and generates ready-to-use clinical documentation, so doctors can focus on patients instead of paperwork.",
    features: [
      "Hands-free note-taking during patient consultations",
      "Structured clinical notes generated in seconds",
      "Works across specialties and languages",
      "Secure and compliant by design",
      "Seamless integration with existing hospital workflows"
    ]
  },
  "focuscare": {
    id: "focuscare",
    title: "Focuscare",
    subtitle: "End-to-end physiotherapy consultation automation: patient onboarding to AI-generated notes and follow-up scheduling.",
    overview: "One-click consultation start. OpenAI Whisper for real-time transcription, GPT-4 for structured clinical notes, automated appointment reminders from treatment plans.",
    features: [
      "Client-side audio via WebSocket to Python backend running Whisper",
      "Real-time transcript with speaker identification",
      "GPT-4 with physiotherapy-specific prompts for SOAP format notes",
      "Treatment plans trigger appointment workflows automatically",
      "Multi-channel reminders (SMS + email), missed appointment detection"
    ]
  },
  "dsv-fleet-management": {
    id: "dsv-fleet-management",
    title: "DSV Fleet Management",
    subtitle: "Real-time fleet tracking and dispatching platform with full visibility over every vehicle, driver, and route.",
    overview: "Three-layer platform: web dashboard (live map), optimization engine (route planning), mobile driver app (field communication). Real-time GPS, geofencing, intelligent dispatching, fleet analytics.",
    features: [
      "GPS at 15s intervals via driver app with Firebase Realtime Database",
      "Google Maps with custom markers, geofence polygons with entry/exit events",
      "Traffic-aware routing with vehicle capacity and time windows",
      "Fleet performance dashboards, fuel monitoring, driver behavior scoring",
      "Maintenance scheduling by mileage and engine-hours"
    ]
  },
  "charge-pulse": {
    id: "charge-pulse",
    title: "Charge Pulse",
    subtitle: "Real-time EV charging station finder with GPS navigation, live availability, and traffic-aware routing.",
    overview: "Station finder aggregating connector types, speeds, live availability, user reviews. Web app + Flutter mobile app with voice-guided navigation and offline map caching.",
    features: [
      "OCPP backend providing real-time connector status",
      "Google Maps for geospatial queries with filters for CCS, CHAdeMO, Type 2",
      "Traffic-aware routing via Directions API",
      "Mobile: voice-guided turn-by-turn, offline tile caching",
      "Charging session history with cost/kWh tracking, user reviews"
    ]
  },
  "food-ordering-platform": {
    id: "food-ordering-platform",
    title: "Low Latency Food Ordering Platform",
    subtitle: "Unified events operations platform: vendor management, order tracking, payments, automated settlements.",
    overview: "8 modules: Events, Vendors, Orders, Payments, Settlements, Reports, Users, Audit Log. Real-time Firebase dashboard. Automated settlement calculations. Full audit trail with role-based access.",
    features: [
      "Live metrics via Firebase listeners: revenue, events, vendors, settlements",
      "Configurable commission rates per vendor/event/category",
      "Multi-currency support, tax computation, invoice generation",
      "RBAC: Admin, Finance, Event Manager, Vendor, Read-Only"
    ]
  },
  "open-vision-ppe": {
    id: "open-vision-ppe",
    title: "Open Vision PPE Monitoring",
    subtitle: "Open vision model-powered boundary surveillance, PPE compliance monitoring, intrusion detection, and digital SOP compliance through real-time video analytics. Runs on-premise.",
    overview: "Desktop application powered by open vision models, processing live camera feeds through a deep learning pipeline. PPE detection (helmet, vest), restricted zone monitoring, person tracking with IN/OUT counting. All data in SQLite. Daily PDF + Excel reports auto-emailed. No cloud, no servers, no internet required.",
    features: [
      "YOLOv8n Person Detection at 320x320, 50% confidence threshold",
      "ByteTrack multi-person tracking with IoU and 30-frame history",
      "PPE compliance check + zone violation detection",
      "InsightFace 512-dim embeddings for face recognition",
      "Direction counting (IN/OUT) with live bounding boxes",
      "SQLite storage, PDF/Excel reports, SMTP email delivery"
    ]
  },
  "factory-os": {
    id: "factory-os",
    title: "Factory OS",
    subtitle: "Production planning and task management system (Adidas, Nike, Reebok). Replaces Excel-based tracking with automated backward milestone planning, SOP gate enforcement, capacity simulation, and real-time production visibility across 295+ orders.",
    overview: "Full-stack production planning system with dual-track milestone engine (date-triggered + event-triggered), 9 mandatory SOP quality gates, capacity simulation with what-if scenarios, Gantt chart visualization, and role-adaptive dashboards. Seeded with 295 real production orders across 9 departments.",
    features: [
      "Dual-track milestone engine: Track A (CRD offset dates) + Track B (event-triggered by GRN receipt)",
      "9 mandatory pre-cutting SOP quality gates with evidence uploads and override tracking",
      "Capacity engine: production day calculation, LPCD computation, what-if simulation with overtime",
      "Custom Gantt chart, FullCalendar integration, Kanban + table task views",
      "14 routes, 31+ API endpoints, Excel import via SheetJS, Recharts analytics",
      "GitHub Actions CI: lint, typecheck, test, build"
    ]
  },
  "grospace": {
    id: "grospace",
    title: "AI-Native Lease Management Platform",
    subtitle: "AI-powered commercial real estate lease management for multi-brand retail operators (Blue Tokai, Domino's, McDonald's, Burgerama, Enoki). Automates lease data extraction from PDFs, obligation tracking, payment management, risk analysis, and portfolio intelligence.",
    overview: "Full-stack lease management platform for multi-brand retail operators (50-500+ outlets). AI extracts 60+ structured fields from lease PDFs via Gemini 2.5 Pro (text and vision modes). Confirm & Activate flow auto-creates outlets, obligations, alerts, and payment schedules. 6-stage deal pipeline, smart AI chat for portfolio queries, and multi-org RBAC with Supabase RLS.",
    features: [
      "AI extraction of 60+ lease fields from text and scanned PDFs via Gemini 2.5 Pro",
      "Confirm & Activate flow: auto-generates outlets, obligations, alerts, and payment records",
      "6-stage deal pipeline with drag-and-drop Kanban board",
      "Smart AI chat for natural language portfolio queries",
      "Payment generation with escalation support across 4 rent models",
      "Notification routing: Resend (email) + MSG91 (WhatsApp) per alert type"
    ]
  },
  "ai-native-real-estate-fund": {
    id: "ai-native-real-estate-fund",
    title: "AI-Native Real Estate Fund",
    subtitle: "Built for Bethun Bhowmik (ex-Oracle, ex-Amazon, ex-Ola). Discovers distressed properties (foreclosures, tax liens, probate, short sales) and land for data centers, solar farms, and wind farms. 4 AI agents handle scouting, underwriting, outreach, and deal structuring.",
    overview: "4 AI agents powering a Scout, Underwrite, Outreach, Deal Structure pipeline. 13-rule distress detection engine. XGBoost ML scoring (0-100% investment score). Claude underwriting agent generates Buy/Pass/Watch briefs. Claude deal structuring agent selects from a 9-strategy library. 3D Mapbox with Street View popups. Subscription tier gating across SFR, multifamily, commercial, and land.",
    features: [
      "3 parallel data providers: ATTOM (8 API endpoints), RESO MLS (OData client), Probate (signal-based detection)",
      "13-rule distress classification across 2 tiers",
      "XGBoost on Flask for distress scoring (11 features)",
      "Claude agents for underwriting briefs and deal structuring from 9-strategy library",
      "3D Mapbox with Street View popups",
      "Subscription tier gating across SFR, multifamily, commercial, and land"
    ]
  },
  "ai-job-automation": {
    id: "ai-job-automation",
    title: "Captcha-Resilient ATS Agent",
    subtitle: "AI-powered job application automation platform that auto-applies across multiple ATS platforms (Lever, Greenhouse, Workday) with a 5-tier CAPTCHA bypass stack and human behavior simulation.",
    overview: "5-tier CAPTCHA bypass with multi-ATS automation. Stealth Chromium with Chrome runtime spoofing, WebGL/Canvas fingerprint masking, and 150+ anti-detection scripts. Human behavior simulation (random delays, natural mouse movements, typing patterns). ATS-specific adapters for Lever and Greenhouse with form field mapping and resume upload. 2Captcha and Bright Data integration for fallback solving. Browser profile persistence for session reuse.",
    features: [
      "Tier 1: Chromium + stealth + profile reuse (~40%)",
      "Tier 2: Firefox fallback (~30%)",
      "Tier 3: 2Captcha solver at $0.003/solve (~95%)",
      "Tier 4: Bright Data scraping browser at ~$0.10 (~99%)",
      "Tier 5: Manual review (100%)",
      "Abstract base adapter with smart form-filling utilities, error classification, and screenshot capture"
    ]
  }
};
