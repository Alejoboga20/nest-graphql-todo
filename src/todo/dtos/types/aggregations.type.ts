import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Todo Aggregations' })
export class AggregationsType {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  completed: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int, { deprecationReason: 'Use total instead' })
  totalTodos: number;
}
