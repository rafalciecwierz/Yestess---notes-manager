import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class CommentEntity extends AbstractEntity {


    @Column()
    text: string;

    @ManyToOne(() => UserEntity, entity => entity.comments)
    author: UserEntity;
}