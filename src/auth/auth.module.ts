import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwt_secret } from '../utils/constants';

@Module({
  imports: [
    UsersModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: jwt_secret,
      signOptions: { expiresIn: '10 days' },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
})
export class AuthModule { }
