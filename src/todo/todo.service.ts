import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';

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
  findOne() {
    return {};
  }
  create() {
    return {};
  }
  update() {
    return {};
  }
  remove() {
    return {};
  }
}
