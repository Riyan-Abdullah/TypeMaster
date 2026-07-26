import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-primary flex-shrink-0" />,
  };

  const bgStyles = {
    success: 'bg-white dark:bg-dark-card border-green-200 dark:border-green-800 text-text dark:text-dark-text',
    error: 'bg-white dark:bg-dark-card border-red-200 dark:border-red-800 text-text dark:text-dark-text',
    info: 'bg-white dark:bg-dark-card border-blue-200 dark:border-blue-800 text-text dark:text-dark-text',
  };

  return (
    <div
      role="alert"
      className={`flex items-center space-x-3 px-4 py-3 rounded-2xl border shadow-soft-lg dark:shadow-dark-soft transition-all duration-300 animate-slideInRight ${bgStyles[type]}`}
    >
      {icons[type]}
      <span className="text-sm font-medium leading-snug">{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-auto p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg focus:outline-none"
        aria-label="Dismiss toast notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
