import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Trophy, Target, AlertTriangle, Clock, Calendar, RotateCcw, LayoutDashboard, AlertCircle, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ResultCardProps {
  wpm: number;
  accuracy: number;
  mistakes: number;
  duration: number;
  onRestart: () => void;
  isSaving?: boolean;
  saveError?: string | null;
  isSaved?: boolean;
}

export function ResultCard({
  wpm,
  accuracy,
  mistakes,
  duration,
  onRestart,
  isSaving = false,
  saveError = null,
  isSaved = false,
}: ResultCardProps) {
  const currentDateFormatted = formatDate(new Date().toISOString());

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <Card className="w-full max-w-lg shadow-soft-lg dark:shadow-dark-soft border-slate-100 dark:border-dark-border p-6 sm:p-8 bg-white dark:bg-dark-card space-y-6 relative overflow-hidden animate-scaleUp">
        {/* Decorative Top Accent Banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-blue-500 to-emerald-500" />

        {/* Header */}
        <div className="text-center space-y-1 pt-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 mb-2 shadow-soft">
            <Trophy className="w-8 h-8 animate-bounce" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text dark:text-dark-text tracking-tight">
            🎉 Test Completed!
          </h2>
          <p className="text-sm text-secondary dark:text-dark-secondary">
            Great job! Here is your typing speed performance breakdown.
          </p>
        </div>

        {/* Toast Alert Notification if saving fails */}
        {saveError && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs font-semibold text-error flex items-center space-x-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Unable to save test result. Showing local score.</span>
          </div>
        )}

        {/* Success toast if saved */}
        {isSaved && !saveError && (
          <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 text-xs font-semibold text-success flex items-center justify-center space-x-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Result saved securely to database!</span>
          </div>
        )}

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          {/* WPM Card */}
          <div className="p-4 rounded-2xl bg-primary-50/70 dark:bg-primary-950/50 border border-primary-100 dark:border-primary-900 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-primary">
              <span className="text-xs font-bold uppercase tracking-wider">Speed</span>
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <span className="text-3xl font-extrabold text-text dark:text-dark-text font-mono tracking-tight">{wpm}</span>
              <span className="text-xs font-semibold text-secondary dark:text-dark-secondary ml-1">WPM</span>
            </div>
          </div>

          {/* Accuracy Card */}
          <div className="p-4 rounded-2xl bg-green-50/70 dark:bg-green-950/50 border border-green-100 dark:border-green-900 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-success">
              <span className="text-xs font-bold uppercase tracking-wider">Accuracy</span>
              <Target className="w-4 h-4" />
            </div>
            <div>
              <span className="text-3xl font-extrabold text-text dark:text-dark-text font-mono tracking-tight">{accuracy}%</span>
            </div>
          </div>

          {/* Mistakes Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-dark-border flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-error">
              <span className="text-xs font-bold uppercase tracking-wider">Mistakes</span>
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-text dark:text-dark-text font-mono tracking-tight">{mistakes}</span>
              <span className="text-xs font-semibold text-secondary dark:text-dark-secondary ml-1">chars</span>
            </div>
          </div>

          {/* Duration Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-dark-border flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-secondary dark:text-dark-secondary">
              <span className="text-xs font-bold uppercase tracking-wider">Duration</span>
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-text dark:text-dark-text font-mono tracking-tight">{duration}s</span>
              <span className="text-xs font-semibold text-secondary dark:text-dark-secondary ml-1">mode</span>
            </div>
          </div>
        </div>

        {/* Date & Time Footer */}
        <div className="flex items-center justify-center space-x-2 text-xs text-secondary dark:text-dark-secondary border-t border-slate-100 dark:border-dark-border pt-4">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Test completed on {currentDateFormatted}</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={onRestart}
            disabled={isSaving}
            isLoading={isSaving}
            className="w-full font-bold"
            leftIcon={!isSaving ? <RotateCcw className="w-4 h-4" /> : null}
          >
            Restart Test
          </Button>

          <Link href="/dashboard" className="w-full">
            <Button
              variant="outline"
              size="lg"
              disabled={isSaving}
              className="w-full font-semibold"
              leftIcon={<LayoutDashboard className="w-4 h-4" />}
            >
              Dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
