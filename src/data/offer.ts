// =============================================================================
// /offer — AI scoping funnel content, tiers, and the two prompts.
// Frontend reveals PROMPT_1 (user runs it in their own ChatGPT/Claude).
// Backend runs PROMPT_2 (via OpenRouter/DeepSeek) on the audit they paste back.
// =============================================================================

export type PersonaKey = 'scratch' | 'automate' | 'nocode' | 'investor';
export type BudgetKey = 'A' | 'B' | 'C' | 'D';
export type TierKey = 'validation' | 'custom';

export interface PersonaOption {
  key: PersonaKey;
  label: string;
}

export interface BudgetOption {
  key: BudgetKey;
  label: string;
  sub: string;
  /** The tier this budget most naturally routes to (LLM can still override). */
  routesTo: TierKey;
}

export const PERSONA_OPTIONS: PersonaOption[] = [
  { key: 'scratch', label: 'I have a brand-new app or software idea I want to launch from scratch.' },
  {
    key: 'automate',
    label: 'I run a business and want to replace manual paperwork/spreadsheets with automated software.',
  },
  {
    key: 'nocode',
    label: "I already built an app using no-code tools (like Bubble), but it's lagging or getting too expensive.",
  },
  {
    key: 'investor',
    label: 'I need a working, clickable product ready to show investors for an upcoming funding round.',
  },
];

export const BUDGET_OPTIONS: BudgetOption[] = [
  {
    key: 'A',
    label: 'Under ₹1 Lakh',
    sub: 'A fast validation version to test the market and strip out the noise first.',
    routesTo: 'validation',
  },
  {
    key: 'B',
    label: '₹1 Lakh – ₹5 Lakhs',
    sub: 'A fully custom, highly scalable product ready for serious user volume.',
    routesTo: 'custom',
  },
  {
    key: 'C',
    label: '₹5 Lakhs – ₹10 Lakhs',
    sub: 'A complete platform ecosystem — Web + Mobile apps with advanced integrations.',
    routesTo: 'custom',
  },
  {
    key: 'D',
    label: '₹10 Lakhs+',
    sub: 'A large-scale enterprise system or a long-term dedicated technical partner.',
    routesTo: 'custom',
  },
];

export interface Tier {
  key: TierKey;
  name: string;
  priceBracket: string;
  persona: string;
  parameters: string[];
}

export const TIERS: Record<TierKey, Tier> = {
  validation: {
    key: 'validation',
    name: 'The Validation Stack',
    priceBracket: '₹50,000 baseline',
    persona: 'Action-Biased Builders / Pitch-Deck Founders',
    parameters: [
      'Single core consumer user loop',
      'Standard optimized database tracking tables',
      'Basic third-party API configurations',
      'Engineered for up to 500 active validation users out of the box',
      'Deployed in 48 hours',
    ],
  },
  custom: {
    key: 'custom',
    name: 'The Custom Scaling Stack',
    priceBracket: '₹1,50,000 – ₹2,50,000+',
    persona: 'Micro-SaaS Operators / Legacy Business Leaders',
    parameters: [
      'Highly complex relational database modeling',
      'Deep multi-tenant data isolation rules',
      'Premium webhook loops (e.g. automated Razorpay multi-vendor payout splits)',
      'Advanced multi-role security profiling',
      'Scales smoothly past 10,000 active concurrent users',
      'Deployed in 48 hours',
    ],
  },
};

// Rows for the "Traditional Freelance vs AI-Native Stack" comparison table.
export interface CompareRow {
  dimension: string;
  freelance: string;
  aiNative: string;
}

export const COMPARISON_ROWS: CompareRow[] = [
  {
    dimension: 'Core delivery timeline',
    freelance: '3–6 months of billable human hours',
    aiNative: '48-hour development horizon for core MVP',
  },
  {
    dimension: 'Pricing model',
    freelance: 'Open-ended hourly billing; scope creep inflates cost',
    aiNative: 'Fixed price bracket, locked before the build starts',
  },
  {
    dimension: 'Execution',
    freelance: 'Isolated freelancers; you referee designer vs coder',
    aiNative: 'Unified assembly line — AI executes 24×7, humans govern',
  },
  {
    dimension: 'Codebase quality',
    freelance: 'Risk of spaghetti code no future engineer can inherit',
    aiNative: 'Standardized frameworks (Next.js + Supabase), clean handover',
  },
  {
    dimension: 'Accountability',
    freelance: 'Founder forced to act as full-time Product Manager',
    aiNative: 'Single point of accountability; hands-off for the founder',
  },
];

