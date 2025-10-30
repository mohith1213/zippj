package com.example.bankloan.service;

import com.example.bankloan.dto.LoanDtos;
import com.example.bankloan.entity.LoanApplication;
import com.example.bankloan.entity.Notification;
import com.example.bankloan.entity.User;
import com.example.bankloan.repository.LoanRepository;
import com.example.bankloan.repository.UserRepository;
import com.example.bankloan.util.EMIUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LoanService {
    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public LoanService(LoanRepository loanRepository, UserRepository userRepository, NotificationService notificationService) {
        this.loanRepository = loanRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public LoanDtos.LoanDetailDto apply(LoanDtos.LoanApplicationRequest req) {
        User customer = userRepository.findById(req.getCustomerId()).orElseThrow();
        if (customer.getRole() != User.Role.CUSTOMER) throw new IllegalArgumentException("Only customers can apply");
        validateConditionalDocs(req);
        LoanApplication app = buildFromRequest(new LoanApplication(), customer, req);
        app.setApplicationNumber("APP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        app.setStatus(LoanApplication.Status.SUBMITTED);
        app.setEstimatedEmi(EMIUtils.calculateEmi(req.getAmount(), req.getAnnualInterestRate(), req.getTenureMonths()));
        loanRepository.save(app);
        notificationService.notifyAllByRole(User.Role.MAKER, Notification.Type.WORK_ITEM_ASSIGNED,
                "New application submitted: " + app.getApplicationNumber());
        notificationService.notifyUser(customer, Notification.Type.APPLICATION_SUBMITTED,
                "Your application submitted: " + app.getApplicationNumber());
        return toDetailDto(app);
    }

    @Transactional
    public LoanDtos.LoanDetailDto customerResubmit(LoanDtos.ResubmitRequest req) {
        LoanApplication app = loanRepository.findById(req.getApplicationId()).orElseThrow();
        if (!app.getCustomer().getId().equals(req.getCustomerId()))
            throw new IllegalArgumentException("Not your application");
        validateConditionalDocs(req);
        buildFromRequest(app, app.getCustomer(), req);
        app.setMakerRemarks(null);
        app.setCheckerRemarks(null);
        app.setStatus(LoanApplication.Status.SUBMITTED);
        app.setEstimatedEmi(EMIUtils.calculateEmi(req.getAmount(), req.getAnnualInterestRate(), req.getTenureMonths()));
        loanRepository.save(app);
        notificationService.notifyAllByRole(User.Role.MAKER, Notification.Type.WORK_ITEM_ASSIGNED,
                "Resubmitted application: " + app.getApplicationNumber());
        notificationService.notifyUser(app.getCustomer(), Notification.Type.APPLICATION_SUBMITTED,
                "Application resubmitted: " + app.getApplicationNumber());
        return toDetailDto(app);
    }

    @Transactional
    public LoanDtos.LoanDetailDto makerApprove(Long appId, Long makerId, String remarks) {
        User maker = userRepository.findById(makerId).orElseThrow();
        if (maker.getRole() != User.Role.MAKER) throw new IllegalArgumentException("Only maker can act");
        LoanApplication app = loanRepository.findById(appId).orElseThrow();
        app.setStatus(LoanApplication.Status.APPROVED_BY_MAKER);
        app.setMakerRemarks(remarks);
        loanRepository.save(app);
        notificationService.notifyAllByRole(User.Role.CHECKER, Notification.Type.WORK_ITEM_ASSIGNED,
                "Application for checker review: " + app.getApplicationNumber());
        notificationService.notifyUser(app.getCustomer(), Notification.Type.APPLICATION_SUBMITTED,
                "Application moved to checker: " + app.getApplicationNumber());
        return toDetailDto(app);
    }

    @Transactional
    public LoanDtos.LoanDetailDto makerReject(Long appId, Long makerId, String remarks) {
        User maker = userRepository.findById(makerId).orElseThrow();
        if (maker.getRole() != User.Role.MAKER) throw new IllegalArgumentException("Only maker can act");
        LoanApplication app = loanRepository.findById(appId).orElseThrow();
        app.setStatus(LoanApplication.Status.REJECTED_BY_MAKER);
        app.setMakerRemarks(remarks);
        loanRepository.save(app);
        notificationService.notifyUser(app.getCustomer(), Notification.Type.APPLICATION_REJECTED,
                "Application rejected by maker: " + app.getApplicationNumber() + ". Remarks: " + Optional.ofNullable(remarks).orElse(""));
        return toDetailDto(app);
    }

    @Transactional
    public LoanDtos.LoanDetailDto checkerApprove(Long appId, Long checkerId, String remarks) {
        User checker = userRepository.findById(checkerId).orElseThrow();
        if (checker.getRole() != User.Role.CHECKER) throw new IllegalArgumentException("Only checker can act");
        LoanApplication app = loanRepository.findById(appId).orElseThrow();
        app.setStatus(LoanApplication.Status.APPROVED_FINAL);
        app.setCheckerRemarks(remarks);
        loanRepository.save(app);
        notificationService.notifyUser(app.getCustomer(), Notification.Type.APPLICATION_APPROVED,
                "Application approved: " + app.getApplicationNumber());
        notificationService.notifyAllByRole(User.Role.MAKER, Notification.Type.APPLICATION_APPROVED,
                "Application approved: " + app.getApplicationNumber());
        return toDetailDto(app);
    }

    @Transactional
    public LoanDtos.LoanDetailDto checkerReject(Long appId, Long checkerId, String remarks) {
        User checker = userRepository.findById(checkerId).orElseThrow();
        if (checker.getRole() != User.Role.CHECKER) throw new IllegalArgumentException("Only checker can act");
        LoanApplication app = loanRepository.findById(appId).orElseThrow();
        app.setStatus(LoanApplication.Status.REJECTED_BY_CHECKER);
        app.setCheckerRemarks(remarks);
        loanRepository.save(app);
        notificationService.notifyUser(app.getCustomer(), Notification.Type.APPLICATION_REJECTED,
                "Application rejected by checker: " + app.getApplicationNumber() + ". Remarks: " + Optional.ofNullable(remarks).orElse(""));
        return toDetailDto(app);
    }

    public List<LoanDtos.LoanSummaryDto> listForCustomer(Long customerId) {
        User customer = userRepository.findById(customerId).orElseThrow();
        return loanRepository.findByCustomer(customer).stream().map(this::toSummaryDto).collect(Collectors.toList());
    }

    public List<LoanDtos.LoanSummaryDto> listForMaker() {
        return loanRepository.findByStatus(LoanApplication.Status.SUBMITTED).stream()
                .map(this::toSummaryDto).collect(Collectors.toList());
    }

    public List<LoanDtos.LoanSummaryDto> listForChecker() {
        return loanRepository.findByStatus(LoanApplication.Status.APPROVED_BY_MAKER).stream()
                .map(this::toSummaryDto).collect(Collectors.toList());
    }

    public LoanDtos.LoanDetailDto getDetails(Long appId) {
        LoanApplication app = loanRepository.findById(appId).orElseThrow();
        return toDetailDto(app);
    }

    private LoanApplication buildFromRequest(LoanApplication app, User customer, LoanDtos.LoanApplicationRequest req) {
        app.setCustomer(customer);
        app.setPhone(req.getPhone());
        app.setAddress(req.getAddress());
        app.setAge(req.getAge());
        app.setOccupationType(req.getOccupationType());
        app.setEmployer(req.getEmployer());
        app.setEmploymentProof(req.getEmploymentProof());
        app.setPayslip(req.getPayslip());
        app.setItrDoc(req.getItrDoc());
        app.setBusinessName(req.getBusinessName());
        app.setGstDoc(req.getGstDoc());
        app.setBankStatements(req.getBankStatements());
        app.setLoanType(req.getLoanType());
        app.setAmount(req.getAmount());
        app.setTenureMonths(req.getTenureMonths());
        app.setAnnualInterestRate(req.getAnnualInterestRate());
        app.setSaleAgreement(req.getSaleAgreement());
        app.setEncumbranceCertificate(req.getEncumbranceCertificate());
        app.setVehicleInvoice(req.getVehicleInvoice());
        app.setVehicleQuotation(req.getVehicleQuotation());
        app.setHasExistingLoans(req.getHasExistingLoans());
        app.setExistingLoanAmount(req.getExistingLoanAmount());
        app.setExistingLoanEmi(req.getExistingLoanEmi());
        return app;
    }

    private void validateConditionalDocs(LoanDtos.LoanApplicationRequest req) {
        String occ = req.getOccupationType() == null ? "" : req.getOccupationType().trim();
        String loanType = req.getLoanType() == null ? "" : req.getLoanType().trim();
        if ("Salaried".equalsIgnoreCase(occ)) {
            if (isBlank(req.getEmployer()) || isBlank(req.getPayslip()) || isBlank(req.getItrDoc()) || isBlank(req.getEmploymentProof())) {
                throw new IllegalArgumentException("Missing required documents for Salaried: employer, payslip, ITR, employmentProof");
            }
        }
        if ("Self-Employed".equalsIgnoreCase(occ)) {
            if (isBlank(req.getBusinessName()) || isBlank(req.getItrDoc()) || isBlank(req.getGstDoc()) || isBlank(req.getBankStatements())) {
                throw new IllegalArgumentException("Missing required documents for Self-Employed: businessName, ITR, GST, bankStatements");
            }
        }
        if ("Home Loan".equalsIgnoreCase(loanType)) {
            if (isBlank(req.getSaleAgreement()) || isBlank(req.getEncumbranceCertificate())) {
                throw new IllegalArgumentException("Missing required documents for Home Loan: saleAgreement, encumbranceCertificate");
            }
        }
        if ("Vehicle Loan".equalsIgnoreCase(loanType)) {
            if (isBlank(req.getVehicleInvoice()) || isBlank(req.getVehicleQuotation())) {
                throw new IllegalArgumentException("Missing required documents for Vehicle Loan: vehicleInvoice, vehicleQuotation");
            }
        }
    }

    private boolean isBlank(String s) { return s == null || s.trim().isEmpty(); }

    private LoanDtos.LoanSummaryDto toSummaryDto(LoanApplication app) {
        LoanDtos.LoanSummaryDto d = new LoanDtos.LoanSummaryDto();
        d.setId(app.getId());
        d.setApplicationNumber(app.getApplicationNumber());
        d.setLoanType(app.getLoanType());
        d.setAmount(app.getAmount());
        d.setTenureMonths(app.getTenureMonths());
        d.setEstimatedEmi(app.getEstimatedEmi());
        d.setStatus(mapStatus(app.getStatus()));
        return d;
    }

    private LoanDtos.LoanDetailDto toDetailDto(LoanApplication app) {
        LoanDtos.LoanDetailDto d = new LoanDtos.LoanDetailDto();
        d.setId(app.getId());
        d.setApplicationNumber(app.getApplicationNumber());
        d.setLoanType(app.getLoanType());
        d.setAmount(app.getAmount());
        d.setTenureMonths(app.getTenureMonths());
        d.setEstimatedEmi(app.getEstimatedEmi());
        d.setStatus(mapStatus(app.getStatus()));
        d.setCustomerId(app.getCustomer().getId());
        d.setPhone(app.getPhone());
        d.setAddress(app.getAddress());
        d.setAge(app.getAge());
        d.setOccupationType(app.getOccupationType());
        d.setEmployer(app.getEmployer());
        d.setEmploymentProof(app.getEmploymentProof());
        d.setPayslip(app.getPayslip());
        d.setItrDoc(app.getItrDoc());
        d.setBusinessName(app.getBusinessName());
        d.setGstDoc(app.getGstDoc());
        d.setBankStatements(app.getBankStatements());
        d.setSaleAgreement(app.getSaleAgreement());
        d.setEncumbranceCertificate(app.getEncumbranceCertificate());
        d.setVehicleInvoice(app.getVehicleInvoice());
        d.setVehicleQuotation(app.getVehicleQuotation());
        d.setHasExistingLoans(app.getHasExistingLoans());
        d.setExistingLoanAmount(app.getExistingLoanAmount());
        d.setExistingLoanEmi(app.getExistingLoanEmi());
        d.setMakerRemarks(app.getMakerRemarks());
        d.setCheckerRemarks(app.getCheckerRemarks());
        return d;
    }

    private String mapStatus(LoanApplication.Status s) {
        return switch (s) {
            case SUBMITTED, UNDER_REVIEW_MAKER, UNDER_REVIEW_CHECKER -> "Under Review";
            case APPROVED_BY_MAKER, APPROVED_FINAL -> "Approved";
            case REJECTED_BY_MAKER, REJECTED_BY_CHECKER -> "Rejected";
        };
    }
}
