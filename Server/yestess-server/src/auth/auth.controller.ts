import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserLoginDTO, UserRegisterDTO } from 'src/dto/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}


    @Post('/register')
    registerUser(@Body(ValidationPipe) credentials: UserRegisterDTO){
        return this.authService.register(credentials);
    }


    @Post('/login')
    loginUser(@Body(ValidationPipe) credentials: UserLoginDTO){
        return this.authService.login(credentials)
    }


}
