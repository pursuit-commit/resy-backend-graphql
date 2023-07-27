CREATE TYPE dining_option AS ENUM ('Delivery Only', 'Takeout Only');
CREATE TYPE price AS ENUM ('$', '$$', '$$$', '$$$$');
CREATE TYPE role AS ENUM ('ADMIN', 'OWNER', 'USER');

CREATE TABLE IF NOT EXISTS "Users" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "username" text NOT NULL,
    "passwordHash" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "UserRoles" (
    "userId" uuid REFERENCES "Users" (id) ON DELETE CASCADE,
    "role" role NOT NULL,
    PRIMARY KEY ("userId", "role")
);

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
    "name" text NOT NULL, 
    "phoneNumber" varchar(255) NOT NULL,
    "email" varchar(255),
    "time" TIMESTAMP NOT NULL,
    "numGuests" int NOT NULL,
    "createdBy" uuid REFERENCES "Users" (id) ON DELETE CASCADE,
    "restaurantId" uuid NOT NULL REFERENCES "Restaurants" (id) ON DELETE CASCADE 
); 

