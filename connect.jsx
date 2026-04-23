/* Connect: Compose (3-step) + Inbox (3-pane) */

function StepIndicator({ step, labels }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
      {labels.map((l, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        const on = done || active;
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: on ? COLORS.brand : '#F3F4F6',
                color: on ? '#fff' : COLORS.textMuted,
                display: 'grid', placeItems: 'center',
                fontSize: 13, fontWeight: 800,
                transition: 'all .2s',
              }}>
                {done ? '✓' : n}
              </div>
              <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? COLORS.textPrimary : COLORS.textMuted }}>
                {l}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div style={{ flex: '0 0 60px', height: 2, background: done ? COLORS.brand : '#E5E7EB' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function LeaderAvatar({ leader, size = 44 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: leader.color, color: '#fff',
      display: 'grid', placeItems: 'center',
      fontSize: size * 0.38, fontWeight: 800,
    }}>{leader.initials}</div>
  );
}

function ComposeScreen() {
  const [step, setStep] = React.useState(1);
  const [selectedLeader, setSelectedLeader] = React.useState(null);
  const [query, setQuery] = React.useState('');
  const [regionF, setRegionF] = React.useState('All');
  const [functionF, setFunctionF] = React.useState('All');
  const [locationF, setLocationF] = React.useState('All');
  const [anonMode, setAnonMode] = React.useState(null);
  const [surveyRef, setSurveyRef] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [callToggle, setCallToggle] = React.useState(false);
  const [callSlot, setCallSlot] = React.useState('');
  const [sent, setSent] = React.useState(false);

  const reset = () => {
    setStep(1); setSelectedLeader(null); setAnonMode(null);
    setSurveyRef(''); setSubject(''); setMessage('');
    setCallToggle(false); setCallSlot(''); setSent(false);
  };

  if (sent) {
    return (
      <div style={{ maxWidth: 720, margin: '40px auto', padding: 24 }}>
        <div className="card fade-up" style={{ padding: '48px 32px', textAlign: 'center' }}>
          <div style={{
            width: 76, height: 76, margin: '0 auto 20px',
            borderRadius: '50%', background: '#DCFCE7',
            display: 'grid', placeItems: 'center',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={COLORS.chartGreen} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: COLORS.textPrimary, marginBottom: 10 }}>Message Sent</h2>
          <p style={{ fontSize: 15, color: COLORS.textSecondary, maxWidth: 500, margin: '0 auto', lineHeight: 1.5 }}>
            Your message has been sent to <strong>{selectedLeader.name}</strong>. You'll receive a notification when they respond
            {callToggle && callSlot ? ` — and your call is held for ${callSlot}.` : '.'}
          </p>
          <button onClick={reset}
            style={{
              marginTop: 28, padding: '12px 26px', background: COLORS.brand,
              color: '#fff', border: 'none', borderRadius: 10,
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
            }}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <div style={{ marginBottom: 10 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: COLORS.textPrimary, letterSpacing: -0.4 }}>Connect with a leader</h1>
        <div style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 4 }}>
          Send a message directly to a leader — anonymously or identified.
        </div>
      </div>

      <div className="card fade-up" style={{ padding: '28px 32px' }}>
        <StepIndicator step={step} labels={['Choose a leader', 'Anonymity', 'Compose']} />

        {step === 1 && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Who would you like to reach out to?</div>

            {/* Search + filters */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: '1 1 260px', minWidth: 240 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search by name, title, or location"
                  style={{
                    width: '100%', padding: '9px 12px 9px 34px',
                    borderRadius: 8, border: `1px solid ${COLORS.border}`,
                    fontSize: 13, fontFamily: 'inherit', outline: 'none',
                  }}
                />
              </div>
              {[
                { v: regionF,   set: setRegionF,   opts: ['All', 'APAC', 'EMEA', 'Americas'], placeholder: 'Region' },
                { v: functionF, set: setFunctionF, opts: ['All', 'Delivery', 'Sales', 'Engineering', 'HR', 'CS'], placeholder: 'Function' },
                { v: locationF, set: setLocationF, opts: ['All', ...Array.from(new Set(LEADERS.map(l => l.loc)))], placeholder: 'Location' },
              ].map((f, i) => (
                <div key={i} style={{ position: 'relative', minWidth: 140 }}>
                  <select
                    value={f.v}
                    onChange={e => f.set(e.target.value)}
                    style={{
                      appearance: 'none', WebkitAppearance: 'none',
                      padding: '9px 32px 9px 12px',
                      background: '#fff', border: `1px solid ${COLORS.border}`,
                      borderRadius: 8, fontSize: 13, fontWeight: 500,
                      color: f.v === 'All' ? COLORS.textSecondary : COLORS.textPrimary,
                      cursor: 'pointer', fontFamily: 'inherit', minWidth: 140,
                    }}
                  >
                    <option value="All">{f.placeholder}</option>
                    {f.opts.filter(o => o !== 'All').map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: COLORS.textMuted, fontSize: 10 }}>▼</span>
                </div>
              ))}
              {(query || regionF !== 'All' || functionF !== 'All' || locationF !== 'All') && (
                <button
                  onClick={() => { setQuery(''); setRegionF('All'); setFunctionF('All'); setLocationF('All'); }}
                  style={{ background: 'none', border: 'none', color: COLORS.brand, fontSize: 12, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                >Clear</button>
              )}
            </div>

            {(() => {
              const regionOf = l => /APAC/.test(l.title) ? 'APAC' : /EMEA/.test(l.title) ? 'EMEA' : /Americas/.test(l.title) ? 'Americas' : '';
              const funcOf = l => {
                const t = l.title.toLowerCase();
                if (t.includes('deliver')) return 'Delivery';
                if (t.includes('sales')) return 'Sales';
                if (t.includes('engineer')) return 'Engineering';
                if (t.startsWith('hr') || t.includes('hr ')) return 'HR';
                if (t.includes('cs')) return 'CS';
                return '';
              };
              const q = query.trim().toLowerCase();
              const filtered = LEADERS.filter(l => {
                if (q && !(
                  l.name.toLowerCase().includes(q) ||
                  l.title.toLowerCase().includes(q) ||
                  l.loc.toLowerCase().includes(q)
                )) return false;
                if (regionF !== 'All' && regionOf(l) !== regionF) return false;
                if (functionF !== 'All' && funcOf(l) !== functionF) return false;
                if (locationF !== 'All' && l.loc !== locationF) return false;
                return true;
              });

              if (filtered.length === 0) {
                return (
                  <div style={{ padding: '48px 16px', textAlign: 'center', color: COLORS.textMuted, fontSize: 13, border: `1px dashed ${COLORS.border}`, borderRadius: 12 }}>
                    No leaders match your filters. Try clearing them.
                  </div>
                );
              }

              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {filtered.map(l => {
                    const sel = selectedLeader && selectedLeader.id === l.id;
                    return (
                      <button key={l.id} onClick={() => setSelectedLeader(l)}
                        style={{
                          padding: '18px 16px',
                          border: sel ? `2px solid ${COLORS.brand}` : `1px solid ${COLORS.border}`,
                          background: sel ? COLORS.brandSoft : '#fff',
                          borderRadius: 12,
                          cursor: 'pointer', textAlign: 'left',
                          display: 'flex', flexDirection: 'column', gap: 10,
                          transition: 'all .15s',
                        }}
                      >
                        <LeaderAvatar leader={l} />
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary }}>{l.name}</div>
                          <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 2, lineHeight: 1.4 }}>{l.title}</div>
                          <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                            📍 {l.loc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })()}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
              <button onClick={() => setStep(2)} disabled={!selectedLeader}
                style={{
                  padding: '11px 24px', background: selectedLeader ? COLORS.brand : '#E5E7EB',
                  color: selectedLeader ? '#fff' : COLORS.textMuted, border: 'none',
                  borderRadius: 9, fontSize: 14, fontWeight: 700,
                  cursor: selectedLeader ? 'pointer' : 'not-allowed',
                }}>Next →</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>How would you like to send this message?</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { k: 'anon', icon: '🎭', title: 'Send anonymously', desc: 'Your name, ID, and team will be hidden. The leader sees only "Anonymous Employee #4521".' },
                { k: 'identified', icon: '👤', title: 'Reveal my identity', desc: 'The leader will see your name, role, and team.' },
              ].map(o => {
                const sel = anonMode === o.k;
                return (
                  <button key={o.k} onClick={() => setAnonMode(o.k)}
                    style={{
                      padding: '26px 22px',
                      border: sel ? `2px solid ${COLORS.brand}` : `1px solid ${COLORS.border}`,
                      background: sel ? COLORS.brandSoft : '#fff',
                      borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                      display: 'flex', flexDirection: 'column', gap: 10,
                    }}>
                    <div style={{ fontSize: 36 }}>{o.icon}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.textPrimary }}>{o.title}</div>
                    <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5 }}>{o.desc}</div>
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
              <button onClick={() => setStep(1)}
                style={{ padding: '11px 20px', background: '#fff', color: COLORS.textPrimary, border: `1px solid ${COLORS.border}`, borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
              <button onClick={() => setStep(3)} disabled={!anonMode}
                style={{ padding: '11px 24px', background: anonMode ? COLORS.brand : '#E5E7EB', color: anonMode ? '#fff' : COLORS.textMuted, border: 'none', borderRadius: 9, fontSize: 14, fontWeight: 700, cursor: anonMode ? 'pointer' : 'not-allowed' }}>Next →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Compose your message</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 6 }}>To</div>
                <div style={{
                  padding: '10px 12px', background: '#F9FAFB', border: `1px solid ${COLORS.border}`, borderRadius: 9,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <LeaderAvatar leader={selectedLeader} size={32} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{selectedLeader.name}</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>{selectedLeader.title}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: anonMode === 'anon' ? COLORS.chartViolet : COLORS.brand, padding: '3px 9px', borderRadius: 999, background: anonMode === 'anon' ? '#F3E8FF' : COLORS.brandSoft }}>
                    {anonMode === 'anon' ? '🎭 Anonymous' : '👤 Identified'}
                  </span>
                  <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: COLORS.brand, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Change</button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 6 }}>Survey reference <span style={{ textTransform: 'none', fontWeight: 500, color: COLORS.textMuted, letterSpacing: 0 }}>(optional)</span></div>
                <select value={surveyRef} onChange={e => setSurveyRef(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: 9,
                    border: `1px solid ${COLORS.border}`, fontSize: 13, background: '#fff',
                  }}>
                  <option value="">No survey reference</option>
                  {SURVEY_ORDER.map(k => <option key={k} value={k}>{SURVEYS[k].label}</option>)}
                </select>
                {surveyRef && (
                  <span style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 999, background: COLORS.brandSoft, color: COLORS.brand }}>
                    📎 {SURVEYS[surveyRef].short}
                  </span>
                )}
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 6 }}>Subject</div>
                <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="A short headline for your message"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 9, border: `1px solid ${COLORS.border}`, fontSize: 13 }}
                />
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 6 }}>Message</div>
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={6} placeholder="Share the context clearly. Leaders see this exactly as written."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 9, border: `1px solid ${COLORS.border}`, fontSize: 13, lineHeight: 1.5, resize: 'vertical' }}
                />
              </div>

              <div style={{ padding: '14px 16px', background: '#F9FAFB', borderRadius: 10, border: `1px solid ${COLORS.border}` }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <div onClick={() => setCallToggle(!callToggle)} style={{
                    width: 36, height: 20, borderRadius: 10,
                    background: callToggle ? COLORS.brand : '#D1D5DB',
                    position: 'relative', transition: 'all .2s', flexShrink: 0,
                  }}>
                    <div style={{
                      position: 'absolute', top: 2, left: callToggle ? 18 : 2,
                      width: 16, height: 16, borderRadius: '50%', background: '#fff',
                      transition: 'all .2s',
                    }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>Request a call</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>Leader can accept one of your proposed slots</div>
                  </div>
                </label>

                {callToggle && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                    {CALL_SLOTS.map(s => {
                      const sel = callSlot === s;
                      return (
                        <button key={s} onClick={() => setCallSlot(s)}
                          style={{
                            padding: '7px 14px', borderRadius: 8,
                            border: sel ? `1.5px solid ${COLORS.brand}` : `1px solid ${COLORS.border}`,
                            background: sel ? COLORS.brandSoft : '#fff',
                            color: sel ? COLORS.brand : COLORS.textPrimary,
                            fontSize: 12, fontWeight: sel ? 700 : 500,
                            cursor: 'pointer',
                          }}>{sel && '✓ '}{s}</button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <button onClick={() => setStep(2)}
                  style={{ padding: '11px 20px', background: '#fff', color: COLORS.textPrimary, border: `1px solid ${COLORS.border}`, borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
                <button onClick={() => setSent(true)} disabled={!subject || !message}
                  style={{
                    padding: '11px 24px', background: (subject && message) ? COLORS.brand : '#E5E7EB',
                    color: (subject && message) ? '#fff' : COLORS.textMuted, border: 'none',
                    borderRadius: 9, fontSize: 14, fontWeight: 700,
                    cursor: (subject && message) ? 'pointer' : 'not-allowed',
                  }}>Send message</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- INBOX ---------- */

function InboxScreen() {
  const [activeId, setActiveId] = React.useState('c1');
  const [tab, setTab] = React.useState('All');
  const [search, setSearch] = React.useState('');
  const [reply, setReply] = React.useState('');
  const [acceptedSlot, setAcceptedSlot] = React.useState(null);

  const conv = CONVERSATIONS.find(c => c.id === activeId);
  const tabs = ['All', 'Unread', 'Anon', 'Identified', 'Closed'];

  const filtered = CONVERSATIONS.filter(c => {
    if (tab === 'Unread' && !c.unread) return false;
    if (tab === 'Anon' && !c.anonymous) return false;
    if (tab === 'Identified' && c.anonymous) return false;
    if (tab === 'Closed' && c.status !== 'Closed') return false;
    if (search && !c.subject.toLowerCase().includes(search.toLowerCase()) && !c.displayName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  React.useEffect(() => { setAcceptedSlot(null); setReply(''); }, [activeId]);

  const convAvatarBg = (c) => c.anonymous ? COLORS.chartViolet : COLORS.brand;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 14 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: COLORS.textPrimary, letterSpacing: -0.4 }}>Connect Inbox</h1>
        <div style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 4 }}>
          Messages from employees · {CONVERSATIONS.filter(c => c.unread).length} unread
        </div>
      </div>

      <div className="card" style={{ padding: 0, height: 580, display: 'flex', overflow: 'hidden' }}>
        {/* LEFT PANE */}
        <div style={{ width: 290, borderRight: `1px solid ${COLORS.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '10px 12px', borderBottom: `1px solid ${COLORS.border}` }}>
            <div className="no-scrollbar" style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
              {tabs.map(t => {
                const sel = tab === t;
                return (
                  <button key={t} onClick={() => setTab(t)}
                    style={{
                      padding: '6px 10px', borderRadius: 6, border: 'none',
                      background: sel ? COLORS.brandSoft : 'transparent',
                      color: sel ? COLORS.brand : COLORS.textSecondary,
                      fontSize: 12, fontWeight: sel ? 700 : 500, cursor: 'pointer', whiteSpace: 'nowrap',
                    }}>{t}</button>
                );
              })}
            </div>
          </div>
          <div style={{ padding: '10px 12px', borderBottom: `1px solid ${COLORS.border}` }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conversations…"
              style={{ width: '100%', padding: '7px 10px', borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 12 }}
            />
          </div>
          <div className="thin-scroll" style={{ overflowY: 'auto', flex: 1 }}>
            {filtered.length === 0 && (
              <div style={{ padding: 30, textAlign: 'center', color: COLORS.textMuted, fontSize: 12 }}>No conversations</div>
            )}
            {filtered.map(c => {
              const sel = activeId === c.id;
              return (
                <button key={c.id} onClick={() => setActiveId(c.id)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '12px 14px',
                    background: sel ? COLORS.brandSoft : '#fff',
                    border: 'none', borderLeft: sel ? `3px solid ${COLORS.brand}` : '3px solid transparent',
                    borderBottom: `1px solid ${COLORS.border}`,
                    cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'flex-start',
                  }}>
                  <Avatar initials={c.initials} size={34} bg={convAvatarBg(c)} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: c.unread ? 800 : 600, color: COLORS.textPrimary, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.displayName}
                      </span>
                      {c.unread && <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.brand }} />}
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.subject}
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                        background: c.status === 'Open' ? '#DCFCE7' : '#F3F4F6',
                        color: c.status === 'Open' ? '#15803D' : COLORS.textSecondary }}>{c.status}</span>
                      {c.surveyRef && (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: COLORS.brandSoft, color: COLORS.brand }}>
                          📎 {SURVEYS[c.surveyRef].short}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* MIDDLE PANE */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ padding: '12px 18px', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar initials={conv.initials} size={36} bg={convAvatarBg(conv)} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, display: 'flex', gap: 8, alignItems: 'center' }}>
                {conv.displayName}
                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
                  background: conv.status === 'Open' ? '#DCFCE7' : '#F3F4F6',
                  color: conv.status === 'Open' ? '#15803D' : COLORS.textSecondary }}>{conv.status}</span>
              </div>
              <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 2 }}>{conv.subject}</div>
            </div>
            <button style={{ padding: '7px 14px', background: '#fff', border: `1.5px solid ${COLORS.brand}`, color: COLORS.brand, borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              {conv.status === 'Open' ? 'Mark resolved' : 'Reopen'}
            </button>
          </div>

          <div className="thin-scroll" style={{ flex: 1, overflowY: 'auto', padding: 20, background: '#FAFBFC', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {conv.surveyRef && (
              <div style={{ alignSelf: 'center', padding: '5px 12px', borderRadius: 999, background: COLORS.brandSoft, color: COLORS.brand, fontSize: 11, fontWeight: 700 }}>
                📎 Referenced · {SURVEYS[conv.surveyRef].label}
              </div>
            )}
            {conv.messages.map((m, i) => {
              const isLeader = m.from === 'leader';
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: isLeader ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '78%',
                    padding: '11px 14px',
                    fontSize: 13, lineHeight: 1.5,
                    background: isLeader ? COLORS.brand : '#E5E7EB',
                    color: isLeader ? '#fff' : COLORS.textPrimary,
                    borderRadius: isLeader ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  }}>{m.text}</div>
                  <div style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 4, fontWeight: 500 }}>{m.at}</div>
                </div>
              );
            })}

            {conv.callRequest && (
              <div style={{
                alignSelf: 'flex-start', maxWidth: '78%',
                padding: '14px 16px', borderRadius: '14px 14px 14px 4px',
                border: `1.5px dashed ${COLORS.brand}`, background: COLORS.brandSoft,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.brand, marginBottom: 8 }}>
                  📞 Call request · 30 min
                </div>
                <div style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 10 }}>Pick a slot to accept:</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {CALL_SLOTS.map(s => {
                    const sel = acceptedSlot === s;
                    return (
                      <button key={s} onClick={() => setAcceptedSlot(s)}
                        style={{
                          padding: '6px 12px', borderRadius: 8,
                          background: sel ? COLORS.brand : '#fff',
                          border: `1.5px solid ${COLORS.brand}`,
                          color: sel ? '#fff' : COLORS.brand,
                          fontSize: 12, fontWeight: 700, cursor: 'pointer',
                        }}>{sel && '✓ '}{s}</button>
                    );
                  })}
                </div>
                {acceptedSlot && (
                  <div style={{ marginTop: 10, fontSize: 12, color: '#15803D', fontWeight: 700 }}>
                    ✓ Accepted — calendar invite sent for {acceptedSlot}
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ padding: '12px 16px', borderTop: `1px solid ${COLORS.border}`, background: '#fff' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <textarea value={reply} onChange={e => setReply(e.target.value)} rows={2}
                placeholder="Reply to this message…"
                style={{ flex: 1, padding: '10px 12px', borderRadius: 9, border: `1px solid ${COLORS.border}`, fontSize: 13, resize: 'none', lineHeight: 1.5 }}
              />
              <button title="Attach" style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${COLORS.border}`, background: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              </button>
              <button title="Call" style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${COLORS.border}`, background: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </button>
              <button
                onClick={() => { if (reply.trim()) setReply(''); }}
                style={{ padding: '10px 18px', background: COLORS.brand, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', height: 36 }}>Send</button>
            </div>
          </div>
        </div>

        {/* RIGHT PANE */}
        <div style={{ width: 210, borderLeft: `1px solid ${COLORS.border}`, padding: 16, flexShrink: 0, overflowY: 'auto' }} className="thin-scroll">
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 }}>Details</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12, color: COLORS.textSecondary }}>
            <div><div style={{ color: COLORS.textMuted, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 2 }}>Started</div>{conv.startedAt}</div>
            <div><div style={{ color: COLORS.textMuted, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 2 }}>Status</div><span style={{ color: conv.status === 'Open' ? '#15803D' : COLORS.textSecondary, fontWeight: 700 }}>{conv.status}</span></div>
            <div><div style={{ color: COLORS.textMuted, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 2 }}>Response time</div>{conv.responseTime}</div>
            <div><div style={{ color: COLORS.textMuted, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 2 }}>Anonymity</div>{conv.anonymous ? '🎭 Anonymous' : '👤 Identified'}</div>
          </div>

          {conv.surveyRef && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 }}>Survey</div>
              <span style={{ display: 'inline-block', padding: '5px 10px', borderRadius: 6, background: COLORS.brandSoft, color: COLORS.brand, fontSize: 11, fontWeight: 700 }}>
                📎 {SURVEYS[conv.surveyRef].label}
              </span>
            </div>
          )}

          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 }}>AI Categories</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {conv.tags.map((t, i) => (
                <span key={i} style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: '#F3E8FF', color: COLORS.chartViolet }}>{t}</span>
              ))}
            </div>
          </div>

          {conv.anonymous && (
            <div style={{ marginTop: 20, padding: 10, borderRadius: 8, background: '#FFFBEB', border: '1px solid #FDE68A' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#A16207', marginBottom: 4 }}>🔒 Sender masked</div>
              <div style={{ fontSize: 11, color: '#A16207', lineHeight: 1.4 }}>
                Sender identity is permanently masked. HR cannot reveal it.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ComposeScreen, InboxScreen });
