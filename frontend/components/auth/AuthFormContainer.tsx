import React from 'react';
import { Card } from '@/components/ui/Card';
import { Keyboard } from 'lucide-react';
import Link from 'next/link';

interface AuthFormContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthFormContainer({ title, subtitle, children }: AuthFormContainerProps) {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link href="/" className="inline-flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
            <Keyboard className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-text dark:text-dark-text tracking-tight">
            Type<span className="text-primary">Master</span>
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-extrabold text-text dark:text-dark-text tracking-tight">{title}</h2>
        <p className="mt-1.5 text-sm text-secondary dark:text-dark-secondary">{subtitle}</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-soft-lg dark:shadow-dark-soft border-slate-100 dark:border-dark-border p-8">
          {children}
        </Card>
      </div>
    </div>
  );
}
