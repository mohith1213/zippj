// App.js
import React, { useState, useEffect } from 'react';
import AllPopup from '../components/AllPopup';
import { useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import ApplicationReview from './components/ApplicationReview/ApplicationReview';
import { staticNotifications } from './data/mockData';
import { listByStatus, sendToChecker, rejectApplication } from '../api/applications';

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

  useEffect(() => {
    const load = async () => {
      try {
        const apiApps = await listByStatus('Pending');
        const mapped = (apiApps || []).map(mapDtoToMakerView);
        setApplications(mapped);
      } catch {
        setApplications([]);
      }
      setNotifications(staticNotifications);
    };
    load();
  }, []);

  const mapDtoToMakerView = (dto) => {
    const fd = dto.formData || {};
    const [firstName = '', middleName = '', lastName = ''] = String(fd.fullName || '').split(' ');
    const statusMap = { 'Pending': 'Reading Review', 'With Checker': 'With Checker', 'Approved': 'Approved', 'Rejected': 'Rejected' };
    return {
      id: dto.id,
      customerName: fd.fullName || 'Customer',
      email: fd.email || '',
      phone: fd.phone || '',
      age: fd.age ? Number(fd.age) : undefined,
      submittedDate: dto.appliedDate,
      loanAmount: Number(fd.amount ?? dto.amount ?? 0),
      tenure: Number(fd.duration ?? dto.tenure ?? 0),
      loanType: fd.loanType || dto.loanType,
      cibilScore: undefined,
      status: statusMap[dto.status] || dto.status,
      personalDetails: {
        firstName,
        middleName,
        lastName,
        dateOfBirth: fd.dob || '',
        gender: fd.gender || '',
        maritalStatus: fd.maritalStatus || '',
        aadharNumber: fd.aadharNumber || '',
        panNumber: fd.panNumber || '',
        passportNumber: fd.passportNumber || '',
        fatherName: fd.fatherName || '',
        education: fd.highestQualification || '',
        currentAddress: fd.address || '',
        permanentAddress: fd.address || '',
      },
      personalDocuments: [
        { name: 'Photograph', verified: !!fd.photograph, file: fd.photograph ? 'photograph' : 'not_provided', type: 'photo' },
        { name: 'ID Proof', verified: !!fd.idProof, file: fd.idProof ? 'id_proof' : 'not_provided', type: 'identity' },
        { name: 'Address Proof', verified: !!fd.addressProof, file: fd.addressProof ? 'address_proof' : 'not_provided', type: 'address' },
        { name: 'CIBIL Report', verified: !!fd.cibilReport, file: fd.cibilReport ? 'cibil_report' : 'not_provided', type: 'bank' },
      ],
      employmentDetails: {
        occupationType: fd.occupationType || '',
        companyName: fd.employer || '',
        businessName: fd.employer || '',
        designation: fd.designation || '',
        workExperience: fd.totalExperience || '',
        monthlyIncome: undefined,
        officeAddress: fd.officeAddress || '',
      },
      employmentDocuments: [
        { name: 'Payslip', verified: !!fd.salariedPayslip, file: fd.salariedPayslip ? 'payslip' : 'not_provided', type: 'salary' },
        { name: 'Employment Proof', verified: !!fd.salariedEmploymentProof, file: fd.salariedEmploymentProof ? 'employment_proof' : 'not_provided', type: 'employment' },
        { name: 'ITR (Salaried)', verified: !!fd.salariedItr, file: fd.salariedItr ? 'itr_salaried' : 'not_provided', type: 'itr' },
        { name: 'ITR (Self-Employed)', verified: !!fd.selfItr, file: fd.selfItr ? 'itr_self' : 'not_provided', type: 'itr' },
        { name: 'GST', verified: !!fd.selfGst, file: fd.selfGst ? 'gst' : 'not_provided', type: 'gst' },
        { name: 'Bank Statements', verified: !!fd.selfBankStatements, file: fd.selfBankStatements ? 'bank_statements' : 'not_provided', type: 'bank' },
      ],
      loanDetails: {
        propertyValue: undefined,
        downPayment: undefined,
        interestRate: undefined,
        emi: undefined,
        loanType: fd.loanType || dto.loanType,
        loanAmount: Number(fd.amount ?? dto.amount ?? 0),
        loanDuration: fd.duration || dto.tenure || '',
        cibilScore: undefined,
      },
      loanDocuments: [
        { name: 'Encumbrance Certificate', verified: !!fd.homeEc, file: fd.homeEc ? 'home_ec' : 'not_provided', type: 'property' },
        { name: 'Sale Agreements', verified: !!fd.homeSaleAgreements, file: fd.homeSaleAgreements ? 'sale_agreements' : 'not_provided', type: 'property' },
        { name: 'Vehicle Invoice', verified: !!fd.vehicleInvoice, file: fd.vehicleInvoice ? 'vehicle_invoice' : 'not_provided', type: 'vehicle' },
        { name: 'Vehicle Quotation', verified: !!fd.vehicleQuotation, file: fd.vehicleQuotation ? 'vehicle_quotation' : 'not_provided', type: 'vehicle' },
      ],
      existingLoans: fd.hasLoans === 'Yes' ? [{
        type: fd.existingLoanType || '',
        lender: fd.existingLender || '',
        outstandingAmount: fd.outstandingAmount || '',
        emi: fd.existingEmi || '',
        tenureRemaining: fd.tenureRemaining || '',
      }] : [],
      references: [],
    };
  };

  // Approve application
  const handleApprove = async () => {
    if (!selectedApplication || !reviewComments.trim()) {
      setInfoModal({ show: true, title: 'Approve Application', message: 'Please add review comments before approving.' });
      return;
    }
    try {
      const updated = await sendToChecker(selectedApplication.id);
      setApplications(prev => prev.map(a => a.id === updated.id ? mapDtoToMakerView(updated) : a));
      setNotifications(prev => [{
        id: Date.now(),
        message: `Application ${updated.id} sent to checker`,
        type: 'success', read: false, timestamp: new Date().toISOString(),
      }, ...prev]);
      setSelectedApplication(null);
      setReviewComments('');
      setActiveTab('personal');
      setCurrentPage('dashboard');
      setInfoModal({ show: true, title: 'Sent to Checker', message: 'Application sent to checker successfully.' });
    } catch {}
  };

  // Reject application
  const handleReject = async () => {
    if (!selectedApplication || !reviewComments.trim()) {
      setInfoModal({ show: true, title: 'Reject Application', message: 'Please add review comments before rejecting.' });
      return;
    }
    try {
      const updated = await rejectApplication(selectedApplication.id, reviewComments);
      setApplications(prev => prev.map(a => a.id === updated.id ? mapDtoToMakerView(updated) : a));
      setNotifications(prev => [{
        id: Date.now(),
        message: `Application ${updated.id} rejected`,
        type: 'warning', read: false, timestamp: new Date().toISOString(),
      }, ...prev]);
      setSelectedApplication(null);
      setReviewComments('');
      setActiveTab('personal');
      setCurrentPage('dashboard');
      setInfoModal({ show: true, title: 'Rejected', message: 'Application rejected successfully.' });
    } catch {}
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
  const handleReviewClick = application => {
    setSelectedApplication(application);
    setCurrentPage('review');
    setActiveTab('personal');
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
