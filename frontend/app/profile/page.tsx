'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { userService } from '@/services/userService';
import { UserProfile } from '@/types/user';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { User, Mail, Calendar, ShieldCheck, LogOut, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const fetchedProfile = await userService.getProfile();
        setProfile(fetchedProfile);
      } catch (err) {
        console.error('Error loading user profile:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const fullName = profile?.full_name || user?.user_metadata?.full_name || 'TypeMaster User';
  const email = profile?.email || user?.email || 'N/A';
  const createdAt = formatDate(profile?.created_at || user?.created_at);

  const handleLogout = async () => {
    try {
      await logout();
      showToast('Logged out successfully', 'info');
      router.push('/');
    } catch {
      showToast('Logout failed', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-extrabold text-text dark:text-dark-text tracking-tight">User Profile</h1>
        <p className="text-secondary dark:text-dark-secondary text-sm mt-1">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card Summary */}
        <Card className="md:col-span-1 text-center p-8 flex flex-col items-center justify-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-primary-50 dark:bg-primary-950/60 border-4 border-white dark:border-dark-card shadow-soft flex items-center justify-center text-primary text-3xl font-extrabold">
            {fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-text dark:text-dark-text">{fullName}</h3>
            <p className="text-xs text-secondary dark:text-dark-secondary">{email}</p>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-950/60 text-success text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Account</span>
          </div>

          <div className="w-full pt-4 border-t border-slate-100 dark:border-dark-border">
            <Button
              variant="outline"
              className="w-full text-error border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/30"
              leftIcon={<LogOut className="w-4 h-4" />}
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </Card>

        {/* Detailed Account Information */}
        <Card className="md:col-span-2 p-8">
          <CardHeader className="border-b border-slate-100 dark:border-dark-border pb-4 mb-6">
            <CardTitle>Account Details</CardTitle>
          </CardHeader>

          {loading ? (
            <div className="py-12 flex items-center justify-center space-x-2 text-secondary dark:text-dark-secondary">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span>Fetching profile details...</span>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-secondary dark:text-dark-secondary">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-secondary dark:text-dark-secondary">Full Name</p>
                  <p className="text-base font-medium text-text dark:text-dark-text mt-0.5">{fullName}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-secondary dark:text-dark-secondary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-secondary dark:text-dark-secondary">Email Address</p>
                  <p className="text-base font-medium text-text dark:text-dark-text mt-0.5">{email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-secondary dark:text-dark-secondary">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-secondary dark:text-dark-secondary">Account Created</p>
                  <p className="text-base font-medium text-text dark:text-dark-text mt-0.5">{createdAt}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
