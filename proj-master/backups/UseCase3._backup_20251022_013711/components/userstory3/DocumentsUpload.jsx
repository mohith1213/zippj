import React from "react";
import "./LoanForm.css";

const DocumentsUpload = ({ nextStep, prevStep }) => (
  <div className="form-container">
    <h2>Upload Documents</h2>
    <p>Please upload supporting documents for your application</p>

    <div className="upload-box">
      <input type="file" multiple required />
      <p>Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 20MB per file)</p>
    </div>

    <ul className="doc-list">
      <li>Government-issued ID (Driver’s License, Passport)</li>
      <li>Recent pay slips (last 2–3 months)</li>
      <li>Bank statements (last 3 months)</li>
      <li>Employment Proof(ID card/ Offer letter/ HR letter)</li>
      <li>Sale Agreement, EC(Home Loan)</li>
      <li>Invoice, Quotation(Vehicle Loan)</li>
    </ul>

    <div className="btn-group">
      <button onClick={prevStep}>← Back</button>
      <button className="next-btn" onClick={nextStep}>Next →</button>
    </div>
  </div>
);

export default DocumentsUpload;
