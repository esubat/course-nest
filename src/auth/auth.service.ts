import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from "bcrypt";
import { User } from 'src/user/entities/user.entity';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import axios from 'axios';
import { GoogleAuthResponse } from './dto/gogle-auth.response';

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

        if( user) return user;

        return null;
        
    }

    login(user: User) {
        if (!user || !user._id) {
            throw new Error("Invalid user object");
        }
        return {
            user,
            authToken: this.jwtService.sign({
                id: user._id
            }, {
                secret: this.configService.get<string>('JWT_SECRET')
            })
        };
    }

    async signUp(payload:CreateUserInput){
        const user = await this.userService.findOneByEmail(payload.email)
        if (user) throw new Error ("user with email aready exists ");

        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload.password,saltRounds);
        
        const newUser = await this.userService.create({
            ...payload, 
            password:hashedPassword});
        return this.login(newUser);
    }


    
  getGoogleAuthUrl(): string {
    const rootUrl = 'https://accounts.google.com/o/oauth2/auth';
    const options = {
      redirect_uri: this.configService.get('GOOGLE_REDIRECT_URI'),
      client_id: this.configService.get('GOOGLE_CLIENT_ID'),
      access_type: 'offline',
      response_type: 'code',
      scope: ['openid', 'email', 'profile'].join(' '),
    };
    const queryString = new URLSearchParams(options).toString();
    return `${rootUrl}?${queryString}`;
  }

  async validateGoogleUser(code: string): Promise<GoogleAuthResponse> {
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: this.configService.get('GOOGLE_CLIENT_ID'),
      client_secret: this.configService.get('GOOGLE_CLIENT_SECRET'),
      redirect_uri: this.configService.get('GOOGLE_REDIRECT_URI'),
      grant_type: 'authorization_code',
    });

    const user = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });

    const payload = {
      email: user.data.email,
      name: user.data.name,
      picture: user.data.picture,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      ...payload,
    };
  }
}
