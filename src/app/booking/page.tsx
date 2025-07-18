'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import BookingSystem from '../../components/BookingSystem';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import Navigation from '@/components/Navigation';

export default function BookingPage() {
  const { user, loading, hasPermission } = useAuth();
  const router = useRouter();
    const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
    } else if (!hasPermission('book_courses')) {
      router.replace('/dashboard');
    }
  }, [user, loading, hasPermission, pathname, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || !hasPermission('book_courses')) {
    return null; // 或者顯示一個加載指示器，直到重定向完成
  }

  return (
    <>
      <Navigation />
      <BookingSystem />
    </>
  );
}