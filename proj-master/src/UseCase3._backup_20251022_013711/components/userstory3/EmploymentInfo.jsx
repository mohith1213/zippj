import React from "react";
import "./LoanForm.css";

const EmploymentInfo = ({ formData, setFormData, nextStep, prevStep, errors }) => (
  <div className="form-container">
    <h2>Employment Information</h2>
    <p>Tell us about your employment</p>

    <div className="form-grid">
      <div>
        <label>Employment Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="">Select</option>
          <option>Full-time Employed</option>
          <option>Part-time Employed</option>
          <option>Self-employed</option>
          <option>Retired</option>
          <option>Unemployed</option>
        </select>
        {errors.status && <span className="error-text">{errors.status}</span>}
      </div>

      <div>
        <label>Employer Name</label>
        <input
          type="text"
          value={formData.employer}
          onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
        />
        {errors.employer && <span className="error-text">{errors.employer}</span>}
      </div>

      <div>
        <label>Job Title</label>
        <input
          type="text"
          value={formData.jobTitle}
          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
        />
        {errors.jobTitle && <span className="error-text">{errors.jobTitle}</span>}
      </div>

      <div>
        <label>Annual Income</label>
        <input
          type="number"
          value={formData.income}
          onChange={(e) => setFormData({ ...formData, income: e.target.value })}
        />
        {errors.income && <span className="error-text">{errors.income}</span>}
      </div>

      <div>
        <label>Years at Current Employer</label>
        <input
          type="number"
          value={formData.yearsAtEmployer}
          onChange={(e) => setFormData({ ...formData, yearsAtEmployer: e.target.value })}
        />
        {errors.yearsAtEmployer && <span className="error-text">{errors.yearsAtEmployer}</span>}
      </div>
    </div>

    <div className="btn-group">
      <button onClick={prevStep}>← Back</button>
      <button className="next-btn" onClick={nextStep}>Next →</button>
    </div>
  </div>
);

export default EmploymentInfo;
