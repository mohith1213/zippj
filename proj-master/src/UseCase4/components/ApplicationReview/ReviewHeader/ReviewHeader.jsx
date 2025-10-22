// components/ApplicationReview/ReviewHeader/ReviewHeader.jsx
import React from 'react';
import './ReviewHeader.css';

const ReviewHeader = ({ selectedApplication, setCurrentPage }) => {
    return (
        <div className="review-header">
            <button 
                className="back-button"
                onClick={() => setCurrentPage('dashboard')}
            >
                ← Back to Dashboard
            </button>
            
            <div className="header-center">
                <h2>Application Review</h2>
                <div className="application-id">{selectedApplication.id}</div>
            </div>
            
            <div className="customer-info">
                <h3 className="customer-name">{selectedApplication.customerName}</h3>
                <div className="customer-details">
                    <div>{selectedApplication.email}</div>
                    <div>{selectedApplication.phone}</div>
                    <div>{selectedApplication.age} years old</div>
                </div>
            </div>
        </div>
    );
};

export default ReviewHeader;