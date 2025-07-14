import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';

const { FiBook, FiCalendar, FiClock, FiUser, FiDollarSign, FiTrash2, FiCheck, FiShoppingCart, FiGift } = FiIcons;

const SelectedCourses = ({ selectedCourses, onRemoveCourse, onConfirmBooking, showPrice = false }) => {
  const { user } = useAuth();
  
  if (selectedCourses.length === 0) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString('zh-TW', options);
  };

  const formatPrice = (price) => {
    if (price === 0 || price === undefined || price === null) {
      return "免費";
    }
    return `NT$ ${price.toLocaleString()}`;
  };

  const getTotalPrice = () => {
    return selectedCourses.reduce((total, course) => total + (course.price || 0), 0);
  };

  // Check if user has membership
  const hasActiveMembership = () => {
    if (!user) return false;
    if (user.role !== 'student') return true;
    // Check user's membership status
    return user.membershipStatus === 'active';
  };

  // Group courses by date
  const groupedCourses = selectedCourses.reduce((groups, course) => {
    const date = course.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(course);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedCourses).sort();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100/60 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiShoppingCart} className="text-lg" />
          <div>
            <h3 className="text-lg font-bold tracking-wide">
              已選課程
            </h3>
            <p className="text-sm text-blue-100 opacity-90">
              共 {selectedCourses.length} 門課程
            </p>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="p-4 bg-gradient-to-b from-white to-gray-50/30">
        <div className="space-y-4">
          {sortedDates.map(date => (
            <div key={date} className="space-y-3">
              {/* Date header */}
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-200/80">
                <SafeIcon icon={FiCalendar} className="text-blue-600 text-sm" />
                <span className="text-sm font-bold text-gray-700 tracking-wide">
                  {formatDate(date)}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {groupedCourses[date].length} 門課程
                </span>
              </div>

              {/* Courses for this date */}
              {groupedCourses[date].map((course) => (
                <motion.div
                  key={`${course.id}-${course.timeSlot}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-bold text-blue-800 text-base mb-2 leading-tight">
                        {course.title}
                      </h4>
                      <div className="grid grid-cols-1 gap-1.5">
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiClock} className="text-blue-600 text-sm flex-shrink-0" />
                          <span className="text-sm text-blue-700 font-medium">{course.timeSlot}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiUser} className="text-blue-600 text-sm flex-shrink-0" />
                          <span className="text-sm text-blue-700">{course.instructor}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiGift} className="text-emerald-600 text-sm flex-shrink-0" />
                          <span className="text-sm font-bold text-emerald-600">
                            {hasActiveMembership() ? '會員免費' : '需要會員資格'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onRemoveCourse(course)}
                      className="ml-4 p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 flex-shrink-0"
                    >
                      <SafeIcon icon={FiTrash2} className="text-sm" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Total and Confirm */}
        <div className="border-t border-gray-200/80 pt-4 mt-6">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-gray-800">預約課程:</span>
              <span className="text-2xl font-bold text-emerald-600">
                {hasActiveMembership() ? '會員免費' : '需要會員資格'}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              共 {selectedCourses.length} 門課程
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirmBooking}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <SafeIcon icon={FiCheck} className="text-xl" />
            <span className="text-lg">
              {hasActiveMembership() ? '確認預約' : '選擇會員方案'}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SelectedCourses;