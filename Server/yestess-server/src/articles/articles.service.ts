import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArticleDTO, DeleteArticleDTO, UpdateArticleDTO } from 'src/dto/article.model';
import { ArticleEntity } from 'src/entities/article.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesService {

    constructor(@InjectRepository(ArticleEntity) private articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ){}


    async getAllArticles(take: number, skip: number) {
        return await ArticleEntity.find({
            relations: ['author', 'comments'],
            take: take || 10,
            skip: skip || 0
        });
    }

    async createArticle(email: string, credentials: CreateArticleDTO) {

        try{
            const article = this.articleRepository.create(credentials);
            const user = await this.userRepository.findOne({where: { email } })
            article.author = user;
            return await article.save()
        } catch(err){
            throw new InternalServerErrorException(err);
        }
    }

    async updateArticle(email: string, credentials: UpdateArticleDTO) {
        try{
            const article = await this.articleRepository.findOne({where: { id: credentials.id }, relations:['author']});
            if(email !== article.author.email){
                throw new UnauthorizedException();
            } else {
                article.title ? article.title=credentials.title : null;
                article.text ? article.text = credentials.title : null;
                return await article.save()
            }
        } catch(err){
            throw new InternalServerErrorException(err);
        }
    }

    async deleteArticle(email: string, credentials: DeleteArticleDTO) {
        try{
            const article = await this.articleRepository.findOne({where: {id: credentials.id}, relations:['author']});

            if(!article) throw new NotFoundException();
            if(email !== article.author.email){
                throw new UnauthorizedException();
            } else {
                return await article.remove();
            }
        } catch(err){
            throw new InternalServerErrorException(err);
        }
    }
}
