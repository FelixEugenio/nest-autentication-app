/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './models/User';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDTO } from './dto/signUp.dto';
import { SignInDTO } from './dto/signIn.dto';
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

    public async signIn(signInDTO:SignInDTO):Promise<{name:string,jwtToken:string,email:string}>{
         const user = await this.findByEmail(signInDTO.email);
         const isMatch = await this.checkPassword(signInDTO.password,user);
         if(!isMatch){
             throw new NotFoundException('Invalid Credentials');
         }
         const jwtToken = await this.authService.createAccessToken(user._id as string);
         return {name:user.name,jwtToken,email:user.email}
    }

    private async findByEmail(email:string):Promise<User>{
        const user = await this.userModel.findOne({email});
        if(!user){
            throw new NotFoundException('User not found');
        }
        return user;
    }   
    
    private async checkPassword(password:string,user:User):Promise<boolean>{
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            throw new NotFoundException('Wrong password');
        }
        return isMatch;
    }

    public async findAll():Promise<User[]>{
        return this.userModel.find();
    }
     

}
