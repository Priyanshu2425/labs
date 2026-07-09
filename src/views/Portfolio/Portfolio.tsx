'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Activity, ExternalLink, ArrowUpRight } from 'lucide-react';
import styles from './Portfolio.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { landingUrlFor } from '../../data/products';

interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  description: string;
  categories: string[];
  status: 'live' | 'prototype';
  metrics: { label: string; value: string }[];
  tags: string[];
  link: string;
  external?: boolean;
  filterCategory: string;
  accent: string;
  coverImage?: string;
  coverAlt?: string;
  coverCaption?: string;
}

const projects: PortfolioProject[] = [
  {
    id: "churn-radar",
    title: "Churn Radar",
    client: "B2B SaaS scale-up (NDA)",
    description: "An AI customer-success platform that flags at-risk B2B accounts before they churn and prescribes the save-play to run.",
    categories: ["Customer Success", "Predictive Analytics"],
    status: "live" as const,
    metrics: [{ label: "Accounts monitored", value: "238" }, { label: "Net revenue retention", value: "112%" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/churn-radar",
    filterCategory: "AI Builds",
    accent: "#0e9f6e",
    coverImage: "/projects/churn-radar/dashboard.webp",
    coverAlt: "Churn Radar Account Health dashboard showing a net revenue retention line chart, a colour-coded at-risk accounts table, and top risk drivers",
    coverCaption: "Account Health board — NRR, at-risk accounts, save-plays"
  },
  {
    id: "shortlist",
    title: "ShortList",
    client: "High-growth startup (NDA)",
    description: "An AI recruiting screener that reads every application, scores candidates against the role, and hands recruiters a ranked shortlist with outreach already drafted.",
    categories: ["HR & Recruiting", "AI Product"],
    status: "live" as const,
    metrics: [{ label: "Applicants auto-screened", value: "342" }, { label: "Avg. time to screen one candidate", value: "41s" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/shortlist",
    filterCategory: "AI Builds",
    accent: "#6d5efc",
    coverImage: "/projects/shortlist/dashboard.webp",
    coverAlt: "ShortList recruiting pipeline dashboard showing funnel stat tiles, a match-score distribution chart, and a ranked candidates table for a Senior Backend Engineer role",
    coverCaption: "342 applicants auto-screened into a ranked shortlist"
  },
  {
    id: "ap-copilot",
    title: "AP Copilot",
    client: "Mid-market finance team (NDA)",
    description: "An AI accounts-payable copilot that reads invoices, matches them to POs, and routes clean approvals",
    categories: ["Fintech", "Finance Operations"],
    status: "live" as const,
    metrics: [{ label: "Invoices auto-matched to PO", value: "82%" }, { label: "Avg field extraction confidence", value: "98%" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/ap-copilot",
    filterCategory: "AI Builds",
    accent: "#2563eb",
    coverImage: "/projects/ap-copilot/dashboard.webp",
    coverAlt: "AP Copilot invoice inbox dashboard showing KPI tiles, a spend-by-category bar chart and an exceptions queue in a light SaaS interface",
    coverCaption: "Invoice inbox — auto-matched to PO, exceptions surfaced"
  },
  {
    id: "investor-update-drafter",
    title: "Investor Update Drafter",
    client: "Venture-backed startup (NDA)",
    description: "Pulls live metrics from your stack and drafts a ready-to-send investor update every month. Toggle tone, pick sections, send to your LP list — the average update goes out in under two minutes.",
    categories: ["Founder Tools"],
    status: "live" as const,
    metrics: [{ label: "Drafted in", value: "<2 min" }, { label: "LPs", value: "12+" }],
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "/product/investor-update-drafter",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/investor-update-drafter/dashboard.png",
    coverAlt: "Drafted update with tone toggles in the right rail",
    coverCaption: "Concise, detailed, punchy, vulnerable — pick a tone"
  },
  {
    id: "sales-call-coach",
    title: "Sales Call Coach",
    client: "B2B SaaS revenue team (NDA)",
    description: "Records every sales call, transcribes it, and flags the moments that matter — discovery questions that landed, objections raised, talk-ratio drift. Reps get scorecards and 5 coaching clips per week so improvement is measurable.",
    categories: ["Sales AI"],
    status: "live" as const,
    metrics: [{ label: "Annotations / call", value: "11" }, { label: "Calls", value: "16+" }],
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "/product/sales-call-coach",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/sales-call-coach/dashboard.png",
    coverAlt: "Rep scorecard with 12-week trend lines for talk ratio and discovery questions",
    coverCaption: "Scorecards with 12-week trends per rep"
  },
  {
    id: "inbox-zero",
    title: "Inbox Zero",
    client: "Productivity SaaS team (NDA)",
    description: "AI email triage that sorts every incoming message into one of five lanes and drafts a tone-matched reply for the ones you'll actually send. A daily debrief shows what got handled, what needs your eye, and how the week is trending.",
    categories: ["Productivity AI"],
    status: "live" as const,
    metrics: [{ label: "Load", value: "~22 min" }, { label: "Auto-handled", value: "6/day" }],
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "/product/inbox-zero",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/inbox-zero/dashboard.png",
    coverAlt: "Daily debrief with sent/received/drafted trends and auto-handled list",
    coverCaption: "Daily debrief — what got handled, what needs your eye"
  },
  {
    id: "support-pulse",
    title: "Support Pulse",
    client: "B2B SaaS support team (NDA)",
    description: "Classifies every incoming ticket into AI urgency lanes and drafts a cited reply in your team's tone. Per-agent scorecards surface drift in CSAT, response time, or escalation rate before SLAs slip.",
    categories: ["SaaS Tools"],
    status: "live" as const,
    metrics: [{ label: "Tickets triaged", value: "28+" }, { label: "Tone presets", value: "3" }],
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "/product/support-pulse",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/support-pulse/dashboard.png",
    coverAlt: "Per-agent scorecard with 12-week trend lines for response time and CSAT",
    coverCaption: "Scorecards with 12-week trends per agent"
  },
  {
    id: "brief-forge",
    title: "Brief Forge",
    client: "Boutique law firm (NDA)",
    description: "Drop in a contract; the AI extracts 14+ structured fields, scores every clause for risk versus market standard, and proposes redlines with rationale. A 4-hour review becomes a 30-minute one.",
    categories: ["Legal Tech"],
    status: "live" as const,
    metrics: [{ label: "Fields extracted", value: "14+" }, { label: "Redlines", value: "12+" }],
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "/product/brief-forge",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/brief-forge/dashboard.png",
    coverAlt: "Clause-by-clause risk grid with red/amber/green badges and market comparison",
    coverCaption: "Every clause scored — high risk, market, or favorable"
  },
  {
    id: "patient-front-desk",
    title: "Patient Front Desk",
    client: "Multi-clinic healthcare group (NDA)",
    description: "Pre-fills patient intake forms from prior charts and insurance databases, suggests scheduling slots by visit type, and runs eligibility checks overnight. The front desk handles exceptions instead of paperwork.",
    categories: ["Healthcare AI"],
    status: "live" as const,
    metrics: [{ label: "Appts/day", value: "18+" }, { label: "AI-handled", value: "78%" }],
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "/product/patient-front-desk",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/patient-front-desk/dashboard.png",
    coverAlt: "Calendar view with provider columns and scheduling + insurance verification queues",
    coverCaption: "Calendar + AI-suggested slots, insurance queue, and phone scripts"
  },
  {
    id: "reply-rail",
    title: "Reply Rail",
    client: "Multi-location F&B chain (NDA)",
    description: "Pulls reviews from Google, Yelp, and Facebook into a single queue and drafts a tone-matched reply for every one. Tracks sentiment trends across locations so a small business stays at sub-24h response without writing a word.",
    categories: ["Local Business AI"],
    status: "live" as const,
    metrics: [{ label: "Reviews queued", value: "25+" }, { label: "Locations", value: "6" }],
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "/product/reply-rail",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/reply-rail/dashboard.png",
    coverAlt: "Sentiment dashboard with platform rating cards, themes, and 12-week trends",
    coverCaption: "Sentiment trends across Google, Yelp, and Facebook"
  },
  {
    id: "sanad",
    title: "AI Clinical Notes",
    client: "Private Hospital (NDA)",
    description: "AI medical scribe that listens to consultations and writes structured clinical notes in seconds. Built for busy specialists across multiple languages — currently saving 80% of documentation time per encounter.",
    categories: ["Healthcare AI"],
    status: "live" as const,
    metrics: [{ label: "Doc Time", value: "-80%" }, { label: "Notes", value: "Instant" }],
    tags: ["Python", "Next.js", "OpenAI Whisper"],
    link: "/product/sanad",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/sanad/dashboard.png",
    coverAlt: "Clinical Notes dashboard — Welcome back, Mara",
    coverCaption: "Today view — encounters, drafts, schedule"
  },
  {
    id: "charge-pulse",
    title: "Charge Pulse",
    client: "Leading EV Charging Network",
    description: "Live EV charging station finder with real-time connector availability, voice-guided turn-by-turn navigation, and offline map tiles. Cut customer support tickets by 60% by surfacing the right station before drivers arrive.",
    categories: ["EV", "Logistics"],
    status: "live" as const,
    metrics: [{ label: "Availability", value: "Real-Time" }, { label: "Support Tickets", value: "-60%" }],
    tags: ["Next.js", "React", "Flutter"],
    link: "/product/charge-pulse",
    filterCategory: "Mobile",
    accent: "#3b82f6",
    coverImage: "/projects/charge-pulse/dashboard.png",
    coverAlt: "ChargePulse trip planner with charging stops along the route",
    coverCaption: "Trip planner — charge stops, ETA, and pre-conditioning"
  },
  {
    id: "grospace",
    title: "AI Lease Management",
    client: "GroSpace Global",
    description: "AI lease management for multi-brand retail operators with 50–500+ outlets. Extracts 60+ fields from lease PDFs (text and scanned), tracks every obligation, and answers portfolio questions in natural language.",
    categories: ["Real Estate", "AI Extraction"],
    status: "live" as const,
    metrics: [{ label: "Extracted Fields", value: "60+" }, { label: "API Endpoints", value: "48" }],
    tags: ["Next.js", "FastAPI", "Gemini 2.5 Pro"],
    link: "/product/grospace",
    filterCategory: "Web",
    accent: "#3b82f6",
    coverImage: "/projects/grospace/dashboard.png",
    coverAlt: "Grospace deal Kanban board with 14 deals across 4 stages",
    coverCaption: "Pipeline view — $182M across 14 deals in 4 stages"
  },
  {
    id: "factory-os",
    title: "Factory OS",
    client: "Apparel Manufacturing (Adidas, Nike, Reebok)",
    description: "Production planning that replaced Excel — a dual-track milestone engine, 9 mandatory SOP quality gates, capacity simulation, and Gantt visibility, seeded with 295 real production orders across 9 departments.",
    categories: ["Manufacturing"],
    status: "live" as const,
    metrics: [{ label: "Live Orders", value: "295+" }, { label: "API Endpoints", value: "31+" }],
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    link: "/product/factory-os",
    filterCategory: "Web",
    accent: "#3b82f6",
    coverImage: "/projects/factory-os/dashboard.webp",
    coverAlt: "Factory OS production planning dashboard — milestone Gantt, SOP gates and orders",
    coverCaption: "Milestones, SOP gates and capacity — the spreadsheet, replaced"
  },
  {
    id: "dsv-fleet-management",
    title: "DSV Fleet Management",
    client: "Leading Logistics Operator",
    description: "Real-time fleet tracking and dispatching — a live map with GPS at 15s intervals, geofencing, traffic-aware routing, and a Flutter driver app, plus fleet analytics and maintenance scheduling.",
    categories: ["Logistics"],
    status: "live" as const,
    metrics: [{ label: "GPS Update", value: "15s" }, { label: "Support Tickets", value: "-60%" }],
    tags: ["Next.js", "Flutter", "Firebase"],
    link: "/product/dsv-fleet-management",
    filterCategory: "Mobile",
    accent: "#3b82f6",
    coverImage: "/projects/dsv-fleet-management/dashboard.webp",
    coverAlt: "DSV Fleet live operations dashboard — live map, vehicles and routes",
    coverCaption: "Every vehicle, driver and route — live on one map"
  },
  {
    id: "ai-native-real-estate-fund",
    title: "AI-Native Real Estate Fund",
    client: "Bethun Bhowmik (ex-Oracle, ex-Amazon, ex-Ola)",
    description: "Four AI agents run a Scout → Underwrite → Outreach → Structure pipeline across distressed properties — a 13-rule distress engine, XGBoost scoring, and AI-written Buy/Pass/Watch briefs on a 3D map.",
    categories: ["Real Estate"],
    status: "live" as const,
    metrics: [{ label: "AI Agents", value: "4" }, { label: "Distress Rules", value: "13" }],
    tags: ["Python", "LLM agents", "XGBoost"],
    link: "/product/ai-native-real-estate-fund",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/ai-native-real-estate-fund/dashboard.webp",
    coverAlt: "AI-native real estate fund deal pipeline dashboard",
    coverCaption: "Scout → underwrite → outreach → structure"
  },
  {
    id: "open-vision-ppe",
    title: "Open Vision PPE Monitoring",
    client: "Industrial Safety Client",
    description: "Boundary surveillance, PPE compliance and intrusion detection via real-time video analytics — YOLOv8 + ByteTrack running fully on-premise, with SQLite storage and auto-emailed daily reports. No cloud.",
    categories: ["Safety & Compliance"],
    status: "live" as const,
    metrics: [{ label: "Confidence", value: "50%+" }, { label: "Cloud", value: "None" }],
    tags: ["Python", "YOLOv8", "ByteTrack"],
    link: "/product/open-vision-ppe",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/open-vision-ppe/dashboard.webp",
    coverAlt: "Open Vision PPE safety monitor — live camera feeds and violations",
    coverCaption: "PPE, zones and intrusion — detected on-prem"
  },
  {
    id: "focuscare",
    title: "Focuscare",
    client: "Physiotherapy Clinic",
    description: "End-to-end physiotherapy consultation automation — one-click consult start, real-time Whisper transcription, GPT-4 SOAP notes, and automated follow-up scheduling driven from the treatment plan.",
    categories: ["Healthcare AI"],
    status: "live" as const,
    metrics: [{ label: "Consult start", value: "1-click" }, { label: "Format", value: "SOAP" }],
    tags: ["Python", "OpenAI Whisper", "FastAPI"],
    link: "/product/focuscare",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/focuscare/dashboard.webp",
    coverAlt: "Focuscare clinic dashboard — live transcription turning into a SOAP note",
    coverCaption: "One-click consult → transcript → SOAP notes"
  },
  {
    id: "food-ordering-platform",
    title: "Events Ordering Platform",
    client: "Event Hospitality Client",
    description: "Unified events operations — vendor management, order tracking, payments and automated settlements across 8 modules, with a real-time Firebase dashboard and a full role-based audit trail.",
    categories: ["Marketplace"],
    status: "live" as const,
    metrics: [{ label: "Modules", value: "8" }, { label: "Access Roles", value: "5" }],
    tags: ["React", "Firebase", "Stripe"],
    link: "/product/food-ordering-platform",
    filterCategory: "Web",
    accent: "#3b82f6",
    coverImage: "/projects/food-ordering-platform/dashboard.webp",
    coverAlt: "Events ordering operations dashboard — revenue, orders and settlements",
    coverCaption: "Vendors, orders, payments, settlements — one platform"
  },
  {
    id: "ai-job-automation",
    title: "Captcha-Resilient ATS Agent",
    client: "Internal SaaS Product",
    description: "Auto-applies across Lever, Greenhouse and Workday with a 5-tier CAPTCHA-bypass stack — stealth Chromium, fingerprint masking, and human-behaviour simulation, reaching a 99% effective pass rate.",
    categories: ["HR & Recruiting"],
    status: "live" as const,
    metrics: [{ label: "ATS Platforms", value: "3+" }, { label: "Success Rate", value: "99%" }],
    tags: ["Python", "Playwright", "Chromium"],
    link: "/product/ai-job-automation",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/ai-job-automation/dashboard.webp",
    coverAlt: "ATS automation runs dashboard — success by CAPTCHA tier across ATS platforms",
    coverCaption: "Auto-apply across Lever, Greenhouse, Workday"
  },
  {
    id: "prior-pilot",
    title: "PriorPilot",
    client: "Multi-specialty clinic group (NDA)",
    description: "An AI prior-authorization and denial-management platform that auto-assembles and submits auths, predicts denials before submission, and drafts the appeals to recover revenue.",
    categories: ["Healthcare AI", "Revenue Cycle"],
    status: "live" as const,
    metrics: [{ label: "First-pass approval", value: "88%" }, { label: "Auths in flight", value: "214" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/prior-pilot",
    filterCategory: "AI Builds",
    accent: "#0D9488",
    coverImage: "/projects/prior-pilot/dashboard.webp",
    coverAlt: "PriorPilot Authorization Queue dashboard showing a first-pass approval trend rising to 88%, a status-coded prior-auth requests table, and a rail of top denial reasons and payer performance",
    coverCaption: "Authorization Queue — first-pass approval, denial risk, appeals"
  },
  {
    id: "vital-loop",
    title: "VitalLoop",
    client: "Chronic-care management group (NDA)",
    description: "An AI remote patient monitoring platform that triages home vitals into a prioritized care queue, drafts patient outreach, and tracks billable RPM minutes.",
    categories: ["Healthcare AI", "Remote Monitoring"],
    status: "live" as const,
    metrics: [{ label: "Patients monitored", value: "486" }, { label: "Billable RPM minutes", value: "8,940" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/vital-loop",
    filterCategory: "AI Builds",
    accent: "#e11d48",
    coverImage: "/projects/vital-loop/dashboard.webp",
    coverAlt: "VitalLoop Care Queue dashboard showing a daily readings-volume chart, a risk-tiered patient queue with latest vitals and trend arrows, alert types by trigger, and reading adherence",
    coverCaption: "Care Queue board — readings, alerts, and billable RPM minutes"
  },
  {
    id: "scan-queue",
    title: "ScanQueue",
    client: "Teleradiology provider (NDA)",
    description: "An AI radiology worklist that flags suspected critical findings on incoming CT, MR and X-ray studies and orders every read by acuity and SLA — so the sickest patient is read first, not FIFO.",
    categories: ["Healthcare AI", "Radiology"],
    status: "live" as const,
    metrics: [{ label: "Studies triaged live", value: "137" }, { label: "Avg report turnaround", value: "24 min" }],
    tags: ["Next.js", "React", "FastAPI"],
    link: "/product/scan-queue",
    filterCategory: "AI Builds",
    accent: "#6366F1",
    coverImage: "/projects/scan-queue/dashboard.webp",
    coverAlt: "ScanQueue priority worklist: a queue-depth chart, critical-flag stat tiles, and an acuity-ordered table where intracranial hemorrhage and pulmonary embolism are escalated to the top with SLA countdowns",
    coverCaption: "Priority worklist — acuity-ordered reads, critical flags, SLA countdowns"
  },
  {
    id: "stow-pilot",
    title: "StowPilot",
    client: "3PL fulfillment operator (NDA)",
    description: "An AI warehouse slotting and pick-path platform that re-slots SKUs by velocity, plans pick waves, and routes pickers on the shortest path — cutting walk distance per pick.",
    categories: ["Logistics", "Warehouse Ops"],
    status: "live" as const,
    metrics: [{ label: "Avg walk / pick", value: "88 ft" }, { label: "Pick rate", value: "214 lines/hr" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/stow-pilot",
    filterCategory: "AI Builds",
    accent: "#D97706",
    coverImage: "/projects/stow-pilot/dashboard.webp",
    coverAlt: "StowPilot Warehouse Control dashboard showing a walk-distance-per-pick trend falling to 88 ft, a re-slotting recommendations table with A/B/C velocity pills, and a zone-congestion rail",
    coverCaption: "Warehouse Control — walk distance, re-slotting queue, zone congestion"
  },
  {
    id: "haul-board",
    title: "HaulBoard",
    client: "Digital freight brokerage (NDA)",
    description: "An AI freight load board that matches every open load to the best-fit carrier, prices each lane on live spot-rate data, and tracks broker margin on every move.",
    categories: ["Logistics", "Freight"],
    status: "live" as const,
    metrics: [{ label: "Open loads", value: "128" }, { label: "Avg broker margin", value: "14.8%" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/haul-board",
    filterCategory: "AI Builds",
    accent: "#1D4ED8",
    coverImage: "/projects/haul-board/dashboard.webp",
    coverAlt: "HaulBoard Load Board showing open loads with AI spot rates and best-match carriers, a spot-rate trend chart with a market band, and carrier reliability scores",
    coverCaption: "Load Board — open loads, AI spot rates, best-match carriers"
  },
  {
    id: "ship-sight",
    title: "ShipSight",
    client: "Global shipper (NDA)",
    description: "A supply-chain control tower that tracks every shipment across ocean, air and ground, predicts each ETA with a confidence score, and flags at-risk shipments before they slip.",
    categories: ["Logistics", "Supply Chain"],
    status: "live" as const,
    metrics: [{ label: "On-time delivery", value: "87%" }, { label: "Active shipments", value: "3,410" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/ship-sight",
    filterCategory: "AI Builds",
    accent: "#0EA5E9",
    coverImage: "/projects/ship-sight/dashboard.webp",
    coverAlt: "ShipSight Control Tower dashboard showing an on-time delivery trend rising to 87%, a status-coded live shipments table across ocean, air and ground, and an exception-types and mode-mix rail",
    coverCaption: "Control Tower board — on-time, at-risk and predicted ETA"
  },
  {
    id: "dock-queue",
    title: "DockQueue",
    client: "Distribution center operator (NDA)",
    description: "A dock scheduling and yard management platform that lets carriers self-book dock appointments, assigns the right door on arrival, and tracks every trailer's dwell and detention live.",
    categories: ["Logistics", "Yard Management"],
    status: "live" as const,
    metrics: [{ label: "Appointments today", value: "96" }, { label: "Door utilization", value: "82%" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/dock-queue",
    filterCategory: "Web",
    accent: "#0F766E",
    coverImage: "/projects/dock-queue/dashboard.webp",
    coverAlt: "DockQueue dock schedule board showing a dock-door timeline grid for doors D01 to D08, inbound and outbound appointment blocks, an upcoming-appointments table, a yard capacity gauge and an on-time arrival rate",
    coverCaption: "Dock schedule board — door timeline, appointments, yard KPIs"
  },
  {
    id: "tenant-desk",
    title: "TenantDesk",
    client: "Residential property manager (NDA)",
    description: "An AI property-operations platform that triages every maintenance request, tracks rent to the unit, and dispatches the right vendor across a residential portfolio.",
    categories: ["Real Estate", "Property Management"],
    status: "live" as const,
    metrics: [{ label: "Units managed", value: "486" }, { label: "Rent collected", value: "96%" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/tenant-desk",
    filterCategory: "Web",
    accent: "#C2410C",
    coverImage: "/projects/tenant-desk/dashboard.webp",
    coverAlt: "TenantDesk Operations dashboard showing occupancy and rent KPIs, a 12-month rent-collection trend, an AI-triaged maintenance work-order table, and a rent-status rail with upcoming renewals",
    coverCaption: "Operations dashboard — occupancy, rent collection, and an AI-triaged work-order queue"
  },
  {
    id: "loan-forge",
    title: "LoanForge",
    client: "Mortgage lender (NDA)",
    description: "An AI mortgage loan-origination platform that extracts borrower data from documents, auto-clears underwriting conditions, and drives every loan to clear-to-close.",
    categories: ["Real Estate", "Mortgage"],
    status: "live" as const,
    metrics: [{ label: "Loans in pipeline", value: "312" }, { label: "Median time to clear-to-close", value: "14 days" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/loan-forge",
    filterCategory: "AI Builds",
    accent: "#15803D",
    coverImage: "/projects/loan-forge/dashboard.webp",
    coverAlt: "LoanForge Loan Pipeline board showing a cycle-time-to-clear-to-close trend, an active-loans table typed by product with LTV, DTI and stage, and outstanding conditions by category",
    coverCaption: "Loan Pipeline board — cycle-time, active loans, conditions by category"
  },
  {
    id: "rent-iq",
    title: "RentIQ",
    client: "Multifamily operator (NDA)",
    description: "An AI rent & revenue-management platform that recommends the optimal rent for every multifamily unit from demand, comps, seasonality and exposure — and guides each renewal offer.",
    categories: ["Real Estate", "Revenue Management"],
    status: "live" as const,
    metrics: [{ label: "Units priced", value: "1,240" }, { label: "Effective rent", value: "$1,842" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/rent-iq",
    filterCategory: "AI Builds",
    accent: "#7C3AED",
    coverImage: "/projects/rent-iq/dashboard.webp",
    coverAlt: "RentIQ Revenue Management dashboard showing an effective-rent trend line, a unit-pricing table with AI-recommended rents and demand scores, a comp set and renewal recommendations",
    coverCaption: "Revenue Management board — effective rent, unit pricing, comps and renewals"
  },
  {
    id: "ground-up",
    title: "GroundUp",
    client: "General contractor (NDA)",
    description: "A construction project-management command centre for general contractors — schedule gantts, RFIs, budget-vs-actual and critical-path recovery across every active job.",
    categories: ["Real Estate", "Construction"],
    status: "live" as const,
    metrics: [{ label: "Active projects", value: "8" }, { label: "On schedule", value: "6/8" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/ground-up",
    filterCategory: "Web",
    accent: "#F97316",
    coverImage: "/projects/ground-up/dashboard.webp",
    coverAlt: "GroundUp Project Command dashboard showing a phase gantt with a today line, portfolio KPIs, an active-projects table with schedule-status pills, and RFI aging",
    coverCaption: "Project Command — schedule gantt, KPIs, RFI aging"
  },
  {
    id: "field-route",
    title: "FieldRoute",
    client: "HVAC & facilities service company (NDA)",
    description: "An AI field-service platform that auto-dispatches the best-matched technician, optimizes routes, and tracks first-time-fix against every SLA.",
    categories: ["Operations", "Field Service"],
    status: "live" as const,
    metrics: [{ label: "Jobs dispatched daily", value: "142" }, { label: "First-time fix rate", value: "88%" }],
    tags: ["Next.js", "React Native", "TypeScript"],
    link: "/product/field-route",
    filterCategory: "Mobile",
    accent: "#0891B2",
    coverImage: "/projects/field-route/dashboard.webp",
    coverAlt: "FieldRoute Dispatch Board showing first-time-fix and response KPIs, an SLA-sorted job table, and a live city route map with numbered stops",
    coverCaption: "Dispatch Board — jobs, live routes and SLA countdowns"
  },
  {
    id: "pipeline-iq",
    title: "PipelineIQ",
    client: "B2B SaaS sales org (NDA)",
    description: "An AI SDR platform that scores every lead for fit, runs multichannel sequences across email, LinkedIn and call, drafts the replies, and books the meeting.",
    categories: ["Sales AI", "Sales Development"],
    status: "live" as const,
    metrics: [{ label: "Reply rate", value: "11.4%" }, { label: "Meetings booked", value: "38" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/pipeline-iq",
    filterCategory: "AI Builds",
    accent: "#DB2777",
    coverImage: "/projects/pipeline-iq/dashboard.webp",
    coverAlt: "PipelineIQ Outbound board showing an outbound funnel from sent to booked, four KPI tiles, and a table of leads ranked by AI fit score",
    coverCaption: "Outbound board — funnel, fit-scored leads, sequences"
  },
  {
    id: "quote-forge",
    title: "QuoteForge",
    client: "Enterprise sales team (NDA)",
    description: "An AI CPQ and proposal platform that builds enterprise quotes from your catalog, guards every discount against the margin floor, routes approvals, and generates the proposal.",
    categories: ["Sales AI", "CPQ"],
    status: "live" as const,
    metrics: [{ label: "Open quotes", value: "84" }, { label: "Avg. approval time", value: "3.2 hrs" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/quote-forge",
    filterCategory: "AI Builds",
    accent: "#CA8A04",
    coverImage: "/projects/quote-forge/dashboard.webp",
    coverAlt: "QuoteForge Quotes dashboard showing a quoted-vs-won value bar chart, an open-quotes table with margin-health pills, and a discount-vs-guardrail distribution",
    coverCaption: "Quotes dashboard — pipeline KPIs, margin-health pills, discount guardrails"
  },
  {
    id: "notewell",
    title: "Notewell",
    client: "Product & ops team (NDA)",
    description: "An AI meeting assistant that records and transcribes meetings, extracts decisions and action items, assigns owners and due dates, and tracks follow-through.",
    categories: ["Productivity AI", "Meetings"],
    status: "live" as const,
    metrics: [{ label: "Meetings this week", value: "42" }, { label: "Follow-through rate", value: "86%" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/notewell",
    filterCategory: "AI Builds",
    accent: "#4F46E5",
    coverImage: "/projects/notewell/dashboard.webp",
    coverAlt: "Notewell Meetings dashboard showing stat tiles, a meetings-and-action-items trend chart, a meetings table with attendees and follow-through, action items by owner, and a decision log",
    coverCaption: "Meetings dashboard — KPIs, trend chart, follow-through per meeting"
  },
  {
    id: "ask-vault",
    title: "AskVault",
    client: "Scale-up enablement team (NDA)",
    description: "An AI internal knowledge-search platform that answers employee questions from company docs, wikis and tickets — grounded in inline citations, with knowledge gaps surfaced and deflection tracked.",
    categories: ["Productivity AI", "Knowledge"],
    status: "live" as const,
    metrics: [{ label: "Questions answered / mo", value: "1,420" }, { label: "Deflection rate", value: "64%" }],
    tags: ["Next.js", "React", "TypeScript"],
    link: "/product/ask-vault",
    filterCategory: "AI Builds",
    accent: "#9333EA",
    coverImage: "/projects/ask-vault/dashboard.webp",
    coverAlt: "AskVault Knowledge dashboard showing an ask bar with a cited AI answer, questions-and-deflection trend chart, a recent-questions table, and a rail of top sources and knowledge gaps",
    coverCaption: "Knowledge dashboard — cited answers, deflection trend, knowledge gaps"
  },
];

const filters = ['All', 'AI Builds', 'Web', 'Mobile'];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.filterCategory === activeFilter);

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroVisual} aria-hidden="true">
            <Image src="/media/texture-blueprint.webp" alt="" fill priority sizes="100vw" className={styles.heroVisualImg} />
          </div>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className={styles.heroContent}
            >
              <span className={styles.monoLabel}>{'// the work'}</span>
              <h1 className={styles.pageTitle}>
                Real products.<br />
                <span className={styles.gradientText}>Real clients. In production.</span>
              </h1>
              <p className={styles.pageSubtitle}>
                Each entry below was built for a paying customer and is in active use today. Click any card to read the deep-dive — architecture, decisions, what shipped.
              </p>

              <div className={styles.heroMeta}>
                <span className={styles.heroMetaItem}>
                  <span className={styles.heroMetaDot} aria-hidden="true" />
                  {projects.length} shipped
                </span>
                <span className={styles.heroMetaDivider} aria-hidden="true" />
                <span className={styles.heroMetaItem}>
                  Across healthcare, logistics, real estate, sales and ops
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className={`container ${styles.portfolioSection}`}>
          <motion.div
            className={styles.filtersWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filters.map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${activeFilter === f ? styles.active : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
                {f !== 'All' && (
                  <span className={styles.filterCount}>
                    {f === 'All' ? projects.length : projects.filter(p => p.filterCategory === f).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          <motion.div layout className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={styles.card}
                    style={{ '--card-accent': project.accent } as React.CSSProperties}
                  >
                    {/* Stretched link — the whole card opens the case study (or the external live site) */}
                    <Link
                      href={project.link}
                      target={project.external ? '_blank' : undefined}
                      rel={project.external ? 'noopener noreferrer' : undefined}
                      className={styles.cardOverlay}
                      aria-label={project.external ? `${project.title} — visit the live site` : `${project.title} — read the case study`}
                    />
                    {/* Independent link to the product's live landing page */}
                    {!project.external && (
                      <a
                        className={styles.liveBadge}
                        href={landingUrlFor(project.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live site <ArrowUpRight size={13} />
                      </a>
                    )}
                    {project.coverImage && (
                      <div className={styles.cardCover}>
                        <Image
                          src={project.coverImage}
                          alt={project.coverAlt ?? project.title}
                          width={680}
                          height={382}
                          sizes="(max-width: 768px) 100vw, 360px"
                          className={styles.cardCoverImage}
                        />
                        {project.coverCaption && (
                          <span className={styles.cardCoverCaption}>{project.coverCaption}</span>
                        )}
                      </div>
                    )}

                    {/* Card top */}
                    <div className={styles.cardTop}>
                      <div className={styles.categoryRow}>
                        {project.categories.map(c => (
                          <span key={c} className={styles.categoryChip}>{c}</span>
                        ))}
                      </div>
                      <span className={`${styles.statusBadge} ${styles.live}`}>
                        <Activity size={10} className={styles.blink} />
                        Shipped
                      </span>
                    </div>

                    {/* Title */}
                    <div className={styles.titleRow}>
                      <h3 className={styles.title}>{project.title}</h3>
                      <ExternalLink size={18} className={styles.icon} />
                    </div>
                    <p className={styles.client}>{project.client}</p>
                    <p className={styles.description}>{project.description}</p>

                    {/* Metrics */}
                    <div className={styles.metricsRow}>
                      {project.metrics.map((m, i) => (
                        <div key={i} className={styles.metric}>
                          <span className={styles.metricValue} style={{ color: project.accent }}>{m.value}</span>
                          <span className={styles.metricLabel}>{m.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className={styles.tags}>
                      {project.tags.map(t => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
