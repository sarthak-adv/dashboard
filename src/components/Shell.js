/* Shell: Top bar + Sidebar + Home + Coming Soon */

import React, { useState } from 'react';
import { COLORS, PERSONAS } from '../data';

/* ---------- Small UI primitives ---------- */

function Logo({ size = 28 }) {
  return (
    <div className="flex items-center gap-2">
      <div
        style={{
          width: size, height: size, borderRadius: 7,
          background: COLORS.brand, color: '#fff',
          display: 'grid', placeItems: 'center',
          fontWeight: 800, fontSize: size * 0.55, letterSpacing: -0.5,
          boxShadow: '0 2px 6px rgba(26,139,150,0.3)',
        }}
      >AC</div>
      <div className="flex items-center gap-1.5">
        <span style={{ fontWeight: 700, fontSize: 16, color: COLORS.textPrimary, letterSpacing: -0.2 }}>
          Advantage Club
        </span>
        <span
          style={{
            fontSize: 10, fontWeight: 700, padding: '2px 7px',
            borderRadius: 5, background: COLORS.brandSoft, color: COLORS.brand,
            letterSpacing: 0.3, textTransform: 'uppercase',
          }}
        >Survey</span>
      </div>
    </div>
  );
}

function Avatar({ initials, bg = COLORS.brand, size = 32 }) {
  return (
    <div
      style={{
        width: size, height: size, borderRadius: '50%',
        background: bg, color: '#fff',
        display: 'grid', placeItems: 'center',
        fontSize: size * 0.4, fontWeight: 700,
        flexShrink: 0,
      }}
    >{initials}</div>
  );
}

function Pill({ children, color = COLORS.textSecondary, bg = '#F3F4F6', style = {} }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 999,
      background: bg, color, ...style,
    }}>{children}</span>
  );
}

function Delta({ value, unit = 'pts', invert = false }) {
  if (value === 0 || value == null) {
    return <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted }}>— no change</span>;
  }
  const positive = invert ? value < 0 : value > 0;
  const color = positive ? COLORS.chartGreen : COLORS.chartCoral;
  const bg = positive ? '#DCFCE7' : '#FEE2E2';
  const arrow = value > 0 ? '▲' : '▼';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
      color, background: bg,
    }}>
      {arrow} {Math.abs(value)}{unit === 'pct' ? '%' : ''}{unit === 'pts' ? ' pts' : ''}
      {unit === 'score' ? '' : ''}
    </span>
  );
}

function OutsideOverlay({ onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'transparent' }}
    />
  );
}

/* ---------- Top bar ---------- */

