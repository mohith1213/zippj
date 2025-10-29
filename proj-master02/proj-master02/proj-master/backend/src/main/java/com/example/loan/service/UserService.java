package com.example.loan.service;

import com.example.loan.entity.User;
import com.example.loan.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getOrCreate(String name, String email, String phone) {
        Optional<User> byEmail = userRepository.findByEmail(email);
        if (byEmail.isPresent()) return byEmail.get();
        User u = new User();
        u.setName(name != null ? name : email);
        u.setEmail(email);
        u.setPhone(phone);
        return userRepository.save(u);
    }
}
