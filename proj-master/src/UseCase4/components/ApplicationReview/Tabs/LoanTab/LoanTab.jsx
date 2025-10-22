// components/ApplicationReview/Tabs/LoanTab/LoanTab.jsx
import React from 'react';
import DocumentSection from '../../DocumentSection/DocumentSection';

import './LoanTab.css';

const LoanTab = ({ application }) => {
  const { loanDetails, existingLoans, loanDocuments, loanType, loanAmount, tenure, purpose } = application;

  const formatCurrency = (amount) => {
    return amount ? `₹ ${amount.toLocaleString('en-IN')}` : 'N/A';
  };

  const calculateLoanToValue = () => {
    if (loanDetails.propertyValue && loanAmount) {
      return ((loanAmount / loanDetails.propertyValue) * 100).toFixed(2) + '%';
    }
    return 'N/A';
  };

  const getLoanTypeSpecificFields = () => {
    switch (loanType) {
      case 'Home Loan':
        return (
          <>
            <div className="info-item">
              <label>Property Value</label>
              <span>{formatCurrency(loanDetails.propertyValue)}</span>
            </div>
            <div className="info-item">
              <label>Down Payment</label>
              <span>{formatCurrency(loanDetails.downPayment)}</span>
            </div>
            <div className="info-item">
              <label>Loan-to-Value Ratio</label>
              <span>{calculateLoanToValue()}</span>
            </div>
            <div className="info-item">
              <label>Property Type</label>
              <span>{loanDetails.propertyType || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Builder Name</label>
              <span>{loanDetails.builderName || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Project Name</label>
              <span>{loanDetails.projectName || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Construction Stage</label>
              <span>{loanDetails.constructionStage || 'N/A'}</span>
            </div>
          </>
        );
      
      case 'Vehicle Loan':
        return (
          <>
            <div className="info-item">
              <label>Vehicle Type</label>
              <span>{loanDetails.vehicleType || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Dealer Name</label>
              <span>{loanDetails.dealerName || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Invoice Amount</label>
              <span>{formatCurrency(loanDetails.invoiceAmount)}</span>
            </div>
            <div className="info-item">
              <label>Vehicle Model</label>
              <span>{loanDetails.vehicleModel || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Registration Year</label>
              <span>{loanDetails.registrationYear || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Insurance Required</label>
              <span>{loanDetails.insuranceRequired ? 'Yes' : 'No'}</span>
            </div>
          </>
        );
      
      case 'Personal Loan':
        return (
          <>
            <div className="info-item">
              <label>End Use of Funds</label>
              <span>{loanDetails.endUse || purpose || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Repayment Source</label>
              <span>{loanDetails.repaymentSource || 'N/A'}</span>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="tab-content active">
      {/* Basic Loan Information */}
      <div className="section">
        <h3>Loan Application Details</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Loan Type</label>
            <span>{loanType}</span>
          </div>
          <div className="info-item">
            <label>Loan Amount</label>
            <span>{formatCurrency(loanAmount)}</span>
          </div>
          <div className="info-item">
            <label>Tenure</label>
            <span>{tenure} months ({Math.round(tenure / 12)} years)</span>
          </div>
          <div className="info-item">
            <label>Purpose</label>
            <span>{purpose}</span>
          </div>
          <div className="info-item">
            <label>Application Date</label>
            <span>{new Date(application.submittedDate).toLocaleDateString('en-IN')}</span>
          </div>
          <div className="info-item">
            <label>Application Status</label>
            <span className={`status ${application.status.toLowerCase().replace(' ', '-')}`}>
              {application.status}
            </span>
          </div>
        </div>
      </div>

      {/* Financial Details */}
      <div className="section">
        <h3>Financial Details</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Interest Rate</label>
            <span>{loanDetails.interestRate}% {loanDetails.interestType || 'Fixed'}</span>
          </div>
          <div className="info-item">
            <label>EMI Amount</label>
            <span>{formatCurrency(loanDetails.emi)}</span>
          </div>
          <div className="info-item">
            <label>Processing Fee</label>
            <span>{formatCurrency(loanDetails.processingFee)}</span>
          </div>
          <div className="info-item">
            <label>Total Interest Payable</label>
            <span>{formatCurrency(loanDetails.totalInterest)}</span>
          </div>
          <div className="info-item">
            <label>Total Amount Payable</label>
            <span>{formatCurrency(loanDetails.totalPayable)}</span>
          </div>
          {getLoanTypeSpecificFields()}
        </div>
      </div>

      {/* Loan Type Specific Details */}
      {loanType === 'Home Loan' && (
        <div className="section">
          <h3>Property Details</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Property Location</label>
              <span>{loanDetails.propertyLocation || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Area (Sq. Ft.)</label>
              <span>{loanDetails.propertyArea || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Age of Property</label>
              <span>{loanDetails.propertyAge || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Ownership Type</label>
              <span>{loanDetails.ownershipType || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Legal Clearance</label>
              <span>{loanDetails.legalClearance ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Insurance Details */}
      {(loanDetails.insuranceRequired || loanType === 'Home Loan') && (
        <div className="section">
          <h3>Insurance Details</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Insurance Required</label>
              <span>{loanDetails.insuranceRequired ? 'Yes' : 'No'}</span>
            </div>
            {loanDetails.insuranceAmount && (
              <div className="info-item">
                <label>Insurance Amount</label>
                <span>{formatCurrency(loanDetails.insuranceAmount)}</span>
              </div>
            )}
            {loanDetails.insuranceProvider && (
              <div className="info-item">
                <label>Insurance Provider</label>
                <span>{loanDetails.insuranceProvider}</span>
              </div>
            )}
            {loanDetails.insurancePremium && (
              <div className="info-item">
                <label>Annual Premium</label>
                <span>{formatCurrency(loanDetails.insurancePremium)}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Existing Loans */}
      {existingLoans && existingLoans.length > 0 && (
        <div className="section">
          <h3>Existing Loans</h3>
          <div className="existing-loans">
            {existingLoans.map((loan, index) => (
              <div key={index} className="loan-item">
                <div className="loan-header">
                  <h4>{loan.type} - {loan.lender}</h4>
                </div>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Outstanding Amount</label>
                    <span>{formatCurrency(loan.outstandingAmount)}</span>
                  </div>
                  <div className="info-item">
                    <label>EMI</label>
                    <span>{formatCurrency(loan.emi)}</span>
                  </div>
                  <div className="info-item">
                    <label>Tenure Remaining</label>
                    <span>{loan.tenureRemaining} months</span>
                  </div>
                  <div className="info-item">
                    <label>Interest Rate</label>
                    <span>{loan.interestRate}%</span>
                  </div>
                  <div className="info-item">
                    <label>Start Date</label>
                    <span>{loan.startDate ? new Date(loan.startDate).toLocaleDateString('en-IN') : 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <label>Default History</label>
                    <span>{loan.defaultHistory ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Debt-to-Income Ratio Calculation */}
      <div className="section">
        <h3>Debt Service Analysis</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Total Existing EMI</label>
            <span>{formatCurrency(
              existingLoans?.reduce((total, loan) => total + (loan.emi || 0), 0) || 0
            )}</span>
          </div>
          <div className="info-item">
            <label>Proposed EMI</label>
            <span>{formatCurrency(loanDetails.emi)}</span>
          </div>
          <div className="info-item">
            <label>Total EMI Burden</label>
            <span>{formatCurrency(
              (existingLoans?.reduce((total, loan) => total + (loan.emi || 0), 0) || 0) + (loanDetails.emi || 0)
            )}</span>
          </div>
          <div className="info-item">
            <label>Monthly Income</label>
            <span>{formatCurrency(application.employmentDetails.monthlyIncome)}</span>
          </div>
          <div className="info-item">
            <label>FOIR (Fixed Obligation to Income Ratio)</label>
            <span>{application.employmentDetails.monthlyIncome ? 
              ((((existingLoans?.reduce((total, loan) => total + (loan.emi || 0), 0) || 0) + (loanDetails.emi || 0)) / 
              application.employmentDetails.monthlyIncome) * 100).toFixed(2) + '%' : 'N/A'
            }</span>
          </div>
        </div>
      </div>

      {/* Loan Documents */}
      <DocumentSection
        title="Loan Documents"
        documents={loanDocuments}
        documentType="loan"
      />

      {/* Document Checklist */}
      <div className="section">
        <h3>Document Checklist</h3>
        <div className="document-checklist">
          {loanType === 'Home Loan' && (
            <>
              <div className="checklist-item">
                <span>Sale Agreement</span>
                <span className={`checklist-status ${
                  loanDocuments.some(doc => doc.name.toLowerCase().includes('sale agreement')) ? 'verified' : 'pending'
                }`}>
                  {loanDocuments.some(doc => doc.name.toLowerCase().includes('sale agreement')) ? '✓ Provided' : '⏳ Pending'}
                </span>
              </div>
              <div className="checklist-item">
                <span>EC Certificate</span>
                <span className={`checklist-status ${
                  loanDocuments.some(doc => doc.name.toLowerCase().includes('ec certificate')) ? 'verified' : 'pending'
                }`}>
                  {loanDocuments.some(doc => doc.name.toLowerCase().includes('ec certificate')) ? '✓ Provided' : '⏳ Pending'}
                </span>
              </div>
              <div className="checklist-item">
                <span>Property Tax Receipt</span>
                <span className={`checklist-status ${
                  loanDocuments.some(doc => doc.name.toLowerCase().includes('property tax')) ? 'verified' : 'pending'
                }`}>
                  {loanDocuments.some(doc => doc.name.toLowerCase().includes('property tax')) ? '✓ Provided' : '⏳ Pending'}
                </span>
              </div>
            </>
          )}
          
          {loanType === 'Vehicle Loan' && (
            <>
              <div className="checklist-item">
                <span>Dealer Invoice</span>
                <span className={`checklist-status ${
                  loanDocuments.some(doc => doc.name.toLowerCase().includes('dealer invoice')) ? 'verified' : 'pending'
                }`}>
                  {loanDocuments.some(doc => doc.name.toLowerCase().includes('dealer invoice')) ? '✓ Provided' : '⏳ Pending'}
                </span>
              </div>
              <div className="checklist-item">
                <span>Quotation</span>
                <span className={`checklist-status ${
                  loanDocuments.some(doc => doc.name.toLowerCase().includes('quotation')) ? 'verified' : 'pending'
                }`}>
                  {loanDocuments.some(doc => doc.name.toLowerCase().includes('quotation')) ? '✓ Provided' : '⏳ Pending'}
                </span>
              </div>
              <div className="checklist-item">
                <span>RC Copy</span>
                <span className={`checklist-status ${
                  loanDocuments.some(doc => doc.name.toLowerCase().includes('rc')) ? 'verified' : 'pending'
                }`}>
                  {loanDocuments.some(doc => doc.name.toLowerCase().includes('rc')) ? '✓ Provided' : '⏳ Pending'}
                </span>
              </div>
            </>
          )}
          
          <div className="checklist-item">
            <span>Loan Application Form</span>
            <span className={`checklist-status ${
              loanDocuments.some(doc => doc.name.toLowerCase().includes('application')) ? 'verified' : 'pending'
            }`}>
              {loanDocuments.some(doc => doc.name.toLowerCase().includes('application')) ? '✓ Provided' : '⏳ Pending'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanTab;