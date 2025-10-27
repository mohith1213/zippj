import React, { useEffect, useState } from "react";
import AllPopup from "../components/AllPopup";
import "./UnifiedLoanApplication.css";

// Move Field component OUTSIDE the main component
const Field = ({ 
  label, 
  name, 
  type = "text", 
  placeholder, 
  as = "input", 
  options, 
  onChangeOverride, 
  valueOverride, 
  readOnly = false, 
  autoFocus = false,
  formData,
  errors,
  handleFieldChange 
}) => {
  const handleChange = onChangeOverride || handleFieldChange;
  
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={name}>{label}</label>
      {as === "select" ? (
        <select 
          id={name} 
          name={name} 
          value={formData[name] || ""} 
          onChange={handleChange} 
          className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        >
          <option value="">Select</option>
          {options?.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={readOnly && valueOverride !== undefined ? valueOverride : (formData[name] || "")}
          placeholder={placeholder}
          readOnly={readOnly}
          autoFocus={autoFocus}
          onChange={handleChange}
          autoComplete="on"
          className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        />
      )}
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );
};

// Move Section component OUTSIDE as well
const Section = ({ title, children }) => (
  <div className="section-card">
    <h5 className="section-title">{title}</h5>
    <div className="grid-2">{children}</div>
  </div>
);

