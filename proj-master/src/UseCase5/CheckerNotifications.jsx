import React, { useState, useEffect } from "react";
import "./CheckerNotifications.css";

export default function CheckerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock notifications data - only maker comments and loan decisions
  const mockNotifications = [
    {
      id: 1,
      type: "maker_comment",
      title: "Maker Comment Added",
      message: "Maker John Smith added a comment on application LA2025005: 'Income verification required'",
      timestamp: "2025-01-15 10:30 AM",
      applicationId: "LA2025005"
    },
    {
      id: 2,
      type: "loan_approved",
      title: "Loan Approved",
      message: "Application LA2025003 has been approved by Maker Sarah Johnson",
      timestamp: "2025-01-15 09:15 AM",
      applicationId: "LA2025003"
    },
    {
      id: 3,
      type: "loan_rejected",
      title: "Loan Rejected",
      message: "Application LA2025002 has been rejected by Maker Mike Wilson: 'Insufficient credit score'",
      timestamp: "2025-01-14 3:45 PM",
      applicationId: "LA2025002"
    },
    {
      id: 4,
      type: "maker_comment",
      title: "Maker Comment Added",
      message: "Maker Sarah Johnson added a comment on application LA2025001: 'Documents verified successfully'",
      timestamp: "2025-01-14 2:20 PM",
      applicationId: "LA2025001"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getTypeIcon = (type) => {
    const icons = {
      maker_comment: "bi-chat-dots",
      loan_approved: "bi-check-circle",
      loan_rejected: "bi-x-circle"
    };
    return icons[type] || "bi-info-circle";
  };

  const getTypeColor = (type) => {
    const colors = {
      maker_comment: "text-primary",
      loan_approved: "text-success",
      loan_rejected: "text-danger"
    };
    return colors[type] || "text-muted";
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-hero d-flex align-items-center justify-content-center mb-4">
        <div className="text-center text-white">
          <h4 className="mb-1">Notifications</h4>
          <p className="sub mb-0">Maker comments and loan decisions</p>
        </div>
      </div>

      {/* Statistics removed to simplify backend and UI */}

      {/* Notifications List */}
      <div className="section-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Recent Notifications ({notifications.length})</h5>
        </div>

        <div className="notifications-list">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className="notification-item"
            >
              <div className="d-flex align-items-start">
                <div className="notification-icon me-3">
                  <i className={`bi ${getTypeIcon(notification.type)} ${getTypeColor(notification.type)}`}></i>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <h6 className="mb-0 fw-semibold">{notification.title}</h6>
                  </div>
                  <p className="text-muted mb-2">{notification.message}</p>
                  <small className="text-muted">
                    <i className="bi bi-clock me-1"></i>
                    {notification.timestamp}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-4">
            <i className="bi bi-bell-slash display-4 text-muted"></i>
            <p className="text-muted mt-2">No notifications found</p>
          </div>
        )}
      </div>
    </div>
  );
}