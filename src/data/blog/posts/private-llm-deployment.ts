import type { BlogPost } from '../types';

export const post: BlogPost = {
  slug: 'private-llm-deployment',
  title: 'Private and on-premises LLM deployment for regulated industries',
  metaTitle: 'Private & On-Prem LLM Deployment',
  metaDescription:
    'Four deployment models for LLMs under data-residency and privacy constraints, what each actually guarantees, and how to pick without over-engineering.',
  excerpt:
    'Not every compliance requirement means self-hosting a model. Here are the four real options, ordered by cost and control, and how to work out which one your constraint actually demands.',
  standfirst:
    'There are four practical deployment models for LLMs under regulatory constraint — a vendor API with contractual controls, a model hosted inside your own cloud tenancy, an open-weights model self-hosted on infrastructure you control, and a fully air-gapped deployment. Each costs materially more than the last, so the decision should be driven by the specific obligation, not by a general instinct toward control.',
  category: 'Engineering',
  publishedAt: '2026-07-25',
  updatedAt: '2026-07-25',
  tags: ['compliance', 'on-premises', 'security', 'architecture'],
  keywords: [
    'private LLM deployment',
    'on-premise LLM',
    'self-hosted LLM enterprise',
    'LLM data residency',
    'HIPAA GDPR LLM deployment',
  ],
  body: [
    {
      type: 'p',
      text: 'The conversation usually opens with "our data cannot leave our environment", and that sentence turns out to mean four different things depending on who said it. Before choosing an architecture, it is worth finding out which one you are actually bound by — the cost difference between the options is very large.',
    },
    {
      type: 'h2',
      id: 'the-question',
      text: 'First, establish what the obligation actually is',
    },
    {
      type: 'ol',
      items: [
        'Is it a legal or regulatory requirement, a contractual commitment to a customer, or an internal policy? All three are real, but only the first is genuinely immovable.',
        'Does it constrain where data is processed, where it is stored, or both? Processing and residency are different obligations with different solutions.',
        'Does it concern the data itself, or the risk that it trains a third-party model? Those are separable, and the second is usually addressed contractually.',
        'Does it apply to all your data, or one classification of it? Segmenting is often far cheaper than lifting the strictest requirement over everything.',
      ],
    },
    {
      type: 'callout',
      title: 'The most common finding',
      text: 'Frequently the actual obligation is "no third party may train on this data and it must remain in a named jurisdiction" — which a vendor API with the right contract and region selection already satisfies. Self-hosting to meet a requirement you do not have is an expensive way to feel safe.',
    },
    {
      type: 'h2',
      id: 'option-one',
      text: 'Option 1 — Vendor API with contractual and regional controls',
    },
    {
      type: 'p',
      text: 'Standard commercial API access, with an enterprise agreement covering non-training, retention limits, and processing region, plus a data processing addendum.',
    },
    {
      type: 'ul',
      items: [
        'Gives you: the strongest available models, no infrastructure, immediate access to upgrades.',
        'Does not give you: data that never leaves your perimeter, or independence from a vendor\'s availability and pricing.',
        'Suits: the large majority of enterprise use cases, including many with meaningful regulatory exposure.',
      ],
    },
    {
      type: 'p',
      text: 'Get the specific contractual terms in writing — zero-retention or defined-retention, no-training, and the processing region — rather than accepting a marketing page as assurance. If a regulator asks, the clause is the artefact.',
    },
    {
      type: 'h2',
      id: 'option-two',
      text: 'Option 2 — Managed model inside your own cloud tenancy',
    },
    {
      type: 'p',
      text: 'The major clouds offer first-party and third-party models running within your own account and region. Requests do not traverse the model vendor\'s infrastructure; they stay inside a boundary you already have compliance coverage for.',
    },
    {
      type: 'ul',
      items: [
        'Gives you: data staying within an existing audited perimeter, familiar identity and network controls, one fewer vendor in the data path.',
        'Costs you: a somewhat narrower model selection and a lag behind frontier releases.',
        'Suits: organisations with an established cloud compliance posture and a residency requirement.',
      ],
    },
    {
      type: 'p',
      text: 'This is the most under-used option, and for a lot of regulated buyers it is the right answer — it resolves the residency question without taking on the operational burden of running inference yourself.',
    },
    {
      type: 'h2',
      id: 'option-three',
      text: 'Option 3 — Open-weights model, self-hosted',
    },
    {
      type: 'p',
      text: 'You run an open-weights model on infrastructure you control, in your data centre or your cloud account. Complete control over the data path, and complete ownership of the operational problem.',
    },
    {
      type: 'ul',
      items: [
        'Gives you: full control, no per-token cost, model version stability, and the ability to fine-tune freely on sensitive data.',
        'Costs you: GPU capacity planning, inference serving, upgrades, evaluation of each model change, and the people who can do all of that.',
        'Suits: a hard prohibition on external processing, or high sustained volume where per-token pricing has become the dominant cost.',
      ],
    },
    {
      type: 'p',
      text: 'Two things consistently surprise teams here. First, the recurring engineering cost usually exceeds the inference cost saved unless volume is genuinely high. Second, capable open-weights models have narrowed the quality gap considerably for well-scoped tasks — which makes this option much more viable than it was, provided the task is narrow.',
    },
    {
      type: 'h2',
      id: 'option-four',
      text: 'Option 4 — Air-gapped',
    },
    {
      type: 'p',
      text: 'No external network path at all. Models, dependencies, and updates arrive through a controlled physical or one-way process.',
    },
    {
      type: 'p',
      text: 'This is genuinely necessary in a small number of environments and genuinely miserable everywhere else. Everything you take for granted — pulling a package, checking a hosted dashboard, calling an external API for enrichment — has to be rebuilt or removed. If you are considering it, be certain the obligation demands it rather than that it sounds maximally safe.',
    },
    {
      type: 'h2',
      id: 'comparison',
      text: 'Comparing the four',
    },
    {
      type: 'table',
      caption: 'Deployment models by control, cost, and fit',
      head: ['Model', 'Data leaves your perimeter', 'Ops burden', 'Model quality ceiling'],
      rows: [
        ['Vendor API + contract', 'Yes, contractually constrained', 'Minimal', 'Highest'],
        ['Your cloud tenancy', 'No', 'Low', 'High, slightly behind frontier'],
        ['Self-hosted open weights', 'No', 'High', 'Good on narrow tasks'],
        ['Air-gapped', 'No', 'Very high', 'Good on narrow tasks'],
      ],
    },
    {
      type: 'quote',
      text: 'Pick the least controlled option that satisfies the obligation you can actually cite. Every step up the ladder costs real money and buys nothing if the requirement did not demand it.',
    },
    {
      type: 'h2',
      id: 'orthogonal',
      text: 'Things you need regardless of which you choose',
    },
    {
      type: 'p',
      text: 'The deployment model is only one part of a defensible design. These apply in all four cases:',
    },
    {
      type: 'ul',
      items: [
        'Permission-aware retrieval. An index without access-control filtering will surface documents the requesting user was never entitled to see — that is a data breach regardless of where the model runs.',
        'Redaction before the call where it is feasible. The safest data is the data you did not send.',
        'Full audit logging: who asked, what was retrieved, what was returned, which model version answered.',
        'Retention policy for prompts, outputs, and traces — these accumulate sensitive data quickly and are routinely forgotten in the data map.',
        'A documented human review path for consequential output, with an accountable owner.',
      ],
    },
    {
      type: 'p',
      text: 'In practice the permission-aware retrieval point causes more compliance findings than the deployment model does. It is worth resolving first. It is also one of the questions we suggest putting to any prospective partner in our [checklist for choosing an AI development partner](/blog/choosing-an-ai-development-partner).',
    },
  ],
  faqs: [
    {
      q: 'Do we need to self-host an LLM to be compliant?',
      a: 'Usually not. Most obligations reduce to "no third party may train on this data and it must be processed in a named jurisdiction", which a vendor API with the right enterprise contract and region selection already satisfies. Establish whether the constraint is legal, contractual, or internal policy before choosing an architecture.',
    },
    {
      q: 'What are the options for private LLM deployment?',
      a: 'Four, in ascending order of control and cost: a vendor API with contractual non-training and residency terms; a managed model running inside your own cloud tenancy; an open-weights model self-hosted on infrastructure you control; and a fully air-gapped deployment with no external network path.',
    },
    {
      q: 'Is running an open-weights model cheaper than a vendor API?',
      a: 'Only at genuinely high sustained volume. You remove per-token cost but take on GPU capacity planning, inference serving, upgrades, and re-evaluation on every model change. For most workloads the recurring engineering cost exceeds the inference cost saved.',
    },
    {
      q: 'What is permission-aware retrieval and why does it matter?',
      a: 'It means the retrieval layer filters candidate documents by what the requesting user is entitled to see, before anything reaches the model. Without it, an index built over an entire corpus will surface restricted documents to any user who asks the right question — a data breach regardless of where the model itself runs.',
    },
  ],
  relatedProductIds: ['ask-vault', 'prior-pilot'],
  relatedSolutionSlugs: ['healthcare', 'fintech'],
  relatedPostSlugs: [
    'rag-vs-fine-tuning',
    'choosing-an-ai-development-partner',
    'ai-for-healthcare-operations',
  ],
};
