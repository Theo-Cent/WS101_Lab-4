package com.example.todoapp.service;

import com.example.todoapp.model.Todo;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class TodoService {
    private final Map<Long, Todo> todos = new HashMap<>();
    private final AtomicLong counter = new AtomicLong(1);

    public List<Todo> getTodos(String username) {
        return todos.values().stream()
                .filter(todo -> todo.getUsername().equalsIgnoreCase(username))
                .collect(Collectors.toList());
    }

    public Todo addTodo(Todo todo) {
        todo.setId(counter.getAndIncrement());
        if (todo.getTargetDate() == null) {
            todo.setTargetDate(LocalDate.now());
        }
        todos.put(todo.getId(), todo);
        return todo;
    }

    public Todo updateTodo(Long id, Todo updatedTodo) {
        Todo existing = todos.get(id);
        if (existing != null) {
            if (updatedTodo.getDescription() != null)
                existing.setDescription(updatedTodo.getDescription());
            if (updatedTodo.getTargetDate() != null)
                existing.setTargetDate(updatedTodo.getTargetDate());
            existing.setDone(updatedTodo.isDone());
        }
        return existing;
    }

    public boolean deleteTodo(Long id) {
        return todos.remove(id) != null;
    }
}
