import type { Metadata } from 'next';
import AILabClient from '../../src/pages/AILab/AILab';

export const metadata: Metadata = {
  title: 'AI Lab — Research, Models & Technical Papers',
  description:
    'DIMSSU Labs AI Lab: SLM360 (39ms on-device NLU), Med360 (multilingual medical AI for Indian healthcare), AgentGuard (deadlock prevention for multi-agent systems), VAJRA and KAVACH defence AI. Research meets engineering.',
  openGraph: {
    title: 'AI Lab — DIMSSU Labs',
    description: 'Foundation models, research papers, and technical deep-dives from DIMSSU Labs. SLM360, Med360, AgentGuard and more.',
    url: 'https://labs.dimssu.ai/ai-lab',
  },
};

export default function AILabPage() {
  return <AILabClient />;
}
