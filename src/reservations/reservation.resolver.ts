import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import GraphQLJSON from "graphql-type-json";
import { Restaurant } from "src/restaurants/restaurant.model";
import { RestaurantService } from "src/restaurants/restaurant.service";
import { ReservationService } from "./reservation.service";
import { CustomUuidScalar } from "../utils/custom";
import { Reservation, ReservationDTO } from "./reservation.model";
import { Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/auth.guard";

@Resolver(of => Reservation)
// @UseGuards(JwtAuthGuard)
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
  async newReservation(@Args('reservationData', { type: () => GraphQLJSON }) reservationData: ReservationDTO) {
    return this.reservationService.makeReservation(reservationData);
  }

  @ResolveField('restaurant', returns => Restaurant)
  async restaurant(@Parent() reservation: Reservation) {
    const { restaurantId } = reservation;
    return this.restaurantService.getRestaurantById(restaurantId);
  }
}