export default function UnifiedLoanApplication({ onSubmit, initialData }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [infoModal, setInfoModal] = useState({ show: false, title: '', message: '' });
  const [formData, setFormData] = useState({
    // Personal
    fullName: "",
    phone: "",
    email: "",
    address: "",
    dob: "",
    age: "",
    maritalStatus: "",
    gender: "",
    aadharNumber: "",
    panNumber: "",
    passportNumber: "",
    fatherName: "",
    highestQualification: "",
    // Employment
    occupationType: "",
    employer: "",
    designation: "",
    totalExperience: "",
    officeAddress: "",
    // Existing loans
    hasLoans: "",
    existingLoanType: "",
    existingLender: "",
    outstandingAmount: "",
    existingEmi: "",
    tenureRemaining: "",
    // Loan details
    loanType: "",
    amount: "",
    duration: "",
    // Documents
    photograph: "",
    idProof: "",
    addressProof: "",
    cibilReport: "",
    salariedPayslip: "",
    salariedEmploymentProof: "",
    salariedItr: "",
    selfItr: "",
    selfGst: "",
    selfBankStatements: "",
    homeEc: "",
    homeSaleAgreements: "",
    vehicleInvoice: "",
    vehicleQuotation: "",
  });

  // Prefill when editing
  useEffect(() => {
    if (initialData && typeof initialData === 'object') {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  // Persist progress so refresh doesn't lose data
  useEffect(() => {
    try {
      const saved = localStorage.getItem("uc3_unified_form");
      if (saved) {
        const { step: s, formData: fd } = JSON.parse(saved);
        if (fd) setFormData(fd);
        if (s) setStep(s);
      }
    } catch {}
  }, []);

  const computeAge = (dobStr) => {
    if (!dobStr) return '';
    const d = new Date(dobStr);
    if (Number.isNaN(d.getTime())) return '';
    const diff = Date.now() - d.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Prefill personal details from user profile if available and fields are empty
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('userProfile');
      if (storedUser) {
        const profile = JSON.parse(storedUser);
        setFormData((prev) => {
          const next = { ...prev };
          if (!next.fullName && profile.name) next.fullName = profile.name;
          if (!next.phone && profile.phone) next.phone = profile.phone;
          if (!next.email && profile.email) next.email = profile.email;
          if (!next.dob && profile.dob) {
            next.dob = profile.dob;
            next.age = computeAge(profile.dob).toString();
          }
          return next;
        });
      }
    } catch {}
  }, []);

  // Universal change handler for all form fields
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDobChange = (e) => {
    const value = e.target.value;
    const computedAge = computeAge(value);
    
    setFormData(prev => ({ 
      ...prev, 
      dob: value, 
      age: computedAge.toString()
    }));
  };

  const handleOccupationChange = (e) => {
    const value = e.target.value;
    setFormData(prev => {
      const newData = { ...prev, occupationType: value };
      
      // Clear employer field for self-employed
      if (value === "Self-Employed") {
        newData.employer = "";
      }
      
      return newData;
    });
  };

  const handleHasLoansChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, hasLoans: value }));
  };

  const handleLoanTypeChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, loanType: value }));
  };

  useEffect(() => {
    localStorage.setItem("uc3_unified_form", JSON.stringify({ step, formData }));
  }, [step, formData]);

  const steps = [
    "Personal Details",
    "Employee Details", 
    "Loan Details",
    "Existing Loan Details",
    "Documents",
    "Review",
  ];

  const validateStep = (data) => {
    const d = data ?? formData;
    const e = {};
    switch (step) {
      case 1:
        if (!d.fullName) e.fullName = "Required";
        if (!d.phone) e.phone = "Required";
        if (!d.email) e.email = "Required";
        if (!d.address) e.address = "Required";
        if (!d.maritalStatus) e.maritalStatus = "Required";
        if (!d.gender) e.gender = "Required";
        if (!d.dob) e.dob = "Required";
        if (!d.aadharNumber) e.aadharNumber = "Required";
        if (!d.panNumber) e.panNumber = "Required";
        if (!d.fatherName) e.fatherName = "Required";
        if (!d.highestQualification) e.highestQualification = "Required";
        break;
      case 2:
        if (!d.occupationType) e.occupationType = "Required";
        // Only require employer for salaried employees
        if (d.occupationType === "Salaried" && !d.employer) e.employer = "Required";
        if (!d.designation) e.designation = "Required";
        if (!d.totalExperience) e.totalExperience = "Required";
        if (!d.officeAddress) e.officeAddress = "Required";
        break;
      case 3:
        if (!d.loanType) e.loanType = "Required";
        if (!d.amount) e.amount = "Required";
        if (!d.duration) e.duration = "Required";
        break;
      case 4:
        if (!d.hasLoans) e.hasLoans = "Required";
        if (d.hasLoans === "Yes") {
          if (!d.existingLoanType) e.existingLoanType = "Required";
          if (!d.existingLender) e.existingLender = "Required";
          if (!d.outstandingAmount) e.outstandingAmount = "Required";
          if (!d.existingEmi) e.existingEmi = "Required";
          if (!d.tenureRemaining) e.tenureRemaining = "Required";
        }
        break;
      default:
        break;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(6, s + 1));
  };

  const prevStep = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  const Documents = () => (
    <div className="section-card">
      <h5 className="section-title">Documents Upload</h5>
      <div className="grid-2">
        {/* Common documents */}
        <div className="form-field">
          <label className="form-label">Photograph</label>
          <input name="photograph" type="file" className="form-control" />
        </div>
        <div className="form-field">
          <label className="form-label">ID Proof</label>
          <input name="idProof" type="file" className="form-control" />
        </div>
        <div className="form-field">
          <label className="form-label">Address Proof</label>
          <input name="addressProof" type="file" className="form-control" />
        </div>
        <div className="form-field">
          <label className="form-label">CIBIL Report</label>
          <input name="cibilReport" type="file" className="form-control" />
        </div>

        {/* Conditional document fields based on occupation and loan type */}
        {formData.occupationType === "Salaried" && (
          <>
            <div className="form-field">
              <label className="form-label">Payslip</label>
              <input name="salariedPayslip" type="file" className="form-control" />
            </div>
            <div className="form-field">
              <label className="form-label">Employment Proof</label>
              <input name="salariedEmploymentProof" type="file" className="form-control" />
            </div>
            <div className="form-field">
              <label className="form-label">ITR (Salaried)</label>
              <input name="salariedItr" type="file" className="form-control" />
            </div>
          </>
        )}

        {formData.occupationType === "Self-Employed" && (
          <>
            <div className="form-field">
              <label className="form-label">ITR (Self-Employed)</label>
              <input name="selfItr" type="file" className="form-control" />
            </div>
            <div className="form-field">
              <label className="form-label">GST Registration</label>
              <input name="selfGst" type="file" className="form-control" />
            </div>
            <div className="form-field">
              <label className="form-label">Bank Statements (3-6 months)</label>
              <input name="selfBankStatements" type="file" className="form-control" />
            </div>
          </>
        )}

        {formData.loanType === "Home Loan" && (
          <>
            <div className="form-field">
              <label className="form-label">Encumbrance Certificate</label>
              <input name="homeEc" type="file" className="form-control" />
            </div>
            <div className="form-field">
              <label className="form-label">Sale Agreements</label>
              <input name="homeSaleAgreements" type="file" className="form-control" />
            </div>
          </>
        )}

        {formData.loanType === "Vehicle Loan" && (
          <>
            <div className="form-field">
              <label className="form-label">Vehicle Invoice</label>
              <input name="vehicleInvoice" type="file" className="form-control" />
            </div>
            <div className="form-field">
              <label className="form-label">Vehicle Quotation</label>
              <input name="vehicleQuotation" type="file" className="form-control" />
            </div>
          </>
        )}
      </div>
    </div>
  );

  const Review = () => (
    <div className="section-card">
      <h5 className="section-title">Review & Submit</h5>
      <div className="review-grid">
        {Object.entries(formData)
          .filter(([k, v]) => {
            // Filter out empty fields and occupation-specific fields
            if (!v) return false;
            if (formData.occupationType === "Self-Employed" && k === "employer") return false;
            return true;
          })
          .map(([k, v]) => (
            <div key={k} className="review-item">
              <span className="review-key">{k.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
              <span className="review-value">{String(v)}</span>
            </div>
          ))}
      </div>
      <div className="submit-area">
        <button
          className="btn btn-primary-custom"
          type="button"
          onClick={handleFinalSubmit}
        >
          Submit Application
        </button>
      </div>
    </div>
  );

  const handleFinalSubmit = () => {
    const newApp = {
      ...formData,
      loanType: formData.loanType || 'Personal Loan',
      amount: formData.amount ? Number(formData.amount) : 0,
      tenure: formData.duration ? Number(formData.duration) : 0,
      employmentType: formData.occupationType || '',
      purpose: '',
      status: 'Pending',
      appliedDate: new Date().toLocaleDateString('en-IN'),
      remarks: 'Application submitted and pending initial review',
      id: Date.now()
    };
    
    try { 
      localStorage.removeItem('uc3_unified_form'); 
    } catch {}
    
    if (typeof onSubmit === 'function') {
      onSubmit(newApp);
    } else {
      setInfoModal({ show: true, title: 'Submission', message: 'Application submitted successfully!' });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Section title="Basic Information">
              <Field 
                label="Full name" 
                name="fullName" 
                autoFocus 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label="Phone number" 
                name="phone" 
                type="tel" 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label="Email" 
                name="email" 
                type="email" 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label="Home address" 
                name="address" 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label="Marital status" 
                name="maritalStatus" 
                as="select" 
                options={["Single", "Married", "Divorced", "Widowed"]} 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label="Gender" 
                name="gender" 
                as="select" 
                options={["Male", "Female", "Other"]} 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label="DOB" 
                name="dob" 
                type="date" 
                onChangeOverride={handleDobChange} 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label="Age (auto)" 
                name="age" 
                type="number" 
                valueOverride={formData.age} 
                readOnly 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label="Aadhar number" 
                name="aadharNumber" 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label="PAN number" 
                name="panNumber" 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label="Passport number (optional)" 
                name="passportNumber" 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label="Father name" 
                name="fatherName" 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label="Highest Qualification" 
                name="highestQualification" 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
            </Section>
          </>
        );
      case 2:
        return (
          <>
            <Section title="Employment Details">
              <Field 
                label="Occupation type" 
                name="occupationType" 
                as="select" 
                options={["Salaried", "Self-Employed"]} 
                autoFocus 
                onChangeOverride={handleOccupationChange} 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              
              {/* Conditionally render employer field only for salaried employees */}
              {formData.occupationType === "Salaried" && (
                <Field 
                  label="Employer" 
                  name="employer" 
                  formData={formData}
                  errors={errors}
                  handleFieldChange={handleFieldChange}
                />
              )}
              
              {/* Show business name for self-employed instead */}
              {formData.occupationType === "Self-Employed" && (
                <Field 
                  label="Business Name" 
                  name="employer" 
                  placeholder="Enter your business name"
                  formData={formData}
                  errors={errors}
                  handleFieldChange={handleFieldChange}
                />
              )}
              
              <Field 
                label={formData.occupationType === "Self-Employed" ? "Job Title / Role" : "Designation"} 
                name="designation" 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label="Total work experience (years)" 
                name="totalExperience" 
                type="number"
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label={formData.occupationType === "Self-Employed" ? "Business Address" : "Office Address"} 
                name="officeAddress" 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
            </Section>
          </>
        );
      case 3:
        return (
          <>
            <Section title="Loan Details">
              <Field 
                label="Loan type" 
                name="loanType" 
                as="select" 
                options={["Personal Loan", "Vehicle Loan", "Home Loan"]} 
                autoFocus 
                onChangeOverride={handleLoanTypeChange} 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label="Loan amount (₹)" 
                name="amount" 
                type="number" 
                placeholder="e.g., 500000"
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              <Field 
                label="Loan duration (months)" 
                name="duration" 
                type="number" 
                placeholder="e.g., 60"
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
            </Section>
          </>
        );
      case 4:
        return (
          <>
            <Section title="Existing Loan Details">
              <Field 
                label="Do you have existing loans?" 
                name="hasLoans" 
                as="select" 
                options={["No", "Yes"]} 
                autoFocus 
                onChangeOverride={handleHasLoansChange} 
                formData={formData}
                errors={errors}
                handleFieldChange={handleFieldChange}
              />
              {formData.hasLoans === "Yes" && (
                <>
                  <Field 
                    label="Existing loan type" 
                    name="existingLoanType" 
                    placeholder="e.g., Personal Loan, Car Loan"
                    formData={formData}
                    errors={errors}
                    handleFieldChange={handleFieldChange}
                  />
                  <Field 
                    label="Lender name" 
                    name="existingLender" 
                    placeholder="e.g., HDFC Bank"
                    formData={formData}
                    errors={errors}
                    handleFieldChange={handleFieldChange}
                  />
                  <Field 
                    label="Outstanding amount (₹)" 
                    name="outstandingAmount" 
                    type="number" 
                    placeholder="e.g., 200000"
                    formData={formData}
                    errors={errors}
                    handleFieldChange={handleFieldChange}
                  />
                  <Field 
                    label="Monthly EMI (₹)" 
                    name="existingEmi" 
                    type="number" 
                    placeholder="e.g., 15000"
                    formData={formData}
                    errors={errors}
                    handleFieldChange={handleFieldChange}
                  />
                  <Field 
                    label="Tenure remaining (months)" 
                    name="tenureRemaining" 
                    type="number" 
                    placeholder="e.g., 24"
                    formData={formData}
                    errors={errors}
                    handleFieldChange={handleFieldChange}
                  />
                </>
              )}
            </Section>
          </>
        );
      case 5:
        return <Documents />;
      case 6:
        return <Review />;
      default:
        return null;
    }
  };

  return (
    <div className="uc3-app">
      <div className="uc3-container">
        <h2 className="uc3-title">Loan Application</h2>

        <div className="steps steps-inline">
          {steps.map((t, i) => (
            <React.Fragment key={t}>
              <div className={`step-item ${step === i + 1 ? "active" : ""} ${step > i + 1 ? "completed" : ""}`}>
                <div className="step-circle">{i + 1}</div>
                <div className="step-label">{t}</div>
              </div>
              {i < steps.length - 1 && (
                <div className={`step-connector ${step > i + 1 ? 'completed' : ''}`} aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          if (step < 6) {
            nextStep();
          } else {
            handleFinalSubmit();
          }
        }}>
          {renderStep()}
          <div className="nav-actions">
            <button className="btn btn-primary-custom nav-back" type="button" onClick={prevStep} disabled={step === 1}>Previous</button>
            <button className="btn btn-primary-custom nav-next" type="submit">{step < 6 ? 'Next' : 'Finish'}</button>
          </div>
        </form>
      </div>
        <AllPopup
          show={infoModal.show}
          title={infoModal.title}
          message={infoModal.message}
          onClose={() => setInfoModal({ ...infoModal, show: false })}
        />
    </div>
  );
}
