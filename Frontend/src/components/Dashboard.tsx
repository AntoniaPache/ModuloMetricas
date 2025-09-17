import React, { useState } from 'react';
import { TabNavigation, TabKey } from './Common';
import ExecutiveSummary from './ExecutiveSummary';
import Operations from './Operations';
import Analytics from './Analytics';
import FleetManagement from './FleetManagement';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('executive');
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'executive':
        return <ExecutiveSummary selectedPeriod={selectedPeriod} />;
      case 'operations':
        return <Operations selectedPeriod={selectedPeriod} />;
      case 'analytics':
        return <Analytics selectedPeriod={selectedPeriod} />;
      case 'fleet':
        return <FleetManagement selectedPeriod={selectedPeriod} />;
      default:
        return <ExecutiveSummary selectedPeriod={selectedPeriod} />;
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <h1>Dashboard de Métricas</h1>
          <p className="dashboard-subtitle">Reservas de Vuelos - Análisis Integral</p>
        </div>
      </header>

      <TabNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <main className="dashboard-content">
        <div className="container">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
