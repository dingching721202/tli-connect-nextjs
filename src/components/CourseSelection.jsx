import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiX, FiBook, FiClock, FiUser, FiDollarSign, FiGift } = FiIcons;

const CourseSelection = ({ selectedDate, availableCourses, selectedCourses, onCourseSelect, onClose }) => {
  if (!selectedDate || availableCourses.length === 0) return null;

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('zh-TW', options);
  };

  const formatPrice = (price) => {
    return `NT$ ${price.toLocaleString()}`;
  };

  const isCourseSelected = (course) => {
    const courseKey = `${course.id}-${course.timeSlot}`;
    return selectedCourses.some(c => `${c.id}-${c.timeSlot}` === courseKey);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100/60 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiBook} className="text-lg" />
              <div>
                <h3 className="text-lg font-bold tracking-wide">可選課程</h3>
                <p className="text-sm text-blue-100 opacity-90">
                  {formatDate(selectedDate)}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/15 transition-all duration-200"
            >
              <SafeIcon icon={FiX} className="text-lg" />
            </motion.button>
          </div>
        </div>

        {/* Course List */}
        <div className="p-4 space-y-3 bg-gradient-to-b from-white to-gray-50/30">
          {availableCourses.map((course) => {
            const isSelected = isCourseSelected(course);
            return (
              <motion.div
                key={`${course.id}-${course.timeSlot}`}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onCourseSelect(course)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg shadow-emerald-500/20' 
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/10'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-3 text-base leading-tight">
                      {course.title}
                    </h4>
                    <div className="grid grid-cols-1 gap-2 mb-3">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiClock} className="text-blue-500 text-sm flex-shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">{course.timeSlot}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiUser} className="text-purple-500 text-sm flex-shrink-0" />
                        <span className="text-sm text-gray-700">{course.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiGift} className="text-emerald-500 text-sm flex-shrink-0" />
                        <span className="text-sm font-bold text-emerald-600">
                          會員免費
                        </span>
                      </div>
                    </div>
                    {course.description && (
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {course.description}
                      </p>
                    )}
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="ml-3 bg-emerald-500 text-white rounded-full p-2 shadow-lg"
                    >
                      <SafeIcon icon={FiIcons.FiCheck} className="text-sm" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CourseSelection;