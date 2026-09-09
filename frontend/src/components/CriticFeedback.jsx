import './CriticFeedback.css';

const SECTIONS = [
  { key: 'strengths',           emoji: '✓',  label: 'Strengths',           color: 'success' },
  { key: 'weaknesses',          emoji: '⚠',  label: 'Weaknesses',          color: 'warning' },
  { key: 'missing_information', emoji: '❓', label: 'Missing Information',  color: 'info'    },
  { key: 'unsupported_claims',  emoji: '🚨', label: 'Unsupported Claims',   color: 'error'   },
  { key: 'contradictions',      emoji: '🔄', label: 'Contradictions',       color: 'purple'  },
  { key: 'recommendations',     emoji: '💡', label: 'Recommendations',      color: 'accent'  },
];

export default function CriticFeedback({ feedback }) {
  if (!feedback) {
    return (
      <div className="critic-feedback__empty">
        <span>🕵️</span>
        <p>No critic review available.</p>
      </div>
    );
  }

  const score = feedback.overall_score ?? 0;
  const scoreColor =
    score >= 8   ? 'var(--success)' :
    score >= 6   ? 'var(--warning)' :
                   'var(--error)';

  return (
    <div className="critic-feedback">
      {/* Score card */}
      <div className="critic-feedback__score-card card">
        <div className="critic-feedback__score-left">
          <div className="critic-feedback__score-emoji">🕵️</div>
          <div>
            <h3 className="critic-feedback__score-title">Overall Research Quality</h3>
            <p className="critic-feedback__score-desc">
              AI critic agent evaluation of the research output
            </p>
          </div>
        </div>
        <div className="critic-feedback__score-right">
          <div className="critic-feedback__score-value" style={{ color: scoreColor }}>
            {score.toFixed(1)}
          </div>
          <div className="critic-feedback__score-max">/ 10</div>
        </div>
      </div>

      {/* Score bar */}
      <div className="critic-feedback__bar-track">
        <div
          className="critic-feedback__bar-fill"
          style={{
            width: `${(score / 10) * 100}%`,
            background: scoreColor,
          }}
        />
      </div>

      {/* Sections grid */}
      <div className="critic-feedback__grid">
        {SECTIONS.map(({ key, emoji, label, color }) => {
          const items = feedback[key] ?? [];
          if (!items.length) return null;
          return (
            <div key={key} className={`critic-feedback__section card critic-feedback__section--${color}`}>
              <div className="critic-feedback__section-header">
                <span className="critic-feedback__section-emoji">{emoji}</span>
                <h4 className="critic-feedback__section-label">{label}</h4>
                <span className={`badge badge-${color}`}>{items.length}</span>
              </div>
              <ul className="critic-feedback__list">
                {items.map((item, i) => (
                  <li key={i} className="critic-feedback__list-item">
                    <span className="critic-feedback__bullet" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
