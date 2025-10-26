import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../styles/customer.base.css';
import '../styles/application.details.css';

const ApplicationDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const application = location.state?.application;

  // Prefer data captured by UnifiedLoanApplication (UseCase3)
  const fd = application?.formData && typeof application.formData === 'object'
    ? application.formData
    : application;

  if (!application) {
    return (
      <div className="dashboard-container">
        <div className="container-fluid">
          <div className="text-center py-5">
            <i className="bi bi-exclamation-triangle text-warning mb-3" style={{fontSize: '3rem'}}></i>
            <h3>Application Not Found</h3>
            <p className="text-muted">The requested application could not be found.</p>
            <button className="btn btn-primary-custom" onClick={() => navigate('/customer-dashboard/applications')}>
              <i className="bi bi-arrow-left me-2"></i>Back to Applications
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'under review':
        return 'status-under-review';
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      case 'more info required':
        return 'status-more-info';
      default:
        return 'status-pending';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateEMI = (amount, tenure) => {
    const principal = parseFloat(amount);
    const months = parseInt(tenure);
    const rate = 0.12; // 12% annual interest rate
    const monthlyRate = rate / 12;
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const handleEditClick = () => {
    navigate('/customer-dashboard/loanapplication', {
      state: { application }
    });
  };

  return (
    <div className="dashboard-container">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 details-page">
            <button className="btn btn-back mb-4" onClick={() => navigate('/customer-dashboard/applications')}>
              <i className="bi bi-arrow-left me-2"></i>Back to Applications
            </button>

            {/* Header */}
            <div className="card card-custom mb-4 details-header">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="mb-1">{application.loanType || fd?.loanType || 'Loan Application'}</h2>
                    <p className="text-muted mb-2">Application ID: #{application.id}</p>
                    <span className={`status-badge ${getStatusBadgeClass(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                  <div className="col-md-4 text-md-end mt-3 mt-md-0">
                    <div className="details-header-actions">
                      <button className="btn btn-outline-primary details-header-action" onClick={() => navigate('/customer-dashboard/no-feature')}>
                        <i className="bi bi-download me-1"></i>Download PDF
                      </button>
                      {application.status.toLowerCase() === 'rejected' && (
                        <button className="btn btn-warning details-header-action" onClick={handleEditClick}>
                          <i className="bi bi-pencil-square me-1"></i>Edit & Resubmit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row gx-5 gy-4 details-grid">
              {/* Personal Info */}
              <div className="col-lg-6">
                <div className="card card-custom h-100 details-section">
                  <div className="card-body">
                    <h5 className="card-title mb-3"><i className="bi bi-person text-info me-2"></i>Personal Information</h5>
                    <div className="row row-cols-1 row-cols-md-2 g-3">
                      <div className="col"><div className="profile-label">Full Name</div><div className="profile-value">{fd?.fullName || '-'}</div></div>
                      <div className="col"><div className="profile-label">Phone</div><div className="profile-value">{fd?.phone || '-'}</div></div>
                      <div className="col"><div className="profile-label">Email</div><div className="profile-value">{fd?.email || '-'}</div></div>
                      <div className="col"><div className="profile-label">DOB</div><div className="profile-value">{fd?.dob || '-'}</div></div>
                      <div className="col"><div className="profile-label">Age</div><div className="profile-value">{fd?.age || '-'}</div></div>
                      <div className="col"><div className="profile-label">Gender</div><div className="profile-value">{fd?.gender || '-'}</div></div>
                      <div className="col"><div className="profile-label">Marital Status</div><div className="profile-value">{fd?.maritalStatus || '-'}</div></div>
                      <div className="col"><div className="profile-label">Aadhar Number</div><div className="profile-value">{fd?.aadharNumber || '-'}</div></div>
                      <div className="col"><div className="profile-label">PAN Number</div><div className="profile-value">{fd?.panNumber || '-'}</div></div>
                      <div className="col-12"><div className="profile-label">Address</div><div className="profile-value">{fd?.address || '-'}</div></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div className="col-lg-6">
                <div className="card card-custom h-100 details-section">
                  <div className="card-body">
                    <h5 className="card-title mb-3"><i className="bi bi-cash-coin text-primary me-2"></i>Loan Details</h5>
                    <div className="row row-cols-1 row-cols-md-2 g-3">
                      <div className="col"><div className="profile-label">Loan Type</div><div className="profile-value">{fd?.loanType || application.loanType || '-'}</div></div>
                      <div className="col"><div className="profile-label">Loan Amount</div><div className="profile-value text-primary fw-semibold">{formatCurrency(Number(fd?.amount ?? application.amount ?? 0))}</div></div>
                      <div className="col"><div className="profile-label">Tenure (months)</div><div className="profile-value">{fd?.duration || application.tenure || '-'}</div></div>
                      <div className="col"><div className="profile-label">Estimated EMI</div><div className="profile-value text-success fw-semibold">{formatCurrency(calculateEMI(Number(fd?.amount ?? application.amount ?? 0), Number(fd?.duration ?? application.tenure ?? 0)))}</div></div>
                      <div className="col"><div className="profile-label">Employment Type</div><div className="profile-value">{fd?.occupationType || application.employmentType || '-'}</div></div>
                      <div className="col"><div className="profile-label">Employer/Business</div><div className="profile-value">{fd?.employer || '-'}</div></div>
                      <div className="col"><div className="profile-label">Designation/Role</div><div className="profile-value">{fd?.designation || '-'}</div></div>
                      <div className="col"><div className="profile-label">Experience (years)</div><div className="profile-value">{fd?.totalExperience || '-'}</div></div>
                      <div className="col-12"><div className="profile-label">Office/Business Address</div><div className="profile-value">{fd?.officeAddress || '-'}</div></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Existing Loans (conditional) */}
              {(fd?.hasLoans === 'Yes') && (
                <div className="col-12">
                  <div className="card card-custom details-section">
                    <div className="card-body">
                      <h5 className="card-title mb-3"><i className="bi bi-journal-text text-secondary me-2"></i>Existing Loan Details</h5>
                      <div className="row row-cols-1 row-cols-md-3 g-3">
                        <div className="col"><div className="profile-label">Loan Type</div><div className="profile-value">{fd?.existingLoanType || '-'}</div></div>
                        <div className="col"><div className="profile-label">Lender</div><div className="profile-value">{fd?.existingLender || '-'}</div></div>
                        <div className="col"><div className="profile-label">Outstanding Amount</div><div className="profile-value">{fd?.outstandingAmount || '-'}</div></div>
                        <div className="col"><div className="profile-label">Monthly EMI</div><div className="profile-value">{fd?.existingEmi || '-'}</div></div>
                        <div className="col"><div className="profile-label">Tenure Remaining</div><div className="profile-value">{fd?.tenureRemaining || '-'}</div></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Documents Uploaded (from UseCase3 fields presence) */}
              <div className="col-12">
                <div className="card card-custom details-section details-docs">
                  <div className="card-body">
                    <h5 className="card-title mb-3"><i className="bi bi-file-earmark-text text-success me-2"></i>Documents Uploaded</h5>
                    <div className="docs-grid">
                      {[
                        { key: 'photograph', label: 'Photograph' },
                        { key: 'idProof', label: 'ID Proof' },
                        { key: 'addressProof', label: 'Address Proof' },
                        { key: 'cibilReport', label: 'CIBIL Report' },
                        { key: 'salariedPayslip', label: 'Payslip (Salaried)' },
                        { key: 'salariedEmploymentProof', label: 'Employment Proof (Salaried)' },
                        { key: 'salariedItr', label: 'ITR (Salaried)' },
                        { key: 'selfItr', label: 'ITR (Self-Employed)' },
                        { key: 'selfGst', label: 'GST Registration (Self-Employed)' },
                        { key: 'selfBankStatements', label: 'Bank Statements (Self-Employed)' },
                        { key: 'homeEc', label: 'Encumbrance Certificate (Home Loan)' },
                        { key: 'homeSaleAgreements', label: 'Sale Agreements (Home Loan)' },
                        { key: 'vehicleInvoice', label: 'Vehicle Invoice (Vehicle Loan)' },
                        { key: 'vehicleQuotation', label: 'Vehicle Quotation (Vehicle Loan)' },
                      ].map(({ key, label }) => (
                        <div key={key} className="doc-item">
                          <i className={`bi ${fd?.[key] ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-muted'}`}></i>
                          <span className="doc-label">{label}</span>
                          <span className={`doc-status ${fd?.[key] ? 'ok' : 'missing'}`}>{fd?.[key] ? 'Uploaded' : 'Not provided'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status & Remarks */}
              <div className="col-12">
                <div className="card card-custom details-section">
                  <div className="card-body">
                    <h5 className="card-title mb-3"><i className="bi bi-info-circle text-warning me-2"></i>Status & Remarks</h5>
                    <div className="row row-cols-1 row-cols-md-3 g-3 align-items-start">
                      <div className="col">
                        <div className="profile-label">Current Status</div>
                        <div className="profile-value">
                          <span className={`status-badge ${getStatusBadgeClass(application.status)}`}>{application.status}</span>
                        </div>
                      </div>
                      <div className="col">
                        <div className="profile-label">Applied Date</div>
                        <div className="profile-value">{application.appliedDate}</div>
                      </div>
                      <div className="col">
                        <div className="profile-label">Remarks</div>
                        <div className={`profile-value ${application.status.toLowerCase() === 'rejected' ? 'text-danger' : 'text-muted'}`}>{application.remarks || 'No remarks available'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* actions */}
            <div className="row">
              <div className="col-12">
                <div className="card card-custom details-actions-card">
                  <div className="card-body">
                    <div className="details-actions">
                      <button className="btn btn-outline-primary details-action" onClick={() => navigate('.', { state: { page: 'apply' } })}>
                        <i className="bi bi-telephone me-2"></i>Contact Support
                      </button>
                      <button className="btn btn-outline-info details-action" onClick={() => navigate('.', { state: { page: 'apply' } })}>
                        <i className="bi bi-chat-dots me-2"></i>Live Chat
                      </button>
                      <button className="btn btn-outline-secondary details-action" onClick={() => navigate('.', { state: { page: 'apply' } })}>
                        <i className="bi bi-printer me-2"></i>Print Application
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
