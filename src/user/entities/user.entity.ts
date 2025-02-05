import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Course } from 'src/course/entities/course.entity';

@ObjectType()
@Schema()
export class User {
  
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  firstname: string;

  @Field(() => String)
  @Prop()
  lastname: string;

  @Field(() => String)
  @Prop({unique: true})
  email: string;

  @Field(() => String)
  @Prop()
  role: string;

  @Field(() => String)
  @Prop()
  password: string;

  @Field(() => [Course])
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Course' }] })
  courses: Course[];

}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
