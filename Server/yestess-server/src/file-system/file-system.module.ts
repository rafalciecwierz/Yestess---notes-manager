import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ArticleEntity } from 'src/entities/article.entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { UserEntity } from 'src/entities/user.entity';
import { FileSystemController } from './file-system.controller';
import { FileSystemService } from './file-system.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity, CommentEntity]), AuthModule],
  controllers: [FileSystemController],
  providers: [FileSystemService]
})
export class FileSystemModule {}
