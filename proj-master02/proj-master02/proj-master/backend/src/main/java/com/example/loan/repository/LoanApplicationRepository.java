package com.example.loan.repository;

import com.example.loan.entity.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {
    List<LoanApplication> findByUserIdOrderByIdDesc(Long userId);
    Optional<LoanApplication> findByPublicId(String publicId);
    List<LoanApplication> findAllByOrderByIdDesc();
    List<LoanApplication> findByStatusOrderByIdDesc(String status);
}
