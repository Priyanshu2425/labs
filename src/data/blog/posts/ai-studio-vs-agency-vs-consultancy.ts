import type { BlogPost } from '../types';

export const post: BlogPost = {
  slug: 'ai-studio-vs-agency-vs-consultancy',
  title: 'AI product studio vs software agency vs IT consultancy',
  metaTitle: 'AI Studio vs Agency vs IT Consultancy',
  metaDescription:
    'Three very different ways to buy AI software. What each model is genuinely good at, how they bill, where each one fails, and how to pick.',
  excerpt:
    'A studio, an agency, and a consultancy will all quote you for the same AI project — and produce three different things. Here is what each is structurally good at, and the failure mode each one carries.',
  standfirst:
    'A software agency sells execution against a specification, an IT consultancy sells process and risk transfer at enterprise scale, and an AI product studio sells a working product built by one team that owns both the model behaviour and the interface. The right choice depends on whether your specification is trustworthy — and for most AI projects, it is not.',
  category: 'Buying AI',
  publishedAt: '2026-07-25',
  updatedAt: '2026-07-25',
  tags: ['buying AI', 'vendor selection', 'product studio', 'consultancy'],
  keywords: [
    'AI product studio vs agency',
    'AI development company vs consultancy',
    'hire AI development partner',
    'software agency vs product studio',
    'best way to build an AI product',
  ],
  body: [
    {
      type: 'p',
      text: 'The three models are not degrees of the same thing. They are structurally different businesses with different incentives, and the differences show up hardest on AI projects — because AI projects are the ones where the specification you wrote at the start is most likely to be wrong.',
    },
    {
      type: 'h2',
      id: 'the-agency',
      text: 'The software agency',
    },
    {
      type: 'p',
      text: 'An agency takes a defined scope and executes it well. You bring designs or a specification, they bring capacity, and the contract is essentially: build this thing.',
    },
    {
      type: 'p',
      text: 'This is genuinely the right answer when the thing is well understood. A marketing site, a mobile app with known screens, a migration, an integration — an agency will do these faster and cheaper than a studio, because there is no discovery risk to price in.',
    },
    {
      type: 'callout',
      title: 'Where it breaks on AI work',
      text: 'Agencies are structurally incentivised to build what the specification says. On an AI project the honest answer is often "this use case will not work reliably, here is a different one that will" — and that answer costs the agency a change order and an awkward conversation. Most will build the spec instead.',
    },
    {
      type: 'h2',
      id: 'the-consultancy',
      text: 'The IT consultancy',
    },
    {
      type: 'p',
      text: 'A large consultancy sells governance, scale, and risk transfer. You are buying the ability to run a programme across many stakeholders, to satisfy procurement and audit, and to have a name on the contract that a board recognises. For a multi-year core-systems replacement in a regulated enterprise, that is worth real money.',
    },
    {
      type: 'p',
      text: 'The cost is layers. Discovery phases, steering committees, and a delivery team that is typically more junior than the people who sold the work. On a two-year programme that overhead amortises. On a twelve-week AI build it is most of the budget.',
    },
    {
      type: 'h2',
      id: 'the-studio',
      text: 'The product studio',
    },
    {
      type: 'p',
      text: 'A studio takes a problem rather than a specification and returns a working product. The unit of delivery is a thing that runs, and the first one usually arrives before the contract for the full build is signed.',
    },
    {
      type: 'p',
      text: 'The reason this shape suits AI work is that AI decisions resist paper. Whether a model can reliably pull the right fields out of your particular documents is answerable in an afternoon with fifty real documents, and not answerable at all in a discovery deck. Studios front-load that: build the ugly working version, let it kill the bad ideas early.',
    },
    {
      type: 'callout',
      title: 'Where it breaks',
      text: 'Studios are small. If you need forty engineers, twenty-four-hour follow-the-sun support, or a vendor with a global master services agreement already in place, a studio is the wrong tool and will say so. Small teams also carry key-person risk — ask directly how that is handled.',
    },
    {
      type: 'h2',
      id: 'comparison',
      text: 'Side by side',
    },
    {
      type: 'table',
      caption: 'The three models compared on what usually matters',
      head: ['', 'Agency', 'IT consultancy', 'Product studio'],
      rows: [
        ['You bring', 'A specification', 'A business problem and a budget', 'A problem and real data'],
        ['They return', 'The specification, built', 'A programme and a plan', 'A working product'],
        ['Billing shape', 'Fixed scope or time and materials', 'Time and materials, phased', 'Fixed scope per milestone'],
        ['Best at', 'Known, well-defined builds', 'Scale, governance, risk transfer', 'Ambiguous, judgement-heavy products'],
        ['Who you talk to', 'A project manager', 'An engagement lead', 'The people writing the code'],
        ['Typical first deliverable', 'A project plan', 'A discovery document', 'A prototype against your data'],
        ['Failure mode', 'Builds the wrong spec faithfully', 'Overhead exceeds the build', 'Too small for enterprise-scale programmes'],
      ],
    },
    {
      type: 'h2',
      id: 'how-to-choose',
      text: 'A decision rule that actually works',
    },
    {
      type: 'p',
      text: 'Ask one question: how confident am I that the specification is right?',
    },
    {
      type: 'ol',
      items: [
        'Very confident, and the work is large and well understood — use an agency, and hold them to the spec.',
        'Confident, but the programme spans many systems, teams, and compliance regimes — a consultancy earns its overhead here.',
        'Not confident, because the product depends on how well a model handles your actual data — use a studio, and insist the first deliverable is something that runs.',
      ],
    },
    {
      type: 'quote',
      text: 'The more your project depends on how a model behaves against your real data, the less a written specification is worth — and the more you should buy a working thing instead of a plan.',
    },
    {
      type: 'h2',
      id: 'hybrid',
      text: 'The hybrid that often works best',
    },
    {
      type: 'p',
      text: 'These are not mutually exclusive. A pattern we see work well in larger organisations: a studio builds the first working version and the eval harness, proves the use case against real data, and hands a validated, de-risked specification to whoever has the capacity to scale it — an internal platform team or an existing delivery partner.',
    },
    {
      type: 'p',
      text: 'That sequencing gets you the studio\'s discovery speed without asking a ten-person team to run a two-year programme. If you want to see the kind of first deliverable that makes this work, our [services page](/our-services) describes how we scope an initial build, and the [industry pages](/solutions) show the systems that came out of it.',
    },
  ],
  faqs: [
    {
      q: 'What is the difference between an AI product studio and a software agency?',
      a: 'An agency executes a specification you provide; a studio takes an ambiguous problem and returns a working product. On AI projects the specification is often wrong until it is tested against real data, which is why studios front-load a working prototype instead of a plan.',
    },
    {
      q: 'When should I hire an IT consultancy instead of a studio?',
      a: 'When you need scale, governance, and risk transfer — a multi-year programme across many systems, teams, and compliance regimes, where a recognised name on the contract has real value. The consultancy overhead amortises over a long programme but dominates the budget of a twelve-week AI build.',
    },
    {
      q: 'Can I use a studio and an agency together?',
      a: 'Yes, and it is often the strongest option in a larger organisation. A studio builds the first working version and the evaluation harness to prove the use case, then hands a validated specification to an internal platform team or existing delivery partner to scale.',
    },
    {
      q: 'How do product studios usually bill?',
      a: 'Typically as fixed scopes agreed per milestone rather than open-ended time and materials, so the commercial unit matches the delivery unit — a working thing. Ask any prospective partner to define the scope in writing before work starts.',
    },
  ],
  relatedProductIds: ['ap-copilot', 'churn-radar'],
  relatedSolutionSlugs: ['fintech', 'saas-support'],
  relatedPostSlugs: [
    'what-is-an-ai-native-product-studio',
    'choosing-an-ai-development-partner',
    'scoping-an-ai-project',
  ],
};
