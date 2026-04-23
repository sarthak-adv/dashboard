/* Northwind Survey Platform — Hardcoded data */

export const COLORS = {
  bgCanvas: '#FAFBFC',
  bgCard: '#FFFFFF',
  border: '#E5E7EB',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  brand: '#1A8B96',
  brandSoft: '#E6F4F5',
  brandDark: '#136870',
  chartGreen: '#22C55E',
  chartCoral: '#FB7185',
  chartAmber: '#F59E0B',
  chartBlue: '#3B82F6',
  chartViolet: '#8B5CF6',
};

export const PERSONAS = [
  { id: 'sbu', label: 'SBU Head', name: 'Anita Rao', initials: 'AR' },
  { id: 'seg', label: 'Segment / Delivery Head', name: 'Vikram Iyer', initials: 'VI' },
  { id: 'hr', label: 'BU HR Admin', name: 'Sana Khan', initials: 'SK' },
  { id: 'am', label: 'Account Manager', name: 'Tom Wilson', initials: 'TW' },
];

export const FILTER_ROW_1 = ['Geography', 'Country', 'Business Unit', 'SBU', 'Segment', 'Function/Dept', 'Team/Project'];
export const FILTER_ROW_2 = ['Manager', 'Role/Grade', 'Tenure', 'Employment Type', 'Work Status'];

export const FILTER_SAMPLE_VALUES = {
  'Geography': 'APAC',
  'Country': 'India',
  'Business Unit': 'Delivery',
  'SBU': 'Digital Engg',
  'Segment': 'BFSI',
  'Function/Dept': 'Engineering',
  'Team/Project': 'Payments Pod',
  'Manager': 'M-1042',
  'Role/Grade': 'L4',
  'Tenure': '2–5 yrs',
  'Employment Type': 'Full-time',
  'Work Status': 'Hybrid',
};

