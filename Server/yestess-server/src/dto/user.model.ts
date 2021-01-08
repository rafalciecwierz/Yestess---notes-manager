import { IsEmail, IsString, min, MinLength } from "class-validator";

export class UserRegisterDTO {


    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    surname: string;

}


export class UserLoginDTO {

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    password: string;

}

export interface AuthPayload{

    email: string;
}