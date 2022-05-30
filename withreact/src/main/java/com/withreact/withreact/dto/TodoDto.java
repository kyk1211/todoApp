package com.withreact.withreact.dto;

import com.withreact.withreact.model.TodoEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TodoDto {
    private String id;
    private String title;
    private boolean done;

    public TodoDto(TodoEntity todoEntity) {
        this.id = todoEntity.getId();
        this.title = todoEntity.getTitle();
        this.done = todoEntity.isDone();
    }

    public static TodoEntity toEntity(TodoDto todoDto) {
        return TodoEntity.builder()
                .id(todoDto.getId())
                .title(todoDto.getTitle())
                .done(todoDto.isDone())
                .build();
    }
}
