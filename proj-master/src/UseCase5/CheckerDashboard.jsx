import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import applicationsData from "./data/applications.json";
import "./CheckerDashboard.css";

export default function CheckerDashboard() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loanTypeFilter, setLoanTypeFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for applications
  const mockApplications = [
    {
      id: "LA2025001",
      customerName: "Rajesh Kumar Sharma",
      email: "rajesh.sharma@email.com",
      phone: "+91 9876543210",
      loanType: "Personal Loan",
      loanAmount: 500000,
      status: "pending",
      applicationDate: "2025-01-15",
      cibilScore: 750,
      age: 40
    },
    {
      id: "LA2025002",
      customerName: "Priya Singh",
      email: "priya.singh@email.com",
      phone: "+91 9876543211",
      loanType: "Home Loan",
      loanAmount: 2500000,
      status: "pending",
      applicationDate: "2025-01-14",
      cibilScore: 720,
      age: 35
    },
    {
      id: "LA2025003",
      customerName: "Amit Patel",
      email: "amit.patel@email.com",
      phone: "+91 9876543212",
      loanType: "Vehicle Loan",
      loanAmount: 800000,
      status: "approved",
      applicationDate: "2025-01-13",
      cibilScore: 780,
      age: 28
    },
    {
      id: "LA2025004",
      customerName: "Sunita Reddy",
      email: "sunita.reddy@email.com",
      phone: "+91 9876543213",
      loanType: "Personal Loan",
      loanAmount: 300000,
      status: "rejected",
      applicationDate: "2025-01-12",
      cibilScore: 650,
      age: 45
    }
  ];

  useEffect(() => {
    // Load applications from localStorage or fallback to JSON data
    setTimeout(() => {
      const storedApplications = localStorage.getItem('checkerApplications');
      let apps;
      
      if (storedApplications) {
        apps = JSON.parse(storedApplications).map(app => ({
          id: app.id,
          customerName: app.customerName,
          email: app.email, // may be undefined in some entries
          loanType: app.loanType,
          loanAmount: app.loanAmount,
          status: app.status
        }));
      } else {
        apps = applicationsData.applications.map(app => ({
          id: app.id,
          customerName: app.customerName,
          email: app.email,
          loanType: app.loanType,
          loanAmount: app.loanAmount,
          status: app.status
        }));
      }
      
      setApplications(apps);
      setFilteredApplications(apps);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = applications;

    // Apply search filter
    if (searchQuery) {
      const q = (searchQuery || '').toLowerCase();
      filtered = filtered.filter(app => 
        String(app.id || '').toLowerCase().includes(q) ||
        String(app.customerName || '').toLowerCase().includes(q) ||
        String(app.email || '').toLowerCase().includes(q) ||
        String(app.loanType || '').toLowerCase().includes(q)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Apply loan type filter
    if (loanTypeFilter !== "all") {
      filtered = filtered.filter(app => app.loanType === loanTypeFilter);
    }

    setFilteredApplications(filtered);
  }, [searchQuery, statusFilter, loanTypeFilter, applications]);

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "badge-status pending",
      approved: "badge-status approved",
      rejected: "badge-status rejected"
    };
    
    const statusText = {
      pending: "Pending Review",
      approved: "Approved",
      rejected: "Rejected"
    };

    return (
      <span className={`badge ${statusClasses[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  const getCibilScoreColor = (score) => {
    if (score >= 750) return "text-success";
    if (score >= 700) return "text-warning";
    return "text-danger";
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading applications...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-hero d-flex align-items-center justify-content-center mb-4">
        <div className="text-center text-white">
          <h4 className="mb-1">Application Review Dashboard</h4>
          <p className="sub mb-0">Review and process loan applications</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div 
            className={`kpi-card text-center ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => setStatusFilter("all")}
            style={{ cursor: "pointer" }}
          >
            <h3 className="text-primary mb-1">{applications.length}</h3>
            <p className="text-muted mb-0">Total Applications</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div 
            className={`kpi-card text-center ${statusFilter === "pending" ? "active" : ""}`}
            onClick={() => setStatusFilter("pending")}
            style={{ cursor: "pointer" }}
          >
            <h3 className="text-warning mb-1">
              {applications.filter(app => app.status === "pending").length}
            </h3>
            <p className="text-muted mb-0">Pending Review</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div 
            className={`kpi-card text-center ${statusFilter === "approved" ? "active" : ""}`}
            onClick={() => setStatusFilter("approved")}
            style={{ cursor: "pointer" }}
          >
            <h3 className="text-success mb-1">
              {applications.filter(app => app.status === "approved").length}
            </h3>
            <p className="text-muted mb-0">Approved</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div 
            className={`kpi-card text-center ${statusFilter === "rejected" ? "active" : ""}`}
            onClick={() => setStatusFilter("rejected")}
            style={{ cursor: "pointer" }}
          >
            <h3 className="text-danger mb-1">
              {applications.filter(app => app.status === "rejected").length}
            </h3>
            <p className="text-muted mb-0">Rejected</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="section-card mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Search Applications</label>
            <div className="search-field">
              <i className="bi bi-search search-icon"></i>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search by name, ID, email, or loan type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Loan Type Filter</label>
            <select 
              className="form-select" 
              value={loanTypeFilter} 
              onChange={(e) => setLoanTypeFilter(e.target.value)}
            >
              <option value="all">All Loan Types</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Vehicle Loan">Vehicle Loan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="section-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Applications ({filteredApplications.length})</h5>
          <div className="bucket-tabs">
            <button 
              className={`btn btn-sm ${statusFilter === "all" ? "active" : ""}`}
              onClick={() => setStatusFilter("all")}
            >
              All
            </button>
            <button 
              className={`btn btn-sm ${statusFilter === "pending" ? "active" : ""}`}
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </button>
            <button 
              className={`btn btn-sm ${statusFilter === "approved" ? "active" : ""}`}
              onClick={() => setStatusFilter("approved")}
            >
              Approved
            </button>
            <button 
              className={`btn btn-sm ${statusFilter === "rejected" ? "active" : ""}`}
              onClick={() => setStatusFilter("rejected")}
            >
              Rejected
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Customer Name</th>
                <th>Loan Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id}>
                  <td>
                    <span className="fw-semibold text-primary">{app.id}</span>
                  </td>
                  <td>
                    <div className="fw-semibold">{app.customerName}</div>
                  </td>
                  <td>{app.loanType}</td>
                  <td>
                    <span className="fw-semibold">
                      ₹{app.loanAmount.toLocaleString()}
                    </span>
                  </td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>
                    <Link 
                      to={`../application/${app.id}`}
                      state={{ status: app.status }}
                      className="btn btn-sm btn-outline-primary review-btn"
                    >
                      <i className="bi bi-eye me-1"></i>
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-4">
            <i className="bi bi-inbox display-4 text-muted"></i>
            <p className="text-muted mt-2">No applications found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}