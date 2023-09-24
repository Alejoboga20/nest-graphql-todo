import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, {
    description: 'The description of the todo',
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(3)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, {
    description: 'The done status of the todo',
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
