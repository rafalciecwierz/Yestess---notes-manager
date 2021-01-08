import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDTO } from 'src/dto/comment.model';
import { ArticleEntity } from 'src/entities/article.entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>,
        @InjectRepository(ArticleEntity) private articleRepository: Repository<ArticleEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ){}

    async getAllComments() {
        return await this.commentRepository.find({relations: ['author']});
    }

    async createComment(email: string, credentials: CreateCommentDTO) {
        try{
            const comment = this.commentRepository.create({text: credentials.text})
            const article = await this.articleRepository.findOne({ where: {id: credentials.articleId }});
            const user = await this.userRepository.findOne({where: { email } })
            comment.author = user;
            comment.article = article;
            const newComment = await comment.save()
            return newComment;
        } catch(err){
            throw new InternalServerErrorException(err);
        }
    }
    updateComment(email: any, credentials: any) {
        throw new Error('Method not implemented.');
    }
    deleteComment(email: any, credential: any) {
        throw new Error('Method not implemented.');
    }
}
