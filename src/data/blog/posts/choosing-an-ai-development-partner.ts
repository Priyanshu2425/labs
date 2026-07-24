import type { BlogPost } from '../types';

export const post: BlogPost = {
  slug: 'choosing-an-ai-development-partner',
  title: 'How to choose an AI development partner: an enterprise checklist',
  metaTitle: 'How to Choose an AI Development Partner',
  metaDescription:
    'A practical checklist for evaluating AI development companies: the questions that separate teams who ship production systems from teams who build demos.',
  excerpt:
    'Every vendor deck looks the same. These are the questions that actually discriminate between a team that has run AI in production and a team that has run AI in a demo.',
  standfirst:
    'Choose an AI development partner on evidence of production behaviour, not on capability claims: ask what their last shipped system does when the model is wrong, how they measure whether a change made things better, who you will speak to weekly, and what they would refuse to build with AI.',
  category: 'Buying AI',
  publishedAt: '2026-07-25',
  updatedAt: '2026-07-25',
  tags: ['buying AI', 'vendor selection', 'due diligence', 'enterprise'],
  keywords: [
    'how to choose an AI development partner',
    'AI development company checklist',
    'evaluate AI vendors',
    'hire AI development company',
    'AI vendor due diligence questions',
  ],
  body: [
    {
      type: 'p',
      text: 'Vendor decks have converged. Everyone has the same logos of the same model providers, the same "agentic workflow" diagram, and the same claim about shipping fast. None of it discriminates. The questions below do, because they are hard to answer well without having actually run something in production.',
    },
    {
      type: 'h2',
      id: 'production-evidence',
      text: 'Part 1 — Evidence of production, not demos',
    },
    {
      type: 'h3',
      id: 'q-wrong',
      text: '"What does your last shipped system do when the model gets it wrong?"',
    },
    {
      type: 'p',
      text: 'This is the single highest-signal question you can ask. A team that has only built demos will talk about prompt tuning and model quality. A team that has shipped will describe specifics: the confidence threshold, where low-confidence output goes, who reviews it, how the reviewer\'s correction gets back into the system, and what gets logged for audit.',
    },
    {
      type: 'p',
      text: 'There is no way to fake a good answer here. Ask it first.',
    },
    {
      type: 'h3',
      id: 'q-eval',
      text: '"How do you know a change made things better?"',
    },
    {
      type: 'p',
      text: 'Prompts, models, and retrieval strategies get changed constantly. Without an evaluation set, every change is a guess and regressions are invisible until a user complains. Ask to see the shape of an eval harness from a real project: how many cases, who labelled them, what the rubric is, whether it runs in CI.',
    },
    {
      type: 'callout',
      title: 'Red flag',
      text: '"We test it manually" is a real answer for a prototype and a disqualifying one for a production system. So is an eval set built entirely from synthetic examples the vendor generated themselves.',
    },
    {
      type: 'h3',
      id: 'q-refuse',
      text: '"What would you refuse to build with AI?"',
    },
    {
      type: 'p',
      text: 'Teams with judgement have a ready list — usually things where the error cost is high and the error rate is irreducible, or where a database index and some rules would do the job for a fraction of the cost. Teams selling hours do not have a list. This question is a cheap integrity check.',
    },
    {
      type: 'h2',
      id: 'access',
      text: 'Part 2 — Who you actually get',
    },
    {
      type: 'ul',
      items: [
        'Ask who will be on the weekly call, by name, and whether that person writes code. Sales engineers who disappear after signature are the oldest problem in this business.',
        'Ask the team size on your project and how many other projects each person is on simultaneously.',
        'Ask about key-person risk directly. Small teams carry it; good ones have an honest answer about documentation, handover, and what happens if someone leaves mid-build.',
        'Ask who owns the code and the model artefacts at the end. Get it in writing before work starts.',
      ],
    },
    {
      type: 'h2',
      id: 'data-and-compliance',
      text: 'Part 3 — Data, security, and where things run',
    },
    {
      type: 'p',
      text: 'For most enterprise buyers this is where the deal actually lives or dies, and it is worth resolving before you get attached to a prototype.',
    },
    {
      type: 'ol',
      items: [
        'Where does our data go? Name every third party in the path, including the model provider and any observability tooling.',
        'Is our data used to train anyone\'s model? Get the specific contractual term, not a reassurance.',
        'Can this run in our own cloud tenancy, or on-premises, if compliance requires it? What breaks if it has to?',
        'What is retained, where, and for how long — prompts, outputs, embeddings, logs?',
        'Which regulatory regimes have you actually delivered under, and can we speak to that client?',
      ],
    },
    {
      type: 'p',
      text: 'If your sector puts hard constraints on where inference can happen, resolve it in week one — it changes the architecture, not just the paperwork. We wrote about the practical shape of that in [private and on-premises LLM deployment](/blog/private-llm-deployment).',
    },
    {
      type: 'h2',
      id: 'commercials',
      text: 'Part 4 — Commercial shape',
    },
    {
      type: 'p',
      text: 'The commercial structure tells you what the vendor is optimising for. Open-ended time and materials rewards duration. A fixed scope per milestone rewards shipping. Neither is inherently dishonest, but they pull in different directions and you should know which one you have signed.',
    },
    {
      type: 'ul',
      items: [
        'Is the scope defined in writing before work starts, and what is explicitly out of it?',
        'What is the smallest useful engagement — can you buy one real slice before committing to a programme?',
        'What are the ongoing costs after launch: inference, hosting, monitoring, and whose budget they land in?',
        'What happens commercially if the prototype proves the use case does not work? A partner confident in their judgement will have a graceful answer.',
      ],
    },
    {
      type: 'quote',
      text: 'The best signal in a vendor process is a partner willing to tell you, early and in writing, which parts of your idea will not work.',
    },
    {
      type: 'h2',
      id: 'the-trial',
      text: 'Part 5 — Buy a small thing first',
    },
    {
      type: 'p',
      text: 'No amount of diligence substitutes for watching a team work. Scope one narrow, real slice of the problem — one document type, one workflow, one queue — with a defined deliverable and a short timeline. You will learn more about communication, judgement, and code quality in three weeks of real work than in three months of procurement.',
    },
    {
      type: 'p',
      text: 'Pick a slice that is genuinely representative rather than the easiest one. The point is to surface the hard parts early, while switching costs are still low.',
    },
    {
      type: 'h2',
      id: 'summary',
      text: 'The short version',
    },
    {
      type: 'ol',
      items: [
        'What does your last shipped system do when the model is wrong?',
        'How do you know a change made things better?',
        'What would you refuse to build with AI?',
        'Who is on the weekly call, and do they write code?',
        'Where does our data go, and is it used for training?',
        'Can we buy one real slice before the programme?',
      ],
    },
    {
      type: 'p',
      text: 'If you want to run this checklist against us, the fastest route is to [tell us the problem](/contact-us) in a couple of sentences — we will tell you honestly whether it is a good fit before anyone writes a proposal.',
    },
  ],
  faqs: [
    {
      q: 'What is the most useful question to ask an AI development company?',
      a: 'Ask what their last shipped system does when the model gets something wrong. Teams that have only built demos talk about prompt tuning; teams that have shipped describe a confidence threshold, a human review path, how corrections feed back in, and what gets logged for audit. The answer is very hard to fake.',
    },
    {
      q: 'How do I check an AI vendor can handle our compliance requirements?',
      a: 'Ask them to name every third party in the data path, produce the contractual term on whether your data trains anyone\'s model, confirm whether the system can run in your own cloud tenancy or on-premises, and state what is retained and for how long. Resolve this in week one — it changes the architecture, not just the paperwork.',
    },
    {
      q: 'Should I run a paid pilot before committing to a full AI build?',
      a: 'Yes. Scope one narrow but genuinely representative slice of the problem with a defined deliverable and a short timeline. Three weeks of real work reveals more about a team\'s judgement, communication, and code quality than months of procurement, and switching costs are still low.',
    },
    {
      q: 'What commercial structure is best for an AI project?',
      a: 'Fixed scopes agreed per milestone generally align better than open-ended time and materials, because the commercial unit matches the delivery unit. Whichever you choose, get the scope and the explicit exclusions in writing before work starts, and clarify who owns the code and model artefacts at the end.',
    },
  ],
  relatedProductIds: ['prior-pilot', 'ask-vault'],
  relatedSolutionSlugs: ['healthcare', 'fintech'],
  relatedPostSlugs: [
    'ai-studio-vs-agency-vs-consultancy',
    'private-llm-deployment',
    'scoping-an-ai-project',
  ],
};
