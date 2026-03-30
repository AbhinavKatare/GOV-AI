import React from 'react';
import { useAuth } from '../Context/AuthContext.jsx'; 

const stats = [
  { label: 'Citizen cases', value: '1,248', meta: '+12% vs last week' },
  { label: 'Media alerts', value: '86', meta: 'Realtime AI triage' },
  { label: 'Voice intents', value: '312', meta: 'Cross-language' },
  { label: 'Service uptime', value: '99.97%', meta: 'Last 24 hrs' },
];


const shortcuts = [
  { title: 'Publish civic update', subtitle: 'Reach all channels' },
  { title: 'Launch sentiment probe', subtitle: 'Monitor narratives' },
  { title: 'Escalate citizen issue', subtitle: 'Route to dept lead' },
  { title: 'Sync with field units', subtitle: 'Voice + SMS brief' },
];


const timeline = [
  { time: '09:40', title: 'Water conservation drive', detail: 'Press note auto-scheduled for 12:30 PM' },
  { time: '08:15', title: 'Citizen helpline spike', detail: 'AI flagged power outage in Ward 14' },
  { time: '07:50', title: 'Media sentiment', detail: 'Regional media at 82% positive after briefing' },
];

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="shell-main">
      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Command deck</p>
            <h2 className="panel__title">Welcome back, {user?.name ?? 'Officer'}</h2>
          </div>
          <button type="button" className="secondary-button">Download briefing</button>
        </div>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          You are synced with {user?.department ?? 'GovAI Network'} · Clearance level {user?.role ?? 'Field Ops'}
        </p>
        <div className="dashboard-grid">
          {stats.map((item) => (
            <div key={item.label} className="stat-card">
              <p className="eyebrow">{item.label}</p>
              <p className="stat-card__value">{item.value}</p>
              <p className="text-muted">{item.meta}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Rapid actions</p>
            <h2 className="panel__title">Launch next workflow</h2>
          </div>
          <button type="button" className="primary-button">Initiate workflow</button>
        </div>
        <div className="action-grid">
          {shortcuts.map((item) => (
            <div key={item.title} className="action-card">
              <p className="nav-card__label">{item.title}</p>
              <p className="text-muted">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Operational timeline</p>
            <h2 className="panel__title">Live situational feed</h2>
          </div>
          <button type="button" className="secondary-button">Export log</button>
        </div>
        <div className="timeline">
          {timeline.map((event) => (
            <div key={event.time} className="timeline__item">
              <p className="nav-card__label">{event.title}</p>
              <p className="text-muted">{event.detail}</p>
              <p className="voice-timestamp">{event.time} IST</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;