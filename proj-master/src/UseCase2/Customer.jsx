import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MyApplications from './components/MyApplications';
import Profile from './components/Profile';
import ApplicationDetails from './components/ApplicationDetails';
import NoFeature from './components/nofeature';
import LoanApplication from './components/LoanApplication';
import CustomerNotifications from './components/CustomerNotifications';
import { listCustomerApplications } from '../api/loans';
import './styles/customer.base.css';

function Customer() {
  // state
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  // menu
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      const au = localStorage.getItem('authUser');
      if (au) {
        const parsed = JSON.parse(au);
        setUser(parsed);
        if (parsed?.id) {
          listCustomerApplications(parsed.id)
            .then((list) => {
              // map backend summary to UI list fields
              const mapped = (list || []).map(it => ({
                id: it.applicationNumber || it.id,
                loanType: it.loanType,
                amount: it.amount || 0,
                tenure: it.tenureMonths || 0,
                status: it.status || 'Under Review',
                appliedDate: '',
                remarks: ''
              }));
              setApplications(mapped);
            })
            .catch(() => setApplications([]));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Handlers to add/update applications and persist
  const addApplication = (app) => {
    // optimistic add, backend submit handled inside the form component
    const updated = [app, ...applications];
    setApplications(updated);
  };

  const updateApplication = (updatedAppOrList) => {
    if (Array.isArray(updatedAppOrList)) {
      setApplications(updatedAppOrList);
      return;
    }
    const updatedList = applications.map((a) =>
      a.id === updatedAppOrList.id ? { ...a, ...updatedAppOrList } : a
    );
    setApplications(updatedList);
  };

  // spinner
  if (!user) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // layout
  return (
    <div className="usecase2 app-container">
      {/* persistent */}
      <Navbar user={user} onMenu={() => setSidebarOpen(true)} />
      <div className="main-content">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="content-area">
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard applications={applications} user={user} />} />
            <Route path="applications" element={<MyApplications applications={applications} />} />
            <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="application-details" element={<ApplicationDetails />} />
            <Route
              path="loanapplication"
              element={<LoanApplication addApplication={addApplication} updateApplication={updateApplication} />}
            />
            <Route path="notifications" element={<CustomerNotifications />} />
            <Route path="no-feature" element={<NoFeature />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Customer;
