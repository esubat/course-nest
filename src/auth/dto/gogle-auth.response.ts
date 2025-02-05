import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GoogleAuthResponse {
  @Field()
  accessToken: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  picture?: string;
}
