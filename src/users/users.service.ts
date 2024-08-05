/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './models/User';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UsersService {

    //criando constructor para injetar o model
    constructor(
        @InjectModel('User') 
        private readonly userModel: Model<User>,
        private readonly authService: AuthService
    ) {} 

    

}
