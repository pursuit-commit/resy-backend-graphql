import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersResolver } from './user.resolver';

@Module({
  providers: [
    UsersResolver,
    UserService,
  ],
  exports: [UserService],
})
export class UsersModule { }