export const SURVEYS = {
  'oct-2025-pulse': {
    key: 'oct-2025-pulse',
    label: 'October 2025 Pulse Survey',
    short: 'Oct 2025 Pulse',
    date: 'Oct 14 – 21, 2025',
    respondents: 25800,
    invited: 30000,
    aiText: 'Engagement held steady at 7.4/10 with strong upward momentum across EMEA and Americas, but APAC sentiment fell 12% month-over-month driven largely by workload strain and concerns around career growth progression at L4–L5. Three manager cohorts (India Delivery, APAC CS, Sales EMEA) are flagged as high attrition risk — combined ~1,500 employees with risk scores above 7/10. Recommend immediate 1:1 outreach, workload rebalancing review, and a career framework comms refresh this cycle.',
    aiTags: [
      { label: 'APAC sentiment −12%', type: 'neg' },
      { label: 'Workload strain', type: 'neg' },
      { label: 'Career growth concerns', type: 'neg' },
      { label: 'EMEA momentum strong', type: 'pos' },
    ],
    kpis: {
      engagement: { value: '7.4', unit: '/10', delta: 0.2, raw: '7.4 / 10' },
      sentiment:  { value: '68%', unit: 'positive', delta: -4, raw: '68% positive' },
      enps:       { value: '+42', unit: '', delta: 3, raw: 'eNPS +42' },
      participation: { value: '86%', unit: '', delta: 2, raw: '25,800 of 30,000' },
    },
    engagementTrend: [
      { month: 'May', score: 7.0, benchmark: 7.1 },
      { month: 'Jun', score: 7.1, benchmark: 7.1 },
      { month: 'Jul', score: 7.0, benchmark: 7.2 },
      { month: 'Aug', score: 7.2, benchmark: 7.2 },
      { month: 'Sep', score: 7.2, benchmark: 7.2 },
      { month: 'Oct', score: 7.4, benchmark: 7.2 },
    ],
    sentimentTrend: [
      { month: 'May', positive: 70, neutral: 21, negative: 9 },
      { month: 'Jun', positive: 71, neutral: 20, negative: 9 },
      { month: 'Jul', positive: 72, neutral: 18, negative: 10 },
      { month: 'Aug', positive: 70, neutral: 20, negative: 10 },
      { month: 'Sep', positive: 72, neutral: 19, negative: 9 },
      { month: 'Oct', positive: 68, neutral: 20, negative: 12 },
    ],
    drivers: [
      { theme: 'Manager support',    positive: 74, neutral: 18, negative: 8 },
      { theme: 'Career growth',      positive: 52, neutral: 24, negative: 24 },
      { theme: 'Workload balance',   positive: 48, neutral: 22, negative: 30 },
      { theme: 'Psych. safety',      positive: 78, neutral: 16, negative: 6 },
      { theme: 'Recognition',        positive: 63, neutral: 23, negative: 14 },
    ],
    verbatims: [
      { text: 'My manager genuinely cares about my growth — weekly 1:1s have made a huge difference this quarter.', sentiment: 'pos', tags: ['Manager support', 'Growth'] },
      { text: 'Workload is very high, weekends are routinely affected. We need more bandwidth or clearer prioritization.', sentiment: 'neg', tags: ['Workload', 'APAC'] },
      { text: 'The promotion criteria from L4 to L5 feel unclear. I don\'t know what I need to do to get there.', sentiment: 'neg', tags: ['Career growth', 'L4-L5'] },
      { text: 'Love the hybrid flexibility and trust from leadership. Please keep it this way.', sentiment: 'pos', tags: ['Flexibility', 'Leadership'] },
      { text: 'Great team culture, but I wish recognition was more consistent beyond year-end.', sentiment: 'neg', tags: ['Recognition'] },
      { text: 'The new L&D platform and internal mobility posts are a big improvement.', sentiment: 'pos', tags: ['L&D', 'Mobility'] },
    ],
    riskCohorts: [
      { cohort: 'India Delivery — Payments',  employees: 412, score: 8.2, driver: 'Workload' },
      { cohort: 'APAC CS — Manila',           employees: 286, score: 7.6, driver: 'Career growth' },
      { cohort: 'Sales EMEA — Mid-market',    employees: 198, score: 7.4, driver: 'Compensation' },
      { cohort: 'India Delivery — Cloud',     employees: 342, score: 6.8, driver: 'Workload' },
      { cohort: 'Americas CS — Austin',       employees: 165, score: 5.9, driver: 'Manager fit' },
    ],
    benchmarkData: [
      { metric: 'Engagement',       us: 74, benchmark: 68, gap: 6 },
      { metric: 'Sentiment',        us: 68, benchmark: 66, gap: 2 },
      { metric: 'eNPS',             us: 42, benchmark: 28, gap: 14 },
      { metric: 'Participation',    us: 86, benchmark: 72, gap: 14 },
      { metric: 'Manager support',  us: 74, benchmark: 70, gap: 4 },
      { metric: 'Career growth',    us: 52, benchmark: 61, gap: -9 },
    ],
    managers: [
      { id: 'M-1042', size: 14, mnps: 78, delta: 6,  sentiment: 82, risk: 'Low' },
      { id: 'M-0987', size: 11, mnps: 71, delta: 4,  sentiment: 79, risk: 'Low' },
      { id: 'M-1188', size:  9, mnps: 52, delta: -1, sentiment: 68, risk: 'Medium' },
      { id: 'M-0721', size: 17, mnps: 18, delta: -8, sentiment: 54, risk: 'High' },
      { id: 'M-1305', size: 12, mnps: 12, delta: -11, sentiment: 49, risk: 'High' },
    ],
    participation: [
      { bu: 'Delivery',    geo: 'APAC',     invited: 9800, responded: 8320, pct: 85, status: 'ok' },
      { bu: 'Delivery',    geo: 'EMEA',     invited: 4200, responded: 3780, pct: 90, status: 'ok' },
      { bu: 'Sales',       geo: 'Americas', invited: 3600, responded: 3020, pct: 84, status: 'ok' },
      { bu: 'Customer Success', geo: 'APAC', invited: 5200, responded: 4060, pct: 78, status: 'warn' },
      { bu: 'Engineering', geo: 'Global',   invited: 7200, responded: 6620, pct: 92, status: 'ok' },
    ],
  },

  'sep-2025-pulse': {
    key: 'sep-2025-pulse',
    label: 'September 2025 Pulse Survey',
    short: 'Sep 2025 Pulse',
    date: 'Sep 15 – 22, 2025',
    respondents: 24100,
    invited: 30000,
    aiText: 'EMEA continues to outperform the rest of the organization with engagement above benchmark, though workload concerns remain persistent org-wide. Manager coaching investments from Q2 are starting to show tangible impact on team sentiment — mNPS for coached managers is ~11 points higher than non-coached peers. Participation dipped 3% this month, with CS APAC showing the steepest decline; consider targeted nudges and a clearer "what changes because of this" comms story.',
    aiTags: [
      { label: 'EMEA outperforming', type: 'pos' },
      { label: 'Manager coaching working', type: 'pos' },
      { label: 'Workload persistent', type: 'neg' },
      { label: 'Participation dip', type: 'neg' },
    ],
    kpis: {
      engagement: { value: '7.2', unit: '/10', delta: -0.1, raw: '7.2 / 10' },
      sentiment:  { value: '72%', unit: 'positive', delta: 4, raw: '72% positive' },
      enps:       { value: '+39', unit: '', delta: -2, raw: 'eNPS +39' },
      participation: { value: '80%', unit: '', delta: -3, raw: '24,100 of 30,000' },
    },
    engagementTrend: [
      { month: 'Apr', score: 7.1, benchmark: 7.1 },
      { month: 'May', score: 7.2, benchmark: 7.1 },
      { month: 'Jun', score: 7.3, benchmark: 7.1 },
      { month: 'Jul', score: 7.0, benchmark: 7.2 },
      { month: 'Aug', score: 7.2, benchmark: 7.2 },
      { month: 'Sep', score: 7.2, benchmark: 7.2 },
    ],
    sentimentTrend: [
      { month: 'Apr', positive: 68, neutral: 22, negative: 10 },
      { month: 'May', positive: 69, neutral: 21, negative: 10 },
      { month: 'Jun', positive: 70, neutral: 21, negative: 9 },
      { month: 'Jul', positive: 68, neutral: 22, negative: 10 },
      { month: 'Aug', positive: 70, neutral: 21, negative: 9 },
      { month: 'Sep', positive: 72, neutral: 19, negative: 9 },
    ],
    drivers: [
      { theme: 'Manager support',    positive: 72, neutral: 19, negative: 9 },
      { theme: 'Career growth',      positive: 55, neutral: 23, negative: 22 },
      { theme: 'Workload balance',   positive: 46, neutral: 23, negative: 31 },
      { theme: 'Psych. safety',      positive: 76, neutral: 17, negative: 7 },
      { theme: 'Recognition',        positive: 66, neutral: 22, negative: 12 },
    ],
    verbatims: [
      { text: 'Leadership town halls in EMEA have been genuinely useful — I feel I understand where we\'re headed.', sentiment: 'pos', tags: ['Leadership', 'EMEA'] },
      { text: 'Workload continues to be too high for the team size. Burnout is real.', sentiment: 'neg', tags: ['Workload'] },
      { text: 'My skip-level is now monthly and I can raise concerns early — good change.', sentiment: 'pos', tags: ['Manager', 'Skip-level'] },
      { text: 'Participation asks feel frequent without visible change. What happened to last pulse actions?', sentiment: 'neg', tags: ['Actions', 'Comms'] },
      { text: 'The manager coaching program my lead went through is paying off — clearer 1:1s.', sentiment: 'pos', tags: ['Coaching'] },
    ],
    riskCohorts: [
      { cohort: 'APAC CS — Manila',         employees: 298, score: 7.1, driver: 'Career growth' },
      { cohort: 'India Delivery — Cloud',   employees: 356, score: 6.9, driver: 'Workload' },
      { cohort: 'Sales EMEA — Enterprise',  employees: 145, score: 6.2, driver: 'Compensation' },
      { cohort: 'Americas Eng — NYC',       employees: 210, score: 5.8, driver: 'Manager fit' },
      { cohort: 'India Delivery — Payments', employees: 402, score: 5.4, driver: 'Workload' },
    ],
    benchmarkData: [
      { metric: 'Engagement',       us: 72, benchmark: 68, gap: 4 },
      { metric: 'Sentiment',        us: 72, benchmark: 66, gap: 6 },
      { metric: 'eNPS',             us: 39, benchmark: 28, gap: 11 },
      { metric: 'Participation',    us: 80, benchmark: 72, gap: 8 },
      { metric: 'Manager support',  us: 72, benchmark: 70, gap: 2 },
      { metric: 'Career growth',    us: 55, benchmark: 61, gap: -6 },
    ],
    managers: [
      { id: 'M-0418', size: 12, mnps: 74, delta: 5,  sentiment: 80, risk: 'Low' },
      { id: 'M-1042', size: 14, mnps: 72, delta: 3,  sentiment: 78, risk: 'Low' },
      { id: 'M-0901', size: 10, mnps: 48, delta: 0,  sentiment: 66, risk: 'Medium' },
      { id: 'M-0721', size: 17, mnps: 26, delta: -6, sentiment: 58, risk: 'High' },
      { id: 'M-1305', size: 12, mnps: 23, delta: -4, sentiment: 53, risk: 'High' },
    ],
    participation: [
      { bu: 'Delivery',    geo: 'APAC',     invited: 9800, responded: 7840, pct: 80, status: 'warn' },
      { bu: 'Delivery',    geo: 'EMEA',     invited: 4200, responded: 3570, pct: 85, status: 'ok' },
      { bu: 'Sales',       geo: 'Americas', invited: 3600, responded: 2880, pct: 80, status: 'warn' },
      { bu: 'Customer Success', geo: 'APAC', invited: 5200, responded: 3640, pct: 70, status: 'bad' },
      { bu: 'Engineering', geo: 'Global',   invited: 7200, responded: 6192, pct: 86, status: 'ok' },
    ],
  },

  'annual-2025': {
    key: 'annual-2025',
    label: 'Annual Engagement Survey 2025',
    short: 'Annual 2025',
    date: 'Jan 6 – 20, 2025',
    respondents: 27400,
    invited: 30000,
    aiText: 'Strong year-over-year gains across every headline metric. Psychological safety scored highest in Northwind\'s history (+6 pts YoY) and managers continue to be a durable strength. The single largest risk area remains compensation equity, particularly for senior individual contributors and tenured managers in high-demand skill areas. Recommend a targeted comp equity review and a transparent refresh of the career framework in H1.',
    aiTags: [
      { label: 'Strong YoY gains', type: 'pos' },
      { label: 'Psych. safety at record high', type: 'pos' },
      { label: 'Compensation equity risk', type: 'neg' },
      { label: 'Manager strength durable', type: 'pos' },
    ],
    kpis: {
      engagement: { value: '7.6', unit: '/10', delta: 0.4, raw: '7.6 / 10' },
      sentiment:  { value: '74%', unit: 'positive', delta: 6, raw: '74% positive' },
      enps:       { value: '+46', unit: '', delta: 8, raw: 'eNPS +46' },
      participation: { value: '91%', unit: '', delta: 5, raw: '27,400 of 30,000' },
    },
    engagementTrend: [
      { month: '2021', score: 6.8, benchmark: 6.9 },
      { month: '2022', score: 7.0, benchmark: 7.0 },
      { month: '2023', score: 7.1, benchmark: 7.1 },
      { month: '2024', score: 7.2, benchmark: 7.1 },
      { month: '2025', score: 7.6, benchmark: 7.2 },
    ],
    sentimentTrend: [
      { month: '2021', positive: 62, neutral: 26, negative: 12 },
      { month: '2022', positive: 65, neutral: 24, negative: 11 },
      { month: '2023', positive: 68, neutral: 22, negative: 10 },
      { month: '2024', positive: 68, neutral: 22, negative: 10 },
      { month: '2025', positive: 74, neutral: 18, negative: 8 },
    ],
    drivers: [
      { theme: 'Manager support',    positive: 78, neutral: 16, negative: 6 },
      { theme: 'Career growth',      positive: 60, neutral: 22, negative: 18 },
      { theme: 'Compensation',       positive: 44, neutral: 24, negative: 32 },
      { theme: 'Psych. safety',      positive: 82, neutral: 13, negative: 5 },
      { theme: 'Recognition',        positive: 70, neutral: 20, negative: 10 },
    ],
    verbatims: [
      { text: 'This is the best place I have worked. I feel trusted, supported, and stretched in the right ways.', sentiment: 'pos', tags: ['Culture', 'Trust'] },
      { text: 'Compensation is lagging the market, especially for senior ICs in cloud and data.', sentiment: 'neg', tags: ['Compensation', 'Senior IC'] },
      { text: 'Psychological safety here is unmatched. I speak up without fear of consequence.', sentiment: 'pos', tags: ['Psych. safety'] },
      { text: 'Career framework is clearer than last year but still vague above L5.', sentiment: 'neg', tags: ['Career growth'] },
      { text: 'My manager has been the single biggest reason I have stayed and grown.', sentiment: 'pos', tags: ['Manager support'] },
    ],
    riskCohorts: [
      { cohort: 'Cloud Senior ICs — Global',   employees: 220, score: 7.2, driver: 'Compensation' },
      { cohort: 'Data Senior ICs — Americas',  employees: 145, score: 6.9, driver: 'Compensation' },
      { cohort: 'APAC CS — Leadership',        employees: 86,  score: 6.1, driver: 'Career growth' },
      { cohort: 'Sales EMEA — Enterprise',     employees: 120, score: 5.7, driver: 'Compensation' },
      { cohort: 'Engineering — L5+ APAC',      employees: 190, score: 5.2, driver: 'Growth path' },
    ],
    benchmarkData: [
      { metric: 'Engagement',       us: 76, benchmark: 68, gap: 8 },
      { metric: 'Sentiment',        us: 74, benchmark: 66, gap: 8 },
      { metric: 'eNPS',             us: 46, benchmark: 28, gap: 18 },
      { metric: 'Participation',    us: 91, benchmark: 72, gap: 19 },
      { metric: 'Psych. safety',    us: 82, benchmark: 73, gap: 9 },
      { metric: 'Compensation',     us: 44, benchmark: 58, gap: -14 },
    ],
    managers: [
      { id: 'M-0207', size: 13, mnps: 82, delta: 9, sentiment: 86, risk: 'Low' },
      { id: 'M-0418', size: 12, mnps: 79, delta: 7, sentiment: 83, risk: 'Low' },
      { id: 'M-0901', size: 10, mnps: 58, delta: 4, sentiment: 72, risk: 'Medium' },
      { id: 'M-1122', size: 15, mnps: 29, delta: -3, sentiment: 61, risk: 'High' },
      { id: 'M-1305', size: 12, mnps: 21, delta: -5, sentiment: 54, risk: 'High' },
    ],
    participation: [
      { bu: 'Delivery',    geo: 'APAC',     invited: 9800, responded: 9016, pct: 92, status: 'ok' },
      { bu: 'Delivery',    geo: 'EMEA',     invited: 4200, responded: 3990, pct: 95, status: 'ok' },
      { bu: 'Sales',       geo: 'Americas', invited: 3600, responded: 3276, pct: 91, status: 'ok' },
      { bu: 'Customer Success', geo: 'APAC', invited: 5200, responded: 4472, pct: 86, status: 'ok' },
      { bu: 'Engineering', geo: 'Global',   invited: 7200, responded: 6624, pct: 92, status: 'ok' },
    ],
  },
};

