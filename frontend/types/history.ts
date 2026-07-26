import { TypingTestResultResponse } from '@/services/typingService';

export type DurationFilter = 'all' | '15' | '30' | '60';

export type SortOption = 'newest' | 'oldest' | 'highest_wpm' | 'lowest_wpm';

export interface UserStats {
  highest_wpm: number | null;
  average_wpm: number | null;
  best_accuracy: number | null;
  total_tests: number;
  total_practice_time_seconds: number;
}

export interface PaginatedHistory {
  items: TypingTestResultResponse[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
