import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AppService {
  getHello(): string {
    const user = new UserEntity();
    user.email="siema@o2.pl",
    user.firstName = "rafcio",
    user.password= "test",
    user.surname="C",
    user.save();
    return 'Hello World!';
  }
}
