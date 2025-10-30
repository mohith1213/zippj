package com.example.bankloan.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "loan_applications")
public class LoanApplication {

    public enum Status {
        SUBMITTED,
        UNDER_REVIEW_MAKER,
        REJECTED_BY_MAKER,
        APPROVED_BY_MAKER,
        UNDER_REVIEW_CHECKER,
        REJECTED_BY_CHECKER,
        APPROVED_FINAL
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String applicationNumber;

    @ManyToOne(optional=false)
    private User customer;

    // Personal Info
    private String phone;
    private String address;
    private Integer age;

    // Occupation
    private String occupationType; // Salaried | Self-Employed
    private String employer; // if Salaried
    private String employmentProof; // doc ref
    private String payslip; // doc ref
    private String itrDoc; // doc ref
    private String businessName; // if Self-Employed
    private String gstDoc; // doc ref
    private String bankStatements; // doc ref

    // Loan Details
    private String loanType; // Home Loan | Vehicle Loan | ...
    private BigDecimal amount;
    private Integer tenureMonths;
    private BigDecimal annualInterestRate; // percent
    private BigDecimal estimatedEmi;

    // Loan-type specific documents
    private String saleAgreement; // Home
    private String encumbranceCertificate; // EC - Home
    private String vehicleInvoice; // Vehicle
    private String vehicleQuotation; // Vehicle

    // Existing Loan Info
    private Boolean hasExistingLoans;
    private BigDecimal existingLoanAmount;
    private BigDecimal existingLoanEmi;

    // Workflow
    @Enumerated(EnumType.STRING)
    private Status status;

    private String makerRemarks;
    private String checkerRemarks;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public LoanApplication() {}

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) status = Status.SUBMITTED;
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getApplicationNumber() { return applicationNumber; }
    public void setApplicationNumber(String applicationNumber) { this.applicationNumber = applicationNumber; }
    public User getCustomer() { return customer; }
    public void setCustomer(User customer) { this.customer = customer; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getOccupationType() { return occupationType; }
    public void setOccupationType(String occupationType) { this.occupationType = occupationType; }
    public String getEmployer() { return employer; }
    public void setEmployer(String employer) { this.employer = employer; }
    public String getEmploymentProof() { return employmentProof; }
    public void setEmploymentProof(String employmentProof) { this.employmentProof = employmentProof; }
    public String getPayslip() { return payslip; }
    public void setPayslip(String payslip) { this.payslip = payslip; }
    public String getItrDoc() { return itrDoc; }
    public void setItrDoc(String itrDoc) { this.itrDoc = itrDoc; }
    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }
    public String getGstDoc() { return gstDoc; }
    public void setGstDoc(String gstDoc) { this.gstDoc = gstDoc; }
    public String getBankStatements() { return bankStatements; }
    public void setBankStatements(String bankStatements) { this.bankStatements = bankStatements; }
    public String getLoanType() { return loanType; }
    public void setLoanType(String loanType) { this.loanType = loanType; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public Integer getTenureMonths() { return tenureMonths; }
    public void setTenureMonths(Integer tenureMonths) { this.tenureMonths = tenureMonths; }
    public BigDecimal getAnnualInterestRate() { return annualInterestRate; }
    public void setAnnualInterestRate(BigDecimal annualInterestRate) { this.annualInterestRate = annualInterestRate; }
    public BigDecimal getEstimatedEmi() { return estimatedEmi; }
    public void setEstimatedEmi(BigDecimal estimatedEmi) { this.estimatedEmi = estimatedEmi; }
    public String getSaleAgreement() { return saleAgreement; }
    public void setSaleAgreement(String saleAgreement) { this.saleAgreement = saleAgreement; }
    public String getEncumbranceCertificate() { return encumbranceCertificate; }
    public void setEncumbranceCertificate(String encumbranceCertificate) { this.encumbranceCertificate = encumbranceCertificate; }
    public String getVehicleInvoice() { return vehicleInvoice; }
    public void setVehicleInvoice(String vehicleInvoice) { this.vehicleInvoice = vehicleInvoice; }
    public String getVehicleQuotation() { return vehicleQuotation; }
    public void setVehicleQuotation(String vehicleQuotation) { this.vehicleQuotation = vehicleQuotation; }
    public Boolean getHasExistingLoans() { return hasExistingLoans; }
    public void setHasExistingLoans(Boolean hasExistingLoans) { this.hasExistingLoans = hasExistingLoans; }
    public BigDecimal getExistingLoanAmount() { return existingLoanAmount; }
    public void setExistingLoanAmount(BigDecimal existingLoanAmount) { this.existingLoanAmount = existingLoanAmount; }
    public BigDecimal getExistingLoanEmi() { return existingLoanEmi; }
    public void setExistingLoanEmi(BigDecimal existingLoanEmi) { this.existingLoanEmi = existingLoanEmi; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public String getMakerRemarks() { return makerRemarks; }
    public void setMakerRemarks(String makerRemarks) { this.makerRemarks = makerRemarks; }
    public String getCheckerRemarks() { return checkerRemarks; }
    public void setCheckerRemarks(String checkerRemarks) { this.checkerRemarks = checkerRemarks; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