export const SURVEY_ORDER = ['oct-2025-pulse', 'sep-2025-pulse', 'annual-2025'];

/* Attrition heatmap (rows = BU, cols = regions). Values are attrition %. */
export const ATTRITION_HEATMAP = {
  'oct-2025-pulse': [
    { bu: 'Delivery',         apac: 7.8, emea: 3.9, amer: 4.2 },
    { bu: 'Engineering',      apac: 6.1, emea: 3.1, amer: 3.5 },
    { bu: 'Customer Success', apac: 8.4, emea: 4.6, amer: 5.2 },
    { bu: 'Sales',            apac: 5.0, emea: 6.8, amer: 4.1 },
    { bu: 'G&A',              apac: 3.2, emea: 2.8, amer: 2.5 },
  ],
  'sep-2025-pulse': [
    { bu: 'Delivery',         apac: 7.2, emea: 3.7, amer: 4.0 },
    { bu: 'Engineering',      apac: 5.9, emea: 3.0, amer: 3.3 },
    { bu: 'Customer Success', apac: 7.8, emea: 4.2, amer: 4.9 },
    { bu: 'Sales',            apac: 4.6, emea: 6.1, amer: 3.8 },
    { bu: 'G&A',              apac: 3.0, emea: 2.6, amer: 2.4 },
  ],
  'annual-2025': [
    { bu: 'Delivery',         apac: 6.5, emea: 3.4, amer: 3.7 },
    { bu: 'Engineering',      apac: 5.1, emea: 2.8, amer: 3.1 },
    { bu: 'Customer Success', apac: 6.9, emea: 3.8, amer: 4.3 },
    { bu: 'Sales',            apac: 4.2, emea: 5.4, amer: 3.4 },
    { bu: 'G&A',              apac: 2.8, emea: 2.4, amer: 2.1 },
  ],
};

