import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';

const {
  FiBook, FiUsers, FiBarChart3, FiEdit2, FiTrash2, FiEye, FiClock,
  FiAward, FiMessageSquare, FiX, FiCalendar, FiUser, FiExternalLink, FiCheckCircle
} = FiIcons;

const InstructorPanel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('courses');
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseTab, setCourseTab] = useState('upcoming'); // 'upcoming' or 'completed'

  // Mock data for demonstration
  const [mockCourses, setMockCourses] = useState([
    {
      id: 1,
      title: '商務華語會話',
      students: 25,
      schedule: '週二、週四 09:00-10:30',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      progress: 75
    },
    {
      id: 2,
      title: '華語文法精修',
      students: 18,
      schedule: '週一、週三 14:00-15:30',
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2024-07-01',
      progress: 60
    },
    {
      id: 3,
      title: '初級華語會話',
      students: 22,
      schedule: '週五 10:00-11:30',
      status: 'completed',
      startDate: '2023-09-01',
      endDate: '2023-12-31',
      progress: 100
    }
  ]);

  const [mockStudents, setMockStudents] = useState([
    {
      id: 1,
      name: '王小明',
      email: 'student1@example.com',
      courses: ['商務華語會話', '華語文法精修'],
      progress: 85,
      lastActivity: '2024-12-20'
    },
    {
      id: 2,
      name: '李小華',
      email: 'student2@example.com',
      courses: ['商務華語會話'],
      progress: 92,
      lastActivity: '2024-12-19'
    },
    {
      id: 3,
      name: '張小美',
      email: 'student3@example.com',
      courses: ['華語文法精修'],
      progress: 78,
      lastActivity: '2024-12-18'
    }
  ]);

  // Mock instructor courses data (similar to student booking system)
  const getInstructorCourses = () => {
    const courses = [
      {
        id: 1,
        title: '商務華語會話',
        students: '25 位學生',
        date: '2025-01-20',
        time: '09:00-10:30',
        status: 'upcoming',
        classroom: 'https://meet.google.com/abc-def-ghi',
        materials: 'https://drive.google.com/file/d/example1',
        daysFromNow: 1
      },
      {
        id: 2,
        title: '華語文法精修',
        students: '18 位學生',
        date: '2025-01-22',
        time: '14:00-15:30',
        status: 'upcoming',
        classroom: 'https://meet.google.com/def-ghi-jkl',
        materials: 'https://drive.google.com/file/d/example2',
        daysFromNow: 3
      },
      {
        id: 3,
        title: '華語聽力強化',
        students: '22 位學生',
        date: '2025-01-25',
        time: '10:00-11:30',
        status: 'upcoming',
        classroom: 'https://meet.google.com/ghi-jkl-mno',
        materials: 'https://drive.google.com/file/d/example3',
        daysFromNow: 6
      },
      {
        id: 4,
        title: '日常華語對話',
        students: '20 位學生',
        date: '2025-01-18',
        time: '15:00-16:30',
        status: 'completed',
        classroom: 'https://meet.google.com/jkl-mno-pqr',
        materials: 'https://drive.google.com/file/d/example4',
        daysFromNow: -1
      },
      {
        id: 5,
        title: '華語發音矯正',
        students: '15 位學生',
        date: '2025-01-10',
        time: '16:00-17:30',
        status: 'completed',
        classroom: 'https://meet.google.com/mno-pqr-stu',
        materials: 'https://drive.google.com/file/d/example5',
        daysFromNow: -9
      }
    ];

    return courses.sort((a, b) => {
      if (a.status === 'completed' && b.status !== 'completed') return 1;
      if (a.status !== 'completed' && b.status === 'completed') return -1;
      return a.daysFromNow - b.daysFromNow;
    });
  };

  // Button handlers
  const handleEditCourse = (courseId) => {
    const course = mockCourses.find(c => c.id === courseId);
    setEditingCourse(course);
  };

  const handleDeleteCourse = (courseId) => {
    if (confirm('確定要刪除此課程嗎？此操作無法復原。')) {
      setMockCourses(prev => prev.filter(course => course.id !== courseId));
      alert('✅ 課程已成功刪除！');
    }
  };

  const handleViewCourse = (courseId) => {
    const course = mockCourses.find(c => c.id === courseId);
    alert(`📚 課程詳情\n\n課程名稱：${course.title}\n學生人數：${course.students}\n上課時間：${course.schedule}\n狀態：${getStatusName(course.status)}\n進度：${course.progress}%`);
  };

  const handleMessageStudent = (studentId) => {
    const student = mockStudents.find(s => s.id === studentId);
    const message = prompt(`發送訊息給 ${student.name}：`);
    if (message) {
      alert(`✅ 訊息已發送給 ${student.name}！\n\n內容：${message}`);
    }
  };

  const handleViewStudent = (studentId) => {
    const student = mockStudents.find(s => s.id === studentId);
    alert(`👨‍🎓 學生資料\n\n姓名：${student.name}\n信箱：${student.email}\n修讀課程：${student.courses.join(', ')}\n學習進度：${student.progress}%\n最後活動：${student.lastActivity}`);
  };

  const handleRequestLeave = (courseId, courseName) => {
    if (confirm(`確定要為「${courseName}」申請請假嗎？`)) {
      alert('✅ 請假申請已提交！\n\n系統管理員將安排代課老師。');
      // Here you would update the course status or create a leave request
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-blue-700 bg-blue-50';
      case 'completed': return 'text-gray-600 bg-gray-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming': return '預約中';
      case 'completed': return '已完成';
      case 'cancelled': return '已取消';
      default: return '未知';
    }
  };

  const tabs = [
    { id: 'courses', name: '課程管理', icon: FiBook },
    { id: 'students', name: '學生管理', icon: FiUsers },
    { id: 'analytics', name: '教學分析', icon: FiBarChart3 }
  ];

  const getStatusColorOld = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusName = (status) => {
    switch (status) {
      case 'active': return '進行中';
      case 'completed': return '已完成';
      case 'draft': return '草稿';
      default: return '未知';
    }
  };

  const renderCourseManagement = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">我的課程</h2>
        <div className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
          <strong>注意：</strong>教師只能檢視課程資訊，無法修改課程內容。如需修改，請聯繫系統管理員。
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColorOld(course.status)}`}>
                {getStatusName(course.status)}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUsers} className="text-blue-600 text-sm" />
                <span className="text-sm text-gray-600">{course.students} 位學生</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiClock} className="text-green-600 text-sm" />
                <span className="text-sm text-gray-600">{course.schedule}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiBook} className="text-purple-600 text-sm" />
                <span className="text-sm text-gray-600">
                  {course.startDate} - {course.endDate}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">課程進度</span>
                <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Actions - Only view action for instructors */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleViewCourse(course.id)}
                className="flex items-center space-x-1 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiEye} className="text-sm" />
                <span className="text-sm font-medium">查看詳情</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderStudentManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">學生管理</h2>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">學生</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">修讀課程</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">學習進度</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最後活動</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockStudents.map((student) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                        <SafeIcon icon={FiUsers} className="text-white text-sm" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {student.courses.map((course, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.lastActivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMessageStudent(student.id)}
                        className="text-blue-600 hover:text-blue-900"
                        title="發送訊息"
                      >
                        <SafeIcon icon={FiMessageSquare} className="text-sm" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewStudent(student.id)}
                        className="text-green-600 hover:text-green-900"
                        title="查看詳情"
                      >
                        <SafeIcon icon={FiEye} className="text-sm" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">教學分析</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '總學生數', value: '65', icon: FiUsers, color: 'text-blue-600' },
          { label: '活躍課程', value: '8', icon: FiBook, color: 'text-green-600' },
          { label: '平均評分', value: '4.8', icon: FiAward, color: 'text-yellow-600' },
          { label: '完成率', value: '92%', icon: FiBarChart3, color: 'text-purple-600' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <SafeIcon icon={stat.icon} className={`text-2xl ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">學生進度分佈</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">進度圖表將在此顯示</p>
              <button
                onClick={() => alert('📊 學生進度分析功能開發中...\n\n將包含：\n• 各課程完成率統計\n• 學生學習進度分佈\n• 學習時數分析\n• 成績趨勢圖表')}
                className="mt-2 text-blue-600 hover:text-blue-800 underline"
              >
                查看功能說明
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">課程參與度</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">參與度圖表將在此顯示</p>
              <button
                onClick={() => alert('📈 課程參與度分析功能開發中...\n\n將包含：\n• 課程出席率統計\n• 學生活躍度分析\n• 課程互動數據\n• 參與趨勢分析')}
                className="mt-2 text-blue-600 hover:text-blue-800 underline"
              >
                查看功能說明
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Instructor Courses Section - 與學生一模一樣的格式
  const renderInstructorCourses = () => {
    const allInstructorCourses = getInstructorCourses();

    // Filter courses based on selected tab
    const filteredCourses = allInstructorCourses.filter(course => {
      if (courseTab === 'upcoming') {
        return course.status === 'upcoming';
      } else {
        return course.status === 'completed';
      }
    });

    const upcomingCount = allInstructorCourses.filter(c => c.status === 'upcoming').length;
    const completedCount = allInstructorCourses.filter(c => c.status === 'completed').length;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-6"
      >
        {/* Header with Tabs */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">我的課程預約</h2>
          {/* Tab Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCourseTab('upcoming')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                courseTab === 'upcoming'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              即將開始 ({upcomingCount})
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCourseTab('completed')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                courseTab === 'completed'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              已完成 ({completedCount})
            </motion.button>
          </div>
        </div>

        {/* Course List */}
        <div className="space-y-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  course.status === 'upcoming'
                    ? 'border-blue-200 bg-blue-50/50'
                    : 'border-gray-200 bg-gray-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                        {getStatusText(course.status)}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiUsers} className="text-xs" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiCalendar} className="text-xs" />
                        <span>{formatDate(course.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiClock} className="text-xs" />
                        <span>{course.time}</span>
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 ml-4">
                    {course.status === 'upcoming' && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => window.open(course.classroom, '_blank')}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                          title="進入教室"
                        >
                          <SafeIcon icon={FiExternalLink} className="text-xs" />
                          <span className="text-xs font-medium">教室</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => window.open(course.materials, '_blank')}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                          title="檢視教材"
                        >
                          <SafeIcon icon={FiEye} className="text-xs" />
                          <span className="text-xs font-medium">教材</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRequestLeave(course.id, course.title)}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                          title="申請請假"
                        >
                          <SafeIcon icon={FiClock} className="text-xs" />
                          <span className="text-xs font-medium">請假</span>
                        </motion.button>
                      </>
                    )}
                    {course.status === 'completed' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(course.materials, '_blank')}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        title="檢視教材"
                      >
                        <SafeIcon icon={FiEye} className="text-xs" />
                        <span className="text-xs font-medium">教材</span>
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <SafeIcon icon={courseTab === 'upcoming' ? FiCalendar : FiCheckCircle} className="text-4xl text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {courseTab === 'upcoming' ? '尚無即將開始課程' : '尚無已完成課程'}
              </h3>
              <p className="text-gray-600 mb-4">
                {courseTab === 'upcoming'
                  ? '您的即將開始課程會顯示在這裡'
                  : '完成更多課程後，這裡會顯示您的教學紀錄'
                }
              </p>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'courses': return renderCourseManagement();
      case 'students': return renderStudentManagement();
      case 'analytics': return renderAnalytics();
      default: return renderCourseManagement();
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          教師管理面板
        </h1>
        <p className="text-lg text-gray-600">
          管理您的課程與學生，追蹤教學成效
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <SafeIcon icon={tab.icon} className="text-lg" />
                <span>{tab.name}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>

      {/* My Course Bookings Section - 替換原本的最近活動 */}
      <div className="mt-8">
        {renderInstructorCourses()}
      </div>
    </div>
  );
};

export default InstructorPanel;