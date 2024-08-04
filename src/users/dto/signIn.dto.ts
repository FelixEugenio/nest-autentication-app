/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

/* eslint-disable prettier/prettier */
export class SignInDTO{
    
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password: string
}