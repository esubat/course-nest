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

    // @UseGuards(GqlAuthGuard)
    @Mutation(() => LoginUserResponse)
    async login(
        @Args('loginUserInput') loginUserInput: LoginUserInput
    ) {
        const user = await this.authService.validateUser(loginUserInput);
        return this.authService.login(user);
    }

    @Mutation(() => User)
    signUp(@Args('signupInput') signupInput: CreateUserInput) {
        return this.authService.signUp(signupInput);
    }
}
