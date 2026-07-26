'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { TestDuration, TestStatus } from '@/types/test';
import { getRandomParagraph } from '@/data/paragraphs';
import { typingService } from '@/services/typingService';

export function useTypingTest(initialDuration: TestDuration = 30) {
  const [duration, setDuration] = useState<TestDuration>(initialDuration);
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);
  const [status, setStatus] = useState<TestStatus>('idle');
  const [paragraph, setParagraph] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');

  // Saving state
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasSavedRef = useRef<boolean>(false);

  // Initialize paragraph on client mount
  useEffect(() => {
    setParagraph(getRandomParagraph());
  }, []);

  // Calculate live performance metrics
  const { correctChars, incorrectChars, totalTyped, liveWpm, liveAccuracy, liveMistakes } = useMemo(() => {
    const chars = paragraph.split('');
    const inputChars = userInput.split('');

    let correct = 0;
    let incorrect = 0;

    inputChars.forEach((char, idx) => {
      if (idx < chars.length) {
        if (char === chars[idx]) {
          correct += 1;
        } else {
          incorrect += 1;
        }
      }
    });

    const total = inputChars.length;
    const elapsedSeconds = Math.max(1, duration - timeLeft);
    const elapsedMinutes = elapsedSeconds / 60;

    // Standard WPM formula: (Correct Chars / 5) / elapsed minutes
    const computedWpm = elapsedSeconds > 0 ? Math.round((correct / 5) / elapsedMinutes) : 0;
    const computedAccuracy = total > 0 ? Math.round((correct / total) * 100) : 100;

    return {
      correctChars: correct,
      incorrectChars: incorrect,
      totalTyped: total,
      liveWpm: computedWpm,
      liveAccuracy: computedAccuracy,
      liveMistakes: incorrect,
    };
  }, [paragraph, userInput, duration, timeLeft]);

  // Clear interval helper
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Save result to backend API when test finishes
  const saveResult = useCallback(async (finalWpm: number, finalAccuracy: number, finalMistakes: number) => {
    if (hasSavedRef.current) return;
    hasSavedRef.current = true;

    setIsSaving(true);
    setSaveError(null);

    try {
      await typingService.saveTestResult({
        duration,
        wpm: finalWpm,
        accuracy: finalAccuracy,
        mistakes: finalMistakes,
      });
      setIsSaved(true);
    } catch (err: any) {
      console.error('Error saving test result to backend:', err);
      setSaveError('Unable to save test result.');
    } finally {
      setIsSaving(false);
    }
  }, [duration]);

  // Handle countdown interval
  useEffect(() => {
    if (status === 'running') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopTimer();
            setStatus('completed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      stopTimer();
    }

    return () => stopTimer();
  }, [status, stopTimer]);

  // Trigger automated saving upon test completion
  useEffect(() => {
    if (status === 'completed') {
      saveResult(liveWpm, liveAccuracy, liveMistakes);
    }
  }, [status, saveResult, liveWpm, liveAccuracy, liveMistakes]);

  // Restart test with a new random paragraph
  const restartTest = useCallback(() => {
    stopTimer();
    setUserInput('');
    setStatus('idle');
    setTimeLeft(duration);
    setIsSaving(false);
    setSaveError(null);
    setIsSaved(false);
    hasSavedRef.current = false;
    setParagraph((prev) => getRandomParagraph(prev));
  }, [duration, stopTimer]);

  // Change duration mode
  const changeDuration = useCallback((newDuration: TestDuration) => {
    stopTimer();
    setDuration(newDuration);
    setTimeLeft(newDuration);
    setUserInput('');
    setStatus('idle');
    setIsSaving(false);
    setSaveError(null);
    setIsSaved(false);
    hasSavedRef.current = false;
    setParagraph((prev) => getRandomParagraph(prev));
  }, [stopTimer]);

  // Handle user typing input
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (status === 'completed') return;

    const newValue = e.target.value;
    if (newValue.length > paragraph.length) return;

    // Start timer on first character typed
    if (status === 'idle' && newValue.length > 0) {
      setStatus('running');
    }

    setUserInput(newValue);

    // Auto-complete if user finishes typing the entire paragraph
    if (newValue.length === paragraph.length && paragraph.length > 0) {
      stopTimer();
      setStatus('completed');
    }
  }, [status, paragraph.length, stopTimer]);

  return {
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
    isIdle: status === 'idle',
    isRunning: status === 'running',
    isCompleted: status === 'completed',
  };
}
