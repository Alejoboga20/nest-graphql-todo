import { Query, Resolver } from '@nestjs/graphql';

import { Todo } from './entities/todo.entity';

@Resolver()
export class TodoResolver {
  @Query(() => [Todo], {
    name: 'todos',
    description: 'Get all todos',
  })
  findAll(): Todo[] {
    return [];
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
