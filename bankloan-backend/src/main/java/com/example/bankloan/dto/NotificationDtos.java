package com.example.bankloan.dto;

import java.time.LocalDateTime;

public class NotificationDtos {
    public static class NotificationDto {
        private Long id;
        private String type;
        private String message;
        private boolean readFlag;
        private LocalDateTime createdAt;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public boolean isReadFlag() { return readFlag; }
        public void setReadFlag(boolean readFlag) { this.readFlag = readFlag; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
}
