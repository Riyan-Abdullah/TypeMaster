import React from 'react';
import { TestDuration } from '@/types/test';
import { Clock } from 'lucide-react';

interface ModeSelectorProps {
  currentDuration: TestDuration;
  onSelectMode: (mode: TestDuration) => void;
  disabled?: boolean;
}

export function ModeSelector({ currentDuration, onSelectMode, disabled = false }: ModeSelectorProps) {
  const modes: TestDuration[] = [15, 30, 60];

  return (
    <div className="flex items-center space-x-2 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/60 dark:border-dark-border">
      <div className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-secondary dark:text-dark-secondary">
        <Clock className="w-4 h-4 text-primary" />
        <span className="hidden sm:inline">Time Mode:</span>
      </div>

      <div className="flex items-center space-x-1">
        {modes.map((mode) => {
          const isActive = currentDuration === mode;
          return (
            <button
              key={mode}
              type="button"
              disabled={disabled}
              onClick={() => onSelectMode(mode)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 focus:outline-none ${
                isActive
                  ? 'bg-primary text-white shadow-soft scale-105'
                  : 'text-secondary dark:text-dark-secondary hover:text-text dark:hover:text-dark-text hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {mode}s
            </button>
          );
        })}
      </div>
    </div>
  );
}
