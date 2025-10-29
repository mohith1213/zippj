package com.example.loan.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "loan_applications")
public class LoanApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // DB id

    @Column(name = "public_id", unique = true)
    private String publicId; // e.g., LA2025123456

    @Column(nullable = false)
    private Long userId; // simple user reference

    @Column(nullable = false)
    private String loanType;

    @Column(precision = 15, scale = 2)
    private BigDecimal amount;

    private Integer tenure; // months

    @Column(nullable = false)
    private String status; // Pending, With Checker, Approved, Rejected

    private LocalDate appliedDate;

    @Column(length = 1000)
    private String remarks;

    @Lob
    @Column(name = "form_data_json")
    private String formDataJson; // raw JSON string

    @JsonIgnore
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    @JsonProperty("id")
    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getLoanType() { return loanType; }
    public void setLoanType(String loanType) { this.loanType = loanType; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public Integer getTenure() { return tenure; }
    public void setTenure(Integer tenure) { this.tenure = tenure; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getAppliedDate() { return appliedDate; }
    public void setAppliedDate(LocalDate appliedDate) { this.appliedDate = appliedDate; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public String getFormDataJson() { return formDataJson; }
    public void setFormDataJson(String formDataJson) { this.formDataJson = formDataJson; }
}
