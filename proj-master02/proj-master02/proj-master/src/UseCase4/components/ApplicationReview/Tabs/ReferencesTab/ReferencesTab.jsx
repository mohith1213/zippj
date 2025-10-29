// components/ApplicationReview/Tabs/ReferencesTab/ReferencesTab.jsx
import React from 'react';
import './ReferencsTab.css';

const ReferencesTab = ({ application }) => {
  const reference = application?.references?.[0]; // Only first reference

  if (!reference) {
    return (
      <div className="references-tab">
        <h3>References</h3>
        <p className="no-reference">No reference information available.</p>
      </div>
    );
  }

  return (
    <div className="references-tab">
      <h3>References</h3>
      <div className="reference-card">
        <div className="reference-item">
          <label>Name</label>
          <span>{reference.name}</span>
        </div>

        <div className="reference-item">
          <label>Relationship</label>
          <span>{reference.relationship}</span>
        </div>

        <div className="reference-item">
          <label>Contact Number</label>
          <span>{reference.phone}</span>
        </div>

        <div className="reference-item">
          <label>Address</label>
          <span>{reference.address}</span>
        </div>
      </div>
    </div>
  );
};

export default ReferencesTab;
