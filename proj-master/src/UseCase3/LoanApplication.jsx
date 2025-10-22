import React from "react";
import UnifiedLoanApplication from "./UnifiedLoanApplication";

export default function LoanApplication() {
  return <UnifiedLoanApplication />;
}
/* 

  const validateStep = () => {
    const e = {};
    switch (step) {
      case 1:
        if (!formData.fullName) e.fullName = "Required";
        if (!formData.phone) e.phone = "Required";
        if (!formData.email) e.email = "Required";
        if (!formData.address) e.address = "Required";
        if (!formData.dob) e.dob = "Required";
        if (!formData.maritalStatus) e.maritalStatus = "Required";
        if (!formData.gender) e.gender = "Required";
        if (!formData.aadharNumber) e.aadharNumber = "Required";
        if (!formData.panNumber) e.panNumber = "Required";
        if (!formData.fatherName) e.fatherName = "Required";
        if (!formData.highestQualification) e.highestQualification = "Required";
        break;
      case 2:
        if (!formData.status) e.status = "Required";
        if (!formData.employer) e.employer = "Required";
        if (!formData.jobTitle) e.jobTitle = "Required";
        if (!formData.income) e.income = "Required";
        if (!formData.yearsAtEmployer) e.yearsAtEmployer = "Required";
        break;
      case 3:
        if (!formData.hasLoans) e.hasLoans = "Required";
        if (formData.hasLoans === "Yes") {
          if (!formData.loanType) e.loanType = "Required";
          if (!formData.payment) e.payment = "Required";
          if (!formData.balance) e.balance = "Required";
          if (!formData.lender) e.lender = "Required";
        }
        break;
      case 5:
        if (!formData.amount) e.amount = "Required";
        if (!formData.term) e.term = "Required";
        if (!formData.purpose) e.purpose = "Required";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
  };

  const Field = ({ label, name, type = "text", placeholder, as = "input", options }) => (
    <div className="form-field">
      <label className="form-label" htmlFor={name}>{label}</label>
      {as === "select" ? (
        <select id={name} name={name} value={formData[name]} onChange={handleChange} className={`form-control ${errors[name] ? "is-invalid" : ""}`}>
          <option value="">Select</option>
          {options?.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input id={name} name={name} type={type} value={formData[name]} onChange={handleChange} placeholder={placeholder} className={`form-control ${errors[name] ? "is-invalid" : ""}`} />
      )}
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

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
        <button className="btn btn-primary" type="button" onClick={() => alert("Application submitted!")}>Submit Application</button>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Section title="Basic Information">
              <Field label="Full Name" name="fullName" />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Email" name="email" type="email" />
              <Field label="Address" name="address" />
              <Field label="Date of Birth" name="dob" type="date" />
              <Field label="Age" name="age" type="number" />
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
              <Field label="Employment Status" name="status" as="select" options={["Salaried", "Self-Employed", "Student", "Unemployed"]} />
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
              <Field label="Do you have existing loans?" name="hasLoans" as="select" options={["No", "Yes"]} />
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
              <Field label="Requested Amount (₹)" name="amount" type="number" />
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

        <div className="steps">
          {steps.map((t, i) => (
            <div key={t} className={`step ${step === i + 1 ? "active" : ""} ${step > i + 1 ? "completed" : ""}`}>
              <div className="num">{i + 1}</div>
              <div className="label">{t}</div>
            </div>
          ))}
        </div>

        {renderStep()}

        <div className="nav-actions">
          <button className="btn btn-outline-primary" type="button" onClick={prevStep} disabled={step === 1}>Back</button>
          {step < 6 ? (
            <button className="btn btn-primary" type="button" onClick={nextStep}>Next</button>
          ) : (
            <button className="btn btn-success" type="button" onClick={() => alert("Submitted successfully!")}>Finish</button>
          )}
        </div>
      </div>
    </div>
  );
}
        <label className="form-label">Address</label>
        <textarea className={`form-control ${errors.address ? 'is-invalid' : ''}`} name="address" rows={1} defaultValue={form.address ?? ''} onBlur={handleBlur} tabIndex={4} />
        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
      </div>

      <div className="col-md-3">
        <label className="form-label">Date of Birth</label>
        <input type="date" name="dob" className={`form-control ${errors.dob ? 'is-invalid' : ''}`} value={form.dob} onChange={handleChange} tabIndex={5} />
        {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
      </div>
      <div className="col-md-3">
        <label className="form-label">Age</label>
        <input className="form-control" value={form.age} readOnly tabIndex={-1} />
      </div>
      <div className="col-md-3">
        <label className="form-label">Gender</label>
        <select name="gender" className={`form-select ${errors.gender ? 'is-invalid' : ''}`} value={form.gender} onChange={handleChange} tabIndex={6}>
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
      </div>
      <div className="col-md-3">
        <label className="form-label">Marital Status</label>
        <select name="maritalStatus" className={`form-select ${errors.maritalStatus ? 'is-invalid' : ''}`} value={form.maritalStatus} onChange={handleChange} tabIndex={7}>
          <option value="">Select</option>
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
        </select>
        {errors.maritalStatus && <div className="invalid-feedback">{errors.maritalStatus}</div>}
      </div>

      <div className="col-md-6">
        <label className="form-label">Aadhar Number</label>
        <input type="text" className={`form-control ${errors.aadharNumber ? 'is-invalid' : ''}`} name="aadharNumber" defaultValue={form.aadharNumber ?? ''} onBlur={handleBlur} tabIndex={8} />
        {errors.aadharNumber && <div className="invalid-feedback">{errors.aadharNumber}</div>}
      </div>
      <div className="col-md-6">
        <label className="form-label">PAN Number</label>
        <input type="text" className={`form-control ${errors.panNumber ? 'is-invalid' : ''}`} name="panNumber" defaultValue={form.panNumber ?? ''} onBlur={handleBlur} tabIndex={9} />
        {errors.panNumber && <div className="invalid-feedback">{errors.panNumber}</div>}
      </div>

      <div className="col-md-6">
        <label className="form-label">Passport Number</label>
        <input type="text" className={`form-control ${errors.passportNumber ? 'is-invalid' : ''}`} name="passportNumber" defaultValue={form.passportNumber ?? ''} onBlur={handleBlur} tabIndex={10} />
        {errors.passportNumber && <div className="invalid-feedback">{errors.passportNumber}</div>}
      </div>
      <div className="col-md-6">
        <label className="form-label">Father Name</label>
        <input type="text" className={`form-control ${errors.fatherName ? 'is-invalid' : ''}`} name="fatherName" defaultValue={form.fatherName ?? ''} onBlur={handleBlur} tabIndex={11} />
        {errors.fatherName && <div className="invalid-feedback">{errors.fatherName}</div>}
      </div>

      <div className="col-md-6">
        <label className="form-label">Highest Qualification</label>
        <input type="text" className={`form-control ${errors.highestQualification ? 'is-invalid' : ''}`} name="highestQualification" defaultValue={form.highestQualification ?? ''} onBlur={handleBlur} tabIndex={12} />
        {errors.highestQualification && <div className="invalid-feedback">{errors.highestQualification}</div>}
      </div>
    </div>
  );

  const StepEmployment = () => (
    <div className="row g-3">
      <div className="col-md-12">
        <label className="form-label">Occupation Type</label>
        <div className="d-flex gap-3">
          {['Salaried','Self-Employed','Business'].map((t) => (
            <label key={t} className="form-check">
              <input type="radio" className="form-check-input" name="occupationType" value={t} checked={form.occupationType === t} onChange={handleChange} /> {t}
            </label>
          ))}
        </div>
        {errors.occupationType && <div className="text-danger small mt-1">{errors.occupationType}</div>}
      </div>
      <div className="col-md-6">
        <label className="form-label">Employer</label>
        <input type="text" className={`form-control ${errors.employer ? 'is-invalid' : ''}`} name="employer" defaultValue={form.employer ?? ''} onBlur={handleBlur} tabIndex={21} />
        {errors.employer && <div className="invalid-feedback">{errors.employer}</div>}
      </div>
      <div className="col-md-6">
        <label className="form-label">Designation</label>
        <input type="text" className={`form-control ${errors.designation ? 'is-invalid' : ''}`} name="designation" defaultValue={form.designation ?? ''} onBlur={handleBlur} tabIndex={22} />
        {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
      </div>
      <div className="col-md-6">
        <label className="form-label">Experience</label>
        <input type="text" className={`form-control ${errors.experience ? 'is-invalid' : ''}`} name="experience" defaultValue={form.experience ?? ''} onBlur={handleBlur} tabIndex={23} />
        {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
      </div>
      <div className="col-md-6">
        <label className="form-label">Office Address</label>
        <input type="text" className={`form-control ${errors.officeAddress ? 'is-invalid' : ''}`} name="officeAddress" defaultValue={form.officeAddress ?? ''} onBlur={handleBlur} tabIndex={24} />
        {errors.officeAddress && <div className="invalid-feedback">{errors.officeAddress}</div>}
      </div>
    </div>
  );

  const StepExistingLoans = () => (
    <div className="row g-3">
      <div className="col-12">
        <div className="form-check">
          <input id="hasExistingLoan" name="hasExistingLoan" className="form-check-input" type="checkbox" checked={!!form.hasExistingLoan} onChange={handleChange} />
          <label className="form-check-label" htmlFor="hasExistingLoan">Has existing loan</label>
        </div>
      </div>
      {form.hasExistingLoan && (
        <>
          {['existingLoanType','lender','outstandingAmount','existingEmi','tenureRemaining'].map((f) => (
            <div className="col-md-6" key={f}>
              <label className="form-label">{f.replace(/([A-Z])/g,' $1')}</label>
              <input type="text" className={`form-control ${errors[f] ? 'is-invalid' : ''}`} name={f} defaultValue={form[f] ?? ''} onBlur={handleBlur} />
              {errors[f] && <div className="invalid-feedback">{errors[f]}</div>}
            </div>
          ))}
        </>
      )}
    </div>
  );

  const StepDocuments = () => (
    <div>
      <div className="document-upload mb-4 text-center p-4 border rounded" onClick={simulateUpload} style={{cursor:'pointer'}}>
        <i className="bi bi-cloud-upload" style={{fontSize:'2rem'}}></i>
        <p className="mt-2 mb-0">Click to simulate upload required documents</p>
      </div>
      {errors.documents && <div className="text-danger mb-3">{errors.documents}</div>}
      {form.documents?.length > 0 && (
        <div className="list-group">
          {form.documents.map((d, idx) => (
            <div key={idx} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <i className="bi bi-file-earmark text-primary me-2"></i>
                <strong>{d.name}</strong>
                <small className="text-muted d-block">{d.type} • {d.size}</small>
              </div>
              <i className="bi bi-check-circle text-success"></i>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const StepLoanDetails = () => (
    <div className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Loan Type</label>
        <select name="loanType" className={`form-select ${errors.loanType ? 'is-invalid' : ''}`} value={form.loanType} onChange={handleChange}>
          <option>Personal Loan</option>
          <option>Vehicle Loan</option>
          <option>Home Loan</option>
        </select>
        {errors.loanType && <div className="invalid-feedback">{errors.loanType}</div>}
      </div>
      <div className="col-md-6">
        <label className="form-label">Employment Type</label>
        <select name="employmentType" className={`form-select ${errors.employmentType ? 'is-invalid' : ''}`} value={form.employmentType} onChange={handleChange}>
          <option>Salaried</option>
          <option>Self-Employed</option>
          <option>Student</option>
          <option>Other</option>
        </select>
        {errors.employmentType && <div className="invalid-feedback">{errors.employmentType}</div>}
      </div>
      <div className="col-md-4">
        <label className="form-label">Amount (₹)</label>
        <input type="number" name="amount" className={`form-control ${errors.amount ? 'is-invalid' : ''}`} defaultValue={form.amount ?? ''} onBlur={handleBlur} min="10000" step="1000" placeholder="e.g. 500000" />
        {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
      </div>
      <div className="col-md-4">
        <label className="form-label">Tenure (months)</label>
        <input type="number" name="tenure" className={`form-control ${errors.tenure ? 'is-invalid' : ''}`} defaultValue={form.tenure ?? ''} onBlur={handleBlur} min="6" step="1" placeholder="e.g. 36" />
        {errors.tenure && <div className="invalid-feedback">{errors.tenure}</div>}
      </div>
      <div className="col-md-4">
        <label className="form-label">Monthly Income (₹)</label>
        <input type="number" name="monthlyIncome" className={`form-control ${errors.monthlyIncome ? 'is-invalid' : ''}`} defaultValue={form.monthlyIncome ?? ''} onBlur={handleBlur} min="0" step="500" placeholder="e.g. 75000" />
        {errors.monthlyIncome && <div className="invalid-feedback">{errors.monthlyIncome}</div>}
      </div>
      <div className="col-12">
        <label className="form-label">Purpose</label>
        <textarea name="purpose" className={`form-control ${errors.purpose ? 'is-invalid' : ''}`} rows={3} defaultValue={form.purpose} onBlur={handleBlur} placeholder="Briefly describe the purpose of the loan" />
        {errors.purpose && <div className="invalid-feedback">{errors.purpose}</div>}
      </div>
    </div>
  );

  const StepReview = () => (
    <div>
      <h5 className="mb-3">Review Your Details</h5>
      <div className="bg-light rounded p-3">
        {Object.entries(form).filter(([k,v]) => typeof v !== 'object').map(([k,v]) => (
          <div key={k} className="mb-2 border-bottom py-1">
            <label className="text-muted">{k.replace(/([A-Z])/g,' $1')}</label>
            <div>{v?.toString() || '-'}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepPersonal />;
      case 2: return <StepEmployment />;
      case 3: return <StepExistingLoans />;
      case 4: return <StepDocuments />;
      case 5: return <StepLoanDetails />;
      case 6: return <StepReview />;
      default: return <StepPersonal />;
    }
  };

  return (
    <div className="app-container">
      <h2 className="text-center mb-3">Loan Application Form</h2>

      {/* Bubble Stepper */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center" style={{gap:'12px'}}>
          {progressTitles.map((title, idx) => {
            const stepNum = idx + 1;
            const active = currentStep === stepNum;
            const completed = currentStep > stepNum;
            const circleStyle = {
              width: 34, height: 34, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: active ? '#0d6efd' : '#e9f1ff', color: active ? '#fff' : '#0d6efd',
              fontWeight: 700
            };
            const lineStyle = {
              height: 2, backgroundColor: completed ? '#0d6efd' : '#d0daf5', flex: 1, margin: '0 8px'
            };
            return (
              <div key={title} className="d-flex align-items-center" style={{flex:1}}>
                <div className="text-center" style={{minWidth: 70}}>
                  <div className="mx-auto" style={circleStyle}>{stepNum}</div>
                  <div className="small mt-2" style={{color: active ? '#0d6efd' : '#6c757d', fontWeight: active ? 600 : 500}}>{title}</div>
                </div>
                {idx < progressTitles.length - 1 && <div style={lineStyle}></div>}
              </div>
            );
          })}
        </div>
      </div>

      {renderStep()}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary-custom" onClick={prevStep} disabled={currentStep === 1}>Previous</button>
        {currentStep < 6 ? (
          <button className="btn btn-primary-custom" onClick={nextStep}>Next</button>
        ) : (
          <button className="btn btn-primary-custom" onClick={submitFinal}>Submit</button>
        )}
      </div>
    </div>
  );
}

export default LoanApplication;
*/
