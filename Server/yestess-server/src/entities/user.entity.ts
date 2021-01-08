import * as bcrypt from 'bcryptjs';
import { classToPlain, Exclude } from "class-transformer";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { ArticleEntity } from "./article.entity";
import { CommentEntity } from "./comment.entity";
import { UserSettingsEntity } from "./user-settings.entity";

@Entity()
export class UserEntity extends AbstractEntity{

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude()
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


    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

    toJSON(){
        return classToPlain(this);
    }

    async comparePassword(attempt: string){
        return await bcrypt.compare(attempt, this.password);
    }
}