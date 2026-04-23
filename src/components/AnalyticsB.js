/* Analytics Dashboard tabs B: Attrition, Benchmarking, Question, Participation, Actions */

import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import { COLORS, QUESTIONS, KEYWORDS, ACTIONS, KANBAN_COLS } from '../data';
import { SectionHeader, KeywordCloud } from './AnalyticsA';
import { Avatar } from './Shell';

/* ---------- ATTRITION RISK TAB ---------- */

function AttritionTab({ survey }) {
  const riskDrivers = [
    { driver: 'Workload',          impact: 32 },
    { driver: 'Career growth',     impact: 26 },
    { driver: 'Compensation',      impact: 18 },
    { driver: 'Manager fit',       impact: 14 },
    { driver: 'Recognition',       impact: 10 },
  ];
  const distribution = [
    { name: 'Low Risk',    value: 78, color: COLORS.chartGreen },
    { name: 'Medium Risk', value: 17, color: COLORS.chartAmber },
    { name: 'High Risk',   value: 5,  color: COLORS.chartCoral },
  ];

  const riskCardStyle = (bg, color) => ({
    flex: 1, padding: '18px 22px',
    borderRadius: 14,
    background: bg,
    border: `1px solid ${color}40`,
  });

  const sevColor = (s) => s >= 7 ? COLORS.chartCoral : s >= 5 ? COLORS.chartAmber : COLORS.chartGreen;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        <div style={riskCardStyle('#F0FDF4', COLORS.chartGreen)}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#15803D', textTransform: 'uppercase', letterSpacing: 0.4 }}>Low Risk</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: '#15803D', marginTop: 6 }}>78%</div>
          <div style={{ fontSize: 12, color: '#15803D', fontWeight: 600, marginTop: 4 }}>~23,400 employees</div>
        </div>
        <div style={riskCardStyle('#FFFBEB', COLORS.chartAmber)}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#A16207', textTransform: 'uppercase', letterSpacing: 0.4 }}>Medium Risk</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: '#A16207', marginTop: 6 }}>17%</div>
          <div style={{ fontSize: 12, color: '#A16207', fontWeight: 600, marginTop: 4 }}>~5,100 employees</div>
        </div>
        <div style={riskCardStyle('#FEF2F2', COLORS.chartCoral)}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#B91C1C', textTransform: 'uppercase', letterSpacing: 0.4 }}>High Risk</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: '#B91C1C', marginTop: 6 }}>5%</div>
          <div style={{ fontSize: 12, color: '#B91C1C', fontWeight: 600, marginTop: 4 }}>~1,500 employees</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
        <div className="card" style={{ padding: '18px 22px' }}>
          <SectionHeader title="Risk Drivers" sub="Top 5 contributors to attrition risk · weighted impact" />
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={riskDrivers} layout="vertical" margin={{ top: 4, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                <XAxis type="number" stroke={COLORS.textMuted} fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => v + '%'} />
                <YAxis type="category" dataKey="driver" width={120} stroke={COLORS.textPrimary} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip formatter={(v) => `${v}% impact`} />
                <Bar dataKey="impact" fill={COLORS.chartCoral} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card" style={{ padding: '18px 22px' }}>
          <SectionHeader title="Risk Distribution" sub="Workforce-wide breakdown" />
          <div style={{ height: 240, position: 'relative' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={distribution} dataKey="value" innerRadius={50} outerRadius={85} paddingAngle={2} stroke="none">
                  {distribution.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800 }}>~1,500</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>high risk</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '18px 22px' }}>
        <SectionHeader title="At-Risk Cohorts" sub="Cohort-level only · individual employees never identified" />
        <table style={{ width: '100%', fontSize: 12, borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead>
            <tr style={{ fontSize: 10, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {['Cohort', 'Employees', 'Risk Score', 'Top Driver', ''].map((h, i) => (
                <th key={i} style={{ textAlign: i >= 1 && i <= 3 ? 'center' : 'left', padding: '8px 10px', fontWeight: 700, borderBottom: '1px solid ' + COLORS.border }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {survey.riskCohorts.map((c, i) => (
              <tr key={i} style={{ borderBottom: '1px solid ' + COLORS.border }}>
                <td style={{ padding: '12px 10px', fontWeight: 700, color: COLORS.textPrimary }}>{c.cohort}</td>
                <td style={{ padding: '12px 10px', textAlign: 'center', color: COLORS.textSecondary }}>{c.employees.toLocaleString()}</td>
                <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                  <span style={{ padding: '3px 10px', borderRadius: 6, background: sevColor(c.score) + '25', color: sevColor(c.score), fontWeight: 800, fontSize: 12 }}>
                    {c.score.toFixed(1)} / 10
                  </span>
                </td>
                <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                  <span style={{ padding: '3px 10px', borderRadius: 999, background: '#F3F4F6', color: COLORS.textPrimary, fontSize: 11, fontWeight: 600 }}>{c.driver}</span>
                </td>
                <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                  <button style={{ padding: '5px 12px', background: '#fff', border: `1.5px solid ${COLORS.brand}`, color: COLORS.brand, borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Action</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- BENCHMARKING TAB ---------- */

function BenchmarkingTab({ survey }) {
  const [sub, setSub] = useState('industry');
  const subs = [
    { k: 'industry',    label: 'Industry' },
    { k: 'size',        label: 'Company Size' },
    { k: 'geography',   label: 'Geography' },
    { k: 'other',       label: 'Other Clients', exclusive: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 6, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 0 }}>
        {subs.map(s => {
          const sel = sub === s.k;
          return (
            <button key={s.k} onClick={() => setSub(s.k)}
              style={{
                padding: '8px 14px', background: 'transparent', border: 'none',
                borderBottom: sel ? `2px solid ${COLORS.brand}` : '2px solid transparent',
                color: sel ? COLORS.brand : COLORS.textSecondary,
                fontSize: 13, fontWeight: sel ? 700 : 500, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6, marginBottom: -1,
              }}>
              {s.label}
              {s.exclusive && <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: COLORS.brand, color: '#fff', letterSpacing: 0.4 }}>EXCLUSIVE</span>}
            </button>
          );
        })}
      </div>

      <div className="card" style={{ padding: '20px 24px' }}>
        <SectionHeader title={`How You Compare · ${subs.find(s=>s.k===sub).label}`} sub="Northwind score with industry benchmark marker" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {survey.benchmarkData.map((b, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 80px', gap: 14, alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>{b.metric}</div>
              <div style={{ position: 'relative', height: 26, background: '#F3F4F6', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${b.us}%`, background: COLORS.brand, borderRadius: 6 }} />
                <div style={{ position: 'absolute', left: `${b.benchmark}%`, top: -4, bottom: -4, width: 2, background: COLORS.textPrimary }} />
                <div style={{ position: 'absolute', left: `${b.benchmark}%`, top: -16, transform: 'translateX(-50%)', fontSize: 9, fontWeight: 700, color: COLORS.textPrimary, whiteSpace: 'nowrap' }}>
                  ▼ {b.benchmark}
                </div>
                <div style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 11, fontWeight: 800, color: '#fff' }}>{b.us}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{
                  padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                  background: b.gap >= 0 ? '#DCFCE7' : '#FEE2E2',
                  color: b.gap >= 0 ? '#15803D' : '#B91C1C',
                }}>{b.gap >= 0 ? '+' : ''}{b.gap}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <div className="card" style={{ padding: '18px 22px' }}>
          <SectionHeader title="Percentile Ranking" sub="Where Northwind sits vs. all surveyed companies" />
          <div style={{ padding: '20px 8px' }}>
            <div style={{ position: 'relative', height: 22, borderRadius: 11,
              background: 'linear-gradient(90deg, #FCA5A5 0%, #FDE68A 50%, #86EFAC 100%)' }}>
              <div style={{ position: 'absolute', left: '78%', top: -6, bottom: -6, width: 3, background: COLORS.textPrimary, borderRadius: 2 }} />
              <div style={{ position: 'absolute', left: '78%', top: -26, transform: 'translateX(-50%)', fontSize: 12, fontWeight: 800, color: COLORS.textPrimary, whiteSpace: 'nowrap' }}>
                78th ▼
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: COLORS.textMuted, fontWeight: 600 }}>
              <span>0th</span><span>25th</span><span>50th</span><span>75th</span><span>100th</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '18px 22px' }}>
          <SectionHeader title="Summary" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Outperforming', n: survey.benchmarkData.filter(b => b.gap >= 3).length, color: COLORS.chartGreen, bg: '#F0FDF4' },
              { label: 'At par',        n: survey.benchmarkData.filter(b => Math.abs(b.gap) < 3).length, color: COLORS.chartAmber, bg: '#FFFBEB' },
              { label: 'Below benchmark', n: survey.benchmarkData.filter(b => b.gap <= -3).length, color: COLORS.chartCoral, bg: '#FEF2F2' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 9, background: r.bg }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.color }} />
                <span style={{ fontSize: 13, color: COLORS.textPrimary, fontWeight: 600, flex: 1 }}>{r.label}</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: r.color }}>{r.n}</span>
                <span style={{ fontSize: 11, color: COLORS.textMuted }}>metrics</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- QUESTION-WISE TAB ---------- */

function QuestionTab({ survey }) {
  const [idx, setIdx] = useState(0);
  const qs = QUESTIONS[survey.key];
  const q = qs[idx];

  useEffect(() => { setIdx(0); }, [survey.key]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0}
          style={{ width: 32, height: 32, borderRadius: 8, background: '#fff', border: `1px solid ${COLORS.border}`, cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.4 : 1, fontSize: 16 }}>‹</button>
        <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.textPrimary }}>Question {idx + 1} / {qs.length}</span>
        <button onClick={() => setIdx(i => Math.min(qs.length - 1, i + 1))} disabled={idx === qs.length - 1}
          style={{ width: 32, height: 32, borderRadius: 8, background: '#fff', border: `1px solid ${COLORS.border}`, cursor: idx === qs.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === qs.length - 1 ? 0.4 : 1, fontSize: 16 }}>›</button>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: COLORS.textMuted }}>{survey.respondents.toLocaleString()} responses</div>
      </div>

      <div style={{ padding: '20px 24px', background: '#F9FAFB', border: `1px solid ${COLORS.border}`, borderRadius: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>Question</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1.4 }}>{q.q}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 16 }}>
        <div className="card" style={{ padding: '18px 22px' }}>
          <SectionHeader title="Response Distribution" />
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ width: 180, height: 180, position: 'relative' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={q.donut.map(d => ({ name: d.name, value: d.v }))} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={2} stroke="none">
                    {q.donut.map((d, i) => <Cell key={i} fill={d.c} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800 }}>{q.donut[0].v}%</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>positive</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {q.donut.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: d.c }} />
                  <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{d.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{d.v}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '18px 22px' }}>
          <SectionHeader title="Keyword Cloud" sub="Top themes in free-text answers" />
          <KeywordCloud words={KEYWORDS[survey.key].slice(0, 10)} />
        </div>
      </div>

      <div className="card" style={{ padding: '18px 22px' }}>
        <SectionHeader title="Verbatim Responses" sub="Sample of 3 annotated quotes" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {survey.verbatims.slice(0, 3).map((v, i) => (
            <div key={i} style={{
              padding: '12px 14px',
              borderRadius: 10,
              background: v.sentiment === 'pos' ? '#F0FDF4' : '#FFF1F2',
              border: `1px solid ${v.sentiment === 'pos' ? '#BBF7D0' : '#FECDD3'}`,
            }}>
              <div style={{ fontSize: 13, lineHeight: 1.5, fontStyle: 'italic' }}>"{v.text}"</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                {v.tags.map((t, j) => (
                  <span key={j} style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: '#fff', color: v.sentiment === 'pos' ? '#15803D' : '#B91C1C', border: `1px solid ${v.sentiment === 'pos' ? '#BBF7D0' : '#FECDD3'}` }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- PARTICIPATION TAB ---------- */

function ParticipationTab({ survey }) {
  const totalInvited = survey.invited;
  const totalResp = survey.respondents;
  const pct = Math.round((totalResp / totalInvited) * 100);

  const donut = [
    { name: 'Responded', value: pct, color: COLORS.brand },
    { name: 'No response', value: 100 - pct, color: '#E5E7EB' },
  ];

  const rateColor = (p) => p >= 85 ? '#15803D' : p >= 75 ? '#A16207' : '#B91C1C';
  const rateBg = (p) => p >= 85 ? '#DCFCE7' : p >= 75 ? '#FEF3C7' : '#FEE2E2';
  const statusDot = (s) => ({ ok: COLORS.chartGreen, warn: COLORS.chartAmber, bad: COLORS.chartCoral }[s]);

  const [channels, setChannels] = useState({ email: true, whatsapp: true, inapp: false });
  const [nudgeTargets, setNudgeTargets] = useState(['APAC CS', 'Sales Americas']);
  const [nudgeMsg, setNudgeMsg] = useState('Hi team — we have 4 days left to complete the ' + survey.short + '. Your feedback directly shapes what we act on. Takes ~5 minutes.');

  useEffect(() => {
    setNudgeMsg('Hi team — we have 4 days left to complete the ' + survey.short + '. Your feedback directly shapes what we act on. Takes ~5 minutes.');
  }, [survey.key, survey.short]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
        <div className="card" style={{ padding: '18px 22px' }}>
          <SectionHeader title="Overall Participation" />
          <div style={{ height: 220, position: 'relative' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={donut} dataKey="value" innerRadius={60} outerRadius={88} paddingAngle={2} stroke="none">
                  {donut.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: COLORS.brand }}>{pct}%</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600 }}>{totalResp.toLocaleString()} / {totalInvited.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '18px 22px' }}>
          <SectionHeader title="Participation by Cohort" sub="BU · Geography breakdown" />
          <table style={{ width: '100%', fontSize: 12, borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ fontSize: 10, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {['BU', 'Geo', 'Invited', 'Responded', 'Rate', ''].map((h, i) => (
                  <th key={i} style={{ textAlign: i >= 2 && i <= 4 ? 'center' : 'left', padding: '8px 10px', fontWeight: 700, borderBottom: '1px solid ' + COLORS.border }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {survey.participation.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid ' + COLORS.border }}>
                  <td style={{ padding: '11px 10px', fontWeight: 700, color: COLORS.textPrimary }}>{p.bu}</td>
                  <td style={{ padding: '11px 10px', color: COLORS.textSecondary }}>{p.geo}</td>
                  <td style={{ padding: '11px 10px', textAlign: 'center', color: COLORS.textSecondary }}>{p.invited.toLocaleString()}</td>
                  <td style={{ padding: '11px 10px', textAlign: 'center', fontWeight: 600 }}>{p.responded.toLocaleString()}</td>
                  <td style={{ padding: '11px 10px', textAlign: 'center' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 6, background: rateBg(p.pct), color: rateColor(p.pct), fontWeight: 800, fontSize: 12 }}>
                      {p.pct}%
                    </span>
                  </td>
                  <td style={{ padding: '11px 10px', textAlign: 'center' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: statusDot(p.status), display: 'inline-block' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ padding: '18px 22px' }}>
        <SectionHeader title="Nudge Composer" sub="Push reminders to lagging cohorts" right={
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: '8px 14px', background: '#fff', border: `1.5px solid ${COLORS.brand}`, color: COLORS.brand, borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Schedule</button>
            <button style={{ padding: '8px 14px', background: COLORS.brand, border: 'none', color: '#fff', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Send Now</button>
          </div>
        } />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 }}>Target group</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['APAC CS', 'Sales Americas', 'India Delivery', 'EMEA Engineering', 'L4+ Only', 'New Hires'].map(t => {
                const on = nudgeTargets.includes(t);
                return (
                  <button key={t} onClick={() => setNudgeTargets(nt => on ? nt.filter(x => x !== t) : [...nt, t])}
                    style={{
                      padding: '5px 12px', borderRadius: 999,
                      border: on ? `1.5px solid ${COLORS.brand}` : `1px solid ${COLORS.border}`,
                      background: on ? COLORS.brandSoft : '#fff',
                      color: on ? COLORS.brand : COLORS.textSecondary,
                      fontSize: 12, fontWeight: on ? 700 : 500, cursor: 'pointer',
                    }}>{on && '✓ '}{t}</button>
                );
              })}
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.4, margin: '16px 0 8px' }}>Channels</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { k: 'email', label: 'Email' },
                { k: 'whatsapp', label: 'WhatsApp' },
                { k: 'inapp', label: 'In-app notification' },
              ].map(c => (
                <label key={c.k} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13 }}>
                  <input type="checkbox" checked={channels[c.k]} onChange={() => setChannels(ch => ({ ...ch, [c.k]: !ch[c.k] }))} />
                  <span>{c.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 }}>Message</div>
            <textarea
              value={nudgeMsg}
              onChange={e => setNudgeMsg(e.target.value)}
              rows={7}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 9,
                border: `1px solid ${COLORS.border}`, fontSize: 13, lineHeight: 1.5,
                color: COLORS.textPrimary, resize: 'vertical',
              }}
            />
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 6 }}>
              Estimated reach: ~{nudgeTargets.length * 1200} employees · {Object.values(channels).filter(Boolean).length} channels
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- ACTIONS & NUDGES (Kanban) ---------- */

function ActionsTab() {
  const priColor = (p) => p === 'high' ? COLORS.chartCoral : p === 'medium' ? COLORS.chartAmber : COLORS.chartGreen;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Action items & nudges</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>6 active · 1 closed · sourced from surveys and Connect threads</div>
        </div>
        <div style={{ flex: 1 }} />
        <button style={{ padding: '9px 16px', background: '#fff', border: `1.5px solid ${COLORS.brand}`, color: COLORS.brand, borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Export</button>
        <button style={{ padding: '9px 16px', background: COLORS.brand, border: 'none', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ New Action</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {KANBAN_COLS.map(col => {
          const cards = ACTIONS.filter(a => a.col === col.key);
          return (
            <div key={col.key} className="kanban-col" style={{
              background: col.bg, borderRadius: 12, padding: 12,
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 4px 8px' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: COLORS.textPrimary }}>{col.title}</div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 999, background: '#fff', color: COLORS.textSecondary }}>{cards.length}</span>
              </div>
              {cards.map((a, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: 10, padding: '12px 14px',
                  borderLeft: `4px solid ${priColor(a.priority)}`,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1.35, marginBottom: 8 }}>
                    {a.title}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.brand, fontWeight: 600, marginBottom: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    {a.source}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar initials={a.owner} size={24} bg={COLORS.chartViolet} />
                    <span style={{ fontSize: 11, color: COLORS.textSecondary, fontWeight: 600, flex: 1 }}>Due {a.due}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: '#F3F4F6', color: COLORS.textSecondary }}>
                      {a.cohort}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export {
  AttritionTab, BenchmarkingTab, QuestionTab, ParticipationTab, ActionsTab,
};