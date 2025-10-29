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
import './styles/customer.base.css';

// api
import { listApplications, createApplication, updateApplicationApi } from '../api/applications';

function Customer() {
  const dummyUser = {
    id: 1,
    name: "Ram",
    email: "ram@example.com",
    phone: "+91 98765 43211",
    dob: "1992-08-22",
  };

  const dummyApplications = [];

  // state
  const [user, setUser] = useState(dummyUser);
  const [applications, setApplications] = useState(dummyApplications);
  // menu
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // normalize old records from localStorage to new schema
  const normalizeApp = (app) => {
    const ensureId = (id) => {
      if (typeof id === 'string' && id.startsWith('LA')) return id;
      const genId = () => `LA${new Date().getFullYear()}${Math.floor(Math.random()*1e6).toString().padStart(6,'0')}`;
      return genId();
    };
    const formSrc = app.formData && typeof app.formData === 'object' ? app.formData : app;
    const normalized = {
      ...app,
      id: ensureId(app.id),
      userId: 1,
      status: app.status || 'Pending',
      appliedDate: app.appliedDate || new Date().toLocaleDateString('en-IN'),
      remarks: app.remarks || 'Application submitted and pending initial review',
    };
    if (!app.formData) {
      normalized.formData = {
        // Personal
        fullName: formSrc.fullName || '',
        phone: formSrc.phone || '',
        email: formSrc.email || '',
        address: formSrc.address || '',
        dob: formSrc.dob || '',
        age: formSrc.age || '',
        maritalStatus: formSrc.maritalStatus || '',
        gender: formSrc.gender || '',
        aadharNumber: formSrc.aadharNumber || '',
        panNumber: formSrc.panNumber || '',
        passportNumber: formSrc.passportNumber || '',
        fatherName: formSrc.fatherName || '',
        highestQualification: formSrc.highestQualification || '',
        // Employment
        occupationType: formSrc.occupationType || (formSrc.employmentType || ''),
        employer: formSrc.employer || '',
        designation: formSrc.designation || '',
        totalExperience: formSrc.totalExperience || '',
        officeAddress: formSrc.officeAddress || '',
        // Existing loans
        hasLoans: formSrc.hasLoans || '',
        existingLoanType: formSrc.existingLoanType || '',
        existingLender: formSrc.existingLender || '',
        outstandingAmount: formSrc.outstandingAmount || '',
        existingEmi: formSrc.existingEmi || '',
        tenureRemaining: formSrc.tenureRemaining || '',
        // Loan details
        loanType: formSrc.loanType || normalized.loanType || '',
        amount: formSrc.amount ?? formSrc.loanAmount ?? normalized.amount ?? '',
        duration: formSrc.duration ?? formSrc.tenure ?? normalized.tenure ?? '',
      };
    }
    return normalized;
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await listApplications(1);
        setApplications(Array.isArray(data) ? data : []);
      } catch (e) {
        setApplications([]);
      }
    };
    load();
  }, []);

  // Handlers to add/update applications and persist
  const addApplication = async (app) => {
    try {
      const payload = {
        userId: 1,
        loanType: app.loanType,
        amount: app.amount,
        tenure: app.tenure ?? app.duration,
        formData: app.formData && typeof app.formData === 'object' ? app.formData : app,
      };
      const created = await createApplication(payload);
      setApplications((prev) => [created, ...prev]);
    } catch (e) {}
  };

  const updateApplication = async (updatedAppOrList) => {
    if (Array.isArray(updatedAppOrList)) {
      setApplications(updatedAppOrList);
      return;
    }
    try {
      const fields = {
        loanType: updatedAppOrList.loanType,
        amount: updatedAppOrList.amount,
        tenure: updatedAppOrList.tenure ?? updatedAppOrList.duration,
        remarks: updatedAppOrList.remarks,
      };
      const formData = updatedAppOrList.formData && typeof updatedAppOrList.formData === 'object'
        ? updatedAppOrList.formData
        : updatedAppOrList;
      const saved = await updateApplicationApi(updatedAppOrList.id, { fields, formData });
      setApplications((prev) => prev.map((a) => (a.id === saved.id ? saved : a)));
    } catch (e) {}
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
