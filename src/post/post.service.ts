import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entity/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async findOneById() {}

  async findFollowingEveryLatest(following: string[]) {
    const posts = await this.postRepository
      .createQueryBuilder()
      .where('post.store_id IN (:...following)', { following })
      .orderBy('post.created_at')
      .getMany();

    return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
