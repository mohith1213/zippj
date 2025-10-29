import React from "react";
import "./LoanForm.css";

const LoanDetails = ({ formData, setFormData, nextStep, prevStep, errors }) => (
  <div className="form-container">
    <h2>Loan Details</h2>
    <p>Specify your loan requirements</p>

    <div className="form-grid">
      <div>
        <label>Loan Amount</label>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        {errors.amount && <span className="error-text">{errors.amount}</span>}
      </div>

      <div>
        <label>Loan Term (years)</label>
        <input
          type="number"
          value={formData.term}
          onChange={(e) => setFormData({ ...formData, term: e.target.value })}
        />
        {errors.term && <span className="error-text">{errors.term}</span>}
      </div>

      <div>
        <label>Loan Purpose</label>
        <input
          type="text"
          value={formData.purpose}
          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
        />
        {errors.purpose && <span className="error-text">{errors.purpose}</span>}
      </div>

      <div>
        <label>Property Value (Optional)</label>
        <input
          type="number"
          value={formData.property}
          onChange={(e) => setFormData({ ...formData, property: e.target.value })}
        />
      </div>

      <div>
        <label>Down Payment (Optional)</label>
        <input
          type="number"
          value={formData.downPayment}
          onChange={(e) => setFormData({ ...formData, downPayment: e.target.value })}
        />
      </div>
    </div>

    <div className="btn-group">
      <button onClick={prevStep}>← Back</button>
      <button className="next-btn" onClick={nextStep}>Next →</button>
    </div>
  </div>
);

export default LoanDetails;
