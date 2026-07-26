import { apiClient } from './api';
import { UserStats, PaginatedHistory } from '@/types/history';

export interface TypingTestPayload {
  duration: number;
  wpm: number;
  accuracy: number;
  mistakes: number;
}

export interface TypingTestResultResponse {
  id: string;
  user_id: string;
  duration: number;
  wpm: number;
  accuracy: number;
  mistakes: number;
  created_at: string;
}

export interface HistoryQueryParams {
  duration?: string;
  sort_by?: string;
  search?: string;
  page?: number;
  page_size?: number;
}

export const typingService = {
  async saveTestResult(payload: TypingTestPayload): Promise<TypingTestResultResponse> {
    const response = await apiClient.post<TypingTestResultResponse>('/api/tests', payload);
    return response.data;
  },

  async getLatestTest(): Promise<TypingTestResultResponse> {
    const response = await apiClient.get<TypingTestResultResponse>('/api/tests/latest');
    return response.data;
  },

  async getStats(): Promise<UserStats> {
    const response = await apiClient.get<UserStats>('/api/tests/stats');
    return response.data;
  },

  async getHistory(params?: HistoryQueryParams): Promise<PaginatedHistory> {
    const response = await apiClient.get<PaginatedHistory>('/api/tests/history', {
      params,
    });
    return response.data;
  }
};
