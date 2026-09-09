import { ExternalLink, Globe } from 'lucide-react';
import './SourcesList.css';

function getDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

export default function SourcesList({ sources = [] }) {
  if (!sources.length) {
    return (
      <div className="sources-list__empty">
        <span>🔗</span>
        <p>No sources available.</p>
      </div>
    );
  }

  return (
    <div className="sources-list">
      <div className="sources-list__count">
        <span className="badge badge-accent">{sources.length} sources</span>
      </div>
      <div className="sources-list__grid">
        {sources.map((source, i) => {
          const isString = typeof source === 'string';
          const url   = isString ? source : (source.url || source.link || '#');
          const title = isString ? getDomain(url) : (source.title || getDomain(url));
          const desc  = isString ? null : (source.description || source.snippet || null);

          return (
            <div key={i} className="sources-list__card card card-hover fade-in" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="sources-list__card-header">
                <div className="sources-list__favicon">
                  <Globe size={14} />
                </div>
                <span className="sources-list__domain">{getDomain(url)}</span>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-icon btn-sm sources-list__link-btn"
                  title="Open source"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
              <h4 className="sources-list__title">{title}</h4>
              {desc && <p className="sources-list__desc">{desc}</p>}
              <div className="sources-list__url">{url}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
