import React, { useEffect, useRef, useState } from "react";
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

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('loanApplications');
      localStorage.removeItem('userProfile');
      alert('Logged out successfully!');
      navigate('/login', { replace: true });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-sc">
      <div className="container">
        <Link to="/checker-dashboard/dashboard" className="navbar-brand d-flex align-items-center">
          <img
            src="/assets/sc-logo.png"
            alt="SCB"
            height="100"
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
              className={`nav-link ${location.pathname.includes("/checker-dashboard/notifications") ? "active" : ""}`} 
              to="/checker-dashboard/notifications"
              title="Notifications"
            >
              <i className="bi bi-bell fs-5"></i>
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
  );
}