/* eslint-disable prettier/prettier */
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import {Strategy} from 'passport-jwt'
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService: AuthService
    ){
        super({
            jwtFromRequest:authService.returnJwtExtractor(),
            
        })
    }
}

