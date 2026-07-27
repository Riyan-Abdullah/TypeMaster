import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TypingTestResultResponse } from '@/services/typingService';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import { EmptyState } from '@/components/dashboard/EmptyState';

interface PerformanceChartProps {
  data: TypingTestResultResponse[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="border-slate-100 shadow-soft dark:border-dark-border">
        <CardHeader>
          <CardTitle className="text-lg text-text dark:text-dark-text">Performance Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <EmptyState
            title="Not enough data"
            description="Take more tests to see your performance chart over time."
          />
        </CardContent>
      </Card>
    );
  }

  // Format data for chart (oldest to newest)
  // Assuming the data is already reversed before passing to this component
  const chartData = data.map((test) => ({
    date: formatDate(test.created_at).split(' ')[0], // Just the date part
    fullDate: formatDate(test.created_at),
    wpm: test.wpm,
    accuracy: test.accuracy,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">{payload[0].payload.fullDate}</p>
          <div className="space-y-1">
            <p className="text-sm font-bold text-primary">
              Speed: {payload[0].value} WPM
            </p>
            <p className="text-sm font-bold text-success">
              Accuracy: {payload[1].value}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-slate-100 shadow-soft dark:border-dark-border h-full">
      <CardHeader>
        <CardTitle className="text-lg text-text dark:text-dark-text">Performance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 5,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#64748b' }} 
                dy={10} 
              />
              <YAxis 
                yAxisId="left" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#64748b' }} 
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#64748b' }} 
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="wpm"
                name="WPM"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="accuracy"
                name="Accuracy %"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
