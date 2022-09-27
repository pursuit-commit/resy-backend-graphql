import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import GraphQLJSON from "graphql-type-json";
import { ReservationService } from "../services/reservation.service";
import { CustomUuidScalar } from "../utils/custom";
import { Reservation } from "./models/reservation.model";

@Resolver(of => Reservation)
export class ReservationResolver {
  constructor(
    private reservationService: ReservationService
  ) {}

  @Query(returns => Reservation)
  async reservation(@Args('id', { type: () => CustomUuidScalar }) id: string) {
      return this.reservationService.getReservationById(id);
  }

  @Mutation(returns => Reservation)
  async newReservation(@Args('reservationData', { type: () => GraphQLJSON }) reservationData: Omit<Reservation, 'id'>) {
    return this.reservationService.makeReservation(reservationData);
  }
}