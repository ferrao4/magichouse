import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post, PostAttachment, Comment, Reaction, User } from '../../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostAttachment, Comment, Reaction, User]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
