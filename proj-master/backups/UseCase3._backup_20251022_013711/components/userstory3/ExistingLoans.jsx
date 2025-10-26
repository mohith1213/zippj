import React from "react";
import "./LoanForm.css";

const ExistingLoans = ({ formData, setFormData, nextStep, prevStep, errors }) => (
  <div className="form-container">
    <h2>Existing Loans</h2>
    <p>Tell us about any existing loans you have</p>

    <label>Do you have any existing loans?</label>
    <select
      value={formData.hasLoans}
      onChange={(e) => setFormData({ ...formData, hasLoans: e.target.value })}
    >
      <option value="">Select</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
    {errors.hasLoans && <span className="error-text">{errors.hasLoans}</span>}

    {formData.hasLoans === "Yes" && (
      <div className="form-grid">
        <div>
          <label>Loan Type</label>
          <input
            type="text"
            value={formData.loanType}
            onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
          />
          {errors.loanType && <span className="error-text">{errors.loanType}</span>}
        </div>

        <div>
          <label>Monthly Payment</label>
          <input
            type="number"
            value={formData.payment}
            onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
          />
          {errors.payment && <span className="error-text">{errors.payment}</span>}
        </div>

        <div>
          <label>Outstanding Balance</label>
          <input
            type="number"
            value={formData.balance}
            onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
          />
          {errors.balance && <span className="error-text">{errors.balance}</span>}
        </div>

        <div>
          <label>Lender Name</label>
          <input
            type="text"
            value={formData.lender}
            onChange={(e) => setFormData({ ...formData, lender: e.target.value })}
          />
          {errors.lender && <span className="error-text">{errors.lender}</span>}
        </div>
      </div>
    )}

    <div className="btn-group">
      <button onClick={prevStep}>← Back</button>
      <button className="next-btn" onClick={nextStep}>Next →</button>
    </div>
  </div>
);

export default ExistingLoans;
