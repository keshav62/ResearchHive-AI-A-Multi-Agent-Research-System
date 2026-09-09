import './ProgressTracker.css';

const STEPS = [
  { emoji: '📰', name: 'Scout Agent',      label: 'Generating search queries...' },
  { emoji: '🔎', name: 'Web Search',       label: 'Searching the web...' },
  { emoji: '🕷️', name: 'Web Scraper',     label: 'Extracting content from sources...' },
  { emoji: '🔍', name: 'Researcher Agent', label: 'Analyzing research documents...' },
  { emoji: '🕵️', name: 'Critic Agent',    label: 'Reviewing research quality...' },
  { emoji: '✍️', name: 'Writer Agent',    label: 'Writing final report...' },
];

export default function ProgressTracker({ activeStep, completedSteps, stats }) {
  const totalSteps = STEPS.length;
  const completedCount = completedSteps.length;
  const progressPct = Math.round((completedCount / totalSteps) * 100);

  return (
    <div className="progress-tracker">
      {/* Header stats */}
      <div className="progress-tracker__stats">
        <div className="progress-tracker__stat">
          <span className="progress-tracker__stat-value">{stats.queries ?? '—'}</span>
          <span className="progress-tracker__stat-label">Search Queries</span>
        </div>
        <div className="progress-tracker__stat">
          <span className="progress-tracker__stat-value">{stats.sources ?? '—'}</span>
          <span className="progress-tracker__stat-label">Sources Found</span>
        </div>
        <div className="progress-tracker__stat">
          <span className="progress-tracker__stat-value">
            {activeStep >= 0 ? STEPS[activeStep]?.name : 'Starting...'}
          </span>
          <span className="progress-tracker__stat-label">Active Agent</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-tracker__bar-section">
        <div className="progress-tracker__bar-header">
          <span className="progress-tracker__bar-label">Research Progress</span>
          <span className="progress-tracker__bar-pct">{progressPct}%</span>
        </div>
        <div className="progress-tracker__bar-track">
          <div
            className="progress-tracker__bar-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="progress-tracker__timeline">
        {STEPS.map((step, i) => {
          const isCompleted = completedSteps.includes(i);
          const isActive    = activeStep === i;
          const isWaiting   = !isCompleted && !isActive;

          return (
            <div
              key={step.name}
              className={`progress-tracker__step ${
                isCompleted ? 'progress-tracker__step--completed' :
                isActive    ? 'progress-tracker__step--active'    :
                              'progress-tracker__step--waiting'
              }`}
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className={`progress-tracker__connector ${isCompleted ? 'progress-tracker__connector--filled' : ''}`} />
              )}

              {/* Icon */}
              <div className="progress-tracker__icon">
                {isCompleted ? (
                  <span className="progress-tracker__checkmark">✓</span>
                ) : isActive ? (
                  <span className="spinner spinner-sm" />
                ) : (
                  <span className="progress-tracker__emoji">{step.emoji}</span>
                )}
              </div>

              {/* Content */}
              <div className="progress-tracker__content">
                <div className="progress-tracker__step-name">{step.name}</div>
                <div className="progress-tracker__step-status">
                  {isCompleted ? 'Completed' : isActive ? step.label : 'Waiting...'}
                </div>
              </div>

              {/* Badge */}
              <div className="progress-tracker__badge-slot">
                {isCompleted && <span className="badge badge-success">Done</span>}
                {isActive    && <span className="badge badge-accent">Running</span>}
                {isWaiting   && <span className="badge badge-neutral">Queued</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
