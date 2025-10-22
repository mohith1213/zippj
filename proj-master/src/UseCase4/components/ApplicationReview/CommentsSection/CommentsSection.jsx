// components/ApplicationReview/CommentsSection/CommentsSection.js
import React from 'react';

import './CommentsSection.css';

const CommentsSection = ({
  reviewComments,
  setReviewComments,
  handleApprove,
  handleReject
}) => {
  return (
    <div className="comments-section">
      <h3>Maker Comments</h3>
      <div className="comments-input">
        <label>Add your review comments *</label>
        <textarea
          value={reviewComments}
          onChange={(e) => setReviewComments(e.target.value)}
          placeholder="Enter your comments about the application review..."
          rows="4"
        />
      </div>
      <div className="action-buttons">
        <button 
          className="btn-approve"
          onClick={handleApprove}
        >
          Approve & Send to Checker
        </button>
        <button 
          className="btn-reject"
          onClick={handleReject}
        >
          Reject Application
        </button>
      </div>
    </div>
  );
};

export default CommentsSection;