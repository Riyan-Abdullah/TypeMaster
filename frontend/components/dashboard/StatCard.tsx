import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number | null;
  unit?: string;
  subtitle: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  iconBgColor = 'bg-primary-50 dark:bg-primary-950/60',
  iconColor = 'text-primary',
}: StatCardProps) {
  return (
    <Card hoverEffect className="relative overflow-hidden">
      <CardContent className="p-0 flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary dark:text-dark-secondary">
            {title}
          </p>
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-extrabold text-text dark:text-dark-text tracking-tight font-mono">
              {value !== null && value !== undefined ? value : '--'}
            </span>
            {unit && value !== null && (
              <span className="text-sm font-medium text-secondary dark:text-dark-secondary">{unit}</span>
            )}
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">{subtitle}</p>
        </div>

        <div className={`p-3 rounded-2xl ${iconBgColor} ${iconColor} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </CardContent>
    </Card>
  );
}
