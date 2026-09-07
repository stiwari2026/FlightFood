import React from 'react';
import { Utensils, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export type ScreenId = 1 | 2 | 3 | 4;

interface StepNavigationProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  selectedMealsCount: number;
  hasSpecialMeal: boolean;
  miscRequestsCount: number;
  isConfirmed: boolean;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentScreen,
  onSelectScreen,
  selectedMealsCount,
  hasSpecialMeal,
  miscRequestsCount,
  isConfirmed,
}) => {
  const steps = [
    {
      id: 1 as ScreenId,
      number: '1',
      title: 'Flight Menu',
      subtitle: 'In-Flight Entrees & Sides',
      icon: Utensils,
      badge: selectedMealsCount > 0 ? `${selectedMealsCount} selected` : 'Pending',
      badgeColor: selectedMealsCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500',
    },
    {
      id: 2 as ScreenId,
      number: '2',
      title: 'Special Meals',
      subtitle: 'Halal, Vegetarian, Non-Beef',
      icon: ShieldAlert,
      badge: hasSpecialMeal ? 'Configured' : 'Optional',
      badgeColor: hasSpecialMeal ? 'bg-emerald-100 text-emerald-800 font-semibold' : 'bg-slate-100 text-slate-500',
    },
    {
      id: 3 as ScreenId,
      number: '3',
      title: 'Miscellaneous Requests',
      subtitle: 'Non-Guaranteed Galley Extras',
      icon: Sparkles,
      badge: miscRequestsCount > 0 ? `${miscRequestsCount} requested` : 'Optional',
      badgeColor: miscRequestsCount > 0 ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-500',
    },
    {
      id: 4 as ScreenId,
      number: '4',
      title: 'Confirmation',
      subtitle: 'Summary & Order Status',
      icon: CheckCircle2,
      badge: isConfirmed ? 'Order Placed' : 'Final Review',
      badgeColor: isConfirmed ? 'bg-emerald-600 text-white font-semibold' : 'bg-slate-100 text-slate-600',
    },
  ];

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs sticky top-[108px] sm:top-[98px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav aria-label="Order Steps" className="flex items-center justify-between overflow-x-auto py-2.5 sm:py-3 no-scrollbar">
          {steps.map((step, idx) => {
            const isActive = currentScreen === step.id;
            const isCompleted = currentScreen > step.id || (step.id === 4 && isConfirmed);
            const Icon = step.icon;

            return (
              <React.Fragment key={step.id}>
                <button
                  id={`nav-step-${step.id}`}
                  onClick={() => onSelectScreen(step.id)}
                  className={`flex items-center gap-3 px-3 sm:px-4 py-2 rounded-xl text-left transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/10 text-slate-900 ring-1 ring-amber-500/40 shadow-xs'
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : isCompleted
                        ? 'bg-slate-900 text-amber-400'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {isCompleted && !isActive ? (
                      <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Screen {step.number}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${step.badgeColor}`}>
                        {step.badge}
                      </span>
                    </div>
                    <div className={`text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap ${
                      isActive ? 'text-slate-900' : 'text-slate-700'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-[11px] text-slate-400 hidden md:block whitespace-nowrap">
                      {step.subtitle}
                    </div>
                  </div>
                </button>

                {idx < steps.length - 1 && (
                  <div className="hidden sm:block flex-1 h-[2px] mx-2 bg-slate-200" />
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
