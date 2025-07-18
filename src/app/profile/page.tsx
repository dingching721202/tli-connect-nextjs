'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import UserProfile from '../../components/UserProfile';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import Navigation from '@/components/Navigation';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
    const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null; // 或者顯示一個加載指示器，直到重定向完成
  }

  return (
    <>
      <Navigation />
      <UserProfile />
    </>
  );
}