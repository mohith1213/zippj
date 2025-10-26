import React, { useEffect } from "react";
import "./LoanForm.css";

const PersonalInfo = ({ formData, setFormData, nextStep, errors }) => {
  
  // Automatically calculate age when DOB changes
  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const ageDiff = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDiff);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      setFormData({ ...formData, age: calculatedAge });
    }
    // eslint-disable-next-line
  }, [formData.dob]);

  return (
    <div className="form-container">
      <h2>Personal Information</h2>
      <p>Please provide your personal details</p>

      <div className="form-grid">
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={formData.fullName || ""}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            maxLength="10"
            value={formData.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div>
          <label>Address</label>
          <textarea
            rows="3"
            value={formData.address || ""}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          {errors.address && <span className="error-text">{errors.address}</span>}
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            value={formData.dob || ""}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
          {errors.dob && <span className="error-text">{errors.dob}</span>}
        </div>

        <div>
          <label>Age</label>
          <input type="number" value={formData.age || ""} readOnly disabled />
        </div>

        <div>
          <label>Marital Status</label>
          <select
            value={formData.maritalStatus || ""}
            onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
          >
            <option value="">Select</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>
          {errors.maritalStatus && <span className="error-text">{errors.maritalStatus}</span>}
        </div>

        <div>
          <label>Gender</label>
          <select
            value={formData.gender || ""}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && <span className="error-text">{errors.gender}</span>}
        </div>

        <div>
          <label>Aadhar Number</label>
          <input
            type="text"
            maxLength="12"
            value={formData.aadharNumber || ""}
            onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value })}
          />
          {errors.aadharNumber && <span className="error-text">{errors.aadharNumber}</span>}
        </div>

        <div>
          <label>PAN Number</label>
          <input
            type="text"
            maxLength="10"
            value={formData.panNumber || ""}
            onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
          />
          {errors.panNumber && <span className="error-text">{errors.panNumber}</span>}
        </div>

        <div>
          <label>Passport Number (Optional)</label>
          <input
            type="text"
            maxLength="8"
            value={formData.passportNumber || ""}
            onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value.toUpperCase() })}
          />
        </div>

        <div>
          <label>Father’s Name</label>
          <input
            type="text"
            value={formData.fatherName || ""}
            onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
          />
          {errors.fatherName && <span className="error-text">{errors.fatherName}</span>}
        </div>

        <div>
          <label>Highest Qualification</label>
          <select
            value={formData.highestQualification || ""}
            onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
          >
            <option value="">Select</option>
            <option>High School</option>
            <option>Diploma</option>
            <option>Bachelor’s Degree</option>
            <option>Master’s Degree</option>
            <option>Ph.D</option>
          </select>
          {errors.highestQualification && (
            <span className="error-text">{errors.highestQualification}</span>
          )}
        </div>
      </div>

      <button className="next-btn" onClick={nextStep}>
        Next →
      </button>
    </div>
  );
};

export default PersonalInfo;
