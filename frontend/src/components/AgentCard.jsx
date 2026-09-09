import './AgentCard.css';

export default function AgentCard({ emoji, name, description, status = 'idle', index }) {
  return (
    <div
      className={`agent-card agent-card--${status}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="agent-card__emoji-wrapper">
        <span className="agent-card__emoji">{emoji}</span>
        {status === 'active' && <span className="agent-card__pulse-ring" />}
      </div>
      <h3 className="agent-card__name">{name}</h3>
      <p className="agent-card__desc">{description}</p>
      {status !== 'idle' && (
        <div className={`agent-card__badge badge badge-${
          status === 'completed' ? 'success' :
          status === 'active'    ? 'accent' :
          'neutral'
        }`}>
          {status === 'completed' ? '✓ Done' : status === 'active' ? '⟳ Running' : '⏳ Waiting'}
        </div>
      )}
    </div>
  );
}
