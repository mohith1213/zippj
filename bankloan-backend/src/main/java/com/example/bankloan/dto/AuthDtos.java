package com.example.bankloan.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AuthDtos {

    public static class SignupRequest {
        @NotBlank @Email
        private String email;
        @NotBlank
        private String password;
        @NotNull
        private String role; // CUSTOMER/MAKER/CHECKER
        private String fullName;
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
    }

    public static class LoginRequest {
        @NotBlank @Email
        private String email;
        @NotBlank
        private String password;
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class UserDto {
        private Long id;
        private String email;
        private String fullName;
        private String role;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }

    public static class AuthResponse {
        private UserDto user;
        private String message;
        public UserDto getUser() { return user; }
        public void setUser(UserDto user) { this.user = user; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}
