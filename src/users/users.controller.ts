/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDTO } from './dto/signUp.dto';
import { User } from './models/User';
import { SignInDTO } from './dto/signIn.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('signup')
    @HttpCode(HttpStatus.OK)
    public async signUp(signUpDTO:SignUpDTO):Promise<User>{
        return this.usersService.signUp(signUpDTO);
    }

    @Post('signup')
    @HttpCode(200)
    public async signIn(@Body() signInDTO:SignInDTO):Promise<{name:string,jwtToken:string,email:string}>{
        return this.usersService.signIn(signInDTO);
    }

}
