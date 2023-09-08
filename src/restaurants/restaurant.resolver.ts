import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import GraphQLJSON from "graphql-type-json";
import { Reservation } from "src/reservations/reservation.model";
import { ReservationService } from "src/reservations/reservation.service";
import { RestaurantService } from "src/restaurants/restaurant.service";
import { CustomUuidScalar } from "src/utils/custom";
import { Restaurant } from "./restaurant.model";
import { NotFoundException, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/auth.guard";
import { Roles, RolesGuard } from "src/auth/guards/roles.guard";
import { Role } from "src/users/user.model";
 
@Resolver(of => Restaurant)
export class RestaurantsResolver {
  constructor(
    private restaurantService: RestaurantService,
    private reservationService: ReservationService,
  ) { }

  @Query(returns => Restaurant)
  async restaurant(@Args('id', { type: () => CustomUuidScalar }) id: string) {
    const restaurant = await this.restaurantService.getRestaurantById(id);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant;
  }

  @Query(returns => [Restaurant])
  async restaurants() {    
    return this.restaurantService.getRestaurants({});
  }

  @Mutation(returns => Restaurant)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async newRestaurant(@Args({ name: 'restaurantData', type: () => GraphQLJSON }) restaurantData: Omit<Restaurant, 'id'>) {
    return this.restaurantService.addRestaurant(restaurantData);
  }

  @Mutation(returns => CustomUuidScalar, { nullable: true })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async deleteRestuarant(@Args({ name: 'id', type: () => CustomUuidScalar }) restaurantId: string) {
    return this.restaurantService.deleteRestaurant(restaurantId);
  }

  @Mutation(returns => Restaurant)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async updateRestaurant(
    @Args({ name: 'id', type: () => CustomUuidScalar }) id: string,
    @Args({ name: 'updateData', type: () => GraphQLJSON }) updateData: Partial<Omit<Restaurant, 'id'>>) {
    return this.restaurantService.updateRestaurantById(id, updateData);
  }

  @ResolveField('reservations', returns => [Reservation])
  async reservations(@Parent() restaurant: Restaurant) {
    const { id } = restaurant;
    return this.reservationService.getReservationsByRestaurantId(id);
  }
}