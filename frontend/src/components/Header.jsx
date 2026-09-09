import { Sun, Moon, Wifi } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

export default function Header({ pageTitle, pageSubtitle }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header__left">
        {pageTitle && (
          <div className="header__page-info">
            <h1 className="header__page-title">{pageTitle}</h1>
            {pageSubtitle && (
              <p className="header__page-subtitle">{pageSubtitle}</p>
            )}
          </div>
        )}
      </div>

      <div className="header__right">
        {/* System Status */}
        <div className="header__status">
          <span className="status-dot pulse" />
          <span className="header__status-text">System Online</span>
        </div>

        <div className="header__divider" />

        {/* Theme Toggle */}
        <button
          className="btn btn-ghost btn-icon header__theme-btn"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
