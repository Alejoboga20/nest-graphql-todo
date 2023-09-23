import { Float, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { name: 'hello', description: 'Hello World Query' })
  helloWorld(): string {
    return 'Hello World!';
  }

  @Query(() => Float, {
    name: 'randomNumber',
    description: 'Random Number Query',
  })
  randomNumber(): number {
    return Math.random() * 100;
  }
}