/* Org tree */
export const ORG_TREE = {
  'oct-2025-pulse': {
    name: 'Northwind Global', score: 7.4, children: [
      { name: 'APAC', score: 6.8, warn: true, children: [
        { name: 'India Delivery', score: 6.2, warn: true },
        { name: 'APAC Sales', score: 7.5 },
        { name: 'APAC CS', score: 7.1 },
      ]},
      { name: 'EMEA', score: 7.6 },
      { name: 'Americas', score: 7.8 },
    ]
  },
  'sep-2025-pulse': {
    name: 'Northwind Global', score: 7.2, children: [
      { name: 'APAC', score: 6.9, warn: true, children: [
        { name: 'India Delivery', score: 6.5, warn: true },
        { name: 'APAC Sales', score: 7.3 },
        { name: 'APAC CS', score: 6.8, warn: true },
      ]},
      { name: 'EMEA', score: 7.7 },
      { name: 'Americas', score: 7.5 },
    ]
  },
  'annual-2025': {
    name: 'Northwind Global', score: 7.6, children: [
      { name: 'APAC', score: 7.3, children: [
        { name: 'India Delivery', score: 7.0 },
        { name: 'APAC Sales', score: 7.8 },
        { name: 'APAC CS', score: 7.4 },
      ]},
      { name: 'EMEA', score: 7.9 },
      { name: 'Americas', score: 7.8 },
    ]
  },
};

