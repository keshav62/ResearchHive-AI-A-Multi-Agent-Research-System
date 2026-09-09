import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ResearchProgress from './pages/ResearchProgress';
import ResearchResults from './pages/ResearchResults';
import History from './pages/History';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import './App.css';

// Pages that show the sidebar
const SIDEBAR_PAGES = ['/', '/history', '/analytics', '/settings'];

function AppLayout() {
  const location  = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Hide sidebar on progress and results pages for full focus
  const showSidebar = SIDEBAR_PAGES.includes(location.pathname);

  return (
    <div className={`app-layout ${showSidebar ? 'app-layout--with-sidebar' : ''} ${collapsed && showSidebar ? 'app-layout--collapsed' : ''}`}>
      {showSidebar && (
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(c => !c)}
        />
      )}
      <div className="app-layout__main">
        <Routes>
          <Route path="/"         element={<Dashboard />}        />
          <Route path="/progress" element={<ResearchProgress />} />
          <Route path="/results"  element={<ResearchResults />}  />
          <Route path="/history"  element={<History />}          />
          <Route path="/analytics"element={<Analytics />}        />
          <Route path="/settings" element={<Settings />}         />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
