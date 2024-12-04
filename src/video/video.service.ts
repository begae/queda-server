import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entity/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video) private videoRepository: Repository<Video>,
  ) {}

  async create() {
    return 'create';
  }

  async findAll() {
    return 'find all videos';
  }

  async findOne(id: string) {
    return 'video';
  }

  async download(id: string) {
    return 'play';
  }
}
