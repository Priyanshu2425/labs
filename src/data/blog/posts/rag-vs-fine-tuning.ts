import type { BlogPost } from '../types';

export const post: BlogPost = {
  slug: 'rag-vs-fine-tuning',
  title: 'RAG vs fine-tuning: which one does your use case actually need?',
  metaTitle: 'RAG vs Fine-Tuning: How to Choose',
  metaDescription:
    'Retrieval gives a model facts it does not have. Fine-tuning changes how it behaves. A decision guide, plus the third option most teams should try first.',
  excerpt:
    'The question is usually posed as a choice between two techniques. It is better understood as a diagnosis: is the model missing knowledge, or missing behaviour?',
  standfirst:
    'Use retrieval when the model lacks facts — your documents, your data, anything that changes. Use fine-tuning when the model has the facts but consistently behaves wrongly — wrong format, wrong tone, wrong task framing. Most teams reaching for fine-tuning actually have a retrieval or prompting problem.',
  category: 'Engineering',
  publishedAt: '2026-07-25',
  updatedAt: '2026-07-25',
  tags: ['RAG', 'fine-tuning', 'engineering', 'architecture'],
  keywords: [
    'RAG vs fine-tuning',
    'when to use retrieval augmented generation',
    'when to fine-tune an LLM',
    'RAG architecture',
    'LLM customisation options',
  ],
  body: [
    {
      type: 'p',
      text: 'Teams tend to arrive with the question already framed as a technology choice. It is more useful as a diagnosis, and the diagnostic question is short: is the model missing knowledge, or missing behaviour?',
    },
    {
      type: 'table',
      caption: 'Matching the symptom to the technique',
      head: ['Symptom', 'Diagnosis', 'Technique'],
      rows: [
        ['Invents facts about your business or products', 'Missing knowledge', 'Retrieval'],
        ['Cannot answer about anything after its training cutoff', 'Missing knowledge', 'Retrieval'],
        ['Gets your data right but formats the answer wrongly', 'Missing behaviour', 'Prompting, then fine-tuning'],
        ['Right content, wrong register or house style', 'Missing behaviour', 'Prompting, then fine-tuning'],
        ['Misunderstands a domain-specific task framing', 'Missing behaviour', 'Fine-tuning'],
        ['Right answer, unacceptable latency or cost', 'Efficiency', 'Fine-tune a smaller model, or distil'],
      ],
    },
    {
      type: 'h2',
      id: 'what-rag-does',
      text: 'What retrieval actually does',
    },
    {
      type: 'p',
      text: 'Retrieval-augmented generation puts relevant source material into the model\'s context at request time. The model does not learn anything; it is simply given the facts it needs, in the moment, and asked to reason over them.',
    },
    {
      type: 'p',
      text: 'This is the right default for most enterprise use cases, for reasons that have little to do with model quality:',
    },
    {
      type: 'ul',
      items: [
        'Freshness. Update a document and the next answer reflects it. No retraining cycle.',
        'Attribution. You can show the user which passage the answer came from, which is often a hard requirement rather than a nicety.',
        'Access control. Retrieval can filter by the requesting user\'s permissions. Weights cannot — anything baked into a fine-tune is available to everyone who can call the model.',
        'Removability. Deleting a document removes its influence. Removing a fact from fine-tuned weights is not a solved problem, which matters when someone exercises a deletion right.',
      ],
    },
    {
      type: 'callout',
      title: 'The access-control point is the one that decides most enterprise architectures',
      text: 'If different users are entitled to see different documents, retrieval is not a preference — it is the only workable design. A fine-tune over the whole corpus makes every fact in it reachable by every user who can talk to the model.',
    },
    {
      type: 'h2',
      id: 'rag-is-search',
      text: 'Retrieval is a search problem wearing a new hat',
    },
    {
      type: 'p',
      text: 'The most common cause of a disappointing retrieval system is not the model. It is that the right passage was never retrieved, so the model was asked to answer from material that did not contain the answer. Before blaming generation, measure retrieval separately.',
    },
    {
      type: 'ol',
      items: [
        'Take fifty real questions. For each, identify by hand which passage contains the answer.',
        'Measure how often that passage appears in the top-k results. This is your ceiling — generation cannot exceed it.',
        'If recall is poor, fix retrieval: chunking strategy, hybrid keyword-plus-vector search, metadata filters, and a reranking pass over a wider candidate set.',
        'Only then tune the generation prompt.',
      ],
    },
    {
      type: 'p',
      text: 'Hybrid search matters more than most teams expect. Pure vector similarity is weak on exact identifiers — part numbers, policy codes, names — which is exactly what enterprise questions are full of. Keyword and vector retrieval combined, then reranked, is the workhorse configuration.',
    },
    {
      type: 'h2',
      id: 'what-fine-tuning-does',
      text: 'What fine-tuning actually does',
    },
    {
      type: 'p',
      text: 'Fine-tuning adjusts weights on examples so the model behaves differently by default. It is good at shaping behaviour and poor at installing facts — facts learned this way are unreliable, unattributable, and impossible to update cleanly.',
    },
    {
      type: 'p',
      text: 'It genuinely earns its place in three situations:',
    },
    {
      type: 'ul',
      items: [
        'A rigid output format or domain convention that prompting keeps drifting away from across long outputs.',
        'A task framing so specific to your domain that explaining it consumes an unreasonable amount of context on every call.',
        'Cost or latency pressure, where a fine-tuned small model matches a large model on your narrow task at a fraction of the price.',
      ],
    },
    {
      type: 'p',
      text: 'That third case is underrated. If you are running a single well-defined task at high volume, fine-tuning a small model on outputs from a large one is often the highest-return optimisation available.',
    },
    {
      type: 'h2',
      id: 'try-first',
      text: 'The third option, which most teams should try first',
    },
    {
      type: 'p',
      text: 'Before either technique: a better prompt with real examples in it. Few-shot prompting with eight to twelve carefully chosen examples — including the awkward edge cases — closes a surprising share of the gap that teams reach for fine-tuning to fix.',
    },
    {
      type: 'quote',
      text: 'Assembling the examples for a fine-tune is most of the work. Try those same examples in the prompt first — you will often find you are done.',
    },
    {
      type: 'p',
      text: 'It is also reversible in seconds, requires no training infrastructure, and survives a model upgrade. Fine-tunes have to be redone when you change base models, which in a fast-moving field is a recurring cost.',
    },
    {
      type: 'h2',
      id: 'combining',
      text: 'They are not exclusive',
    },
    {
      type: 'p',
      text: 'The mature configuration is usually both: retrieval supplies the facts, and a light fine-tune or a well-engineered prompt enforces the behaviour. Diagnose the two problems separately and solve each with the tool suited to it.',
    },
    {
      type: 'p',
      text: 'Whichever you choose, you cannot tell whether it worked without measurement — see [LLM evaluation in practice](/blog/llm-evaluation-in-practice) for how to build the harness that makes these decisions empirical rather than aesthetic.',
    },
  ],
  faqs: [
    {
      q: 'What is the difference between RAG and fine-tuning?',
      a: 'Retrieval-augmented generation supplies the model with relevant source material at request time, so it is the right tool when the model is missing facts. Fine-tuning adjusts model weights on examples, so it is the right tool when the model has the facts but consistently behaves wrongly — wrong format, tone, or task framing.',
    },
    {
      q: 'Should I use RAG or fine-tuning for company knowledge?',
      a: 'Retrieval, in almost every case. It keeps answers fresh without retraining, lets you cite the source passage, allows filtering by the requesting user\'s permissions, and lets you remove a fact by deleting a document. Facts baked into fine-tuned weights are unattributable, available to every user, and cannot be cleanly removed.',
    },
    {
      q: 'Why is my RAG system giving bad answers?',
      a: 'Usually because the correct passage is never retrieved, so the model is answering from material that does not contain the answer. Measure retrieval separately: take fifty real questions, identify the passage that answers each, and check how often it appears in the top-k results. That recall figure is a hard ceiling on answer quality.',
    },
    {
      q: 'When is fine-tuning worth it?',
      a: 'When a rigid output format keeps drifting despite prompting, when the task framing is so domain-specific that explaining it consumes excessive context on every call, or when you need to match a large model\'s quality on one narrow high-volume task at much lower cost and latency using a smaller fine-tuned model.',
    },
  ],
  relatedProductIds: ['ask-vault', 'brief-forge'],
  relatedSolutionSlugs: ['legal-tech', 'saas-support'],
  relatedPostSlugs: [
    'llm-evaluation-in-practice',
    'ai-agents-in-production',
    'private-llm-deployment',
  ],
};
