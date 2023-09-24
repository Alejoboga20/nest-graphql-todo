import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, StatusArgs, UpdateTodoInput } from './dtos';
import { AggregationsType } from './dtos/types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], {
    name: 'todos',
    description: 'Get all todos',
  })
  findAll(
    @Args()
    statusArgs?: StatusArgs,
  ): Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, { name: 'todo', description: 'Get a todo by id' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo', description: 'Create a todo' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo', description: 'Update a todo' })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Boolean, { name: 'deleteTodo', description: 'Delete a todo' })
  deleteTodo(@Args('id', { type: () => Int }) id: number): boolean {
    return this.todoService.delete(id);
  }

  // Aggregations
  @Query(() => Int, {
    name: 'totalTodos',
    description: 'Get the total number of todos',
  })
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query(() => Int, {
    name: 'completedTodos',
    description: 'Get the total number of completed todos',
  })
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  @Query(() => Int, {
    name: 'pendingTodos',
    description: 'Get the total number of pending todos',
  })
  pendingTodos(): number {
    return this.todoService.pendingTodos;
  }

  @Query(() => AggregationsType)
  aggreations(): AggregationsType {
    return {
      total: this.todoService.totalTodos,
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      totalTodos: this.todoService.totalTodos,
    };
  }
}
