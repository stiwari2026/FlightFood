import { FlightInfo, MealService, SpecialMeal, MiscRequestItem } from '../types';

export const mockFlights: FlightInfo[] = [
  {
    id: 'fl-842',
    flightNumber: 'SW-842',
    airline: 'SkyWings International',
    route: 'New York (JFK) ➔ London Heathrow (LHR)',
    origin: {
      city: 'New York',
      code: 'JFK',
      terminal: 'Terminal 4',
    },
    destination: {
      city: 'London',
      code: 'LHR',
      terminal: 'Terminal 2',
    },
    departureDate: 'Tomorrow, Oct 14',
    departureTime: '19:45 EST',
    arrivalTime: '07:40 GMT (+1 day)',
    duration: '6h 55m',
    cabinClass: 'Premium Economy',
    seat: '14A • Window',
    passengerName: 'Elena Rostova',
    bookingRef: 'W89KL2',
    aircraft: 'Boeing 787-9 Dreamliner',
    cateringDeadlineHours: 18,
  },
  {
    id: 'fl-510',
    flightNumber: 'PA-510',
    airline: 'Pacific Aero',
    route: 'San Francisco (SFO) ➔ Tokyo Haneda (HND)',
    origin: {
      city: 'San Francisco',
      code: 'SFO',
      terminal: 'International Terminal G',
    },
    destination: {
      city: 'Tokyo',
      code: 'HND',
      terminal: 'Terminal 3',
    },
    departureDate: 'Friday, Oct 16',
    departureTime: '11:15 PST',
    arrivalTime: '14:25 JST (+1 day)',
    duration: '11h 10m',
    cabinClass: 'Business Class',
    seat: '04K • Solo Suite',
    passengerName: 'Elena Rostova',
    bookingRef: 'TY93M4',
    aircraft: 'Airbus A350-900',
    cateringDeadlineHours: 32,
  }
];

