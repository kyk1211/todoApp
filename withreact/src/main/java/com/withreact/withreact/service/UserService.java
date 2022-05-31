package com.withreact.withreact.service;

import com.withreact.withreact.model.TodoEntity;
import com.withreact.withreact.model.UserEntity;
import com.withreact.withreact.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity create(UserEntity userEntity) {
        if (userEntity == null || userEntity.getEmail() == null) {
            throw new RuntimeException("Invalid arguments.");
        }
        String email = userEntity.getEmail();
        if (userRepository.existsByEmail(email)) {
            log.warn("User with email {} already exists.", email);
            throw new RuntimeException("Email already exists.");
        }

        return userRepository.save(userEntity);
    }

    public UserEntity getByCredentials(String email, String password, PasswordEncoder passwordEncoder) {
        UserEntity userEntity = userRepository.findByEmail(email);
        if (userEntity != null && passwordEncoder.matches(password, userEntity.getPassword())) {
            return userEntity;
        }
        return null;
    }
}
