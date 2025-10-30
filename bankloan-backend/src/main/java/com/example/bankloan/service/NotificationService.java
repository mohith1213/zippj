package com.example.bankloan.service;

import com.example.bankloan.dto.NotificationDtos;
import com.example.bankloan.entity.Notification;
import com.example.bankloan.entity.User;
import com.example.bankloan.repository.NotificationRepository;
import com.example.bankloan.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    public void notifyUser(User user, Notification.Type type, String message) {
        notificationRepository.save(new Notification(user, type, message));
    }

    public void notifyAllByRole(User.Role role, Notification.Type type, String message) {
        List<User> users = userRepository.findAll().stream().filter(u -> u.getRole() == role).toList();
        for (User u : users) {
            notifyUser(u, type, message);
        }
    }

    public List<NotificationDtos.NotificationDto> listForUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return notificationRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(n -> {
                    NotificationDtos.NotificationDto d = new NotificationDtos.NotificationDto();
                    d.setId(n.getId());
                    d.setType(n.getType().name());
                    d.setMessage(n.getMessage());
                    d.setReadFlag(n.isReadFlag());
                    d.setCreatedAt(n.getCreatedAt());
                    return d;
                }).collect(Collectors.toList());
    }
}
