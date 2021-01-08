import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class UserSettingsEntity extends AbstractEntity {

    @Column({default: false})
    darkMode: boolean;


    @OneToMany(()=> UserEntity, entity => entity.blocked)
    @JoinColumn()
    blockedUsers: UserEntity[];

    @OneToOne(() => UserEntity)
    user: UserEntity;

}