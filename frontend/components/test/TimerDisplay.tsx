import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerDisplayProps {
  timeLeft: number;
  totalDuration: number;
}

export function TimerDisplay({ timeLeft }: TimerDisplayProps) {
  let colorClass = 'text-primary bg-primary-50 dark:bg-primary-950/60 border-primary-200 dark:border-primary-900';
  if (timeLeft <= 5) {
    colorClass = 'text-error bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-900 animate-pulse';
  } else if (timeLeft <= 10) {
    colorClass = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900';
  }

  return (
    <div className={`inline-flex items-center space-x-2.5 px-4 py-2 rounded-2xl border ${colorClass} transition-colors shadow-soft`}>
      <TimerIcon className="w-5 h-5" />
      <div className="flex items-baseline space-x-1">
        <span className="text-2xl font-extrabold font-mono tracking-tight">{timeLeft}</span>
        <span className="text-xs font-semibold uppercase tracking-wider opacity-80">sec</span>
      </div>
    </div>
  );
}
