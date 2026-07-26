import React from 'react';
import { Zap, Target, AlertTriangle } from 'lucide-react';

interface PerformanceStatsProps {
  wpm: number;
  accuracy: number;
  mistakes: number;
  isRunning?: boolean;
}

export function PerformanceStats({ wpm, accuracy, mistakes }: PerformanceStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 p-3 bg-slate-100/80 dark:bg-slate-800/80 rounded-2xl border border-slate-200/70 dark:border-dark-border">
      {/* Live WPM */}
      <div className="flex items-center space-x-2.5 sm:space-x-3 px-3 py-2 bg-white dark:bg-dark-card rounded-xl shadow-soft dark:shadow-dark-soft">
        <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-secondary dark:text-dark-secondary">WPM</p>
          <p className="text-lg sm:text-xl font-extrabold text-text dark:text-dark-text tracking-tight font-mono">{wpm}</p>
        </div>
      </div>

      {/* Live Accuracy % */}
      <div className="flex items-center space-x-2.5 sm:space-x-3 px-3 py-2 bg-white dark:bg-dark-card rounded-xl shadow-soft dark:shadow-dark-soft">
        <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/60 text-success">
          <Target className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-secondary dark:text-dark-secondary">Accuracy</p>
          <p className="text-lg sm:text-xl font-extrabold text-text dark:text-dark-text tracking-tight font-mono">{accuracy}%</p>
        </div>
      </div>

      {/* Live Mistakes */}
      <div className="flex items-center space-x-2.5 sm:space-x-3 px-3 py-2 bg-white dark:bg-dark-card rounded-xl shadow-soft dark:shadow-dark-soft">
        <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/60 text-error">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-secondary dark:text-dark-secondary">Mistakes</p>
          <p className="text-lg sm:text-xl font-extrabold text-text dark:text-dark-text tracking-tight font-mono">{mistakes}</p>
        </div>
      </div>
    </div>
  );
}
