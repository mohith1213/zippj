package com.example.loan.service;

import com.example.loan.entity.LoanApplication;
import com.example.loan.repository.LoanApplicationRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class LoanApplicationService {
    private final LoanApplicationRepository repo;
    private final NotificationService notificationService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public LoanApplicationService(LoanApplicationRepository repo, NotificationService notificationService) {
        this.repo = repo;
        this.notificationService = notificationService;
    }

    public List<LoanApplication> listByUser(Long userId) {
        return repo.findByUserIdOrderByIdDesc(userId);
    }

    public List<LoanApplication> listAll() {
        return repo.findAllByOrderByIdDesc();
    }

    public List<LoanApplication> listByStatus(String status) {
        return repo.findByStatusOrderByIdDesc(status);
    }

    public Optional<LoanApplication> getByPublicId(String publicId) {
        return repo.findByPublicId(publicId);
    }

    public LoanApplication create(Long userId, String loanType, BigDecimal amount, Integer tenure, Map<String, Object> formData) {
        LoanApplication app = new LoanApplication();
        app.setPublicId(IdUtil.newPublicId());
        app.setUserId(userId);
        app.setLoanType(loanType);
        app.setAmount(amount);
        app.setTenure(tenure);
        app.setStatus("Pending");
        app.setAppliedDate(LocalDate.now());
        app.setRemarks("Application submitted and pending initial review");
        app.setFormDataJson(toJson(formData));
        LoanApplication saved = repo.save(app);
        notificationService.notify(userId, "Application " + saved.getPublicId() + " submitted", "info");
        return saved;
    }

    public Optional<LoanApplication> update(String publicId, Map<String, Object> fields, Map<String, Object> formData) {
        return repo.findByPublicId(publicId).map(existing -> {
            if (fields.containsKey("loanType")) existing.setLoanType((String) fields.get("loanType"));
            if (fields.containsKey("amount")) existing.setAmount(toBigDecimal(fields.get("amount")));
            if (fields.containsKey("tenure")) existing.setTenure(toInteger(fields.get("tenure")));
            if (fields.containsKey("remarks")) existing.setRemarks((String) fields.get("remarks"));
            if (formData != null) existing.setFormDataJson(toJson(formData));
            // Resubmission resets to Pending
            existing.setStatus("Pending");
            LoanApplication saved = repo.save(existing);
            notificationService.notify(saved.getUserId(), "Application " + saved.getPublicId() + " resubmitted", "info");
            return saved;
        });
    }

    public Optional<LoanApplication> sendToChecker(String publicId) {
        return changeStatus(publicId, "With Checker", "Application sent to checker", "success");
    }

    public Optional<LoanApplication> approve(String publicId) {
        return changeStatus(publicId, "Approved", "Application approved", "success");
    }

    public Optional<LoanApplication> reject(String publicId, String remarks) {
        return repo.findByPublicId(publicId).map(existing -> {
            existing.setStatus("Rejected");
            if (remarks != null && !remarks.isBlank()) existing.setRemarks(remarks);
            LoanApplication saved = repo.save(existing);
            notificationService.notify(saved.getUserId(), "Application " + saved.getPublicId() + " rejected", "warning");
            return saved;
        });
    }

    private Optional<LoanApplication> changeStatus(String publicId, String status, String message, String type) {
        return repo.findByPublicId(publicId).map(existing -> {
            existing.setStatus(status);
            LoanApplication saved = repo.save(existing);
            notificationService.notify(saved.getUserId(), "Application " + saved.getPublicId() + ": " + message, type);
            return saved;
        });
    }

    private String toJson(Map<String, Object> formData) {
        try {
            return formData != null ? objectMapper.writeValueAsString(formData) : null;
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    private BigDecimal toBigDecimal(Object v) {
        if (v == null) return null;
        if (v instanceof BigDecimal b) return b;
        return new BigDecimal(v.toString());
    }

    private Integer toInteger(Object v) {
        if (v == null) return null;
        if (v instanceof Integer i) return i;
        return Integer.parseInt(v.toString());
    }

    public Map<String, Object> parseFormData(String json) {
        try {
            if (json == null || json.isBlank()) return new HashMap<>();
            return objectMapper.readValue(json, Map.class);
        } catch (Exception e) {
            return new HashMap<>();
        }
    }
}
