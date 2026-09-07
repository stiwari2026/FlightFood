import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  Search, 
  AlertOctagon, 
  ArrowLeft, 
  ArrowRight, 
  Info,
  CheckCircle,
  X
} from 'lucide-react';
import { SpecialMeal } from '../types';
import { commonAllergenList } from '../data/mockData';

interface Screen2Props {
  specialMeals: SpecialMeal[];
  selectedCode: string | null;
  onSelectSpecialMeal: (code: string | null) => void;
  severeAllergies: string[];
  onToggleAllergy: (allergen: string) => void;
  allergyNote: string;
  onChangeAllergyNote: (note: string) => void;
  onBackToStep1: () => void;
  onProceedToStep3: () => void;
}

export const Screen2SpecialMeals: React.FC<Screen2Props> = ({
  specialMeals,
  selectedCode,
  onSelectSpecialMeal,
  severeAllergies,
  onToggleAllergy,
  allergyNote,
  onChangeAllergyNote,
  onBackToStep1,
  onProceedToStep3,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'religious' | 'vegetarian' | 'medical' | 'child'>('all');

  const filteredMeals = specialMeals.filter((meal) => {
    const matchesCategory = categoryFilter === 'all' || meal.category === categoryFilter;
    const matchesSearch = 
      meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeSpecialMeal = specialMeals.find((m) => m.code === selectedCode);

  return (
    <div className="space-y-8 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-700/60">
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              IATA Certified Special Meals (SPML)
            </span>
            <span className="text-xs text-slate-300">
              Worldwide Aviation Dietary Standard
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-serif-display tracking-tight text-white mb-2">
            Special Meal & Dietary Requirements
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Specify dietary, religious, or medical meal requirements such as <strong>Vegetarian (VGML/VLML)</strong>, <strong>Halal (MOML)</strong>, or <strong>Non-Beef (HNML)</strong>. Special meals are prepared in dedicated certified kitchens, sealed with tamper-evident labels, and served directly to your seat prior to the standard cabin service.
          </p>
        </div>
      </div>

      {/* Current Selection Status Banner */}
      <div className={`p-4 rounded-xl border transition-all ${
        selectedCode 
          ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
          : 'bg-slate-100 border-slate-200 text-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
              selectedCode ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-300 text-slate-700'
            }`}>
              {selectedCode ? selectedCode : 'STD'}
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">
                Active Dietary Request
              </div>
              <div className="text-sm font-bold">
                {activeSpecialMeal ? (
                  <span>
                    {activeSpecialMeal.name} ({activeSpecialMeal.code})
                  </span>
                ) : (
                  <span>Standard In-Flight Menu (No Special Meal Requested)</span>
                )}
              </div>
            </div>
          </div>

          {selectedCode && (
            <button
              onClick={() => onSelectSpecialMeal(null)}
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-red-200 hover:border-red-300 shadow-xs cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Reset to Standard Menu
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-special-meal-search"
              type="text"
              placeholder="Search by code (e.g., MOML, HNML, VGML) or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All Special Meals' },
              { id: 'religious', label: 'Religious & Cultural (Halal / Non-Beef)' },
              { id: 'vegetarian', label: 'Vegetarian & Plant' },
              { id: 'medical', label: 'Medical & Allergens' },
              { id: 'child', label: 'Child & Infant' },
            ].map((cat) => (
              <button
                id={`cat-special-${cat.id}`}
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Special Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMeals.map((meal) => {
          const isSelected = selectedCode === meal.code;

          return (
            <div
              key={meal.code}
              className={`rounded-2xl bg-white border p-5 transition-all flex flex-col justify-between shadow-xs ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md bg-emerald-50/20'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="space-y-3">
                {/* Header with IATA Code */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border shadow-xs ${meal.badgeColor}`}>
                      {meal.code}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-serif-display leading-tight">
                        {meal.name}
                      </h3>
                      <span className="text-[11px] text-slate-500">
                        {meal.recommendedFor}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="bg-emerald-600 text-white rounded-full p-1 shadow-xs">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {meal.description}
                </p>

                {/* Typical Contents */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-xs space-y-1.5">
                  <div className="text-slate-800 font-semibold flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-slate-500" />
                    <span>Typical In-Flight Tray:</span>
                  </div>
                  <p className="text-slate-600 pl-5">
                    {meal.typicalContents}
                  </p>

                  <div className="pt-1 text-[11px] text-slate-500 border-t border-slate-200/60 mt-2">
                    <span className="font-semibold text-slate-700">Strictly Excludes:</span>{' '}
                    {meal.excludedItems.join(', ')}
                  </div>
                </div>

                {/* Certification badge */}
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Certified by: <strong className="text-slate-700">{meal.certifiedBy}</strong></span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {isSelected ? 'Currently Assigned' : 'Replaces standard dishes'}
                </span>

                <button
                  id={`btn-request-spml-${meal.code}`}
                  type="button"
                  onClick={() => onSelectSpecialMeal(isSelected ? null : meal.code)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Meal Selected</span>
                    </>
                  ) : (
                    <span>Request {meal.code}</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Severe Allergies Declaration Card */}
      <div className="bg-white rounded-2xl border border-red-200 p-6 shadow-xs space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif-display">
              Severe Food Allergies & Anaphylaxis Medical Alert
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              If you or a traveling companion have life-threatening allergies, select them below to alert the catering galley and flight crew manifest.
            </p>
          </div>
        </div>

        {/* Allergen Checkbox Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
          {commonAllergenList.map((allergen) => {
            const isChecked = severeAllergies.includes(allergen);

            return (
              <button
                id={`btn-allergen-${allergen.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                key={allergen}
                type="button"
                onClick={() => onToggleAllergy(allergen)}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-red-50 text-red-900 border-red-400 ring-1 ring-red-400 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{allergen}</span>
                <span className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                  isChecked ? 'bg-red-600 border-red-600 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
              </button>
            );
          })}
        </div>

        {/* Allergy Custom Note */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold text-slate-700 block">
            Galley Crew Medical Details / EpiPen Location:
          </label>
          <input
            id="input-allergy-notes"
            type="text"
            placeholder="e.g., Carrying two EpiPens in seat pocket; airborne peanut sensitivity"
            value={allergyNote}
            onChange={(e) => onChangeAllergyNote(e.target.value)}
            className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
            maxLength={150}
          />
          <p className="text-[11px] text-slate-500">
            Note: While commercial airline galleys do their utmost to prevent cross-contamination, airlines cannot guarantee a 100% allergen-free aircraft environment.
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          id="btn-back-step1"
          type="button"
          onClick={onBackToStep1}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu Selection</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            id="btn-proceed-step3"
            type="button"
            onClick={onProceedToStep3}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>Proceed to Step 3: Miscellaneous Requests</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
