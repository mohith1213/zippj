import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UnifiedLoanApplication from '../../UseCase3/UnifiedLoanApplication';

function LoanApplication({ addApplication, updateApplication }) {
  const navigate = useNavigate();
  const location = useLocation();

  const initialApp = location.state?.application;
  const formSrc = initialApp?.formData && typeof initialApp.formData === 'object' ? initialApp.formData : initialApp;
  const initialData = formSrc
    ? {
        // Personal
        fullName: formSrc.fullName || '',
        phone: formSrc.phone || '',
        email: formSrc.email || '',
        address: formSrc.address || '',
        dob: formSrc.dob || '',
        age: formSrc.age != null ? String(formSrc.age) : '',
        maritalStatus: formSrc.maritalStatus || '',
        gender: formSrc.gender || '',
        aadharNumber: formSrc.aadharNumber || '',
        panNumber: formSrc.panNumber || '',
        passportNumber: formSrc.passportNumber || '',
        fatherName: formSrc.fatherName || '',
        highestQualification: formSrc.highestQualification || '',
        // Employment
        occupationType: formSrc.occupationType || '',
        employer: formSrc.employer || '',
        designation: formSrc.designation || '',
        totalExperience: formSrc.totalExperience || '',
        officeAddress: formSrc.officeAddress || '',
        // Existing loans
        hasLoans: formSrc.hasLoans || '',
        existingLoanType: formSrc.existingLoanType || '',
        existingLender: formSrc.existingLender || '',
        outstandingAmount: formSrc.outstandingAmount != null ? String(formSrc.outstandingAmount) : '',
        existingEmi: formSrc.existingEmi != null ? String(formSrc.existingEmi) : '',
        tenureRemaining: formSrc.tenureRemaining != null ? String(formSrc.tenureRemaining) : '',
        // Loan details
        loanType: formSrc.loanType || '',
        amount: formSrc.amount != null ? String(formSrc.amount) : (formSrc.loanAmount != null ? String(formSrc.loanAmount) : ''),
        duration: formSrc.duration != null ? String(formSrc.duration) : (formSrc.tenure != null ? String(formSrc.tenure) : ''),
      }
    : undefined;

  const handleSubmit = (app) => {
    if (initialApp?.id && typeof updateApplication === 'function') {
      const updated = { ...initialApp, ...app, id: initialApp.id, status: 'Pending' };
      updateApplication(updated);
    } else if (typeof addApplication === 'function') {
      addApplication(app);
    }
    navigate('/customer-dashboard/applications', {
      state: { message: 'Application submitted successfully!' }
    });
  };

  return (
    <div className="dashboard-container">
      <div className="container-fluid">
        <div className="mx-auto" style={{ maxWidth: '1160px' }}>
          <UnifiedLoanApplication onSubmit={handleSubmit} initialData={initialData} />
        </div>
      </div>
    </div>
  );
}

export default LoanApplication;
