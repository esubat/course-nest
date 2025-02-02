import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooSchema } from 'mongoose';

@InputType()
export class CreateCourseInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  duration: string;

  @Field(() => String, { nullable: false })
  creator: MongooSchema.Types.ObjectId;

  @Field(() => [String])
  tags: string[];
}
