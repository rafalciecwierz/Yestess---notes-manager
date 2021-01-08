import { Body, Controller, Delete, Get, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { CreateCommentDTO, DeleteCommentDTO, UpdateCommentDTO } from 'src/dto/comment.model';
import { UserEntity } from 'src/entities/user.entity';
import { CommentsService } from './comments.service';

@Controller('comment')
export class CommentsController {

    constructor(private commentService: CommentsService){}


    @Get()
    getAllComments(){
        return this.commentService.getAllComments()
    }


    @Post()
    @UseGuards(AuthGuard())
    createComment(@User() { email }: UserEntity, @Body(ValidationPipe) credentials: CreateCommentDTO){
        return this.commentService.createComment(email, credentials)
    }

    @Put()
    @UseGuards(AuthGuard())
    updateComment(@User() { email }: UserEntity, @Body(ValidationPipe) credentials: UpdateCommentDTO){
        return this.commentService.updateComment(email, credentials)
    }

    @Delete()
    @UseGuards(AuthGuard())
    deleteComment(@User() { email }: UserEntity, @Body() credential: DeleteCommentDTO){
        return this.commentService.deleteComment(email, credential)
    }
}
