import React,{useState} from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {motion,AnimatePresence} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import {useAuth} from '../contexts/AuthContext';

const {FiHome,FiCalendar,FiUser,FiSettings,FiLogOut,FiMenu,FiX,FiBook,FiUsers,FiBarChart3,FiBookOpen,FiClock,FiTrendingUp}=FiIcons;

const Navigation=()=> {
  const [isOpen,setIsOpen]=useState(false);
  const {user,logout,hasPermission}=useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout=()=> {
    logout();
    router.push('/login');
  };

  const getNavigationItems=()=> {
    const items=[];

    // Common items for all roles
    items.push({
      name: '儀表板',
      path: '/dashboard',
      icon: FiHome,
      permission: null
    });

    // Admin specific navigation
    if (hasPermission('admin_access')) {
      items.push(
        {
          name: '用戶管理',
          path: '/admin?tab=users',
          icon: FiUsers,
          permission: 'admin_access'
        },
        {
          name: '課程管理',
          path: '/admin?tab=courses',
          icon: FiBookOpen,
          permission: 'admin_access'
        },
        {
          name: '請假管理',
          path: '/admin?tab=leave',
          icon: FiClock,
          permission: 'admin_access'
        },
        {
          name: '代理管理', // 🔄 新增代理管理導航
          path: '/admin?tab=agents',
          icon: FiTrendingUp,
          permission: 'admin_access'
        },
        {
          name: '系統設定',
          path: '/admin?tab=settings',
          icon: FiSettings,
          permission: 'admin_access'
        }
      );
    }

    // Student specific navigation
    if (user?.role==='student') {
      items.push({
        name: '課程預約',
        path: '/booking',
        icon: FiCalendar,
        permission: 'book_courses'
      });
    }

    // Instructor specific navigation (but not if admin)
    if (hasPermission('manage_courses') && !hasPermission('admin_access')) {
      items.push({
        name: '課程管理',
        path: '/instructor',
        icon: FiBookOpen,
        permission: 'manage_courses'
      });
    }

    // Profile for all users
    items.push({
      name: '個人資料',
      path: '/profile',
      icon: FiUser,
      permission: null
    });

    return items.filter(item=> !item.permission || hasPermission(item.permission));
  };

  const navigationItems=getNavigationItems();

  const getRoleColor=(role)=> {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'instructor': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleName=(role)=> {
    switch (role) {
      case 'student': return '學生';
      case 'instructor': return '教師';
      case 'admin': return '管理員';
      default: return '未知';
    }
  };

  const isActiveLink=(itemPath)=> {
    // 儀表板特殊處理
    if (itemPath==='/dashboard') {
      return pathname==='/dashboard';
    }
    
    // 管理員面板路由處理
    if (itemPath.includes('admin')) {
      if (pathname==='/admin') {
        // 如果沒有 tab 參數，默認為 users
        const urlParams=new URLSearchParams(window.location.search);
        const currentTab=urlParams.get('tab') || 'users';
        const itemTab=new URL(itemPath,window.location.origin).searchParams.get('tab');
        return currentTab===itemTab;
      }
      return false;
    }
    
    // 其他路由
    return pathname===itemPath;
  };

  return (
    <>
      {/* Desktop Navigation - 保持原樣 */}
      <nav className="hidden lg:block bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-3">
              <motion.div
                whileHover={{scale: 1.05}}
                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center"
              >
                <SafeIcon icon={FiBook} className="text-white text-xl" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                TLI Connect
              </span>
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              {navigationItems.map((item)=> (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActiveLink(item.path)
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="text-lg" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                    {getRoleName(user?.role)}
                  </span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <SafeIcon icon={FiUser} className="text-white text-sm" />
                  )}
                </div>
              </div>
              <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
              >
                <SafeIcon icon={FiLogOut} className="text-lg" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - 大幅優化 */}
      <nav className="lg:hidden bg-white/95 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-50">
        <div className="px-3 sm:px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo - 手機版縮小 */}
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiBook} className="text-white text-sm" />
              </div>
              <span className="text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                TLI Connect
              </span>
            </Link>

            {/* User Avatar and Menu Button */}
            <div className="flex items-center space-x-2">
              {/* User Avatar - 手機版簡化 */}
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <SafeIcon icon={FiUser} className="text-white text-xs" />
                  )}
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-medium text-gray-900 truncate max-w-20">{user?.name}</div>
                  <span className={`inline-block px-1.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                    {getRoleName(user?.role)}
                  </span>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={()=> setIsOpen(!isOpen)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <SafeIcon icon={isOpen ? FiX : FiMenu} className="text-lg" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - 大幅優化 */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{opacity: 0,height: 0}}
              animate={{opacity: 1,height: 'auto'}}
              exit={{opacity: 0,height: 0}}
              className="bg-white border-t border-gray-200/60 shadow-lg"
            >
              <div className="px-3 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {/* User Info - 手機版顯示完整資訊 */}
                <div className="flex items-center space-x-3 pb-3 border-b border-gray-200/60 mb-3 sm:hidden">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <SafeIcon icon={FiUser} className="text-white text-lg" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{user?.name}</div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                      {getRoleName(user?.role)}
                    </span>
                  </div>
                </div>

                {/* Navigation Items - 手機優化 */}
                {navigationItems.map((item)=> (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={()=> setIsOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActiveLink(item.path)
                        ? 'bg-blue-100 text-blue-700 shadow-sm border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <SafeIcon icon={item.icon} className="text-lg flex-shrink-0" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}

                {/* Logout Button - 手機優化 */}
                <motion.button
                  whileHover={{scale: 1.02}}
                  whileTap={{scale: 0.98}}
                  onClick={()=> {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 border-t border-gray-200/60 mt-3 pt-4"
                >
                  <SafeIcon icon={FiLogOut} className="text-lg flex-shrink-0" />
                  <span className="font-medium">登出</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navigation;