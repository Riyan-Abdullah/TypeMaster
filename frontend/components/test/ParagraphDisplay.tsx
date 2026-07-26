import React from 'react';

interface ParagraphDisplayProps {
  paragraph: string;
  userInput: string;
  isCompleted?: boolean;
}

export function ParagraphDisplay({ paragraph, userInput, isCompleted = false }: ParagraphDisplayProps) {
  const chars = paragraph.split('');
  const inputChars = userInput.split('');

  return (
    <div className="relative font-mono text-lg sm:text-xl md:text-2xl leading-relaxed sm:leading-loose tracking-wide select-none p-6 sm:p-8 bg-slate-50/60 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-dark-border shadow-inner transition-colors">
      {chars.map((char, index) => {
        let statusClass = 'text-slate-400 dark:text-slate-500';
        let bgClass = '';

        if (index < inputChars.length) {
          const typedChar = inputChars[index];
          if (typedChar === char) {
            statusClass = 'text-emerald-600 dark:text-emerald-400 font-semibold';
            bgClass = 'bg-emerald-50/80 dark:bg-emerald-950/40';
          } else {
            statusClass = 'text-rose-600 dark:text-rose-400 font-bold';
            bgClass = 'bg-rose-100/90 dark:bg-rose-950/60 rounded-xs';
          }
        } else if (index === inputChars.length && !isCompleted) {
          statusClass = 'text-primary font-bold';
          bgClass = 'bg-primary-100 dark:bg-primary-950/80 border-b-2 border-primary animate-pulse rounded-xs';
        }

        return (
          <span
            key={index}
            className={`transition-colors duration-100 ${statusClass} ${bgClass} px-[1px]`}
          >
            {char === ' ' && index < inputChars.length && inputChars[index] !== ' ' ? '•' : char}
          </span>
        );
      })}
    </div>
  );
}
