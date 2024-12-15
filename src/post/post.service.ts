import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entity/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) {}

  async findEachEveryLatest(page: number, size: number) {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .distinctOn(['post.store_id'])
      .orderBy('post.created_at')
      .getMany();

    return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findTaggedLatest() {

  }

  async findTaggedRelevance() {

  }

  async findOneById() {

  }
}
