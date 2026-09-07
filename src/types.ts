export interface FlightInfo {
  id: string;
  flightNumber: string;
  airline: string;
  route: string;
  origin: {
    city: string;
    code: string;
    terminal: string;
  };
  destination: {
    city: string;
    code: string;
    terminal: string;
  };
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business Class' | 'First Class';
  seat: string;
  passengerName: string;
  bookingRef: string; // PNR
  aircraft: string;
  cateringDeadlineHours: number;
}

export interface MealItem {
  id: string;
  name: string;
  category: 'poultry' | 'beef' | 'seafood' | 'vegetarian' | 'vegan' | 'breakfast';
  serviceType: 'dinner' | 'breakfast' | 'snack';
  description: string;
  detailedIngredients: string[];
  calories: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  tags: string[];
  allergens: string[];
  pairing: string;
  imageUrl: string;
  chefQuote?: string;
  isChefSpecial?: boolean;
}

export interface MealService {
  id: string;
  title: string;
  servingWindow: string;
  description: string;
  items: MealItem[];
}

export interface SpecialMeal {
  code: string; // e.g. 'MOML', 'VGML', 'HNML'
  name: string;
  category: 'religious' | 'vegetarian' | 'medical' | 'child';
  badgeColor: string;
  description: string;
  certifiedBy: string;
  typicalContents: string;
  excludedItems: string[];
  recommendedFor: string;
}

export interface MiscRequestItem {
  id: string;
  title: string;
  category: 'timing' | 'galley_extras' | 'condiments' | 'special_occasion';
  description: string;
  iconName: string;
  defaultSelected?: boolean;
  guaranteedNote: string;
}

export interface PassengerSelection {
  selectedMeals: Record<string, string>; // serviceId -> mealItemId
  specialMealCode: string | null;
  specialMealApplyAll: boolean;
  severeAllergies: string[];
  customAllergyNote: string;
  miscRequestIds: string[];
  miscCustomNote: string;
  diningPace: 'standard' | 'express' | 'delayed';
  wakeUpForMeal: boolean;
  orderTimestamp: string;
  confirmationNumber: string;
  orderStatus: 'CONFIRMED' | 'TRANSMITTED_TO_GALLEY' | 'PREPARING';
}