/* Keyword cloud per survey */
export const KEYWORDS = {
  'oct-2025-pulse': [
    { w: 'workload', c: 342, s: 'neg' }, { w: 'career growth', c: 286, s: 'neg' },
    { w: 'manager', c: 258, s: 'pos' }, { w: 'hybrid', c: 214, s: 'pos' },
    { w: 'burnout', c: 178, s: 'neg' }, { w: 'recognition', c: 142, s: 'neu' },
    { w: 'learning', c: 128, s: 'pos' }, { w: 'promotion', c: 118, s: 'neg' },
    { w: 'team', c: 104, s: 'pos' }, { w: 'flexibility', c: 96, s: 'pos' },
    { w: 'compensation', c: 92, s: 'neg' }, { w: 'leadership', c: 88, s: 'pos' },
    { w: 'bandwidth', c: 74, s: 'neg' }, { w: 'culture', c: 68, s: 'pos' },
    { w: 'mobility', c: 54, s: 'pos' },
  ],
  'sep-2025-pulse': [
    { w: 'workload', c: 312, s: 'neg' }, { w: 'coaching', c: 240, s: 'pos' },
    { w: 'leadership', c: 214, s: 'pos' }, { w: 'town halls', c: 172, s: 'pos' },
    { w: 'career', c: 158, s: 'neg' }, { w: 'recognition', c: 122, s: 'neu' },
    { w: 'actions', c: 118, s: 'neg' }, { w: 'growth', c: 104, s: 'pos' },
    { w: 'pace', c: 92, s: 'neg' }, { w: 'flexibility', c: 88, s: 'pos' },
    { w: 'manager', c: 84, s: 'pos' }, { w: 'compensation', c: 74, s: 'neg' },
    { w: 'learning', c: 62, s: 'pos' },
  ],
  'annual-2025': [
    { w: 'psych. safety', c: 394, s: 'pos' }, { w: 'compensation', c: 312, s: 'neg' },
    { w: 'growth', c: 258, s: 'pos' }, { w: 'manager', c: 234, s: 'pos' },
    { w: 'culture', c: 198, s: 'pos' }, { w: 'career framework', c: 174, s: 'neg' },
    { w: 'trust', c: 152, s: 'pos' }, { w: 'recognition', c: 124, s: 'pos' },
    { w: 'flexibility', c: 102, s: 'pos' }, { w: 'learning', c: 94, s: 'pos' },
    { w: 'mobility', c: 82, s: 'pos' }, { w: 'senior IC', c: 74, s: 'neg' },
  ],
};

