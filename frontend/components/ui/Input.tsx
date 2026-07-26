import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-dark-text">
            {label}
          </label>
        )}
        <div className="relative rounded-xl shadow-sm">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-secondary dark:text-dark-secondary">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-4 py-2.5 bg-slate-50/50 dark:bg-slate-900/60 border border-slate-200 dark:border-dark-border text-text dark:text-dark-text placeholder-slate-400 dark:placeholder-slate-500 text-sm rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white dark:focus:bg-dark-card',
              leftIcon && 'pl-10',
              error && 'border-error focus:ring-error text-error placeholder-red-300',
              className
            )}
            {...props}
          />
        </div>
        {error ? (
          <p className="text-xs text-error font-medium animate-fadeIn">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-secondary dark:text-dark-secondary">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
