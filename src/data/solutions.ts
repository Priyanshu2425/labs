// Industry / solution verticals. Each maps to REAL products in `products.ts`
// (by id) and describes only what those products actually do — no invented
// stats, clients, or capabilities. These power /solutions and /solutions/[vertical],
// mirroring the Home "Industries" carousel so the taxonomy stays consistent.

export interface Solution {
  /** URL slug — /solutions/{slug} */
  slug: string;
  /** Short industry name, e.g. "Logistics & Mobility" */
  name: string;
  /** Page H1, e.g. "AI for Logistics & Mobility" */
  h1: string;
  /** One-line summary (used on the index card + OG) */
  lead: string;
  /** Answer-first definition paragraph (hero + Service schema description) */
  intro: string;
  /** What we build here — grounded in the linked products' real features */
  capabilities: string[];
  /** Real product ids in this vertical (keys of productsData) */
  productIds: string[];
  /** <title> (brand suffix added by the layout template) — keep ≤60 chars */
  metaTitle: string;
  /** Meta description — keep ≤160 chars, keyword front-loaded */
  metaDescription: string;
}

export const solutionsData: Solution[] = [
  {
    slug: 'logistics',
    name: 'Logistics & Mobility',
    h1: 'AI for Logistics & Mobility',
    lead: 'Real-time fleet visibility, traffic-aware routing, and mobility discovery — built to run in the field.',
    intro:
      'BuildspaceLabs builds AI and software for logistics and mobility operators: live fleet and driver tracking, dispatch with traffic-aware routing, and real-time location and availability discovery. Our logistics work ships as offline-first, field-ready systems — not dashboards that only work at a desk.',
    capabilities: [
      'Live fleet, driver, and route tracking with real-time status',
      'Traffic-aware routing and dispatch optimization',
      'Real-time availability and location discovery with GPS navigation',
      'Offline-first mobile apps built for drivers in the field',
    ],
    productIds: ['dsv-fleet-management', 'charge-pulse'],
    metaTitle: 'AI for Logistics & Mobility',
    metaDescription:
      'Custom AI for logistics & mobility: live fleet tracking, traffic-aware routing, dispatch, and real-time location discovery. Built field-ready by BuildspaceLabs.',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate & PropTech',
    h1: 'AI for Real Estate & PropTech',
    lead: 'Lease intelligence and AI-native deal sourcing for operators and funds.',
    intro:
      'BuildspaceLabs builds AI for real estate and proptech teams: automated lease data extraction, obligation and portfolio tracking, and AI agents that scout deals, run underwriting, and draft outreach. We turn document-heavy, manual property workflows into systems that surface the number you need.',
    capabilities: [
      'Lease data extraction and clause / obligation tracking',
      'Portfolio intelligence across multi-brand operators',
      'AI deal scouting and underwriting for distressed properties and land',
      'Automated outreach and deal-structuring agents',
    ],
    productIds: ['grospace', 'ai-native-real-estate-fund'],
    metaTitle: 'AI for Real Estate & PropTech',
    metaDescription:
      'Custom AI for real estate & proptech: lease extraction, obligation tracking, portfolio intelligence, and AI deal sourcing & underwriting. By BuildspaceLabs.',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare & MedTech',
    h1: 'AI for Healthcare & MedTech',
    lead: 'Ambient clinical scribes and end-to-end consultation automation.',
    intro:
      'BuildspaceLabs builds AI for healthcare and medtech providers: ambient clinical scribes that write notes from the conversation, end-to-end consultation automation from intake to follow-up, and an AI front desk for scheduling and insurance verification. Built for the realities of clinical workflows and Indian healthcare contexts.',
    capabilities: [
      'Ambient clinical scribe — notes written from doctor–patient conversations',
      'Consultation automation from patient onboarding to follow-up scheduling',
      'AI front desk for intake, scheduling, and insurance verification',
      'Multilingual support for Indian healthcare settings',
    ],
    productIds: ['sanad', 'focuscare', 'patient-front-desk'],
    metaTitle: 'AI for Healthcare & MedTech',
    metaDescription:
      'Custom AI for healthcare & medtech: ambient clinical scribes, consultation automation, and an AI front desk for intake, scheduling & insurance. By BuildspaceLabs.',
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing & Industrial Vision',
    h1: 'AI for Manufacturing & Industrial Vision',
    lead: 'On-premise computer vision and production planning for the factory floor.',
    intro:
      'BuildspaceLabs builds AI for manufacturing and industrial teams: on-premise video analytics for PPE compliance, boundary surveillance, and intrusion detection, plus production planning that replaces spreadsheets with automated milestones and SOP gate enforcement. Our industrial vision runs fully on-premise — no cloud required.',
    capabilities: [
      'On-premise video analytics — PPE compliance, surveillance, intrusion detection',
      'Production planning with automated milestones and SOP gate enforcement',
      'Real-time factory-floor visibility replacing spreadsheet workflows',
      'Edge deployment with no cloud dependency',
    ],
    productIds: ['open-vision-ppe', 'factory-os'],
    metaTitle: 'AI for Manufacturing & Industrial Vision',
    metaDescription:
      'Custom AI for manufacturing: on-premise PPE & intrusion video analytics, and production planning with automated milestones & SOP gates. By BuildspaceLabs.',
  },
  {
    slug: 'fintech',
    name: 'Fintech & Finance Operations',
    h1: 'AI for Fintech & Finance Operations',
    lead: 'Invoice automation, approval routing, and reporting that writes itself.',
    intro:
      'BuildspaceLabs builds AI for finance teams and fintech products: accounts-payable copilots that read invoices and match them to POs, clean approval routing, and investor and financial reporting drafted from live metrics. We automate the document-heavy, exception-prone parts of finance operations.',
    capabilities: [
      'Invoice reading and PO matching with clean approval routing',
      'Exceptions-first workflows that surface only what needs a human',
      'Investor and financial reporting drafted from live metrics',
      'Audit-friendly automation across finance operations',
    ],
    productIds: ['ap-copilot', 'investor-update-drafter'],
    metaTitle: 'AI for Fintech & Finance Operations',
    metaDescription:
      'Custom AI for fintech & finance ops: invoice reading, PO matching, approval routing, and reporting drafted from live metrics. By BuildspaceLabs.',
  },
  {
    slug: 'saas-support',
    name: 'SaaS & Customer Support',
    h1: 'AI for SaaS & Customer Support',
    lead: 'Ticket triage, churn prevention, and revenue-team copilots.',
    intro:
      'BuildspaceLabs builds AI for SaaS and support teams: ticket triage with drafted replies, churn prediction with prescribed save-plays, inbox triage, and call review with rep scorecards. We build the operational AI that revenue and support teams reach for every day.',
    capabilities: [
      'AI ticket triage with drafted replies and SLA protection',
      'Churn prediction with explainable health scores and save-plays',
      'Inbox triage with smart lanes and drafted responses',
      'Sales-call review with flagged moments and rep scorecards',
    ],
    productIds: ['support-pulse', 'churn-radar', 'inbox-zero', 'sales-call-coach'],
    metaTitle: 'AI for SaaS & Customer Support',
    metaDescription:
      'Custom AI for SaaS & support teams: ticket triage, churn prediction & save-plays, inbox triage, and sales-call review. By BuildspaceLabs.',
  },
  {
    slug: 'legal-tech',
    name: 'Legal Teams',
    h1: 'AI for Legal Teams',
    lead: 'Contract review that extracts, scores, and redlines in minutes.',
    intro:
      'BuildspaceLabs builds AI for legal teams: contract review that extracts key terms, scores clause risk, and drafts redlines in minutes. Built for solo lawyers and small firms who need leverage without a large operations team.',
    capabilities: [
      'Contract term extraction across agreements',
      'Clause-level risk scoring',
      'AI-drafted redlines and review',
    ],
    productIds: ['brief-forge'],
    metaTitle: 'AI for Legal Teams',
    metaDescription:
      'Custom AI for legal teams: contract term extraction, clause risk scoring, and AI-drafted redlines in minutes. By BuildspaceLabs.',
  },
];

export const solutionSlugs = solutionsData.map((s) => s.slug);

export function getSolution(slug: string): Solution | undefined {
  return solutionsData.find((s) => s.slug === slug);
}
