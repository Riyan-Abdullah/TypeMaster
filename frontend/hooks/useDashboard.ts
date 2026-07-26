'use client';

import { useState, useEffect, useCallback } from 'react';
import { userService } from '@/services/userService';
import { DashboardResponse } from '@/types/dashboard';

export function useDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await userService.getDashboard();
      setData(res);
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      // Fallback dashboard if backend is unreachable or returning error
      setError('Could not connect to FastAPI server. Showing local user state.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboard,
  };
}
