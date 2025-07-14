import React,{useState,useEffect} from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import {useAuth} from '../contexts/AuthContext';

const {FiClock,FiUser,FiCalendar,FiCheck,FiX,FiAlertTriangle,FiEdit2,FiEye,FiUserCheck,FiBook,FiMessageSquare,FiFilter,FiSearch,FiDownload,FiPlus,FiRefreshCw,FiChevronDown,FiUsers,FiMail,FiPhone} = FiIcons;

const LeaveManagement = () => {
  const {user} = useAuth();
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' or 'history'
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [substituteSearchTerm, setSubstituteSearchTerm] = useState('');

  // Mock 教師資料
  const [mockInstructors, setMockInstructors] = useState([
    {
      id: 1,
      name: '張老師',
      email: 'zhang@example.com',
      phone: '0912-345-678',
      specialties: ['商務華語', '華語會話'],
      status: 'available',
      rating: 4.8,
      experience: '5年',
      currentLoad: 12 // 目前課程數量
    },
    {
      id: 2,
      name: '王老師',
      email: 'wang@example.com',
      phone: '0923-456-789',
      specialties: ['華語文法', '華語寫作'],
      status: 'available',
      rating: 4.9,
      experience: '8年',
      currentLoad: 8
    },
    {
      id: 3,
      name: '李老師',
      email: 'li@example.com',
      phone: '0934-567-890',
      specialties: ['華語聽力', '華語發音'],
      status: 'available',
      rating: 4.7,
      experience: '3年',
      currentLoad: 15
    },
    {
      id: 4,
      name: '陳老師',
      email: 'chen@example.com',
      phone: '0945-678-901',
      specialties: ['商務華語', '華語文法'],
      status: 'available',
      rating: 4.6,
      experience: '6年',
      currentLoad: 10
    },
    {
      id: 5,
      name: '劉老師',
      email: 'liu@example.com',
      phone: '0956-789-012',
      specialties: ['華語會話', '華語聽力'],
      status: 'busy',
      rating: 4.8,
      experience: '4年',
      currentLoad: 20
    },
    {
      id: 6,
      name: '黃老師',
      email: 'huang@example.com',
      phone: '0967-890-123',
      specialties: ['旅遊華語', '華語朗讀'],
      status: 'available',
      rating: 4.5,
      experience: '2年',
      currentLoad: 6
    },
    {
      id: 7,
      name: '周老師',
      email: 'zhou@example.com',
      phone: '0978-901-234',
      specialties: ['學術華語', '華語演講'],
      status: 'available',
      rating: 4.9,
      experience: '10年',
      currentLoad: 14
    }
  ]);

  // Mock 課程資料
  const [mockCourses, setMockCourses] = useState([
    {
      id: 1,
      title: '商務華語會話',
      instructor: '張老師',
      instructorId: 1,
      date: '2025-01-25',
      time: '09:00-10:30',
      students: ['王小明', '李小華', '陳小美'],
      studentCount: 3,
      classroom: 'https://meet.google.com/abc-def-ghi',
      materials: 'https://drive.google.com/file/d/example1',
      category: '商務華語'
    },
    {
      id: 2,
      title: '華語文法精修',
      instructor: '王老師',
      instructorId: 2,
      date: '2025-01-26',
      time: '14:00-15:30',
      students: ['張小王', '林小雅'],
      studentCount: 2,
      classroom: 'https://meet.google.com/def-ghi-jkl',
      materials: 'https://drive.google.com/file/d/example2',
      category: '華語文法'
    },
    {
      id: 3,
      title: '華語聽力強化',
      instructor: '李老師',
      instructorId: 3,
      date: '2025-01-27',
      time: '10:00-11:30',
      students: ['王小明', '陳小美', '劉小強'],
      studentCount: 3,
      classroom: 'https://meet.google.com/ghi-jkl-mno',
      materials: 'https://drive.google.com/file/d/example3',
      category: '華語聽力'
    }
  ]);

  // Mock 請假申請資料
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      instructorId: 1,
      instructorName: '張老師',
      courseId: 1,
      courseName: '商務華語會話',
      courseDate: '2025-01-25',
      courseTime: '09:00-10:30',
      reason: '家庭緊急事件，需要立即處理',
      requestDate: '2025-01-20',
      status: 'pending', // 'pending', 'approved', 'rejected', 'processed'
      studentCount: 3,
      urgency: 'high', // 'low', 'medium', 'high'
      substituteAction: null, // 'replace' or 'cancel'
      substituteInstructorId: null,
      substituteInstructorName: null,
      processedDate: null,
      processedBy: null,
      adminNotes: '',
      notificationSent: false
    },
    {
      id: 2,
      instructorId: 2,
      instructorName: '王老師',
      courseId: 2,
      courseName: '華語文法精修',
      courseDate: '2025-01-26',
      courseTime: '14:00-15:30',
      reason: '身體不適，醫生建議休息',
      requestDate: '2025-01-21',
      status: 'approved',
      studentCount: 2,
      urgency: 'medium',
      substituteAction: 'replace',
      substituteInstructorId: 4,
      substituteInstructorName: '陳老師',
      processedDate: '2025-01-21',
      processedBy: '系統管理員',
      adminNotes: '已安排陳老師代課，學生已通知',
      notificationSent: true
    },
    {
      id: 3,
      instructorId: 3,
      instructorName: '李老師',
      courseId: 3,
      courseName: '華語聽力強化',
      courseDate: '2025-01-27',
      courseTime: '10:00-11:30',
      reason: '出國參加學術會議',
      requestDate: '2025-01-15',
      status: 'processed',
      studentCount: 3,
      urgency: 'low',
      substituteAction: 'cancel',
      substituteInstructorId: null,
      substituteInstructorName: null,
      processedDate: '2025-01-16',
      processedBy: '系統管理員',
      adminNotes: '課程取消，學生已通知並安排補課',
      notificationSent: true
    },
    {
      id: 4,
      instructorId: 1,
      instructorName: '張老師',
      courseId: 1,
      courseName: '商務華語會話',
      courseDate: '2025-02-01',
      courseTime: '09:00-10:30',
      reason: '突發感冒，擔心傳染給學生',
      requestDate: '2025-01-31',
      status: 'pending',
      studentCount: 3,
      urgency: 'high',
      substituteAction: null,
      substituteInstructorId: null,
      substituteInstructorName: null,
      processedDate: null,
      processedBy: null,
      adminNotes: '',
      notificationSent: false
    }
  ]);

  // 新增請假申請表單
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    courseId: '',
    reason: '',
    urgency: 'medium'
  });

  // Helper functions
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'processed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return '待處理';
      case 'approved': return '已批准';
      case 'rejected': return '已拒絕';
      case 'processed': return '已處理';
      default: return '未知';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'high': return '緊急';
      case 'medium': return '一般';
      case 'low': return '不急';
      default: return '未知';
    }
  };

  // Filter requests
  const getFilteredRequests = () => {
    let filtered = leaveRequests.filter(request => {
      // Search filter
      const matchesSearch = request.instructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.reason.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;

      // Status filter
      if (filterStatus === 'all') return true;
      return request.status === filterStatus;
    });

    // Sort by urgency and date
    return filtered.sort((a, b) => {
      const urgencyOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      }
      return new Date(a.courseDate) - new Date(b.courseDate);
    });
  };

  // Get available substitute instructors for a course
  const getAvailableInstructors = (courseCategory, excludeInstructorId, courseDate) => {
    return mockInstructors.filter(instructor => {
      // Exclude original instructor
      if (instructor.id === excludeInstructorId) return false;
      
      // Check if instructor is available
      if (instructor.status !== 'available') return false;
      
      // Check if instructor has matching specialty
      return instructor.specialties.some(specialty => 
        specialty.includes(courseCategory) || courseCategory.includes(specialty)
      );
    });
  };

  // Filter substitute instructors based on search
  const getFilteredSubstituteInstructors = (availableInstructors) => {
    if (!substituteSearchTerm) return availableInstructors;
    
    return availableInstructors.filter(instructor => {
      const searchLower = substituteSearchTerm.toLowerCase();
      return instructor.name.toLowerCase().includes(searchLower) ||
             instructor.specialties.some(specialty => specialty.toLowerCase().includes(searchLower)) ||
             instructor.email.toLowerCase().includes(searchLower);
    });
  };

  // Handle leave request submission (for instructors)
  const handleSubmitLeaveRequest = () => {
    if (!newLeaveRequest.courseId || !newLeaveRequest.reason.trim()) {
      alert('請填寫完整資訊');
      return;
    }

    const course = mockCourses.find(c => c.id === parseInt(newLeaveRequest.courseId));
    if (!course) {
      alert('找不到課程資訊');
      return;
    }

    const newRequest = {
      id: Math.max(...leaveRequests.map(r => r.id), 0) + 1,
      instructorId: user.id,
      instructorName: user.name,
      courseId: course.id,
      courseName: course.title,
      courseDate: course.date,
      courseTime: course.time,
      reason: newLeaveRequest.reason,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      studentCount: course.studentCount,
      urgency: newLeaveRequest.urgency,
      substituteAction: null,
      substituteInstructorId: null,
      substituteInstructorName: null,
      processedDate: null,
      processedBy: null,
      adminNotes: '',
      notificationSent: false
    };

    setLeaveRequests(prev => [...prev, newRequest]);
    setNewLeaveRequest({ courseId: '', reason: '', urgency: 'medium' });
    setShowLeaveModal(false);
    alert('✅ 請假申請已提交！\n\n系統管理員將儘快處理您的申請。');
  };

  // Handle processing leave request (for admins)
  const handleProcessRequest = (action, substituteInstructorId = null) => {
    if (!selectedRequest) return;

    let adminNotes = '';
    let substituteInstructorName = null;

    if (action === 'replace' && substituteInstructorId) {
      const substitute = mockInstructors.find(i => i.id === substituteInstructorId);
      substituteInstructorName = substitute?.name;
      adminNotes = `已安排 ${substituteInstructorName} 代課`;
    } else if (action === 'cancel') {
      adminNotes = '課程已取消，將安排補課';
    }

    const updatedRequest = {
      ...selectedRequest,
      status: 'processed',
      substituteAction: action,
      substituteInstructorId,
      substituteInstructorName,
      processedDate: new Date().toISOString().split('T')[0],
      processedBy: user.name,
      adminNotes,
      notificationSent: false
    };

    setLeaveRequests(prev => prev.map(req => 
      req.id === selectedRequest.id ? updatedRequest : req
    ));

    setShowProcessModal(false);
    setSelectedRequest(null);
    setSubstituteSearchTerm('');
    alert(`✅ 請假申請已處理！\n\n處理方式：${action === 'replace' ? '安排代課老師' : '課程取消'}\n${adminNotes}`);
  };

  // Render instructor's leave request form
  const renderLeaveRequestModal = () => {
    if (!showLeaveModal) return null;

    const instructorCourses = mockCourses.filter(course => course.instructorId === user.id);

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 sm:p-6 rounded-t-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">申請請假</h3>
              <button onClick={() => setShowLeaveModal(false)}>
                <SafeIcon icon={FiX} className="text-white text-xl" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                選擇課程 <span className="text-red-500">*</span>
              </label>
              <select
                value={newLeaveRequest.courseId}
                onChange={(e) => setNewLeaveRequest(prev => ({ ...prev, courseId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">請選擇課程</option>
                {instructorCourses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.title} - {formatDate(course.date)} {course.time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                緊急程度 <span className="text-red-500">*</span>
              </label>
              <select
                value={newLeaveRequest.urgency}
                onChange={(e) => setNewLeaveRequest(prev => ({ ...prev, urgency: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">不急</option>
                <option value="medium">一般</option>
                <option value="high">緊急</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                請假原因 <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                value={newLeaveRequest.reason}
                onChange={(e) => setNewLeaveRequest(prev => ({ ...prev, reason: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="請詳細說明請假原因..."
                required
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitLeaveRequest}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium"
              >
                提交申請
              </motion.button>
              <button
                onClick={() => setShowLeaveModal(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                取消
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // Render admin's process request modal
  const renderProcessModal = () => {
    if (!showProcessModal || !selectedRequest) return null;

    const course = mockCourses.find(c => c.id === selectedRequest.courseId);
    const availableInstructors = getAvailableInstructors(
      course?.category,
      selectedRequest.instructorId,
      selectedRequest.courseDate
    );
    const filteredInstructors = getFilteredSubstituteInstructors(availableInstructors);

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 sm:p-6 rounded-t-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">處理請假申請</h3>
              <button onClick={() => {
                setShowProcessModal(false);
                setSubstituteSearchTerm('');
              }}>
                <SafeIcon icon={FiX} className="text-white text-xl" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            {/* Request Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">申請詳情</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-gray-600">申請教師：</span>
                  <span className="text-gray-900">{selectedRequest.instructorName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">課程名稱：</span>
                  <span className="text-gray-900">{selectedRequest.courseName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">課程時間：</span>
                  <span className="text-gray-900">{formatDate(selectedRequest.courseDate)} {selectedRequest.courseTime}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">學生人數：</span>
                  <span className="text-gray-900">{selectedRequest.studentCount} 位</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">緊急程度：</span>
                  <span className={`font-medium ${getUrgencyColor(selectedRequest.urgency)}`}>
                    {getUrgencyText(selectedRequest.urgency)}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">申請日期：</span>
                  <span className="text-gray-900">{formatDate(selectedRequest.requestDate)}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-medium text-gray-600">請假原因：</span>
                  <span className="text-gray-900">{selectedRequest.reason}</span>
                </div>
              </div>
            </div>

            {/* Processing Options */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">處理方式</h4>
              
              {/* Option 1: Replace with substitute */}
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h5 className="font-medium text-green-800 mb-3 flex items-center">
                  <SafeIcon icon={FiUserCheck} className="mr-2" />
                  安排代課老師
                </h5>
                
                {availableInstructors.length > 0 ? (
                  <div className="space-y-3">
                    {/* Search for substitute instructors */}
                    <div className="relative">
                      <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="搜尋代課老師姓名或專長..."
                        value={substituteSearchTerm}
                        onChange={(e) => setSubstituteSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <p className="text-sm text-green-700">
                      找到 {filteredInstructors.length} 位可代課老師：
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                      {filteredInstructors.map(instructor => (
                        <motion.div
                          key={instructor.id}
                          whileHover={{ scale: 1.02 }}
                          className="bg-white rounded-lg p-3 border border-green-200 cursor-pointer hover:border-green-400 transition-colors"
                          onClick={() => handleProcessRequest('replace', instructor.id)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h6 className="font-medium text-gray-900">{instructor.name}</h6>
                              <div className="text-sm text-gray-600 space-y-1">
                                <div>專長：{instructor.specialties.join('、')}</div>
                                <div>經驗：{instructor.experience} | 評分：{instructor.rating}★</div>
                                <div>目前課程：{instructor.currentLoad} 堂</div>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center space-x-1">
                                <SafeIcon icon={FiMail} className="text-gray-400 text-xs" />
                                <span className="text-xs text-gray-500">{instructor.email}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <SafeIcon icon={FiPhone} className="text-gray-400 text-xs" />
                                <span className="text-xs text-gray-500">{instructor.phone}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Matching indicator */}
                          <div className="flex items-center justify-between">
                            <div className="text-xs">
                              {instructor.specialties.some(s => course?.category.includes(s) || s.includes(course?.category)) && (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                                  專業匹配
                                </span>
                              )}
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-xs bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                            >
                              選擇代課
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {filteredInstructors.length === 0 && substituteSearchTerm && (
                      <p className="text-sm text-gray-500 text-center py-4">
                        沒有找到符合搜尋條件的代課老師
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-orange-600">⚠️ 目前沒有可用的代課老師</p>
                )}
              </div>

              {/* Option 2: Cancel class */}
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <h5 className="font-medium text-red-800 mb-3 flex items-center">
                  <SafeIcon icon={FiX} className="mr-2" />
                  取消課程
                </h5>
                <p className="text-sm text-red-700 mb-3">
                  將取消此堂課程，並通知所有學生。後續需要安排補課。
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleProcessRequest('cancel')}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  確認取消課程
                </motion.button>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowProcessModal(false);
                  setSubstituteSearchTerm('');
                }}
                className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                稍後處理
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // Main render
  return (
    <div className="space-y-6">
      {/* Header - 手機優化 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">請假管理</h2>
          <p className="text-sm text-gray-600 mt-1">管理教師請假申請與課程安排</p>
        </div>

        {/* Action buttons based on role */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          {user?.role === 'instructor' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowLeaveModal(true)}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
            >
              <SafeIcon icon={FiPlus} className="text-sm" />
              <span>申請請假</span>
            </motion.button>
          )}

          {user?.role === 'admin' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert('📊 匯出功能開發中...')}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm sm:text-base"
            >
              <SafeIcon icon={FiDownload} className="text-sm" />
              <span>匯出報表</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Quick Stats - 手機優化 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            label: '待處理申請',
            value: leaveRequests.filter(r => r.status === 'pending').length,
            color: 'text-yellow-600',
            icon: FiClock
          },
          {
            label: '已處理申請',
            value: leaveRequests.filter(r => r.status === 'processed').length,
            color: 'text-green-600',
            icon: FiCheck
          },
          {
            label: '緊急申請',
            value: leaveRequests.filter(r => r.urgency === 'high' && r.status === 'pending').length,
            color: 'text-red-600',
            icon: FiAlertTriangle
          },
          {
            label: '可用代課老師',
            value: mockInstructors.filter(i => i.status === 'available').length,
            color: 'text-blue-600',
            icon: FiUsers
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-3 sm:p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <SafeIcon icon={stat.icon} className={`text-lg sm:text-2xl ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters - 手機優化 */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜尋教師、課程或原因..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
        >
          <option value="all">全部狀態</option>
          <option value="pending">待處理</option>
          <option value="approved">已批准</option>
          <option value="processed">已處理</option>
          <option value="rejected">已拒絕</option>
        </select>
      </div>

      {/* Requests List - 手機優化 */}
      <div className="space-y-4">
        {getFilteredRequests().length > 0 ? (
          getFilteredRequests().map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-4 sm:p-6"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold text-gray-900">{request.instructorName}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 ${getUrgencyColor(request.urgency)}`}>
                    {getUrgencyText(request.urgency)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  申請時間：{formatDate(request.requestDate)}
                </div>
              </div>

              {/* Course Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">課程：</span>
                  <span className="text-gray-900">{request.courseName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">時間：</span>
                  <span className="text-gray-900">{formatDate(request.courseDate)} {request.courseTime}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">學生：</span>
                  <span className="text-gray-900">{request.studentCount} 位</span>
                </div>
              </div>

              {/* Reason */}
              <div className="mb-4">
                <span className="font-medium text-gray-600 text-sm">請假原因：</span>
                <p className="text-gray-900 text-sm mt-1 bg-gray-50 rounded-lg p-3">{request.reason}</p>
              </div>

              {/* Processing Info */}
              {request.status === 'processed' && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="font-medium text-blue-800">處理方式：</span>
                      <span className="text-blue-700">
                        {request.substituteAction === 'replace' ? '安排代課老師' : '課程取消'}
                      </span>
                    </div>
                    {request.substituteInstructorName && (
                      <div>
                        <span className="font-medium text-blue-800">代課老師：</span>
                        <span className="text-blue-700">{request.substituteInstructorName}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-blue-800">處理備註：</span>
                      <span className="text-blue-700">{request.adminNotes}</span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">處理時間：</span>
                      <span className="text-blue-700">{formatDate(request.processedDate)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert(`📋 申請詳情\n\n教師：${request.instructorName}\n課程：${request.courseName}\n時間：${formatDate(request.courseDate)} ${request.courseTime}\n原因：${request.reason}\n狀態：${getStatusText(request.status)}`)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-xs font-medium"
                >
                  <SafeIcon icon={FiEye} className="text-xs" />
                  <span>查看詳情</span>
                </motion.button>

                {user?.role === 'admin' && request.status === 'pending' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedRequest(request);
                      setShowProcessModal(true);
                    }}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-xs font-medium"
                  >
                    <SafeIcon icon={FiUserCheck} className="text-xs" />
                    <span>處理申請</span>
                  </motion.button>
                )}

                {request.status === 'processed' && !request.notificationSent && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert('📧 已發送通知給相關人員')}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-xs font-medium"
                  >
                    <SafeIcon icon={FiMessageSquare} className="text-xs" />
                    <span>發送通知</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <SafeIcon icon={FiClock} className="text-4xl text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">目前沒有請假申請</h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'all' 
                ? '沒有符合篩選條件的請假申請' 
                : '當有新的請假申請時會顯示在這裡'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {renderLeaveRequestModal()}
      {renderProcessModal()}
    </div>
  );
};

export default LeaveManagement;