// components/ApplicationReview/DocumentCard/DocumentCard.js
import React from 'react';
import './DocumentCard.css';

const DocumentCard = ({ document, documentType, docIndex }) => {
  const getDocumentIcon = (type) => {
    const icons = {
      identity: '🆔',
      address: '🏠',
      salary: '💰',
      itr: '📊',
      bank: '🏦',
      property: '🏢',
      vehicle: '🚗',
      photo: '📷'
    };
    return icons[type] || '📄';
  };

  const handleDocumentClick = (doc) => {
    alert(`Opening document: ${doc.name}\nFile: ${doc.file}`);
    // In real app, this would open the actual document
  };

  const toggleVerification = () => {
    // This would be connected to the parent component's state
    alert(`Toggling verification for ${document.name}`);
  };

  return (
    <div className={`document-card ${document.verified ? 'verified' : 'pending'}`}>
      <div className="document-icon">
        {getDocumentIcon(document.type)}
      </div>
      <div className="document-info">
        <h4>{document.name}</h4>
        <p className="document-file">{document.file}</p>
      </div>
      <div className="document-actions">
        <button 
          className={`verify-btn ${document.verified ? 'verified' : 'pending'}`}
          onClick={toggleVerification}
        >
          {document.verified ? '✓ Verified' : 'Verify'}
        </button>
        <button 
          className="view-btn"
          onClick={() => handleDocumentClick(document)}
        >
          👁️ View
        </button>
      </div>
    </div>
  );
};

export default DocumentCard;