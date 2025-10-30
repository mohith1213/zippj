import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UnifiedLoanApplication from '../../UseCase3/UnifiedLoanApplication';
import { applyLoan, resubmitLoan } from '../../api/loans';

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

  const handleSubmit = async (app) => {
    const auRaw = localStorage.getItem('authUser');
    const au = auRaw ? JSON.parse(auRaw) : null;
    const customerId = au?.id;
    const occupationType = app.occupationType || '';
    const loanType = app.loanType || '';
    // map UI fields to backend
    const payload = {
      customerId,
      phone: String(app.phone || ''),
      address: String(app.address || ''),
      age: app.age ? Number(app.age) : 0,
      occupationType,
      employer: occupationType === 'Salaried' ? String(app.employer || '') : undefined,
      employmentProof: occupationType === 'Salaried' ? 'employment-proof' : undefined,
      payslip: occupationType === 'Salaried' ? 'payslip' : undefined,
      itrDoc: (occupationType === 'Salaried' || occupationType === 'Self-Employed') ? 'itr' : undefined,
      businessName: occupationType === 'Self-Employed' ? String(app.employer || app.businessName || '') : undefined,
      gstDoc: occupationType === 'Self-Employed' ? 'gst' : undefined,
      bankStatements: occupationType === 'Self-Employed' ? 'bank-statements' : undefined,
      loanType,
      amount: app.amount ? Number(app.amount) : 0,
      tenureMonths: app.duration ? Number(app.duration) : 0,
      annualInterestRate: 10.0,
      saleAgreement: loanType === 'Home Loan' ? 'sale-agreement' : undefined,
      encumbranceCertificate: loanType === 'Home Loan' ? 'ec' : undefined,
      vehicleInvoice: loanType === 'Vehicle Loan' ? 'invoice' : undefined,
      vehicleQuotation: loanType === 'Vehicle Loan' ? 'quotation' : undefined,
      hasExistingLoans: String(app.hasLoans || '').toLowerCase() === 'yes',
      existingLoanAmount: app.outstandingAmount ? Number(app.outstandingAmount) : undefined,
      existingLoanEmi: app.existingEmi ? Number(app.existingEmi) : undefined
    };

    try {
      if (initialApp?.id) {
        await resubmitLoan({ ...payload, applicationId: initialApp.id });
        if (typeof updateApplication === 'function') {
          updateApplication({ ...initialApp, status: 'Under Review' });
        }
      } else {
        await applyLoan(payload);
        if (typeof addApplication === 'function') {
          addApplication({ id: 'TEMP', loanType: payload.loanType, amount: payload.amount, tenure: payload.tenureMonths, status: 'Under Review' });
        }
      }
      navigate('/customer-dashboard/applications', {
        state: { message: 'Application submitted successfully!' }
      });
    } catch (e) {
      navigate('/customer-dashboard/applications', {
        state: { message: 'Submission failed. Please try again.' }
      });
    }
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
