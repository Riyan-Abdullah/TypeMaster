import { apiClient } from './api';
import { UserProfile } from '@/types/user';
import { DashboardResponse } from '@/types/dashboard';

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>('/api/user/profile');
    return response.data;
  },

  async getDashboard(): Promise<DashboardResponse> {
    const response = await apiClient.get<DashboardResponse>('/api/dashboard');
    return response.data;
  }
};
