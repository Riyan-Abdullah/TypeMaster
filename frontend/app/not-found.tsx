import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center p-8 space-y-6 border-slate-200 dark:border-dark-border">
        <div className="w-20 h-20 rounded-3xl bg-primary-50 dark:bg-slate-800 text-primary flex items-center justify-center mx-auto shadow-soft">
          <FileQuestion className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-50 dark:bg-slate-800 px-3 py-1 rounded-full">
            404 Error
          </span>
          <h1 className="text-3xl font-extrabold text-text dark:text-dark-text tracking-tight">Page Not Found</h1>
          <p className="text-sm text-secondary dark:text-dark-secondary leading-relaxed">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link href="/" className="w-full">
            <Button variant="primary" className="w-full" leftIcon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