/* Questions for Question-wise tab */
export const QUESTIONS = {
  'oct-2025-pulse': [
    { q: 'How likely are you to recommend Northwind as a great place to work?', donut: [{name:'Positive', v: 68, c: '#22C55E'}, {name:'Neutral', v: 20, c: '#F59E0B'}, {name:'Negative', v: 12, c: '#FB7185'}] },
    { q: 'Do you feel your workload is manageable over the last 30 days?', donut: [{name:'Positive', v: 48, c: '#22C55E'}, {name:'Neutral', v: 22, c: '#F59E0B'}, {name:'Negative', v: 30, c: '#FB7185'}] },
    { q: 'Is your career progression path clear to you at Northwind?', donut: [{name:'Positive', v: 52, c: '#22C55E'}, {name:'Neutral', v: 24, c: '#F59E0B'}, {name:'Negative', v: 24, c: '#FB7185'}] },
  ],
  'sep-2025-pulse': [
    { q: 'How likely are you to recommend Northwind as a great place to work?', donut: [{name:'Positive', v: 72, c: '#22C55E'}, {name:'Neutral', v: 19, c: '#F59E0B'}, {name:'Negative', v: 9, c: '#FB7185'}] },
    { q: 'Do you feel supported by your manager?', donut: [{name:'Positive', v: 72, c: '#22C55E'}, {name:'Neutral', v: 19, c: '#F59E0B'}, {name:'Negative', v: 9, c: '#FB7185'}] },
    { q: 'Does Northwind act on survey feedback?', donut: [{name:'Positive', v: 46, c: '#22C55E'}, {name:'Neutral', v: 28, c: '#F59E0B'}, {name:'Negative', v: 26, c: '#FB7185'}] },
  ],
  'annual-2025': [
    { q: 'How likely are you to recommend Northwind as a great place to work?', donut: [{name:'Positive', v: 74, c: '#22C55E'}, {name:'Neutral', v: 18, c: '#F59E0B'}, {name:'Negative', v: 8, c: '#FB7185'}] },
    { q: 'Can you speak up without fear of negative consequences?', donut: [{name:'Positive', v: 82, c: '#22C55E'}, {name:'Neutral', v: 13, c: '#F59E0B'}, {name:'Negative', v: 5, c: '#FB7185'}] },
    { q: 'Is your compensation fair relative to the market?', donut: [{name:'Positive', v: 44, c: '#22C55E'}, {name:'Neutral', v: 24, c: '#F59E0B'}, {name:'Negative', v: 32, c: '#FB7185'}] },
  ],
};

