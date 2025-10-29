package com.example.loan.controller;

import com.example.loan.entity.Notification;
import com.example.loan.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<Notification> list(@RequestParam("userId") Long userId) {
        return notificationService.listForUser(userId);
    }
}
