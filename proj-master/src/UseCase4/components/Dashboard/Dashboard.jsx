// components/Dashboard/Dashboard.js
import React, { useState } from 'react';
import ApplicationTile from './ApplicationTile/ApplicationTile';

import './Dashboard.css';

const Dashboard = ({
  applications,
  applicationFilter,
  setApplicationFilter,
  setSelectedApplication,
  setCurrentPage,
  setActiveTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');

  const getCibilStatus = (score) => {
    if (score >= 750) return 'excellent';
    if (score >= 650) return 'good';
    return 'fair';
  };

  const stats = {
    review: applications.filter(app => app.status === 'Reading Review').length,
    checker: applications.filter(app => app.status === 'With Checker').length,
    approved: applications.filter(app => app.status === 'Approved').length,
    rejected: applications.filter(app => app.status === 'Rejected').length
  };

  // Filter applications based on search
  const filteredApplications = applications.filter(application => {
    if (!searchTerm.trim()) return true;
    
    const term = searchTerm.toLowerCase();
    
    switch (searchCategory) {
      case 'applicationId':
        return application.id?.toLowerCase().includes(term);
      case 'customerName':
        return application.customerName?.toLowerCase().includes(term);
      case 'loanAmount':
        return application.loanAmount?.toString().includes(term);
      case 'cibilScore':
        return application.cibilScore?.toString().includes(term);
      case 'all':
      default:
        return (
          application.id?.toLowerCase().includes(term) ||
          application.customerName?.toLowerCase().includes(term) ||
          application.loanAmount?.toString().includes(term) ||
          application.cibilScore?.toString().includes(term) ||
          application.status?.toLowerCase().includes(term)
        );
    }
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled in the filteredApplications above
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchCategory('all');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Loan Applications Dashboard</h2>
        <p>Manage and review all loan applications</p>
      </div>

   

      {/* Search Section */}
      <div className="search-section">
        <div className="search-header">
          <h3>Search Applications</h3>
          <p>Find specific applications using the search criteria below</p>
        </div>
        
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-controls">
            <div className="search-input-group">
              <select 
                className="search-category"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="all">All Fields</option>
                <option value="applicationId">Application ID</option>
                <option value="customerName">Customer Name</option>
                <option value="loanAmount">Loan Amount</option>
                <option value="cibilScore">CIBIL Score</option>
                <option value="status">Status</option>
              </select>
              
              <div className="search-input-wrapper">
                <input 
                  type="text"
                  className="search-input"
                  placeholder={`Search by ${searchCategory === 'all' ? 'any field' : searchCategory}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    type="button"
                    className="clear-search"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            
            <button type="submit" className="search-btn">
              <span className="search-icon">🔍</span>
              Search
            </button>
          </div>
        </form>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="search-results-info">
            <p>
              Found {filteredApplications.length} application(s) matching "{searchTerm}" 
              in {searchCategory === 'all' ? 'all fields' : searchCategory}
            </p>
            <button 
              className="clear-results-btn"
              onClick={handleClearSearch}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Applications Grid */}
      <div className="applications-grid">
        {filteredApplications.map(application => (
          <ApplicationTile
            key={application.id}
            application={application}
            getCibilStatus={getCibilStatus}
            onClick={() => {
              setSelectedApplication(application);
              setCurrentPage('review');
              setActiveTab('personal');
            }}
          />
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="no-applications">
          <h3>No applications found</h3>
          <p>
            {searchTerm 
              ? `No applications match your search criteria. Try adjusting your search terms.`
              : 'There are no applications matching the current filter.'
            }
          </p>
          {searchTerm && (
            <button 
              className="clear-search-btn"
              onClick={handleClearSearch}
            >
              Show All Applications
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;