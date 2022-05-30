package com.withreact.withreact.controller;

import com.withreact.withreact.dto.ResponseDto;
import com.withreact.withreact.dto.TestRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/test")
public class TestController {
    @GetMapping
    public String TestController() {
        return "Hello World";
    }

    @GetMapping("/testGetMapping")
    public String TestControllerWithPath() {
        return "Hello World testGetMapping";
    }

    @GetMapping("/{id}")
    public String testControllerWithPathVariable(int id) {
        return "Hello World testControllerWithPathVariable " + id;
    }

    @GetMapping("/testQuery")
    public String testControllerWithQuery(@RequestParam int id) {
        return "Hello World testControllerWithQuery" + id;
    }

    @GetMapping("/testDto")
    public String testControllerWithDto(@RequestBody TestRequestDto testRequestDto) {
        return "Hello World testControllerWithDto ID: " + testRequestDto.getId() + " Message: " + testRequestDto.getMessage();
    }
    @GetMapping("/testResponseDto")
    public ResponseDto<String> testControllerWithResponseDto() {
        List<String> list = new ArrayList<>();
        list.add("Hello World testControllerWithResponseDto");
        return ResponseDto.<String>builder().data(list).build();
    }

    @GetMapping("/testResponseEntity")
    public ResponseEntity<?> testControllerWithResponseEntity() {
        List<String> list = new ArrayList<>();
        list.add("Hello World testControllerWithResponseEntity");
        ResponseDto<String> response = ResponseDto.<String>builder().data(list).build();
        return ResponseEntity.badRequest().body(response);
    }
}