export const mockMealServices: MealService[] = [
  {
    id: 'service-dinner',
    title: 'Service 1: Main Evening Dinner',
    servingWindow: 'Approx. 55 minutes after takeoff (Cruising 36,000 ft)',
    description: 'Freshly prepared multi-course in-flight dining curated by Executive In-Flight Chef Marc Laurent. Served with warm artisan sourdough and compound herb butter.',
    items: [
      {
        id: 'dinner-beef',
        name: 'Braised Angus Beef Short Rib',
        category: 'beef',
        serviceType: 'dinner',
        description: 'Slow-cooked for 14 hours in red wine reduction with thyme, creamy white truffle polenta, roasted heirloom carrots, and sautéed rainbow chard.',
        detailedIngredients: ['Angus Beef Chuck Short Rib', 'Pinot Noir Glaze', 'White Truffle Infused Polenta', 'Heirloom Carrots', 'Baby Rainbow Chard', 'Fresh Rosemary'],
        calories: 680,
        proteinGrams: 46,
        carbGrams: 32,
        fatGrams: 28,
        tags: ['Chef Signature', 'High-Protein', 'Halal-Friendly Beef'],
        allergens: ['Dairy (Butter/Polenta)', 'Sulphites (Reduction)'],
        pairing: '2020 Saint-Émilion Grand Cru Bordeaux',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        chefQuote: 'The slow reduction retains incredible moisture even in dry pressurized cabin altitudes.',
        isChefSpecial: true,
      },
      {
        id: 'dinner-salmon',
        name: 'Pan-Seared Scottish Salmon Supreme',
        category: 'seafood',
        serviceType: 'dinner',
        description: 'Sustainably sourced fillet with lemon-dill velouté, crushed fingerling potatoes, grilled asparagus tips, and sweet confit cherry tomatoes.',
        detailedIngredients: ['Scottish Atlantic Salmon', 'Crushed Fingerling Potatoes', 'Green Asparagus', 'Lemon Zest', 'Dill Velouté', 'Cold-Pressed Olive Oil'],
        calories: 540,
        proteinGrams: 42,
        carbGrams: 28,
        fatGrams: 22,
        tags: ['Gluten-Friendly', 'Heart-Healthy', 'Omega-3 Rich'],
        allergens: ['Fish', 'Dairy (Velouté)'],
        pairing: '2022 Cloudy Bay Sauvignon Blanc, Marlborough',
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
        chefQuote: 'Seared lightly to preserve the delicate, flaky texture and natural ocean richness.',
      },
      {
        id: 'dinner-chicken',
        name: 'Herb-Roasted Corn-Fed Chicken Breast',
        category: 'poultry',
        serviceType: 'dinner',
        description: 'Free-range chicken supreme stuffed with wild mushroom duxelles, served alongside roasted garlic mousseline and tender buttered broccolini.',
        detailedIngredients: ['Free-Range Corn-Fed Chicken', 'Wild Morel & Cremini Mushrooms', 'Yukon Gold Potato Mousseline', 'Broccolini', 'Tarragon Jus'],
        calories: 590,
        proteinGrams: 48,
        carbGrams: 26,
        fatGrams: 24,
        tags: ['Nut-Free', 'High-Protein', 'Balanced Choice'],
        allergens: ['Dairy (Potato Mousseline)'],
        pairing: '2021 Louis Latour Bourgogne Chardonnay',
        imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'dinner-risotto',
        name: 'Wild Forest Truffle Mushroom Risotto',
        category: 'vegetarian',
        serviceType: 'dinner',
        description: 'Creamy Carnaroli rice simmered in vegetable consommé with porcini mushrooms, shavings of 24-month aged Parmigiano Reggiano, and crispy sage.',
        detailedIngredients: ['Carnaroli Italian Rice', 'Dried Porcini & Chanterelle Mushrooms', 'Vegetable Consommé', '24-Month Parmigiano', 'White Truffle Oil', 'Crisp Sage'],
        calories: 510,
        proteinGrams: 16,
        carbGrams: 64,
        fatGrams: 18,
        tags: ['Vegetarian', 'Nut-Free', 'Comfort Food'],
        allergens: ['Dairy (Parmesan & Butter)'],
        pairing: '2019 Villa Antinori Chianti Classico Riserva',
        imageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80',
        chefQuote: 'Intensely fragrant forest mushrooms awaken taste buds desensitized by cabin air pressure.',
      }
    ]
  },
  {
    id: 'service-breakfast',
    title: 'Service 2: Pre-Arrival Sunrise Breakfast',
    servingWindow: 'Served 1 hour 15 minutes before landing at London Heathrow',
    description: 'Energizing dawn selections served with chilled freshly squeezed Florida Valencia orange juice, seasonal cut berries, and hot barista tea or Illy espresso.',
    items: [
      {
        id: 'bfast-brioche',
        name: 'Warm Brioche French Toast & Madagascar Vanilla',
        category: 'breakfast',
        serviceType: 'breakfast',
        description: 'Golden griddled brioche with warm Canadian maple syrup, macerated forest berries, and dollop of vanilla bean crème chantilly.',
        detailedIngredients: ['All-Butter Artisan Brioche', 'Pasture-Raised Eggs', 'Pure Quebec Maple Syrup', 'Blackberries & Blueberries', 'Madagascar Vanilla Crème'],
        calories: 490,
        proteinGrams: 12,
        carbGrams: 68,
        fatGrams: 19,
        tags: ['Vegetarian', 'Sweet Start', 'Passenger Favorite'],
        allergens: ['Dairy', 'Eggs', 'Gluten (Wheat)'],
        pairing: 'Double Illy Roast Espresso or Fresh Mint Infusion',
        imageUrl: 'https://images.unsplash.com/photo-1484723091739-0045e548232c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'bfast-omelette',
        name: 'Gruyère & Chive Fluffy Farmhouse Omelette',
        category: 'breakfast',
        serviceType: 'breakfast',
        description: 'Cage-free egg omelette filled with aged Swiss Gruyère, served with grilled Cumberland chicken sausage, blistered vine tomatoes, and rosti potato hash.',
        detailedIngredients: ['Cage-Free Eggs', 'Aged Swiss Gruyère', 'Artisan Chicken Sausage', 'Vine Cherry Tomatoes', 'Crispy Golden Potato Rosti'],
        calories: 520,
        proteinGrams: 34,
        carbGrams: 22,
        fatGrams: 28,
        tags: ['Savory', 'High-Protein', 'Low Carb'],
        allergens: ['Eggs', 'Dairy (Cheese)'],
        pairing: 'English Breakfast Tea with Warm Milk',
        imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
        isChefSpecial: true,
      },
      {
        id: 'bfast-chia',
        name: 'Organic Wild Berry Acai & Toasted Granola Parfait',
        category: 'vegan',
        serviceType: 'breakfast',
        description: 'Chilled layers of organic coconut yogurt, antioxidant-rich acai puree, chia seeds, sliced kiwi, and honey-roasted gluten-free granola.',
        detailedIngredients: ['Organic Coconut Milk Yogurt', 'Acai Berry Pulp', 'Chia Seeds', 'Gluten-Free Rolled Oats', 'Toasted Pumpkin Seeds', 'Kiwi & Strawberries'],
        calories: 380,
        proteinGrams: 9,
        carbGrams: 48,
        fatGrams: 14,
        tags: ['100% Plant-Based', 'Gluten-Friendly', 'Dairy-Free', 'Light & Fresh'],
        allergens: ['Pumpkin/Sesame Seeds'],
        pairing: 'Cold-Pressed Green Detox Juice (Apple, Kale, Ginger)',
        imageUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
      }
    ]
  }
];

