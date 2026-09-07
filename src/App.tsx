import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  mockFlights, 
  mockMealServices, 
  mockSpecialMeals, 
  mockMiscRequests 
} from './data/mockData';
import { FlightInfo } from './types';
import { Header } from './components/Header';
import { StepNavigation, ScreenId } from './components/StepNavigation';
import { Screen1FoodOptions } from './components/Screen1FoodOptions';
import { Screen2SpecialMeals } from './components/Screen2SpecialMeals';
import { Screen3MiscRequests } from './components/Screen3MiscRequests';
import { Screen4Confirmation } from './components/Screen4Confirmation';
import { UtensilsCrossed, ShieldAlert, Sparkles, CheckCircle2, RotateCcw, Wand2 } from 'lucide-react';

export default function App() {
  const [currentFlight, setCurrentFlight] = useState<FlightInfo>(mockFlights[0]);
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(1);

  // Selections state
  const [selectedMeals, setSelectedMeals] = useState<Record<string, string>>({
    'service-dinner': 'dinner-beef',
    'service-breakfast': 'bfast-brioche',
  });
  const [specialMealCode, setSpecialMealCode] = useState<string | null>(null);
  const [severeAllergies, setSevereAllergies] = useState<string[]>([]);
  const [allergyNote, setAllergyNote] = useState<string>('');
  
  // Misc Requests
  const [selectedMiscIds, setSelectedMiscIds] = useState<string[]>([
    'misc-extra-warm-bread',
    'misc-ice-lemon'
  ]);
  const [diningPace, setDiningPace] = useState<'standard' | 'express' | 'delayed'>('standard');
  const [wakeUpForMeal, setWakeUpForMeal] = useState<boolean>(true);
  const [customMiscNote, setCustomMiscNote] = useState<string>('Please serve sparkling water with dinner if available.');

  // Order status
  const [confirmationNumber, setConfirmationNumber] = useState<string>('FF-842-W89KL2');
  const [orderTimestamp, setOrderTimestamp] = useState<string>('Today • 14:32 EST');
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(true);

  // Meal selection handler
  const handleSelectMeal = (serviceId: string, mealId: string) => {
    setSelectedMeals((prev) => ({
      ...prev,
      [serviceId]: mealId,
    }));
  };

  // Allergy toggle
  const handleToggleAllergy = (allergen: string) => {
    setSevereAllergies((prev) =>
      prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]
    );
  };

  // Misc toggle
  const handleToggleMiscRequest = (id: string) => {
    setSelectedMiscIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Quick preset loader for reviewer testing
  const loadPreset = (type: 'halal' | 'vegetarian' | 'standard') => {
    if (type === 'halal') {
      setSpecialMealCode('MOML');
      setSelectedMeals({
        'service-dinner': 'dinner-chicken',
        'service-breakfast': 'bfast-chia',
      });
      setSelectedMiscIds(['misc-extra-warm-bread', 'misc-condiment-sriracha']);
      setSevereAllergies(['Peanuts']);
      setAllergyNote('Mild peanut allergy, carrying antihistamine');
      setCurrentScreen(2);
    } else if (type === 'vegetarian') {
      setSpecialMealCode('VGML');
      setSelectedMeals({
        'service-dinner': 'dinner-risotto',
        'service-breakfast': 'bfast-chia',
      });
      setSelectedMiscIds(['misc-condiment-olive-oil', 'misc-ice-lemon']);
      setSevereAllergies([]);
      setAllergyNote('');
      setCurrentScreen(2);
    } else {
      setSpecialMealCode(null);
      setSelectedMeals({
        'service-dinner': 'dinner-salmon',
        'service-breakfast': 'bfast-omelette',
      });
      setSelectedMiscIds(['misc-extra-warm-bread', 'misc-ice-lemon']);
      setSevereAllergies([]);
      setAllergyNote('');
      setCurrentScreen(1);
    }
  };

  const handleResetAll = () => {
    setSelectedMeals({});
    setSpecialMealCode(null);
    setSevereAllergies([]);
    setAllergyNote('');
    setSelectedMiscIds([]);
    setCustomMiscNote('');
    setDiningPace('standard');
    setWakeUpForMeal(false);
    setCurrentScreen(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-amber-400 selection:text-slate-950">
      {/* FlightFood Main Navigation Bar */}
      <Header
        currentFlight={currentFlight}
        availableFlights={mockFlights}
        onSelectFlight={(flight) => {
          setCurrentFlight(flight);
          setConfirmationNumber(`FF-${flight.flightNumber.replace('-', '')}-${flight.bookingRef}`);
        }}
        orderStatus="CONFIRMED"
        hasConfirmed={hasConfirmed}
      />

      {/* Screen 1, 2, 3, 4 Step Bar */}
      <StepNavigation
        currentScreen={currentScreen}
        onSelectScreen={(screen) => setCurrentScreen(screen)}
        selectedMealsCount={Object.keys(selectedMeals).length}
        hasSpecialMeal={Boolean(specialMealCode)}
        miscRequestsCount={selectedMiscIds.length}
        isConfirmed={hasConfirmed}
      />

      {/* Interactive Testing Ribbon for Demo / Evaluation */}
      <div className="bg-slate-100 border-b border-slate-200/80 px-4 py-2 text-xs text-slate-600 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              <Wand2 className="w-3.5 h-3.5 text-amber-600" />
              Demo Presets:
            </span>
            <button
              onClick={() => loadPreset('standard')}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium cursor-pointer shadow-2xs"
            >
              Standard Menu
            </button>
            <button
              onClick={() => loadPreset('halal')}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium cursor-pointer shadow-2xs"
            >
              Halal (MOML)
            </button>
            <button
              onClick={() => loadPreset('vegetarian')}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium cursor-pointer shadow-2xs"
            >
              Vegetarian (VGML)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetAll}
              className="text-slate-500 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
              title="Clear all selections and reset"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Selections</span>
            </button>

            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-500 hidden sm:inline">
              Viewing: <strong>Screen {currentScreen} of 4</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <AnimatePresence mode="wait">
          {currentScreen === 1 && (
            <motion.div
              key="screen-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Screen1FoodOptions
                flight={currentFlight}
                mealServices={mockMealServices}
                selectedMeals={selectedMeals}
                onSelectMeal={handleSelectMeal}
                onProceedToStep2={() => setCurrentScreen(2)}
                specialMealCode={specialMealCode}
              />
            </motion.div>
          )}

          {currentScreen === 2 && (
            <motion.div
              key="screen-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Screen2SpecialMeals
                specialMeals={mockSpecialMeals}
                selectedCode={specialMealCode}
                onSelectSpecialMeal={(code) => setSpecialMealCode(code)}
                severeAllergies={severeAllergies}
                onToggleAllergy={handleToggleAllergy}
                allergyNote={allergyNote}
                onChangeAllergyNote={setAllergyNote}
                onBackToStep1={() => setCurrentScreen(1)}
                onProceedToStep3={() => setCurrentScreen(3)}
              />
            </motion.div>
          )}

          {currentScreen === 3 && (
            <motion.div
              key="screen-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Screen3MiscRequests
                miscOptions={mockMiscRequests}
                selectedMiscIds={selectedMiscIds}
                onToggleMiscRequest={handleToggleMiscRequest}
                diningPace={diningPace}
                onChangeDiningPace={setDiningPace}
                wakeUpForMeal={wakeUpForMeal}
                onToggleWakeUp={setWakeUpForMeal}
                customMiscNote={customMiscNote}
                onChangeCustomMiscNote={setCustomMiscNote}
                onBackToStep2={() => setCurrentScreen(2)}
                onProceedToStep4={() => {
                  setHasConfirmed(true);
                  setCurrentScreen(4);
                }}
              />
            </motion.div>
          )}

          {currentScreen === 4 && (
            <motion.div
              key="screen-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Screen4Confirmation
                flight={currentFlight}
                mealServices={mockMealServices}
                selectedMeals={selectedMeals}
                specialMealCode={specialMealCode}
                specialMealsList={mockSpecialMeals}
                severeAllergies={severeAllergies}
                allergyNote={allergyNote}
                selectedMiscIds={selectedMiscIds}
                miscOptions={mockMiscRequests}
                diningPace={diningPace}
                wakeUpForMeal={wakeUpForMeal}
                customMiscNote={customMiscNote}
                confirmationNumber={confirmationNumber}
                orderTimestamp={orderTimestamp}
                onNavigateToScreen={(screen) => setCurrentScreen(screen)}
                onResetOrder={handleResetAll}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global In-Flight Catering Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 print:hidden mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wide font-serif-display text-sm">
              FlightFood™
            </span>
            <span className="text-slate-500">•</span>
            <span>Aviation In-Flight Catering & Galley Telemetry</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <span>IATA Special Meal Standard Compliant</span>
            <span>HACCP Food Safety Certified</span>
            <span>24/7 Galley Dispatch</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
