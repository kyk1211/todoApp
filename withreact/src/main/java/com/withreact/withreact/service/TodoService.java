package com.withreact.withreact.service;

import com.withreact.withreact.model.TodoEntity;
import com.withreact.withreact.repository.TodoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class TodoService {

    private TodoRepository todoRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public String testService() {
        TodoEntity todoEntity = TodoEntity.builder().title("My first todo").build();
        todoRepository.save(todoEntity);
        TodoEntity savedEntity = todoRepository.findById(todoEntity.getId()).get();
        return savedEntity.getTitle();
    }

    public List<TodoEntity> create(TodoEntity todoEntity) {
        validate(todoEntity);

        todoRepository.save(todoEntity);
        log.info("Entity id: {} is saved.", todoEntity.getId());
        return todoRepository.findByUserId(todoEntity.getUserId());
    }

    public List<TodoEntity> retrieve(String userId) {
        return todoRepository.findByUserId(userId);
    }

    public List<TodoEntity> update(TodoEntity todoEntity) {
        validate(todoEntity);

        Optional<TodoEntity> original = todoRepository.findById(todoEntity.getId());

        original.ifPresent(todo -> {
            todo.setTitle(todoEntity.getTitle());
            todo.setDone(todoEntity.isDone());
            todoRepository.save(todo);
        });
        return retrieve(todoEntity.getUserId());
    }

    public List<TodoEntity> delete(TodoEntity todoEntity) {
        validate(todoEntity);

        try {
            todoRepository.delete(todoEntity);
        } catch (Exception e) {
            log.error("Error occurred while deleting entity: {}", todoEntity.getId());
            throw new RuntimeException("Error occurred while deleting entity: " + todoEntity.getId());
        }
        return retrieve(todoEntity.getUserId());
    }

    private void validate(TodoEntity todoEntity) {
        if (todoEntity == null) {
            log.warn("Entity cannot be null");
            throw new RuntimeException("Entity cannot be null");
        }

        if (todoEntity.getUserId() == null) {
            log.warn("Unknown user.");
            throw new RuntimeException("Unknown user.");
        }
    }
}
