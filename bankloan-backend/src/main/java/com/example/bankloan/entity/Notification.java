package com.example.bankloan.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {

    public enum Type {
        APPLICATION_SUBMITTED,
        APPLICATION_APPROVED,
        APPLICATION_REJECTED,
        WORK_ITEM_ASSIGNED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false)
    private User user;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(nullable=false, length=500)
    private String message;

    private boolean readFlag = false;

    private LocalDateTime createdAt;

    public Notification() {}

    public Notification(User user, Type type, String message) {
        this.user = user;
        this.type = type;
        this.message = message;
        this.createdAt = LocalDateTime.now();
    }

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Type getType() { return type; }
    public void setType(Type type) { this.type = type; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public boolean isReadFlag() { return readFlag; }
    public void setReadFlag(boolean readFlag) { this.readFlag = readFlag; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
