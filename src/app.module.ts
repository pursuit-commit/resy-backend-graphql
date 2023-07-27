import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CustomUuidScalar } from './utils/custom';
import GraphQLJSON from 'graphql-type-json';
import { JwtModule } from '@nestjs/jwt';
import { jwt_secret } from './utils/constants';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurant.module';
import { ReservationsModule } from './reservations/reservations.module';
import { PassportModule } from '@nestjs/passport';

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
    AuthModule,
    UsersModule,
    RestaurantsModule,
    ReservationsModule
  ],
  providers: []
})
export class AppModule { }
