import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller()
export class PostsController {

  constructor(
    private readonly postsService: PostsService,
  ) { }

  @Get()
  async testMapper() {
    return this.postsService.getPosts();
  }

}
