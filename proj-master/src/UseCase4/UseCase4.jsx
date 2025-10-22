// App.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import ApplicationReview from './components/ApplicationReview/ApplicationReview';
import { staticApplications, staticNotifications } from './data/mockData';

const UseCase4 = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [reviewComments, setReviewComments] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('personal');
  const [currentPage, setCurrentPage] = useState('dashboard'); // dashboard | review
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [applicationFilter, setApplicationFilter] = useState('all');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    setApplications(staticApplications);
    setNotifications(staticNotifications);
  }, []);

  // Approve application
  const handleApprove = () => {
    if (!selectedApplication || !reviewComments.trim()) {
      alert('Please add review comments before approving');
      return;
    }

    setApplications(prev =>
      prev.map(app =>
        app.id === selectedApplication.id
          ? { ...app, status: 'With Checker' }
          : app
      )
    );

    setNotifications(prev => [
      {
        id: Date.now(),
        message: `Application ${selectedApplication.id} sent to checker`,
        type: 'success',
        read: false,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);

    setSelectedApplication(null);
    setReviewComments('');
    setActiveTab('personal');
    setCurrentPage('dashboard');
    alert('Application sent to checker successfully');
  };

  // Reject application
  const handleReject = () => {
    if (!selectedApplication || !reviewComments.trim()) {
      alert('Please add review comments before rejecting');
      return;
    }

    setApplications(prev =>
      prev.map(app =>
        app.id === selectedApplication.id ? { ...app, status: 'Rejected' } : app
      )
    );

    setNotifications(prev => [
      {
        id: Date.now(),
        message: `Application ${selectedApplication.id} rejected`,
        type: 'warning',
        read: false,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);

    setSelectedApplication(null);
    setReviewComments('');
    setActiveTab('personal');
    setCurrentPage('dashboard');
    alert('Application rejected successfully');
  };

  // Notifications
  const markNotificationAsRead = notificationId => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
      navigate('/login');
    }
  };

  // Filtered applications
  const filteredApplications =
    applicationFilter === 'all'
      ? applications
      : applications.filter(app => app.status === applicationFilter);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Handle "Review" click from Dashboard
  const handleReviewClick = application => {
    setSelectedApplication(application);
    setCurrentPage('review');
    setActiveTab('personal');
  };

  return (
    <div className="app">
      {/* Header */}
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        notificationOpen={notificationOpen}
        setNotificationOpen={setNotificationOpen}
        unreadNotificationsCount={unreadNotificationsCount}
        notifications={notifications}
        markNotificationAsRead={markNotificationAsRead}
        markAllNotificationsAsRead={markAllNotificationsAsRead}
        handleLogout={handleLogout}
      />

      <div className="container">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          currentPage={currentPage === 'review' ? 'applications' : currentPage} // highlight applications
          setCurrentPage={setCurrentPage}
        />

        {/* Overlay for small screens */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="main-content">
          {currentPage === 'dashboard' && (
            <Dashboard
              applications={filteredApplications}
              applicationFilter={applicationFilter}
              setApplicationFilter={setApplicationFilter}
              setSelectedApplication={handleReviewClick} // passes application to review
              setCurrentPage={setCurrentPage}
              setActiveTab={setActiveTab}
            />
          )}

          {currentPage === 'review' && selectedApplication && (
            <ApplicationReview
              selectedApplication={selectedApplication}
              reviewComments={reviewComments}
              setReviewComments={setReviewComments}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setCurrentPage={setCurrentPage}
              handleApprove={handleApprove}
              handleReject={handleReject}
            />
          )}

          {currentPage === 'review' && !selectedApplication && (
            <div className="no-application">
              <h3>Select an application to review</h3>
              <p>Choose an application from the dashboard to view details and take action</p>
              <button
                className="back-btn"
                onClick={() => setCurrentPage('dashboard')}
              >
                ← Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UseCase4;
