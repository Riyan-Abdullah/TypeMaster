'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { typingService, TypingTestResultResponse } from '@/services/typingService';
import { DurationFilter, SortOption } from '@/types/history';
import { HistoryTable } from '@/components/history/HistoryTable';
import { HistoryFilters } from '@/components/history/HistoryFilters';
import { SearchBar } from '@/components/history/SearchBar';
import { Pagination } from '@/components/history/Pagination';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/context/ToastContext';
import { History, Play, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

export default function HistoryPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<TypingTestResultResponse[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await typingService.getHistory({
        duration: durationFilter,
        sort_by: sortOption,
        search: search.trim() || undefined,
        page,
        page_size: 10,
      });
      setItems(res.items);
      setTotal(res.total);
      setTotalPages(res.total_pages);
    } catch (err: any) {
      console.error('Error fetching history:', err);
      const errMsg = 'Could not load typing history. Please check connection and try again.';
      setError(errMsg);
      showToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  }, [durationFilter, sortOption, search, page, showToast]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDurationChange = (dur: DurationFilter) => {
    setDurationFilter(dur);
    setPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
    setPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-dark-border pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Test History Suite</span>
          </div>
          <h1 className="text-3xl font-extrabold text-text dark:text-dark-text tracking-tight flex items-center space-x-2.5">
            <History className="w-8 h-8 text-primary" />
            <span>Test History</span>
          </h1>
          <p className="text-sm text-secondary dark:text-dark-secondary mt-1">
            Review your past typing performance, filter by mode, and monitor progress over time.
          </p>
        </div>

        <Link href="/test">
          <Button variant="primary" size="md" leftIcon={<Play className="w-4 h-4 fill-white" />}>
            New Typing Test
          </Button>
        </Link>
      </div>

      {/* Controls Bar: Search & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <SearchBar value={search} onChange={handleSearchChange} />
          <HistoryFilters
            durationFilter={durationFilter}
            onDurationChange={handleDurationChange}
            sortOption={sortOption}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      {/* Main Content Area */}
      {error ? (
        <Card className="p-8 text-center bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-error flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-error">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchHistory}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Retry
          </Button>
        </Card>
      ) : loading ? (
        /* Skeleton Loaders */
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-2xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        /* Empty State */
        <Card className="border-dashed border-2 border-slate-200 dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/40 py-16 px-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto">
            <History className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-text dark:text-dark-text">No typing tests found</h3>
            <p className="text-sm text-secondary dark:text-dark-secondary max-w-md mx-auto">
              {search || durationFilter !== 'all'
                ? 'No test results match your current search or duration filter. Try clearing filters.'
                : 'You have not completed any typing speed tests yet. Take your first test to build your history!'}
            </p>
          </div>
          <Link href="/test">
            <Button variant="primary" size="lg" className="font-bold" leftIcon={<Play className="w-4 h-4 fill-white" />}>
              Start Your First Test
            </Button>
          </Link>
        </Card>
      ) : (
        /* History Table & Cards */
        <div className="space-y-6">
          <HistoryTable items={items} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      )}
    </div>
  );
}
