import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../styles/customer.base.css';

const ApplicationDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const application = location.state?.application;

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
          <div className="col-lg-10">
            <button className="btn btn-back mb-4" onClick={() => navigate('/customer-dashboard/applications')}>
              <i className="bi bi-arrow-left me-2"></i>Back to Applications
            </button>

            {/* header */}
            <div className="card card-custom mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="mb-2">{application.loanType}</h2>
                    <p className="text-muted mb-3">Application ID: #{application.id}</p>
                    <span className={`status-badge ${getStatusBadgeClass(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                  <div className="col-md-4 text-md-end mt-3 mt-md-0">
                    <div className="d-flex flex-column gap-2 align-items-md-end">
                      <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/customer-dashboard/no-feature')}>
                        <i className="bi bi-download me-1"></i>Download PDF
                      </button>
                      {application.status.toLowerCase() === 'rejected' && (
                        <button className="btn btn-warning btn-sm" onClick={handleEditClick}>
                          <i className="bi bi-pencil-square me-1"></i>Edit & Resubmit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* loan */}
              <div className="col-lg-6 mb-4">
                <div className="card card-custom h-100">
                  <div className="card-body">
                    <h5 className="card-title mb-4">
                      <i className="bi bi-cash-coin text-primary me-2"></i>
                      Loan Details
                    </h5>
                    <div className="row">
                      <div className="col-6">
                        <div className="profile-field">
                          <div className="profile-label">Loan Type</div>
                          <div className="profile-value">{application.loanType}</div>
                        </div>
                        <div className="profile-field">
                          <div className="profile-label">Loan Amount</div>
                          <div className="profile-value text-primary fw-bold">
                            {formatCurrency(application.amount)}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="profile-field">
                          <div className="profile-label">Tenure</div>
                          <div className="profile-value">{application.tenure} months</div>
                        </div>
                        <div className="profile-field">
                          <div className="profile-label">Estimated EMI</div>
                          <div className="profile-value text-success fw-bold">
                            {formatCurrency(calculateEMI(application.amount, application.tenure))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* personal */}
              <div className="col-lg-6 mb-4">
                <div className="card card-custom h-100">
                  <div className="card-body">
                    <h5 className="card-title mb-4">
                      <i className="bi bi-person text-info me-2"></i>
                      Personal & Financial Details
                    </h5>
                    <div className="profile-field">
                      <div className="profile-label">Monthly Income</div>
                      <div className="profile-value">{formatCurrency(application.monthlyIncome)}</div>
                    </div>
                    <div className="profile-field">
                      <div className="profile-label">Employment Type</div>
                      <div className="profile-value">{application.employmentType}</div>
                    </div>
                    <div className="profile-field">
                      <div className="profile-label">Purpose of Loan</div>
                      <div className="profile-value">{application.purpose}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* status */}
              <div className="col-lg-6 mb-4">
                <div className="card card-custom h-100">
                  <div className="card-body">
                    <h5 className="card-title mb-4">
                      <i className="bi bi-info-circle text-warning me-2"></i>
                      Application Status & Remarks
                    </h5>
                    <div className="profile-field">
                      <div className="profile-label">Current Status</div>
                      <div className="profile-value">
                        <span className={`status-badge ${getStatusBadgeClass(application.status)}`}>
                          {application.status}
                        </span>
                      </div>
                    </div>
                    <div className="profile-field">
                      <div className="profile-label">Applied Date</div>
                      <div className="profile-value">{application.appliedDate}</div>
                    </div>
                    <div className="profile-field">
                      <div className="profile-label">Remarks</div>
                      <div className={`profile-value ${application.status.toLowerCase() === 'rejected' ? 'text-danger' : 'text-muted'}`}>
                        {application.remarks || 'No remarks available'}
                      </div>
                    </div>
                    {/* Assigned Officer removed as requested */}
                  </div>
                </div>
              </div>

              {/* documents */}
              <div className="col-lg-6 mb-4">
                <div className="card card-custom h-100">
                  <div className="card-body">
                    <h5 className="card-title mb-4">
                      <i className="bi bi-file-earmark-text text-success me-2"></i>
                      Uploaded Documents
                    </h5>
                    {application.documents && application.documents.length > 0 ? (
                      <div className="list-group list-group-flush">
                        {application.documents.map((doc, index) => (
                          <div key={index} className="list-group-item px-0 py-3 border-0 border-bottom">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <i className="bi bi-filetype-pdf text-danger me-3"></i>
                                <div>
                                  <div className="fw-semibold">{doc.name}</div>
                                  <small className="text-muted">{doc.type} • {doc.size}</small>
                                  {doc.verified !== undefined && (
                                    <div>
                                      <span className={`badge ${doc.verified ? 'bg-success' : 'bg-warning'} mt-1`}>
                                        {doc.verified ? 'Verified' : 'Pending Verification'}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {/* removed */}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">No documents uploaded</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* actions */}
            <div className="row">
              <div className="col-12">
                <div className="card card-custom">
                  <div className="card-body">
                    <div className="d-flex flex-wrap gap-3 justify-content-center">
                      <button className="btn btn-outline-primary" onClick={() => navigate('.', { state: { page: 'apply' } })}>
                        <i className="bi bi-telephone me-2"></i>Contact Support
                      </button>
                      <button className="btn btn-outline-info" onClick={() => navigate('.', { state: { page: 'apply' } })}>
                        <i className="bi bi-chat-dots me-2"></i>Live Chat
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => navigate('.', { state: { page: 'apply' } })}>
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
