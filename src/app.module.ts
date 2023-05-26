import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CustomUuidScalar } from './utils/custom';
import GraphQLJSON from 'graphql-type-json';
import { ReservationService } from './reservations/reservation.service';
import { RestaurantService } from './restaurants/restaurant.service';
import { RestaurantsResolver } from './restaurants/restaurant.resolver';
import { ReservationResolver } from './reservations/reservation.resolver';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { jwt_secret } from './utils/constants';
import { UsersResolver } from './users/user.resolver';
import { UserService } from './users/user.service';
import { AuthResolver } from './auth/auth.resolver';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurant.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      cors: {
        origin: '*'
      },
      resolvers: { UUID: CustomUuidScalar, JSON: GraphQLJSON },
      buildSchemaOptions: {
        dateScalarMode: 'isoDate',
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      context: ({req}) => ({req})
    }),
    JwtModule.register({
      global: true,
      secret: jwt_secret,
      signOptions: { expiresIn: '20m' },
    }),
    AuthModule,
    UsersModule,
    RestaurantsModule,
    ReservationsModule
  ],
  providers: []
})
export class AppModule { }
