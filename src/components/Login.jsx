'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';

const { FiUser, FiLock, FiEye, FiEyeOff, FiLogIn } = FiIcons;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const demoAccounts = [
    { email: 'student@example.com', role: '學生', name: '王小明' },
    { email: 'instructor@example.com', role: '教師', name: '張老師' },
    { email: 'admin@example.com', role: '管理員', name: '系統管理員' }
  ];

  const handleDemoLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100/60 overflow-hidden max-w-md w-full"
      >
        {/* Header - 手機優化 */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 sm:p-6 text-center">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="mb-3 sm:mb-4">
            <SafeIcon icon={FiUser} className="text-3xl sm:text-4xl mx-auto mb-2" />
          </motion.div>
          <h1 className="text-xl sm:text-2xl font-bold mb-2">歡迎登入</h1>
          <p className="text-blue-100 opacity-90 text-sm sm:text-base">TLI Connect Booking</p>
        </div>

        {/* Login Form - 手機優化 */}
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                電子郵件
              </label>
              <div className="relative">
                <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="請輸入電子郵件"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密碼
              </label>
              <div className="relative">
                <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="請輸入密碼"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="text-sm sm:text-base" />
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 sm:py-4 px-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <SafeIcon icon={FiLogIn} className="text-sm sm:text-base" />
                  <span>登入</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Demo Accounts - 手機優化 */}
          <div className="mt-5 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">測試帳號</h3>
            <div className="space-y-2">
              {demoAccounts.map((account, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDemoLogin(account.email)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 text-sm sm:text-base truncate">{account.name}</div>
                      <div className="text-xs sm:text-sm text-gray-600 truncate">{account.email}</div>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                      {account.role}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              密碼統一為：password
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;