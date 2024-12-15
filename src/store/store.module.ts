import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/entity/store.entity';
import { Tag } from 'src/entity/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Tag])],
  controllers: [StoreController],
  providers: [StoreService]
})
export class StoreModule {}
