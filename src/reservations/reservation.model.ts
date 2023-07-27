import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Restaurant } from "src/restaurants/restaurant.model";
import { CustomUuidScalar } from "src/utils/custom";

export type ReservationDTO = Omit<Reservation, 'id' | 'createdAt' | 'restaurant'>;

@ObjectType()
export class Reservation {
    @Field(type => CustomUuidScalar)
    id: string;

    @Field()
    createdAt: string;

    @Field(type => CustomUuidScalar, { nullable: true })
    createdBy?: string;

    @Field()
    name: string;

    @Field()
    phoneNumber: string;

    @Field({ nullable: true })
    email?: string;

    @Field(type => Date)
    time: Date;

    @Field(type => Int)
    numGuests: number;

    @Field(type => CustomUuidScalar)
    restaurantId: string;

    @Field(type => Restaurant)
    restaurant: Restaurant;
}