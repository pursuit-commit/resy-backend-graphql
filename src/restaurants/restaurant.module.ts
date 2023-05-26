import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantsResolver } from './restaurant.resolver';
import { ReservationService } from 'src/reservations/reservation.service';

@Module({
  providers: [
    RestaurantService,
    RestaurantsResolver,
    ReservationService
  ],
  exports: [RestaurantService],
})
export class RestaurantsModule { }