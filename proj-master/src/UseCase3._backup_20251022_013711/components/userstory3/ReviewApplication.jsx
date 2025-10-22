import React from "react";
import "./LoanForm.css";

const ReviewApplication = ({ formData, prevStep }) => {

  const handleSubmit = () => {
    // Simple validation check before submission
    if (window.confirm("Do you want to submit your application?")) {
      alert("Form submitted successfully!");
      // In a real app, you’d send this data to a backend API here
      window.location.reload(); // resets form & returns to start
    }
  };

  return (
    <div className="form-container">
      <h2>Review Your Application</h2>
      <p>Please review your information before submitting</p>

      {/* ================= Personal Info Section ================= */}
      <div className="review-section">
        <h3>Personal Information</h3>
        <hr />
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>Date of Birth:</strong> {formData.dob}</p>
        <p><strong>Age:</strong> {formData.age}</p>
        <p><strong>Marital Status:</strong> {formData.maritalStatus}</p>
        <p><strong>Gender:</strong> {formData.gender}</p>
        <p><strong>Aadhar Number:</strong> {formData.aadharNumber}</p>
        <p><strong>PAN Number:</strong> {formData.panNumber}</p>
        {formData.passportNumber && (
          <p><strong>Passport Number:</strong> {formData.passportNumber}</p>
        )}
        <p><strong>Father’s Name:</strong> {formData.fatherName}</p>
        <p><strong>Highest Qualification:</strong> {formData.highestQualification}</p>
      </div>

      {/* ================= Employment Info Section ================= */}
      <div className="review-section">
        <h3>Employment Information</h3>
        <hr />
        <p><strong>Status:</strong> {formData.status}</p>
        <p><strong>Employer:</strong> {formData.employer}</p>
        <p><strong>Job Title:</strong> {formData.jobTitle}</p>
        <p><strong>Annual Income:</strong> ₹{formData.income}</p>
        <p><strong>Years at Employer:</strong> {formData.yearsAtEmployer}</p>
      </div>

      {/* ================= Existing Loans Section ================= */}
      <div className="review-section">
        <h3>Existing Loans</h3>
        <hr />
        <p><strong>Do you have loans?</strong> {formData.hasLoans}</p>
        {formData.hasLoans === "Yes" && (
          <>
            <p><strong>Loan Type:</strong> {formData.loanType}</p>
            <p><strong>Monthly Payment:</strong> ₹{formData.payment}</p>
            <p><strong>Outstanding Balance:</strong> ₹{formData.balance}</p>
            <p><strong>Lender Name:</strong> {formData.lender}</p>
          </>
        )}
      </div>

      {/* ================= Loan Details Section ================= */}
      <div className="review-section">
        <h3>Loan Details</h3>
        <hr />
        <p><strong>Amount:</strong> ₹{formData.amount}</p>
        <p><strong>Term:</strong> {formData.term} years</p>
        <p><strong>Purpose:</strong> {formData.purpose}</p>
        {formData.property && <p><strong>Property Value:</strong> ₹{formData.property}</p>}
        {formData.downPayment && <p><strong>Down Payment:</strong> ₹{formData.downPayment}</p>}
      </div>

      {/* ================= Buttons ================= */}
      <div className="btn-group">
        <button onClick={prevStep}>← Back</button>
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Application
        </button>
      </div>
    </div>
  );
};

export default ReviewApplication;
