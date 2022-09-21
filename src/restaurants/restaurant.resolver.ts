import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import GraphQLJSON from "graphql-type-json";
import { Reservation } from "src/reservations/models/reservation.model";
import { ReservationService } from "src/services/reservation.service";
import { RestaurantService } from "src/services/restaurant.service";
import { CustomUuidScalar } from "src/utils/custom";
import { Restaurant } from "./models/restaurant.model";

@Resolver(of => Restaurant)
export class RestaurantsResolver {
  constructor(
    private restaurantService: RestaurantService,
    private reservationService: ReservationService,
  ) { }

  @Query(returns => Restaurant)
  async restaurant(@Args('id', { type: () => CustomUuidScalar }) id: string) {
    return this.restaurantService.getRestaurantById(id);
  }

  @Query(returns => [Restaurant])
  async restaurants() {
    return this.restaurantService.getRestaurants({});
  }

  @Mutation(returns => Restaurant)
  async newRestaurant(@Args({ name: 'restaurantData', type: () => GraphQLJSON }) restaurantData: Omit<Restaurant, 'id'>) {
    return this.restaurantService.addRestaurant(restaurantData);
  }

  @Mutation(returns => CustomUuidScalar, { nullable: true })
  async deleteRestuarant(@Args({ name: 'id', type: () => CustomUuidScalar }) restaurantId: string) {
    return this.restaurantService.deleteRestaurant(restaurantId);
  }

  @Mutation(returns => Restaurant)
  async updateRestaurant(
    @Args({ name: 'id', type: () => CustomUuidScalar }) id: string,
    @Args({ name: 'updateData', type: () => GraphQLJSON }) updateData: Partial<Omit<Restaurant, 'id'>>) {
    return this.restaurantService.updateRestaurantById(id, updateData);
  }

  @ResolveField('reservations', returns => [Reservation])
  async reservations(@Parent() restaurant: Restaurant) {
    const { id } = restaurant;
    console.log(id)
    return this.reservationService.getReservationsByRestaurantId(id);
  }
}