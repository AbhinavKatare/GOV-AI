import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';

const navItems = [
  { to: '/home', label: 'Command Center', description: 'Overview & KPIs' },
  { to: '/news', label: 'Signal Feed', description: 'Curated intelligence' },
  { to: '/voice', label: 'Voice Desk', description: 'Conversational ops' },
];

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthView = location.pathname === '/';

  const handleSignOut = () => {
    logout();
    navigate('/', { replace: true });
  };

  if (isAuthView) {
    return (
      <div className="auth-shell">
        <header className="auth-shell__brand">
          <p className="eyebrow">GovAI Platform</p>
          <h1>Secure Civic Intelligence</h1>
          <p className="text-muted">
            Trusted workspace for verified public officers. Authenticate to orchestrate citizen services, media insights, and AI assistance from a single control surface.
          </p>
        </header>
        <main className="auth-shell__panel">{children}</main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">
        <Link to="/home" className="brand-mark">
          <div className="brand-mark__glyph">GA</div>
          <div>
            <p className="eyebrow">GovAI</p>
            <p className="brand-mark__title">Mission Control</p>
          </div>
        </Link>

        <nav className="nav-group">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-card ${isActive ? 'nav-card--active' : ''}`}
            >
              <p className="nav-card__label">{item.label}</p>
              <p className="nav-card__description">{item.description}</p>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          {user && (
            <div className="user-chip">
              <div className="user-chip__avatar">{user.name?.charAt(0) ?? 'G'}</div>
              <div>
                <p className="user-chip__name">{user.name}</p>
                <p className="user-chip__meta">{user.department}</p>
              </div>
            </div>
          )}
          <button type="button" className="ghost-button" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </aside>

      <div className="app-shell__body">
        <header className="shell-header">
          <div>
            <p className="eyebrow">Live Status</p>
            <p className="shell-header__title">National Civic Grid</p>
          </div>
          <div className="status-pill">
            <span className="status-dot" />
            Systems green
          </div>
        </header>
        <main className="shell-main">{children}</main>
      </div>
    </div>
  );
};

export default Layout;