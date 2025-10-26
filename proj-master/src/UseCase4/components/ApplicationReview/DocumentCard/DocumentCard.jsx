// components/ApplicationReview/DocumentCard/DocumentCard.js
import React, { useState } from 'react';
import ModalPopup from '../../../../components/ModalPopup';
import './DocumentCard.css';

const DocumentCard = ({ document, documentType, docIndex }) => {
  const [infoModal, setInfoModal] = useState({ show: false, title: '', message: '' });
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
    setInfoModal({ show: true, title: 'Open Document', message: `Opening document: ${doc.name}\nFile: ${doc.file}` });
    // In real app, this would open the actual document
  };

  const toggleVerification = () => {
    // This would be connected to the parent component's state
    setInfoModal({ show: true, title: 'Verification', message: `Toggling verification for ${document.name}` });
  };

  return (
    <>
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
    <ModalPopup
      show={infoModal.show}
      title={infoModal.title}
      message={infoModal.message}
      onClose={() => setInfoModal({ ...infoModal, show: false })}
    />
    </>
  );
};

export default DocumentCard;