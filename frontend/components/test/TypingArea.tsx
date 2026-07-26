import React, { useRef, useEffect } from 'react';

interface TypingAreaProps {
  userInput: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  isIdle?: boolean;
}

export function TypingArea({
  userInput,
  onChange,
  disabled = false,
  placeholder = 'Click here or start typing to begin the test...',
  isIdle = false,
}: TypingAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!disabled && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [disabled, isIdle]);

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={userInput}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        rows={3}
        className="w-full px-5 py-4 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-text dark:text-dark-text placeholder-slate-400 dark:placeholder-slate-500 text-base font-mono rounded-2xl shadow-soft focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:opacity-60 disabled:cursor-not-allowed"
        autoFocus
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        aria-label="Typing test input text area"
      />
      {disabled && (
        <div className="absolute inset-0 bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-[1px] rounded-2xl flex items-center justify-center pointer-events-none">
          <span className="text-sm font-semibold text-secondary dark:text-dark-secondary bg-white dark:bg-dark-card px-4 py-2 rounded-xl shadow-soft border border-slate-200 dark:border-dark-border">
            Time expired! Press Restart or Esc to try again.
          </span>
        </div>
      )}
    </div>
  );
}
