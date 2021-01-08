import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthPayload } from "src/dto/user.model";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(

        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ){
        super({
            jwtFromRequest:  ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
            secretOrKey: process.env.SECRET,
        });
    }

    async validate(payload: AuthPayload){
        const { email } = payload;
        const user = this.userRepository.find({ where: { email } });
        if (!user){
            throw new UnauthorizedException();
        }
        return user;
    }

}