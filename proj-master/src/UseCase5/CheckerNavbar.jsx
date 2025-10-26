import React, { useEffect, useRef, useState } from "react";
import ModalPopup from "../components/ModalPopup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./CheckerNavbar.css";

export default function CheckerNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  const [logoutModal, setLogoutModal] = useState(false);
  const handleLogout = () => setLogoutModal(true);
  const confirmLogout = () => {
    try {
      localStorage.removeItem('loanApplications');
      localStorage.removeItem('userProfile');
    } catch {}
    setLogoutModal(false);
    navigate('/login', { replace: true });
  };

  return (
    <>
    <style>{`
      /* Standardized navbar look (align with UC2) */
      .navbar-sc { background: #ffffff; box-shadow: 0 2px 10px rgba(0,0,0,0.06); border-bottom: 1px solid #eaeaea; position: sticky; top: 0; z-index: 1050; padding-top: 10px; padding-bottom: 10px; height: 70px; }
      .navbar-sc .container-fluid { padding-left: 8px; padding-right: 16px; }
      .navbar-sc .navbar-brand { text-decoration: none; padding: 0; margin: 0; }
      .navbar-sc .sc-logo { object-fit: contain; display: block; }
      .navbar-sc .nav-link { color: #0d6efd; }
      .navbar-sc .nav-link.active, .navbar-sc .nav-link:hover { color: #0b5ed7; }
      /* Notifications bell */
      .navbar-sc .notif-btn { position: relative; color: #0d6efd; transition: transform .2s ease, color .2s ease; }
      .navbar-sc .notif-btn .bell { display: inline-block; transition: transform .2s ease; }
      .navbar-sc .notif-btn:hover { color: #0b5ed7; transform: translateY(-1px); }
      .navbar-sc .notif-btn:hover .bell { transform: scale(1.08); }
      .navbar-sc .notif-badge { position: absolute; top: 2px; right: 2px; width: 9px; height: 9px; border-radius: 50%; background: #dc3545; box-shadow: 0 0 0 2px #fff; }
      .navbar-sc .notif-badge::after { content: ""; position: absolute; inset: 0; border-radius: inherit; box-shadow: 0 0 0 0 rgba(220,53,69,.5); animation: sc-pulse 1.8s infinite; }
      @keyframes sc-pulse { 0% { box-shadow: 0 0 0 0 rgba(220,53,69,.5);} 70% { box-shadow: 0 0 0 6px rgba(220,53,69,0);} 100% { box-shadow: 0 0 0 0 rgba(220,53,69,0);} }
      /* Profile dropdown menu */
      .navbar-sc .profile-dropdown { border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-radius: 8px; margin-top: 8px; min-width: 240px; z-index: 1050; right: 0 !important; left: auto !important; transform: none !important; }
      .navbar-sc .profile-icon-btn { color: #0d6efd; }
      .navbar-sc .profile-icon-btn:hover { color: #0b5ed7; }
    `}</style>
    <nav className="navbar navbar-expand-lg navbar-light navbar-sc">
      <div className="container-fluid">
        <Link to="/checker-dashboard/dashboard" className="navbar-brand d-flex align-items-center">
          <img
            src="/assets/sc-logo.png"
            alt="SCB"
            width="200"
            height="55"
            style={{ objectFit: 'contain', display: 'block' }}
            className="sc-logo"
            onError={(e) => {
              e.currentTarget.src = "https://www.sc.com/wp-content/themes/standard-chartered/images/standard-chartered-logo.svg";
            }}
          />
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navbarNav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname.includes("/checker-dashboard/dashboard") ? "active" : ""}`} 
                to="/checker-dashboard/dashboard"
              >
                <i className="bi bi-house-door me-1"></i>
                Dashboard
              </Link>
            </li>
          </ul>

          <div className="navbar-actions d-flex align-items-center gap-3">
            <Link 
              className={`nav-link position-relative notif-btn ${location.pathname.includes("/checker-dashboard/notifications") ? "active" : ""}`} 
              to="/checker-dashboard/notifications"
              title="Notifications"
            >
              <i className="bi bi-bell fs-5 bell"></i>
              <span className="notif-badge" aria-hidden="true"></span>
            </Link>

            <div className="profile-menu" ref={dropdownRef}>
              <button 
                className="btn btn-link profile-icon-btn" 
                type="button" 
                onClick={() => setShowDropdown(!showDropdown)}
                aria-expanded={showDropdown}
              >
                <div className="profile-avatar">JC</div>
              </button>
              {showDropdown && (
                <>
                  <div className="dropdown-menu dropdown-menu-end show profile-dropdown position-absolute">
                    <div className="profile-header">
                      <div className="profile-info">
                        <div className="profile-name">John Checker</div>
                        <div className="profile-role">Checker Portal</div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button 
                      className="dropdown-item logout-btn"
                      type="button"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </div>
                  <div className="dropdown-overlay" onClick={() => setShowDropdown(false)}></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
    <ModalPopup
      show={logoutModal}
      title="Logout"
      message="Are you sure you want to logout?"
      onClose={() => setLogoutModal(false)}
      onConfirm={confirmLogout}
      confirmText="Logout"
      cancelText="Cancel"
      confirmVariant="danger"
    />
    </>
  );
}