import React from 'react';
import { TypingTestResultResponse } from '@/services/typingService';
import { formatDate } from '@/lib/utils';
import { Trophy, Target, AlertTriangle, Clock, Calendar } from 'lucide-react';

interface HistoryTableProps {
  items: TypingTestResultResponse[];
}

export function HistoryTable({ items }: HistoryTableProps) {
  return (
    <div className="space-y-4">
      {/* Desktop Table View (hidden on small mobile screens) */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-100 dark:border-dark-border shadow-soft dark:shadow-dark-soft bg-white dark:bg-dark-card transition-colors">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-dark-border text-xs font-semibold uppercase tracking-wider text-secondary dark:text-dark-secondary">
              <th className="py-3.5 px-6">Date</th>
              <th className="py-3.5 px-6">Duration</th>
              <th className="py-3.5 px-6">WPM</th>
              <th className="py-3.5 px-6">Accuracy</th>
              <th className="py-3.5 px-6">Mistakes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-dark-border text-sm">
            {items.map((test) => (
              <tr key={test.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/60 transition-colors">
                <td className="py-4 px-6 font-medium text-text dark:text-dark-text">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span>{formatDate(test.created_at)}</span>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{test.duration}s</span>
                  </span>
                </td>

                <td className="py-4 px-6 font-mono font-bold text-text dark:text-dark-text">
                  <div className="flex items-center space-x-1.5">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span className="text-base text-primary font-extrabold">{test.wpm}</span>
                    <span className="text-xs text-secondary dark:text-dark-secondary font-normal">WPM</span>
                  </div>
                </td>

                <td className="py-4 px-6 font-mono font-semibold">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-950/60 text-success text-xs font-bold">
                    <Target className="w-3.5 h-3.5 text-success" />
                    <span>{test.accuracy}%</span>
                  </span>
                </td>

                <td className="py-4 px-6 font-mono text-secondary dark:text-dark-secondary">
                  <div className="flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-error" />
                    <span>{test.mistakes}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card Layout (shown on small screens) */}
      <div className="md:hidden space-y-3">
        {items.map((test) => (
          <div
            key={test.id}
            className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border shadow-soft dark:shadow-dark-soft space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-border pb-2.5">
              <div className="flex items-center space-x-2 text-xs text-secondary dark:text-dark-secondary">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatDate(test.created_at)}</span>
              </div>

              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>{test.duration}s</span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2 rounded-xl bg-primary-50/60 dark:bg-primary-950/50">
                <p className="text-[10px] font-bold uppercase tracking-wider text-secondary dark:text-dark-secondary">WPM</p>
                <p className="text-lg font-extrabold text-primary font-mono">{test.wpm}</p>
              </div>

              <div className="p-2 rounded-xl bg-green-50/60 dark:bg-green-950/50">
                <p className="text-[10px] font-bold uppercase tracking-wider text-secondary dark:text-dark-secondary">Accuracy</p>
                <p className="text-lg font-extrabold text-success font-mono">{test.accuracy}%</p>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-secondary dark:text-dark-secondary">Mistakes</p>
                <p className="text-lg font-extrabold text-slate-700 dark:text-slate-300 font-mono">{test.mistakes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
