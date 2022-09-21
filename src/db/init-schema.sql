CREATE TYPE dining_option AS ENUM ('Delivery Only', 'Takeout Only');
CREATE TYPE price AS ENUM ('$', '$$', '$$$', '$$$$');

CREATE TABLE IF NOT EXISTS "Restaurants" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "description" text NOT NULL,
    "phoneNumber" varchar(255),
    "openingTime" TIME NOT NULL,
    "closingTime" TIME NOT NULL,
    "location" text NOT NULL,
    "cuisine" text NOT NULL,
    "price" price,
    "diningRestriction" dining_option,  
    "tables" jsonb
);

CREATE TABLE IF NOT EXISTS "Reservations" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "phoneNumber" varchar(255) NOT NULL,
    "email" varchar(255),
    "time" TIMESTAMP NOT NULL,
    "numGuests" int NOT NULL,
    "restaurantId" uuid NOT NULL REFERENCES "Restaurants" (id) ON DELETE CASCADE 
); 

