export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQCategory {
  category: string;
  description: string;
  questions: FAQItem[];
}

export const faqs: FAQCategory[] = [
  {
    category: 'General',
    description: 'Everything you need to know about BuildspaceLabs and what we do.',
    questions: [
      {
        q: 'What is BuildspaceLabs?',
        a: 'BuildspaceLabs is an AI-native software development company and product studio that builds custom AI solutions, intelligent automation systems, and production-ready software for businesses worldwide. Unlike traditional IT consultancies, BuildspaceLabs ships working AI products in weeks, not months.',
      },
      {
        q: 'What is an AI-native product studio?',
        a: 'An AI-native product studio is a team that designs and builds software with generative AI at the core of the product, not bolted on afterward. As one, BuildspaceLabs takes a product from idea to production as a single team — the interface, the model orchestration, and the engineering — instead of splitting the work across a design shop, an ML vendor, and a separate dev agency.',
      },
      {
        q: 'What kind of solutions do you build?',
        a: 'BuildspaceLabs builds custom AI solutions including AI agents, intelligent chatbots, workflow automation systems, LLM-powered applications, and enterprise software to help businesses automate customer support, lead generation, document processing, and workflows.',
      },
      {
        q: 'Where are you located?',
        a: 'BuildspaceLabs is headquartered in India and serves clients globally including the US, UK, Europe, Middle East, and Australia. The company operates remotely with distributed teams.',
      },
      {
        q: 'How do you differ from traditional IT consultancies?',
        a: 'We are AI-native (built from the ground up around AI, not retrofitting it), we ship fast (working prototypes in days, not months), we provide direct access to senior talent (no layers of project managers), and we quote clear, fixed scopes agreed before we start.',
      },
      {
        q: 'What industries do you work with?',
        a: 'BuildspaceLabs works across logistics, real estate and proptech, healthcare and medtech, hardware and IoT, fintech, SaaS and customer support, and legal tech — plus adjacent B2B software teams. Most of our work is enterprise and B2B rather than consumer.',
      },
    ],
  },
  {
    category: 'AI Automation & Agents',
    description: 'Learn about the capabilities, models, and integrations of our AI agents.',
    questions: [
      {
        q: 'What is AI Automation?',
        a: 'AI automation uses artificial intelligence to handle manual, repetitive, or time-consuming tasks. We help businesses implement AI to automate processes across customer support, lead qualification, data extraction, and internal workflows.',
      },
      {
        q: 'How good are your AI agents?',
        a: 'Our AI agents use LLM orchestration — with tools like LangChain and LlamaIndex — to handle complex multi-turn conversations, integrate with enterprise systems, and run reliably in production. We build each agent around a specific job, with guardrails and evaluations so it behaves predictably on real data, not just in a demo.',
      },
      {
        q: 'Can you build AI Chatbots?',
        a: 'Yes. Our AI chatbots integrate with WhatsApp Business API, web chat, Slack, and Microsoft Teams. They learn from your knowledge base, handle dynamic multi-turn flows, and escalate to human agents only when necessary.',
      },
      {
        q: 'What LLMs do you use?',
        a: 'We build with frontier models from OpenAI and Google, alongside open-source models like Llama and Mistral. We choose the best model for each task based on latency, cost, and complexity — and swap models as the frontier moves, so you are never locked to one provider.',
      },
      {
        q: 'What happens when the AI gets something wrong?',
        a: 'Every system we build has a designed path for output it is not confident about. Low-confidence results route to a human review queue rather than being acted on, the reviewer can override anything, and the correction is recorded so the system improves. We agree the confidence threshold and who owns the review queue with you before launch — a model-backed feature without that design is a demo, not a product.',
      },
      {
        q: 'How do you make sure an AI agent behaves reliably in production?',
        a: 'We build an evaluation set from real cases alongside the first prototype and run it on every change to a prompt, model version, or retrieval step, so a regression fails a build instead of reaching a user. On top of that we keep agent step-chains short, enforce hard caps on steps and spend, make every write action idempotent, and log the full trace of each run so any behaviour can be reproduced and debugged.',
      },
    ],
  },
  {
    category: 'Data, Security & Deployment',
    description: 'How your data is handled, and where the system can run.',
    questions: [
      {
        q: 'Can the system run on our own infrastructure?',
        a: 'Yes. We build against four deployment models: a vendor API with contractual and regional controls, a managed model running inside your own cloud tenancy, an open-weights model self-hosted on infrastructure you control, and fully air-gapped. Our Open Vision PPE system, for example, runs entirely on-premise with no cloud dependency. We pick the least complex option that satisfies your actual obligation, because each step up costs materially more.',
      },
      {
        q: 'How do you stop an AI system surfacing documents a user should not see?',
        a: 'With permission-aware retrieval. The retrieval layer filters candidate documents by what the requesting user is entitled to see before anything reaches the model, and the calling user\'s identity is propagated through every tool call so the underlying systems enforce their own permissions. An index built without access-control filtering will happily answer from a restricted document, which is a data breach regardless of where the model runs.',
      },
      {
        q: 'What do you need from us to scope data handling?',
        a: 'Four answers, ideally in week one: whether the constraint is regulatory, contractual, or internal policy; whether it governs where data is processed, where it is stored, or both; whether it applies to all your data or one classification of it; and which regimes you are audited under. These change the architecture rather than just the paperwork, so we resolve them before the build rather than after the prototype.',
      },
    ],
  },
  {
    category: 'Pricing & Engagement',
    description: 'Details on timelines, pricing limits, and how we handle projects.',
    questions: [
      {
        q: 'How much do your services cost?',
        a: 'We price every project as a fixed scope agreed before work starts — no hourly billing and no surprises. The exact figure depends on complexity, timeline, and how much we build from scratch versus integrate. Tell us what you are building and we come back with a clear scope and a transparent quote.',
      },
      {
        q: 'How fast can you deliver?',
        a: 'AI agents and automations: 1-2 weeks. Web applications and MVPs: 4-6 weeks. Complex enterprise systems: 8-12 weeks. We ship working prototypes within 24-48 hours of project kickoff.',
      },
      {
        q: 'Do you offer post-launch support and maintenance?',
        a: 'Yes, we provide comprehensive post-launch support including bug fixes, performance monitoring, security updates, prompt tuning, model updates, and 24/7 incident response for critical systems.',
      },
      {
        q: 'Do you integrate with our existing stack?',
        a: 'Yes. We work with CRMs (Salesforce, HubSpot, Zoho), ERPs (SAP, Oracle), databases, cloud platforms (AWS, GCP), and workflow tools like Slack or Teams using API connections.',
      },
      {
        q: 'Do you do pilot projects?',
        a: 'Yes, we encourage pilot projects. We typically start with a focused proof of concept around one workflow, deliver results with real data, and then expand based on validated outcomes.',
      },
    ],
  },
];
