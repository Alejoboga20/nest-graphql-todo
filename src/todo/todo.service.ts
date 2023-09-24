import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dtos/inputs/create-todo.input';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Todo 1', done: false },
    { id: 2, description: 'Todo 2', done: true },
    { id: 3, description: 'Todo 3', done: false },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with id:${id} not found`);

    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();

    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    todo.description = createTodoInput.description;
    todo.done = false;
    this.todos.push(todo);

    return todo;
  }
}
