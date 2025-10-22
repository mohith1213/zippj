import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
 

const Navbar = ({ user, onMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('loanApplications');
      localStorage.removeItem('userProfile');
      alert('Logged out successfully!');
      navigate('/login', { replace: true });
    }
  };

  // outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // route
  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  return (
    <>
      <style>{`
        .usecase2 .navbar-custom { background: #ffffff; box-shadow: 0 2px 10px rgba(0,0,0,0.06); border-bottom: 1px solid #eaeaea; padding-top: 10px; padding-bottom: 10px; position: sticky; top: 0; z-index: 1050; }
        .usecase2 .navbar-custom .navbar-brand { font-size: 1.5rem; font-weight: bold; color: #0d6efd !important; text-decoration: none; border: none; background: none; }
        .usecase2 .navbar-custom .navbar-brand:hover { color: #0b5ed7 !important; }
        .usecase2 .navbar-custom .btn-primary { background: #0d6efd; border-color: #0d6efd; }
        .usecase2 .navbar-custom .btn-primary:hover { background: #0b5ed7; border-color: #0a58ca; }
        .usecase2 .dropdown { position: relative; }
        .usecase2 .dropdown-menu { border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-radius: 8px; margin-top: 8px; min-width: 250px; z-index: 1050; right: 0 !important; left: auto !important; transform: none !important; }
        .usecase2 .dropdown-menu.dropdown-menu-end { right: 0 !important; left: auto !important; transform: translateX(0) !important; }
        .usecase2 .dropdown-item { padding: 10px 20px; transition: background-color 0.2s; }
        .usecase2 .dropdown-item:hover { background: #f8f9fa; }
        .usecase2 .dropdown-item.text-danger:hover { background: #f8d7da; color: #842029 !important; }
        .usecase2 .dropdown-item-text { padding: 15px 20px; margin: 0; }
        .usecase2 .navbar-custom .fw-semibold { color: #0d6efd; }
        /* burger */
        .usecase2 .menu-btn { display: none; }
        @media (max-width: 768px) { .usecase2 .dropdown-menu { min-width: 220px; right: 0 !important; left: auto !important; } }
        @media (max-width: 576px) { .usecase2 .dropdown-menu { min-width: 200px; right: 0 !important; left: auto !important; } }
        @media (max-width: 992px) { .usecase2 .menu-btn { display: inline-flex; } }
      `}</style>
      <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
        <div className="container-fluid">
          <button
            className="btn bg-transparent border-0 me-2 menu-btn"
            type="button"
            aria-label="Menu"
            onClick={() => onMenu && onMenu()}
          >
            <i className="bi bi-list fs-3"></i>
          </button>
          <button
            className="navbar-brand p-0 border-0 bg-transparent"
            onClick={() => navigate('/customer-dashboard/dashboard')}
            aria-label="Home"
          >
            <img
              src="/assets/sc-logo.png"
              alt="Standard Chartered"
              width="200"
              height="55"
              style={{ objectFit: 'contain', display: 'block' }}
            />
          </button>
          
          <div className="navbar-nav ms-auto">
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn bg-transparent border-0 position-relative"
                aria-label="Notifications"
                onClick={() => navigate('/customer-dashboard/notifications')}
                title="Notifications"
              >
                <i className="bi bi-bell fs-5"></i>
              </button>
              <div className="dropdown" ref={dropdownRef}>
                <button 
                  className="btn d-flex align-items-center gap-2 py-1 px-2 bg-transparent border-0 text-primary"
                  onClick={() => setShowDropdown(!showDropdown)}
                  type="button"
                  aria-label="User menu"
                >
                  <i className="bi bi-person-circle fs-4"></i>
                  <i className="bi bi-chevron-down fs-6"></i>
                </button>
                
                {showDropdown && (
                  <div className="dropdown-menu dropdown-menu-end show position-absolute">
                    <div className="dropdown-item-text">
                      <strong>{user.name}</strong>
                      <br />
                      <small className="text-muted">{user.email}</small>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button 
                      className="dropdown-item" 
                      onClick={() => { navigate('/customer-dashboard/profile'); setShowDropdown(false); }}
                    >
                      <i className="bi bi-person me-2"></i>
                      Profile Settings
                    </button>
                    <div className="dropdown-divider"></div>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;