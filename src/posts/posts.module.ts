import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { PostsMapper } from './posts.mapper';
import { POSTS } from '@schemas';

const Schemas = [POSTS]

@Module({
  imports: [MongooseModule.forFeature(Schemas), PassportModule],
  providers: [PostsService, PostsMapper],
  controllers: [PostsController],
})
export class PostsModule {}
