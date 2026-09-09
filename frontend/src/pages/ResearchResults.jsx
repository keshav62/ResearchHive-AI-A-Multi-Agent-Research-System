import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import ResearchReport from '../components/ResearchReport';
import CriticFeedback from '../components/CriticFeedback';
import SourcesList from '../components/SourcesList';
import { Copy, Download, Plus, Check } from 'lucide-react';
import './ResearchResults.css';

const TABS = [
  { id: 'overview',  label: 'Overview',      emoji: '📊' },
  { id: 'research',  label: 'Research',       emoji: '🔍' },
  { id: 'critic',    label: 'Critic Review',  emoji: '🕵️' },
  { id: 'report',    label: 'Final Report',   emoji: '✍️' },
  { id: 'sources',   label: 'Sources',        emoji: '🔗' },
];

export default function ResearchResults() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const result    = state?.result;

  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied]       = useState(false);

  if (!result) {
    return (
      <div className="research-results">
        <Header pageTitle="Research Results" />
        <main className="research-results__main">
          <div className="research-results__no-result card">
            <span>📭</span>
            <h2>No results found</h2>
            <p>Start a research session to see results here.</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              <Plus size={16} />
              Start Research
            </button>
          </div>
        </main>
      </div>
    );
  }

  const { topic, search_queries = [], research = '', critic_feedback, final_report = '', sources = [] } = result;
  const score    = critic_feedback?.overall_score ?? 0;
  const numAgents = 6;

  // ---- Actions ----
  const handleCopy = () => {
    navigator.clipboard.writeText(final_report || research || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([final_report || research || ''], { type: 'text/markdown' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `${topic.slice(0, 50).replace(/[^a-z0-9]/gi, '_')}_report.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="research-results">
      <Header
        pageTitle="Research Results"
        pageSubtitle="Your AI-generated research report"
      />
      <main className="research-results__main">
        {/* Topic header */}
        <div className="research-results__topic-header fade-in">
          <div className="research-results__topic-label">Research Topic</div>
          <h1 className="research-results__topic-title">"{topic}"</h1>
          <div className="research-results__topic-actions">
            <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy Report'}
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleDownload}>
              <Download size={14} />
              Download
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/')}>
              <Plus size={14} />
              New Research
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="research-results__tabs fade-in" style={{ animationDelay: '0.05s' }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`research-results__tab ${activeTab === tab.id ? 'research-results__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="research-results__content fade-in" key={activeTab}>
          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="research-results__overview">
              <div className="research-results__stats-grid">
                <StatsCard
                  icon="🔎"
                  value={search_queries.length || 8}
                  label="Search Queries"
                  color="accent"
                />
                <StatsCard
                  icon="🔗"
                  value={sources.length || 12}
                  label="Sources Collected"
                  color="info"
                />
                <StatsCard
                  icon="⭐"
                  value={score.toFixed(1)}
                  label="Quality Score"
                  color={score >= 8 ? 'success' : score >= 6 ? 'warning' : 'error'}
                  suffix=" / 10"
                />
                <StatsCard
                  icon="🤖"
                  value={numAgents}
                  label="AI Agents Used"
                  color="purple"
                />
              </div>

              {/* Search queries list */}
              {search_queries.length > 0 && (
                <div className="research-results__queries card">
                  <h3 className="research-results__queries-title">Search Queries Generated</h3>
                  <div className="research-results__queries-list">
                    {search_queries.map((q, i) => (
                      <div key={i} className="research-results__query-chip">
                        <span className="research-results__query-num">{i + 1}</span>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Research */}
          {activeTab === 'research' && (
            <div className="research-results__tab-panel">
              <ResearchReport content={research} />
            </div>
          )}

          {/* Critic */}
          {activeTab === 'critic' && (
            <div className="research-results__tab-panel">
              <CriticFeedback feedback={critic_feedback} />
            </div>
          )}

          {/* Final Report */}
          {activeTab === 'report' && (
            <div className="research-results__tab-panel">
              <div className="research-results__report-actions">
                <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Report'}
                </button>
                <button className="btn btn-secondary btn-sm" onClick={handleDownload}>
                  <Download size={14} />
                  Download .md
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/')}>
                  <Plus size={14} />
                  New Research
                </button>
              </div>
              <ResearchReport content={final_report || research} title="Final Research Report" />
            </div>
          )}

          {/* Sources */}
          {activeTab === 'sources' && (
            <div className="research-results__tab-panel">
              <SourcesList sources={sources} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
