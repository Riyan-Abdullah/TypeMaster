import React from 'react';
import { DurationFilter, SortOption } from '@/types/history';
import { ArrowUpDown, Filter } from 'lucide-react';

interface HistoryFiltersProps {
  durationFilter: DurationFilter;
  onDurationChange: (dur: DurationFilter) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function HistoryFilters({
  durationFilter,
  onDurationChange,
  sortOption,
  onSortChange,
}: HistoryFiltersProps) {
  const durations: { label: string; value: DurationFilter }[] = [
    { label: 'All', value: 'all' },
    { label: '15 Seconds', value: '15' },
    { label: '30 Seconds', value: '30' },
    { label: '60 Seconds', value: '60' },
  ];

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: 'Newest First', value: 'newest' },
    { label: 'Oldest First', value: 'oldest' },
    { label: 'Highest WPM', value: 'highest_wpm' },
    { label: 'Lowest WPM', value: 'lowest_wpm' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-100/70 dark:bg-slate-800/80 p-2 rounded-2xl border border-slate-200/60 dark:border-dark-border">
      {/* Duration Filter Tabs */}
      <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
        <div className="flex items-center space-x-1.5 px-2 text-xs font-semibold text-secondary dark:text-dark-secondary">
          <Filter className="w-3.5 h-3.5 text-primary" />
          <span className="hidden md:inline">Mode:</span>
        </div>
        {durations.map((dur) => {
          const isActive = durationFilter === dur.value;
          return (
            <button
              key={dur.value}
              type="button"
              onClick={() => onDurationChange(dur.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-primary text-white shadow-soft'
                  : 'text-secondary dark:text-dark-secondary hover:text-text dark:hover:text-dark-text hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
              }`}
            >
              {dur.label}
            </button>
          );
        })}
      </div>

      {/* Sort Select Dropdown */}
      <div className="flex items-center space-x-2 px-2">
        <div className="flex items-center space-x-1.5 text-xs font-semibold text-secondary dark:text-dark-secondary">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
          <span>Sort:</span>
        </div>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-text dark:text-dark-text text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
