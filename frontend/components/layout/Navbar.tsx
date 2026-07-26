'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Keyboard, Menu, X, LogOut, User as UserIcon, LayoutDashboard, Home, History } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useToast } from '@/context/ToastContext';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      showToast('Logged out successfully', 'info');
      setMobileMenuOpen(false);
      router.push('/');
    } catch {
      showToast('Logout failed', 'error');
    }
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: Home, showAlways: true },
    { name: 'Typing Test', href: '/test', icon: Keyboard, showAlways: true },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, protected: true },
    { name: 'History', href: '/history', icon: History, protected: true },
    { name: 'Profile', href: '/profile', icon: UserIcon, protected: true },
  ];

  const visibleLinks = navLinks.filter(
    (link) => link.showAlways || (link.protected ? isAuthenticated : true)
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-slate-100 dark:border-dark-border shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group" aria-label="TypeMaster Home">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
              <Keyboard className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-text dark:text-dark-text tracking-tight">
              Type<span className="text-primary">Master</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {visibleLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-950/60 text-primary font-semibold'
                      : 'text-secondary dark:text-dark-secondary hover:text-text dark:hover:text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side Theme Toggle & Auth */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-xs font-medium text-secondary dark:text-dark-secondary truncate max-w-[150px]">
                  {user?.user_metadata?.full_name || user?.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  leftIcon={<LogOut className="w-4 h-4 text-error" />}
                  aria-label="Logout of account"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Bar: Theme Toggle & Hamburger */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-secondary dark:text-dark-secondary hover:text-text dark:hover:text-dark-text hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dark-card border-b border-slate-100 dark:border-dark-border px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <div className="space-y-1">
            {visibleLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-950/60 text-primary font-semibold'
                      : 'text-secondary dark:text-dark-secondary hover:text-text dark:hover:text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-dark-border space-y-2">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="px-4 text-xs font-medium text-secondary dark:text-dark-secondary">
                  Signed in as <span className="text-text dark:text-dark-text font-semibold">{user?.email}</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start text-error border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/30"
                  onClick={handleLogout}
                  leftIcon={<LogOut className="w-4 h-4" />}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
