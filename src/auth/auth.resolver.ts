import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guards';
import { User } from 'src/user/entities/user.entity';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { LoginUserResponse } from './dto/login-user.response';

@Resolver()
export class AuthResolver {
    
    constructor(
        private authService: AuthService
    ){}

    @Mutation(() => LoginUserResponse)
    @UseGuards(GqlAuthGuard)
    login(
        @Args('loginUserInput') loginUserInput: LoginUserInput,
        @Context() context: any
    ) {
        return this.authService.login(context?.user);
    }

    @Mutation(() => User)
    signUp(@Args('signupInput') signupInput: CreateUserInput) {
        return this.authService.signUp(signupInput);
    }
}
