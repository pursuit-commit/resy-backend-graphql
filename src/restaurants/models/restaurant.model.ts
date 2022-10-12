import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { CustomUuidScalar } from '../../utils/custom';
import { Reservation } from '../../reservations/models/reservation.model';

export enum Price {
    p1 = '$',
    p2 = '$$',
    p3 = '$$$',
    p4 = '$$$$'
}
registerEnumType(Price, {
    name: 'Price'
});

export enum DiningRestriction {
    TakeoutOnly = 'Takeout Only',
    DeliveryOnly = 'Delivery Only'
}
registerEnumType(DiningRestriction, {
    name: 'DiningRestriction'
})

@ObjectType()
export class Restaurant {
    @Field(type => CustomUuidScalar)
    id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field({ nullable: true })
    phoneNumber?: string;

    @Field()
    openingTime: string;

    @Field()
    closingTime: string;

    @Field(type => Price)
    price: Price

    @Field()
    cuisine: string;

    @Field()
    location: string;

    @Field(type => DiningRestriction, { nullable: true })
    diningRestriction: DiningRestriction;

    @Field(type => GraphQLJSON, { nullable: true })
    tables?: JSON;

    @Field(type => [Reservation], { nullable: true })
    reservations?: Reservation[];
}