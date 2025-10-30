import React, { useEffect, useState } from "react";
import "./CustomerNotifications.css";
import { listUserNotifications } from "../../api/notifications";

export default function CustomerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auRaw = localStorage.getItem('authUser');
    const au = auRaw ? JSON.parse(auRaw) : null;
    const uid = au?.id;
    if (!uid) { setIsLoading(false); return; }
    listUserNotifications(uid)
      .then(list => {
        const mapped = (list || []).map(n => ({
          id: n.id,
          type: (n.type || '').toLowerCase().includes('rejected') ? 'decision' : (n.type || '').toLowerCase().includes('approved') ? 'decision' : 'status_update',
          title: n.type ? n.type.replace(/_/g,' ') : 'Notification',
          message: n.message,
          timestamp: n.createdAt,
          applicationId: '',
          read: n.readFlag
        }));
        setNotifications(mapped);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const markAllRead = () => {
    const updated = (notifications || []).map(n => ({ ...n, read: true }));
    setNotifications(updated);
  };

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
          <button className="btn btn-sm btn-outline-primary" onClick={markAllRead} disabled={!notifications.some(n => !n.read)}>
            Mark all as read
          </button>
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
