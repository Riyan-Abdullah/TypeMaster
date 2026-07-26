'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center p-8 space-y-6 border-red-200 dark:border-red-900/50 bg-white dark:bg-dark-card">
        <div className="w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-950/40 text-error flex items-center justify-center mx-auto shadow-soft">
          <AlertCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-error bg-red-50 dark:bg-red-950/40 px-3 py-1 rounded-full">
            500 Internal Error
          </span>
          <h1 className="text-3xl font-extrabold text-text dark:text-dark-text tracking-tight">Something Went Wrong</h1>
          <p className="text-sm text-secondary dark:text-dark-secondary leading-relaxed">
            An unexpected error occurred while processing your request.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            variant="primary"
            onClick={() => reset()}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Try Again
          </Button>

          <Link href="/">
            <Button variant="outline" className="w-full" leftIcon={<Home className="w-4 h-4" />}>
              Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