/* mNPS histogram bins (counts of managers in each mNPS bucket) */
export const MNPS_HISTOGRAM = [
  { bin: '-100 to -50', count: 4 },
  { bin: '-50 to 0',    count: 12 },
  { bin: '0 to 20',     count: 28 },
  { bin: '20 to 40',    count: 56 },
  { bin: '40 to 60',    count: 82 },
  { bin: '60 to 80',    count: 48 },
  { bin: '80 to 100',   count: 17 },
];

/* Leaders for Connect Compose */
export const LEADERS = [
  { id: 'priya',  name: 'Priya Sharma',   title: 'Segment Head, APAC Delivery',  loc: 'Bangalore',  color: '#1A8B96', initials: 'PS' },
  { id: 'james',  name: 'James Chen',     title: 'Account Manager, EMEA Sales',  loc: 'London',     color: '#8B5CF6', initials: 'JC' },
  { id: 'maria',  name: 'Maria Rodriguez',title: 'Delivery Head, Americas',      loc: 'Austin',     color: '#F59E0B', initials: 'MR' },
  { id: 'rahul',  name: 'Rahul Mehta',    title: 'Engineering Head, APAC',       loc: 'Mumbai',     color: '#22C55E', initials: 'RM' },
  { id: 'sophie', name: 'Sophie Laurent', title: 'HR Head, EMEA',                loc: 'Paris',      color: '#FB7185', initials: 'SL' },
  { id: 'david',  name: 'David Park',     title: 'CS Head, Americas',            loc: 'Toronto',    color: '#3B82F6', initials: 'DP' },
];

export const CALL_SLOTS = ['Thu 3pm', 'Fri 10am', 'Mon 11am'];

