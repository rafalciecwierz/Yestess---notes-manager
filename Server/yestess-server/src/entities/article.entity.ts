import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { CommentEntity } from "./comment.entity";
import { UserEntity } from "./user.entity";


@Entity()
export class ArticleEntity extends AbstractEntity {

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToOne(() => UserEntity, entity => entity.articles)
    author: UserEntity;

    @OneToMany(() => CommentEntity, entity => entity.article)
    comments: CommentEntity[];
}