/* Analytics Dashboard tabs A: Overview, Sentiment, Engagement, Manager */

const R = window.Recharts;
const {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} = R;

/* ---------- KPI card ---------- */

function KpiCard({ label, value, unit, delta, accent, sublabel, deltaUnit = 'pts' }) {
  return (
    <div className="card" style={{
      padding: '18px 20px',
      borderLeft: `4px solid ${accent}`,
      flex: 1, minWidth: 0,
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: 0.4 }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
        <span style={{ fontSize: 32, fontWeight: 800, color: COLORS.textPrimary, letterSpacing: -0.8 }}>
          {value}
        </span>
        {unit && <span style={{ fontSize: 14, color: COLORS.textMuted, fontWeight: 600 }}>{unit}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
        <Delta value={delta} unit={deltaUnit} />
        {sublabel && <span style={{ fontSize: 11, color: COLORS.textMuted }}>{sublabel}</span>}
      </div>
    </div>
  );
}

/* ---------- Typewriter ---------- */

function Typewriter({ text, speed = 14, deps = [] }) {
  const [shown, setShown] = React.useState('');
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    setShown('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, deps);

  return (
    <span className={done ? '' : 'type-cursor'}>{shown}</span>
  );
}

/* ---------- Org tree ---------- */

function OrgNode({ node, depth = 0, defaultOpen = true }) {
  const [open, setOpen] = React.useState(depth < 1 ? true : defaultOpen);
  const hasChildren = node.children && node.children.length > 0;
  const color = node.score >= 7.5 ? COLORS.chartGreen : node.score >= 7 ? COLORS.chartAmber : COLORS.chartCoral;

  return (
    <div style={{ marginLeft: depth * 16 }}>
      <div
        onClick={() => hasChildren && setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '7px 10px', borderRadius: 8,
          cursor: hasChildren ? 'pointer' : 'default',
          background: depth === 0 ? '#F9FAFB' : 'transparent',
        }}
      >
        {hasChildren ? (
          <span style={{ fontSize: 10, color: COLORS.textMuted, width: 12, transition: 'transform .15s', transform: open ? 'rotate(90deg)' : 'none' }}>▶</span>
        ) : <span style={{ width: 12 }} />}
        <span style={{ fontSize: 13, fontWeight: depth === 0 ? 700 : 500, color: COLORS.textPrimary, flex: 1 }}>
          {node.name}
        </span>
        {node.warn && <span style={{ color: COLORS.chartAmber, fontSize: 13 }}>⚠</span>}
        <span style={{
          fontSize: 12, fontWeight: 700, color: '#fff',
          background: color, padding: '2px 8px', borderRadius: 6,
        }}>{node.score.toFixed(1)}</span>
      </div>
      {hasChildren && open && (
        <div>{node.children.map((c, i) => <OrgNode key={i} node={c} depth={depth + 1} />)}</div>
      )}
    </div>
  );
}

/* ---------- Heatmap ---------- */

function attritionColor(v) {
  if (v <= 3) return { bg: '#DCFCE7', color: '#15803D' };
  if (v <= 5) return { bg: '#FEF3C7', color: '#A16207' };
  if (v <= 7) return { bg: '#FED7AA', color: '#C2410C' };
  return { bg: '#FECACA', color: '#B91C1C' };
}

function AttritionHeatmap({ data }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 4, fontSize: 12 }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '6px 8px', color: COLORS.textMuted, fontWeight: 700, fontSize: 11, textTransform: 'uppercase' }}></th>
          <th style={{ textAlign: 'center', padding: '6px 8px', color: COLORS.textMuted, fontWeight: 700, fontSize: 11, textTransform: 'uppercase' }}>APAC</th>
          <th style={{ textAlign: 'center', padding: '6px 8px', color: COLORS.textMuted, fontWeight: 700, fontSize: 11, textTransform: 'uppercase' }}>EMEA</th>
          <th style={{ textAlign: 'center', padding: '6px 8px', color: COLORS.textMuted, fontWeight: 700, fontSize: 11, textTransform: 'uppercase' }}>Americas</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td style={{ padding: '7px 8px', fontWeight: 600, color: COLORS.textPrimary }}>{row.bu}</td>
            {['apac', 'emea', 'amer'].map(region => {
              const v = row[region];
              const { bg, color } = attritionColor(v);
              return (
                <td key={region} style={{
                  textAlign: 'center', padding: '8px 6px',
                  background: bg, color,
                  borderRadius: 6, fontWeight: 700,
                }}>{v.toFixed(1)}%</td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------- Section title ---------- */

function SectionHeader({ title, sub, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 12 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

/* ---------- OVERVIEW TAB ---------- */

function OverviewTab({ survey }) {
  const trend = survey.engagementTrend;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* AI Executive Summary */}
      <div className="card fade-up" style={{
        padding: '20px 24px',
        borderLeft: `3px solid ${COLORS.chartViolet}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{
            display: 'inline-grid', placeItems: 'center',
            width: 30, height: 30, borderRadius: 8,
            background: '#F3E8FF', color: COLORS.chartViolet,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8 19 13M15 9h0M17.8 6.2 19 5M3 21l9-9M12.2 6.2 11 5"/></svg>
          </span>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary }}>AI Executive Summary</div>
          <div style={{ marginLeft: 'auto', fontSize: 12, color: COLORS.textMuted }}>Generated 2 hours ago</div>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.65, color: COLORS.textPrimary, minHeight: 90 }}>
          <Typewriter text={survey.aiText} deps={[survey.key]} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {survey.aiTags.map((t, i) => (
            <span
              key={i}
              style={{
                padding: '5px 10px', borderRadius: 999,
                background: t.type === 'pos' ? '#DCFCE7' : '#FEE2E2',
                color: t.type === 'pos' ? '#15803D' : '#B91C1C',
                fontSize: 11, fontWeight: 600,
              }}
            >{t.type === 'pos' ? '✓' : '!'} {t.label}</span>
          ))}
        </div>
      </div>

      {/* 4 KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        <KpiCard label="Engagement Score" value={survey.kpis.engagement.value} unit={survey.kpis.engagement.unit} delta={survey.kpis.engagement.delta} accent="#818CF8" deltaUnit="" sublabel="vs. last period" />
        <KpiCard label="Sentiment" value={survey.kpis.sentiment.value} unit={survey.kpis.sentiment.unit} delta={survey.kpis.sentiment.delta} accent="#FCA5A5" deltaUnit="pct" sublabel="positive rate" />
        <KpiCard label="eNPS" value={survey.kpis.enps.value} unit="" delta={survey.kpis.enps.delta} accent="#6EE7B7" deltaUnit="pts" sublabel="vs. last period" />
        <KpiCard label="Participation" value={survey.kpis.participation.value} unit="" delta={survey.kpis.participation.delta} accent="#7DD3FC" deltaUnit="pct" sublabel={survey.kpis.participation.raw} />
      </div>

      {/* Two-column */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: '18px 22px' }}>
            <SectionHeader title="Engagement Trend" sub={`Last ${trend.length} periods · vs. industry benchmark`} />
            <div style={{ height: 220 }}>
              <ResponsiveContainer>
                <LineChart data={trend} margin={{ top: 8, right: 16, left: -12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="month" stroke={COLORS.textMuted} fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis domain={[6.5, 8]} stroke={COLORS.textMuted} fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} iconType="line" />
                  <Line type="monotone" dataKey="score" name="Northwind" stroke={COLORS.brand} strokeWidth={2.5} dot={{ r: 4, fill: COLORS.brand }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="benchmark" name="Benchmark" stroke={COLORS.textMuted} strokeWidth={2} strokeDasharray="5 4" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card" style={{ padding: '18px 22px' }}>
            <SectionHeader title="Engagement Drivers" sub="Positive / neutral / negative breakdown across top 5 themes" />
            <div style={{ height: 230 }}>
              <ResponsiveContainer>
                <BarChart data={survey.drivers} layout="vertical" margin={{ top: 4, right: 20, left: 20, bottom: 0 }} stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                  <XAxis type="number" tickFormatter={v => Math.round(v * 100) + '%'} stroke={COLORS.textMuted} fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="theme" width={120} stroke={COLORS.textPrimary} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip formatter={(v, n) => [`${v}%`, n]} />
                  <Bar dataKey="positive" stackId="a" fill={COLORS.chartGreen} name="Positive" radius={[4, 0, 0, 4]} />
                  <Bar dataKey="neutral"  stackId="a" fill={COLORS.chartAmber} name="Neutral" />
                  <Bar dataKey="negative" stackId="a" fill={COLORS.chartCoral} name="Negative" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: '18px 22px' }}>
            <SectionHeader title="Attrition Risk Heatmap" sub="BU × Region · voluntary attrition rate" />
            <AttritionHeatmap data={ATTRITION_HEATMAP[survey.key]} />
            <div style={{ display: 'flex', gap: 10, marginTop: 12, fontSize: 11, color: COLORS.textMuted, flexWrap: 'wrap' }}>
              <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: '#DCFCE7', marginRight: 4 }} /> ≤3%</span>
              <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: '#FEF3C7', marginRight: 4 }} /> ≤5%</span>
              <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: '#FED7AA', marginRight: 4 }} /> ≤7%</span>
              <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: '#FECACA', marginRight: 4 }} /> &gt;7%</span>
            </div>
          </div>

          <div className="card" style={{ padding: '18px 22px' }}>
            <SectionHeader title="Org Drill-down" sub="Engagement scores by level · click to expand" />
            <OrgNode node={ORG_TREE[survey.key]} />
          </div>

          <div className="card" style={{ padding: '16px 22px' }}>
            <SectionHeader title="Quick Actions" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Send Nudge to APAC CS', icon: '📣' },
                { label: 'Create Action Item', icon: '＋' },
                { label: 'Export Report (PDF)', icon: '↓' },
              ].map((a, i) => (
                <button key={i}
                  style={{
                    padding: '10px 14px', borderRadius: 9,
                    background: '#fff', border: `1.5px solid ${COLORS.brand}`,
                    color: COLORS.brand, fontSize: 13, fontWeight: 700,
                    cursor: 'pointer', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <span>{a.icon}</span> {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- SENTIMENT TAB ---------- */

function KeywordCloud({ words }) {
  const max = Math.max(...words.map(w => w.c));
  const min = Math.min(...words.map(w => w.c));
  const sizeOf = c => 14 + ((c - min) / Math.max(1, max - min)) * 8;
  const color = s => s === 'pos' ? COLORS.chartGreen : s === 'neg' ? COLORS.chartCoral : COLORS.chartAmber;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 14px', alignItems: 'center', padding: '8px 0' }}>
      {words.map((w, i) => (
        <span
          key={i}
          title={`${w.c} mentions`}
          style={{
            fontSize: sizeOf(w.c),
            fontWeight: 700,
            color: color(w.s),
            cursor: 'default',
            transition: 'transform .15s',
            lineHeight: 1.2,
          }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.target.style.transform = 'none'}
        >
          {w.w}
        </span>
      ))}
    </div>
  );
}

function SentimentTab({ survey }) {
  const donut = [
    { name: 'Positive', value: survey.sentimentTrend[survey.sentimentTrend.length-1].positive, color: COLORS.chartGreen },
    { name: 'Neutral',  value: survey.sentimentTrend[survey.sentimentTrend.length-1].neutral,  color: COLORS.chartAmber },
    { name: 'Negative', value: survey.sentimentTrend[survey.sentimentTrend.length-1].negative, color: COLORS.chartCoral },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 16 }}>
        <div className="card" style={{ padding: '18px 22px' }}>
          <SectionHeader title="Overall Sentiment" sub="Distribution across all responses" />
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ width: 180, height: 180, position: 'relative' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={donut} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={2} stroke="none">
                    {donut.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.textPrimary }}>{donut[0].value}%</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>positive</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {donut.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: d.color }} />
                  <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{d.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.textPrimary }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '18px 22px' }}>
          <SectionHeader title="Keyword Cloud" sub="Top themes in verbatim responses · hover for count" />
          <KeywordCloud words={KEYWORDS[survey.key]} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card" style={{ padding: '18px 22px' }}>
          <SectionHeader title="Sentiment by Theme" sub="% distribution across 5 engagement drivers" />
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={survey.drivers} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="theme" stroke={COLORS.textMuted} fontSize={10} tickLine={false} axisLine={false} interval={0} />
                <YAxis stroke={COLORS.textMuted} fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip formatter={(v, n) => [`${v}%`, n]} />
                <Bar dataKey="positive" stackId="a" fill={COLORS.chartGreen} name="Positive" />
                <Bar dataKey="neutral"  stackId="a" fill={COLORS.chartAmber} name="Neutral" />
                <Bar dataKey="negative" stackId="a" fill={COLORS.chartCoral} name="Negative" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ padding: '18px 22px' }}>
          <SectionHeader title="Sentiment Trend" sub="Positive / neutral / negative over time" />
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <LineChart data={survey.sentimentTrend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="month" stroke={COLORS.textMuted} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke={COLORS.textMuted} fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip formatter={(v) => `${v}%`} />
                <Legend wrapperStyle={{ fontSize: 12 }} iconType="line" />
                <Line type="monotone" dataKey="positive" stroke={COLORS.chartGreen} strokeWidth={2.5} dot={{ r: 3 }} name="Positive" />
                <Line type="monotone" dataKey="neutral"  stroke={COLORS.chartAmber} strokeWidth={2} dot={{ r: 3 }} name="Neutral" />
                <Line type="monotone" dataKey="negative" stroke={COLORS.chartCoral} strokeWidth={2} dot={{ r: 3 }} name="Negative" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '18px 22px' }}>
        <SectionHeader title="Verbatim Responses" sub={`${survey.verbatims.length} annotated quotes · employee identity masked`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {survey.verbatims.map((v, i) => (
            <div key={i} style={{
              padding: '12px 14px',
              borderRadius: 10,
              background: v.sentiment === 'pos' ? '#F0FDF4' : '#FFF1F2',
              border: `1px solid ${v.sentiment === 'pos' ? '#BBF7D0' : '#FECDD3'}`,
            }}>
              <div style={{ fontSize: 13, color: COLORS.textPrimary, lineHeight: 1.5, fontStyle: 'italic' }}>
                "{v.text}"
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                {v.tags.map((t, j) => (
                  <span key={j} style={{
                    fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
                    background: '#fff',
                    color: v.sentiment === 'pos' ? '#15803D' : '#B91C1C',
                    border: `1px solid ${v.sentiment === 'pos' ? '#BBF7D0' : '#FECDD3'}`,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- ENGAGEMENT TAB ---------- */

function EngagementTab({ survey }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="card" style={{ padding: '18px 22px' }}>
        <SectionHeader title="Engagement Trend" sub="Northwind vs. industry benchmark" />
        <div style={{ height: 240 }}>
          <ResponsiveContainer>
            <LineChart data={survey.engagementTrend} margin={{ top: 8, right: 16, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" stroke={COLORS.textMuted} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={[6.5, 8]} stroke={COLORS.textMuted} fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} iconType="line" />
              <Line type="monotone" dataKey="score" name="Northwind" stroke={COLORS.brand} strokeWidth={3} dot={{ r: 5, fill: COLORS.brand }} activeDot={{ r: 7 }} />
              <Line type="monotone" dataKey="benchmark" name="Benchmark" stroke={COLORS.textMuted} strokeWidth={2} strokeDasharray="5 4" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
        <div className="card" style={{ padding: '18px 22px' }}>
          <SectionHeader title="Engagement Drivers" sub="Breakdown across top 5 themes" />
          <div style={{ height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={survey.drivers} layout="vertical" margin={{ top: 4, right: 20, left: 20, bottom: 0 }} stackOffset="expand">
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                <XAxis type="number" tickFormatter={v => Math.round(v * 100) + '%'} stroke={COLORS.textMuted} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="theme" width={130} stroke={COLORS.textPrimary} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip formatter={(v, n) => [`${v}%`, n]} />
                <Bar dataKey="positive" stackId="a" fill={COLORS.chartGreen} name="Positive" radius={[4, 0, 0, 4]} />
                <Bar dataKey="neutral"  stackId="a" fill={COLORS.chartAmber} name="Neutral" />
                <Bar dataKey="negative" stackId="a" fill={COLORS.chartCoral} name="Negative" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ padding: '18px 22px' }}>
          <SectionHeader title="Org Drill-down" sub="Engagement score by level · click to expand" />
          <OrgNode node={ORG_TREE[survey.key]} />
        </div>
      </div>
    </div>
  );
}

/* ---------- eNPS TAB ---------- */

const ENPS_THEMES = [
  { key: 'pwe',  label: 'Positive Work Environment',        value: 30, color: '#2FB8F5' },
  { key: 'smt',  label: 'Supportive Management and Team',   value: 20, color: '#6B6BE0' },
  { key: 'cgo',  label: 'Career Growth and Opportunities',  value: 15, color: '#2BCB94' },
  { key: 'wlb',  label: 'Work-Life Balance',                value: 10, color: '#F08A5D' },
  { key: 'cti',  label: 'Communication and Transparency Issues', value: 10, color: '#7E89B1' },
  { key: 'cbc',  label: 'Compensation and Benefits Concerns',    value: 10, color: '#D46AD4' },
  { key: 'its',  label: 'IT and Technical Support Issues',   value:  5, color: '#B58CE8' },
];

const ENPS_VERBATIMS = {
  pwe: [
    'I rated the organization a 10 because the work environment is generally positive and professional.',
    'The company fosters a collaborative and respectful environment where employees feel valued and supported.',
    'The atmosphere of our company is feeling best for us.',
    'The organization provides a positive work environment and effective processes.',
    'Very good work environment',
  ],
  smt: [
    'My manager genuinely invests in my development and gives constructive feedback.',
    'Team meetings are productive, inclusive, and everyone\'s voice is heard.',
    'Leadership is approachable and responsive to concerns raised in 1:1s.',
    'I feel backed by my manager during tough client escalations.',
  ],
  cgo: [
    'The learning budget and internal mobility program have opened real career paths.',
    'I\'ve been promoted twice in three years based on merit, not politics.',
    'More clarity on promotion criteria would help me plan my growth.',
  ],
  wlb: [
    'Hybrid policy genuinely respects my personal time.',
    'Workload has spiked on the payments pod and recovery time feels short.',
    'Managers encourage us to log off on weekends.',
  ],
  cti: [
    'Leadership decisions sometimes arrive without context \u2014 we hear them third-hand.',
    'Town halls are helpful but Q&A is too controlled to feel candid.',
  ],
  cbc: [
    'Compensation has fallen behind market for senior ICs.',
    'Benefits are solid but cash comp review cycle feels slow.',
  ],
  its: [
    'VPN and SSO outages still disrupt a full day of work every few weeks.',
    'Laptop refresh cycle is overdue for the engineering org.',
  ],
};

const ENPS_KEYWORDS = [
  { w: 'supportive colleagues',     c: 280, s: 'pos' },
  { w: 'training and development',  c: 260, s: 'pos' },
  { w: 'learning opportunities',    c: 240, s: 'pos' },
  { w: 'growth opportunities',      c: 230, s: 'pos' },
  { w: 'team collaboration',        c: 220, s: 'pos' },
  { w: 'flexibility',               c: 200, s: 'pos' },
  { w: 'friendly environment',      c: 190, s: 'pos' },
  { w: 'job security',              c: 180, s: 'pos' },
  { w: 'communication',             c: 170, s: 'neu' },
  { w: 'work-life balance',         c: 170, s: 'pos' },
  { w: 'career growth',             c: 160, s: 'pos' },
  { w: 'work culture',              c: 155, s: 'pos' },
  { w: 'supportive leadership',     c: 150, s: 'pos' },
  { w: 'salary',                    c: 140, s: 'neu' },
  { w: 'positive atmosphere',       c: 130, s: 'pos' },
  { w: 'employee recognition',      c: 120, s: 'pos' },
  { w: 'work pressure',             c: 115, s: 'neg' },
  { w: 'management support',        c: 110, s: 'pos' },
  { w: 'professional growth',       c: 100, s: 'pos' },
  { w: 'innovation',                c:  90, s: 'pos' },
];

function ManagerTab({ survey }) {
  const [selectedTheme, setSelectedTheme] = React.useState('pwe');
  const [chartType, setChartType] = React.useState('All Data');

  const score = 42.24;
  const dist = [
    { name: 'Promoters',  value: 55.47, pct: 55, color: COLORS.chartGreen },
    { name: 'Passives',   value: 31.30, pct: 31, color: COLORS.chartCoral },
    { name: 'Detractors', value: 13.23, pct: 13, color: COLORS.chartAmber },
  ];

  const activeTheme = ENPS_THEMES.find(t => t.key === selectedTheme);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: COLORS.textPrimary, letterSpacing: -0.3 }}>eNPS Analysis</h2>
        <div style={{ position: 'relative' }}>
          <select
            value={chartType}
            onChange={e => setChartType(e.target.value)}
            style={{
              appearance: 'none', WebkitAppearance: 'none',
              padding: '9px 36px 9px 16px',
              background: '#fff',
              border: `1px solid ${COLORS.border}`,
              borderRadius: 8, fontSize: 13, fontWeight: 500,
              color: COLORS.textSecondary, cursor: 'pointer',
              minWidth: 160, fontFamily: 'inherit',
            }}
          >
            <option>All Data</option>
            <option>By Business Unit</option>
            <option>By Tenure</option>
            <option>By Location</option>
          </select>
          <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: COLORS.textMuted, fontSize: 10 }}>▼</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Score & Distribution */}
        <div className="card" style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.textPrimary }}>eNPS - Score &amp; Distribution</div>
          <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 4 }}>
            eNPS Score : <strong style={{ color: COLORS.textPrimary }}>{score}</strong>
          </div>
          <div style={{ height: 280, marginTop: 8 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={dist}
                  dataKey="value"
                  nameKey="name"
                  cx="50%" cy="50%"
                  outerRadius={105}
                  label={({ pct }) => `${pct}%`}
                  labelLine={{ stroke: COLORS.textMuted, strokeWidth: 1 }}
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {dist.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(v, n) => [`${v}%`, n]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginTop: 8, fontSize: 12 }}>
            {dist.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: d.color, display: 'inline-block' }} />
                <span style={{ color: COLORS.textSecondary }}>{d.name}:</span>
                <span style={{ fontWeight: 700, color: d.color }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sentimental Keywords */}
        <div className="card" style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 14 }}>Sentimental Keywords</div>
          <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '8px 14px', padding: '0 8px' }}>
            {ENPS_KEYWORDS.map((k, i) => {
              const palette = ['#2B7FE0', '#E04B6A', '#2BCB94', '#E08A2B', '#9C3FC9', '#C92BB1', '#2BB4CB', '#6B6BE0'];
              const color = palette[i % palette.length];
              const size = 12 + (k.c - 90) * 0.05;
              const rotate = i % 4 === 0 ? 'rotate(-90deg)' : 'none';
              return (
                <span key={k.w} style={{
                  fontSize: Math.max(12, Math.min(22, size)),
                  fontWeight: 700,
                  color,
                  transform: rotate,
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.4,
                }}>{k.w}</span>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Thematic Analysis donut */}
        <div className="card" style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 8 }}>eNPS - Thematic Analysis</div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={ENPS_THEMES}
                  dataKey="value"
                  nameKey="label"
                  cx="50%" cy="50%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={1}
                  stroke="#fff"
                  strokeWidth={2}
                  label={({ value }) => `${value.toFixed(1)}%`}
                  labelLine={{ stroke: COLORS.textMuted, strokeWidth: 1 }}
                  onClick={(d) => setSelectedTheme(d.key)}
                >
                  {ENPS_THEMES.map((d, i) => <Cell key={i} fill={d.color} cursor="pointer" />)}
                </Pie>
                <Tooltip formatter={(v, n) => [`${v}%`, n]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 18px', marginTop: 4, fontSize: 12 }}>
            {ENPS_THEMES.map(t => {
              const sel = t.key === selectedTheme;
              return (
                <button
                  key={t.key}
                  onClick={() => setSelectedTheme(t.key)}
                  style={{
                    background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    color: sel ? t.color : COLORS.textSecondary,
                    fontWeight: sel ? 700 : 500,
                    textDecoration: sel ? 'underline' : 'none',
                    fontFamily: 'inherit', fontSize: 12,
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: t.color, display: 'inline-block' }} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Verbatims panel */}
        <div style={{ padding: '8px 4px' }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 18, letterSpacing: -0.2 }}>
            {activeTheme?.label}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {(ENPS_VERBATIMS[selectedTheme] || []).map((v, i) => (
              <div key={i} style={{
                padding: '14px 16px',
                background: '#E6F4F5',
                borderRadius: 6,
                fontSize: 13,
                color: COLORS.textPrimary,
                lineHeight: 1.5,
              }}>{v}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  KpiCard, Typewriter, OrgNode, AttritionHeatmap, attritionColor,
  SectionHeader, KeywordCloud,
  OverviewTab, SentimentTab, EngagementTab, ManagerTab,
});
