export type TestDuration = 15 | 30 | 60;

export type TestStatus = 'idle' | 'running' | 'completed';

export type CharStatus = 'correct' | 'incorrect' | 'untyped' | 'current';

export interface CharState {
  char: string;
  status: CharStatus;
}
