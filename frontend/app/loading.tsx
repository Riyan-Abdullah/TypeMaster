import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-slate-800 flex items-center justify-center text-primary shadow-soft">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
      <p className="text-sm font-semibold text-secondary dark:text-dark-secondary">
        Loading TypeMaster...
      </p>
    </div>
  );
}
