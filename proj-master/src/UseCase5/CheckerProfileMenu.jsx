import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckerProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('loanApplications');
      localStorage.removeItem('userProfile');
      alert('Logged out successfully!');
      setIsOpen(false);
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="profile-menu">
      <div className="dropdown">
        <button 
          className="btn btn-link profile-icon-btn" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <div className="profile-avatar">
            JC
          </div>
        </button>
        
        {isOpen && (
          <div className="dropdown-menu dropdown-menu-end show profile-dropdown">
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
        )}
      </div>
      
      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="dropdown-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}