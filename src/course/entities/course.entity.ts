import { ObjectType, Field } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Schema as MongooSchema } from 'mongoose';
import { User } from 'src/user/entities/user.entity';


@ObjectType()
export class Course {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => String)
  @Prop()
  duration: String;

  @Field()
  @Prop({ type: MongooSchema.Types.ObjectId, ref: 'User' })
  creator: User;

  @Field(() => [String])
  @Prop()
  tags: string[];
}
