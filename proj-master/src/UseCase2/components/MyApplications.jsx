import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/customer.base.css';

const MyApplications = ({ applications }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredApplications, setFilteredApplications] = useState(applications);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    let filtered = applications;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => 
        app.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.loanType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toString().includes(searchTerm) ||
        app.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
  }, [applications, statusFilter, searchTerm]);

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


  const handleViewDetails = (application) => {
    navigate('/customer-dashboard/application-details', {
      state: { application }
    });
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bi bi-clock text-warning';
      case 'under review':
        return 'bi bi-search text-info';
      case 'approved':
        return 'bi bi-check-circle text-success';
      case 'rejected':
        return 'bi bi-x-circle text-danger';
      case 'more info required':
        return 'bi bi-info-circle text-warning';
      default:
        return 'bi bi-clock text-warning';
    }
  };

  const truncateRemarks = (remarks, maxLength = 50) => {
    if (!remarks) return 'No remarks available';
    if (remarks.length <= maxLength) return remarks;
    return remarks.substring(0, maxLength) + '...';
  };

  return (
    <div className="dashboard-container">
      <div className="container-fluid">
        <div className="mb-4">
          <h1 className="mb-1">My Applications</h1>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-secondary fst-italic fs-4 fw-semibold">Total: {applications.length}</div>
            <button className="btn btn-primary-custom" onClick={() => navigate('/customer-dashboard/loanapplication')}>
              <i className="bi bi-plus-lg me-2"></i>New Application
            </button>
          </div>
        </div>

        {/* success */}
        {showSuccessMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <i className="bi bi-check-circle me-2"></i>
            {successMessage}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setShowSuccessMessage(false)}
            ></button>
          </div>
        )}

        {/* filters */}
        <div className="card card-custom mb-4">
          <div className="card-body">
            <div className="row">
              <div className="">
                <label className="form-label">Search Applications</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-search"></i>
                  </span>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="Search by ID, loan type, or status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* list */}
        <div className="card card-custom">
          <div className="card-body">
            {filteredApplications.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Application ID</th>
                      <th>Loan Type</th>
                      <th>Amount</th>
                      <th>Tenure</th>
                      <th>Status</th>
                      <th>Applied Date</th>
                      <th>Remarks</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map(app => (
                      <tr key={app.id}>
                        <td>
                          <strong>#{app.id}</strong>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <i className="bi bi-file-earmark-text text-primary me-2"></i>
                            {app.loanType}
                          </div>
                        </td>
                        <td className="fw-bold">{formatCurrency(app.amount)}</td>
                        <td>{app.tenure} months</td>
                        <td>
                          <span className={`status-badge ${getStatusBadgeClass(app.status)}`}>
                            <i className={`${getStatusIcon(app.status)} me-1`}></i>
                            {app.status}
                          </span>
                        </td>
                        <td>{app.appliedDate}</td>
                        <td>
                          <span 
                            className={`text-muted ${app.status.toLowerCase() === 'rejected' ? 'text-danger' : ''}`}
                            title={app.remarks || 'No remarks available'}
                          >
                            {truncateRemarks(app.remarks)}
                          </span>
                        </td>
                        <td>
                          {/* view */}
                          <button 
                            className="btn btn-outline-primary btn-sm me-1"
                            onClick={() => handleViewDetails(app)}
                            title="View Details"
                          >
                            <i className="bi bi-eye">View</i>
                          </button>
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-applications text-center py-5">
                <i className="bi bi-search mb-3" style={{fontSize: '3rem', color: '#bdc3c7'}}></i>
                <h5>No Applications Found</h5>
                <p className="text-muted">
                  {statusFilter !== 'all' || searchTerm ? 
                    'Try adjusting your filters or search terms' : 
                    'You haven\'t submitted any loan applications yet'
                  }
                </p>
                {statusFilter === 'all' && !searchTerm && (
                  <button className="btn btn-primary-custom mt-3" onClick={() => navigate('/customer-dashboard/loanapplication')}>
                    <i className="bi bi-plus-lg me-2"></i>Apply for Your First Loan
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {/* rejected */}
        {applications.filter(app => app.status.toLowerCase() === 'rejected').length > 0 && (
          <div className="card card-custom mt-4 border-warning">
            <div className="card-body">
              <h5 className="card-title text-warning">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Rejected Applications
              </h5>
              <p className="card-text">
                You have {applications.filter(app => app.status.toLowerCase() === 'rejected').length} rejected application(s). 
                You can edit and resubmit them for review.
              </p>
              <div className="d-flex flex-wrap gap-2">
                {applications.filter(app => app.status.toLowerCase() === 'rejected').map(app => (
                  <button 
                    key={app.id}
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => navigate('/customer-dashboard/loanapplication', { state: { application: app } })}
                  >
                    <i className="bi bi-pencil-square me-1"></i>
                    Edit #{app.id} - {app.loanType}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
