import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../../api/auth';
import ScImage1 from '../Images/Sc-Image1.jpeg';
import './Login.css';
import AllPopup from '../../components/AllPopup';

function Login() {
  const navigate = useNavigate();

  // ====== States ======
  const [role, setRole] = useState('customer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState({ show: false, title: '', message: '' });

  // ====== Handle Form Submit ======
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // 🔸 Basic Validation
    if (!username.trim() || !password.trim()) {
      setModal({ show: true, title: 'Login Error', message: 'Please enter both username and password.' });
      return;
    }

    try {
      // Use username field as email for API login
      const resp = await apiLogin({ email: username.trim(), password: password.trim() });
      const user = resp?.user;
      if (!user || !user.id) {
        throw new Error('Invalid response from server');
      }
      // Persist authenticated user minimally
      localStorage.setItem('authUser', JSON.stringify(user));

      // Route based on backend role
      const userRole = String(user.role || '').toUpperCase();
      if (userRole === 'CUSTOMER') {
        navigate('/customer-dashboard');
      } else if (userRole === 'MAKER') {
        navigate('/maker-dashboard');
      } else if (userRole === 'CHECKER') {
        navigate('/checker-dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Login failed';
      setModal({ show: true, title: 'Login Error', message: msg });
    }
  };

  // ====== Navigation Buttons ======
  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // ====== JSX Layout ======
  return (
    <div className="auth-page login-page">
      <div className="auth-container">
        
        {/* ===== FORM SECTION ===== */}
        <div className="auth-form-section">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Login to access your Standard Chartered account</p>
            <button className="back-btn" onClick={handleBackToHome}>
              ← Back to Home
            </button>
          </div>

          {/* ===== LOGIN FORM ===== */}
          <form onSubmit={handleFormSubmit} className="auth-form">
            
            {/* Role Dropdown */}
            <div className="form-group">
              <label htmlFor="role">Login As</label>
              <select
                id="role"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="customer">Customer</option>
                <option value="maker">Maker</option>
                <option value="checker">Checker</option>
              </select>
            </div>

            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">Username / Bank ID</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username or customer ID"
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Options */}
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              <span className="lock-icon">🔒</span> LOGIN
            </button>
          </form>

          {/* ===== Footer Section ===== */}
          <div className="form-footer">
            <p>
              Don’t have an account?{' '}
              <span className="switch-form" onClick={handleSignupClick}>
                Sign Up
              </span>
            </p>
          </div>
        </div>

        {/* ===== IMAGE SECTION ===== */}
        <div className="auth-image-section">
          <img
            src={ScImage1}
            alt="Standard Chartered Banking"
            className="auth-image"
          />
        </div>
      </div>
      <AllPopup
        show={modal.show}
        title={modal.title}
        message={modal.message}
        onClose={() => setModal({ ...modal, show: false })}
      />
    </div>
  );
}

export default Login;
