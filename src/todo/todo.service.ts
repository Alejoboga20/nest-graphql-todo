import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput, StatusArgs, UpdateTodoInput } from './dtos';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Todo 1', done: false },
    { id: 2, description: 'Todo 2', done: true },
    { id: 3, description: 'Todo 3', done: false },
  ];

  get totalTodos(): number {
    return this.todos.length;
  }
  get completedTodos(): number {
    return this.todos.filter((todo) => todo.done).length;
  }
  get pendingTodos(): number {
    return this.todos.filter((todo) => !todo.done).length;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;

    if (status !== undefined)
      return this.todos.filter((todo) => todo.done === status);

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

  update({ id, description, done }: UpdateTodoInput) {
    const todoToUpdate = this.findOne(id);

    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done;

    this.todos = this.todos.map((todo) =>
      todo.id === id ? todoToUpdate : todo,
    );

    return todoToUpdate;
  }

  delete(id: number): boolean {
    const todoToDelete = this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== todoToDelete.id);

    return true;
  }
}
