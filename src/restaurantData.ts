import restaurantData from "./resources/restaurants.json";
import { restaurantImageCredits, type RestaurantImageCreditId } from "./restaurantImageCredits";

export const foodCategories = [
  "American",
  "Seafood",
  "Steakhouse",
  "Italian",
  "Mexican",
  "Asian",
  "Mediterranean",
  "BBQ",
  "Pizza",
  "Cafe",
  "Fine Dining",
  "Bars & Breweries",
] as const;

export const neighborhoodAreas = [
  "Downtown Tampa",
  "Historic Tampa",
  "South Tampa",
  "Westshore",
  "North Tampa",
  "East Hillsborough",
  "St. Petersburg",
  "Clearwater",
  "Gulf Beaches",
  "North Pinellas",
] as const;

export type FoodCategory = (typeof foodCategories)[number];
export type NeighborhoodArea = (typeof neighborhoodAreas)[number];

export type Restaurant = {
  name: string;
  neighborhood: string;
  area: NeighborhoodArea;
  cuisine: string;
  foodCategories: FoodCategory[];
  description: string;
  url: string;
  imageCredits: RestaurantImageCreditId[];
};

const foodCategorySet = new Set<string>(foodCategories);
const neighborhoodAreaSet = new Set<string>(neighborhoodAreas);

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isFoodCategoryArray(value: unknown): value is FoodCategory[] {
  return isStringArray(value) && value.every((category) => foodCategorySet.has(category));
}

function isImageCreditId(value: string): value is RestaurantImageCreditId {
  return Object.prototype.hasOwnProperty.call(restaurantImageCredits, value);
}

function isImageCreditIdArray(value: unknown): value is RestaurantImageCreditId[] {
  return isStringArray(value) && value.every(isImageCreditId);
}

function isRestaurant(value: unknown): value is Restaurant {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.name === "string" &&
    typeof record.neighborhood === "string" &&
    typeof record.area === "string" &&
    neighborhoodAreaSet.has(record.area) &&
    typeof record.cuisine === "string" &&
    isFoodCategoryArray(record.foodCategories) &&
    typeof record.description === "string" &&
    typeof record.url === "string" &&
    isImageCreditIdArray(record.imageCredits)
  );
}

export const restaurants: Restaurant[] = restaurantData.map((restaurant, index) => {
  if (!isRestaurant(restaurant)) {
    throw new Error(`Invalid restaurant data at index ${index} in resources/resturents.json.`);
  }

  return restaurant;
});
