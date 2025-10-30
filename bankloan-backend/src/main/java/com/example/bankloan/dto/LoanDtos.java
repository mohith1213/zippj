package com.example.bankloan.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

public class LoanDtos {

    public static class LoanApplicationRequest {
        @NotNull
        private Long customerId;
        @NotBlank
        private String phone;
        @NotBlank
        private String address;
        @NotNull @Min(18)
        private Integer age;

        @NotBlank
        private String occupationType; // Salaried or Self-Employed
        private String employer;
        private String employmentProof;
        private String payslip;
        private String itrDoc;
        private String businessName;
        private String gstDoc;
        private String bankStatements;

        @NotBlank
        private String loanType; // Home Loan or Vehicle Loan
        @NotNull @Positive
        private BigDecimal amount;
        @NotNull @Min(1)
        private Integer tenureMonths;
        @NotNull @DecimalMin("0.1")
        private BigDecimal annualInterestRate;

        private String saleAgreement;
        private String encumbranceCertificate;
        private String vehicleInvoice;
        private String vehicleQuotation;

        private Boolean hasExistingLoans;
        private BigDecimal existingLoanAmount;
        private BigDecimal existingLoanEmi;

        public Long getCustomerId() { return customerId; }
        public void setCustomerId(Long customerId) { this.customerId = customerId; }
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
    }

    public static class LoanSummaryDto {
        private Long id;
        private String applicationNumber;
        private String loanType;
        private BigDecimal amount;
        private Integer tenureMonths;
        private BigDecimal estimatedEmi;
        private String status;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getApplicationNumber() { return applicationNumber; }
        public void setApplicationNumber(String applicationNumber) { this.applicationNumber = applicationNumber; }
        public String getLoanType() { return loanType; }
        public void setLoanType(String loanType) { this.loanType = loanType; }
        public BigDecimal getAmount() { return amount; }
        public void setAmount(BigDecimal amount) { this.amount = amount; }
        public Integer getTenureMonths() { return tenureMonths; }
        public void setTenureMonths(Integer tenureMonths) { this.tenureMonths = tenureMonths; }
        public BigDecimal getEstimatedEmi() { return estimatedEmi; }
        public void setEstimatedEmi(BigDecimal estimatedEmi) { this.estimatedEmi = estimatedEmi; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }

    public static class LoanDetailDto extends LoanSummaryDto {
        private Long customerId;
        private String phone;
        private String address;
        private Integer age;
        private String occupationType;
        private String employer;
        private String employmentProof;
        private String payslip;
        private String itrDoc;
        private String businessName;
        private String gstDoc;
        private String bankStatements;
        private String saleAgreement;
        private String encumbranceCertificate;
        private String vehicleInvoice;
        private String vehicleQuotation;
        private Boolean hasExistingLoans;
        private BigDecimal existingLoanAmount;
        private BigDecimal existingLoanEmi;
        private String makerRemarks;
        private String checkerRemarks;
        public Long getCustomerId() { return customerId; }
        public void setCustomerId(Long customerId) { this.customerId = customerId; }
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
        public String getMakerRemarks() { return makerRemarks; }
        public void setMakerRemarks(String makerRemarks) { this.makerRemarks = makerRemarks; }
        public String getCheckerRemarks() { return checkerRemarks; }
        public void setCheckerRemarks(String checkerRemarks) { this.checkerRemarks = checkerRemarks; }
    }

    public static class ActionRequest {
        @NotNull
        private Long userId; // maker/checker id
        private String remarks;
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getRemarks() { return remarks; }
        public void setRemarks(String remarks) { this.remarks = remarks; }
    }

    public static class ResubmitRequest extends LoanApplicationRequest {
        @NotNull
        private Long applicationId;
        public Long getApplicationId() { return applicationId; }
        public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }
    }

    public static class IdRequest {
        @NotNull
        private Long id;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
    }

    public static class ListRequest {
        @NotNull
        private Long userId;
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
    }
}
