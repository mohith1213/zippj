package com.example.bankloan.controller;

import com.example.bankloan.dto.NotificationDtos;
import com.example.bankloan.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationDtos.NotificationDto>> list(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.listForUser(userId));
    }
}
