import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, StatusArgs, UpdateTodoInput } from './dtos';

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
}
