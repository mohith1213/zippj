package com.example.bankloan.repository;

import com.example.bankloan.entity.Notification;
import com.example.bankloan.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrderByCreatedAtDesc(User user);
}
