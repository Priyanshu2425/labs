import type { BlogPost } from '../types';

export const post: BlogPost = {
  slug: 'ai-agents-in-production',
  title: 'AI agents in production: what actually breaks',
  metaTitle: 'AI Agents in Production: What Breaks',
  metaDescription:
    'Agent demos are easy and agent operations are hard. The failure modes that show up once an agent runs unattended, and the design patterns that contain them.',
  excerpt:
    'An agent that works in a demo and an agent that runs unattended against real systems are different engineering problems. These are the failures that show up in week three.',
  standfirst:
    'AI agents fail in production for structurally predictable reasons: compounding error across multi-step plans, tool calls that succeed technically but wrongly, unbounded loops and cost, missing idempotency on side-effecting actions, and permission models that let the agent act beyond the user it acts for. Each has a known containment pattern.',
  category: 'Engineering',
  publishedAt: '2026-07-25',
  updatedAt: '2026-07-25',
  tags: ['AI agents', 'engineering', 'production', 'reliability'],
  keywords: [
    'AI agents in production',
    'why AI agents fail',
    'agentic workflow reliability',
    'LLM agent architecture',
    'production AI agent design',
  ],
  body: [
    {
      type: 'p',
      text: 'Building an agent that completes a task in a demo takes an afternoon. Building one that completes the same task ten thousand times unattended, against systems that occasionally return nonsense, without doing anything expensive or irreversible when it misunderstands, is a different job.',
    },
    {
      type: 'p',
      text: 'The failure modes are consistent enough to enumerate.',
    },
    {
      type: 'h2',
      id: 'compounding-error',
      text: '1. Error compounds across steps',
    },
    {
      type: 'p',
      text: 'This is the arithmetic that kills most ambitious agent designs. If each step of a plan is independently 95% reliable, a five-step plan is about 77% reliable end to end, and a ten-step plan is about 60%. Reliability that feels excellent per step is unusable per task.',
    },
    {
      type: 'table',
      caption: 'End-to-end reliability by plan length and per-step accuracy',
      head: ['Steps', '90% per step', '95% per step', '99% per step'],
      rows: [
        ['3', '73%', '86%', '97%'],
        ['5', '59%', '77%', '95%'],
        ['10', '35%', '60%', '90%'],
        ['20', '12%', '36%', '82%'],
      ],
    },
    {
      type: 'p',
      text: 'The containment pattern is to shorten the chain rather than to improve the model. Most "20-step agent" designs are better expressed as conventional code that calls a model at the three points where judgement is genuinely required. Deterministic control flow, probabilistic decisions inside it.',
    },
    {
      type: 'quote',
      text: 'Use an agent where the sequence of steps genuinely cannot be known in advance. Everywhere else, write the workflow and let the model make the judgement calls inside it.',
    },
    {
      type: 'h2',
      id: 'wrong-tool-calls',
      text: '2. Tool calls that succeed technically and fail semantically',
    },
    {
      type: 'p',
      text: 'The model calls your search tool with a plausible but wrong query, gets zero results, and confidently concludes the record does not exist. Nothing errored. Every log line is green. The answer is wrong.',
    },
    {
      type: 'p',
      text: 'Containment is mostly tool design rather than prompting:',
    },
    {
      type: 'ul',
      items: [
        'Make tools return informative failures. "No results for query X; 4,182 records exist in this index" is far more recoverable than an empty array.',
        'Constrain arguments with enums and schemas rather than free text wherever the domain allows it.',
        'Prefer fewer, well-named tools. Twenty overlapping tools produce mis-selection; five clear ones do not.',
        'Return the tool result verbatim rather than a summary. Summarising before the model sees it discards exactly the detail it needed.',
      ],
    },
    {
      type: 'h2',
      id: 'loops',
      text: '3. Loops, and the bill that comes with them',
    },
    {
      type: 'p',
      text: 'An agent that cannot complete a task will often keep trying — rephrasing the same failing query, re-reading the same document, oscillating between two approaches. In a demo you notice and stop it. Unattended at 3am it runs until something else stops it.',
    },
    {
      type: 'ol',
      items: [
        'Hard caps on steps, wall-clock time, and spend per task. Not advisory limits — enforced ones.',
        'Loop detection: if the last three tool calls are materially identical, stop and escalate.',
        'A budget that is per-task, not per-tenant, so one pathological input cannot consume the day\'s allowance.',
        'An explicit "I cannot do this" terminal state that is treated as a valid outcome rather than a failure to retry.',
      ],
    },
    {
      type: 'callout',
      title: 'Give the agent a way to give up',
      text: 'Agents without a legitimate escalation path will invent an answer instead, because finishing is more strongly rewarded than declining. Making "hand this to a human, here is what I tried" a first-class outcome measurably reduces confident nonsense.',
    },
    {
      type: 'h2',
      id: 'side-effects',
      text: '4. Side effects without idempotency',
    },
    {
      type: 'p',
      text: 'The moment an agent can write — send an email, create a ticket, post a transaction, update a record — retries stop being free. A timeout that triggers a retry after the action already succeeded produces duplicates, and duplicates in a financial or clinical system are a serious incident rather than a bug.',
    },
    {
      type: 'ul',
      items: [
        'Every write tool takes an idempotency key derived from the task, not generated per attempt.',
        'Separate read tools from write tools explicitly, and make write tools the small, heavily reviewed minority.',
        'Require confirmation for actions that are irreversible or externally visible — sending, publishing, paying, deleting.',
        'Log the intent before the action, not after, so a crash mid-write is diagnosable.',
      ],
    },
    {
      type: 'h2',
      id: 'permissions',
      text: '5. The agent acts with more authority than the user',
    },
    {
      type: 'p',
      text: 'A common and dangerous default: the agent holds a service account with broad access, and acts on behalf of whichever user asked. Now anyone who can talk to the agent can, with sufficiently creative phrasing, reach anything the service account can reach.',
    },
    {
      type: 'p',
      text: 'The fix is to propagate the calling user\'s identity through every tool call and let the underlying systems enforce their own permissions. This is more work and it is not optional. It also means your retrieval layer has to be permission-aware — an index built without access-control filtering will happily surface documents the requester was never entitled to see.',
    },
    {
      type: 'h2',
      id: 'injection',
      text: '6. Untrusted content becomes instructions',
    },
    {
      type: 'p',
      text: 'If an agent reads web pages, emails, tickets, or uploaded documents, that content can contain text addressed to the agent. Treating retrieved content as instruction rather than data is the central security problem of agentic systems, and there is no prompt that fully solves it.',
    },
    {
      type: 'ul',
      items: [
        'Keep the privilege boundary outside the model: an agent that reads untrusted content should not also hold the ability to take consequential actions unattended.',
        'Require human confirmation for consequential actions in any flow that touches external content.',
        'Mark retrieved content clearly as data in the context, and never let it modify the tool set.',
        'Assume containment, not prevention, and design the blast radius accordingly.',
      ],
    },
    {
      type: 'h2',
      id: 'observability',
      text: '7. You cannot see what it did',
    },
    {
      type: 'p',
      text: 'When a user says the agent did something strange last Tuesday, you need the full trace: inputs, retrieved context, each tool call with arguments and results, the model version, and the final output. Without it every complaint is unfalsifiable and every fix is a guess.',
    },
    {
      type: 'p',
      text: 'Trace storage feels expensive until the first incident, at which point it is the only thing that matters. Getting from a working agent to one you can operate is the same gap we describe in [proof of concept to production](/blog/ai-poc-to-production).',
    },
    {
      type: 'h2',
      id: 'summary',
      text: 'The short version',
    },
    {
      type: 'ol',
      items: [
        'Shorten the chain. Deterministic workflow, model judgement at the few points that need it.',
        'Design tools to fail informatively, and keep the set small.',
        'Enforce hard caps on steps, time, and spend; detect loops; allow giving up.',
        'Make every write idempotent and confirm the irreversible ones.',
        'Propagate the user\'s identity; make retrieval permission-aware.',
        'Never let an agent that reads untrusted content also act unattended.',
        'Trace everything.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Why do AI agents fail in production?',
      a: 'Most often because error compounds across steps — five steps at 95% per-step accuracy is only about 77% end to end. Other common causes are tool calls that succeed technically but semantically wrongly, unbounded retry loops, non-idempotent write actions producing duplicates, and permission models that let the agent act beyond the user it acts for.',
    },
    {
      q: 'When should I use an agent instead of a fixed workflow?',
      a: 'Use an agent when the sequence of steps genuinely cannot be known in advance. If the steps are knowable, write them as ordinary deterministic code and call a model only at the points where real judgement is required — that keeps the reliability arithmetic manageable.',
    },
    {
      q: 'How do you stop an AI agent running up cost?',
      a: 'Enforce hard per-task caps on step count, wall-clock time, and spend rather than advisory limits; detect loops by comparing recent tool calls; scope the budget per task so one pathological input cannot exhaust a tenant\'s allowance; and give the agent a legitimate terminal state for giving up and escalating.',
    },
    {
      q: 'What is prompt injection and how do you defend against it?',
      a: 'Prompt injection is when content the agent reads — a web page, email, ticket, or uploaded document — contains text addressed to the agent and is treated as instruction rather than data. There is no prompt that fully prevents it, so the defence is architectural: an agent that reads untrusted content should not also hold the ability to take consequential actions unattended.',
    },
  ],
  relatedProductIds: ['inbox-zero', 'reply-rail'],
  relatedSolutionSlugs: ['saas-support', 'legal-tech'],
  relatedPostSlugs: [
    'llm-evaluation-in-practice',
    'ai-poc-to-production',
    'rag-vs-fine-tuning',
  ],
};
