import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  Flame, 
  Baby, 
  Droplet, 
  Wine, 
  Sparkles, 
  Bell, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  Info,
  Citrus
} from 'lucide-react';
import { MiscRequestItem } from '../types';

interface Screen3Props {
  miscOptions: MiscRequestItem[];
  selectedMiscIds: string[];
  onToggleMiscRequest: (id: string) => void;
  diningPace: 'standard' | 'express' | 'delayed';
  onChangeDiningPace: (pace: 'standard' | 'express' | 'delayed') => void;
  wakeUpForMeal: boolean;
  onToggleWakeUp: (val: boolean) => void;
  customMiscNote: string;
  onChangeCustomMiscNote: (note: string) => void;
  onBackToStep2: () => void;
  onProceedToStep4: () => void;
}

export const Screen3MiscRequests: React.FC<Screen3Props> = ({
  miscOptions,
  selectedMiscIds,
  onToggleMiscRequest,
  diningPace,
  onChangeDiningPace,
  wakeUpForMeal,
  onToggleWakeUp,
  customMiscNote,
  onChangeCustomMiscNote,
  onBackToStep2,
  onProceedToStep4,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ClockFast':
      case 'Clock':
        return <Clock className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'Baby':
        return <Baby className="w-5 h-5" />;
      case 'Citrus':
        return <Citrus className="w-5 h-5" />;
      case 'Wine':
        return <Wine className="w-5 h-5" />;
      case 'Bell':
        return <Bell className="w-5 h-5" />;
      case 'Droplet':
        return <Droplet className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-amber-950/60 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-amber-500/30">
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Non-Guaranteed Galley Discretionary Items
            </span>
            <span className="text-xs text-slate-300">
              Subject to Cabin Crew & Galley Capacity
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-serif-display tracking-tight text-white mb-2">
            Miscellaneous Meal & Galley Requests
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Customize your onboard meal experience with discretionary in-flight amenities. From early express meal delivery to extra warmed rolls, infant food warming, and specialty condiments.
          </p>
        </div>
      </div>

      {/* Mandatory Non-Guaranteed Disclaimer Box */}
      <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-5 sm:p-6 text-slate-900 shadow-sm relative">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-md">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h2 className="text-base font-bold text-amber-950 font-serif-display flex items-center gap-2">
              <span>Important Airline Galley Policy & Availability Notice</span>
              <span className="text-xs font-sans font-bold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 border border-amber-300">
                Non-Guaranteed
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Items and adjustments selected on this screen are transmitted directly onto the Lead Purser and Galley Crew flight manifest. However, due to <strong>aircraft stowage weight limits, turbulence safety guidelines, oven heating cycles, and perishable onboard provisioning</strong>, <strong>these requests are NOT GUARANTEED to be served</strong>. Our cabin crew will make every reasonable attempt to fulfill your wishes once cruising altitude is safely established.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: In-Flight Meal Service Timing & Sleep Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-amber-600" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif-display">
              1. Meal Service Timing & Cabin Sleep Cadence
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            Non-guaranteed • Subject to flight safety
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'standard',
              title: 'Standard Service',
              desc: 'Served with the main cabin flow approx. 50-60 minutes after departure.',
              badge: 'Default Flow',
            },
            {
              id: 'express',
              title: 'Express Dining (Early)',
              desc: 'Entree, salad, and bread delivered as a single tray as soon as cruising altitude is reached.',
              badge: 'Max Rest Time',
            },
            {
              id: 'delayed',
              title: 'Hold Meal for Later',
              desc: 'Galley holds your refrigerated entree to be heated upon your buzzer request (up to 2.5 hours later).',
              badge: 'Flexible Timing',
            },
          ].map((pace) => {
            const isChosen = diningPace === pace.id;
            return (
              <button
                id={`btn-pace-${pace.id}`}
                key={pace.id}
                type="button"
                onClick={() => onChangeDiningPace(pace.id as any)}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isChosen
                    ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">{pace.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-medium">
                      {pace.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{pace.desc}</p>
                </div>
                <div className="pt-3 mt-2 flex items-center justify-end text-xs font-semibold">
                  {isChosen ? (
                    <span className="text-amber-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </span>
                  ) : (
                    <span className="text-slate-400 hover:text-slate-600">Select</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Wake up toggle */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                Gently Wake Me for Sunrise Breakfast Service
              </div>
              <p className="text-[11px] text-slate-500">
                If sleeping during the pre-landing service, crew will gently illuminate your reading light (Subject to turbulence seatbelt sign).
              </p>
            </div>
          </div>

          <button
            id="btn-toggle-wakeup"
            type="button"
            onClick={() => onToggleWakeUp(!wakeUpForMeal)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${
              wakeUpForMeal
                ? 'bg-amber-500 text-slate-950 ring-1 ring-amber-600/30'
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            }`}
          >
            {wakeUpForMeal ? 'Wake Me ✓' : 'Let Me Sleep'}
          </button>
        </div>
      </div>

      {/* Section 2: Galley Extras & Condiments Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif-display">
              2. Galley Warming, Refreshment & Condiment Extras
            </h3>
            <p className="text-xs text-slate-500">
              Select any additional in-flight amenities you would appreciate during flight.
            </p>
          </div>
          <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
            {selectedMiscIds.length} items logged
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {miscOptions.map((option) => {
            const isSelected = selectedMiscIds.includes(option.id);

            return (
              <div
                id={`card-${option.id}`}
                key={option.id}
                onClick={() => onToggleMiscRequest(option.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50/40 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {getIcon(option.iconName)}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-serif-display leading-tight">
                        {option.title}
                      </h4>
                    </div>

                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs transition-colors shrink-0 ${
                      isSelected ? 'bg-amber-500 border-amber-600 text-slate-950 font-bold' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pl-11">
                    {option.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-500 pl-11">
                  <span className="flex items-center gap-1 italic text-slate-400">
                    <Info className="w-3 h-3 text-amber-500" />
                    {option.guaranteedNote}
                  </span>
                  <span className={`font-semibold ${isSelected ? 'text-amber-700' : 'text-slate-500'}`}>
                    {isSelected ? 'Request Added' : '+ Add to Request'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Custom Freeform Note to Galley Attendants */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif-display">
              3. Special Note for Flight Galley Crew (Discretionary)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {customMiscNote.length}/200 chars
          </span>
        </div>

        <textarea
          id="textarea-custom-misc-note"
          rows={3}
          maxLength={200}
          value={customMiscNote}
          onChange={(e) => onChangeCustomMiscNote(e.target.value)}
          placeholder="e.g., Celebrating our 10th wedding anniversary; prefer decaf coffee if available; please provide extra napkins."
          className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white resize-none"
        />

        <p className="text-[11px] text-slate-500">
          This message is printed onto the Purser&apos;s Galley Work Manifest. Please remember that special meal substitutions must be handled in Step 2.
        </p>
      </div>

      {/* Navigation Footer */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          id="btn-back-step2"
          type="button"
          onClick={onBackToStep2}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Special Meals</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            id="btn-proceed-step4"
            type="button"
            onClick={onProceedToStep4}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>Proceed to Step 4: Review & Confirmation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
