// components/Dashboard/ApplicationTile/ApplicationTile.js
import React from 'react';
import './ApplicationTile.css';

const ApplicationTile = ({ application, getCibilStatus, onClick }) => {
  return (
    <div className="application-tile" onClick={onClick}>
      <div className="tile-header">
        <h4>{application.customerName}</h4>
        <span className={`status ${application.status.toLowerCase().replace(' ', '-')}`}>
          {application.status}
        </span>
      </div>
      <div className="tile-details">
        <div className="detail-row">
          <span className="detail-label">ID:</span>
          <span className="detail-value">{application.id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Type:</span>
          <span className="detail-value">{application.loanType}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Amount:</span>
          <span className="detail-value">₹ {application.loanAmount.toLocaleString('en-IN')}</span>
        </div>
        <div className="score-container">
          <span className="detail-label">Score:</span>
          <span className={`score ${getCibilStatus(application.cibilScore)}`}>
            {application.cibilScore}
          </span>
        </div>
      </div>
      <div className="tile-footer">
        <span className="application-date">
          {new Date(application.submittedDate).toLocaleDateString()}
        </span>
        <button className="review-btn">Review →</button>
      </div>
    </div>
  );
};

export default ApplicationTile;