import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { CreateArticleDTO, DeleteArticleDTO, UpdateArticleDTO } from 'src/dto/article.model';
import { UserEntity } from 'src/entities/user.entity';
import { ArticlesService } from './articles.service';

@Controller('article')
export class ArticlesController {


    constructor(private articleService: ArticlesService){}


    @Get()
    getAllArticles(@Query('take') take: number, @Query('skip') skip: number){
        return this.articleService.getAllArticles(take, skip)
    }



    @Post()
    @UseGuards(AuthGuard())
    createArcticle(@User() { email }: UserEntity, @Body(ValidationPipe) credentials: CreateArticleDTO){
        return this.articleService.createArticle(email, credentials)
    }

    @Put()
    @UseGuards(AuthGuard())
    updateArticle(@User() { email }: UserEntity, @Body(ValidationPipe) credentials: UpdateArticleDTO){
        return this.articleService.updateArticle(email, credentials)
    }

    @Delete()
    @UseGuards(AuthGuard())
    deleteArticle(@User() { email }: UserEntity, @Body() credential: DeleteArticleDTO){
        return this.articleService.deleteArticle(email, credential)
    }
}
