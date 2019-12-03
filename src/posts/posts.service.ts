import { Injectable } from '@nestjs/common';
import { PostsMapper } from './posts.mapper';

@Injectable()
export class PostsService {

  constructor(
    private readonly postsMapper: PostsMapper,
  ) { }

  public async getPosts() {
    const IMG = 'https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/starwars-tros-dolbyposter-frontpage-700x337.jpg';

    const posts = [
      { title: 'My First Post', subtitle: 'Yooooo!', footer: 'testing footer text', image: IMG },
      { title: 'My Second Post', subtitle: 'Subtitle', footer: 'testing footer text', image: IMG },
      { title: 'My Third Post', subtitle: 'text here', footer: 'testing footer text', image: IMG },
      { title: 'My Fourth Post', subtitle: 'here also', footer: 'testing footer text', image: IMG },
      { title: 'My Fifth Post', subtitle: 'here we are', footer: 'testing footer text', image: IMG },
      { title: 'My Sixth Post', subtitle: 'text text text', footer: 'testing footer text', image: IMG },
      { title: 'My Seventh Post', subtitle: 'okay..', footer: 'testing footer text', image: IMG },
      { title: 'My Eighth Post', subtitle: 'are we done?', footer: 'testing footer text', image: IMG },
      { title: 'My Nineth Post', subtitle: '', footer: 'testing footer text', image: IMG },
    ];

    return this.postsMapper.map(posts);
  }

}
