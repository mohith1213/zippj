// App.js
import React, { useState, useEffect } from 'react';
import AllPopup from '../components/AllPopup';
import { useNavigate } from 'react-router-dom';
import { listMakerQueue, makerApprove, makerReject, getApplicationDetails } from '../api/loans';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import ApplicationReview from './components/ApplicationReview/ApplicationReview';
// Backend integration replaces static data

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
  const [logoutModal, setLogoutModal] = useState(false);
  const [infoModal, setInfoModal] = useState({ show: false, title: '', message: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    listMakerQueue()
      .then(list => {
        const apps = (list || []).map(it => ({
          id: it.applicationNumber || it.id,
          customerName: '',
          phone: '',
          email: '',
          status: (String(it.status||'').toLowerCase().includes('approved') ? 'With Checker' : (String(it.status||'').toLowerCase().includes('rejected') ? 'Rejected' : 'Pending')),
          // adapt to dashboard tiles
          loanType: it.loanType,
          loanAmount: Number(it.amount || 0),
          appliedDate: '',
        }));
        setApplications(apps);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Approve application
  const handleApprove = async () => {
    if (!selectedApplication || !reviewComments.trim()) {
      setInfoModal({ show: true, title: 'Approve Application', message: 'Please add review comments before approving.' });
      return;
    }
    try {
      const au = JSON.parse(localStorage.getItem('authUser') || 'null');
      const userId = au?.id;
      await makerApprove(selectedApplication.id, userId, reviewComments);
      setApplications(prev => prev.map(app => app.id === selectedApplication.id ? { ...app, status: 'With Checker' } : app));
      setInfoModal({ show: true, title: 'Sent to Checker', message: 'Application sent to checker successfully.' });
    } catch (e) {
      setInfoModal({ show: true, title: 'Error', message: 'Failed to approve. Please try again.' });
    }
    setSelectedApplication(null);
    setReviewComments('');
    setActiveTab('personal');
    setCurrentPage('dashboard');
  };

  // Reject application
  const handleReject = async () => {
    if (!selectedApplication || !reviewComments.trim()) {
      setInfoModal({ show: true, title: 'Reject Application', message: 'Please add review comments before rejecting.' });
      return;
    }
    try {
      const au = JSON.parse(localStorage.getItem('authUser') || 'null');
      const userId = au?.id;
      await makerReject(selectedApplication.id, userId, reviewComments);
      setApplications(prev => prev.map(app => app.id === selectedApplication.id ? { ...app, status: 'Rejected' } : app));
      setInfoModal({ show: true, title: 'Rejected', message: 'Application rejected successfully.' });
    } catch (e) {
      setInfoModal({ show: true, title: 'Error', message: 'Failed to reject. Please try again.' });
    }
    setSelectedApplication(null);
    setReviewComments('');
    setActiveTab('personal');
    setCurrentPage('dashboard');
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

  const handleLogout = () => setLogoutModal(true);
  const confirmLogout = () => { navigate('/login'); };

  // Filtered applications
  const filteredApplications =
    applicationFilter === 'all'
      ? applications
      : applications.filter(app => app.status === applicationFilter);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Handle "Review" click from Dashboard
  const handleReviewClick = async (application) => {
    setActiveTab('personal');
    setCurrentPage('review');
    try {
      const detail = await getApplicationDetails(application.id);
      if (!detail) { setSelectedApplication(application); return; }
      // Map backend LoanDetailDto to Maker review structure
      const mapped = {
        id: detail.applicationNumber || String(detail.id || application.id),
        status: (String(detail.status||'').toLowerCase().includes('approved') ? 'With Checker' : (String(detail.status||'').toLowerCase().includes('rejected') ? 'Rejected' : 'Pending')),
        personalDetails: {
          firstName: '',
          middleName: '',
          lastName: '',
          dateOfBirth: '',
          gender: '',
          maritalStatus: '',
          aadhaarNumber: '',
          panNumber: '',
          passportNumber: '',
          fatherName: '',
          education: '',
          currentAddress: detail.address || '',
          permanentAddress: detail.address || ''
        },
        employmentDetails: {
          occupationType: detail.occupationType || '',
          companyName: detail.employer || '',
          businessName: detail.businessName || '',
          designation: '',
          workExperience: '',
          monthlyIncome: undefined,
          employeeId: '',
          businessRegistration: '',
          gstNumber: detail.gstDoc ? 'Provided' : '',
          annualTurnover: undefined,
          officeAddress: '',
          workEmail: '',
          workPhone: '',
          department: '',
          employmentType: '',
          joiningDate: ''
        },
        employmentDocuments: [
          ...(detail.payslip ? [{ type: 'salary', name: 'Payslip', uploaded: true }] : []),
          ...(detail.bankStatements ? [{ type: 'bank', name: 'Bank Statements', uploaded: true }] : []),
          ...(detail.itrDoc ? [{ type: 'itr', name: 'ITR', uploaded: true }] : []),
          ...(detail.employmentProof ? [{ type: 'employment', name: 'Employment Proof', uploaded: true }] : []),
          ...(detail.gstDoc ? [{ type: 'gst', name: 'GST', uploaded: true }] : []),
          ...(detail.saleAgreement ? [{ type: 'home', name: 'Sale Agreement', uploaded: true }] : []),
          ...(detail.encumbranceCertificate ? [{ type: 'home-ec', name: 'EC', uploaded: true }] : []),
          ...(detail.vehicleInvoice ? [{ type: 'vehicle-invoice', name: 'Vehicle Invoice', uploaded: true }] : []),
          ...(detail.vehicleQuotation ? [{ type: 'vehicle-quotation', name: 'Vehicle Quotation', uploaded: true }] : [])
        ],
        loanDetails: {
          loanType: detail.loanType,
          loanAmount: Number(detail.amount || 0),
          loanDuration: `${detail.tenureMonths || 0} months`,
          estimatedEmi: Number(detail.estimatedEmi || 0)
        },
        references: [],
        existingLoanDetails: {
          loanType: '',
          lender: '',
          outstandingAmount: Number(detail.existingLoanAmount || 0),
          emi: Number(detail.existingLoanEmi || 0),
          tenureRemaining: ''
        },
        personalDocuments: [],
      };
      setSelectedApplication(mapped);
    } catch {
      setSelectedApplication(application);
    }
  };

  return (
    <>
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
    {/* Modals */}
    <AllPopup
      show={logoutModal}
      title="Logout"
      message="Are you sure you want to logout?"
      onClose={() => setLogoutModal(false)}
      onConfirm={confirmLogout}
      confirmText="Logout"
      cancelText="Cancel"
      confirmVariant="danger"
    />
    <AllPopup
      show={infoModal.show}
      title={infoModal.title}
      message={infoModal.message}
      onClose={() => setInfoModal({ ...infoModal, show: false })}
    />
    </>
  );
};

export default UseCase4;
