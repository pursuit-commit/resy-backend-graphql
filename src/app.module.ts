import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CustomUuidScalar } from './utils/custom';
import GraphQLJSON from 'graphql-type-json';
import { ReservationService } from './services/reservation.service';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantsResolver } from './restaurants/restaurant.resolver';
import { ReservationResolver } from './reservations/reservation.resolver';

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
    }),
  ],
  providers: [
    ReservationService,
    RestaurantService,
    RestaurantsResolver,
    ReservationResolver
  ]
})
export class AppModule { }
