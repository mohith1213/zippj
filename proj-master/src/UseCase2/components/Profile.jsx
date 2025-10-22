import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/customer.base.css';

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [id]: value
    }));
    // clear
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!editForm.name.trim()) newErrors.name = 'Name is required';
    if (!editForm.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(editForm.email)) newErrors.email = 'Email is invalid';
    if (!editForm.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!editForm.dob) newErrors.dob = 'Date of birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setUser(editForm);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(editForm));
    }
  };

  const handleCancel = () => {
    setEditForm(user);
    setErrors({});
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="dashboard-container">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <button className="btn btn-back mb-4" onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left me-2"></i>Back
            </button>

            {/* header */}
            <div className="profile-header text-center text-white p-4 rounded mb-4">
              <div className="profile-avatar mx-auto mb-3">
                {getInitials(user.name)}
              </div>
              <h2 className="mb-2">{user.name}</h2>
              <p className="mb-0 opacity-75">{user.email}</p>
            </div>

            {/* success */}
            {showSuccess && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                <i className="bi bi-check-circle me-2"></i>
                Profile updated successfully!
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowSuccess(false)}
                ></button>
              </div>
            )}

            {!isEditing ? (
              /* view */
              <div className="card card-custom">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">Personal Information</h4>
                    <button 
                      className="btn btn-primary-custom"
                      onClick={() => setIsEditing(true)}
                    >
                      <i className="bi bi-pencil-square me-2"></i>Edit Profile
                    </button>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="profile-field">
                        <div className="profile-label">Full Name</div>
                        <div className="profile-value">{user.name}</div>
                      </div>
                      <div className="profile-field">
                        <div className="profile-label">Email Address</div>
                        <div className="profile-value">{user.email}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="profile-field">
                        <div className="profile-label">Phone Number</div>
                        <div className="profile-value">{user.phone}</div>
                      </div>
                      <div className="profile-field">
                        <div className="profile-label">Date of Birth</div>
                        <div className="profile-value">{formatDate(user.dob)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : 
            (
              <div className="card card-custom">
                <div className="card-body">
                  <h4 className="mb-4">Edit Personal Information</h4>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Full Name <span className="text-danger">*</span></label>
                        <input 
                          type="text" 
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          id="name" 
                          value={editForm.name}
                          onChange={handleInputChange}
                          placeholder="Enter full name"
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email Address <span className="text-danger">*</span></label>
                        <input 
                          type="email" 
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          id="email" 
                          value={editForm.email}
                          onChange={handleInputChange}
                          placeholder="Enter email address"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                        <input 
                          type="tel" 
                          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                          id="phone" 
                          value={editForm.phone}
                          onChange={handleInputChange}
                          placeholder="Enter phone number"
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
                        <input 
                          type="date" 
                          className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                          id="dob" 
                          value={editForm.dob}
                          onChange={handleInputChange}
                        />
                        {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-3 mt-4">
                    <button 
                      className="btn btn-secondary-custom flex-grow-1"
                      onClick={handleCancel}
                    >
                      <i className="bi bi-x me-2"></i>Cancel
                    </button>
                    <button 
                      className="btn btn-primary-custom flex-grow-1"
                      onClick={handleSave}
                    >
                      <i className="bi bi-save me-2"></i>Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;