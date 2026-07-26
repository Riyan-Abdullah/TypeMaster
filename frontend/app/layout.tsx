import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';

export const metadata: Metadata = {
  title: {
    default: 'TypeMaster - Typing Speed Tester & Accuracy Benchmark',
    template: '%s | TypeMaster',
  },
  description: 'Test, track, and master your typing speed and accuracy with real-time performance analytics, mode selection, and test history.',
  keywords: ['typing test', 'typing speed', 'wpm test', 'words per minute', 'typing practice', 'typemaster', 'speed test'],
  authors: [{ name: 'TypeMaster Team' }],
  creator: 'TypeMaster',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://typemaster.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://typemaster.vercel.app',
    title: 'TypeMaster - Typing Speed Tester',
    description: 'Test your typing speed and track your WPM, accuracy, and practice history.',
    siteName: 'TypeMaster',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TypeMaster - Typing Speed Tester',
    description: 'Master your typing speed and accuracy with real-time analytics.',
    creator: '@typemaster',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="h-full bg-background dark:bg-dark-bg text-text dark:text-dark-text font-sans antialiased flex flex-col transition-colors duration-200 selection:bg-primary-100 selection:text-primary dark:selection:bg-primary-900 dark:selection:text-primary-200">
        <ThemeProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
