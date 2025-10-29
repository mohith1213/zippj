// components/ApplicationReview/ReviewTabs/ReviewTabs.js
import React from 'react';

import './ReviewTabs.css';
import PersonalTab from '../Tabs/PersonalTab/PersonalTab';
import EmploymentTab from '../Tabs/EmploymentTab/EmploymentTab';
import LoanTab from '../Tabs/LoanTab/LoanTab';
import ReferencesTab from '../Tabs/ReferencesTab/ReferencesTab';

const ReviewTabs = ({ activeTab, setActiveTab, selectedApplication }) => {
  const tabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'employment', label: 'Employment' },
    { id: 'loan', label: 'Loan Details' },
    { id: 'references', label: 'References' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalTab application={selectedApplication} />;
      case 'employment':
        return <EmploymentTab application={selectedApplication} />;
      case 'loan':
        return <LoanTab application={selectedApplication} />;
      case 'references':
        return <ReferencesTab application={selectedApplication} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="tabs-navigation">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content-container">
        {renderTabContent()}
      </div>
    </>
  );
};

export default ReviewTabs;