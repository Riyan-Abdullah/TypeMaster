'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { typingService, TypingTestResultResponse } from '@/services/typingService';
import { UserStats } from '@/types/history';
import { StatCard } from '@/components/dashboard/StatCard';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDate } from '@/lib/utils';
import { Trophy, Activity, Target, FileCheck, Clock, Calendar, Mail, User as UserIcon, Loader2, Sparkles, Play, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [recentTests, setRecentTests] = useState<TypingTestResultResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [fetchedStats, historyData] = await Promise.all([
        typingService.getStats().catch(() => null),
        typingService.getHistory({ page: 1, page_size: 5, sort_by: 'newest' }).catch(() => null),
      ]);

      if (fetchedStats) {
        setStats(fetchedStats);
      }
      if (historyData) {
        setRecentTests(historyData.items);
      }
    } catch (err) {
      console.error('Error loading dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const userName = user?.user_metadata?.full_name || 'TypeMaster User';
  const userEmail = user?.email || 'N/A';
  const userCreatedAt = formatDate(user?.created_at);

  // Format practice time into human readable string
  const formatPracticeTime = (seconds: number) => {
    if (!seconds || seconds <= 0) return '0s';
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const remainingSecs = seconds % 60;
    if (mins < 60) {
      return remainingSecs > 0 ? `${mins}m ${remainingSecs}s` : `${mins} mins`;
    }
    const hrs = (seconds / 3600).toFixed(1);
    return `${hrs} hrs`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Welcome Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-soft-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-primary-200 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Phase 4 Dashboard Active</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {userName}!
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Track your typing growth, monitor overall metrics, and take tests to set new personal bests.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <Link href="/test">
              <Button size="lg" className="w-full font-bold shadow-soft" leftIcon={<Play className="w-4 h-4 fill-white" />}>
                Start Typing Test
              </Button>
            </Link>

            {/* Quick Details Pill */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 space-y-1.5 text-xs text-slate-300 min-w-[200px]">
              <div className="flex items-center space-x-2">
                <UserIcon className="w-3.5 h-3.5 text-primary-400" />
                <span className="font-semibold text-white truncate max-w-[150px]">{userName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate max-w-[150px]">{userEmail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section: 5 Summary Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-text tracking-tight">
          Performance Overview
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* 1. Highest WPM */}
            <StatCard
              title="Highest WPM"
              value={stats?.highest_wpm ?? null}
              unit="WPM"
              subtitle="Personal best speed"
              icon={Trophy}
              iconBgColor="bg-amber-50"
              iconColor="text-amber-500"
            />

            {/* 2. Average WPM */}
            <StatCard
              title="Average WPM"
              value={stats?.average_wpm ?? null}
              unit="WPM"
              subtitle="Overall speed avg"
              icon={Activity}
              iconBgColor="bg-primary-50"
              iconColor="text-primary"
            />

            {/* 3. Best Accuracy */}
            <StatCard
              title="Best Accuracy"
              value={stats?.best_accuracy ?? null}
              unit="%"
              subtitle="Top precision"
              icon={Target}
              iconBgColor="bg-green-50"
              iconColor="text-success"
            />

            {/* 4. Total Tests */}
            <StatCard
              title="Total Tests"
              value={stats?.total_tests ?? 0}
              subtitle="Tests completed"
              icon={FileCheck}
              iconBgColor="bg-blue-50"
              iconColor="text-blue-600"
            />

            {/* 5. Total Practice Time */}
            <StatCard
              title="Practice Time"
              value={formatPracticeTime(stats?.total_practice_time_seconds || 0)}
              subtitle="Total time spent"
              icon={Clock}
              iconBgColor="bg-purple-50"
              iconColor="text-purple-600"
            />
          </div>
        )}
      </div>

      {/* Recent Tests Section */}
      <div className="space-y-4 pt-2">
        <Card className="border-slate-100 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Tests</CardTitle>
            <Link href="/history">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View Full History
              </Button>
            </Link>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            ) : recentTests.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {recentTests.map((test) => (
                  <div key={test.id} className="py-3 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-bold">
                        {test.wpm}
                      </div>
                      <div>
                        <p className="font-semibold text-text">{test.wpm} WPM ({test.accuracy}% Acc)</p>
                        <p className="text-xs text-secondary">{formatDate(test.created_at)} • {test.duration}s mode</p>
                      </div>
                    </div>

                    <span className="text-xs text-secondary font-medium">
                      {test.mistakes} mistakes
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No typing tests yet"
                description="Take your first typing speed test to record your stats and track history."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