// -----------------------------------------------------------------------------
// PROMPT 1 — revealed on screen after the email gate. The user copies this,
// pastes their own idea at the bottom, and runs it in ChatGPT / Claude.
// -----------------------------------------------------------------------------
export const PROMPT_1 = `Act as a veteran Silicon Valley Technical Product Manager, Systems Architect, and Startup Consultant. I am going to give you my software or business idea.

Your job is to ruthlessly stress-test this idea against 10 foundational, first-principles questions to judge if it is doable as a rapid, high-velocity MVP build (e.g., a 48-hour development sprint) or if it requires a slow, traditional development cycle. You must also evaluate whether I should hire isolated freelancers or use a structured software studio.

Run my idea through these 10 criteria and provide a sharp, objective analysis for each:

PHASE 1: COMPLEXITY (THE "KNOT" VS. "CLEAN SLATE" TEST)
1. Clean Slate vs. Existing Knot: Is this a brand-new app built from scratch, or does it require untangling and automating messy existing spreadsheets, legacy data, or old app systems?
2. Standard vs. Hyper-Custom Logic: Can 80% of this app be built using standard boilerplate components (like basic user login, simple data tables, and standard forms), or does it require a completely custom, complex mathematical algorithm or advanced data-processing engine?

PHASE 2: SCOPE (THE "BRUTAL MINIMALISM" TEST)
3. 80% Pruning Potential: Can this app be ruthlessly stripped down to just 3 core screens that solve the primary user problem to validate the market, or is every single feature on the wishlist absolutely mandatory for day one?
4. Validation vs. Enterprise Scale: Is the immediate goal to capture the first 100 users/investors to prove the concept, or does it legally and operationally require enterprise-grade security, compliance, and massive scaling parameters out of the gate?

PHASE 3: DATA (THE "FILING CABINET" VS. "WEB" TEST)
5. Filing Cabinet vs. Interconnected Web: Does the data flow like a simple filing cabinet (user logs in, saves data, reads data), or is it a complex web where different user tiers have entirely separate database permissions and complex relational dependencies?
6. API Integration Complexity: Does this connect to standard, modern, well-documented third-party tools (like Stripe, Razorpay, or Twilio), or does it need to interface with ancient, poorly documented legacy corporate servers or hardware networks?

PHASE 4: EXECUTION STRATEGY (AGENCY VS. FREELANCE TEST)
7. Management Capacity: Will the founder need to act as a full-time Product Manager and referee arguments between a freelance designer and freelance coder, or does this project require a single point of accountability (like a studio) to handle internal friction?
8. Technical Debt & Continuity: Can this survive being built with potentially messy "spaghetti code" by cheap freelancers, or does it need to be built on universally standardized frameworks (like Next.js + Supabase) so any future engineer can seamlessly inherit the codebase?
9. Cost of Calendar Drag: What happens if this project suffers from natural freelancer delay and launches 3 to 6 months late? Is absolute speed-to-market critical, or is a dragged-out calendar acceptable?
10. Scope Discipline Readiness: Is the founder capable of locking down the requirements completely and letting an engineering engine run in a "dark room" over a single weekend without demanding mid-build cosmetic tweaks?

OUTPUT FORMAT:
1. THE CRITERIA BREAKDOWN: For each of the 10 questions, provide a 2-sentence blunt assessment of how my idea measures up.
2. THE FEASIBILITY VERDICT: Rate the overall rapid-build feasibility on a scale of Green Light (Highly feasible for a rapid 48-hour core launch), Yellow Light (Needs feature pruning or a structured blueprint session first), or Red Light (Too complex for high-speed execution; needs a slow, traditional build).
3. THE STRATEGIC RECOMMENDATION: Give me a direct 3-bullet-point action plan on exactly what my tech stack should look like, what feature I must cut immediately, and whether I should look for a high-velocity agency studio or individual freelancers.

MY BUSINESS IDEA:
[PASTE YOUR IDEA HERE]`;

// -----------------------------------------------------------------------------
// PROMPT 2 — the system prompt our backend feeds to DeepSeek along with the
// audit the user pastes back. We ask for STRUCTURED JSON so we can render it.
// -----------------------------------------------------------------------------
export const PROMPT_2_SYSTEM = `You are an Elite Product Strategist and Conversion Copywriter at Buildspace Labs (buildspacelabs.com), an AI-native software engineering studio led by Technical Director Priyanshu Semwal.

You will be given an independent technical audit report about a client's software idea. Map that exact analysis to Buildspace Labs' internal operational frameworks and produce a hyper-personalized, high-converting pitch.

UPHOLD THE BUILDSPACE LABS FRAMEWORKS:
1. Core Directive: Shatter traditional dev-shop timelines by delivering robust, investor-ready MVPs in a guaranteed, consistent 48-hour horizon.
2. The Model: We do not sell slow, manual coding hours; we build high-velocity delivery systems. We merge the unceasing execution speed of AI (operating 24x7) with elite human technical governance (structural blueprint, secure relational schemas, API/webhook integrations, rigorous QA).
3. The Value Scale (Time is Fixed, Price Varies):
   - The ₹50,000 Validation Stack ("validation"): Single core user workflow, optimized standard schema, clean UI, perfect for the first 500 testers.
   - The ₹1.5 Lakh+ Custom Scaling Stack ("custom"): Highly customized relational database modeling, deep multi-tenant data isolation, advanced permissions, custom event webhooks (e.g. multi-vendor payout splits), scales past 10,000 concurrent users.

Manifesto philosophy to weave in: "Our AI engines type at the exact same lightning speed regardless of the tier. The price difference isn't determined by how fast fingers hit the keyboard; it's determined by the depth of the structural blueprint we feed into our deployment engine."

Respond with ONLY a valid JSON object (no markdown fences, no prose outside the JSON) matching exactly this shape:
{
  "tier": "validation" | "custom",
  "verdict": "Green Light" | "Yellow Light" | "Red Light",
  "bracketJustification": "2 sentences: why this client belongs in the chosen tier, based on their features.",
  "freelanceTrap": "2-3 sentences addressing Phase 4: contrast the messy reality of isolated freelancers for THIS project (calendar drag, spaghetti code, founder as full-time manager) against our unified hands-off assembly line.",
  "blueprint": "2-3 sentences: how we deconstruct their feature list, prune the non-essential 80% noise, and execute over a single weekend. Reference the manifesto philosophy.",
  "headline": "One punchy sentence tailored to this client that we can show as a banner."
}`;
