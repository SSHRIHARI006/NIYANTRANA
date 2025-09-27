import React, { useState } from 'react';
import AddTrain from './AddTrain';
import TrainListPage from './TrainListPage';
import AssignService from './AssignService';
import { AlertsNotifications } from './AlertNotifications';
import { DashboardOverview } from './dashboard-overview';
import { MaintenanceLogs } from './maintenance-logs';
import { PerformanceAnalytics} from "./performance-analytics"

function ManualInterventionsPage() {
  return <div className="p-4 text-green-700 text-lg font-semibold">Manual Interventions Content</div>;
}

function FleetStatusPage() {
  return <div className="p-4 text-purple-700 text-lg font-semibold">Fleet Status Content</div>;
}




function SLACompliancePage() {
  return <div className="p-4 text-indigo-700 text-lg font-semibold">SLA Compliance Content</div>;
}

function MaintenanceLogsPage() {
  return <MaintenanceLogs />
}

function SubmitDataPage() {
  return <div className="p-4 text-pink-700 text-lg font-semibold">Submit Data Content</div>;
}

export default function MetroDashboardTabs() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [search, setsearch] = useState( " ");
  // Mapping from tab id to component
  const tabComponents = {
    "Add Train": <AddTrain />,
    'Dashboard' : <DashboardOverview searchTerm={search} setSearchTerm={setsearch} />,
 
    manual: <ManualInterventionsPage />,
    fleet: <FleetStatusPage />,
    alerts: <AlertsNotifications />,
   
    "Train List": <TrainListPage />,
    maintenance: <MaintenanceLogsPage />,
   
    "Assign Service" :<AssignService />,
    'Performance Analytics' :<PerformanceAnalytics />
  };

  const navigationItems = [
    { id: 'Add Train', label: 'Add Train' },
     { id: 'Dashboard', label: 'Dashboard' },

   
    { id: 'alerts', label: 'Alerts & Notifications' },
    
    { id: 'Train List', label: 'Train List' },
    { id: 'maintenance', label: 'Maintenance Logs' },

    {id:'Assign Service', label: 'Assign Service'},
    {id:"Performance Analytics", label:'Performance Analytics'}
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-blue-50 flex flex-col lg:flex-row">
      {/* Sidebar navigation */}
      <nav className="bg-white shadow-lg w-full lg:w-64 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r">
        {navigationItems.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`block w-full text-left mb-2 px-4 py-3 rounded-lg font-semibold transition
              ${activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main content container */}
      <main className="flex-1 p-6 overflow-auto">
        {tabComponents[activeTab] || <div>Select a tab</div>}
      </main>
    </div>
  );
}
