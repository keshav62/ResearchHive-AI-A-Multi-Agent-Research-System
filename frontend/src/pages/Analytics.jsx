import { useMemo } from 'react';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import { BarChart2, TrendingUp, Clock, Star } from 'lucide-react';
import './Analytics.css';

function getHistory() {
  return JSON.parse(localStorage.getItem('rh-history') || '[]');
}

export default function Analytics() {
  const history = useMemo(getHistory, []);

  const totalSessions  = history.length;
  const avgScore = totalSessions
    ? (history.reduce((s, h) => s + (h.result?.critic_feedback?.overall_score ?? 0), 0) / totalSessions).toFixed(1)
    : '—';
  const totalQueries = history.reduce((s, h) => s + (h.result?.search_queries?.length ?? 0), 0);
  const bestScore = totalSessions
    ? Math.max(...history.map(h => h.result?.critic_feedback?.overall_score ?? 0)).toFixed(1)
    : '—';

  // Topic word frequency for simple bar chart
  const topTopics = useMemo(() => {
    return history.slice(0, 8).map((h, i) => ({
      label: h.topic.slice(0, 42) + (h.topic.length > 42 ? '…' : ''),
      score: h.result?.critic_feedback?.overall_score ?? 0,
      i,
    }));
  }, [history]);

  return (
    <div className="analytics-page">
      <Header
        pageTitle="Analytics"
        pageSubtitle="Research performance and usage statistics"
      />
      <main className="analytics-page__main">
        {/* Stats row */}
        <div className="analytics-page__stats fade-in">
          <StatsCard icon="📊" value={totalSessions} label="Total Sessions"    color="accent"  />
          <StatsCard icon="⭐" value={avgScore}      label="Average Score"     color="success" />
          <StatsCard icon="🔎" value={totalQueries}  label="Total Queries"     color="info"    />
          <StatsCard icon="🏆" value={bestScore}     label="Best Score"        color="purple"  />
        </div>

        {/* Recent Sessions chart */}
        {topTopics.length > 0 ? (
          <div className="analytics-page__chart card fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="analytics-page__chart-title">
              <BarChart2 size={18} />
              Recent Sessions — Quality Score
            </h3>
            <div className="analytics-page__chart-body">
              {topTopics.map((t) => (
                <div key={t.i} className="analytics-page__bar-row">
                  <div className="analytics-page__bar-label" title={t.label}>{t.label}</div>
                  <div className="analytics-page__bar-track">
                    <div
                      className="analytics-page__bar-fill"
                      style={{ width: `${(t.score / 10) * 100}%` }}
                    />
                  </div>
                  <div className="analytics-page__bar-val">{t.score > 0 ? t.score.toFixed(1) : '—'}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="analytics-page__empty card fade-in">
            <span>📊</span>
            <h2>No analytics yet</h2>
            <p>Complete research sessions to see analytics here.</p>
          </div>
        )}

        {/* Agent usage note */}
        <div className="analytics-page__agents card fade-in" style={{ animationDelay: '0.15s' }}>
          <h3 className="analytics-page__agents-title">Agent Participation</h3>
          <div className="analytics-page__agents-grid">
            {[
              { emoji: '📰', name: 'Scout Agent',     usage: totalSessions },
              { emoji: '🔎', name: 'Web Search',      usage: totalSessions },
              { emoji: '🕷️', name: 'Web Scraper',    usage: totalSessions },
              { emoji: '🔍', name: 'Researcher Agent',usage: totalSessions },
              { emoji: '🕵️', name: 'Critic Agent',   usage: totalSessions },
              { emoji: '✍️', name: 'Writer Agent',   usage: totalSessions },
            ].map((a) => (
              <div key={a.name} className="analytics-page__agent-item card">
                <span className="analytics-page__agent-emoji">{a.emoji}</span>
                <div className="analytics-page__agent-name">{a.name}</div>
                <div className="analytics-page__agent-usage">
                  <span className="badge badge-accent">{a.usage} runs</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
