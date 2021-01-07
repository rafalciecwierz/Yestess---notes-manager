import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity()
export class UserEntity extends AbstractEntity{

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    surname: string;

    @Column({default: ''})
    nickname: string;
}