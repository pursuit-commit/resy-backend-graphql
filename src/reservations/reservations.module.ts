import { Module } from '@nestjs/common';
import { ReservationResolver } from './reservation.resolver';
import { ReservationService } from './reservation.service';
import { RestaurantService } from 'src/restaurants/restaurant.service';

@Module({
  providers: [
    ReservationService,
    ReservationResolver,
    RestaurantService
  ],
  exports: [ReservationService],
})
export class ReservationsModule { }