export const mockSpecialMeals: SpecialMeal[] = [
  {
    code: 'MOML',
    name: 'Muslim / Halal Meal',
    category: 'religious',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Strictly prepared in accordance with Islamic dietary laws. Guaranteed 100% certified Halal slaughtered meat. Absolutely no pork, bacon, gelatine, or alcohol used in any marinade or dessert.',
    certifiedBy: 'Halal Food Authority (HFA) & IATA Catering Standard',
    typicalContents: 'Braised spiced lamb korma with saffron basmati rice, minted cucumber yogurt raita, warm naan bread, and honey pistachio semolina.',
    excludedItems: ['Pork & all pork derivatives', 'Alcohol & cooking wines', 'Non-Halal certified meats'],
    recommendedFor: 'Passengers requiring Halal dietary adherence.'
  },
  {
    code: 'HNML',
    name: 'Non-Beef / Hindu Meal',
    category: 'religious',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Designed for passengers who do not consume beef, veal, or pork. Prepared with aromatic spices, tender chicken, lamb, or fish, accompanied by lentils, vegetables, and rice.',
    certifiedBy: 'Aviation Dietary Board',
    typicalContents: 'Murgh Makhani (mild spiced chicken), yellow tadka dal, fragrant jeera rice, spiced okra sabzi, and whole-wheat paratha.',
    excludedItems: ['Beef and all beef by-products', 'Veal', 'Pork'],
    recommendedFor: 'Passengers requesting Non-Beef, Hindu non-vegetarian preparation.'
  },
  {
    code: 'VGML',
    name: 'Vegan / Strict Vegetarian Meal',
    category: 'vegetarian',
    badgeColor: 'bg-green-100 text-green-800 border-green-300',
    description: 'Completely free from all animal products and animal by-products. Prepared strictly with vegetables, grains, legumes, pulses, fruits, and cold-pressed plant oils.',
    certifiedBy: 'The Vegan Society Standard',
    typicalContents: 'Roasted butternut squash & chickpea tagine with toasted almond couscous, zesty citrus quinoa salad, and dairy-free dark chocolate mousse.',
    excludedItems: ['Meat, poultry, fish, seafood', 'Eggs and dairy products', 'Honey, gelatin, animal rennet'],
    recommendedFor: 'Strict vegans and plant-based diners.'
  },
  {
    code: 'VLML',
    name: 'Lacto-Ovo Vegetarian Meal',
    category: 'vegetarian',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'Vegetarian meal that contains no meat, poultry, or fish, but allows wholesome dairy products (butter, cheese, milk) and cage-free eggs.',
    certifiedBy: 'Vegetarian Catering Association',
    typicalContents: 'Spinach & ricotta stuffed cannelloni baked in rustic San Marzano tomato sugo, steamed broccolini, and artisan tiramisu.',
    excludedItems: ['Meat, poultry, game, seafood, shellfish', 'Animal slaughter fats'],
    recommendedFor: 'Vegetarians who consume dairy and eggs.'
  },
  {
    code: 'VJML',
    name: 'Vegetarian Jain Meal',
    category: 'religious',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
    description: 'Strict Indian vegetarian meal prepared according to Jain principles. Contains zero root vegetables or underground tubers (no onions, garlic, potatoes, carrots, or radishes).',
    certifiedBy: 'Jain Dietary Council',
    typicalContents: 'Paneer methi malai (fenugreek cottage cheese), green moong dal, steamed basmati rice, sauteed zucchini & bell peppers.',
    excludedItems: ['Root vegetables (onions, garlic, potatoes, ginger, carrots)', 'All animal flesh, eggs'],
    recommendedFor: 'Jain vegetarian passengers.'
  },
  {
    code: 'KSML',
    name: 'Kosher Meal',
    category: 'religious',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Prepared under strict Rabbinical supervision (Hechsher certified). Meals arrive in factory-sealed double-wrapped packaging and are heated in airline ovens with seals intact.',
    certifiedBy: 'Badatz / Orthodox Union (OU) Rabbinical Board',
    typicalContents: 'Roast kosher chicken breast in herb jus, kugel casserole, steamed garden vegetables, and certified kosher dessert roll.',
    excludedItems: ['Non-kosher meats', 'Mixing of milk and meat', 'Shellfish, pork'],
    recommendedFor: 'Passengers observing Jewish dietary laws.'
  },
  {
    code: 'GFML',
    name: 'Gluten-Friendly Meal',
    category: 'medical',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Formulated for passengers with gluten intolerance. Prepared without wheat, barley, rye, spelt, or oats. Kitchen procedures minimize airborne flour cross-contact.',
    certifiedBy: 'Gluten Intolerance Catering Standards',
    typicalContents: 'Herb-crusted roasted turkey fillet with sweet potato mash, steamed baby beans, and individually packaged certified gluten-free brownie.',
    excludedItems: ['Wheat, rye, barley, couscous, pasta, conventional bread'],
    recommendedFor: 'Celiac and gluten-sensitive passengers.'
  },
  {
    code: 'DBML',
    name: 'Diabetic Meal',
    category: 'medical',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    description: 'Low-glycemic meal balanced with high-fiber complex carbohydrates, lean protein, and healthy fats. Prepared strictly with zero added refined sugars.',
    certifiedBy: 'Aviation Medical Dietary Guidelines',
    typicalContents: 'Grilled lemon-herb chicken paillard with brown wild rice medley, steamed cauliflower florets, and fresh green apple slices.',
    excludedItems: ['Refined sugar, syrups, sweets, sweetened beverages, deep-fried foods'],
    recommendedFor: 'Passengers with Type 1 or Type 2 diabetes.'
  },
  {
    code: 'LSML',
    name: 'Low Sodium / Salt Meal',
    category: 'medical',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: 'Prepared without added salt, salted seasonings, or high-sodium stock cubes. Flavored naturally using fresh herbs, lemon juice, garlic, and cracked black pepper.',
    certifiedBy: 'Cardiac Care Catering Guidelines',
    typicalContents: 'Poached cod with roasted rosemary potatoes, sweet roasted red bell peppers, and fresh fruit salad.',
    excludedItems: ['Added table salt, MSG, soy sauce, pickled foods, cured meats'],
    recommendedFor: 'Passengers with hypertension or cardiovascular needs.'
  },
  {
    code: 'CHML',
    name: 'Child Meal (Ages 2-11)',
    category: 'child',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-300',
    description: 'Nutritious, colorful, and fun meal tailored to children’s palates with bite-sized portions, easy-to-eat shapes, and an activity snack pack.',
    certifiedBy: 'Junior Traveler Catering',
    typicalContents: 'Crispy baked whole-breast chicken tenders with baked potato wedges, sweetcorn niblets, apple sauce pouch, and chocolate chip cookie.',
    excludedItems: ['Overly spicy ingredients, bony fish, heavy sauces'],
    recommendedFor: 'Young travelers aged 2 to 11.'
  }
];

