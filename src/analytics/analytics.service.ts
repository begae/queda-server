import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { VideoService } from 'src/video/video.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly videoService: VideoService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async handleEmailCron() {
    Logger.log('Email task called');
    const videos = await this.videoService.findTop5Downloads();
    return videos;
  }
}
