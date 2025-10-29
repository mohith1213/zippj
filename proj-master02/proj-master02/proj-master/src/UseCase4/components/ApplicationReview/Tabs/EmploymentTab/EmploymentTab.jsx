// components/ApplicationReview/Tabs/EmploymentTab/EmploymentTab.jsx
import React from 'react';
import DocumentSection from '../../DocumentSection/DocumentSection';

import './EmploymentTab.css';

const EmploymentTab = ({ application }) => {
  const { employmentDetails, employmentDocuments } = application;

  return (
    <div className="tab-content active">
      <div className="info-grid">
        <div className="info-item">
          <label>Occupation Type</label>
          <span>{employmentDetails.occupationType}</span>
        </div>
        
        <div className="info-item">
          <label>
            {employmentDetails.occupationType === 'Salaried' ? 'Company Name' : 'Business Name'}
          </label>
          <span>
            {employmentDetails.companyName || employmentDetails.businessName}
          </span>
        </div>
        
        <div className="info-item">
          <label>Designation</label>
          <span>{employmentDetails.designation}</span>
        </div>
        
        <div className="info-item">
          <label>Work Experience</label>
          <span>{employmentDetails.workExperience} years</span>
        </div>
        
        <div className="info-item">
          <label>Monthly Income</label>
          <span>₹ {employmentDetails.monthlyIncome?.toLocaleString('en-IN')}</span>
        </div>
        
        {employmentDetails.employeeId && (
          <div className="info-item">
            <label>Employee ID</label>
            <span>{employmentDetails.employeeId}</span>
          </div>
        )}
        
        {employmentDetails.businessRegistration && (
          <div className="info-item">
            <label>Business Registration</label>
            <span>{employmentDetails.businessRegistration}</span>
          </div>
        )}
        
        {employmentDetails.gstNumber && (
          <div className="info-item">
            <label>GST Number</label>
            <span>{employmentDetails.gstNumber}</span>
          </div>
        )}
        
        {employmentDetails.annualTurnover && (
          <div className="info-item">
            <label>Annual Turnover</label>
            <span>₹ {employmentDetails.annualTurnover.toLocaleString('en-IN')}</span>
          </div>
        )}
        
        <div className="info-item full-width">
          <label>Office Address</label>
          <span>{employmentDetails.officeAddress}</span>
        </div>
        
        {employmentDetails.workEmail && (
          <div className="info-item">
            <label>Work Email</label>
            <span>{employmentDetails.workEmail}</span>
          </div>
        )}
        
        {employmentDetails.workPhone && (
          <div className="info-item">
            <label>Work Phone</label>
            <span>{employmentDetails.workPhone}</span>
          </div>
        )}
        
        {employmentDetails.department && (
          <div className="info-item">
            <label>Department</label>
            <span>{employmentDetails.department}</span>
          </div>
        )}
        
        {employmentDetails.employmentType && (
          <div className="info-item">
            <label>Employment Type</label>
            <span>{employmentDetails.employmentType}</span>
          </div>
        )}
        
        {employmentDetails.joiningDate && (
          <div className="info-item">
            <label>Joining Date</label>
            <span>{new Date(employmentDetails.joiningDate).toLocaleDateString('en-IN')}</span>
          </div>
        )}
      </div>

      {/* Additional Employment Information for Self-Employed */}
      {employmentDetails.occupationType === 'Self Employed' && (
        <div className="section">
          <h3>Business Details</h3>
          <div className="info-grid">
            {employmentDetails.businessType && (
              <div className="info-item">
                <label>Business Type</label>
                <span>{employmentDetails.businessType}</span>
              </div>
            )}
            
            {employmentDetails.businessAge && (
              <div className="info-item">
                <label>Business Age</label>
                <span>{employmentDetails.businessAge} years</span>
              </div>
            )}
            
            {employmentDetails.numberOfEmployees && (
              <div className="info-item">
                <label>Number of Employees</label>
                <span>{employmentDetails.numberOfEmployees}</span>
              </div>
            )}
            
            {employmentDetails.businessPremises && (
              <div className="info-item">
                <label>Business Premises</label>
                <span>{employmentDetails.businessPremises}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional Employment Information for Salaried */}
      {employmentDetails.occupationType === 'Salaried' && (
        <div className="section">
          <h3>Employment Details</h3>
          <div className="info-grid">
            {employmentDetails.employmentStatus && (
              <div className="info-item">
                <label>Employment Status</label>
                <span>{employmentDetails.employmentStatus}</span>
              </div>
            )}
            
            {employmentDetails.industry && (
              <div className="info-item">
                <label>Industry</label>
                <span>{employmentDetails.industry}</span>
              </div>
            )}
            
            {employmentDetails.salaryAccount && (
              <div className="info-item">
                <label>Salary Account Bank</label>
                <span>{employmentDetails.salaryAccount}</span>
              </div>
            )}
            
            {employmentDetails.pfNumber && (
              <div className="info-item">
                <label>PF Number</label>
                <span>{employmentDetails.pfNumber}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Income Details */}
      <div className="section">
        <h3>Income Details</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Monthly Income</label>
            <span>₹ {employmentDetails.monthlyIncome?.toLocaleString('en-IN')}</span>
          </div>
          
          {employmentDetails.annualIncome && (
            <div className="info-item">
              <label>Annual Income</label>
              <span>₹ {employmentDetails.annualIncome.toLocaleString('en-IN')}</span>
            </div>
          )}
          
          {employmentDetails.basicSalary && (
            <div className="info-item">
              <label>Basic Salary</label>
              <span>₹ {employmentDetails.basicSalary.toLocaleString('en-IN')}</span>
            </div>
          )}
          
          {employmentDetails.houseRentAllowance && (
            <div className="info-item">
              <label>House Rent Allowance</label>
              <span>₹ {employmentDetails.houseRentAllowance.toLocaleString('en-IN')}</span>
            </div>
          )}
          
          {employmentDetails.specialAllowance && (
            <div className="info-item">
              <label>Special Allowance</label>
              <span>₹ {employmentDetails.specialAllowance.toLocaleString('en-IN')}</span>
            </div>
          )}
          
          {employmentDetails.bonus && (
            <div className="info-item">
              <label>Annual Bonus</label>
              <span>₹ {employmentDetails.bonus.toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Employment Documents */}
      <DocumentSection
        title="Employment Documents"
        documents={employmentDocuments}
        documentType="employment"
      />

      {/* Document Checklist */}
      <div className="section">
        <h3>Document Checklist</h3>
        <div className="info-grid">
          {employmentDetails.occupationType === 'Salaried' && (
            <>
              <div className="info-item">
                <label>Salary Slips (Last 3-6 months)</label>
                <span className={employmentDocuments.some(doc => doc.type === 'salary') ? 'verified' : 'pending'}>
                  {employmentDocuments.some(doc => doc.type === 'salary') ? '✓ Provided' : '⏳ Pending'}
                </span>
              </div>
              
              <div className="info-item">
                <label>Bank Statements (6 months)</label>
                <span className={employmentDocuments.some(doc => doc.type === 'bank') ? 'verified' : 'pending'}>
                  {employmentDocuments.some(doc => doc.type === 'bank') ? '✓ Provided' : '⏳ Pending'}
                </span>
              </div>
              
              <div className="info-item">
                <label>ITR (Last 2-3 years)</label>
                <span className={employmentDocuments.some(doc => doc.type === 'itr') ? 'verified' : 'pending'}>
                  {employmentDocuments.some(doc => doc.type === 'itr') ? '✓ Provided' : '⏳ Pending'}
                </span>
              </div>
              
              <div className="info-item">
                <label>Employment Proof</label>
                <span className={employmentDocuments.some(doc => doc.type === 'employment') ? 'verified' : 'pending'}>
                  {employmentDocuments.some(doc => doc.type === 'employment') ? '✓ Provided' : '⏳ Pending'}
                </span>
              </div>
            </>
          )}
          
          {employmentDetails.occupationType === 'Self Employed' && (
            <>
              <div className="info-item">
                <label>ITR (Last 2-3 years)</label>
                <span className={employmentDocuments.some(doc => doc.type === 'itr') ? 'verified' : 'pending'}>
                  {employmentDocuments.some(doc => doc.type === 'itr') ? '✓ Provided' : '⏳ Pending'}
                </span>
              </div>
              
              <div className="info-item">
                <label>Bank Statements (12 months)</label>
                <span className={employmentDocuments.some(doc => doc.type === 'bank') ? 'verified' : 'pending'}>
                  {employmentDocuments.some(doc => doc.type === 'bank') ? '✓ Provided' : '⏳ Pending'}
                </span>
              </div>
              
              <div className="info-item">
                <label>Business Registration</label>
                <span className={employmentDocuments.some(doc => doc.type === 'business') ? 'verified' : 'pending'}>
                  {employmentDocuments.some(doc => doc.type === 'business') ? '✓ Provided' : '⏳ Pending'}
                </span>
              </div>
              
              <div className="info-item">
                <label>GST Certificate</label>
                <span className={employmentDocuments.some(doc => doc.type === 'gst') ? 'verified' : 'pending'}>
                  {employmentDocuments.some(doc => doc.type === 'gst') ? '✓ Provided' : '⏳ Pending'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmploymentTab;