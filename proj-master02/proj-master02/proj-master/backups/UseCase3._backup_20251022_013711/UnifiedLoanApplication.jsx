import React, { useEffect, useState, useCallback, useRef } from "react";
import "./UnifiedLoanApplication.css";

export default function UnifiedLoanApplication() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const formEl = useRef(null);
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
    status: "",
    employer: "",
    jobTitle: "",
    income: "",
    yearsAtEmployer: "",
    // Existing loans
    hasLoans: "",
    loanType: "",
    payment: "",
    balance: "",
    lender: "",
    // Loan details
    amount: "",
    term: "",
    purpose: "",
    property: "",
    downPayment: "",
  });

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

  const handleDobChange = useCallback((e) => {
    const value = e.currentTarget.value;
    setFormData((prev) => ({ ...prev, dob: value, age: computeAge(value) }));
  }, []);

  useEffect(() => {
    localStorage.setItem("uc3_unified_form", JSON.stringify({ step, formData }));
  }, [step, formData]);

  const steps = [
    "Personal Info",
    "Employment",
    "Existing Loans",
    "Documents",
    "Loan Details",
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
        if (!d.dob) e.dob = "Required";
        if (!d.maritalStatus) e.maritalStatus = "Required";
        if (!d.gender) e.gender = "Required";
        if (!d.aadharNumber) e.aadharNumber = "Required";
        if (!d.panNumber) e.panNumber = "Required";
        if (!d.fatherName) e.fatherName = "Required";
        if (!d.highestQualification) e.highestQualification = "Required";
        break;
      case 2:
        if (!d.status) e.status = "Required";
        if (!d.employer) e.employer = "Required";
        if (!d.jobTitle) e.jobTitle = "Required";
        if (!d.income) e.income = "Required";
        if (!d.yearsAtEmployer) e.yearsAtEmployer = "Required";
        break;
      case 3:
        if (!d.hasLoans) e.hasLoans = "Required";
        if (d.hasLoans === "Yes") {
          if (!d.loanType) e.loanType = "Required";
          if (!d.payment) e.payment = "Required";
          if (!d.balance) e.balance = "Required";
          if (!d.lender) e.lender = "Required";
        }
        break;
      case 5:
        if (!d.amount) e.amount = "Required";
        if (!d.term) e.term = "Required";
        if (!d.purpose) e.purpose = "Required";
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

  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const syncFromForm = useCallback(() => {
    if (!formEl.current) return {};
    const fd = new FormData(formEl.current);
    const obj = {};
    for (const [k, v] of fd.entries()) obj[k] = v;
    setFormData((d) => ({ ...d, ...obj }));
    return obj;
  }, []);


  const Field = React.memo(({ label, name, type = "text", placeholder, as = "input", options, onChangeOverride, valueOverride, readOnly = false, autoFocus = false }) => (
    <div className="form-field">
      <label className="form-label" htmlFor={name}>{label}</label>
      {as === "select" ? (
        <select id={name} name={name} defaultValue={formData[name] ?? ""} className={`form-control ${errors[name] ? "is-invalid" : ""}`}>
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
          defaultValue={valueOverride !== undefined ? valueOverride : (formData[name] ?? "")}
          placeholder={placeholder}
          readOnly={readOnly}
          autoFocus={autoFocus}
          onChange={onChangeOverride}
          autoComplete="on"
          className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        />
      )}
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  ));

  const Section = ({ title, children }) => (
    <div className="section-card">
      <h5 className="section-title">{title}</h5>
      <div className="grid-2">{children}</div>
    </div>
  );

  const Documents = () => (
    <div className="section-card">
      <h5 className="section-title">Documents Upload</h5>
      <div className="grid-2">
        <div className="form-field">
          <label className="form-label">Aadhar Card</label>
          <input type="file" className="form-control" />
        </div>
        <div className="form-field">
          <label className="form-label">PAN Card</label>
          <input type="file" className="form-control" />
        </div>
        <div className="form-field">
          <label className="form-label">Salary Slip (Last 3 Months)</label>
          <input type="file" className="form-control" />
        </div>
        <div className="form-field">
          <label className="form-label">Bank Statement (Last 6 Months)</label>
          <input type="file" className="form-control" />
        </div>
      </div>
    </div>
  );

  const Review = () => (
    <div className="section-card">
      <h5 className="section-title">Review & Submit</h5>
      <div className="review-grid">
        {Object.entries(formData).map(([k, v]) => (
          <div key={k} className="review-item">
            <span className="review-key">{k}</span>
            <span className="review-value">{String(v || "-")}</span>
          </div>
        ))}
      </div>
      <div className="submit-area">
        <button className="btn btn-primary-custom" type="button" onClick={() => alert("Application submitted!")}>Submit Application</button>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Section title="Basic Information">
              <Field label="Full Name" name="fullName" autoFocus />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Email" name="email" type="email" />
              <Field label="Address" name="address" />
              <Field label="Date of Birth" name="dob" type="date" onChangeOverride={handleDobChange} />
              <Field label="Age" name="age" type="number" valueOverride={formData.age ?? ''} readOnly />
              <Field label="Marital Status" name="maritalStatus" as="select" options={["Single", "Married", "Divorced", "Widowed"]} />
              <Field label="Gender" name="gender" as="select" options={["Male", "Female", "Other"]} />
              <Field label="Aadhar Number" name="aadharNumber" />
              <Field label="PAN Number" name="panNumber" />
              <Field label="Passport Number" name="passportNumber" />
              <Field label="Father's Name" name="fatherName" />
              <Field label="Highest Qualification" name="highestQualification" />
            </Section>
          </>
        );
      case 2:
        return (
          <>
            <Section title="Employment Details">
              <Field label="Employment Status" name="status" as="select" options={["Salaried", "Self-Employed", "Student", "Unemployed"]} autoFocus />
              <Field label="Employer" name="employer" />
              <Field label="Job Title" name="jobTitle" />
              <Field label="Monthly Income (₹)" name="income" type="number" />
              <Field label="Years at Employer" name="yearsAtEmployer" type="number" />
            </Section>
          </>
        );
      case 3:
        return (
          <>
            <Section title="Existing Loans">
              <Field label="Do you have existing loans?" name="hasLoans" as="select" options={["No", "Yes"]} autoFocus />
              {formData.hasLoans === "Yes" && (
                <>
                  <Field label="Loan Type" name="loanType" />
                  <Field label="Monthly Payment (₹)" name="payment" type="number" />
                  <Field label="Outstanding Balance (₹)" name="balance" type="number" />
                  <Field label="Lender" name="lender" />
                </>
              )}
            </Section>
          </>
        );
      case 4:
        return <Documents />;
      case 5:
        return (
          <>
            <Section title="Loan Details">
              <Field label="Requested Amount (₹)" name="amount" type="number" autoFocus />
              <Field label="Term (months)" name="term" type="number" />
              <Field label="Purpose" name="purpose" />
              <Field label="Property" name="property" />
              <Field label="Down Payment (₹)" name="downPayment" type="number" />
            </Section>
          </>
        );
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

        <form ref={formEl} onSubmit={(e) => {
          e.preventDefault();
          const latest = syncFromForm();
          const data = { ...formData, ...latest };
          if (validateStep(data)) {
            if (step < 6) setStep((s) => Math.min(6, s + 1));
            else alert("Submitted successfully!");
          }
        }}>
          {renderStep()}
          <div className="nav-actions">
            <button className="btn btn-primary-custom nav-back" type="button" onClick={prevStep} disabled={step === 1}>Previous</button>
            <button className="btn btn-primary-custom nav-next" type="submit">{step < 6 ? 'Next' : 'Finish'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
