import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import GraphQLJSON from "graphql-type-json";
import { Restaurant } from "src/restaurants/models/restaurant.model";
import { RestaurantService } from "src/services/restaurant.service";
import { ReservationService } from "../services/reservation.service";
import { CustomUuidScalar } from "../utils/custom";
import { Reservation } from "./models/reservation.model";

@Resolver(of => Reservation)
export class ReservationResolver {
  constructor(
    private reservationService: ReservationService,
    private restaurantService: RestaurantService
  ) {}

  @Query(returns => [Reservation])
  async reservations() {
    return this.reservationService.getReservations({});
  }

  @Query(returns => Reservation)
  async reservation(@Args('id', { type: () => CustomUuidScalar }) id: string) {
      return this.reservationService.getReservationById(id);
  }

  @Mutation(returns => Reservation)
  async newReservation(@Args('reservationData', { type: () => GraphQLJSON }) reservationData: Omit<Reservation, 'id'>) {
    return this.reservationService.makeReservation(reservationData);
  }

  @ResolveField('restaurant', returns => Restaurant)
  async restaurant(@Parent() reservation: Reservation) {
    const { restaurantId } = reservation;
    return this.restaurantService.getRestaurantById(restaurantId);
  }
}