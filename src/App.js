/* Main App */

import React, { useState, useEffect } from 'react';
import { TopBar, Sidebar, HomeScreen, ComingSoon } from './components/Shell';
import { OverviewTab, SentimentTab, EngagementTab, ManagerTab } from './components/AnalyticsA';
import { AttritionTab, BenchmarkingTab, QuestionTab, ParticipationTab, ActionsTab } from './components/AnalyticsB';
import { SurveySelector, FilterBar, TabStrip, AnonymityGate, ANALYTICS_TABS, ANONYMITY_GATED_TABS } from './components/Filters';
import { ComposeScreen, InboxScreen } from './components/Connect';
import { PERSONAS, SURVEYS, COLORS } from './data';

function App() {
  const [persona, setPersona] = useState(PERSONAS[0]);
  const [route, setRoute] = useState('home');
  const [expanded, setExpanded] = useState({ survey: true, connect: true });

  const [surveyKey, setSurveyKey] = useState('oct-2025-pulse');
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFilters, setActiveFilters] = useState({});

  const handlePersona = (p) => { setPersona(p); setRoute('home'); };
  const goHome = () => setRoute('home');

  // On survey change, reset to overview tab (typewriter re-triggers via deps in Typewriter)
  useEffect(() => { setActiveTab('overview'); }, [surveyKey]);

  const survey = SURVEYS[surveyKey];

  // Breadcrumb
  const breadcrumb = (() => {
    if (route === 'home') return [{ label: 'Home' }];
    if (route === 'analytics') {
      const tab = ANALYTICS_TABS.find(t => t.key === activeTab);
      return [
        { label: 'Home', onClick: goHome },
        { label: 'Survey' },
        { label: 'Analytics Dashboard' },
        { label: tab ? tab.label : 'Overview' },
      ];
    }
    if (route === 'compose') return [{ label: 'Home', onClick: goHome }, { label: 'Connect' }, { label: 'Compose' }];
    if (route === 'inbox')   return [{ label: 'Home', onClick: goHome }, { label: 'Connect' }, { label: 'Inbox' }];
    // coming soon routes
    const soonLabels = {
      'my-surveys': 'My Surveys', 'admin-listing': 'Admin Listing',
      'create-new': 'Create New', 'survey-report': 'Survey Report',
    };
    if (soonLabels[route]) return [{ label: 'Home', onClick: goHome }, { label: 'Survey' }, { label: soonLabels[route] }];
    return [{ label: 'Home' }];
  })();

  const renderAnalytics = () => {
    const filterCount = Object.keys(activeFilters).length;
    const gated = filterCount >= 4 && ANONYMITY_GATED_TABS.has(activeTab);

    let body;
    if (gated) body = <AnonymityGate />;
    else if (activeTab === 'overview')      body = <OverviewTab survey={survey} />;
    else if (activeTab === 'sentiment')     body = <SentimentTab survey={survey} />;
    else if (activeTab === 'engagement')    body = <EngagementTab survey={survey} />;
    else if (activeTab === 'manager')       body = <ManagerTab survey={survey} />;
    else if (activeTab === 'attrition')     body = <AttritionTab survey={survey} />;
    else if (activeTab === 'benchmarking')  body = <BenchmarkingTab survey={survey} />;
    else if (activeTab === 'question')      body = <QuestionTab survey={survey} />;
    else if (activeTab === 'participation') body = <ParticipationTab survey={survey} />;
    else if (activeTab === 'actions')       body = <ActionsTab />;

    return (
      <div style={{ padding: 24 }}>
        <div style={{ marginBottom: 10 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: COLORS.textPrimary, letterSpacing: -0.4 }}>Analytics Dashboard</h1>
          <div style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 4 }}>
            Live insights across sentiment, engagement, manager effectiveness, attrition, and benchmarking.
          </div>
        </div>
        <SurveySelector surveyKey={surveyKey} setSurveyKey={setSurveyKey} />
        <FilterBar activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
        <TabStrip active={activeTab} setActive={setActiveTab} />
        <div className="fade-up" key={surveyKey + '::' + activeTab}>
          {body}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (route === 'home')     return <HomeScreen onNavigate={(k) => { if (k === 'analytics') setRoute('analytics'); else if (k === 'inbox') setRoute('inbox'); }} />;
    if (route === 'analytics') return renderAnalytics();
    if (route === 'compose')  return <ComposeScreen />;
    if (route === 'inbox')    return <InboxScreen />;

    // Coming soon
    const soonLabels = {
      'my-surveys': 'My Surveys', 'admin-listing': 'Admin Listing',
      'create-new': 'Create New', 'survey-report': 'Survey Report',
    };
    if (soonLabels[route]) return <ComingSoon title={soonLabels[route]} onBack={() => setRoute('analytics')} />;
    return <HomeScreen onNavigate={setRoute} />;
  };

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bgCanvas }}>
      <TopBar
        persona={persona}
        setPersona={handlePersona}
        breadcrumb={breadcrumb}
        onHome={goHome}
      />
      <div style={{ display: 'flex' }}>
        <Sidebar route={route} setRoute={setRoute} expanded={expanded} setExpanded={setExpanded} />
        <main style={{ flex: 1, minWidth: 0 }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;