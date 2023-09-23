import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

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

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description: 'Get Random Number From Zero To Max (Default 10)',
  })
  getRandomFromZeroTo(
    @Args('max', { nullable: true, type: () => Int }) max: number = 10,
  ): number {
    return Math.floor(Math.random() * max) + 1;
  }
}
