package com.withreact.withreact.controller;

import com.withreact.withreact.dto.ResponseDto;
import com.withreact.withreact.dto.UserDto;
import com.withreact.withreact.model.UserEntity;
import com.withreact.withreact.security.TokenProvider;
import com.withreact.withreact.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/auth")
public class UserController {
    private UserService userService;
    private TokenProvider tokenProvider;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, TokenProvider tokenProvider, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.passwordEncoder = passwordEncoder;
    }



    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
        try {
            UserEntity user = UserEntity.builder()
                    .email(userDto.getEmail())
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .username(userDto.getUsername())
                    .build();

            UserEntity savedUser = userService.create(user);
            UserDto savedUserDto = UserDto.builder()
                    .email(savedUser.getEmail())
                    .id(savedUser.getId())
                    .username(savedUser.getUsername())
                    .build();

            return ResponseEntity
                    .ok()
                    .body(savedUserDto);
        } catch (Exception e) {
            ResponseDto responseDto = ResponseDto.builder()
                    .error(e.getMessage())
                    .build();
            return ResponseEntity
                    .badRequest()
                    .body(responseDto);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(@RequestBody UserDto userDto) {
        UserEntity user = userService.getByCredentials(userDto.getEmail(), userDto.getPassword(), passwordEncoder);

        if (user != null) {
            String token = tokenProvider.create(user);
            UserDto userDtoResponse = UserDto.builder()
                    .email(user.getEmail())
                    .id(user.getId())
                    .token(token)
                    .build();
           return ResponseEntity.ok().body(userDtoResponse);
        } else {
            ResponseDto responseDto = ResponseDto.builder()
                    .error("Login failed")
                    .build();
            return ResponseEntity.badRequest().body(responseDto);
        }
    }
}
