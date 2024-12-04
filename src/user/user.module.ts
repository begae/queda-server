import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

const UserMockService = {
  findAll: () => {
    return 'find mock users';
  },
};

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [{ provide: UserService, useValue: UserMockService }],
  exports: [UserService],
})
export class UserModule {}
