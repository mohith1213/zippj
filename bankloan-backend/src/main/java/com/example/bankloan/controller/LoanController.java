package com.example.bankloan.controller;

import com.example.bankloan.dto.LoanDtos;
import com.example.bankloan.service.LoanService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @PostMapping("/apply")
    public ResponseEntity<LoanDtos.LoanDetailDto> apply(@Valid @RequestBody LoanDtos.LoanApplicationRequest request) {
        return ResponseEntity.ok(loanService.apply(request));
    }

    @PostMapping("/resubmit")
    public ResponseEntity<LoanDtos.LoanDetailDto> resubmit(@Valid @RequestBody LoanDtos.ResubmitRequest request) {
        return ResponseEntity.ok(loanService.customerResubmit(request));
    }

    @PostMapping("/{id}/maker/approve")
    public ResponseEntity<LoanDtos.LoanDetailDto> makerApprove(@PathVariable("id") Long id,
                                                               @Valid @RequestBody LoanDtos.ActionRequest req) {
        return ResponseEntity.ok(loanService.makerApprove(id, req.getUserId(), req.getRemarks()));
    }

    @PostMapping("/{id}/maker/reject")
    public ResponseEntity<LoanDtos.LoanDetailDto> makerReject(@PathVariable("id") Long id,
                                                              @Valid @RequestBody LoanDtos.ActionRequest req) {
        return ResponseEntity.ok(loanService.makerReject(id, req.getUserId(), req.getRemarks()));
    }

    @PostMapping("/{id}/checker/approve")
    public ResponseEntity<LoanDtos.LoanDetailDto> checkerApprove(@PathVariable("id") Long id,
                                                                 @Valid @RequestBody LoanDtos.ActionRequest req) {
        return ResponseEntity.ok(loanService.checkerApprove(id, req.getUserId(), req.getRemarks()));
    }

    @PostMapping("/{id}/checker/reject")
    public ResponseEntity<LoanDtos.LoanDetailDto> checkerReject(@PathVariable("id") Long id,
                                                                @Valid @RequestBody LoanDtos.ActionRequest req) {
        return ResponseEntity.ok(loanService.checkerReject(id, req.getUserId(), req.getRemarks()));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<LoanDtos.LoanSummaryDto>> listForCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(loanService.listForCustomer(customerId));
    }

    @GetMapping("/maker")
    public ResponseEntity<List<LoanDtos.LoanSummaryDto>> listForMaker() {
        return ResponseEntity.ok(loanService.listForMaker());
    }

    @GetMapping("/checker")
    public ResponseEntity<List<LoanDtos.LoanSummaryDto>> listForChecker() {
        return ResponseEntity.ok(loanService.listForChecker());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanDtos.LoanDetailDto> details(@PathVariable("id") Long id) {
        return ResponseEntity.ok(loanService.getDetails(id));
    }
}