export const mockMiscRequests: MiscRequestItem[] = [
  {
    id: 'misc-express-dine',
    title: 'Express Dining Service (Early Presentation)',
    category: 'timing',
    iconName: 'ClockFast',
    description: 'Request to have your first meal served as an all-in-one tray immediately once cruising altitude is reached, so you can rest and sleep longer.',
    guaranteedNote: 'Subject to turbulence and galley oven prep cycle.'
  },
  {
    id: 'misc-hold-meal',
    title: 'Hold Meal for Later in Flight',
    category: 'timing',
    iconName: 'Clock',
    description: 'Delay your main meal service by up to 2.5 hours after takeoff. The crew will keep your entree chilled in the galley refrigerator and heat it upon your request.',
    guaranteedNote: 'Subject to food safety holding temperatures.'
  },
  {
    id: 'misc-wake-up',
    title: 'Gently Wake Me for Morning Breakfast',
    category: 'timing',
    iconName: 'Bell',
    description: 'If you are sleeping when the captain begins the morning service 1 hour before landing, flight attendants will gently illuminate your reading lamp.',
    guaranteedNote: 'Subject to cabin crew route duties and passenger seatbelt sign.'
  },
  {
    id: 'misc-extra-warm-bread',
    title: 'Extra Warm Artisan Sourdough Roll',
    category: 'galley_extras',
    iconName: 'Flame',
    description: 'Request an extra warmed sourdough or pretzel roll with French salted butter from the galley warmers.',
    guaranteedNote: 'Subject to catering roll count loaded on this specific departure.'
  },
  {
    id: 'misc-baby-bottle',
    title: 'Infant Formula / Puree Hot Water Warming',
    category: 'galley_extras',
    iconName: 'Baby',
    description: 'Request a water bath basin from the galley crew to warm infant milk or commercially sealed baby food pouches at your desired time.',
    guaranteedNote: 'Subject to hot water availability and flight altitude safety.'
  },
  {
    id: 'misc-ice-lemon',
    title: 'Chilled Ice Glass with Fresh Lemon & Lime Wedges',
    category: 'galley_extras',
    iconName: 'Citrus',
    description: 'A pre-prepared glass with clear ice cubes and fresh citrus wedges delivered alongside your beverage service.',
    guaranteedNote: 'Subject to onboard fresh citrus perishables stowage.'
  },
  {
    id: 'misc-condiment-sriracha',
    title: 'Extra Sriracha & Artisan Hot Sauce Packets',
    category: 'condiments',
    iconName: 'Sparkles',
    description: 'Complimentary extra packets of artisan chili sriracha and crushed red pepper flakes provided with your tray.',
    guaranteedNote: 'Subject to condiment basket provisioning.'
  },
  {
    id: 'misc-condiment-olive-oil',
    title: 'Individual Cold-Pressed Olive Oil & Balsamic Dropper',
    category: 'condiments',
    iconName: 'Droplet',
    description: 'Single-estate extra virgin Italian olive oil with Modena balsamic vinegar for salad or roll dipping.',
    guaranteedNote: 'Subject to galley condiment supply.'
  },
  {
    id: 'misc-condiment-wasabi',
    title: 'Authentic Wasabi Paste & Tamari Soy Sauce',
    category: 'condiments',
    iconName: 'Sparkles',
    description: 'Extra sealed wasabi packets and wheat-free tamari soy sauce sachets.',
    guaranteedNote: 'Subject to galley snack supplies.'
  },
  {
    id: 'misc-celebration-toast',
    title: 'Celebration Toast Card & Extra Sparkling Glass',
    category: 'special_occasion',
    iconName: 'Wine',
    description: 'Let the cabin crew know if you are celebrating a birthday, honeymoon, or milestone. Crew will provide a handwritten celebration card and festive sparkling beverage garnish.',
    guaranteedNote: 'Subject to cabin workload, beverage inventory, and flight operations.'
  }
];

export const commonAllergenList = [
  'Peanuts',
  'Tree Nuts (Walnuts, Almonds, Cashews)',
  'Crustacean Shellfish',
  'Sesame Seeds',
  'Dairy / Cow Milk',
  'Eggs',
  'Soybeans',
  'Wheat / Gluten',
  'Fish'
];
