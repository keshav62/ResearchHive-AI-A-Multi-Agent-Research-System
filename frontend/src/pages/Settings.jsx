import { useState } from 'react';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Save, Check, Globe, Cpu } from 'lucide-react';
import './Settings.css';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [apiUrl, setApiUrl] = useState(
    localStorage.getItem('rh-api-url') || 'http://127.0.0.1:8000'
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('rh-api-url', apiUrl);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings-page">
      <Header
        pageTitle="Settings"
        pageSubtitle="Configure your ResearchHive AI environment"
      />
      <main className="settings-page__main">

        {/* Appearance */}
        <section className="settings-page__section card fade-in">
          <div className="settings-page__section-header">
            <h2 className="settings-page__section-title">
              <Sun size={18} />
              Appearance
            </h2>
            <p className="settings-page__section-desc">Customize the visual theme of the application.</p>
          </div>

          <div className="settings-page__row">
            <div className="settings-page__row-info">
              <div className="settings-page__row-label">Color Theme</div>
              <div className="settings-page__row-desc">Choose between dark and light mode.</div>
            </div>
            <div className="settings-page__theme-toggle">
              <button
                className={`settings-page__theme-btn ${theme === 'dark' ? 'settings-page__theme-btn--active' : ''}`}
                onClick={() => theme === 'light' && toggleTheme()}
              >
                <Moon size={16} />
                Dark
              </button>
              <button
                className={`settings-page__theme-btn ${theme === 'light' ? 'settings-page__theme-btn--active' : ''}`}
                onClick={() => theme === 'dark' && toggleTheme()}
              >
                <Sun size={16} />
                Light
              </button>
            </div>
          </div>
        </section>

        {/* API Configuration */}
        <section className="settings-page__section card fade-in" style={{ animationDelay: '0.05s' }}>
          <div className="settings-page__section-header">
            <h2 className="settings-page__section-title">
              <Globe size={18} />
              API Configuration
            </h2>
            <p className="settings-page__section-desc">Configure backend connection settings.</p>
          </div>

          <div className="settings-page__row settings-page__row--column">
            <div className="settings-page__row-info">
              <div className="settings-page__row-label">Backend URL</div>
              <div className="settings-page__row-desc">The URL of your FastAPI backend server.</div>
            </div>
            <div className="settings-page__input-group">
              <input
                className="settings-page__input"
                type="url"
                value={apiUrl}
                onChange={e => setApiUrl(e.target.value)}
                placeholder="http://127.0.0.1:8000"
              />
              <button
                className="btn btn-primary"
                onClick={handleSave}
              >
                {saved ? <Check size={16} /> : <Save size={16} />}
                {saved ? 'Saved!' : 'Save'}
              </button>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="settings-page__section card fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="settings-page__section-header">
            <h2 className="settings-page__section-title">
              <Cpu size={18} />
              About ResearchHive AI
            </h2>
          </div>
          <div className="settings-page__about">
            <div className="settings-page__about-logo">
              <span>🐝</span>
              <div>
                <div className="settings-page__about-name">ResearchHive AI</div>
                <div className="settings-page__about-version">Multi-Agent Research System · v1.0.0</div>
              </div>
            </div>
            <div className="settings-page__about-agents">
              {['📰 Scout Agent', '🔎 Web Search', '🕷️ Web Scraper', '🔍 Researcher Agent', '🕵️ Critic Agent', '✍️ Writer Agent'].map(a => (
                <span key={a} className="badge badge-neutral">{a}</span>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
