import type { BlogPost } from '../types';

export const post: BlogPost = {
  slug: 'scoping-an-ai-project',
  title: 'How to scope an AI project so it actually ships',
  metaTitle: 'How to Scope an AI Project',
  metaDescription:
    'Most AI projects fail at scoping, not engineering. A practical method: pick one decision, define the error budget, find the data, and size the first slice.',
  excerpt:
    'AI projects rarely die from a hard engineering problem. They die from a scope that was never testable in the first place. Here is a method for writing one that is.',
  standfirst:
    'Scope an AI project around a single repeated decision, not a capability: name the decision, define what a wrong answer costs, confirm the data that decision needs already exists, and size the first slice so it can be built and evaluated in weeks rather than quarters.',
  category: 'Playbooks',
  publishedAt: '2026-07-25',
  updatedAt: '2026-07-25',
  tags: ['scoping', 'playbook', 'project planning', 'buying AI'],
  keywords: [
    'how to scope an AI project',
    'AI project requirements',
    'AI use case selection',
    'AI project planning',
    'define AI project scope',
  ],
  body: [
    {
      type: 'p',
      text: 'The most common brief we see is some version of "we want to use AI on our documents". It is not a scope. It cannot be estimated, built, or evaluated, and every week spent refining the wording makes it no more buildable.',
    },
    {
      type: 'p',
      text: 'The fix is not more detail. It is a different shape of statement.',
    },
    {
      type: 'h2',
      id: 'name-the-decision',
      text: 'Step 1 — Name one repeated decision',
    },
    {
      type: 'p',
      text: 'Good AI scopes describe a decision a human currently makes many times a week. Not a capability, not a technology, not a department. A decision, with an actor and a frequency.',
    },
    {
      type: 'table',
      caption: 'Reframing capability statements as decisions',
      head: ['Not a scope', 'A scope'],
      rows: [
        ['"AI for our documents"', '"Decide which of the 400 invoices we receive daily can be posted without a human looking at them"'],
        ['"An AI support assistant"', '"Decide which inbound tickets can be resolved with an existing answer, and draft it"'],
        ['"AI for compliance"', '"Decide whether a submitted claim is missing any of the seven documents policy requires"'],
        ['"Computer vision on the line"', '"Decide, per frame, whether a worker in zone B is wearing required protective equipment"'],
      ],
    },
    {
      type: 'p',
      text: 'The right-hand column is estimable. You can count how often the decision happens, sample a hundred instances, and measure how well a system does on them. The left-hand column can do none of that.',
    },
    {
      type: 'quote',
      text: 'If you cannot sample a hundred past instances of the decision, you do not have a scope yet — you have a theme.',
    },
    {
      type: 'h2',
      id: 'error-budget',
      text: 'Step 2 — Define what being wrong costs',
    },
    {
      type: 'p',
      text: 'Every model-backed decision has an error rate. Pretending otherwise is the root cause of most stalled AI pilots. So price the errors before you build, separately in each direction — because they almost never cost the same.',
    },
    {
      type: 'ul',
      items: [
        'False positive: the system acts when it should not have. What is the cost, and who notices?',
        'False negative: the system fails to act when it should have. What is the cost, and who notices?',
        'What error rate makes this worth doing at all, given that the human baseline is not perfect either?',
        'Who is accountable when it is wrong — and does that person have the ability to override it?',
      ],
    },
    {
      type: 'callout',
      title: 'The asymmetry usually decides the design',
      text: 'When a false positive is expensive and a false negative is cheap, the product should route uncertain cases to a human and only act on high confidence. When it is the other way round, the product should act broadly and make review easy. Most teams discover this after building, and rebuild.',
    },
    {
      type: 'p',
      text: 'Note that the honest comparison is not against perfection — it is against the current process, including the errors humans already make under time pressure at 5pm on a Friday. Ask for that baseline. Teams rarely have it, and gathering it is often the most valuable week of the project.',
    },
    {
      type: 'h2',
      id: 'find-the-data',
      text: 'Step 3 — Confirm the data exists before you design anything',
    },
    {
      type: 'p',
      text: 'A model can only use information that is actually present in what you give it. This sounds obvious and is violated constantly: teams scope a system to make a judgement that depends on context living in someone\'s head, in a separate system nobody mentioned, or in a phone call.',
    },
    {
      type: 'ol',
      items: [
        'Take twenty real past instances of the decision.',
        'For each, write down what a competent human needed in order to decide.',
        'Check that every one of those inputs exists in a system you can read from, at the moment the decision is made.',
        'If something is missing, that is the project — plumbing it in, or narrowing the scope to the cases where it is present.',
      ],
    },
    {
      type: 'p',
      text: 'This exercise takes a couple of days and routinely reshapes a project more than any architecture decision that follows.',
    },
    {
      type: 'h2',
      id: 'size-the-slice',
      text: 'Step 4 — Size the first slice honestly',
    },
    {
      type: 'p',
      text: 'The first deliverable should be narrow enough to build and evaluate in weeks, and representative enough that it surfaces the hard parts. Those two constraints fight each other, and resolving that tension is most of the skill in scoping.',
    },
    {
      type: 'ul',
      items: [
        'Narrow by segment, not by difficulty. One document type, one region, one queue — including its awkward cases. Cherry-picking the easy examples produces a prototype that proves nothing.',
        'Include the integration you are most worried about. If the legacy system is the risk, touch it in slice one.',
        'Ship it to a handful of real users rather than a demo audience. Internal users behave differently from stakeholders in a review.',
        'Build the evaluation set in the same slice. Without it, slice two is guesswork.',
      ],
    },
    {
      type: 'h2',
      id: 'write-it-down',
      text: 'Step 5 — Write the one-page scope',
    },
    {
      type: 'p',
      text: 'A scope that survives contact with engineering fits on a page and answers six things:',
    },
    {
      type: 'ol',
      items: [
        'The decision, with actor and frequency.',
        'The inputs available at decision time, and where each one lives.',
        'What a false positive costs and what a false negative costs.',
        'The threshold at which the system acts alone, and where everything else goes.',
        'The evaluation set: how many cases, who labelled them, and what "correct" means.',
        'What is explicitly out of scope for this slice.',
      ],
    },
    {
      type: 'p',
      text: 'That last line is the one people skip and the one that saves the project. An AI scope without explicit exclusions expands until the deadline arrives.',
    },
    {
      type: 'p',
      text: 'If you have a decision in mind and are not sure it passes these tests, [describe it to us in a couple of sentences](/contact-us). Telling you a use case will not work is a faster and cheaper service than building it.',
    },
  ],
  faqs: [
    {
      q: 'How do I scope an AI project?',
      a: 'Scope it around a single repeated decision rather than a capability. Name the decision with its actor and frequency, define what a false positive and a false negative each cost, confirm every input the decision needs already exists in a readable system, and size the first slice so it can be built and evaluated in weeks.',
    },
    {
      q: 'Why do so many AI pilots stall before production?',
      a: 'Usually because the scope was never testable. A brief like "AI for our documents" cannot be estimated or evaluated, so there is no point at which anyone can say it worked. Pilots also stall when the error cost was never priced, so nobody can decide whether the observed accuracy is good enough to deploy.',
    },
    {
      q: 'What should the first deliverable of an AI project be?',
      a: 'A narrow but representative working slice — one document type, one queue, or one region, including its awkward cases — shipped to a handful of real users, with an evaluation set built alongside it. Cherry-picking easy examples produces a prototype that proves nothing.',
    },
    {
      q: 'How accurate does an AI system need to be?',
      a: 'There is no universal threshold. The honest comparison is against the current process including the errors humans already make, not against perfection. Price the two error directions separately, since they rarely cost the same, and set the confidence threshold for autonomous action from that asymmetry.',
    },
  ],
  relatedProductIds: ['ap-copilot', 'scan-queue'],
  relatedSolutionSlugs: ['fintech', 'healthcare'],
  relatedPostSlugs: [
    'llm-evaluation-in-practice',
    'ai-poc-to-production',
    'choosing-an-ai-development-partner',
  ],
};
