'use client';

import React, { useEffect } from 'react';
import { useTypingTest } from '@/hooks/useTypingTest';
import { useToast } from '@/context/ToastContext';
import { ModeSelector } from '@/components/test/ModeSelector';
import { TimerDisplay } from '@/components/test/TimerDisplay';
import { ParagraphDisplay } from '@/components/test/ParagraphDisplay';
import { TypingArea } from '@/components/test/TypingArea';
import { PerformanceStats } from '@/components/test/PerformanceStats';
import { ResultCard } from '@/components/test/ResultCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RotateCcw, Keyboard, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TypingTestPage() {
  const { showToast } = useToast();
  const {
    duration,
    timeLeft,
    status,
    paragraph,
    userInput,
    liveWpm,
    liveAccuracy,
    liveMistakes,
    isSaving,
    saveError,
    isSaved,
    handleInputChange,
    restartTest,
    changeDuration,
    isIdle,
    isRunning,
    isCompleted,
  } = useTypingTest(30);

  // Show toast notification when result is saved or errors
  useEffect(() => {
    if (isSaved) {
      showToast('Test result saved successfully!', 'success');
    }
    if (saveError) {
      showToast(saveError, 'error');
    }
  }, [isSaved, saveError, showToast]);

  // Global shortcut to restart test (Esc key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        restartTest();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [restartTest]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Test Page Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 dark:border-dark-border pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Typing Speed Suite</span>
          </div>
          <h1 className="text-3xl font-extrabold text-text dark:text-dark-text tracking-tight flex items-center space-x-2">
            <span>Typing Speed Test</span>
          </h1>
          <p className="text-sm text-secondary dark:text-dark-secondary mt-1">
            Select duration mode and start typing to begin real-time performance tracking.
          </p>
        </div>

        {/* Mode Selector */}
        <ModeSelector
          currentDuration={duration}
          onSelectMode={changeDuration}
          disabled={isRunning}
        />
      </div>

      {/* Live Performance Bar */}
      <PerformanceStats
        wpm={liveWpm}
        accuracy={liveAccuracy}
        mistakes={liveMistakes}
        isRunning={isRunning}
      />

      {/* Main Typing Container Card */}
      <Card className="p-6 sm:p-10 shadow-soft-lg dark:shadow-dark-soft space-y-8 border-slate-100/90 dark:border-dark-border relative">
        {/* Top Status Bar: Timer & State Badge */}
        <div className="flex items-center justify-between">
          <TimerDisplay timeLeft={timeLeft} totalDuration={duration} />

          <div className="flex items-center space-x-3">
            {isIdle && (
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
                <Keyboard className="w-4 h-4 text-primary" />
                <span>Ready — Start typing</span>
              </span>
            )}
            {isRunning && (
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-primary bg-primary-50 dark:bg-primary-950/60 px-3 py-1.5 rounded-xl border border-primary-100 dark:border-primary-900 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Live Test Running</span>
              </span>
            )}
            {isCompleted && (
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-success bg-green-50 dark:bg-green-950/60 px-3 py-1.5 rounded-xl border border-green-200 dark:border-green-900">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Test Completed</span>
              </span>
            )}
          </div>
        </div>

        {/* Paragraph Target Display */}
        <ParagraphDisplay
          paragraph={paragraph}
          userInput={userInput}
          isCompleted={isCompleted}
        />

        {/* User Input Area */}
        <TypingArea
          userInput={userInput}
          onChange={handleInputChange}
          disabled={isCompleted}
          isIdle={isIdle}
          placeholder={
            isIdle
              ? 'Start typing here... Timer will begin automatically on first character.'
              : 'Keep typing...'
          }
        />

        {/* Bottom Control Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-dark-border">
          <div className="text-xs text-secondary dark:text-dark-secondary hidden sm:block">
            Tip: Press <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-dark-border rounded-md font-mono text-[10px] font-bold text-text dark:text-dark-text">Esc</kbd> anytime to instantly restart test.
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              onClick={restartTest}
              leftIcon={<RotateCcw className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Restart
            </Button>
          </div>
        </div>
      </Card>

      {/* Result Card Modal Overlay when completed */}
      {isCompleted && (
        <ResultCard
          wpm={liveWpm}
          accuracy={liveAccuracy}
          mistakes={liveMistakes}
          duration={duration}
          onRestart={restartTest}
          isSaving={isSaving}
          saveError={saveError}
          isSaved={isSaved}
        />
      )}
    </div>
  );
}
