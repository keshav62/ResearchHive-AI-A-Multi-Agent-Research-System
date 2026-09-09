import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ResearchInput from '../components/ResearchInput';
import AgentPipeline from '../components/AgentPipeline';
import { startResearch } from '../services/api';
import { useState } from 'react';
import { Zap, Shield, TrendingUp } from 'lucide-react';
import './Dashboard.css';

const FEATURES = [
  {
    icon: <Zap size={20} />,
    title: 'Multi-Agent Workflow',
    desc: 'Six specialized AI agents work in sequence to deliver comprehensive research results.',
    color: 'accent',
  },
  {
    icon: <Shield size={20} />,
    title: 'Critic-Reviewed',
    desc: 'A dedicated Critic Agent evaluates research quality, gaps, and unsupported claims.',
    color: 'success',
  },
  {
    icon: <TrendingUp size={20} />,
    title: 'Polished Reports',
    desc: 'The Writer Agent transforms raw research into clear, publication-ready reports.',
    color: 'info',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleResearch = async (topic) => {
    setError(null);
    setLoading(true);

    // Navigate to progress page immediately (simulated flow)
    navigate('/progress', { state: { topic } });
  };

  return (
    <div className="dashboard">
      <Header
        pageTitle="Research"
        pageSubtitle="Start a new AI-powered research session"
      />

      <main className="dashboard__main">
        {/* Hero section */}
        <section className="dashboard__hero fade-in-up">
          <div className="dashboard__hero-badge">
            <span>🐝</span>
            <span>Multi-Agent Research System</span>
          </div>
          <h1 className="dashboard__hero-title">
            Research anything.<br />
            <span className="dashboard__hero-accent">Powered by AI agents.</span>
          </h1>
          <p className="dashboard__hero-subtitle">
            ResearchHive AI uses multiple specialized AI agents to search, analyze,
            review, and create high-quality research reports — automatically.
          </p>
        </section>

        {/* Input */}
        <section className="dashboard__input-section fade-in-up" style={{ animationDelay: '0.1s' }}>
          {error && (
            <div className="dashboard__error">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}
          <ResearchInput onSubmit={handleResearch} loading={loading} />
        </section>

        {/* Features */}
        <section className="dashboard__features fade-in-up" style={{ animationDelay: '0.2s' }}>
          {FEATURES.map((f) => (
            <div key={f.title} className={`dashboard__feature card card-hover dashboard__feature--${f.color}`}>
              <div className={`dashboard__feature-icon`} style={{
                background: `var(--${f.color}-subtle)`,
                color: `var(--${f.color})`,
              }}>
                {f.icon}
              </div>
              <h3 className="dashboard__feature-title">{f.title}</h3>
              <p className="dashboard__feature-desc">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* Pipeline */}
        <section className="dashboard__pipeline fade-in-up" style={{ animationDelay: '0.3s' }}>
          <AgentPipeline />
        </section>
      </main>
    </div>
  );
}
