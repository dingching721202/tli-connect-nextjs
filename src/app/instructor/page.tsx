'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import InstructorPanel from '../../components/InstructorPanel';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import Navigation from '@/components/Navigation';

export default function InstructorPage() {
  const { user, loading, hasPermission } = useAuth();
  const router = useRouter();
    const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
    } else if (!hasPermission('manage_courses')) {
      router.replace('/dashboard');
    }
  }, [user, loading, hasPermission, pathname, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || !hasPermission('manage_courses')) {
    return null; // 或者顯示一個加載指示器，直到重定向完成
  }

  return (
    <>
      <Navigation />
      <InstructorPanel />
    </>
  );
}