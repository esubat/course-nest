import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from "bcrypt";
import { User } from 'src/user/entities/user.entity';
import { CreateUserInput } from 'src/user/dto/create-user.input';

@Injectable()
export class AuthService {

    constructor(
        private userService : UserService,
        private jwtService  : JwtService,
        private readonly configService : ConfigService
    ){}

    async validateUser (LoginUserInput:LoginUserInput){
        const { email, password } = LoginUserInput;
        const user = await this.userService.findOneByEmail(email);
        const isMatch = await bcrypt.compare(password, user.password);

        if( user && isMatch ) return user;

        return null;
        
    }

    login(user:User){
        return{
            user,
            authToken: this.jwtService.sign({
                id:user._id
            },{
                secret:this.configService.get<string>('JWT_SECRET')
            })
        }
    }
    async signUp(payload:CreateUserInput){
        const user = await this.userService.findOneByEmail(payload.email)
        if (user) throw new Error ("user with email aready exists ")
        
        const saltRounds = this.configService.get<number>('SALT_ROUNDS') ?? 10;
        const hashedPassword = await bcrypt.hash(payload.password, saltRounds);
        
        const newUser = await this.userService.create({
            ...payload, 
            password:hashedPassword});
        return this.login(newUser);
    }
}
