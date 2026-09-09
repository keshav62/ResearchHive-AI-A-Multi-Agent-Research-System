import { useState, useRef, useEffect } from 'react';
import { Search, Rocket, Sparkles, X } from 'lucide-react';
import './ResearchInput.css';

const EXAMPLE_TOPICS = [
  'Impact of Artificial Intelligence on the IT Job Market',
  'Quantum Computing breakthroughs in 2024',
  'The future of renewable energy and climate change',
  'Blockchain technology in supply chain management',
  'Mental health effects of social media on Gen Z',
];

export default function ResearchInput({ onSubmit, loading }) {
  const [topic, setTopic] = useState('');
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim() && !loading) {
      onSubmit(topic.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  const handleExample = (example) => {
    setTopic(example);
    textareaRef.current?.focus();
  };

  const handleClear = () => {
    setTopic('');
    textareaRef.current?.focus();
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [topic]);

  return (
    <div className="research-input">
      <form onSubmit={handleSubmit}>
        <div className={`research-input__box ${focused ? 'research-input__box--focused' : ''} ${loading ? 'research-input__box--loading' : ''}`}>
          {/* Search icon */}
          <div className="research-input__icon">
            <Search size={20} />
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            className="research-input__textarea"
            placeholder="What would you like to research?"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={loading}
          />

          {/* Clear button */}
          {topic && !loading && (
            <button
              type="button"
              className="research-input__clear"
              onClick={handleClear}
              tabIndex={-1}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-primary btn-lg research-input__submit"
          disabled={!topic.trim() || loading}
        >
          {loading ? (
            <>
              <span className="spinner spinner-sm" />
              Researching...
            </>
          ) : (
            <>
              <Rocket size={18} />
              Start Research
            </>
          )}
        </button>
      </form>

      {/* Hint */}
      <p className="research-input__hint">
        <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to submit · Results typically take 1–3 minutes
      </p>

      {/* Example topics */}
      {!loading && (
        <div className="research-input__examples">
          <div className="research-input__examples-label">
            <Sparkles size={13} />
            <span>Try an example</span>
          </div>
          <div className="research-input__examples-list">
            {EXAMPLE_TOPICS.map((ex) => (
              <button
                key={ex}
                type="button"
                className="research-input__example-chip"
                onClick={() => handleExample(ex)}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
