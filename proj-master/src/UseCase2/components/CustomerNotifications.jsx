import React, { useEffect, useState } from "react";
import "./CustomerNotifications.css";

export default function CustomerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock customer-centric notifications
  const mockNotifications = [
    {
      id: 1,
      type: "status_update",
      title: "Application Status Updated",
      message: "Your application LA2025001 status changed to Pending. Our team is reviewing your documents.",
      timestamp: "2025-10-15 10:10 AM",
      applicationId: "LA2025001"
    },
    {
      id: 2,
      type: "request_docs",
      title: "Additional Documents Requested",
      message: "Please upload the latest 3 months salary slips for application LA2025002.",
      timestamp: "2025-10-14 05:45 PM",
      applicationId: "LA2025002"
    },
    {
      id: 3,
      type: "decision",
      title: "Application Decision",
      message: "Your application LA2025003 is approved. Our team will reach out for next steps.",
      timestamp: "2025-10-14 03:20 PM",
      applicationId: "LA2025003"
    }
  ];

  useEffect(() => {
    const t = setTimeout(() => {
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const getTypeIcon = (type) => {
    const icons = {
      status_update: "bi-arrow-repeat",
      request_docs: "bi-file-earmark-text",
      decision: "bi-check2-circle",
    };
    return icons[type] || "bi-info-circle";
  };

  const getTypeColor = (type) => {
    const colors = {
      status_update: "text-primary",
      request_docs: "text-warning",
      decision: "text-success",
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
      <div className="notifications-page-hero d-flex align-items-center justify-content-center mb-4">
        <div className="text-center text-white">
          <h4 className="mb-1">Notifications</h4>
          <p className="sub mb-0">Status updates, document requests and decisions</p>
        </div>
      </div>

      <div className="section-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Recent Notifications ({notifications.length})</h5>
        </div>

        <div className="notifications-list">
          {notifications.map((n) => (
            <div key={n.id} className="notification-item">
              <div className="d-flex align-items-start">
                <div className="notification-icon me-3">
                  <i className={`bi ${getTypeIcon(n.type)} ${getTypeColor(n.type)}`}></i>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <h6 className="mb-0 fw-semibold">{n.title}</h6>
                  </div>
                  <p className="text-muted mb-2">{n.message}</p>
                  <small className="text-muted">
                    <i className="bi bi-clock me-1"></i>
                    {n.timestamp}
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
