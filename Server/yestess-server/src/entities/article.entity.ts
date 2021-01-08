import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { UserEntity } from "./user.entity";


@Entity()
export class ArticleEntity extends AbstractEntity {

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToOne(() => UserEntity, entity => entity.articles)
    author: UserEntity;
}