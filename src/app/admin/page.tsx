'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminPanel from '../../components/AdminPanel';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import Navigation from '@/components/Navigation';

export default function AdminPage() {
  const { user, loading, hasPermission } = useAuth();
  const router = useRouter();
    const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
    } else if (!hasPermission('admin_access')) {
      router.replace('/dashboard');
    }
  }, [user, loading, hasPermission, pathname, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || !hasPermission('admin_access')) {
    return null; // 或者顯示一個加載指示器，直到重定向完成
  }

  return (
    <>
      <Navigation />
      <AdminPanel />
    </>
  );
}