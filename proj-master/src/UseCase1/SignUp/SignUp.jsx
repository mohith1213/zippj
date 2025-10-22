import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScImage2 from '../Images/Signup_image.jpg';
import '../SignUp/SignUp.css';

function SignupPage() {
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Signup form submitted!');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="auth-page signup-page">
      <div className="auth-container">
        <div className="auth-form-section">
          <div className="auth-header">
            <h1>Create Your Account</h1>
            <p>Join Standard Chartered Bank today</p>
            <button className="back-btn" onClick={handleBackToHome}>← Back to Home</button>
          </div>
          <form onSubmit={handleFormSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input 
                  type="text" 
                  id="firstName" 
                  placeholder="Enter your first name" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input 
                  type="text" 
                  id="lastName" 
                  placeholder="Enter your last name" 
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email address" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input 
                type="tel" 
                id="phone" 
                placeholder="Enter your phone number" 
                required 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="newPassword">Create Password *</label>
                <input 
                  type="password" 
                  id="newPassword" 
                  placeholder="Create a strong password" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  placeholder="Confirm your password" 
                  required 
                />
              </div>
            </div>
            
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" required />
                I agree to the Terms & Conditions and Privacy Policy
              </label>
            </div>
            
            <button type="submit" className="submit-btn signup-submit-btn">
              CREATE ACCOUNT
            </button>
          </form>
          
          <div className="form-footer">
            <p>Already have an account? <span className="switch-form" onClick={handleLoginClick}>Login</span></p>
          </div>
        </div>
        <div className="auth-image-section">
          <img src={ScImage2} alt="Standard Chartered Signup" className="auth-image" />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;