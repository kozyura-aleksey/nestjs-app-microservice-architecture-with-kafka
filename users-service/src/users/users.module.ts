import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), UsersService],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [SequelizeModule],
})
export class UsersModule {}
