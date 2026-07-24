import type { BlogPost } from '../types';

export const post: BlogPost = {
  slug: 'ai-poc-to-production',
  title: 'From AI proof of concept to production: what the gap actually contains',
  metaTitle: 'AI Proof of Concept to Production',
  metaDescription:
    'The demo works and the rollout stalls. The gap between an AI proof of concept and production is mostly evaluation, error handling, and ops — not modelling.',
  excerpt:
    'The prototype impressed everyone in the room and then nothing happened for eight months. That gap has a predictable content, and almost none of it is model quality.',
  standfirst:
    'The distance between a working AI proof of concept and a production system is mostly non-modelling work: an evaluation set that detects regressions, a designed path for low-confidence output, integration with the systems of record, observability and cost control, and an owner who is accountable when it is wrong.',
  category: 'Playbooks',
  publishedAt: '2026-07-25',
  updatedAt: '2026-07-25',
  tags: ['production', 'MLOps', 'playbook', 'pilots'],
  keywords: [
    'AI proof of concept to production',
    'why AI pilots fail',
    'AI POC production gap',
    'move AI prototype to production',
    'AI pilot purgatory',
  ],
  body: [
    {
      type: 'p',
      text: 'A proof of concept is a demonstration that something is possible. Production is a commitment that it will keep working while nobody is watching. Those are different claims, and the work between them is largely not the work people expect.',
    },
    {
      type: 'p',
      text: 'Here is what is actually in the gap, in rough order of how often it is the thing that stalls a rollout.',
    },
    {
      type: 'h2',
      id: 'evaluation',
      text: '1. An evaluation set that can detect a regression',
    },
    {
      type: 'p',
      text: 'A proof of concept is validated by someone looking at the output and nodding. That does not scale and it does not survive a change. The moment you swap a model version, edit a prompt, or adjust retrieval, you need to know whether you improved things or quietly broke a category of inputs nobody was watching.',
    },
    {
      type: 'p',
      text: 'This is the single most common missing piece. It is unglamorous, it takes real hours of labelling by people who understand the domain, and it is the difference between a system you can improve and a system you are afraid to touch. We go deeper on how to build one in [LLM evaluation in practice](/blog/llm-evaluation-in-practice).',
    },
    {
      type: 'h2',
      id: 'the-unhappy-path',
      text: '2. A designed path for the output you do not trust',
    },
    {
      type: 'p',
      text: 'Prototypes show the happy path. Production is mostly everything else: the low-confidence cases, the malformed inputs, the document in an unexpected language, the request that is out of scope, the model that returns something structurally invalid.',
    },
    {
      type: 'ul',
      items: [
        'What confidence threshold separates "act" from "ask a human"?',
        'Where do the "ask a human" cases go, and does that queue have an owner and a service level?',
        'How does a human correction get recorded so it improves the system rather than evaporating?',
        'What does the user see when the system declines to answer? "Something went wrong" is not a design.',
      ],
    },
    {
      type: 'callout',
      title: 'A useful reframe',
      text: 'The review queue is not a fallback for a system that is not good enough yet. It is a permanent part of the product, and designing it well is what makes an imperfect model genuinely useful. Teams that treat it as temporary build it badly.',
    },
    {
      type: 'h2',
      id: 'integration',
      text: '3. Integration with the systems that hold the truth',
    },
    {
      type: 'p',
      text: 'Proofs of concept run on an exported spreadsheet. Production runs against the system of record, with its permissions model, its rate limits, its overnight batch window, and the field that three teams populate inconsistently.',
    },
    {
      type: 'p',
      text: 'This is ordinary engineering, but it is frequently the largest single line item and it is almost never in the pilot estimate. Touching the scariest integration during the pilot — rather than after it — is one of the highest-leverage scoping decisions available.',
    },
    {
      type: 'h2',
      id: 'operations',
      text: '4. Observability, cost, and latency under real load',
    },
    {
      type: 'p',
      text: 'A demo makes a handful of calls. Production makes them continuously, and three properties that did not matter suddenly do.',
    },
    {
      type: 'ol',
      items: [
        'Observability. You need the input, the retrieved context, the output, the model version, and the latency for every call — otherwise a user complaint is unfalsifiable and undebuggable.',
        'Cost. Per-call cost multiplied by real volume is a number worth computing before launch, not after the first invoice. It frequently changes the architecture.',
        'Latency. A response time that is charming in a demo is intolerable inside a workflow someone runs two hundred times a day.',
      ],
    },
    {
      type: 'h2',
      id: 'security',
      text: '5. The security and data review you deferred',
    },
    {
      type: 'p',
      text: 'Pilots run on a permissive exception. Production does not. Expect questions about where data goes, what is retained, whether anything trains a third-party model, and whether the system respects the permissions of the user on whose behalf it acts.',
    },
    {
      type: 'p',
      text: 'That last one is subtle and catches teams out: a retrieval system that indexes everything will happily surface a document the requesting user was never entitled to see. Permission-aware retrieval is a design decision, not a configuration flag, and retrofitting it is painful. If your constraints push inference into your own environment, [private LLM deployment](/blog/private-llm-deployment) covers the practical options.',
    },
    {
      type: 'h2',
      id: 'ownership',
      text: '6. An owner',
    },
    {
      type: 'p',
      text: 'The quiet killer. A pilot has a sponsor; production needs an owner — a named person whose job includes this system working, who receives the alerts, who reviews the queue depth, and who decides when the thresholds move.',
    },
    {
      type: 'quote',
      text: 'A pilot without a named production owner is a demo with a budget. It will not be stopped, and it will not be shipped.',
    },
    {
      type: 'h2',
      id: 'avoiding-the-gap',
      text: 'How to not end up here',
    },
    {
      type: 'p',
      text: 'The gap is much smaller if the pilot was built as a thin version of production rather than as a demonstration. Concretely:',
    },
    {
      type: 'ul',
      items: [
        'Build the evaluation set in week one, not after the demo lands.',
        'Ship the pilot to a small number of real users doing real work, not to a review meeting.',
        'Touch the riskiest integration during the pilot.',
        'Name the production owner before the pilot starts, and have them in the weekly.',
        'Log everything from the first call, including the cases the system refuses.',
      ],
    },
    {
      type: 'p',
      text: 'None of this is expensive at pilot scale. All of it is expensive to add later.',
    },
  ],
  faqs: [
    {
      q: 'Why do AI proofs of concept fail to reach production?',
      a: 'Rarely because of model quality. The usual blockers are a missing evaluation set that can detect regressions, no designed path for low-confidence output, integration with the real system of record that was never estimated, unmeasured cost and latency at real volume, a deferred security review, and no named owner accountable for the system in production.',
    },
    {
      q: 'How long does it take to move an AI pilot to production?',
      a: 'It depends almost entirely on how the pilot was built. A pilot built as a thin version of production — with an evaluation set, real users, and the riskiest integration already touched — is a short step. A pilot built as a demonstration on exported data is effectively a restart.',
    },
    {
      q: 'What is a review queue and why does every AI product need one?',
      a: 'A review queue is where output the system is not confident enough to act on goes for human decision. It is a permanent part of the product rather than a temporary crutch — it is what makes an imperfect model genuinely useful — so it needs an owner, a service level, and a way for corrections to feed back into the system.',
    },
    {
      q: 'What should we log in a production AI system?',
      a: 'For every call: the input, the retrieved context, the output, the model version, the confidence or score, and the latency. Without that record a user complaint cannot be reproduced or debugged, and you cannot tell whether a change improved or degraded behaviour.',
    },
  ],
  relatedProductIds: ['support-pulse', 'scan-queue'],
  relatedSolutionSlugs: ['saas-support', 'manufacturing'],
  relatedPostSlugs: [
    'llm-evaluation-in-practice',
    'ai-agents-in-production',
    'scoping-an-ai-project',
  ],
};
