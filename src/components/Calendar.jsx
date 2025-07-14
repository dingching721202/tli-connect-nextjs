import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiChevronLeft, FiChevronRight, FiCheck } = FiIcons;

const Calendar = ({ currentDate, onDateChange, onDateSelect, courses, selectedCourses, onCourseToggle }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const getCoursesForDate = (day) => {
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    return courses.filter(course => course.date === dateStr);
  };

  const hasSelectedCoursesOnDate = (day) => {
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    return selectedCourses.some(course => course.date === dateStr);
  };

  const getSelectedCoursesForDate = (day) => {
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    return selectedCourses.filter(course => course.date === dateStr);
  };

  const isToday = (day) => {
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(year, month + direction, 1);
    onDateChange(newDate);
  };

  const handleDateClick = (day, event) => {
    // Check if clicking on empty space, date number, or the cell itself
    if (event.target === event.currentTarget || 
        event.target.closest('.date-number') || 
        event.target.closest('.cell-empty-area')) {
      const selectedDate = new Date(year, month, day);
      const coursesForDate = getCoursesForDate(day);
      if (coursesForDate.length > 0) {
        onDateSelect(selectedDate);
      }
    }
  };

  const handleMoreClick = (day, event) => {
    event.stopPropagation();
    const selectedDate = new Date(year, month, day);
    onDateSelect(selectedDate);
  };

  const handleCourseClick = (course, day, event) => {
    event.stopPropagation();
    
    // Check if course is already selected
    const isCourseSelected = selectedCourses.some(
      sc => sc.id === course.id && sc.timeSlot === course.timeSlot
    );
    
    if (isCourseSelected) {
      // If selected, toggle (remove) it directly
      onCourseToggle(course);
    } else {
      // If not selected, open course selection panel
      const selectedDate = new Date(year, month, day);
      onDateSelect(selectedDate, course);
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    
    for (let i = 0; i < 42; i++) {
      const dayNumber = i - firstDay + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      
      if (isCurrentMonth) {
        const coursesForDate = getCoursesForDate(dayNumber);
        const selectedCoursesForDate = getSelectedCoursesForDate(dayNumber);
        const hasSelected = selectedCoursesForDate.length > 0;
        const todayClass = isToday(dayNumber);
        const hasCourses = coursesForDate.length > 0;

        days.push(
          <motion.div
            key={dayNumber}
            whileHover={hasCourses ? { scale: 1.02, y: -2 } : {}}
            onClick={(e) => handleDateClick(dayNumber, e)}
            className={`
              h-24 sm:h-28 lg:h-32 xl:h-36 p-1 sm:p-2 border border-gray-200/60 transition-all duration-300 
              relative overflow-hidden flex flex-col
              ${hasCourses ? 'cursor-pointer' : 'cursor-default'}
              ${todayClass 
                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25' 
                : hasSelected 
                ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-300/60 shadow-sm shadow-emerald-500/10'
                : hasCourses 
                ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/10'
                : 'bg-white border-gray-200'
              }
            `}
          >
            {/* Day number - clickable area but no special effects */}
            <div className={`
              date-number text-xs sm:text-sm lg:text-base font-bold mb-1 flex-shrink-0
              ${todayClass 
                ? 'text-white' 
                : hasSelected 
                ? 'text-emerald-700' 
                : hasCourses 
                ? 'text-gray-800' 
                : 'text-gray-800'
              }
            `}>
              {dayNumber}
            </div>

            {/* Selected course indicator */}
            {hasSelected && !todayClass && (
              <div className="absolute top-1 right-1 pointer-events-none">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full shadow-sm animate-pulse"></div>
              </div>
            )}

            {/* Course availability indicator */}
            {hasCourses && !hasSelected && !todayClass && (
              <div className="absolute top-1 right-1 pointer-events-none">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full shadow-sm"></div>
              </div>
            )}

            {/* Course area - 統一設計，響應式調整 */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="space-y-0.5 sm:space-y-1 flex-1">
                {coursesForDate.slice(0, window.innerWidth < 640 ? 2 : 3).map((course, index) => {
                  const isCourseSelected = selectedCourses.some(
                    sc => sc.id === course.id && sc.timeSlot === course.timeSlot
                  );
                  
                  return (
                    <motion.div
                      key={`${course.id}-${course.timeSlot}-${index}`}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => handleCourseClick(course, dayNumber, e)}
                      className={`
                        flex items-center gap-1 sm:gap-1.5 text-xs py-0.5 sm:py-1 px-1 sm:px-1.5 
                        rounded-md transition-all duration-200 cursor-pointer z-10 relative group
                        ${todayClass 
                          ? 'text-white/90 bg-white/10 hover:bg-white/20' 
                          : isCourseSelected 
                          ? 'text-emerald-700 bg-emerald-100/80 shadow-sm shadow-emerald-500/20 hover:bg-emerald-200/80'
                          : 'text-gray-700 bg-gray-100/80 hover:bg-blue-100/90 hover:shadow-sm'
                        }
                      `}
                      title={isCourseSelected ? `點擊取消「${course.title}」` : `點擊選擇「${course.title}」`}
                    >
                      {/* Time slot - 手機版縮短顯示 */}
                      <div className={`
                        text-xs font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-200
                        ${todayClass 
                          ? 'text-white/80' 
                          : isCourseSelected 
                          ? 'text-emerald-600' 
                          : 'text-blue-600'
                        }
                      `}>
                        {/* 手機版只顯示開始時間，桌面版顯示完整時間 */}
                        <span className="block sm:hidden">{course.timeSlot.split('-')[0]}</span>
                        <span className="hidden sm:block">{course.timeSlot.split('-')[0]}</span>
                      </div>

                      {/* Course title - 響應式字體大小 */}
                      <div className={`
                        flex-1 truncate font-medium leading-tight text-xs sm:text-xs transition-colors duration-200
                        ${todayClass 
                          ? 'text-white' 
                          : isCourseSelected 
                          ? 'text-emerald-800' 
                          : 'text-gray-800'
                        }
                      `}>
                        {course.title}
                      </div>

                      {/* Selected indicator - 小勾勾圖示 */}
                      {isCourseSelected && !todayClass && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="flex-shrink-0 ml-1 transition-colors duration-200"
                        >
                          <SafeIcon icon={FiCheck} className="text-xs text-emerald-600" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}

                {/* "More" indicator - 手機版只顯示 +X */}
                {coursesForDate.length > (window.innerWidth < 640 ? 2 : 3) && (
                  <motion.div
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => handleMoreClick(dayNumber, e)}
                    className={`
                      flex items-center justify-center text-xs py-1 sm:py-1.5 px-1 sm:px-2 
                      rounded-md transition-all duration-200 cursor-pointer z-10 relative font-medium
                      ${todayClass 
                        ? 'text-white/90 bg-white/10 hover:bg-white/20' 
                        : 'text-blue-600 bg-blue-50/90 hover:bg-blue-100 hover:shadow-sm'
                      }
                    `}
                  >
                    {/* 手機版僅顯示 +X，桌面版顯示完整佈局 */}
                    <div className="block sm:hidden">
                      +{coursesForDate.length - 2}
                    </div>
                    {/* 桌面版保持原有佈局 */}
                    <div className="hidden sm:flex items-center gap-1.5 w-full">
                      <div className={`
                        text-xs font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-200
                        ${todayClass ? 'text-white/80' : 'text-blue-600'}
                      `}>
                        +{coursesForDate.length - 3}
                      </div>
                      <div className={`
                        flex-1 truncate font-medium leading-tight text-xs transition-colors duration-200
                        ${todayClass ? 'text-white' : 'text-blue-600'}
                      `}>
                        更多課程
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Empty clickable area - fills remaining space */}
              <div className="cell-empty-area flex-1 min-h-0"></div>
            </div>
          </motion.div>
        );
      } else {
        days.push(
          <div
            key={`empty-${i}`}
            className="h-24 sm:h-28 lg:h-32 xl:h-36 border border-gray-100 bg-gray-50/30"
          />
        );
      }
    }
    
    return days;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100/60 overflow-hidden"
    >
      {/* Calendar Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateMonth(-1)}
            className="p-2 sm:p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 hover:shadow-lg"
          >
            <SafeIcon icon={FiChevronLeft} className="text-lg sm:text-xl" />
          </motion.button>
          
          <h2 className="text-lg sm:text-xl font-bold tracking-wide">
            {year}年 {monthNames[month]}
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateMonth(1)}
            className="p-2 sm:p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 hover:shadow-lg"
          >
            <SafeIcon icon={FiChevronRight} className="text-lg sm:text-xl" />
          </motion.button>
        </div>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/60">
        {weekDays.map(day => (
          <div
            key={day}
            className="p-2 sm:p-3 text-center font-semibold text-gray-700 text-sm tracking-wide"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 grid-rows-6 bg-gray-50/20">
        {renderCalendarDays()}
      </div>
    </motion.div>
  );
};

export default Calendar;