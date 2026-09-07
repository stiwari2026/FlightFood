import React, { useState } from 'react';
import { 
  Check, 
  Wine, 
  Flame, 
  Info, 
  ArrowRight, 
  ChefHat, 
  Sparkles, 
  Filter,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { FlightInfo, MealService, MealItem } from '../types';

interface Screen1Props {
  flight: FlightInfo;
  mealServices: MealService[];
  selectedMeals: Record<string, string>;
  onSelectMeal: (serviceId: string, mealId: string) => void;
  onProceedToStep2: () => void;
  specialMealCode: string | null;
}

export const Screen1FoodOptions: React.FC<Screen1Props> = ({
  flight,
  mealServices,
  selectedMeals,
  onSelectMeal,
  onProceedToStep2,
  specialMealCode,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [inspectingMeal, setInspectingMeal] = useState<MealItem | null>(null);

  // Calculate if all services have a selection
  const allServicesSelected = mealServices.every(service => !!selectedMeals[service.id]);

  return (
    <div className="space-y-8 pb-20">
      {/* Flight Context & Culinary Welcome Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-700/60">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
              <ChefHat className="w-3.5 h-3.5 text-amber-400" />
              In-Flight Dining Manifest
            </span>
            <span className="text-xs text-slate-300">
              {flight.airline} • {flight.flightNumber} ({flight.origin.code} ➔ {flight.destination.code})
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-serif-display tracking-tight text-white mb-2">
            Complimentary Dining for {flight.passengerName}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Welcome to your in-flight dining selection for your flight to {flight.destination.city}. Your {flight.cabinClass} ticket includes two freshly prepared meal services created by our culinary artisans. Select your preferred dishes below to guarantee your first choice onboard.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 border-t border-slate-700/80 pt-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Catering order deadline: <strong>{flight.cateringDeadlineHours} hours remaining</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Cabin: <strong>{flight.cabinClass}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Seat: <strong>{flight.seat}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Notice if passenger has a Special Meal configured */}
      {specialMealCode && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-900 text-sm">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-amber-950">
              Special Meal Active: {specialMealCode}
            </p>
            <p className="text-amber-800 text-xs mt-0.5">
              You currently have an IATA Special Dietary Meal requested in Step 2. If you prefer to dine from the standard flight menu below, you can choose dishes here or adjust your dietary choice anytime.
            </p>
          </div>
          <button
            onClick={onProceedToStep2}
            className="text-xs font-semibold text-amber-900 hover:text-amber-700 underline shrink-0 cursor-pointer"
          >
            Review Special Meals ➔
          </button>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <Filter className="w-4 h-4 text-slate-500" />
          <span>Filter Entrees:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'All Dishes' },
            { id: 'beef', label: 'Prime Beef' },
            { id: 'poultry', label: 'Poultry' },
            { id: 'seafood', label: 'Seafood' },
            { id: 'vegetarian', label: 'Plant & Vegetarian' },
          ].map((tab) => (
            <button
              id={`filter-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveCategoryFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeCategoryFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-12">
        {mealServices.map((service, serviceIndex) => {
          const selectedMealId = selectedMeals[service.id];
          const filteredItems = service.items.filter(item => {
            if (activeCategoryFilter === 'all') return true;
            if (activeCategoryFilter === 'beef') return item.category === 'beef';
            if (activeCategoryFilter === 'poultry') return item.category === 'poultry';
            if (activeCategoryFilter === 'seafood') return item.category === 'seafood';
            if (activeCategoryFilter === 'vegetarian') return item.category === 'vegetarian' || item.category === 'vegan';
            return true;
          });

          return (
            <section key={service.id} aria-labelledby={`service-title-${service.id}`} className="space-y-4">
              {/* Service Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                      {serviceIndex + 1}
                    </span>
                    <h2 id={`service-title-${service.id}`} className="text-xl font-bold text-slate-900 font-serif-display">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{service.servingWindow}</span>
                  </p>
                </div>

                <div className="text-right">
                  {selectedMealId ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <Check className="w-3.5 h-3.5" />
                      Entree Selected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                      Selection Required
                    </span>
                  )}
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm">
                {service.description}
              </p>

              {/* Items Grid */}
              {filteredItems.length === 0 ? (
                <div className="bg-slate-50 rounded-xl p-8 text-center text-slate-500 text-sm border border-slate-200">
                  No dishes match the &quot;{activeCategoryFilter}&quot; filter in this service.
                  <button
                    onClick={() => setActiveCategoryFilter('all')}
                    className="ml-2 text-amber-600 font-semibold underline cursor-pointer"
                  >
                    Clear Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredItems.map((item) => {
                    const isSelected = selectedMealId === item.id;

                    return (
                      <div
                        key={item.id}
                        className={`group rounded-2xl bg-white border transition-all duration-200 flex flex-col overflow-hidden shadow-xs hover:shadow-md ${
                          isSelected
                            ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Food Image & Badges */}
                        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                            <div className="flex flex-wrap gap-1.5">
                              {item.isChefSpecial && (
                                <span className="bg-amber-500 text-slate-950 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                                  <Sparkles className="w-3 h-3 fill-slate-950" />
                                  Chef&apos;s Signature
                                </span>
                              )}
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Macro Badge */}
                            <span className="bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                              {item.calories} kcal
                            </span>
                          </div>

                          {/* Selected Checkmark overlay on image */}
                          {isSelected && (
                            <div className="absolute bottom-3 right-3 bg-amber-500 text-slate-950 rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                              <Check className="w-4 h-4 stroke-[3]" />
                              <span>Selected for Service</span>
                            </div>
                          )}
                        </div>

                        {/* Content Area */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif-display leading-snug">
                              {item.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                              {item.description}
                            </p>

                            {/* Chef quote */}
                            {item.chefQuote && (
                              <blockquote className="text-[11px] italic text-slate-500 border-l-2 border-amber-400 pl-2.5 py-0.5">
                                &ldquo;{item.chefQuote}&rdquo;
                              </blockquote>
                            )}

                            {/* Wine / Beverage Pairing */}
                            {item.pairing && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-amber-50/70 border border-amber-200/60 rounded-lg px-2.5 py-1.5">
                                <Wine className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span className="text-[11px]">
                                  <strong className="text-amber-900">Sommelier Pairing:</strong> {item.pairing}
                                </span>
                              </div>
                            )}

                            {/* Allergens & Nutrition teaser */}
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              <span className="text-[11px] text-slate-400 font-medium">Allergens:</span>
                              {item.allergens.map((alg) => (
                                <span
                                  key={alg}
                                  className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm border border-slate-200"
                                >
                                  {alg}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Footer */}
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                            <button
                              id={`btn-inspect-${item.id}`}
                              type="button"
                              onClick={() => setInspectingMeal(item)}
                              className="text-xs text-slate-600 hover:text-slate-900 font-semibold underline flex items-center gap-1 cursor-pointer"
                            >
                              <Info className="w-3.5 h-3.5" />
                              <span>Ingredients & Nutrition</span>
                            </button>

                            <button
                              id={`btn-select-${item.id}`}
                              type="button"
                              onClick={() => onSelectMeal(service.id, item.id)}
                              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-sm ring-1 ring-amber-600/30'
                                  : 'bg-slate-900 text-white hover:bg-slate-800'
                              }`}
                            >
                              {isSelected ? (
                                <>
                                  <Check className="w-4 h-4" />
                                  <span>Selected Dish</span>
                                </>
                              ) : (
                                <span>Select this Entree</span>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Bottom Sticky Proceed Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-sm font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
            <span>Next Stage: Special Dietary Requirements</span>
            <span className="text-xs font-normal text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              Screen 2
            </span>
          </div>
          <p className="text-xs text-slate-300">
            {allServicesSelected
              ? 'Both services selected! Proceed to designate Halal, Vegetarian, or Non-Beef dietary rules.'
              : 'You can proceed or finalize dishes anytime before departure.'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            id="btn-proceed-step2"
            type="button"
            onClick={onProceedToStep2}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>Proceed to Step 2: Special Meals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ingredient & Nutrition Modal */}
      {inspectingMeal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-amber-600">
                  Detailed Recipe Profile
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-serif-display mt-0.5">
                  {inspectingMeal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingMeal(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <img
              src={inspectingMeal.imageUrl}
              alt={inspectingMeal.name}
              referrerPolicy="no-referrer"
              className="w-full h-44 object-cover rounded-xl"
            />

            {/* Nutrition Highlights */}
            <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
              <div>
                <div className="text-xs text-slate-500">Calories</div>
                <div className="text-sm font-bold text-slate-900">{inspectingMeal.calories}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Protein</div>
                <div className="text-sm font-bold text-slate-900">{inspectingMeal.proteinGrams}g</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Carbs</div>
                <div className="text-sm font-bold text-slate-900">{inspectingMeal.carbGrams}g</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Fat</div>
                <div className="text-sm font-bold text-slate-900">{inspectingMeal.fatGrams}g</div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Fresh Ingredients & Sourcing
              </h4>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                {inspectingMeal.detailedIngredients.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            </div>

            {/* Allergens warning */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2.5 text-red-900 text-xs">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Allergen Notice</div>
                <p className="text-red-700 mt-0.5">
                  Contains: {inspectingMeal.allergens.join(', ')}. Prepared in an aviation catering kitchen that also handles nuts, gluten, and shellfish.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setInspectingMeal(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
