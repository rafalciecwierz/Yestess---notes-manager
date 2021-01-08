import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { ArticleEntity } from "./article.entity";
import { CommentEntity } from "./comment.entity";
import { UserSettingsEntity } from "./user-settings.entity";

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

    @OneToOne(() => UserSettingsEntity)
    @JoinColumn()
    settings: UserSettingsEntity;

    @OneToMany(() => ArticleEntity, entity => entity.author)
    articles: ArticleEntity[];

    @OneToMany(() => CommentEntity, entity => entity.author)
    comments: CommentEntity[];

    @ManyToOne(()=> UserSettingsEntity, entity=>entity.blockedUsers)
    blocked: UserSettingsEntity;
}