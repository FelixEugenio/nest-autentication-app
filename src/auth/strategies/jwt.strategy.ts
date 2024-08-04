/* eslint-disable prettier/prettier */
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import {Strategy} from 'passport-jwt'
import { AuthService } from "../auth.service";
import { JwtPayload } from '../models/jwt-payload.model';
import { User } from "src/users/models/User";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService: AuthService
    ){
        super({
            jwtFromRequest:authService.returnJwtExtractor(),
            ignoreExpiration: false,
            secretOrKey:process.env.JWT_SECRET
        })
    }

    public async validate(jwtPayload:JwtPayload):Promise<User>{
        const user = await this.authService.validateUser(jwtPayload)
        if(!user){
        throw new UnauthorizedException()
        }
         
        return user;
    }
}

