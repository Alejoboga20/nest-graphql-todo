import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(3)
  description: string;
}
