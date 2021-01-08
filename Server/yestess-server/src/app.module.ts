import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { FileSystemModule } from './file-system/file-system.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      entities: [
        join(__dirname, '**', `*.entity.{ts,js}`),
        'dist/**/*.entity{.ts,.js}',
      ],
    }),
    AuthModule,
    ArticlesModule,
    CommentsModule,
    FileSystemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
