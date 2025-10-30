import React, { useState, useEffect } from "react";
import AllPopup from "../components/AllPopup";
import { useParams, Link, useLocation } from "react-router-dom";
import { getApplicationDetails, checkerApprove, checkerReject } from "../api/loans";
import "./CheckerApplicationReview.css";

export default function CheckerApplicationReview() {
  const { id } = useParams();
  const location = useLocation();
  const applicationStatus = (location && location.state && location.state.status) ? location.state.status : "pending";
  const [activeTab, setActiveTab] = useState("personal");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState(null);
  const [rejectionComment, setRejectionComment] = useState("");
  const [approvalComment, setApprovalComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [applicationData, setApplicationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [infoModal, setInfoModal] = useState({ show: false, title: '', message: '' });

  useEffect(() => {
    setIsLoading(true);
    getApplicationDetails(id)
      .then(detail => {
        if (!detail) { setIsLoading(false); return; }
        // Map backend LoanDetailDto to existing UI-friendly structure
        const mapped = {
          id: detail.applicationNumber || String(detail.id || id),
          status: (String(detail.status||'').toLowerCase().includes('approved') ? 'approved' : (String(detail.status||'').toLowerCase().includes('rejected') ? 'rejected' : 'pending')),
          phone: detail.phone || '',
          email: '',
          customerName: '',
          personalDetails: {
            dateOfBirth: '',
            gender: '',
            maritalStatus: '',
            fatherName: '',
            highestQualification: '',
            aadharNumber: '',
            panNumber: '',
            passportNumber: '',
            homeAddress: detail.address || ''
          },
          employmentDetails: {
            occupationType: detail.occupationType || '',
            employer: detail.employer || detail.businessName || '',
            designation: '',
            totalWorkExperience: '',
            officeAddress: ''
          },
          loanDetails: {
            loanType: detail.loanType,
            loanAmount: Number(detail.amount || 0),
            loanDuration: `${detail.tenureMonths || 0} months`,
            cibilScore: 720
          },
          existingLoanDetails: {
            loanType: '',
            lender: '',
            outstandingAmount: Number(detail.existingLoanAmount || 0),
            emi: Number(detail.existingLoanEmi || 0),
            tenureRemaining: ''
          },
          makerComments: detail.makerRemarks ? [{ id: 1, maker: 'Maker', timestamp: '', type: 'info', comment: detail.makerRemarks }] : [],
          documents: {
            photograph: { name: 'Photograph', uploaded: false, url: '#', type: 'image' },
            idProof: { name: 'ID Proof', uploaded: false, url: '#', type: 'pdf' },
            cibilReport: { name: 'CIBIL Report', uploaded: false, url: '#', type: 'pdf' },
            paySlip: { name: 'Payslip', uploaded: !!detail.payslip, url: '#', type: 'pdf' },
            employmentProof: { name: 'Employment Proof', uploaded: !!detail.employmentProof, url: '#', type: 'pdf' },
            incomeProof: { name: 'ITR', uploaded: !!detail.itrDoc, url: '#', type: 'pdf' },
            homeEc: { name: 'Encumbrance Certificate', uploaded: !!detail.encumbranceCertificate, url: '#', type: 'pdf' },
            vehicleInvoice: { name: 'Vehicle Invoice', uploaded: !!detail.vehicleInvoice, url: '#', type: 'pdf' }
          }
        };
        setApplicationData(mapped);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (!applicationData) {
    return (
      <div className="text-center py-5">
        <h4>Application Not Found</h4>
        <p className="text-muted">The requested application could not be found.</p>
        <Link to="../dashboard" className="btn btn-primary-custom">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob.split('/').reverse().join('-'));
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleViewDocument = (document) => {
    if (document.type === "pdf") {
      // Open PDF in new tab
      window.open(document.url, '_blank');
    } else if (document.type === "image") {
      // For images, we could show a modal or open in new tab
      window.open(document.url, '_blank');
    }
  };

  const handleApprove = () => {
    setConfirmationType("approve");
    setShowConfirmation(true);
  };

  const handleReject = () => {
    setConfirmationType("reject");
    setShowConfirmation(true);
  };

  const confirmDecision = async () => {
    if (confirmationType === "reject" && !rejectionComment.trim()) {
      setCommentError("Comment is mandatory for rejection");
      return;
    }
    try {
      const au = JSON.parse(localStorage.getItem('authUser') || 'null');
      const userId = au?.id;
      if (confirmationType === 'approve') {
        await checkerApprove(id, userId, approvalComment);
        setApplicationData(prev => ({ ...prev, status: 'approved' }));
        setInfoModal({ show: true, title: 'Approved', message: `Application has been approved successfully!${approvalComment ? ` Comment: ${approvalComment}` : ''}` });
      } else {
        await checkerReject(id, userId, rejectionComment);
        setApplicationData(prev => ({ ...prev, status: 'rejected' }));
        setInfoModal({ show: true, title: 'Rejected', message: `Application has been rejected. Reason: ${rejectionComment}` });
      }
      setShowConfirmation(false);
      setRejectionComment("");
      setApprovalComment("");
      setCommentError("");
      setTimeout(() => { window.location.href = '../dashboard'; }, 1200);
    } catch (e) {
      setInfoModal({ show: true, title: 'Error', message: 'Failed to submit decision. Please try again.' });
    }
  };

  const cancelDecision = () => {
    setShowConfirmation(false);
    setRejectionComment("");
    setApprovalComment("");
    setCommentError("");
  };

  const tabs = [
    { id: "personal", label: "Personal", icon: "bi-person" },
    { id: "employment", label: "Employment", icon: "bi-briefcase" },
    { id: "loan", label: "Loan Details", icon: "bi-credit-card" },
    { id: "existing", label: "Existing Loans", icon: "bi-bank" },
    { id: "maker-comments", label: "Maker Comments", icon: "bi-chat-dots" },
    { id: "documents", label: "Documents", icon: "bi-file-earmark" },
    { id: "review", label: "Review", icon: "bi-check-circle" }
  ];

  const renderPersonalDetails = () => (
    <div className="row g-3">
      {/* Row 1: Basic Info */}
      <div className="col-md-3">
        <div className="details-card">
          <h6>Full Name</h6>
          <p className="fw-semibold text-primary">{applicationData.customerName}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="details-card">
          <h6>Date of Birth</h6>
          <p className="fw-semibold text-primary">{applicationData.personalDetails.dateOfBirth}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="details-card">
          <h6>Gender</h6>
          <p className="fw-semibold text-primary">{applicationData.personalDetails.gender}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="details-card">
          <h6>Marital Status</h6>
          <p className="fw-semibold text-primary">{applicationData.personalDetails.maritalStatus}</p>
        </div>
      </div>

      {/* Row 2: Contact & Age */}
      <div className="col-md-3">
        <div className="details-card">
          <h6>Age</h6>
          <p className="fw-semibold text-primary">{calculateAge(applicationData.personalDetails.dateOfBirth)} years</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="details-card">
          <h6>Phone Number</h6>
          <p className="fw-semibold text-primary">{applicationData.phone}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="details-card">
          <h6>Email</h6>
          <p className="fw-semibold text-primary">{applicationData.email}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="details-card">
          <h6>Father's Name</h6>
          <p className="fw-semibold text-primary">{applicationData.personalDetails.fatherName}</p>
        </div>
      </div>

      {/* Row 3: Documents & IDs */}
      <div className="col-md-3">
        <div className="details-card">
          <h6>Aadhaar Number</h6>
          <p className="fw-semibold text-primary">{applicationData.personalDetails.aadharNumber}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="details-card">
          <h6>PAN Number</h6>
          <p className="fw-semibold text-primary">{applicationData.personalDetails.panNumber}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="details-card">
          <h6>Passport Number</h6>
          <p className="fw-semibold text-primary">{applicationData.personalDetails.passportNumber || "N/A"}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="details-card">
          <h6>Highest Qualification</h6>
          <p className="fw-semibold text-primary">{applicationData.personalDetails.highestQualification}</p>
        </div>
      </div>

      {/* Row 4: Address */}
      <div className="col-md-6">
        <div className="details-card">
          <h6>Home Address</h6>
          <p className="fw-semibold text-primary">{applicationData.personalDetails.homeAddress}</p>
        </div>
      </div>
    </div>
  );

  const renderEmploymentDetails = () => (
    <div className="row g-3">
      <div className="col-md-6">
        <div className="details-card">
          <h6>Occupation Type</h6>
          <p className="fw-semibold text-primary">{applicationData.employmentDetails.occupationType}</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="details-card">
          <h6>Employer</h6>
          <p className="fw-semibold text-primary">{applicationData.employmentDetails.employer}</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="details-card">
          <h6>Designation</h6>
          <p className="fw-semibold text-primary">{applicationData.employmentDetails.designation}</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="details-card">
          <h6>Total Work Experience</h6>
          <p className="fw-semibold text-primary">{applicationData.employmentDetails.totalWorkExperience}</p>
        </div>
      </div>
      <div className="col-12">
        <div className="details-card">
          <h6>Office Address</h6>
          <p className="fw-semibold text-primary">{applicationData.employmentDetails.officeAddress}</p>
        </div>
      </div>
      
    </div>
  );

  const renderLoanDetails = () => (
    <div className="loan-details-section">
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="detail-item">
            <label className="detail-label">Loan Type:</label>
            <span className="detail-value">{applicationData.loanDetails.loanType}</span>
        </div>
      </div>
        <div className="col-md-6">
          <div className="detail-item">
            <label className="detail-label">Loan Amount:</label>
            <span className="detail-value">₹{applicationData.loanDetails.loanAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="detail-item">
            <label className="detail-label">Loan Duration:</label>
            <span className="detail-value">{applicationData.loanDetails.loanDuration}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExistingLoanDetails = () => (
    <div className="row g-3">
      <div className="col-md-3">
        <div className="details-card">
          <h6>Loan Type</h6>
          <p className="fw-semibold text-primary">{applicationData.existingLoanDetails.loanType}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="details-card">
          <h6>Lender</h6>
          <p className="fw-semibold text-primary">{applicationData.existingLoanDetails.lender}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="details-card">
          <h6>Outstanding Amount</h6>
          <p className="fw-semibold text-primary">₹{applicationData.existingLoanDetails.outstandingAmount.toLocaleString()}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="details-card">
          <h6>EMI</h6>
          <p className="fw-semibold text-primary">₹{applicationData.existingLoanDetails.emi.toLocaleString()}</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="details-card">
          <h6>Tenure Remaining</h6>
          <p className="fw-semibold text-primary">{applicationData.existingLoanDetails.tenureRemaining}</p>
        </div>
      </div>
      
      {/* CIBIL Score Section */}
      <div className="col-md-6">
        <div className="details-card">
          <h6>CIBIL Score</h6>
          <div className="mb-2">
            <span className={`cibil-score ${applicationData.loanDetails.cibilScore >= 750 ? 'good' : applicationData.loanDetails.cibilScore >= 650 ? 'fair' : 'poor'}`}>
              {applicationData.loanDetails.cibilScore}
            </span>
          </div>
          <div className="cibil-band">
            {/* marker position as percentage: map 300-900 to 0-100 */}
            {(() => {
              const min = 300; const max = 900; const score = applicationData.loanDetails.cibilScore;
              const pct = Math.min(100, Math.max(0, ((score - min) / (max - min)) * 100));
              return <div className="marker" style={{ left: pct + '%' }}></div>;
            })()}
          </div>
          <div className="cibil-legend">
            <span>Poor</span>
            <span>Fair</span>
            <span>Good</span>
            <span>Best</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="row g-3">
      <div className="col-12">
        <h5 className="mb-3">Application Documents</h5>
        <p className="text-muted mb-4">All documents uploaded by the customer from their dashboard</p>
      </div>
      
      {/* Personal Documents */}
      <div className="col-12">
        <h6 className="text-primary mb-3">
          <i className="bi bi-person me-2"></i>
          Personal Documents
        </h6>
      </div>
      {Object.entries(applicationData.documents)
        .filter(([key, doc]) => ['photograph', 'idProof'].includes(key))
        .map(([key, document]) => (
          <div key={key} className="col-md-6">
            <div className={`document-item ${document.uploaded ? 'uploaded' : 'pending'}`}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="flex-grow-1">
                  <span className="document-name">{document.name}</span>
                  <div className="document-status">
                    {document.uploaded ? (
                      <span className="badge bg-success">Uploaded</span>
                    ) : (
                      <span className="badge bg-warning">Pending</span>
                    )}
                  </div>
                </div>
                <div>
                  {document.uploaded ? (
                    <button
                      className="btn btn-sm btn-outline-primary document-view-btn"
                      onClick={() => handleViewDocument(document)}
                    >
                      <i className="bi bi-eye me-1"></i>
                      View
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-secondary document-view-btn"
                      disabled
                    >
                      <i className="bi bi-clock me-1"></i>
                      Not Available
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      
      {/* Employment Documents */}
      <div className="col-12 mt-4">
        <h6 className="text-primary mb-3">
          <i className="bi bi-briefcase me-2"></i>
          Employment Documents
        </h6>
      </div>
      {Object.entries(applicationData.documents)
        .filter(([key, doc]) => ['incomeProof', 'paySlip', 'employmentProof'].includes(key))
        .map(([key, document]) => (
          <div key={key} className="col-md-6">
            <div className={`document-item ${document.uploaded ? 'uploaded' : 'pending'}`}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="flex-grow-1">
                  <span className="document-name">{document.name}</span>
                  <div className="document-status">
                    {document.uploaded ? (
                      <span className="badge bg-success">Uploaded</span>
                    ) : (
                      <span className="badge bg-warning">Pending</span>
                    )}
                  </div>
                </div>
                <div>
                  {document.uploaded ? (
                    <button
                      className="btn btn-sm btn-outline-primary document-view-btn"
                      onClick={() => handleViewDocument(document)}
                    >
                      <i className="bi bi-eye me-1"></i>
                      View
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-secondary document-view-btn"
                      disabled
                    >
                      <i className="bi bi-clock me-1"></i>
                      Not Available
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      
      {/* Financial Documents */}
      <div className="col-12 mt-4">
        <h6 className="text-primary mb-3">
          <i className="bi bi-credit-card me-2"></i>
          Financial Documents
        </h6>
      </div>
      {Object.entries(applicationData.documents)
        .filter(([key, doc]) => ['cibilReport'].includes(key))
        .map(([key, document]) => (
          <div key={key} className="col-md-6">
            <div className={`document-item ${document.uploaded ? 'uploaded' : 'pending'}`}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="flex-grow-1">
                  <span className="document-name">{document.name}</span>
                  <div className="document-status">
                    {document.uploaded ? (
                      <span className="badge bg-success">Uploaded</span>
                    ) : (
                      <span className="badge bg-warning">Pending</span>
                    )}
                  </div>
                </div>
                <div>
                  {document.uploaded ? (
                    <button
                      className="btn btn-sm btn-outline-primary document-view-btn"
                      onClick={() => handleViewDocument(document)}
                    >
                      <i className="bi bi-eye me-1"></i>
                      View
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-secondary document-view-btn"
                      disabled
                    >
                      <i className="bi bi-clock me-1"></i>
                      Not Available
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      
      {/* Property/Vehicle Documents */}
      <div className="col-12 mt-4">
        <h6 className="text-primary mb-3">
          <i className="bi bi-house me-2"></i>
          Property/Vehicle Documents
        </h6>
      </div>
      {Object.entries(applicationData.documents)
        .filter(([key, doc]) => ['homeEc', 'vehicleInvoice'].includes(key))
        .map(([key, document]) => (
          <div key={key} className="col-md-6">
            <div className={`document-item ${document.uploaded ? 'uploaded' : 'pending'}`}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="flex-grow-1">
                  <span className="document-name">{document.name}</span>
                  <div className="document-status">
                    {document.uploaded ? (
                      <span className="badge bg-success">Uploaded</span>
                    ) : (
                      <span className="badge bg-warning">Pending</span>
                    )}
                  </div>
                </div>
                <div>
                  {document.uploaded ? (
                    <button
                      className="btn btn-sm btn-outline-primary document-view-btn"
                      onClick={() => handleViewDocument(document)}
                    >
                      <i className="bi bi-eye me-1"></i>
                      View
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-secondary document-view-btn"
                      disabled
                    >
                      <i className="bi bi-clock me-1"></i>
                      Not Available
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      
    </div>
  );

  const renderReview = () => (
    <div>
      <div className="row mb-4">
        <div className="col-md-6">
          <h5 className="text-primary">Personal Information</h5>
          <div className="details-table">
            <table className="table table-borderless mb-0">
              <tbody>
                <tr><td className="fw-semibold">Full Name:</td><td>{applicationData.personalDetails.firstName} {applicationData.personalDetails.middleName} {applicationData.personalDetails.lastName}</td></tr>
                <tr><td className="fw-semibold">Phone:</td><td>{applicationData.phone}</td></tr>
                <tr><td className="fw-semibold">Email:</td><td>{applicationData.email}</td></tr>
                <tr><td className="fw-semibold">Address:</td><td>{applicationData.personalDetails.homeAddress}</td></tr>
                <tr><td className="fw-semibold">Marital Status:</td><td>{applicationData.personalDetails.maritalStatus}</td></tr>
                <tr><td className="fw-semibold">Gender:</td><td>{applicationData.personalDetails.gender}</td></tr>
                <tr><td className="fw-semibold">DOB:</td><td>{applicationData.personalDetails.dateOfBirth}</td></tr>
                <tr><td className="fw-semibold">Age:</td><td>{calculateAge(applicationData.personalDetails.dateOfBirth)} years</td></tr>
                <tr><td className="fw-semibold">Aadhaar:</td><td>{applicationData.personalDetails.aadharNumber}</td></tr>
                <tr><td className="fw-semibold">PAN:</td><td>{applicationData.personalDetails.panNumber}</td></tr>
                <tr><td className="fw-semibold">Passport:</td><td>{applicationData.personalDetails.passportNumber}</td></tr>
                <tr><td className="fw-semibold">Father's Name:</td><td>{applicationData.personalDetails.fatherName}</td></tr>
                <tr><td className="fw-semibold">Qualification:</td><td>{applicationData.personalDetails.highestQualification}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <h5 className="text-primary">Employment Information</h5>
          <div className="details-table">
            <table className="table table-borderless mb-0">
              <tbody>
                <tr><td className="fw-semibold">Occupation:</td><td>{applicationData.employmentDetails.occupationType}</td></tr>
                <tr><td className="fw-semibold">Employer:</td><td>{applicationData.employmentDetails.employer}</td></tr>
                <tr><td className="fw-semibold">Designation:</td><td>{applicationData.employmentDetails.designation}</td></tr>
                <tr><td className="fw-semibold">Experience:</td><td>{applicationData.employmentDetails.totalWorkExperience}</td></tr>
                <tr><td className="fw-semibold">Office Address:</td><td>{applicationData.employmentDetails.officeAddress}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <h5 className="text-primary">Loan Information</h5>
          <div className="details-table">
            <table className="table table-borderless mb-0">
              <tbody>
                <tr><td className="fw-semibold">Loan Type:</td><td>{applicationData.loanDetails.loanType}</td></tr>
                <tr><td className="fw-semibold">Amount:</td><td>₹{applicationData.loanDetails.loanAmount.toLocaleString()}</td></tr>
                <tr><td className="fw-semibold">Duration:</td><td>{applicationData.loanDetails.loanDuration}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <h5 className="text-primary">Existing Loans</h5>
          <div className="details-table">
            <table className="table table-borderless mb-0">
              <tbody>
                <tr><td className="fw-semibold">Loan Type:</td><td>{applicationData.existingLoanDetails.loanType}</td></tr>
                <tr><td className="fw-semibold">Lender:</td><td>{applicationData.existingLoanDetails.lender}</td></tr>
                <tr><td className="fw-semibold">Outstanding:</td><td>₹{applicationData.existingLoanDetails.outstandingAmount.toLocaleString()}</td></tr>
                <tr><td className="fw-semibold">EMI:</td><td>₹{applicationData.existingLoanDetails.emi.toLocaleString()}</td></tr>
                <tr><td className="fw-semibold">Remaining:</td><td>{applicationData.existingLoanDetails.tenureRemaining}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h5 className="text-primary">Documents Uploaded</h5>
          <div className="row g-2">
            {Object.entries(applicationData.documents).map(([key, value]) => (
              <div key={key} className="col-md-3">
                <div className="d-flex align-items-center justify-content-between p-2 border rounded">
                  <span className="text-truncate">{value.name}</span>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleViewDocument(value)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMakerComments = () => (
    <div className="maker-comments-section">
      <div className="comments-list">
        {applicationData.makerComments && applicationData.makerComments.length > 0 ? (
          applicationData.makerComments.map((comment) => (
            <div key={comment.id} className={`comment-item ${comment.type}`}>
              <div className="comment-header">
                <div className="comment-meta">
                  <span className="comment-maker">{comment.maker}</span>
                  <span className="comment-time">{comment.timestamp}</span>
                </div>
                <span className={`comment-type-badge ${comment.type}`}>
                  {comment.type === 'info' ? 'Info' : comment.type === 'success' ? 'Verified' : 'Warning'}
                </span>
              </div>
              <div className="comment-content">
                {comment.comment}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <i className="bi bi-chat-dots display-4 text-muted"></i>
            <p className="text-muted mt-2">No maker comments available</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonalDetails();
      case "employment":
        return renderEmploymentDetails();
      case "loan":
        return renderLoanDetails();
      case "existing":
        return renderExistingLoanDetails();
      case "maker-comments":
        return renderMakerComments();
      case "review":
        return renderReview();
      case "documents":
        return renderDocuments();
      default:
        return renderPersonalDetails();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="../dashboard" className="btn btn-outline-primary mb-2">
            <i className="bi bi-arrow-left me-1"></i>
            Back to Dashboard
          </Link>
          <h4 className="mb-1">Application Review</h4>
          <p className="text-muted mb-0">Application ID: {applicationData.id}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="section-card mb-4">
        <ul className="nav nav-tabs border-0">
          {tabs.map((tab) => (
            <li className="nav-item" key={tab.id}>
              <button
                className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <i className={`${tab.icon} me-1`}></i>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="section-card">
        {renderTabContent()}
      </div>

      {/* Action Buttons - only for pending applications */}
      {applicationData && applicationData.status === "pending" && (
      <div className="sticky-actions">
        <div className="section-card">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">Review Actions</h6>
              <small className="text-muted">Approve or reject this application</small>
            </div>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-danger" onClick={handleReject}>
                <i className="bi bi-x-circle me-1"></i>
                Reject
              </button>
                <button className="btn btn-success" onClick={handleApprove}>
                <i className="bi bi-check-circle me-1"></i>
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Status Display - for processed applications */}
      {applicationData && (applicationData.status === "approved" || applicationData.status === "rejected") && (
        <div className="sticky-actions">
          <div className="section-card">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-1">Application Status</h6>
                <small className="text-muted">This application has been processed</small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className={`badge ${applicationData.status === "approved" ? "bg-success" : "bg-danger"} fs-6 px-3 py-2`}>
                  <i className={`bi ${applicationData.status === "approved" ? "bi-check-circle" : "bi-x-circle"} me-1`}></i>
                  {applicationData.status === "approved" ? "Approved" : "Rejected"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-card">
            <div className="confirmation-header">
              <h5 className="mb-0">
                {confirmationType === "approve" ? "Approve Application" : "Reject Application"}
              </h5>
            </div>
            <div className="confirmation-body">
              {confirmationType === "approve" ? (
                <div>
                  <p>Are you sure you want to approve this loan application?</p>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Comment (optional):</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={approvalComment}
                      onChange={(e) => setApprovalComment(e.target.value)}
                      placeholder="Add any additional comments..."
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p>Are you sure you want to reject this loan application?</p>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Reason for rejection (required):</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={rejectionComment}
                      onChange={(e) => {
                        setRejectionComment(e.target.value);
                        setCommentError("");
                      }}
                      placeholder="Please provide a reason for rejection..."
                    />
                    {commentError && (
                      <div className="comment-validation">
                        <i className="bi bi-exclamation-triangle"></i>
                        {commentError}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="confirmation-footer">
              <button className="btn btn-outline-secondary me-2" onClick={cancelDecision}>
                Cancel
              </button>
              <button 
                className={`btn ${confirmationType === "approve" ? "btn-success" : "btn-danger"}`}
                onClick={confirmDecision}
              >
                {confirmationType === "approve" ? "Approve" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}