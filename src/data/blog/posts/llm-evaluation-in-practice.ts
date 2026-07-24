import type { BlogPost } from '../types';

export const post: BlogPost = {
  slug: 'llm-evaluation-in-practice',
  title: 'LLM evaluation in practice: how to know your AI feature actually works',
  metaTitle: 'LLM Evaluation in Practice',
  metaDescription:
    'How to build an evaluation set for an LLM feature: choosing cases, writing rubrics, using a model as judge safely, and wiring it into CI.',
  excerpt:
    'Without evaluation, every prompt change is a guess and every regression is invisible until a customer finds it. Here is how to build a harness that is small enough to actually maintain.',
  standfirst:
    'Build an LLM evaluation harness from real failure cases rather than synthetic examples: collect fifty to two hundred labelled cases from actual usage, score each against an explicit rubric, use deterministic checks wherever possible and a model judge only where necessary, and run the whole set in CI so a regression fails a build rather than reaching a user.',
  category: 'Engineering',
  publishedAt: '2026-07-25',
  updatedAt: '2026-07-25',
  tags: ['evaluation', 'engineering', 'testing', 'quality'],
  keywords: [
    'LLM evaluation',
    'how to evaluate an LLM application',
    'AI eval set',
    'LLM as a judge',
    'AI regression testing',
  ],
  body: [
    {
      type: 'p',
      text: 'Conventional tests assert that a given input produces a given output. Model-backed features do not work that way: the same input produces a different string each time, and most of those strings are fine. You are not asserting equality — you are measuring a distribution against a standard.',
    },
    {
      type: 'p',
      text: 'That sounds academic until the first time someone edits a prompt to fix one complaint and silently breaks a category of inputs nobody was watching. The harness below is the minimum that prevents that, and it is smaller than most teams fear.',
    },
    {
      type: 'h2',
      id: 'the-cases',
      text: 'Step 1 — Collect real cases, not invented ones',
    },
    {
      type: 'p',
      text: 'The most common mistake is generating the evaluation set with a model. Synthetic cases inherit the model\'s idea of what your problem looks like, which is precisely the assumption you are trying to test. They produce reassuring scores and catch nothing.',
    },
    {
      type: 'ul',
      items: [
        'Start from real traffic, real documents, real tickets — whatever the system will actually see.',
        'Aim for fifty to two hundred cases. Bigger sets are not better if nobody maintains them.',
        'Deliberately over-weight the awkward ones: ambiguous inputs, unusual formats, out-of-scope requests, the long tail that generated complaints.',
        'Include cases where the correct answer is a refusal. A system that never declines is not calibrated.',
        'Every time something goes wrong in production, the failing case joins the set. This is how the harness stays honest.',
      ],
    },
    {
      type: 'quote',
      text: 'An evaluation set built from real failures is worth ten times one built from imagined successes.',
    },
    {
      type: 'h2',
      id: 'the-rubric',
      text: 'Step 2 — Write down what "correct" means',
    },
    {
      type: 'p',
      text: 'Vague criteria produce vague scores. "Is this a good summary?" is unanswerable consistently, even by people. Decompose it into things that can be judged independently and, where possible, mechanically.',
    },
    {
      type: 'table',
      caption: 'Decomposing a quality judgement into checkable criteria',
      head: ['Criterion', 'How it is checked'],
      rows: [
        ['Structurally valid output', 'Deterministic — schema or parser'],
        ['Contains the required fields', 'Deterministic — key presence'],
        ['Every claim is supported by the source', 'Model judge with the source in context'],
        ['No information outside the source', 'Model judge, scored separately from support'],
        ['Correct refusal on out-of-scope input', 'Deterministic — did it decline, yes or no'],
        ['Within length and register constraints', 'Deterministic — length; judge for register'],
      ],
    },
    {
      type: 'callout',
      title: 'Push work into the deterministic column',
      text: 'Every criterion you can check with a parser instead of a model is faster, free, perfectly reproducible, and not subject to the judge drifting when you change models. Teams routinely use a model judge for things a regular expression would settle.',
    },
    {
      type: 'h2',
      id: 'model-judges',
      text: 'Step 3 — Use a model as judge, carefully',
    },
    {
      type: 'p',
      text: 'For genuinely subjective criteria, having a model score the output is the practical option. It works well enough to be useful and badly enough to need guardrails.',
    },
    {
      type: 'ol',
      items: [
        'Score one criterion per call. Composite quality scores are noise.',
        'Use a coarse scale. Binary or three-point judgements are far more stable than one to ten.',
        'Give the judge the rubric and a worked example of each score, not just the label.',
        'Validate the judge against human labels on a sample before trusting it. If it disagrees with your domain experts, fix the rubric.',
        'Beware self-preference: a model judging its own output rates it generously. Use a different model as judge where you can.',
      ],
    },
    {
      type: 'p',
      text: 'Track judge-versus-human agreement as its own metric. When it drops, the harness is lying to you and the whole edifice is unreliable.',
    },
    {
      type: 'h2',
      id: 'retrieval-separately',
      text: 'Step 4 — Evaluate retrieval separately from generation',
    },
    {
      type: 'p',
      text: 'If the system retrieves before it answers, measure the two halves independently. Otherwise a poor score is uninterpretable — you cannot tell whether the model reasoned badly or was handed the wrong material.',
    },
    {
      type: 'p',
      text: 'Label which passage answers each question, then measure how often it appears in the top-k results. That recall number is a hard ceiling on end-to-end quality, and it is usually where the actual problem is. More on that in [RAG vs fine-tuning](/blog/rag-vs-fine-tuning).',
    },
    {
      type: 'h2',
      id: 'in-ci',
      text: 'Step 5 — Run it in CI, on every change',
    },
    {
      type: 'p',
      text: 'An evaluation set that someone runs manually before a big release is a document. One that runs on every pull request is a safety net.',
    },
    {
      type: 'ul',
      items: [
        'Run on every change to a prompt, a model version, a retrieval parameter, or a tool definition.',
        'Fail the build on a regression beyond an agreed threshold, not on any movement — there is inherent variance.',
        'Report per-category scores, not one aggregate. An average conceals the segment that collapsed.',
        'Pin the model version explicitly. Silent provider-side updates are a real source of drift.',
        'Keep it fast enough that people do not route around it. A subset on every commit and the full set nightly is a reasonable compromise.',
      ],
    },
    {
      type: 'h2',
      id: 'production',
      text: 'Step 6 — Close the loop with production signals',
    },
    {
      type: 'p',
      text: 'Offline evaluation tells you whether a change is safe. It cannot tell you whether the feature is useful. Pair it with signals from real use: how often a suggestion is accepted unedited, how often output is corrected in the review queue, how often users escalate to a human, how often they simply stop using the feature.',
    },
    {
      type: 'p',
      text: 'When production signals and offline scores disagree, believe production and fix the evaluation set — usually it is missing the cases users actually bring.',
    },
    {
      type: 'h2',
      id: 'minimum',
      text: 'The minimum viable harness',
    },
    {
      type: 'p',
      text: 'If this feels like a lot, start here. It is a couple of days of work and it is most of the value:',
    },
    {
      type: 'ol',
      items: [
        'Fifty real cases in a file, with a labelled expected outcome for each.',
        'Deterministic checks for structure, required fields, and refusals.',
        'One model-judged criterion for the thing you care about most.',
        'A script that runs it and prints per-category pass rates.',
        'A rule that every production failure becomes a new case.',
      ],
    },
  ],
  faqs: [
    {
      q: 'How do you evaluate an LLM application?',
      a: 'Collect fifty to two hundred real cases from actual usage rather than synthetic examples, decompose "correct" into criteria that can be judged independently, check as many as possible deterministically with a parser or schema, use a model judge only for genuinely subjective criteria, and run the whole set in CI so regressions fail a build.',
    },
    {
      q: 'How many test cases do I need in an LLM eval set?',
      a: 'Fifty to two hundred is usually right. Bigger sets are not better if nobody maintains them. What matters more than volume is composition: over-weight ambiguous inputs, unusual formats, out-of-scope requests, and every case that has already failed in production.',
    },
    {
      q: 'Is using an LLM as a judge reliable?',
      a: 'Reliable enough to be useful, with guardrails. Score one criterion per call, use a binary or three-point scale rather than one to ten, give the judge worked examples of each score, validate it against human labels before trusting it, and prefer a different model from the one being judged to avoid self-preference bias.',
    },
    {
      q: 'Why did my AI feature get worse after a prompt change?',
      a: 'Almost always because the change fixed one visible complaint while degrading a category of inputs nobody was measuring. Without an evaluation set covering the segments separately, that trade is invisible. Report per-category scores rather than one aggregate — an average conceals the segment that collapsed.',
    },
  ],
  relatedProductIds: ['scan-queue', 'notewell'],
  relatedSolutionSlugs: ['healthcare', 'legal-tech'],
  relatedPostSlugs: [
    'rag-vs-fine-tuning',
    'ai-poc-to-production',
    'ai-agents-in-production',
  ],
};
