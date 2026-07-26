import React from 'react';
import { FileQuestion } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = 'No tests yet',
  description = 'Your test history will appear here once you complete a test.',
}: EmptyStateProps) {
  return (
    <Card className="border-dashed border-2 border-slate-200 dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/40 py-12 px-6 text-center">
      <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4">
        <FileQuestion className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-text dark:text-dark-text mb-1">{title}</h4>
      <p className="text-sm text-secondary dark:text-dark-secondary max-w-sm mx-auto">{description}</p>
    </Card>
  );
}
