/* Survey selector + Filter bar + Anonymity gate */

const { useState: useStateF, useEffect: useEffectF } = React;

function SurveySelector({ surveyKey, setSurveyKey }) {
  const survey = SURVEYS[surveyKey];
  const pct = Math.round((survey.respondents / survey.invited) * 100);

  return (
    <div className="card" style={{
      padding: '14px 20px',
      display: 'flex', alignItems: 'center', gap: 16,
      marginBottom: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Select Survey
        </span>
        <div style={{ position: 'relative' }}>
          <select
            value={surveyKey}
            onChange={e => setSurveyKey(e.target.value)}
            style={{
              appearance: 'none', WebkitAppearance: 'none',
              padding: '8px 34px 8px 14px',
              background: COLORS.brandSoft,
              border: `1.5px solid ${COLORS.brand}`,
              borderRadius: 9,
              fontSize: 13, fontWeight: 700,
              color: COLORS.brand,
              cursor: 'pointer',
              minWidth: 280,
            }}
          >
            {SURVEY_ORDER.map(k => (
              <option key={k} value={k}>{SURVEYS[k].label}</option>
            ))}
          </select>
          <span style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            pointerEvents: 'none', color: COLORS.brand, fontSize: 10,
          }}>▼</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginLeft: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          <span style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: 500 }}>{survey.date}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M3 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/></svg>
          <span style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: 500 }}>{survey.respondents.toLocaleString()} / {survey.invited.toLocaleString()}</span>
        </div>
        <span style={{
          padding: '4px 10px', borderRadius: 999,
          background: pct >= 85 ? '#DCFCE7' : pct >= 75 ? '#FEF3C7' : '#FEE2E2',
          color: pct >= 85 ? '#15803D' : pct >= 75 ? '#A16207' : '#B91C1C',
          fontSize: 12, fontWeight: 700,
        }}>
          {pct}% participation
        </span>
      </div>
    </div>
  );
}

function FilterBar({ activeFilters, setActiveFilters }) {
  const FILTERS = [
    { key: 'Location',     options: ['All', 'Mumbai', 'Bengaluru', 'Delhi NCR', 'Singapore', 'London'] },
    { key: 'Tenure',       options: ['All', '0-1 yr', '1-3 yrs', '3-5 yrs', '5+ yrs'] },
    { key: 'BU',           options: ['All', 'Retail', 'Enterprise', 'Digital', 'Operations'] },
    { key: 'Country',      options: ['All', 'India', 'Singapore', 'UK', 'USA'] },
    { key: 'Work Status',  options: ['All', 'Active', 'On Leave', 'Notice'] },
    { key: 'Manager Wise', options: ['All', 'Priya Sharma', 'Arjun Mehta', 'Raj Kumar', 'Neha Gupta'] },
  ];

  const [draft, setDraft] = React.useState(() => {
    const d = {};
    FILTERS.forEach(f => { d[f.key] = activeFilters[f.key] || 'All'; });
    return d;
  });

  const setOne = (k, v) => setDraft(d => ({ ...d, [k]: v }));

  const clearAll = () => {
    const d = {};
    FILTERS.forEach(f => { d[f.key] = 'All'; });
    setDraft(d);
    setActiveFilters({});
  };

  const apply = () => {
    const next = {};
    Object.entries(draft).forEach(([k, v]) => { if (v && v !== 'All') next[k] = v; });
    setActiveFilters(next);
  };

  const Dropdown = ({ label, options }) => (
    <div style={{ position: 'relative', minWidth: 150 }}>
      <select
        value={draft[label]}
        onChange={e => setOne(label, e.target.value)}
        style={{
          appearance: 'none', WebkitAppearance: 'none',
          width: '100%',
          padding: '9px 32px 9px 14px',
          background: '#fff',
          border: `1px solid ${COLORS.border}`,
          borderRadius: 8,
          fontSize: 13, fontWeight: 500,
          color: draft[label] && draft[label] !== 'All' ? COLORS.textPrimary : COLORS.textSecondary,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <option value="All">{label}</option>
        {options.filter(o => o !== 'All').map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <span style={{
        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
        pointerEvents: 'none', color: COLORS.textMuted, fontSize: 10,
      }}>▼</span>
    </div>
  );

  return (
    <div className="card" style={{ padding: '16px 20px', marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 4 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textSecondary }}>Filters</span>
        </div>
        {FILTERS.map(f => <Dropdown key={f.key} label={f.key} options={f.options} />)}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
          <button
            onClick={clearAll}
            style={{
              padding: '9px 22px', borderRadius: 8,
              background: '#fff', color: COLORS.brand,
              border: `1.5px solid ${COLORS.brand}`,
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >Clear</button>
          <button
            onClick={apply}
            style={{
              padding: '9px 26px', borderRadius: 8,
              background: COLORS.brand, color: '#fff',
              border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >Search</button>
        </div>
      </div>
    </div>
  );
}

function AnonymityGate() {
  return (
    <div style={{
      background: COLORS.brandSoft,
      border: `2px dashed ${COLORS.brand}`,
      borderRadius: 14, padding: '64px 32px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 44, marginBottom: 12 }}>🔒</div>
      <h3 style={{ fontSize: 20, fontWeight: 800, color: COLORS.brand, marginBottom: 10 }}>
        Anonymity threshold not met
      </h3>
      <p style={{ fontSize: 14, color: COLORS.textSecondary, maxWidth: 460, margin: '0 auto', lineHeight: 1.5 }}>
        Need <strong>10+ responses</strong> to display data. Adjust filters to broaden the cohort.
      </p>
    </div>
  );
}

/* ---------- Tab strip ---------- */

const ANALYTICS_TABS = [
  { key: 'overview',      label: 'Overview' },
  { key: 'sentiment',     label: 'Sentiment' },
  { key: 'engagement',    label: 'Engagement' },
  { key: 'manager',       label: 'eNPS' },
  { key: 'attrition',     label: 'Attrition Risk' },
  { key: 'benchmarking',  label: 'Benchmarking' },
  { key: 'question',      label: 'Question-wise' },
  { key: 'participation', label: 'Participation' },
  { key: 'actions',       label: 'Actions & Nudges' },
];

const ANONYMITY_GATED_TABS = new Set(['sentiment', 'engagement', 'manager', 'attrition']);

function TabStrip({ active, setActive }) {
  return (
    <div style={{
      borderBottom: `1px solid ${COLORS.border}`,
      marginBottom: 20,
    }}>
      <div className="no-scrollbar" style={{
        display: 'flex', gap: 4, overflowX: 'auto',
      }}>
        {ANALYTICS_TABS.map(t => {
          const sel = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              style={{
                padding: '12px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: sel ? `2px solid ${COLORS.brand}` : '2px solid transparent',
                color: sel ? COLORS.brand : COLORS.textSecondary,
                fontSize: 13,
                fontWeight: sel ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                marginBottom: -1,
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, {
  SurveySelector, FilterBar, AnonymityGate,
  ANALYTICS_TABS, ANONYMITY_GATED_TABS, TabStrip,
});
