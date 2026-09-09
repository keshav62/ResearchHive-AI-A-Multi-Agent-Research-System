import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './ResearchReport.css';

export default function ResearchReport({ content, title }) {
  if (!content) {
    return (
      <div className="research-report__empty">
        <span>📄</span>
        <p>No report content available.</p>
      </div>
    );
  }

  return (
    <div className="research-report">
      {title && <h2 className="research-report__title">{title}</h2>}
      <div className="markdown-content research-report__body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
