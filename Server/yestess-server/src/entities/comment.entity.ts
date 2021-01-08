import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { ArticleEntity } from "./article.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class CommentEntity extends AbstractEntity {


    @Column()
    text: string;

    @ManyToOne(() => UserEntity, entity => entity.comments)
    author: UserEntity;

    @ManyToOne(() => ArticleEntity, entity => entity.comments)
    article: ArticleEntity;
}