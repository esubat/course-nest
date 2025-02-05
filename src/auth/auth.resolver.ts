import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guards';
import { User } from 'src/user/entities/user.entity';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { LoginUserResponse } from './dto/login-user.response';
import { GoogleAuthResponse } from './dto/gogle-auth.response';

@Resolver()
export class AuthResolver {
    
    constructor(
        private authService: AuthService
    ){}

    @Mutation(() => LoginUserResponse)
    @UseGuards(GqlAuthGuard)
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

    // 0Auth with Google
    @Query(() => String)
    async googleLoginUrl(): Promise<string> {
      return this.authService.getGoogleAuthUrl();
    }

    @Query(() => GoogleAuthResponse)
    async googleLoginCallback(@Args('code') code: string): Promise<GoogleAuthResponse> {
        return this.authService.validateGoogleUser(code);
    }
}
