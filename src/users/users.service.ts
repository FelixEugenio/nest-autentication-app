/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './models/User';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDTO } from './dto/signUp.dto';
@Injectable()
export class UsersService {

    //criando constructor para injetar o model
    constructor(
        @InjectModel('User') 
        private readonly userModel: Model<User>,
        private readonly authService: AuthService
    ) {} 

    public async signUp(signUpDTO:SignUpDTO):Promise<User>{
       const user = new this.userModel(signUpDTO);
       return user.save();
    }

}
