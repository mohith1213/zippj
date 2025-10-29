package com.example.loan.controller;

import com.example.loan.controller.dto.ApplicationDto;
import com.example.loan.entity.LoanApplication;
import com.example.loan.service.LoanApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final LoanApplicationService service;

    public ApplicationController(LoanApplicationService service) {
        this.service = service;
    }

    @GetMapping
    public List<ApplicationDto> list(
            @RequestParam(value = "userId", required = false) Long userId,
            @RequestParam(value = "status", required = false) String status
    ) {
        if (userId != null) {
            return service.listByUser(userId).stream().map(this::toDto).collect(Collectors.toList());
        }
        if (status != null && !status.isBlank()) {
            return service.listByStatus(status).stream().map(this::toDto).collect(Collectors.toList());
        }
        return service.listAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationDto> getOne(@PathVariable("id") String publicId) {
        return service.getByPublicId(publicId)
                .map(e -> ResponseEntity.ok(toDto(e)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ApplicationDto create(@RequestBody Map<String, Object> body) {
        Long userId = toLong(body.getOrDefault("userId", 1));
        String loanType = (String) body.getOrDefault("loanType", "Personal Loan");
        BigDecimal amount = toBigDecimal(body.get("amount"));
        Integer tenure = toInteger(body.get("tenure"));
        Map<String, Object> formData = (Map<String, Object>) body.getOrDefault("formData", new HashMap<>());
        LoanApplication created = service.create(userId, loanType, amount, tenure, formData);
        return toDto(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApplicationDto> update(@PathVariable("id") String publicId, @RequestBody Map<String, Object> body) {
        Map<String, Object> fields = (Map<String, Object>) body.getOrDefault("fields", new HashMap<>());
        Map<String, Object> formData = (Map<String, Object>) body.get("formData");
        return service.update(publicId, fields, formData)
                .map(e -> ResponseEntity.ok(toDto(e)))
                .orElse(ResponseEntity.notFound().build());
    }

    // Maker actions
    @PostMapping("/{id}/send-to-checker")
    public ResponseEntity<ApplicationDto> sendToChecker(@PathVariable("id") String publicId) {
        return service.sendToChecker(publicId)
                .map(e -> ResponseEntity.ok(toDto(e)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<ApplicationDto> reject(@PathVariable("id") String publicId, @RequestBody(required = false) Map<String, Object> body) {
        String remarks = body != null ? (String) body.get("remarks") : null;
        return service.reject(publicId, remarks)
                .map(e -> ResponseEntity.ok(toDto(e)))
                .orElse(ResponseEntity.notFound().build());
    }

    // Checker action
    @PostMapping("/{id}/approve")
    public ResponseEntity<ApplicationDto> approve(@PathVariable("id") String publicId) {
        return service.approve(publicId)
                .map(e -> ResponseEntity.ok(toDto(e)))
                .orElse(ResponseEntity.notFound().build());
    }

    private ApplicationDto toDto(LoanApplication e) {
        ApplicationDto dto = new ApplicationDto();
        dto.setId(e.getPublicId());
        dto.setUserId(e.getUserId());
        dto.setLoanType(e.getLoanType());
        dto.setAmount(e.getAmount());
        dto.setTenure(e.getTenure());
        dto.setStatus(e.getStatus());
        dto.setAppliedDate(e.getAppliedDate());
        dto.setRemarks(e.getRemarks());
        dto.setFormData(service.parseFormData(e.getFormDataJson()));
        return dto;
    }

    private Long toLong(Object v) { return v == null ? null : Long.parseLong(v.toString()); }
    private Integer toInteger(Object v) { return v == null ? null : Integer.parseInt(v.toString()); }
    private BigDecimal toBigDecimal(Object v) { return v == null ? null : new BigDecimal(v.toString()); }
}
