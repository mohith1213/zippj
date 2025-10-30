package com.example.bankloan.service;

import com.example.bankloan.dto.AuthDtos;
import com.example.bankloan.entity.User;
import com.example.bankloan.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public AuthDtos.AuthResponse signup(AuthDtos.SignupRequest req) {
        Optional<User> existing = userRepository.findByEmail(req.getEmail());
        if (existing.isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }
        User.Role role = User.Role.valueOf(req.getRole().toUpperCase());
        User user = new User(req.getEmail(), hash(req.getPassword()), role, req.getFullName());
        userRepository.save(user);
        return toAuthResponse(user, "Signup successful");
    }

    public AuthDtos.AuthResponse login(AuthDtos.LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        if (!user.getPasswordHash().equals(hash(req.getPassword()))) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        return toAuthResponse(user, "Login successful");
    }

    private String hash(String raw) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] h = digest.digest(raw.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : h) sb.append(String.format("%02x", b));
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    private AuthDtos.AuthResponse toAuthResponse(User user, String message) {
        AuthDtos.UserDto dto = new AuthDtos.UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setRole(user.getRole().name());
        AuthDtos.AuthResponse resp = new AuthDtos.AuthResponse();
        resp.setUser(dto);
        resp.setMessage(message);
        return resp;
    }
}
