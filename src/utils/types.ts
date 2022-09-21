export interface RestaurantSearchFilters {
    diningRestriction?: 'Delivery Only' | 'Takeout Only';
    price?: ('$' | '$$' | '$$$' | '$$$$') | ('$' | '$$' | '$$$' | '$$$$')[];
    cuisine?: string | string[];
    location?: string | string[];
}

export interface TableConfig {
    twoPersonTables: number;
    fourPersonTables: number;
    eightPersonTables: number;
}