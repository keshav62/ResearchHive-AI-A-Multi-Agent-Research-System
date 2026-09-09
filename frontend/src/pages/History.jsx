import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Trash2, ExternalLink, Search, Plus, Clock } from 'lucide-react';
import './History.css';

function timeAgo(dateStr) {
  const now  = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60)   return 'just now';
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400)return `${Math.floor(diff/3600)}h ago`;
  return `${Math.floor(diff/86400)}d ago`;
}

export default function History() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState(() =>
    JSON.parse(localStorage.getItem('rh-history') || '[]')
  );

  const filtered = history.filter(h =>
    h.topic.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = (item) => {
    navigate('/results', { state: { result: item.result } });
  };

  const handleDelete = (id) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('rh-history', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setHistory([]);
    localStorage.removeItem('rh-history');
  };

  return (
    <div className="history-page">
      <Header
        pageTitle="Research History"
        pageSubtitle="Your past research sessions"
      />
      <main className="history-page__main">
        {/* Toolbar */}
        <div className="history-page__toolbar fade-in">
          <div className="history-page__search-box">
            <Search size={16} className="history-page__search-icon" />
            <input
              className="history-page__search-input"
              placeholder="Search history..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="history-page__toolbar-right">
            <span className="history-page__count">{filtered.length} entries</span>
            {history.length > 0 && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={handleClearAll}
              >
                <Trash2 size={14} />
                Clear All
              </button>
            )}
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/')}>
              <Plus size={14} />
              New Research
            </button>
          </div>
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="history-page__empty fade-in">
            <span>📚</span>
            <h2>{history.length === 0 ? 'No research history yet' : 'No results found'}</h2>
            <p>
              {history.length === 0
                ? 'Start your first research session to see it here.'
                : 'Try a different search term.'}
            </p>
            {history.length === 0 && (
              <button className="btn btn-primary" onClick={() => navigate('/')}>
                <Plus size={16} />
                Start Research
              </button>
            )}
          </div>
        ) : (
          <div className="history-page__list fade-in" style={{ animationDelay: '0.05s' }}>
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="history-page__item card card-hover"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="history-page__item-left">
                  <div className="history-page__item-icon">🐝</div>
                  <div className="history-page__item-body">
                    <h3 className="history-page__item-topic">{item.topic}</h3>
                    <div className="history-page__item-meta">
                      <Clock size={12} />
                      <span>{timeAgo(item.date)}</span>
                      {item.result?.critic_feedback?.overall_score != null && (
                        <>
                          <span className="history-page__dot">·</span>
                          <span className="history-page__score">
                            Score: {item.result.critic_feedback.overall_score.toFixed(1)}/10
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="history-page__item-actions">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleOpen(item)}
                  >
                    <ExternalLink size={13} />
                    View
                  </button>
                  <button
                    className="btn btn-ghost btn-icon btn-sm"
                    onClick={() => handleDelete(item.id)}
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
