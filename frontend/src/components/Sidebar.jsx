import { NavLink, useLocation } from 'react-router-dom';
import {
  Home, BookOpen, BarChart2, Settings,
  User, Hexagon, ChevronRight, FlaskConical
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { icon: Home,       label: 'Research',  to: '/' },
  { icon: BookOpen,   label: 'History',   to: '/history' },
  { icon: BarChart2,  label: 'Analytics', to: '/analytics' },
  { icon: Settings,   label: 'Settings',  to: '/settings' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <span className="sidebar__bee">🐝</span>
        </div>
        {!collapsed && (
          <div className="sidebar__logo-text">
            <span className="sidebar__logo-name">ResearchHive</span>
            <span className="sidebar__logo-sub">AI</span>
          </div>
        )}
      </div>

      <div className="sidebar__divider" />

      {/* Navigation */}
      <nav className="sidebar__nav">
        {!collapsed && <p className="sidebar__section-label">Navigation</p>}
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={18} className="sidebar__nav-icon" />
            {!collapsed && <span>{label}</span>}
            {!collapsed && location.pathname === to && (
              <ChevronRight size={14} className="sidebar__nav-chevron" />
            )}
          </NavLink>
        ))}
      </nav>

      {/* Spacer */}
      <div className="sidebar__spacer" />

      {/* Bottom */}
      <div className="sidebar__bottom">
        <div className="sidebar__divider" />
        <div className={`sidebar__user ${collapsed ? 'sidebar__user--collapsed' : ''}`}>
          <div className="sidebar__avatar">
            <User size={16} />
          </div>
          {!collapsed && (
            <div className="sidebar__user-info">
              <p className="sidebar__user-name">Researcher</p>
              <p className="sidebar__user-email">AI Workspace</p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle */}
      <button className="sidebar__toggle" onClick={onToggle} title="Toggle sidebar">
        <ChevronRight
          size={14}
          style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }}
        />
      </button>
    </aside>
  );
}
