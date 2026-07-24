import type { BlogPost } from '../types';

export const post: BlogPost = {
  slug: 'ai-for-customer-support',
  title: 'AI for customer support: deflection without wrecking satisfaction',
  metaTitle: 'AI for Customer Support That Works',
  metaDescription:
    'Support AI fails when it is measured on deflection alone. Triage, drafting, and routing beat full automation — here is how to sequence a support AI rollout.',
  excerpt:
    'The fastest way to ruin a support operation is to optimise a bot for deflection. The interventions that actually work start behind the scenes, with the agent rather than the customer.',
  standfirst:
    'Deploy support AI in the order of increasing risk: triage and routing first, then drafted replies an agent edits, then knowledge grounded in your own documentation, and only then customer-facing autonomous resolution on narrow, well-understood intents. Optimising for deflection rate alone reliably degrades both satisfaction and cost.',
  category: 'Industry',
  publishedAt: '2026-07-25',
  updatedAt: '2026-07-25',
  tags: ['customer support', 'SaaS', 'automation', 'industry'],
  keywords: [
    'AI for customer support',
    'AI ticket triage',
    'support automation without hurting CSAT',
    'AI customer service deflection',
    'AI support agent assist',
  ],
  body: [
    {
      type: 'p',
      text: 'Support is the most attempted AI use case in software, and the one with the most visible failures. The reason is usually a metric: teams deploy a customer-facing bot and measure deflection, which rewards not answering the question as much as answering it.',
    },
    {
      type: 'p',
      text: 'A customer who abandons a chat in frustration counts as deflected. So does one who gets a wrong answer and comes back angry two days later — often twice, since the second contact is a new ticket. Deflection alone will make your dashboard improve while your operation gets worse.',
    },
    {
      type: 'quote',
      text: 'Deflection counts the conversations that ended. It does not distinguish between the ones you resolved and the ones you exhausted.',
    },
    {
      type: 'h2',
      id: 'sequence',
      text: 'A rollout order that works',
    },
    {
      type: 'p',
      text: 'Sequence by risk. Each stage earns the trust and the data for the next, and every one of them is useful on its own.',
    },
    {
      type: 'h3',
      id: 'stage-one',
      text: 'Stage 1 — Triage and routing',
    },
    {
      type: 'p',
      text: 'Classify inbound tickets by intent, urgency, sentiment, and the team that should own them. No customer ever sees the output, so a misclassification costs a re-route rather than a bad experience.',
    },
    {
      type: 'p',
      text: 'This is where most of the immediate return sits, because misrouting is quietly expensive: it burns the first-response clock, drags a second agent in, and is a leading cause of breached service levels. [Support Pulse](/product/support-pulse) does this for SaaS support teams — triaging tickets and drafting replies to cut first-response time and stop service-level leaks.',
    },
    {
      type: 'h3',
      id: 'stage-two',
      text: 'Stage 2 — Drafted replies the agent edits',
    },
    {
      type: 'p',
      text: 'The system writes a suggested response; the agent reviews, edits, and sends. The human checkpoint already exists, so nothing reaches a customer unreviewed.',
    },
    {
      type: 'p',
      text: 'This stage produces something valuable beyond the time saved: every edit is a labelled correction. The gap between the draft and what the agent actually sent is the highest-quality evaluation data you will ever get, and it arrives for free. Capture it from day one — it is the backbone of the harness described in [LLM evaluation in practice](/blog/llm-evaluation-in-practice).',
    },
    {
      type: 'callout',
      title: 'Watch the acceptance rate, not the volume',
      text: 'The metric that matters at this stage is what fraction of drafts are sent with minimal editing, segmented by intent. It tells you precisely which categories are ready for more autonomy and which are not — which is exactly the decision stage three requires.',
    },
    {
      type: 'h3',
      id: 'stage-three',
      text: 'Stage 3 — Grounded answers from your own documentation',
    },
    {
      type: 'p',
      text: 'Now let the system answer from your actual knowledge base, with citations, so agents and customers can verify what it said. The critical constraint is grounding: the answer must come from retrieved documentation, and the system must decline when the documentation does not cover the question.',
    },
    {
      type: 'p',
      text: 'A support assistant that will not say "I do not have that documented" is worse than no assistant, because it converts a known gap into a confident wrong answer. Building this well is a retrieval problem more than a generation one — see [RAG vs fine-tuning](/blog/rag-vs-fine-tuning).',
    },
    {
      type: 'h3',
      id: 'stage-four',
      text: 'Stage 4 — Autonomous resolution, narrowly',
    },
    {
      type: 'p',
      text: 'Only now, and only for intents where stage two showed a high acceptance rate, the answer is stable, and the failure is recoverable. Order status, password resets, plan changes, documented how-tos.',
    },
    {
      type: 'ul',
      items: [
        'Start with a small, explicitly enumerated set of intents. Everything else routes to a human, immediately and without a fight.',
        'Make escalation one obvious click, always visible. Hiding it is what generates the worst experiences and the worst reviews.',
        'Pass the full conversation to the agent on escalation. Making a frustrated customer repeat themselves is the single most damaging thing a support bot does.',
        'Track resolution confirmed by the customer, not conversations ended.',
      ],
    },
    {
      type: 'h2',
      id: 'metrics',
      text: 'Measure these instead of deflection',
    },
    {
      type: 'table',
      caption: 'Support AI metrics that reflect reality',
      head: ['Metric', 'What it tells you'],
      rows: [
        ['Draft acceptance rate by intent', 'Which categories are ready for more autonomy'],
        ['Reopen rate within 7 days', 'Whether "resolved" was real'],
        ['Escalation rate after AI contact', 'Whether the first attempt helped or delayed'],
        ['Repeat contacts on the same issue', 'The clearest signal of a wrong answer'],
        ['Satisfaction split: AI-touched vs not', 'The trade you are actually making'],
        ['First response time', 'The metric triage moves fastest'],
      ],
    },
    {
      type: 'h2',
      id: 'adjacent',
      text: 'The adjacent wins people miss',
    },
    {
      type: 'p',
      text: 'Support data is one of the richest unstructured datasets a company has, and most of the value in it is not about answering tickets faster.',
    },
    {
      type: 'ul',
      items: [
        'Clustering tickets by root cause tells product what to fix. This routinely outperforms deflection on cost, because a fixed bug removes the tickets permanently.',
        'Gaps between what customers ask and what your documentation covers form a prioritised content backlog. [AskVault](/product/ask-vault) surfaces exactly these gaps from internal knowledge search.',
        'Support signals are strong churn predictors — sentiment trends, contact frequency, and unresolved escalations. That is the premise behind [Churn Radar](/product/churn-radar), which flags at-risk B2B accounts and prescribes the save play.',
      ],
    },
    {
      type: 'p',
      text: 'More on how we approach this space on the [SaaS and customer support page](/solutions/saas-support).',
    },
  ],
  faqs: [
    {
      q: 'How do I use AI in customer support without hurting satisfaction?',
      a: 'Sequence by risk. Start with triage and routing that no customer sees, then drafted replies an agent edits before sending, then answers grounded in your own documentation with citations, and only then autonomous resolution on a narrow, enumerated set of intents where drafts already show a high acceptance rate.',
    },
    {
      q: 'Why is deflection rate a bad metric for support AI?',
      a: 'Because it counts conversations that ended, not problems that were solved. A customer who abandons a chat in frustration counts as deflected, as does one who receives a wrong answer and returns days later as a new ticket. Track reopen rate, escalation rate after AI contact, repeat contacts, and satisfaction split by whether AI touched the ticket.',
    },
    {
      q: 'What is the best first AI project for a support team?',
      a: 'Ticket triage and routing. No customer sees the output so a misclassification costs a re-route rather than a bad experience, and misrouting is quietly expensive — it burns the first-response clock, pulls in a second agent, and is a leading cause of breached service levels.',
    },
    {
      q: 'How do agent-drafted replies improve the system over time?',
      a: 'Every edit an agent makes is a labelled correction. The difference between the draft and what was actually sent is the highest-quality evaluation data available, and it accumulates automatically as a by-product of normal work. Capture it from the first day.',
    },
  ],
  relatedProductIds: ['support-pulse', 'churn-radar', 'ask-vault', 'reply-rail'],
  relatedSolutionSlugs: ['saas-support'],
  relatedPostSlugs: [
    'llm-evaluation-in-practice',
    'rag-vs-fine-tuning',
    'ai-agents-in-production',
  ],
};
