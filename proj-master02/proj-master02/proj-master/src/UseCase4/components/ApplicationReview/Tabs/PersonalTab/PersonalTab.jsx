// components/ApplicationReview/Tabs/PersonalTab/PersonalTab.js
import React from 'react';
import DocumentSection from '../../DocumentSection/DocumentSection';
import './PersonalTab.css';

const PersonalTab = ({ application }) => {
  return (
    <div className="tab-content active">
      <div className="info-grid">
        <div className="info-item">
          <label>First Name</label>
          <span>{application.personalDetails.firstName}</span>
        </div>
        <div className="info-item">
          <label>Middle Name</label>
          <span>{application.personalDetails.middleName || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label>Last Name</label>
          <span>{application.personalDetails.lastName}</span>
        </div>
        <div className="info-item">
          <label>Date of Birth</label>
          <span>{new Date(application.personalDetails.dateOfBirth).toLocaleDateString('en-IN')}</span>
        </div>
        <div className="info-item">
          <label>Gender</label>
          <span>{application.personalDetails.gender}</span>
        </div>
        <div className="info-item">
          <label>Marital Status</label>
          <span>{application.personalDetails.maritalStatus}</span>
        </div>
        <div className="info-item">
          <label>Aadhaar Number</label>
          <span>{application.personalDetails.aadhaarNumber}</span>
        </div>
        <div className="info-item">
          <label>PAN Number</label>
          <span>{application.personalDetails.panNumber}</span>
        </div>
        {application.personalDetails.passportNumber && (
          <div className="info-item">
            <label>Passport Number</label>
            <span>{application.personalDetails.passportNumber}</span>
          </div>
        )}
        <div className="info-item">
          <label>Father's Name</label>
          <span>{application.personalDetails.fatherName}</span>
        </div>
        <div className="info-item">
          <label>Education</label>
          <span>{application.personalDetails.education}</span>
        </div>
        <div className="info-item full-width">
          <label>Current Address</label>
          <span>{application.personalDetails.currentAddress}</span>
        </div>
        <div className="info-item full-width">
          <label>Permanent Address</label>
          <span>{application.personalDetails.permanentAddress}</span>
        </div>
      </div>

      <DocumentSection
        title="Personal Documents"
        documents={application.personalDocuments}
        documentType="personal"
      />
    </div>
  );
};

export default PersonalTab;