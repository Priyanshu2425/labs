// Industry / solution verticals. Each maps to REAL products in `products.ts`
// (by id) and describes only what those products actually do — no invented
// stats, clients, or capabilities. These power /solutions and /solutions/[vertical],
// mirroring the Home "Industries" carousel so the taxonomy stays consistent.
//
// These pages earn their keep vs the homepage carousel by carrying vertical-only
// content the carousel/portfolio don't: buyer `problems` + a per-industry `faqs`
// block (rendered in SSR + emitted as FAQPage schema for AEO/PAA).

export interface Solution {
  /** URL slug — /solutions/{slug} */
  slug: string;
  /** Industry cover image (real asset in public/media/industry-*.webp) */
  image: string;
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
  /** Buyer pain-points this vertical's products address (buyer-intent content) */
  problems: string[];
  /** Vertical FAQ — answer-first, grounded in real products. SSR + FAQPage schema. */
  faqs: { q: string; a: string }[];
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
    image: '/media/industry-logistics.webp',
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
    problems: [
      'Dispatchers plan against a snapshot from an hour ago, not where vehicles actually are',
      'Routing ignores live traffic, so ETAs slip and fuel is wasted',
      'Driver apps stop working the moment the signal drops',
      'Availability data is stale by the time a driver arrives',
    ],
    faqs: [
      {
        q: 'How does AI help a logistics operation?',
        a: 'It turns live vehicle, driver, and route data into decisions — real-time tracking, traffic-aware routing, and dispatch — so planners act on what is happening now, not an hour-old snapshot. BuildspaceLabs has shipped fleet tracking, dispatch, and EV-charging discovery systems built to run in the field.',
      },
      {
        q: 'Can it work without a constant internet connection?',
        a: 'Yes. We build offline-first mobile apps for drivers, so tracking and workflows keep working through dead zones and sync automatically when the connection returns.',
      },
      {
        q: 'What logistics products have you built?',
        a: 'A real-time fleet tracking and dispatch platform for a logistics operator, and Charge Pulse — an EV charging finder with live availability and traffic-aware routing.',
      },
    ],
    productIds: ['dsv-fleet-management', 'charge-pulse'],
    metaTitle: 'AI for Logistics & Mobility',
    metaDescription:
      'Custom AI for logistics & mobility: live fleet tracking, traffic-aware routing, dispatch, and real-time location discovery. Built field-ready by BuildspaceLabs.',
  },
  {
    slug: 'real-estate',
    image: '/media/industry-realestate.webp',
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
    problems: [
      'Lease terms and obligations are buried in PDFs no one has time to read',
      'Missed renewal and obligation dates cost money and trust',
      'Portfolio data lives in scattered spreadsheets with no single view',
      'Deal sourcing and underwriting are manual, so good deals are slow or missed',
    ],
    faqs: [
      {
        q: 'How does AI help real estate and proptech teams?',
        a: 'It reads the documents and runs the analysis people do not have time for — extracting lease terms, tracking obligations, and scouting or underwriting deals. BuildspaceLabs has built lease-management and AI deal-sourcing systems for operators and a fund.',
      },
      {
        q: 'Can AI extract terms from existing leases?',
        a: 'Yes — our lease-management work automates data extraction, obligation tracking, and portfolio intelligence across multi-brand operators, so key dates and terms stop hiding in PDFs.',
      },
      {
        q: 'What real estate products have you built?',
        a: 'AI Lease Management for a multi-brand operator, and an AI-native real estate fund where agents handle deal scouting, underwriting, outreach, and structuring.',
      },
    ],
    productIds: ['grospace', 'ai-native-real-estate-fund'],
    metaTitle: 'AI for Real Estate & PropTech',
    metaDescription:
      'Custom AI for real estate & proptech: lease extraction, obligation tracking, portfolio intelligence, and AI deal sourcing & underwriting. By BuildspaceLabs.',
  },
  {
    slug: 'healthcare',
    image: '/media/industry-healthcare.webp',
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
    problems: [
      'Clinicians lose hours to documentation instead of patients',
      'Front-desk work — intake, scheduling, insurance — eats staff time and creates errors',
      'Follow-ups slip through the cracks between visits',
      'Notes and records are inconsistent across a busy clinic',
    ],
    faqs: [
      {
        q: 'How does AI help a clinic or hospital?',
        a: 'It removes the documentation and front-desk load: ambient scribes write notes from the conversation, and an AI front desk handles intake, scheduling, and insurance verification. BuildspaceLabs has shipped clinical-notes, consultation-automation, and front-desk systems.',
      },
      {
        q: 'Does the AI scribe write clinical notes automatically?',
        a: 'Yes — our AI Clinical Notes product listens to the doctor–patient conversation and drafts the clinical note, so the clinician reviews and signs off instead of typing from scratch.',
      },
      {
        q: 'Do you support Indian healthcare settings?',
        a: 'Yes — our healthcare work is built for Indian clinical contexts, including multilingual support, rather than assuming a US-only workflow.',
      },
    ],
    productIds: ['sanad', 'focuscare', 'patient-front-desk'],
    metaTitle: 'AI for Healthcare & MedTech',
    metaDescription:
      'Custom AI for healthcare & medtech: ambient clinical scribes, consultation automation, and an AI front desk for intake, scheduling & insurance. By BuildspaceLabs.',
  },
  {
    slug: 'manufacturing',
    image: '/media/industry-hardware.webp',
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
    problems: [
      'Safety and PPE compliance depend on someone watching camera feeds all day',
      'Production planning lives in spreadsheets that go stale the moment they are saved',
      'Cloud video is a non-starter on a secure factory floor',
      'No real-time view of whether the floor is on-plan',
    ],
    faqs: [
      {
        q: 'How does AI help on a factory floor?',
        a: 'Computer vision watches for PPE compliance and boundary/intrusion events in real time, and production planning replaces spreadsheets with automated milestones and SOP gates. BuildspaceLabs has shipped both — and the vision runs fully on-premise.',
      },
      {
        q: 'Does the video analytics run on-premise?',
        a: 'Yes — our Open Vision PPE system runs fully on-premise with no cloud dependency, which matters for secure industrial sites and factory floors.',
      },
      {
        q: 'What manufacturing products have you built?',
        a: 'Open Vision PPE for on-premise safety and vision, and Factory OS for production planning, automated milestones, and SOP-gate enforcement.',
      },
    ],
    productIds: ['open-vision-ppe', 'factory-os'],
    metaTitle: 'AI for Manufacturing & Industrial Vision',
    metaDescription:
      'Custom AI for manufacturing: on-premise PPE & intrusion video analytics, and production planning with automated milestones & SOP gates. By BuildspaceLabs.',
  },
  {
    slug: 'fintech',
    image: '/media/industry-fintech.webp',
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
    problems: [
      'AP teams key invoices by hand and chase approvals over email',
      'Exceptions hide in the pile, so errors and late payments slip through',
      'Investor and financial reporting is a manual monthly scramble',
      'No clean audit trail across the approval flow',
    ],
    faqs: [
      {
        q: 'How does AI help a finance team?',
        a: 'It reads invoices, matches them to POs, routes clean approvals, and surfaces only the exceptions that need a human — plus drafts investor and financial reporting from live metrics. BuildspaceLabs has shipped an AP copilot and an investor-update drafter.',
      },
      {
        q: 'Can it handle invoice-to-PO matching?',
        a: 'Yes — AP Copilot reads invoices, matches them to purchase orders, and routes the clean ones for approval, leaving humans to handle only the exceptions.',
      },
      {
        q: 'What fintech products have you built?',
        a: 'AP Copilot for accounts-payable automation, and an Investor Update Drafter that generates monthly investor updates from live metrics.',
      },
    ],
    productIds: ['ap-copilot', 'investor-update-drafter'],
    metaTitle: 'AI for Fintech & Finance Operations',
    metaDescription:
      'Custom AI for fintech & finance ops: invoice reading, PO matching, approval routing, and reporting drafted from live metrics. By BuildspaceLabs.',
  },
  {
    slug: 'saas-support',
    image: '/media/industry-saas.webp',
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
    problems: [
      'Support queues bury the tickets that actually need a human',
      'Churn shows up in a dashboard after the account is already gone',
      'Reps get no real coaching because no one can review every call',
      'Inbox overload means the important message waits behind noise',
    ],
    faqs: [
      {
        q: 'How does AI help a SaaS or support team?',
        a: 'It triages tickets and drafts replies, predicts churn early with prescribed save-plays, triages inboxes, and reviews sales calls with rep scorecards. BuildspaceLabs has shipped a product for each of these.',
      },
      {
        q: 'Can it predict churn before it happens?',
        a: 'Yes — Churn Radar scores every account, attributes the risk to specific behavioural signals, and prescribes a prioritized save-play, so CS teams can act weeks before the churn.',
      },
      {
        q: 'What SaaS products have you built?',
        a: 'Support Pulse (ticket triage), Churn Radar (churn prediction), Inbox Zero (inbox triage), and Sales Call Coach (call review and rep scorecards).',
      },
    ],
    productIds: ['support-pulse', 'churn-radar', 'inbox-zero', 'sales-call-coach'],
    metaTitle: 'AI for SaaS & Customer Support',
    metaDescription:
      'Custom AI for SaaS & support teams: ticket triage, churn prediction & save-plays, inbox triage, and sales-call review. By BuildspaceLabs.',
  },
  {
    slug: 'legal-tech',
    image: '/media/industry-legal.webp',
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
    problems: [
      'Contract review is slow, manual, and hard to staff at a small firm',
      'Risky clauses are easy to miss under time pressure',
      'Redlining from scratch every time burns billable hours',
    ],
    faqs: [
      {
        q: 'How does AI help a legal team?',
        a: 'It reads contracts, extracts key terms, scores clause risk, and drafts redlines in minutes — leverage for solo lawyers and small firms without a large ops team. BuildspaceLabs built Brief Forge to do exactly this.',
      },
      {
        q: 'Does it review contracts automatically?',
        a: 'Yes — Brief Forge extracts, scores, and redlines contracts, so the first-pass review takes minutes instead of hours.',
      },
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
