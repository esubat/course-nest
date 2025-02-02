import { CreateCourseInput } from './create-course.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Schema as MongooSchema } from 'mongoose';


@InputType()
export class UpdateCourseInput extends PartialType(CreateCourseInput) {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;
}