/* Inbox conversations */
export const CONVERSATIONS = [
  {
    id: 'c1',
    anonymous: true,
    displayName: 'Anonymous Employee #4521',
    initials: '4521',
    subject: 'Workload concerns in our pod',
    status: 'Open',
    unread: true,
    tags: ['Workload', 'APAC', 'Team health'],
    surveyRef: 'oct-2025-pulse',
    startedAt: 'Oct 24, 2025',
    responseTime: '4h',
    callRequest: true,
    messages: [
      { from: 'emp', at: 'Oct 24, 2025 · 10:42am', text: 'Hi Priya, I wanted to share something I felt I couldn\'t bring up in my 1:1. The workload in our pod has been very high for the last 2 months and a few people are talking about leaving. Could we explore rebalancing?' },
      { from: 'leader', at: 'Oct 24, 2025 · 2:51pm', text: 'Thank you for reaching out — I really appreciate you sharing this. Let me look into rebalancing options and set up a team discussion this week.' },
    ],
  },
  {
    id: 'c2',
    anonymous: false,
    displayName: 'Arjun Mehta',
    initials: 'AM',
    subject: 'Career path clarity request',
    status: 'Open',
    unread: true,
    tags: ['Career growth', 'L4–L5'],
    surveyRef: null,
    startedAt: 'Oct 22, 2025',
    responseTime: '1d',
    callRequest: false,
    messages: [
      { from: 'emp', at: 'Oct 22, 2025 · 4:10pm', text: 'Hi Priya — I\'m really interested in understanding what L5 looks like for my role. The framework doc is generic. Could we sync on a concrete growth plan?' },
      { from: 'leader', at: 'Oct 23, 2025 · 11:30am', text: 'Absolutely Arjun. Let\'s book 30 minutes next week, and I\'ll bring the detailed competency map for your function.' },
    ],
  },
  {
    id: 'c3',
    anonymous: true,
    displayName: 'Anonymous Employee #7823',
    initials: '7823',
    subject: 'Appreciation for team culture',
    status: 'Closed',
    unread: false,
    tags: ['Culture', 'Recognition'],
    surveyRef: 'oct-2025-pulse',
    startedAt: 'Oct 18, 2025',
    responseTime: '3h',
    callRequest: false,
    messages: [
      { from: 'emp', at: 'Oct 18, 2025 · 9:20am', text: 'Just wanted to say the team culture has been exceptional since the new onboarding changes. Thank you for investing in this.' },
      { from: 'leader', at: 'Oct 18, 2025 · 12:14pm', text: 'That means a lot — thank you for writing in. Will share this back with the team.' },
    ],
  },
];

/* Kanban actions */
export const ACTIONS = [
  { col: 'Identified',  title: 'Address career growth — India Delivery',  source: 'Oct 2025 Pulse', owner: 'SR', due: 'Nov 5',  priority: 'high',   cohort: 'India Delivery' },
  { col: 'Identified',  title: 'Review workload — APAC CS',               source: 'Oct 2025 Pulse', owner: 'MK', due: 'Nov 8',  priority: 'medium', cohort: 'APAC CS' },
  { col: 'Assigned',    title: 'Manager coaching — Sales EMEA',           source: 'Oct 2025 Pulse', owner: 'JC', due: 'Nov 12', priority: 'high',   cohort: 'Sales EMEA' },
  { col: 'Assigned',    title: 'Career framework comms L4–L5',            source: 'Oct 2025 Pulse', owner: 'PS', due: 'Nov 15', priority: 'medium', cohort: 'Global' },
  { col: 'In Progress', title: '1:1 outreach — Manila CS',                source: 'Oct 2025 Pulse', owner: 'AR', due: 'Oct 30', priority: 'high',   cohort: 'APAC CS' },
  { col: 'Closed',      title: 'Pulse survey comms campaign',             source: 'Sep 2025 Pulse', owner: 'HR', due: 'Oct 10', priority: 'low',    cohort: 'Global' },
];

export const KANBAN_COLS = [
  { key: 'Identified',  bg: '#EFF6FF', title: 'Identified' },
  { key: 'Assigned',    bg: '#FEFCE8', title: 'Assigned' },
  { key: 'In Progress', bg: '#F0FDF4', title: 'In Progress' },
  { key: 'Closed',      bg: '#F3F4F6', title: 'Closed' },
];