import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("loanApplications");
      localStorage.removeItem("userProfile");
      alert("Logged out successfully!");
      navigate("/Login");
    }
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left Section */}
        <button
          className="navbar-brand btn btn-link text-decoration-none text-white fs-5 fw-bold"
          onClick={() => navigate("/Login")}
        >
          <i className="fas fa-landmark me-2"></i>
          Standard Chartered
        </button>

        {/* Right Section */}
        <div
          className="d-flex align-items-center gap-3 position-relative"
          ref={dropdownRef}
        >
          <span className="text-light fw-semibold">
            Welcome, {user.name || "User"}
          </span>

          <button
            className="btn btn-outline-light btn-sm d-flex align-items-center"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <i className="fas fa-user-circle me-2"></i>
            Profile
            <i className="fas fa-chevron-down ms-2"></i>
          </button>

          {showDropdown && (
            <div
              className="dropdown-menu show shadow-sm border-0"
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                minWidth: "190px",
                zIndex: 2000,
                borderRadius: "8px",
              }}
            >
              <button
                className="dropdown-item"
                onClick={() => {
                  navigate("/profile");
                  setShowDropdown(false);
                }}
              >
                <i className="fas fa-user me-2"></i>View Profile
              </button>

              <button
                className="dropdown-item"
                onClick={() => {
                  navigate("/applications");
                  setShowDropdown(false);
                }}
              >
                <i className="fas fa-list me-2"></i>My Applications
              </button>

              <hr className="dropdown-divider" />

              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
