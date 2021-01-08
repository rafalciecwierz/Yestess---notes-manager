import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginDTO, UserRegisterDTO } from 'src/dto/user.model';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ){}

    async login({email, password}: UserLoginDTO){
        try{
            const user = await UserEntity.createQueryBuilder('user')
                .where({ email })
                .getOne();
            // const user = await this.userRepository.findOne({where: { email }, relations: ['teams', 'teams.team' , 'managing', 'organizing']});
            const isValid = await user.comparePassword(password);
            if( user && isValid){
                const payload = { email: user.email };
                const token = this.jwtService.sign(payload);
                return { user: {...user.toJSON(), token } };
            }
            throw new UnauthorizedException('Invalid Credentials');
        }
        catch(err){
            throw new UnauthorizedException('Invalid credentials');
        }
    }


    async register(credentials: UserRegisterDTO){
        try{
            const user = this.userRepository.create(credentials);
            await user.save();
            const payload = { email: user.email };
            const token = this.jwtService.sign(payload);
            return { user: { ...user.toJSON(), token } };
        }
        catch(err){
            if(err.code === '23505'){
                throw new ConflictException('Username has already been taken');
            }
            throw new InternalServerErrorException(err);
        }
    }
}
