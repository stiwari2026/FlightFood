import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Printer, 
  Mail, 
  Edit3, 
  Plane, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Download, 
  FileText,
  Utensils,
  Share2
} from 'lucide-react';
import { FlightInfo, MealService, SpecialMeal, MiscRequestItem } from '../types';

interface Screen4Props {
  flight: FlightInfo;
  mealServices: MealService[];
  selectedMeals: Record<string, string>;
  specialMealCode: string | null;
  specialMealsList: SpecialMeal[];
  severeAllergies: string[];
  allergyNote: string;
  selectedMiscIds: string[];
  miscOptions: MiscRequestItem[];
  diningPace: 'standard' | 'express' | 'delayed';
  wakeUpForMeal: boolean;
  customMiscNote: string;
  confirmationNumber: string;
  orderTimestamp: string;
  onNavigateToScreen: (screenId: 1 | 2 | 3) => void;
  onResetOrder: () => void;
}

export const Screen4Confirmation: React.FC<Screen4Props> = ({
  flight,
  mealServices,
  selectedMeals,
  specialMealCode,
  specialMealsList,
  severeAllergies,
  allergyNote,
  selectedMiscIds,
  miscOptions,
  diningPace,
  wakeUpForMeal,
  customMiscNote,
  confirmationNumber,
  orderTimestamp,
  onNavigateToScreen,
}) => {
  const [emailSent, setEmailSent] = useState(false);
  const [emailInput, setEmailInput] = useState('passenger.elena@example.com');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const activeSpecialMeal = specialMealsList.find((m) => m.code === specialMealCode);
  const chosenMiscItems = miscOptions.filter((opt) => selectedMiscIds.includes(opt.id));

  // Find chosen meal objects
  const chosenServiceMeals = mealServices.map((service) => {
    const mealId = selectedMeals[service.id];
    const meal = service.items.find((item) => item.id === mealId);
    return { service, meal };
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReceipt = () => {
    const summaryData = {
      flightNumber: flight.flightNumber,
      passenger: flight.passengerName,
      bookingReference: flight.bookingRef,
      seat: flight.seat,
      confirmationCode: confirmationNumber,
      orderTimestamp,
      specialMeal: specialMealCode || 'Standard Menu',
      selectedMeals: chosenServiceMeals.map(s => ({ service: s.service.title, entree: s.meal?.name || 'Standard' })),
      miscellaneousRequests: chosenMiscItems.map(m => m.title),
      severeAllergies: severeAllergies,
      diningPace,
      wakeUpForMeal,
    };

    const blob = new Blob([JSON.stringify(summaryData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FlightFood-Pass-${confirmationNumber}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
    setTimeout(() => {
      setShowEmailModal(false);
      setEmailSent(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-24 print:p-0 print:space-y-4">
      {/* Official Status Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-emerald-500/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <CheckCircle2 className="w-5 h-5 text-emerald-950" />
              </span>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-300">
                Order Status: Transmitted & Locked
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif-display text-white">
              Catering Order Confirmed
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm max-w-xl leading-relaxed">
              Your in-flight culinary selections have been registered in the catering galley manifest for flight <strong>{flight.flightNumber}</strong>. Your meals will be prepared in our airside kitchens and loaded onto the aircraft.
            </p>
          </div>

          {/* Confirmation Code Box */}
          <div className="bg-slate-950/60 backdrop-blur-xs p-4 rounded-2xl border border-emerald-400/30 text-right sm:text-left shrink-0">
            <div className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold">
              Galley Confirmation PNR
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-white tracking-wider">
              {confirmationNumber}
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              Logged: {orderTimestamp}
            </div>
          </div>
        </div>

        {/* Live Timeline Step Bar */}
        <div className="mt-8 pt-6 border-t border-emerald-700/50">
          <div className="text-xs font-semibold text-emerald-200 mb-3 uppercase tracking-wider">
            Galley Fulfillment Pipeline:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-emerald-800/50 border border-emerald-400/40 text-emerald-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <div>
                <div className="font-bold">Preferences Logged</div>
                <div className="text-[10px] text-emerald-300/80">Completed</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-800/50 border border-emerald-400/40 text-emerald-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <div>
                <div className="font-bold">Sent to Kitchen</div>
                <div className="text-[10px] text-emerald-300/80">Transmitted</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold">Cold Trolley Stowage</div>
                <div className="text-[10px] text-slate-400">T-4 Hours</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-300 flex items-center gap-2">
              <Plane className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <div className="font-bold">Galley Service</div>
                <div className="text-[10px] text-slate-400">At 36,000 ft</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <button
            id="btn-print-catering-pass"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Catering Pass</span>
          </button>

          <button
            id="btn-open-email-modal"
            onClick={() => setShowEmailModal(true)}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-slate-500" />
            <span>Email Confirmation</span>
          </button>

          <button
            id="btn-download-pass-json"
            onClick={handleDownloadReceipt}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>{downloadSuccess ? 'Downloaded!' : 'Export Pass JSON'}</span>
          </button>
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Need changes? You can modify preferences up to 24h prior to takeoff.
        </span>
      </div>

      {/* In-Flight Dining Boarding Pass Style Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        {/* Ticket Header */}
        <div className="bg-slate-900 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                {flight.airline} • In-Flight Dining Pass
              </span>
              <h2 className="text-xl font-bold font-serif-display">
                Flight {flight.flightNumber}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div>
              <div className="text-[11px] uppercase text-slate-400 font-semibold">Seat</div>
              <div className="text-lg font-bold text-amber-400 font-mono">{flight.seat}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase text-slate-400 font-semibold">Class</div>
              <div className="text-sm font-bold text-white">{flight.cabinClass}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase text-slate-400 font-semibold">PNR</div>
              <div className="text-sm font-mono font-bold text-slate-300">{flight.bookingRef}</div>
            </div>
          </div>
        </div>

        {/* Flight Route Details Strip */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-slate-400 font-medium">Origin</div>
              <div className="font-bold text-slate-900 text-sm">
                {flight.origin.city} ({flight.origin.code})
              </div>
              <div className="text-slate-500 text-[11px]">{flight.origin.terminal}</div>
            </div>
            <div className="text-slate-400 font-bold">➔</div>
            <div>
              <div className="text-slate-400 font-medium">Destination</div>
              <div className="font-bold text-slate-900 text-sm">
                {flight.destination.city} ({flight.destination.code})
              </div>
              <div className="text-slate-500 text-[11px]">{flight.destination.terminal}</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-600">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{flight.departureDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Dep: {flight.departureTime}</span>
            </div>
            <div className="hidden md:block text-slate-400">
              Aircraft: {flight.aircraft}
            </div>
          </div>
        </div>

        {/* Detailed Itemized Manifest */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Section 1: Standard Dining Choices */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900 font-serif-display">
                  1. Selected In-Flight Meal Services
                </h3>
              </div>
              <button
                id="btn-modify-meals"
                type="button"
                onClick={() => onNavigateToScreen(1)}
                className="text-xs text-amber-600 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer print:hidden"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Modify Dishes</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chosenServiceMeals.map(({ service, meal }) => (
                <div
                  key={service.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 flex gap-4"
                >
                  {meal?.imageUrl ? (
                    <img
                      src={meal.imageUrl}
                      alt={meal.name}
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 rounded-xl object-cover shrink-0 border border-slate-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                      <Utensils className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                      {service.title}
                    </div>
                    <div className="text-sm font-bold text-slate-900 leading-tight">
                      {meal ? meal.name : 'Standard In-Flight Selection Pending'}
                    </div>
                    {meal && (
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {meal.description}
                      </p>
                    )}
                    {meal?.pairing && (
                      <div className="text-[11px] text-slate-500 pt-1">
                        Beverage: <strong>{meal.pairing}</strong>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Special Dietary Meal (IATA) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900 font-serif-display">
                  2. Special Dietary Meal & Medical Directives
                </h3>
              </div>
              <button
                id="btn-modify-special-meals"
                type="button"
                onClick={() => onNavigateToScreen(2)}
                className="text-xs text-amber-600 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer print:hidden"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Modify Special Meal</span>
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border shadow-xs ${
                    activeSpecialMeal ? activeSpecialMeal.badgeColor : 'bg-slate-200 text-slate-700 border-slate-300'
                  }`}>
                    {activeSpecialMeal ? activeSpecialMeal.code : 'STANDARD'}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {activeSpecialMeal ? activeSpecialMeal.name : 'Standard Cabin Meal (No Special Meal Requested)'}
                    </h4>
                    <span className="text-xs text-slate-500">
                      {activeSpecialMeal
                        ? `Certified by: ${activeSpecialMeal.certifiedBy}`
                        : 'Passenger will receive standard flight meal options.'}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                  {activeSpecialMeal ? 'SPML Tray Tagged' : 'Standard Manifest'}
                </div>
              </div>

              {activeSpecialMeal && (
                <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                  <strong>Galley Note:</strong> {activeSpecialMeal.description}
                </div>
              )}

              {/* Severe Allergy alerts */}
              {severeAllergies.length > 0 && (
                <div className="pt-2 border-t border-slate-200/80">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-700">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Declared Severe Allergies:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {severeAllergies.map((alg) => (
                      <span
                        key={alg}
                        className="text-xs bg-red-100 text-red-800 border border-red-300 px-2 py-0.5 rounded-md font-medium"
                      >
                        {alg}
                      </span>
                    ))}
                  </div>
                  {allergyNote && (
                    <div className="text-xs text-slate-600 mt-1 italic">
                      Passenger Medical Note: &ldquo;{allergyNote}&rdquo;
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Miscellaneous Meal Requests (Non-Guaranteed) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900 font-serif-display">
                  3. Miscellaneous Galley Requests (Non-Guaranteed)
                </h3>
              </div>
              <button
                id="btn-modify-misc"
                type="button"
                onClick={() => onNavigateToScreen(3)}
                className="text-xs text-amber-600 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer print:hidden"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Modify Misc</span>
              </button>
            </div>

            <div className="bg-amber-50/40 rounded-2xl border border-amber-200/70 p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-100/60 p-2.5 rounded-xl border border-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Crew Advisory:</strong> Items in this section are transmitted to the lead flight attendant as non-guaranteed requests, subject to onboard galley supplies.
                </span>
              </div>

              {/* Service timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    In-Flight Dining Timing
                  </span>
                  <span className="font-bold text-slate-800 text-sm">
                    {diningPace === 'express' && 'Express Dining (Immediate service upon level-off)'}
                    {diningPace === 'delayed' && 'Delayed Service (Entree held for buzzer call)'}
                    {diningPace === 'standard' && 'Standard Cabin Service Cadence'}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Pre-Arrival Breakfast Wake-up
                  </span>
                  <span className="font-bold text-slate-800 text-sm">
                    {wakeUpForMeal ? 'Wake passenger gently for breakfast service' : 'Do not disturb (Passenger resting)'}
                  </span>
                </div>
              </div>

              {/* Extras list */}
              {chosenMiscItems.length > 0 ? (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-700 block">
                    Requested Galley Extras ({chosenMiscItems.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {chosenMiscItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between"
                      >
                        <span className="font-semibold text-slate-800">{item.title}</span>
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-sm font-medium">
                          Non-Guaranteed
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  No miscellaneous galley items requested.
                </p>
              )}

              {/* Custom Galley Note */}
              {customMiscNote && (
                <div className="pt-2 border-t border-amber-200/50">
                  <span className="text-xs font-bold text-slate-700 block">
                    Passenger Galley Note:
                  </span>
                  <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 mt-1 italic">
                    &ldquo;{customMiscNote}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Boarding Pass Bottom Bar / Barcode */}
        <div className="bg-slate-900 text-slate-300 px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <div className="text-center sm:text-left">
            <div className="text-xs font-bold text-white">FlightFood Automated Galley Link</div>
            <div className="text-[11px] text-slate-400">
              Verified by Catering Dispatch • Flight Kitchen JFK T4
            </div>
          </div>

          {/* Stylized Barcode */}
          <div className="flex flex-col items-center sm:items-end">
            <div className="flex gap-0.5 h-7 items-end bg-white p-1 rounded-sm">
              {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7, 9, 5].map((h, i) => (
                <div
                  key={i}
                  className="bg-slate-900"
                  style={{ width: (i % 3 === 0 ? 3 : 2) + 'px', height: (12 + (h * 1.2)) + 'px' }}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider mt-1">
              *{confirmationNumber}*
            </span>
          </div>
        </div>
      </div>

      {/* Return to Dashboard or Explore Other Features */}
      <div className="bg-slate-100 rounded-2xl p-6 text-center text-slate-600 text-xs sm:text-sm border border-slate-200 print:hidden">
        <p>
          Thank you for personalizing your in-flight dining with <strong>FlightFood</strong>.
          If your flight is rescheduled or your seat is upgraded, your dietary preferences will automatically transfer.
        </p>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 font-serif-display">
                Email Catering Summary Pass
              </h3>
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Receive a digital copy of your dining pass, chef&apos;s allergen declarations, and galley codes straight to your inbox.
            </p>

            <form onSubmit={handleSendEmail} className="space-y-3">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter email address"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={emailSent}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs"
                >
                  {emailSent ? 'Sent Successfully ✓' : 'Send Catering Pass'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
