package com.example.bankloan.repository;

import com.example.bankloan.entity.LoanApplication;
import com.example.bankloan.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepository extends JpaRepository<LoanApplication, Long> {
    List<LoanApplication> findByCustomer(User customer);
    List<LoanApplication> findByStatus(LoanApplication.Status status);
}
