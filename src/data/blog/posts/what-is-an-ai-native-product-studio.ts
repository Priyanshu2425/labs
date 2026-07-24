import type { BlogPost } from '../types';

export const post: BlogPost = {
  slug: 'what-is-an-ai-native-product-studio',
  title: 'What is an AI-native product studio?',
  metaTitle: 'What Is an AI-Native Product Studio?',
  metaDescription:
    'An AI-native product studio designs and builds software with generative AI at the core, not bolted on. Here is what that means in practice, and how it differs.',
  excerpt:
    'The term gets used loosely. Here is a precise definition, the four things that make a studio genuinely AI-native rather than an agency with a model behind a chat box, and how to tell the difference before you sign anything.',
  standfirst:
    'An AI-native product studio is a team that designs and builds software with generative AI at the core of the product rather than bolted on afterward, taking a product from idea to production as one team — the interface, the model orchestration, and the engineering — instead of splitting the work across a design shop, an ML vendor, and a separate dev agency.',
  category: 'Buying AI',
  publishedAt: '2026-07-25',
  updatedAt: '2026-07-25',
  tags: ['AI-native', 'product studio', 'buying AI', 'definitions'],
  keywords: [
    'what is an AI-native product studio',
    'AI native product studio',
    'AI product studio definition',
    'AI-native vs AI-enabled',
    'AI product development company',
  ],
  body: [
    {
      type: 'p',
      text: '"AI-native" has had the life squeezed out of it. Every software firm that added a chat widget in the last two years now claims it. So it is worth being precise, because the distinction is real and it changes what you get.',
    },
    {
      type: 'h2',
      id: 'the-definition',
      text: 'The short definition',
    },
    {
      type: 'p',
      text: 'A product is AI-native when removing the model breaks the product. A product is AI-enabled when removing the model leaves you with a slightly less convenient version of the same thing.',
    },
    {
      type: 'quote',
      text: 'If you can delete the AI and still have a working product, you built an AI feature. If deleting it leaves an empty screen, you built an AI-native product.',
    },
    {
      type: 'p',
      text: 'A studio is AI-native when it is organised to build the first kind. That is an organisational claim, not a marketing one, and it shows up in four concrete places.',
    },
    {
      type: 'h2',
      id: 'four-markers',
      text: 'Four markers of a genuinely AI-native studio',
    },
    {
      type: 'h3',
      id: 'marker-one-team',
      text: '1. One team owns the model and the interface',
    },
    {
      type: 'p',
      text: 'The classic failure mode is a split: a design agency draws the screens, an ML consultancy builds the model, and an offshore dev shop wires them together. Nobody owns the seam, and the seam is where AI products actually fail. Model behaviour and interface design are the same design problem — what the model can reliably do determines what the screen is allowed to promise.',
    },
    {
      type: 'p',
      text: 'In an AI-native team the person choosing the retrieval strategy and the person designing the empty state are in the same conversation, often the same week. That is why we describe [what we build](/our-services) as a single engagement rather than a set of handoffs.',
    },
    {
      type: 'h3',
      id: 'marker-two-evals',
      text: '2. Evaluation is part of the build, not a phase after it',
    },
    {
      type: 'p',
      text: 'Traditional software has tests: given this input, assert that output. Probabilistic systems need evaluations: given a representative set of real inputs, measure the distribution of outputs against a rubric. Teams that treat this as a QA step at the end ship products that demo beautifully and degrade in month two.',
    },
    {
      type: 'p',
      text: 'An AI-native team builds the eval harness alongside the first prototype, because the eval set is what lets you change a prompt, a model, or a retrieval strategy without guessing whether you made things worse.',
    },
    {
      type: 'h3',
      id: 'marker-three-failure',
      text: '3. The design accounts for being wrong',
    },
    {
      type: 'p',
      text: 'Deterministic software is either correct or broken. A model-backed feature is correct most of the time, and the product design has to carry the rest: confidence signalling, a review path for low-confidence output, an audit trail, an obvious way for a human to override. Retrofitting that onto a UI designed for a deterministic system is expensive and usually ugly.',
    },
    {
      type: 'callout',
      title: 'The practical test',
      text: 'Ask a prospective partner to walk you through what their last shipped product does when the model gets it wrong. If the answer is a shrug or "we tuned the prompt", they are building demos. If they describe a review queue, a confidence threshold, and who gets paged, they have shipped.',
    },
    {
      type: 'h3',
      id: 'marker-four-speed',
      text: '4. The default unit of work is a working thing',
    },
    {
      type: 'p',
      text: 'AI product decisions are extremely hard to make on paper. Whether a model can reliably extract the fields you need from your actual documents is not a question a specification can answer — it is a question you answer in an afternoon by running it against fifty real documents. AI-native teams front-load that: build the thin, ugly, working version first and let it kill the bad ideas cheaply.',
    },
    {
      type: 'h2',
      id: 'what-it-is-not',
      text: 'What an AI-native studio is not',
    },
    {
      type: 'ul',
      items: [
        'It is not a model vendor. A studio does not sell you a model; it builds the product around whichever model fits, and swaps it when a better one lands.',
        'It is not a staffing arm. Body-shopping engineers by the month optimises for hours billed, which is the opposite of the incentive you want on an AI build.',
        'It is not a research lab. Applied studios ship into production; labs publish. Some do both, but the deliverable is different and you should know which you are buying.',
        'It is not automatically better. For a well-understood CRUD system with no probabilistic component, a conventional dev team is the right and cheaper answer.',
      ],
    },
    {
      type: 'h2',
      id: 'ai-native-vs-ai-enabled',
      text: 'AI-native vs AI-enabled, side by side',
    },
    {
      type: 'table',
      caption: 'How the two approaches differ across a build',
      head: ['', 'AI-enabled', 'AI-native'],
      rows: [
        ['Starting point', 'An existing product, plus a model', 'The problem, and what a model makes newly possible'],
        ['If you remove the model', 'Product still works, minus a feature', 'Product no longer exists'],
        ['Correctness model', 'Pass/fail tests', 'Eval sets, rubrics, and thresholds'],
        ['Design for errors', 'Added after launch, if at all', 'Designed in from the first screen'],
        ['Team shape', 'ML specialists adjacent to a product team', 'One team; model and interface decisions coupled'],
        ['First deliverable', 'A specification', 'A working prototype against real data'],
      ],
    },
    {
      type: 'h2',
      id: 'when-you-need-one',
      text: 'When you actually need one',
    },
    {
      type: 'p',
      text: 'You probably want an AI-native team when the core of the thing you are building is judgement — reading unstructured documents, triaging inbound work, summarising, deciding what to surface next, taking a multi-step action on someone\'s behalf. Those are the problems where model behaviour and product design cannot be separated.',
    },
    {
      type: 'p',
      text: 'You probably do not need one when the AI is genuinely peripheral: a semantic search box over an existing catalogue, a summarise button, an autocomplete. Those are features, and a competent product team can add them.',
    },
    {
      type: 'p',
      text: 'For a sense of what the first category looks like in practice, our [industry pages](/solutions) map real shipped systems to the sectors they were built for — document workflows, operational triage, vision on a factory floor, support deflection.',
    },
    {
      type: 'h2',
      id: 'how-to-evaluate',
      text: 'How to evaluate a studio that claims the label',
    },
    {
      type: 'ol',
      items: [
        'Ask what happens when the model is wrong in their last shipped product. Specificity is the signal.',
        'Ask how they evaluate a change. If there is no eval set, changes are guesses.',
        'Ask who you will actually talk to weekly, and whether that person writes code or slides.',
        'Ask them to scope a small, real slice of your problem and build it before a large commitment.',
        'Ask what they would refuse to build with AI. Teams with judgement have a list; teams selling hours do not.',
      ],
    },
    {
      type: 'p',
      text: 'That last one matters more than it sounds. A partner who will tell you your use case is better solved with a rules engine and a database index is worth considerably more than one who will happily bill you for an agent.',
    },
  ],
  faqs: [
    {
      q: 'What is an AI-native product studio?',
      a: 'An AI-native product studio is a team that designs and builds software with generative AI at the core of the product rather than bolted on afterward. It takes a product from idea to production as a single team — the interface, the model orchestration, and the engineering — instead of splitting the work across a design shop, an ML vendor, and a separate development agency.',
    },
    {
      q: 'What is the difference between AI-native and AI-enabled?',
      a: 'A product is AI-native when removing the model breaks the product entirely. It is AI-enabled when removing the model leaves a slightly less convenient version of the same working product. AI-native builds design for probabilistic behaviour from the first screen; AI-enabled products bolt it on afterwards.',
    },
    {
      q: 'Do I need an AI-native studio for every AI project?',
      a: 'No. If the AI is peripheral — a summarise button, semantic search over an existing catalogue, autocomplete — a competent conventional product team can add it. You want an AI-native team when the core of the product is judgement: reading unstructured documents, triaging work, or taking multi-step actions on a user\'s behalf.',
    },
    {
      q: 'How can I tell if a studio is genuinely AI-native?',
      a: 'Ask them to describe what their last shipped product does when the model gets something wrong. A genuine answer describes a confidence threshold, a human review path, and an audit trail. A vague answer about prompt tuning means they have built demos rather than production systems.',
    },
  ],
  relatedProductIds: ['brief-forge', 'inbox-zero'],
  relatedSolutionSlugs: ['saas-support', 'legal-tech'],
  relatedPostSlugs: [
    'ai-studio-vs-agency-vs-consultancy',
    'choosing-an-ai-development-partner',
    'ai-agents-in-production',
  ],
};