function TopBar({ persona, setPersona, breadcrumb, onHome, onBellClick }) {
  const [personaOpen, setPersonaOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <>
      <div style={{
        height: 56, background: '#FFFFFF', borderBottom: '1px solid ' + COLORS.border,
        display: 'flex', alignItems: 'center', padding: '0 24px',
        position: 'sticky', top: 0, zIndex: 30,
      }}>
        <div style={{ width: 240, cursor: 'pointer' }} onClick={onHome}>
          <Logo />
        </div>

        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 13, color: COLORS.textSecondary,
        }}>
          {breadcrumb.map((b, i) => (
            <React.Fragment key={i}>
              <span
                onClick={b.onClick}
                style={{
                  cursor: b.onClick ? 'pointer' : 'default',
                  color: i === breadcrumb.length - 1 ? COLORS.textPrimary : COLORS.textSecondary,
                  fontWeight: i === breadcrumb.length - 1 ? 600 : 500,
                }}
              >{b.label}</span>
              {i < breadcrumb.length - 1 && <span style={{ color: COLORS.textMuted }}>/</span>}
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setPersonaOpen(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 12px', borderRadius: 9,
                border: '1px solid ' + COLORS.border, background: '#fff',
                fontSize: 13, fontWeight: 600, color: COLORS.textPrimary,
                cursor: 'pointer',
              }}
            >
              <span style={{ color: COLORS.textSecondary, fontWeight: 500 }}>View as:</span>
              <span>{persona.label}</span>
              <span style={{ color: COLORS.textMuted, fontSize: 10 }}>▾</span>
            </button>
            {personaOpen && (
              <>
                <OutsideOverlay onClick={() => setPersonaOpen(false)} />
                <div style={{
                  position: 'absolute', right: 0, top: 40, width: 260, zIndex: 50,
                  background: '#fff', border: '1px solid ' + COLORS.border, borderRadius: 12,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)', overflow: 'hidden',
                }}>
                  <div style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, color: COLORS.textMuted, letterSpacing: 0.5, textTransform: 'uppercase', borderBottom: '1px solid ' + COLORS.border }}>
                    View As
                  </div>
                  {PERSONAS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => { setPersona(p); setPersonaOpen(false); }}
                      style={{
                        width: '100%', textAlign: 'left', padding: '10px 14px',
                        background: persona.id === p.id ? COLORS.brandSoft : '#fff',
                        border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 10,
                      }}
                    >
                      <Avatar initials={p.initials} size={28} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>{p.label}</div>
                        <div style={{ fontSize: 11, color: COLORS.textMuted }}>{p.name}</div>
                      </div>
                      {persona.id === p.id && <span style={{ marginLeft: 'auto', color: COLORS.brand, fontWeight: 700 }}>✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setNotifOpen(v => !v)}
            style={{
              position: 'relative', width: 36, height: 36, borderRadius: 9,
              background: '#F9FAFB', border: '1px solid ' + COLORS.border,
              display: 'grid', placeItems: 'center', cursor: 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
            <span style={{
              position: 'absolute', top: 6, right: 7, width: 8, height: 8, borderRadius: '50%',
              background: COLORS.chartCoral, border: '2px solid #fff',
            }} />
          </button>
          {notifOpen && (
            <>
              <OutsideOverlay onClick={() => setNotifOpen(false)} />
              <div style={{
                position: 'absolute', right: 88, top: 52, width: 320, zIndex: 50,
                background: '#fff', border: '1px solid ' + COLORS.border, borderRadius: 12,
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
              }}>
                <div style={{ padding: '12px 14px', borderBottom: '1px solid ' + COLORS.border, fontWeight: 700, fontSize: 13 }}>Notifications</div>
                {[
                  { t: 'Oct 2025 Pulse results ready', s: 'AI summary available', time: '2h ago', new: true },
                  { t: 'New Connect message', s: 'Anonymous Employee #4521', time: '4h ago', new: true },
                  { t: 'Action item assigned to you', s: 'Review workload — APAC CS', time: '1d ago', new: false },
                ].map((n, i) => (
                  <div key={i} style={{ padding: '10px 14px', borderBottom: '1px solid ' + COLORS.border, display: 'flex', gap: 10 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: n.new ? COLORS.brand : 'transparent', marginTop: 6 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>{n.t}</div>
                      <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 2 }}>{n.s}</div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <Avatar initials={persona.initials} size={32} />
        </div>
      </div>
    </>
  );
}

/* ---------- Sidebar ---------- */

const SIDEBAR_ITEMS = [
  {
    key: 'home', label: 'Home', icon: 'home',
  },
  {
    key: 'survey', label: 'Survey', icon: 'clipboard',
    children: [
      { key: 'my-surveys',    label: 'My Surveys',         soon: true },
      { key: 'admin-listing', label: 'Admin Listing',      soon: true },
      { key: 'create-new',    label: 'Create New',         soon: true },
      { key: 'analytics',     label: 'Analytics Dashboard', active: true },
      { key: 'survey-report', label: 'Survey Report',      soon: true },
    ],
  },
  {
    key: 'connect', label: 'Connect', icon: 'message',
    badge: 2,
    children: [
      { key: 'compose', label: 'Compose' },
      { key: 'inbox',   label: 'Inbox'   },
    ],
  },
];

function SidebarIcon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (name === 'home') return (<svg {...common}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-6H9v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>);
  if (name === 'clipboard') return (<svg {...common}><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h4"/></svg>);
  if (name === 'message') return (<svg {...common}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>);
  return null;
}

function Sidebar({ route, setRoute, expanded, setExpanded }) {
  return (
    <aside style={{
      width: 240, background: '#FFFFFF', borderRight: '1px solid ' + COLORS.border,
      height: 'calc(100vh - 56px)', position: 'sticky', top: 56,
      overflowY: 'auto', flexShrink: 0,
    }}>
      <div style={{ padding: '16px 10px' }}>
        {SIDEBAR_ITEMS.map(item => {
          const isHome = item.key === 'home';
          const topActive = isHome ? route === 'home'
            : item.children && item.children.some(c => c.key === route);
          const isExpanded = expanded[item.key];

          return (
            <div key={item.key} style={{ marginBottom: 2 }}>
              <button
                onClick={() => {
                  if (isHome) { setRoute('home'); return; }
                  setExpanded(e => ({ ...e, [item.key]: !e[item.key] }));
                }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', background: 'transparent',
                  border: 'none', borderLeft: topActive ? `3px solid ${COLORS.brand}` : '3px solid transparent',
                  color: topActive ? COLORS.brand : COLORS.textPrimary,
                  fontWeight: topActive ? 700 : 500, fontSize: 14,
                  cursor: 'pointer', textAlign: 'left',
                  borderRadius: 0,
                }}
              >
                <SidebarIcon name={item.icon} />
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{
                    marginLeft: 'auto', fontSize: 11, fontWeight: 700,
                    background: COLORS.brand, color: '#fff',
                    padding: '2px 7px', borderRadius: 999,
                  }}>{item.badge}</span>
                )}
                {item.children && !item.badge && (
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: COLORS.textMuted, transition: 'transform .2s', transform: isExpanded ? 'rotate(90deg)' : 'none' }}>▶</span>
                )}
                {item.children && item.badge && (
                  <span style={{ fontSize: 10, color: COLORS.textMuted, marginLeft: 4, transform: isExpanded ? 'rotate(90deg)' : 'none' }}>▶</span>
                )}
              </button>

              {item.children && isExpanded && (
                <div style={{ padding: '4px 0 4px 40px' }}>
                  {item.children.map(c => {
                    const sel = route === c.key;
                    return (
                      <button
                        key={c.key}
                        className="sidebar-sub"
                        onClick={() => setRoute(c.key)}
                        style={{
                          width: '100%', textAlign: 'left',
                          padding: '8px 12px', marginBottom: 1,
                          background: 'transparent', border: 'none',
                          borderLeft: sel ? `3px solid ${COLORS.brand}` : '3px solid transparent',
                          paddingLeft: 10,
                          color: sel ? COLORS.brand : COLORS.textSecondary,
                          fontSize: 13, fontWeight: sel ? 700 : 500,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                          borderRadius: 0,
                        }}
                      >
                        <span>{c.label}</span>
                        {c.active && (
                          <span style={{
                            fontSize: 9, fontWeight: 700,
                            background: COLORS.brandSoft, color: COLORS.brand,
                            padding: '2px 6px', borderRadius: 4, letterSpacing: 0.4,
                          }}>LIVE</span>
                        )}
                        {c.soon && (
                          <span style={{
                            fontSize: 9, fontWeight: 600, color: COLORS.textMuted,
                            padding: '2px 6px', borderRadius: 4, border: '1px solid ' + COLORS.border,
                          }}>SOON</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ padding: '16px', marginTop: 16, borderTop: '1px solid ' + COLORS.border, fontSize: 11, color: COLORS.textMuted, lineHeight: 1.5 }}>
        <div style={{ fontWeight: 700, color: COLORS.textSecondary, marginBottom: 4 }}>Quick Links</div>
        Documentation • Support • Feedback
      </div>
    </aside>
  );
}

/* ---------- Home screen ---------- */

function HomeScreen({ onNavigate }) {
  const cards = [
    { key: 'analytics', title: 'Survey', icon: 'clipboard', desc: 'Pulse + annual surveys, AI narratives, and analytics across 30,000 employees.', cta: 'Go to analytics' },
    { key: 'inbox', title: 'Connect', icon: 'message', desc: 'Anonymous and identified messages to leaders. Resolve, respond, schedule calls.', cta: 'Open inbox' },
    { key: 'analytics', title: 'Analytics', icon: 'chart', desc: 'Sentiment, engagement, manager effectiveness, attrition risk, benchmarking.', cta: 'See dashboard' },
  ];

  return (
    <div style={{
      maxWidth: 1000, margin: '0 auto', padding: '80px 24px 40px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
    }}>
      <div style={{
        width: 76, height: 76, borderRadius: 18,
        background: COLORS.brand, color: '#fff',
        display: 'grid', placeItems: 'center',
        fontWeight: 800, fontSize: 44, letterSpacing: -1,
        boxShadow: '0 10px 30px rgba(26,139,150,0.25)',
        marginBottom: 24,
      }}>AC</div>
      <h1 style={{ fontSize: 34, fontWeight: 800, color: COLORS.textPrimary, letterSpacing: -0.8, marginBottom: 10 }}>
        Welcome to Survey Analytics
      </h1>
      <p style={{ fontSize: 16, color: COLORS.textSecondary, maxWidth: 600, lineHeight: 1.5 }}>
        Select a section from the sidebar to get started. Or jump straight into one of the workspaces below.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 48, width: '100%' }}>
        {cards.map((c, i) => (
          <button
            key={i}
            onClick={() => onNavigate(c.key)}
            className="card fade-up"
            style={{
              padding: '28px 24px', cursor: 'pointer', textAlign: 'left',
              transition: 'all .2s',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12,
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 25px rgba(26,139,150,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'none'; }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 11,
              background: COLORS.brandSoft, color: COLORS.brand,
              display: 'grid', placeItems: 'center',
            }}>
              {c.icon === 'clipboard' && <SidebarIcon name="clipboard" />}
              {c.icon === 'message' && <SidebarIcon name="message" />}
              {c.icon === 'chart' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-7"/></svg>
              )}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textPrimary }}>{c.title}</div>
            <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5 }}>{c.desc}</div>
            <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700, color: COLORS.brand, display: 'flex', alignItems: 'center', gap: 6 }}>
              {c.cta} <span>→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Coming Soon placeholder ---------- */

function ComingSoon({ title, onBack }) {
  return (
    <div style={{ padding: 48, maxWidth: 720, margin: '48px auto', textAlign: 'center' }}>
      <div className="card" style={{ padding: '56px 40px' }}>
        <div style={{
          width: 72, height: 72, margin: '0 auto 20px', borderRadius: 18,
          background: COLORS.brandSoft, color: COLORS.brand,
          display: 'grid', placeItems: 'center',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
          </svg>
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: COLORS.textPrimary, marginBottom: 8 }}>Coming Soon</h2>
        <div style={{ fontSize: 15, color: COLORS.textSecondary, marginBottom: 24 }}>
          <strong>{title}</strong> is part of the next release. For now, head to the Analytics Dashboard.
        </div>
        <button
          onClick={onBack}
          style={{
            background: COLORS.brand, color: '#fff', border: 'none',
            padding: '11px 22px', borderRadius: 10,
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}
        >Open Analytics Dashboard</button>
      </div>
    </div>
  );
}

export {
  TopBar, Sidebar, HomeScreen, ComingSoon,
  Logo, Avatar, Pill, Delta, OutsideOverlay, SidebarIcon,
};