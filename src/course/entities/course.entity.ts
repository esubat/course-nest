import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooSchema } from 'mongoose';
import { User } from 'src/user/entities/user.entity';


@ObjectType()
@Schema()
export class Course {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  title: string;

  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => String)
  @Prop()	
  category: string;

  @Field(() => String)
  @Prop()
  duration: string;

  @Field(() => User)
  @Prop({ type: MongooSchema.Types.ObjectId, ref: 'User', required: true })
  creator: User;
}


export type CourseDocument = Course & Document;
export const CourseSchema = SchemaFactory.createForClass(Course);