import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/entity/store.entity';
import { Tag } from 'src/entity/tag.entity';
import { Profile } from 'src/entity/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Profile, Tag])],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
