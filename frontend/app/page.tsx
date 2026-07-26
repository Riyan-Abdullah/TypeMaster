'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { Zap, TrendingUp, LayoutDashboard, ArrowRight, CheckCircle, Keyboard, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      title: 'Fast Typing Tests',
      description: 'Engage in lightning-fast speed tests with real-time WPM calculation and instant error detection.',
      icon: Zap,
      badge: 'Real-time',
    },
    {
      title: 'Performance Tracking',
      description: 'Track your speed improvements over time with visual analytics, accuracy ratios, and historical logs.',
      icon: TrendingUp,
      badge: 'Analytics',
    },
    {
      title: 'Personal Dashboard',
      description: 'A dedicated control center to review your highest WPM, average accuracy, and historical test sessions.',
      icon: LayoutDashboard,
      badge: 'Personalized',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Glow backdrop decorative effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-primary-200/40 dark:from-primary-900/30 to-blue-400/20 dark:to-blue-600/10 blur-3xl rounded-full -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-100 dark:border-primary-900 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production Grade Full-Stack Application</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text dark:text-dark-text tracking-tight leading-tight">
              Master Your Typing Speed & <span className="text-primary">Accuracy</span>
            </h1>

            <p className="text-lg sm:text-xl text-secondary dark:text-dark-secondary max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              TypeMaster provides real-time performance tracking, precision analytics, and a personal dashboard built to help you type faster and smarter.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {isAuthenticated ? (
                <Link href="/test">
                  <Button size="lg" className="w-full sm:w-auto font-bold" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Start Typing Test
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/signup">
                    <Button size="lg" className="w-full sm:w-auto font-bold" rightIcon={<ArrowRight className="w-5 h-5" />}>
                      Get Started Free
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs text-secondary dark:text-dark-secondary">
              <span className="flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Supabase Auth</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>FastAPI Backend</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Next.js 16 App Router</span>
              </span>
            </div>
          </div>

          {/* Hero Right Graphic Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <Card className="shadow-soft-lg dark:shadow-dark-soft border-slate-200/80 dark:border-dark-border p-6 bg-white/90 dark:bg-dark-card/90 backdrop-blur">
                {/* SVG Keyboard Mockup Illustration */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-border pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs font-mono text-secondary dark:text-dark-secondary">typemaster-preview.app</span>
                  </div>

                  <div className="bg-slate-900 rounded-xl p-5 text-white space-y-4 font-mono">
                    <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-2">
                      <span>WPM: <strong className="text-primary-500 font-bold">112</strong></span>
                      <span>Accuracy: <strong className="text-success font-bold">98.5%</strong></span>
                      <span>Time: <strong className="text-amber-400 font-bold">30s</strong></span>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-300">
                      <span className="text-success font-semibold">The quick brown fox</span>{' '}
                      <span className="bg-primary/40 underline decoration-primary font-bold">jumps</span>{' '}
                      <span className="text-slate-500">over the lazy dog with speed and accuracy...</span>
                    </p>

                    {/* Virtual Keycaps graphic */}
                    <div className="grid grid-cols-6 gap-1.5 pt-2">
                      {['Q','W','E','R','T','Y','A','S','D','F','G','H'].map((key, idx) => (
                        <div
                          key={key}
                          className={`h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                            idx === 3 || idx === 8
                              ? 'bg-primary text-white shadow-md scale-105'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {key}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-extrabold text-text dark:text-dark-text tracking-tight">
            Built for Typists & Developers
          </h2>
          <p className="text-base text-secondary dark:text-dark-secondary">
            Everything you need to benchmark your skills, improve accuracy, and monitor progression.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} hoverEffect className="relative flex flex-col justify-between p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950/60 text-primary flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary-50 dark:bg-primary-950/60 px-2.5 py-1 rounded-full">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-text dark:text-dark-text">{feature.title}</h3>
                  <p className="text-sm text-secondary dark:text-dark-secondary leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-soft-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to boost your typing speed?</h3>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl">
              Create your account today and unlock your personalized dashboard.
            </p>
          </div>
          <Link href={isAuthenticated ? '/test' : '/signup'}>
            <Button size="lg" className="bg-white text-primary hover:bg-slate-100 border-none font-bold">
              {isAuthenticated ? 'Start Typing Test' : 'Create Free Account'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
