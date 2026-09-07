import React from 'react';
import { Plane, UtensilsCrossed, Clock, ChevronDown, CheckCircle2 } from 'lucide-react';
import { FlightInfo } from '../types';

interface HeaderProps {
  currentFlight: FlightInfo;
  availableFlights: FlightInfo[];
  onSelectFlight: (flight: FlightInfo) => void;
  orderStatus: 'CONFIRMED' | 'TRANSMITTED_TO_GALLEY' | 'PREPARING';
  hasConfirmed: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentFlight,
  availableFlights,
  onSelectFlight,
  hasConfirmed,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 px-4 py-1 text-xs font-semibold tracking-wide flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-slate-950 animate-pulse"></span>
            Galley Catering Window Open • Pre-flight selections lock 24 hours prior to departure
          </span>
          <span className="hidden sm:inline font-mono text-[11px] text-slate-900 font-medium">
            FlightFood In-Flight Dining Engine v2.4
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Flight Identifier */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <UtensilsCrossed className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-serif-display">FlightFood</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Catering Portal
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                In-flight bespoke meal curation & galley provisioning
              </p>
            </div>
          </div>

          {/* Mobile Flight Selector Dropdown trigger */}
          <div className="md:hidden relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-200"
            >
              <span>{currentFlight.flightNumber}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Flight & Passenger Info Card */}
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          {/* Flight Dropdown for testing multi-route capability */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 bg-slate-800/80 hover:bg-slate-800 px-3.5 py-2 rounded-lg border border-slate-700 text-left transition-colors cursor-pointer group"
              title="Click to switch sample flight or cabin class"
            >
              <Plane className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white tracking-wide">{currentFlight.flightNumber}</span>
                  <span className="text-[11px] text-slate-300 font-medium">{currentFlight.origin.code} ➔ {currentFlight.destination.code}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="text-[11px] text-slate-400">
                  {currentFlight.cabinClass} • Seat {currentFlight.seat}
                </div>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/60">
                  Switch Demo Flight
                </div>
                {availableFlights.map((fl) => (
                  <button
                    key={fl.id}
                    onClick={() => {
                      onSelectFlight(fl);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 hover:bg-slate-700/60 transition-colors flex items-start gap-2.5 ${
                      fl.id === currentFlight.id ? 'bg-amber-500/10 border-l-2 border-amber-400' : ''
                    }`}
                  >
                    <Plane className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">
                        {fl.flightNumber} • {fl.route}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        {fl.cabinClass} | Seat {fl.seat}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Aircraft: {fl.aircraft}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Passenger & PNR Pill */}
          <div className="hidden lg:flex items-center gap-3 bg-slate-800/40 px-3 py-2 rounded-lg border border-slate-800">
            <div className="text-right">
              <div className="text-xs font-semibold text-slate-200">{currentFlight.passengerName}</div>
              <div className="text-[11px] font-mono text-slate-400">PNR: <span className="text-amber-400">{currentFlight.bookingRef}</span></div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs">
              {currentFlight.passengerName.split(' ').map(n => n[0]).join('')}
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 pl-1 sm:border-l sm:border-slate-800 sm:pl-3">
            {hasConfirmed ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Confirmed</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Selection Active</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
