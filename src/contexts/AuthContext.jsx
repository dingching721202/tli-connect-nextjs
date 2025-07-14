'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock users for demonstration with membership details
  const mockUsers = {
    'student@example.com': {
      id: 1,
      email: 'student@example.com',
      name: '王小明',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      membershipType: 'individual',
      membershipStatus: 'active',
      membership: {
        plan: 'yearly',
        planName: '一年方案',
        startDate: '2024-11-01',
        endDate: '2025-11-01',
        price: 36000,
        autoRenewal: true,
        daysRemaining: 316,
        isExpiringSoon: false
      },
      enrolledCourses: [],
      profile: {
        phone: '0912-345-678',
        level: '中級',
        joinDate: '2024-01-15'
      }
    },
    'instructor@example.com': {
      id: 2,
      email: 'instructor@example.com',
      name: '張老師',
      role: 'instructor',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      membershipType: null,
      membershipStatus: 'active', // Instructors are always active
      membership: null,
      courses: [1, 5, 24],
      profile: {
        phone: '0923-456-789',
        expertise: '商務華語、文法教學',
        experience: '8年教學經驗'
      }
    },
    'admin@example.com': {
      id: 3,
      email: 'admin@example.com',
      name: '系統管理員',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      membershipType: null,
      membershipStatus: 'active', // Admins are always active
      membership: null,
      profile: {
        phone: '0934-567-890',
        department: '教務處',
        permissions: ['all']
      }
    },
    'corporate@example.com': {
      id: 4,
      email: 'corporate@example.com',
      name: '企業員工A',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      membershipType: 'corporate',
      membershipStatus: 'active',
      companyName: '台灣科技股份有限公司',
      membership: {
        plan: 'corporate',
        planName: '企業方案',
        startDate: '2024-07-01',
        endDate: '2025-07-01',
        price: 26000,
        autoRenewal: true,
        daysRemaining: 183,
        isExpiringSoon: false
      },
      enrolledCourses: [],
      profile: {
        phone: '0912-345-678',
        level: '中級',
        joinDate: '2024-07-01'
      }
    }
  };

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Mock authentication
      const user = mockUsers[email];
      if (user && password === 'password') {
        setUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user };
      } else {
        return { success: false, error: '帳號或密碼錯誤' };
      }
    } catch (error) {
      return { success: false, error: '登入失敗，請稍後再試' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const hasPermission = (permission) => {
    if (!user) return false;

    // Admin has all permissions
    if (user.role === 'admin') return true;

    // Define role-based permissions
    const rolePermissions = {
      student: ['view_courses', 'book_courses', 'view_own_bookings'],
      instructor: ['view_courses', 'manage_own_courses', 'view_students', 'manage_courses'],
      admin: ['all']
    };

    // Special permissions
    if (permission === 'admin_access') return user.role === 'admin';
    if (permission === 'manage_courses') return user.role === 'instructor' || user.role === 'admin';

    return rolePermissions[user.role]?.includes(permission) || false;
  };

  const hasActiveMembership = () => {
    if (!user) return false;
    if (user.role !== 'student') return true; // Non-students always have access
    
    return user.membershipStatus === 'active';
  };

  const getMembershipDaysRemaining = () => {
    if (!user?.membership) return 0;
    return user.membership.daysRemaining;
  };

  const isMembershipExpiringSoon = () => {
    if (!user?.membership) return false;
    return user.membership.daysRemaining <= 14 && user.membership.daysRemaining > 0;
  };

  const value = {
    user,
    login,
    logout,
    updateProfile,
    hasPermission,
    hasActiveMembership,
    getMembershipDaysRemaining,
    isMembershipExpiringSoon,
    loading,
    isAuthenticated: !!user,
    isStudent: user?.role === 'student',
    isInstructor: user?.role === 'instructor',
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};