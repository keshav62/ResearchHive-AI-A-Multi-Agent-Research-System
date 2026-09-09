import AgentCard from './AgentCard';
import { ChevronRight } from 'lucide-react';
import './AgentPipeline.css';

const AGENTS = [
  { emoji: '📰', name: 'Scout Agent',     description: 'Generates intelligent search queries' },
  { emoji: '🔎', name: 'Web Search',      description: 'Finds relevant sources across the web' },
  { emoji: '🕷️', name: 'Web Scraper',    description: 'Extracts valuable information from sources' },
  { emoji: '🔍', name: 'Researcher Agent',description: 'Performs deep research and analysis' },
  { emoji: '🕵️', name: 'Critic Agent',   description: 'Reviews research quality and identifies gaps' },
  { emoji: '✍️', name: 'Writer Agent',   description: 'Creates the final polished research report' },
];

export function getAgents() { return AGENTS; }

export default function AgentPipeline({ activeIndex = -1, completedIndexes = [] }) {
  const getStatus = (i) => {
    if (completedIndexes.includes(i)) return 'completed';
    if (i === activeIndex) return 'active';
    if (activeIndex > -1 && i > activeIndex) return 'waiting';
    return 'idle';
  };

  return (
    <div className="agent-pipeline">
      <div className="agent-pipeline__header">
        <h2 className="agent-pipeline__title">AI Agent Pipeline</h2>
        <p className="agent-pipeline__subtitle">
          Six specialized agents collaborate to deliver comprehensive research
        </p>
      </div>

      <div className="agent-pipeline__grid">
        {AGENTS.map((agent, i) => (
          <div key={agent.name} className="agent-pipeline__item">
            <AgentCard
              {...agent}
              index={i}
              status={getStatus(i)}
            />
            {i < AGENTS.length - 1 && (
              <div className="agent-pipeline__arrow">
                <ChevronRight size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
