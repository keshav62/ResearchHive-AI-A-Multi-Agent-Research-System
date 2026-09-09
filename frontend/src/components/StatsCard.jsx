import './StatsCard.css';

export default function StatsCard({ icon, value, label, color = 'accent', suffix = '' }) {
  const colorMap = {
    accent:  { bg: 'var(--accent-subtle)',  text: 'var(--accent)' },
    success: { bg: 'var(--success-subtle)', text: 'var(--success)' },
    info:    { bg: 'var(--info-subtle)',    text: 'var(--info)' },
    purple:  { bg: 'var(--purple-subtle)',  text: 'var(--purple)' },
    cyan:    { bg: 'var(--cyan-subtle)',     text: 'var(--cyan)' },
    warning: { bg: 'var(--warning-subtle)', text: 'var(--warning)' },
  };
  const { bg, text } = colorMap[color] || colorMap.accent;

  return (
    <div className="stats-card card card-hover fade-in">
      <div className="stats-card__icon-wrapper" style={{ background: bg }}>
        <span className="stats-card__icon" style={{ color: text }}>{icon}</span>
      </div>
      <div className="stats-card__body">
        <div className="stats-card__value" style={{ color: text }}>
          {value}{suffix}
        </div>
        <div className="stats-card__label">{label}</div>
      </div>
    </div>
  );
}
