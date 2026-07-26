import { UserProfile } from './user';

export interface RecentTestItem {
  id: string;
  wpm: number;
  accuracy: number;
  duration_seconds: number;
  created_at: string;
}

export interface DashboardResponse {
  welcome_message: string;
  user: UserProfile;
  highest_wpm: number | null;
  average_wpm: number | null;
  best_accuracy: number | null;
  recent_tests: RecentTestItem[];
}
