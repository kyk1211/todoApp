package com.withreact.withreact.controller;

import com.withreact.withreact.dto.ResponseDto;
import com.withreact.withreact.dto.TodoDto;
import com.withreact.withreact.model.TodoEntity;
import com.withreact.withreact.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/todo")
public class TodoController {

    private TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/test")
    public ResponseEntity<?> testTodo() {
        String str = todoService.testService();
        List<String> list = new ArrayList<>();
        list.add(str);
        ResponseDto<String> response = ResponseDto.<String>builder().data(list).build();
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<?> createTodo(@RequestBody TodoDto todoDto) {
        try {
            String temporaryUserId = "temporary-user";

            TodoEntity entity = TodoDto.toEntity(todoDto);

            entity.setId(null);

            entity.setUserId(temporaryUserId);

            List<TodoEntity> entities = todoService.create(entity);

            List<TodoDto> dtos = entities.stream().map(TodoDto::new).collect(Collectors.toList());

            ResponseDto<TodoDto> response = ResponseDto.<TodoDto>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            ResponseDto<TodoDto> response = ResponseDto.<TodoDto>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<?> retrieveTodoList() {
        String temporaryUserId = "temporary-user";

        List<TodoEntity> entities = todoService.retrieve(temporaryUserId);

        List<TodoDto> dtos = entities.stream().map(TodoDto::new).collect(Collectors.toList());

        ResponseDto<TodoDto> response = ResponseDto.<TodoDto>builder().data(dtos).build();
        return ResponseEntity.ok().body(response);
    }

    @PutMapping
    public ResponseEntity<?> updateTodo(@RequestBody TodoDto todoDto) {
        try {
            String temporaryUserId = "temporary-user";

            TodoEntity entity = TodoDto.toEntity(todoDto);

            entity.setUserId(temporaryUserId);

            List<TodoEntity> entities = todoService.update(entity);

            List<TodoDto> dtos = entities.stream().map(TodoDto::new).collect(Collectors.toList());

            ResponseDto<TodoDto> response = ResponseDto.<TodoDto>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            ResponseDto<TodoDto> response = ResponseDto.<TodoDto>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTodo(@RequestBody TodoDto todoDto) {
        try {
            String temporaryUserId = "temporary-user";

            TodoEntity entity = TodoDto.toEntity(todoDto);

            entity.setUserId(temporaryUserId);

            List<TodoEntity> entities = todoService.delete(entity);

            List<TodoDto> dtos = entities.stream().map(TodoDto::new).collect(Collectors.toList());

            ResponseDto<TodoDto> response = ResponseDto.<TodoDto>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            ResponseDto<TodoDto> response = ResponseDto.<TodoDto>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}


