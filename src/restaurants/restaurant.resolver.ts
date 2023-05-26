import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import GraphQLJSON from "graphql-type-json";
import { Reservation } from "src/reservations/reservation.model";
import { ReservationService } from "src/reservations/reservation.service";
import { RestaurantService } from "src/restaurants/restaurant.service";
import { CustomUuidScalar } from "src/utils/custom";
import { Restaurant } from "./restaurant.model";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/auth.guard";
 
@Resolver(of => Restaurant)
export class RestaurantsResolver {
  constructor(
    private restaurantService: RestaurantService,
    private reservationService: ReservationService,
  ) { }

  @Query(returns => Restaurant)
  // app.get('/restaurants/:id', async (req, res) => {
  async restaurant(@Args('id', { type: () => CustomUuidScalar }) id: string) {
    return this.restaurantService.getRestaurantById(id);
  }

  @Query(returns => [Restaurant])
  // app.get('/restaurants', async (req, res) => {
  async restaurants() {
    return this.restaurantService.getRestaurants({});
  }

  /**
   * Function to add a new restaurant to the system
   * @Input Expects a restaurant object in JSON format
   * @Output Returns a new restaurant
   */
  @Mutation(returns => Restaurant)
  @UseGuards(JwtAuthGuard)
  // app.post('/restaurants', async (req, res) => {
  async newRestaurant(@Args({ name: 'restaurantData', type: () => GraphQLJSON }) restaurantData: Omit<Restaurant, 'id'>) {
    return this.restaurantService.addRestaurant(restaurantData);
  }

  @Mutation(returns => CustomUuidScalar, { nullable: true })
  @UseGuards(JwtAuthGuard)
  // app.delete('/restaurants/:id', async (req, res) => {
  async deleteRestuarant(@Args({ name: 'id', type: () => CustomUuidScalar }) restaurantId: string) {
    return this.restaurantService.deleteRestaurant(restaurantId);
  }

  @Mutation(returns => Restaurant)
  @UseGuards(JwtAuthGuard)
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