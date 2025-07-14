import React,{useState,useEffect} from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import {useAuth} from '../contexts/AuthContext';
import {useRouter,useSearchParams} from 'next/navigation';
import LeaveManagement from './LeaveManagement';
import SystemSettings from './SystemSettings';
import AgentManagement from './AgentManagement';

const {FiUsers,FiSettings,FiTrendingUp,FiClock,FiBarChart3,FiUserPlus,FiEdit2,FiTrash2,FiSearch,FiFilter,FiDownload,FiUpload,FiShield,FiCalendar,FiRefreshCw,FiAlertTriangle,FiX,FiBuilding,FiPlus,FiEye,FiMessageSquare,FiCheck,FiUserCheck,FiExternalLink,FiLink,FiChevronDown,FiUser,FiBookOpen,FiSave,FiVideo,FiBook,FiCheckCircle,FiCopy,FiMail,FiKey,FiGift,FiAward,FiActivity,FiTarget,FiInbox,FiSend,FiPlay,FiPause,FiStop,FiSkipForward,FiRotateCcw,FiInfo,FiSlash,FiPercent,FiBriefcase,FiToggleLeft,FiToggleRight,FiPhone}=FiIcons;

const AdminPanel=()=> {
  const {user}=useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab,setActiveTab]=useState('users');
  const [membershipFilter,setMembershipFilter]=useState('all');
  const [selectedCompany,setSelectedCompany]=useState('all');
  const [searchTerm,setSearchTerm]=useState('');
  const [filterOption,setFilterOption]=useState('all');
  const [showAddUserModal,setShowAddUserModal]=useState(false);
  const [showAddCourseModal,setShowAddCourseModal]=useState(false);
  const [showEnterpriseModal,setShowEnterpriseModal]=useState(false);
  const [showSubAccountModal,setShowSubAccountModal]=useState(false);
  const [selectedEnterprise,setSelectedEnterprise]=useState(null);
  const [editingUser,setEditingUser]=useState(null);
  const [editingCourse,setEditingCourse]=useState(null);
  const [bookingTab,setBookingTab]=useState('upcoming');

  // 新增用戶表單狀態
  const [newUser,setNewUser]=useState({
    name: '',
    email: '',
    role: 'student',
    membershipType: '',
    companyId: '',
    companyName: '',
    phone: '',
    level: '',
    expertise: '',
    experience: '',
    department: '',
    membershipPlan: '',
    membershipDuration: 12,
    autoRenewal: true,
    password: '',
    confirmPassword: ''
  });

  // Get tab from URL params
  useEffect(()=> {
    const tab=searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  },[searchParams]);

  // Enhanced Mock enterprise accounts data
  const [enterpriseAccounts,setEnterpriseAccounts]=useState([
    {
      id: 1,
      companyName: '台灣科技股份有限公司',
      masterEmail: 'admin@taiwantech.com',
      masterName: '張經理',
      purchaseDate: '2024-01-15',
      activationDeadline: '2025-01-15',
      membershipDuration: 12,
      totalSlots: 10,
      usedSlots: 7,
      availableSlots: 3,
      status: 'active',
      subAccounts: [
        {
          id: 1,
          email: 'user1@taiwantech.com',
          name: '王小明',
          status: 'activated',
          assignedDate: '2024-01-20',
          activatedDate: '2024-01-25',
          membershipEnd: '2025-01-25',
          daysRemaining: 365,
          lastLogin: '2025-01-10',
          autoRenewal: true
        },
        {
          id: 2,
          email: 'user2@taiwantech.com',
          name: '李小華',
          status: 'activated',
          assignedDate: '2024-02-01',
          activatedDate: '2024-02-03',
          membershipEnd: '2025-02-03',
          daysRemaining: 378,
          lastLogin: '2025-01-08',
          autoRenewal: false
        },
        {
          id: 3,
          email: 'user3@taiwantech.com',
          name: '陳小美',
          status: 'pending',
          assignedDate: '2024-12-15',
          activatedDate: null,
          membershipEnd: null,
          daysRemaining: 0,
          activationDaysLeft: 15,
          lastLogin: null,
          autoRenewal: false
        }
      ]
    },
    {
      id: 2,
      companyName: '創新軟體有限公司',
      masterEmail: 'hr@innovation.com',
      masterName: '劉主管',
      purchaseDate: '2024-06-01',
      activationDeadline: '2025-06-01',
      membershipDuration: 6,
      totalSlots: 5,
      usedSlots: 3,
      availableSlots: 2,
      status: 'active',
      subAccounts: [
        {
          id: 8,
          email: 'dev1@innovation.com',
          name: '程式設計師A',
          status: 'activated',
          assignedDate: '2024-06-05',
          activatedDate: '2024-06-10',
          membershipEnd: '2024-12-10',
          daysRemaining: -31,
          lastLogin: '2024-12-05',
          autoRenewal: true
        },
        {
          id: 9,
          email: 'dev2@innovation.com',
          name: '程式設計師B',
          status: 'activated',
          assignedDate: '2024-07-01',
          activatedDate: '2024-07-05',
          membershipEnd: '2025-01-05',
          daysRemaining: -14,
          lastLogin: '2024-12-20',
          autoRenewal: false
        },
        {
          id: 10,
          email: 'pm@innovation.com',
          name: '專案經理',
          status: 'pending',
          assignedDate: '2024-12-01',
          activatedDate: null,
          membershipEnd: null,
          daysRemaining: 0,
          activationDaysLeft: 152,
          lastLogin: null,
          autoRenewal: false
        }
      ]
    },
    {
      id: 3,
      companyName: '全球貿易集團',
      masterEmail: 'admin@globaltrade.com',
      masterName: '陳總監',
      purchaseDate: '2024-03-01',
      activationDeadline: '2025-03-01',
      membershipDuration: 12,
      totalSlots: 15,
      usedSlots: 12,
      availableSlots: 3,
      status: 'active',
      subAccounts: [
        {
          id: 11,
          email: 'sales1@globaltrade.com',
          name: '業務經理A',
          status: 'activated',
          assignedDate: '2024-03-05',
          activatedDate: '2024-03-08',
          membershipEnd: '2025-03-08',
          daysRemaining: 432,
          lastLogin: '2025-01-15',
          autoRenewal: true
        },
        {
          id: 12,
          email: 'sales2@globaltrade.com',
          name: '業務經理B',
          status: 'activated',
          assignedDate: '2024-03-10',
          activatedDate: '2024-03-12',
          membershipEnd: '2025-03-12',
          daysRemaining: 436,
          lastLogin: '2025-01-12',
          autoRenewal: true
        },
        {
          id: 13,
          email: 'marketing@globaltrade.com',
          name: '行銷專員',
          status: 'activated',
          assignedDate: '2024-04-01',
          activatedDate: '2024-04-03',
          membershipEnd: '2025-04-03',
          daysRemaining: 458,
          lastLogin: '2025-01-18',
          autoRenewal: false
        }
      ]
    }
  ]);

  // Enhanced Mock courses data
  const [mockCourses,setMockCourses]=useState([
    {
      id: 1,
      title: '商務華語會話',
      instructor: '張老師',
      instructorId: 2,
      currentStudents: 25,
      schedule: '週二、週四 09:00-11:30',
      startTime: '09:00',
      endTime: '11:30',
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      status: 'active',
      description: '提升商務溝通技巧，學習專業商務用語及會議表達',
      virtualClassroom: 'https://meet.google.com/abc-def-ghi',
      materials: 'https://drive.google.com/folder/d/1BxC2DeFgHiJkLmNoPqRs',
      category: '商務華語',
      level: '中級',
      weekdays: ['2','4'],
      tags: ['商務','會話','溝通'],
      createdDate: '2024-01-10',
      lastModified: '2024-12-15'
    },
    {
      id: 2,
      title: '華語文法精修',
      instructor: '王老師',
      instructorId: 3,
      currentStudents: 18,
      schedule: '週一、週三 14:00-16:30',
      startTime: '14:00',
      endTime: '16:30',
      startDate: '2024-02-01',
      endDate: '2024-07-01',
      status: 'active',
      description: '系統性學習華語文法結構與語法應用',
      virtualClassroom: 'https://meet.google.com/def-ghi-jkl',
      materials: 'https://drive.google.com/folder/d/2CyD3EfGhIjKlMnOpQrSt',
      category: '華語文法',
      level: '高級',
      weekdays: ['1','3'],
      tags: ['文法','語法','結構'],
      createdDate: '2024-01-25',
      lastModified: '2024-12-10'
    }
  ]);

  // 課程表單狀態
  const [newCourse,setNewCourse]=useState({
    title: '',
    instructor: '',
    instructorId: '',
    startTime: '',
    endTime: '',
    description: '',
    virtualClassroom: '',
    materials: '',
    category: '',
    level: '',
    weekdays: [],
    batchType: 'dateRange',
    startDate: '',
    endDate: '',
    totalSessions: '',
    tags: []
  });

  // Generate mock users from enterprise accounts + individual users
  const generateMockUsers=()=> {
    const individualUsers=[
      {
        id: 1,
        name: '王小明',
        email: 'student1@example.com',
        role: 'student',
        membershipType: 'individual',
        membershipStatus: 'active',
        joinDate: '2024-01-15',
        lastLogin: '2024-12-20',
        lastActivity: '2024-12-20',
        companyName: '',
        phone: '0912-345-678',
        level: '中級',
        expertise: '',
        experience: '',
        department: '',
        membership: {
          plan: 'quarterly',
          planName: '三個月方案',
          startDate: '2024-12-01',
          endDate: '2025-03-01',
          price: 10800,
          autoRenewal: true,
          daysRemaining: 71,
          isExpiringSoon: false
        }
      },
      {
        id: 2,
        name: '林小雅',
        email: 'student2@example.com',
        role: 'student',
        membershipType: 'individual',
        membershipStatus: 'active',
        joinDate: '2024-03-20',
        lastLogin: '2024-12-18',
        lastActivity: '2024-12-18',
        companyName: '',
        phone: '0923-456-789',
        level: '高級',
        expertise: '',
        experience: '',
        department: '',
        membership: {
          plan: 'yearly',
          planName: '一年方案',
          startDate: '2024-03-20',
          endDate: '2025-03-20',
          price: 36000,
          autoRenewal: true,
          daysRemaining: 89,
          isExpiringSoon: false
        }
      },
      {
        id: 3,
        name: '張老師',
        email: 'instructor@example.com',
        role: 'instructor',
        membershipType: null,
        membershipStatus: 'active',
        joinDate: '2023-08-10',
        lastLogin: '2024-12-19',
        lastActivity: '2024-12-19',
        companyName: '',
        phone: '0934-567-890',
        level: '',
        expertise: '商務華語、文法教學',
        experience: '8年教學經驗',
        department: '語言教學部',
        membership: null
      }
    ];

    const enterpriseUsers=enterpriseAccounts.flatMap(enterprise=>
      enterprise.subAccounts.map(subAccount=> ({
        id: `enterprise_${enterprise.id}_${subAccount.id}`,
        name: subAccount.name,
        email: subAccount.email,
        role: 'student',
        membershipType: 'corporate',
        membershipStatus: subAccount.status==='activated' ? 'active' : subAccount.status==='pending' ? 'inactive' : 'expired',
        joinDate: subAccount.assignedDate,
        lastLogin: subAccount.lastLogin || '從未登入',
        lastActivity: subAccount.lastLogin || '從未活動',
        companyName: enterprise.companyName,
        companyId: enterprise.id,
        masterAccount: enterprise.masterEmail,
        enterpriseId: enterprise.id,
        subAccountId: subAccount.id,
        phone: '',
        level: '',
        expertise: '',
        experience: '',
        department: '',
        membership: subAccount.status==='activated' ? {
          plan: 'corporate',
          planName: '企業方案',
          startDate: subAccount.activatedDate,
          endDate: subAccount.membershipEnd,
          price: 0,
          autoRenewal: subAccount.autoRenewal || false,
          daysRemaining: subAccount.daysRemaining,
          isExpiringSoon: subAccount.daysRemaining <=14 && subAccount.daysRemaining > 0
        } : null
      }))
    );

    return [...individualUsers,...enterpriseUsers];
  };

  const [mockUsers,setMockUsers]=useState(generateMockUsers());

  useEffect(()=> {
    setMockUsers(generateMockUsers());
  },[enterpriseAccounts]);

  // Enhanced booking data
  const getAllBookings=()=> {
    const bookings=[
      {
        id: 1,
        studentName: '王小明',
        studentEmail: 'student1@example.com',
        courseName: '商務華語會話',
        instructor: '張老師',
        date: '2025-01-20',
        time: '09:00-10:30',
        status: 'upcoming',
        classroom: 'https://meet.google.com/abc-def-ghi',
        materials: 'https://drive.google.com/file/d/example1',
        daysFromNow: 1,
        membershipType: 'individual',
        companyName: null
      },
      {
        id: 2,
        studentName: '林小雅',
        studentEmail: 'student2@example.com',
        courseName: '華語文法精修',
        instructor: '王老師',
        date: '2025-01-22',
        time: '14:00-15:30',
        status: 'upcoming',
        classroom: 'https://meet.google.com/def-ghi-jkl',
        materials: 'https://drive.google.com/file/d/example2',
        daysFromNow: 3,
        membershipType: 'individual',
        companyName: null
      },
      {
        id: 3,
        studentName: '王小明',
        studentEmail: 'user1@taiwantech.com',
        courseName: '商務華語會話',
        instructor: '張老師',
        date: '2025-01-21',
        time: '10:00-11:30',
        status: 'upcoming',
        classroom: 'https://meet.google.com/ghi-jkl-mno',
        materials: 'https://drive.google.com/file/d/example3',
        daysFromNow: 2,
        membershipType: 'corporate',
        companyName: '台灣科技股份有限公司',
        companyId: 1
      },
      {
        id: 4,
        studentName: '李小華',
        studentEmail: 'user2@taiwantech.com',
        courseName: '華語文法精修',
        instructor: '王老師',
        date: '2025-01-23',
        time: '15:00-16:30',
        status: 'upcoming',
        classroom: 'https://meet.google.com/jkl-mno-pqr',
        materials: 'https://drive.google.com/file/d/example4',
        daysFromNow: 4,
        membershipType: 'corporate',
        companyName: '台灣科技股份有限公司',
        companyId: 1
      },
      {
        id: 8,
        studentName: '王小明',
        studentEmail: 'student1@example.com',
        courseName: '商務華語會話',
        instructor: '張老師',
        date: '2025-01-15',
        time: '09:00-10:30',
        status: 'completed',
        classroom: 'https://meet.google.com/abc-def-ghi',
        materials: 'https://drive.google.com/file/d/example8',
        daysFromNow: -4,
        membershipType: 'individual',
        companyName: null
      }
    ];

    return bookings.sort((a,b)=> {
      if (a.status==='completed' && b.status !=='completed') return 1;
      if (a.status !=='completed' && b.status==='completed') return -1;
      return a.daysFromNow - b.daysFromNow;
    });
  };

  // Helper functions
  const formatDate=(dateString)=> {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('zh-TW',{
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getStatusColor=(status)=> {
    switch (status) {
      case 'upcoming': return 'text-blue-700 bg-blue-50';
      case 'completed': return 'text-gray-600 bg-gray-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      case 'active': return 'text-green-700 bg-green-50';
      case 'pending': return 'text-yellow-700 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText=(status)=> {
    switch (status) {
      case 'upcoming': return '預約中';
      case 'completed': return '已完成';
      case 'cancelled': return '已取消';
      case 'active': return '進行中';
      case 'pending': return '待處理';
      default: return '未知';
    }
  };

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

  const getMembershipStatusColor=(status)=> {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'expiring_soon': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMembershipStatusName=(status)=> {
    switch (status) {
      case 'active': return '使用中';
      case 'expired': return '已過期';
      case 'expiring_soon': return '即將到期';
      case 'inactive': return '未啟用';
      default: return '未知';
    }
  };

  const getMembershipTypeColor=(type)=> {
    switch (type) {
      case 'individual': return 'bg-blue-100 text-blue-800';
      case 'corporate': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMembershipTypeName=(type)=> {
    switch (type) {
      case 'individual': return '個人會員';
      case 'corporate': return '企業會員';
      default: return '非會員';
    }
  };

  const getUserIcon=(user)=> {
    if (user.role==='instructor') return FiUserCheck;
    if (user.role==='admin') return FiShield;
    if (user.membershipType==='corporate') return FiBriefcase;
    return FiUser;
  };

  const getUserIconColor=(user)=> {
    if (user.role==='instructor') return 'bg-green-500';
    if (user.role==='admin') return 'bg-purple-500';
    if (user.membershipType==='corporate') return 'bg-indigo-500';
    return 'bg-blue-500';
  };

  // Course Management Functions
  const getCourseStatusColor=(status)=> {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCourseStatusName=(status)=> {
    switch (status) {
      case 'active': return '進行中';
      case 'completed': return '已完成';
      case 'draft': return '草稿';
      default: return '未知';
    }
  };

  // Weekday helper functions
  const weekdayOptions=[
    {value: '0',label: '週日',short: '日'},
    {value: '1',label: '週一',short: '一'},
    {value: '2',label: '週二',short: '二'},
    {value: '3',label: '週三',short: '三'},
    {value: '4',label: '週四',short: '四'},
    {value: '5',label: '週五',short: '五'},
    {value: '6',label: '週六',short: '六'}
  ];

  const formatWeekdays=(weekdays)=> {
    if (!weekdays || weekdays.length===0) return '';
    return weekdays.map(day=> weekdayOptions.find(w=> w.value===day)?.short).join('、');
  };

  const handleWeekdayToggle=(day)=> {
    setNewCourse(prev=> ({
      ...prev,
      weekdays: prev.weekdays.includes(day)
        ? prev.weekdays.filter(d=> d !==day)
        : [...prev.weekdays,day].sort()
    }));
  };

  const generateScheduleText=()=> {
    if (!newCourse.weekdays.length || !newCourse.startTime || !newCourse.endTime) return '';
    const weekdayText=newCourse.weekdays.map(day=>
      weekdayOptions.find(w=> w.value===day)?.label
    ).join('、');
    return `${weekdayText} ${newCourse.startTime}-${newCourse.endTime}`;
  };

  const handleEditCourse=(courseId)=> {
    const course=mockCourses.find(c=> c.id===courseId);
    setEditingCourse(course);
    setNewCourse({
      title: course.title,
      instructor: course.instructor,
      instructorId: course.instructorId,
      startTime: course.startTime || '',
      endTime: course.endTime || '',
      description: course.description,
      virtualClassroom: course.virtualClassroom,
      materials: course.materials,
      category: course.category,
      level: course.level,
      weekdays: course.weekdays || [],
      batchType: 'dateRange',
      startDate: course.startDate,
      endDate: course.endDate,
      totalSessions: '',
      tags: course.tags || []
    });
    setShowAddCourseModal(true);
  };

  const handleDeleteCourse=(courseId)=> {
    if (confirm('確定要刪除此課程嗎？此操作無法復原。')) {
      setMockCourses(prev=> prev.filter(course=> course.id !==courseId));
      alert('✅ 課程已成功刪除！');
    }
  };

  const handleViewCourse=(courseId)=> {
    const course=mockCourses.find(c=> c.id===courseId);
    const scheduleText=course.weekdays
      ? `週${formatWeekdays(course.weekdays)} ${course.startTime}-${course.endTime}`
      : course.schedule;
    alert(`📚 課程詳情\n\n課程名稱：${course.title}\n教師：${course.instructor}\n學生人數：${course.currentStudents} 位\n上課時間：${scheduleText}\n狀態：${getCourseStatusName(course.status)}\n\n描述：${course.description}`);
  };

  // 課程表單驗證
  const validateCourseForm=()=> {
    const errors=[];
    if (!newCourse.title.trim()) errors.push('課程名稱');
    if (!newCourse.instructor.trim()) errors.push('授課教師');
    if (!newCourse.startTime) errors.push('開始時間');
    if (!newCourse.endTime) errors.push('結束時間');
    if (newCourse.weekdays.length===0) errors.push('上課星期');

    if (newCourse.startTime && newCourse.endTime && newCourse.startTime >=newCourse.endTime) {
      errors.push('結束時間必須晚於開始時間');
    }

    if (newCourse.batchType==='dateRange') {
      if (!newCourse.startDate) errors.push('開始日期');
      if (!newCourse.endDate) errors.push('結束日期');
      if (newCourse.startDate && newCourse.endDate && newCourse.startDate >=newCourse.endDate) {
        errors.push('結束日期必須晚於開始日期');
      }
    } else if (newCourse.batchType==='sessions') {
      if (!newCourse.startDate) errors.push('開始日期');
      if (!newCourse.totalSessions || parseInt(newCourse.totalSessions) <=0) {
        errors.push('總次數（必須大於0）');
      }
    }

    const urlPattern=/^https?:\/\/.+/;
    if (newCourse.virtualClassroom && !urlPattern.test(newCourse.virtualClassroom)) {
      errors.push('虛擬教室連結格式不正確');
    }

    if (newCourse.materials && !urlPattern.test(newCourse.materials)) {
      errors.push('教材連結格式不正確');
    }

    return errors;
  };

  const handleSaveCourse=()=> {
    const validationErrors=validateCourseForm();
    if (validationErrors.length > 0) {
      alert(`❌ 請檢查以下欄位：\n\n• ${validationErrors.join('\n• ')}`);
      return;
    }

    const scheduleText=generateScheduleText();

    if (editingCourse) {
      setMockCourses(prev=> prev.map(course=>
        course.id===editingCourse.id
          ? {
              ...course,
              ...newCourse,
              schedule: scheduleText,
              lastModified: new Date().toISOString().split('T')[0]
            }
          : course
      ));
      alert('✅ 課程已成功更新！');
    } else {
      const newCourseData={
        id: Math.max(...mockCourses.map(c=> c.id),0) + 1,
        ...newCourse,
        schedule: scheduleText,
        currentStudents: 0,
        status: 'active',
        createdDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0]
      };
      setMockCourses(prev=> [...prev,newCourseData]);
      alert('✅ 課程已成功新增！');
    }

    setNewCourse({
      title: '',
      instructor: '',
      instructorId: '',
      startTime: '',
      endTime: '',
      description: '',
      virtualClassroom: '',
      materials: '',
      category: '',
      level: '',
      weekdays: [],
      batchType: 'dateRange',
      startDate: '',
      endDate: '',
      totalSessions: '',
      tags: []
    });
    setEditingCourse(null);
    setShowAddCourseModal(false);
  };

  // Toggle auto renewal function
  const handleToggleAutoRenewal=(userId)=> {
    setMockUsers(prevUsers=> prevUsers.map(user=> {
      if (user.id===userId && user.membership) {
        return {
          ...user,
          membership: {
            ...user.membership,
            autoRenewal: !user.membership.autoRenewal
          }
        };
      }
      return user;
    }));
    alert('✅ 自動續約設定已更新！');
  };

  // Enhanced user filtering
  const getFilteredUsers=()=> {
    let users=mockUsers.filter(user=> {
      const matchesSearch=user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.companyName && user.companyName.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      if (membershipFilter==='individual' && user.membershipType !=='individual') return false;
      if (membershipFilter==='corporate' && user.membershipType !=='corporate') return false;
      if (membershipFilter==='corporate' && selectedCompany !=='all') {
        if (user.companyId !==parseInt(selectedCompany)) return false;
      }

      switch (filterOption) {
        case 'students': return user.role==='student';
        case 'instructors': return user.role==='instructor';
        case 'active_memberships': return user.membershipStatus==='active';
        case 'expired_memberships': return user.membershipStatus==='expired';
        case 'expiring_soon': return user.membershipStatus==='expiring_soon';
        case 'inactive': return user.membershipStatus==='inactive';
        default: return true;
      }
    });

    return users;
  };

  // Filter bookings
  const getFilteredBookings=()=> {
    const allBookings=getAllBookings();
    let filteredBookings=allBookings.filter(booking=> {
      if (bookingTab==='upcoming' && booking.status !=='upcoming') return false;
      if (bookingTab==='completed' && booking.status !=='completed') return false;

      if (membershipFilter==='individual' && booking.membershipType !=='individual') return false;
      if (membershipFilter==='corporate' && booking.membershipType !=='corporate') return false;
      if (membershipFilter==='corporate' && selectedCompany !=='all') {
        if (booking.companyId !==parseInt(selectedCompany)) return false;
      }

      return true;
    });

    return filteredBookings;
  };

  // Get statistics
  const getFilteredStats=()=> {
    const filteredUsers=getFilteredUsers();
    let stats=[];

    if (membershipFilter==='all') {
      stats=[
        {
          label: '總學生數',
          value: filteredUsers.filter(u=> u.role==='student').length,
          color: 'text-blue-600',
          icon: FiUsers
        },
        {
          label: '活躍會員',
          value: filteredUsers.filter(u=> u.membershipStatus==='active').length,
          color: 'text-green-600',
          icon: FiCalendar
        },
        {
          label: '個人會員',
          value: filteredUsers.filter(u=> u.membershipType==='individual').length,
          color: 'text-purple-600',
          icon: FiUser
        },
        {
          label: '企業會員',
          value: filteredUsers.filter(u=> u.membershipType==='corporate').length,
          color: 'text-orange-600',
          icon: FiBriefcase
        }
      ];
    } else if (membershipFilter==='individual') {
      stats=[
        {
          label: '個人會員總數',
          value: filteredUsers.length,
          color: 'text-blue-600',
          icon: FiUser
        },
        {
          label: '活躍會員',
          value: filteredUsers.filter(u=> u.membershipStatus==='active').length,
          color: 'text-green-600',
          icon: FiCheck
        },
        {
          label: '即將到期',
          value: filteredUsers.filter(u=> u.membership?.isExpiringSoon).length,
          color: 'text-yellow-600',
          icon: FiAlertTriangle
        },
        {
          label: '已過期',
          value: filteredUsers.filter(u=> u.membershipStatus==='expired').length,
          color: 'text-red-600',
          icon: FiX
        }
      ];
    } else if (membershipFilter==='corporate') {
      const currentCompanyUsers=selectedCompany==='all'
        ? filteredUsers
        : filteredUsers.filter(u=> u.companyId===parseInt(selectedCompany));

      stats=[
        {
          label: '企業員工數',
          value: currentCompanyUsers.length,
          color: 'text-blue-600',
          icon: FiBriefcase
        },
        {
          label: '已啟用',
          value: currentCompanyUsers.filter(u=> u.membershipStatus==='active').length,
          color: 'text-green-600',
          icon: FiCheck
        },
        {
          label: '待啟用',
          value: currentCompanyUsers.filter(u=> u.membershipStatus==='inactive').length,
          color: 'text-yellow-600',
          icon: FiClock
        },
        {
          label: '已過期',
          value: currentCompanyUsers.filter(u=> u.membershipStatus==='expired').length,
          color: 'text-red-600',
          icon: FiX
        }
      ];
    }

    return stats;
  };

  // Get available companies
  const getAvailableCompanies=()=> {
    return enterpriseAccounts.map(enterprise=> ({
      id: enterprise.id,
      name: enterprise.companyName
    }));
  };

  // 🆕 新增用戶功能
  const validateUserForm=()=> {
    const errors=[];
    if (!newUser.name.trim()) errors.push('姓名');
    if (!newUser.email.trim()) errors.push('電子郵件');
    if (!newUser.role) errors.push('角色');

    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newUser.email && !emailPattern.test(newUser.email)) {
      errors.push('電子郵件格式不正確');
    }

    const emailExists=mockUsers.some(user=> user.email===newUser.email);
    if (emailExists) {
      errors.push('此電子郵件已被使用');
    }

    if (!newUser.password || newUser.password.length < 6) {
      errors.push('密碼至少需要6個字符');
    }

    if (newUser.password !==newUser.confirmPassword) {
      errors.push('密碼確認不一致');
    }

    if (newUser.role==='student') {
      if (!newUser.membershipType) {
        errors.push('會員類型（學生必填）');
      }
      if (newUser.membershipType==='corporate' && !newUser.companyId) {
        errors.push('企業（企業會員必填）');
      }
      if (newUser.membershipType==='individual' && !newUser.membershipPlan) {
        errors.push('會員方案（個人會員必填）');
      }
    }

    if (newUser.phone) {
      const phonePattern=/^09\d{8}$/;
      if (!phonePattern.test(newUser.phone)) {
        errors.push('手機號碼格式不正確（格式：09xxxxxxxx）');
      }
    }

    return errors;
  };

  const handleSaveUser=()=> {
    const validationErrors=validateUserForm();
    if (validationErrors.length > 0) {
      alert(`❌ 請檢查以下欄位：\n\n• ${validationErrors.join('\n• ')}`);
      return;
    }

    const currentDate=new Date().toISOString().split('T')[0];
    let membershipData=null;
    let membershipStatus='inactive';

    if (newUser.role==='student') {
      if (newUser.membershipType==='individual') {
        const planDetails={
          'monthly': {planName: '月方案',duration: 1,price: 4500},
          'quarterly': {planName: '三個月方案',duration: 3,price: 10800},
          'yearly': {planName: '一年方案',duration: 12,price: 36000}
        };

        const plan=planDetails[newUser.membershipPlan];
        if (plan) {
          const endDate=new Date();
          endDate.setMonth(endDate.getMonth() + plan.duration);
          membershipData={
            plan: newUser.membershipPlan,
            planName: plan.planName,
            startDate: currentDate,
            endDate: endDate.toISOString().split('T')[0],
            price: plan.price,
            autoRenewal: newUser.autoRenewal,
            daysRemaining: Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24)),
            isExpiringSoon: false
          };
          membershipStatus='active';
        }
      } else if (newUser.membershipType==='corporate') {
        membershipData={
          plan: 'corporate',
          planName: '企業方案',
          startDate: currentDate,
          endDate: null,
          price: 0,
          autoRenewal: newUser.autoRenewal,
          daysRemaining: 365,
          isExpiringSoon: false
        };
        membershipStatus='inactive';
      }
    } else {
      membershipStatus='active';
    }

    const newUserData={
      id: Math.max(...mockUsers.map(u=> typeof u.id==='number' ? u.id : 0),0) + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      membershipType: newUser.role==='student' ? newUser.membershipType : null,
      membershipStatus,
      joinDate: currentDate,
      lastLogin: '從未登入',
      lastActivity: '從未活動',
      companyName: newUser.membershipType==='corporate' ? newUser.companyName : '',
      companyId: newUser.membershipType==='corporate' ? parseInt(newUser.companyId) : null,
      phone: newUser.phone,
      level: newUser.level,
      expertise: newUser.expertise,
      experience: newUser.experience,
      department: newUser.department,
      membership: membershipData
    };

    setMockUsers(prev=> [...prev,newUserData]);
    setNewUser({
      name: '',
      email: '',
      role: 'student',
      membershipType: '',
      companyId: '',
      companyName: '',
      phone: '',
      level: '',
      expertise: '',
      experience: '',
      department: '',
      membershipPlan: '',
      membershipDuration: 12,
      autoRenewal: true,
      password: '',
      confirmPassword: ''
    });
    setShowAddUserModal(false);
    alert('✅ 用戶已成功新增！');
  };

  // 🆕 CSV匯出功能
  const handleExportCSV=()=> {
    const filteredUsers=getFilteredUsers();
    const headers=[
      '姓名','電子郵件','角色','會員類型','企業名稱','會員方案','會員狀態',
      '開始日期','到期日期','剩餘天數','最後登入','最後活動','加入日期',
      '電話','學習程度','專業領域','教學經驗','部門','自動續約'
    ];

    const csvData=filteredUsers.map(user=> [
      user.name,
      user.email,
      getRoleName(user.role),
      user.membershipType ? getMembershipTypeName(user.membershipType) : '非會員',
      user.companyName || '-',
      user.membership?.planName || '-',
      getMembershipStatusName(user.membershipStatus),
      formatDate(user.membership?.startDate),
      formatDate(user.membership?.endDate),
      user.membership?.daysRemaining || '-',
      formatDate(user.lastLogin),
      formatDate(user.lastActivity),
      formatDate(user.joinDate),
      user.phone || '-',
      user.level || '-',
      user.expertise || '-',
      user.experience || '-',
      user.department || '-',
      user.membership?.autoRenewal ? '是' : '否'
    ]);

    const csvContent=[headers,...csvData]
      .map(row=> row.map(cell=> `"${cell}"`).join(','))
      .join('\n');

    const BOM='\uFEFF';
    const blob=new Blob([BOM + csvContent],{type: 'text/csv;charset=utf-8;'});
    const link=document.createElement('a');
    const url=URL.createObjectURL(blob);
    link.setAttribute('href',url);
    const timestamp=new Date().toISOString().slice(0,10);
    const filterText=membershipFilter==='all' ? '全部' : membershipFilter==='individual' ? '個人會員' : '企業會員';
    link.setAttribute('download',`TLI用戶管理_${filterText}_${timestamp}.csv`);
    link.style.visibility='hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert(`✅ CSV檔案匯出成功！\n\n檔案名稱：TLI用戶管理_${filterText}_${timestamp}.csv\n匯出筆數：${filteredUsers.length} 筆`);
  };

  // User Management Component
  const renderUserManagement=()=> (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">用戶管理</h2>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            onClick={()=> setShowAddUserModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <SafeIcon icon={FiUserPlus} className="text-sm" />
            <span>新增用戶</span>
          </motion.button>
          <motion.button
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <SafeIcon icon={FiDownload} className="text-sm" />
            <span>匯出CSV</span>
          </motion.button>
        </div>
      </div>

      {/* Membership Type Filter */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-100/60 flex items-center space-x-2">
          <motion.button
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            onClick={()=> {
              setMembershipFilter('all');
              setSelectedCompany('all');
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              membershipFilter==='all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <SafeIcon icon={FiUsers} className="inline mr-2" />
            全部會員
          </motion.button>
          <motion.button
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            onClick={()=> {
              setMembershipFilter('individual');
              setSelectedCompany('all');
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              membershipFilter==='individual'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <SafeIcon icon={FiUser} className="inline mr-2" />
            個人會員
          </motion.button>
          <motion.button
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            onClick={()=> {
              setMembershipFilter('corporate');
              setSelectedCompany('all');
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              membershipFilter==='corporate'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <SafeIcon icon={FiBriefcase} className="inline mr-2" />
            企業會員
          </motion.button>
          {membershipFilter==='corporate' && (
            <div className="ml-4 pl-4 border-l border-gray-200">
              <select
                value={selectedCompany}
                onChange={(e)=> setSelectedCompany(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium bg-white"
              >
                <option value="all">全部企業</option>
                {getAvailableCompanies().map(company=> (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Corporate Accounts Overview */}
      {membershipFilter==='corporate' && (
        <div className="mb-6">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <SafeIcon icon={FiBriefcase} className="mr-2 text-purple-600" />
                企業帳號總覽
              </h3>
              <span className="text-sm text-gray-600">
                {enterpriseAccounts.length} 家企業客戶
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {enterpriseAccounts.map((enterprise)=> (
                <motion.div
                  key={enterprise.id}
                  whileHover={{scale: 1.02}}
                  className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{enterprise.companyName}</h4>
                      <p className="text-sm text-gray-600">{enterprise.masterName}</p>
                      <p className="text-xs text-gray-500">{enterprise.masterEmail}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {enterprise.usedSlots} / {enterprise.totalSlots}
                      </div>
                      <div className="text-xs text-gray-500">組數使用</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center">
                      <div className="text-sm font-medium text-green-600">
                        {enterprise.subAccounts.filter(s=> s.status==='activated').length}
                      </div>
                      <div className="text-xs text-gray-500">已開通</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-yellow-600">
                        {enterprise.subAccounts.filter(s=> s.status==='pending').length}
                      </div>
                      <div className="text-xs text-gray-500">待開通</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-red-600">
                        {enterprise.subAccounts.filter(s=> s.status==='expired').length}
                      </div>
                      <div className="text-xs text-gray-500">已過期</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{scale: 1.05}}
                      whileTap={{scale: 0.95}}
                      onClick={()=> {
                        setSelectedCompany(enterprise.id.toString());
                      }}
                      className="flex-1 text-xs bg-purple-100 text-purple-700 py-2 px-3 rounded-lg hover:bg-purple-200 transition-colors font-medium"
                    >
                      查看詳情
                    </motion.button>
                    <motion.button
                      whileHover={{scale: 1.05}}
                      whileTap={{scale: 0.95}}
                      onClick={()=> {
                        setSelectedCompany(enterprise.id.toString());
                      }}
                      className="flex-1 text-xs bg-blue-100 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                    >
                      篩選用戶
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {getFilteredStats().map((stat,index)=> (
          <motion.div
            key={index}
            whileHover={{scale: 1.02,y: -2}}
            className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-4"
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

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜尋用戶或公司名稱..."
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterOption}
          onChange={(e)=> setFilterOption(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">全部用戶</option>
          <option value="students">僅學生</option>
          <option value="instructors">僅教師</option>
          <option value="active_memberships">活躍會員</option>
          <option value="expiring_soon">即將到期</option>
          <option value="expired_memberships">已過期會員</option>
          <option value="inactive">未啟用</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">圖標</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用戶</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">會員類型</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">方案</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">會員狀態</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">開始日期</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">到期日期</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最後活動日期</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">加入日期</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">自動續約</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredUsers().map((user)=> (
                <motion.tr
                  key={user.id}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getUserIconColor(user)}`}>
                      <SafeIcon icon={getUserIcon(user)} className="text-white text-sm" />
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      {user.companyName && (
                        <div className="text-xs text-purple-600 font-medium">{user.companyName}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    {user.masterAccount && (
                      <div className="text-xs text-gray-500">主帳號：{user.masterAccount}</div>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {getRoleName(user.role)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {user.membershipType ? (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMembershipTypeColor(user.membershipType)}`}>
                        {getMembershipTypeName(user.membershipType)}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">非會員</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.membership ? user.membership.planName : '-'}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {user.membership ? (
                      <div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMembershipStatusColor(user.membershipStatus)}`}>
                          {getMembershipStatusName(user.membershipStatus)}
                        </span>
                        {user.membership.daysRemaining > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            剩餘 {user.membership.daysRemaining} 天
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(user.membership?.startDate)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(user.membership?.endDate)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(user.lastActivity)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(user.joinDate)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {user.membership ? (
                      <motion.button
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={()=> handleToggleAutoRenewal(user.id)}
                        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                          user.membership.autoRenewal
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <SafeIcon icon={user.membership.autoRenewal ? FiToggleRight : FiToggleLeft} className="text-sm" />
                        <span>{user.membership.autoRenewal ? '已啟用' : '未啟用'}</span>
                      </motion.button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={()=> alert('編輯用戶功能開發中...')}
                        className="text-blue-600 hover:text-blue-900"
                        title="編輯用戶"
                      >
                        <SafeIcon icon={FiEdit2} className="text-sm" />
                      </motion.button>
                      {user.enterpriseId && (
                        <motion.button
                          whileHover={{scale: 1.05}}
                          whileTap={{scale: 0.95}}
                          onClick={()=> {
                            setMembershipFilter('corporate');
                            setSelectedCompany(user.enterpriseId.toString());
                          }}
                          className="text-purple-600 hover:text-purple-900"
                          title="查看企業帳號"
                        >
                          <SafeIcon icon={FiBriefcase} className="text-sm" />
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={()=> alert('刪除用戶功能開發中...')}
                        className="text-red-600 hover:text-red-900"
                        title="刪除用戶"
                      >
                        <SafeIcon icon={FiTrash2} className="text-sm" />
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

  // Course Management Component
  const renderCourseManagement=()=> (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">課程管理</h2>
        <motion.button
          whileHover={{scale: 1.02}}
          whileTap={{scale: 0.98}}
          onClick={()=> {
            setEditingCourse(null);
            setNewCourse({
              title: '',
              instructor: '',
              instructorId: '',
              startTime: '',
              endTime: '',
              description: '',
              virtualClassroom: '',
              materials: '',
              category: '',
              level: '',
              weekdays: [],
              batchType: 'dateRange',
              startDate: '',
              endDate: '',
              totalSessions: '',
              tags: []
            });
            setShowAddCourseModal(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <SafeIcon icon={FiPlus} className="text-sm" />
          <span>新增課程</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course)=> (
          <motion.div
            key={course.id}
            whileHover={{scale: 1.02,y: -4}}
            className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCourseStatusColor(course.status)}`}>
                {getCourseStatusName(course.status)}
              </span>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUserCheck} className="text-blue-600 text-sm" />
                <span className="text-sm text-gray-600">{course.instructor}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUsers} className="text-green-600 text-sm" />
                <span className="text-sm text-gray-600">{course.currentStudents} 位學生</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiClock} className="text-purple-600 text-sm" />
                <span className="text-sm text-gray-600">{course.schedule}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiBook} className="text-orange-600 text-sm" />
                <span className="text-sm text-gray-600">
                  {course.startDate} - {course.endDate}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={()=> handleViewCourse(course.id)}
                className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiEye} className="text-sm" />
                <span className="text-sm font-medium">查看</span>
              </motion.button>
              <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={()=> handleEditCourse(course.id)}
                className="flex items-center space-x-1 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiEdit2} className="text-sm" />
                <span className="text-sm font-medium">編輯</span>
              </motion.button>
              <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={()=> handleDeleteCourse(course.id)}
                className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiTrash2} className="text-sm" />
                <span className="text-sm font-medium">刪除</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // All Bookings Management Component
  const renderAllBookings=()=> {
    const filteredBookings=getFilteredBookings();

    const upcomingCount=getAllBookings().filter(b=> {
      if (membershipFilter==='individual') return b.status==='upcoming' && b.membershipType==='individual';
      if (membershipFilter==='corporate') {
        if (selectedCompany==='all') return b.status==='upcoming' && b.membershipType==='corporate';
        return b.status==='upcoming' && b.membershipType==='corporate' && b.companyId===parseInt(selectedCompany);
      }
      return b.status==='upcoming';
    }).length;

    const completedCount=getAllBookings().filter(b=> {
      if (membershipFilter==='individual') return b.status==='completed' && b.membershipType==='individual';
      if (membershipFilter==='corporate') {
        if (selectedCompany==='all') return b.status==='completed' && b.membershipType==='corporate';
        return b.status==='completed' && b.membershipType==='corporate' && b.companyId===parseInt(selectedCompany);
      }
      return b.status==='completed';
    }).length;

    return (
      <motion.div
        initial={{opacity: 0,y: 20}}
        animate={{opacity: 1,y: 0}}
        className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {membershipFilter==='individual'
                ? '個人會員預約狀況'
                : membershipFilter==='corporate'
                ? (selectedCompany==='all'
                  ? '企業會員預約狀況'
                  : `${getAvailableCompanies().find(c=> c.id===parseInt(selectedCompany))?.name || '企業'} 預約狀況`)
                : '全體預約狀況'}
            </h2>
            {membershipFilter==='corporate' && selectedCompany !=='all' && (
              <p className="text-sm text-gray-600 mt-1">
                {getAvailableCompanies().find(c=> c.id===parseInt(selectedCompany))?.name} 的員工預約記錄
              </p>
            )}
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <motion.button
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
              onClick={()=> setBookingTab('upcoming')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                bookingTab==='upcoming'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              即將開始 ({upcomingCount})
            </motion.button>
            <motion.button
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
              onClick={()=> setBookingTab('completed')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                bookingTab==='completed'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              已完成 ({completedCount})
            </motion.button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking)=> (
              <motion.div
                key={booking.id}
                initial={{opacity: 0,x: -20}}
                animate={{opacity: 1,x: 0}}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  booking.status==='upcoming'
                    ? 'border-blue-200 bg-blue-50/50'
                    : 'border-gray-200 bg-gray-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{booking.courseName}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        booking.membershipType==='corporate' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {booking.membershipType==='corporate' ? '企業會員' : '個人會員'}
                      </span>
                      {booking.companyName && (
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                          {booking.companyName}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiUser} className="text-xs" />
                        <span>{booking.studentName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiUserCheck} className="text-xs" />
                        <span>{booking.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiCalendar} className="text-xs" />
                        <span>{formatDate(booking.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiClock} className="text-xs" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {booking.status==='upcoming' && (
                      <>
                        <motion.button
                          whileHover={{scale: 1.05}}
                          whileTap={{scale: 0.95}}
                          onClick={()=> window.open(booking.classroom,'_blank')}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                          title="進入教室"
                        >
                          <SafeIcon icon={FiExternalLink} className="text-xs" />
                          <span className="text-xs font-medium">教室</span>
                        </motion.button>
                        <motion.button
                          whileHover={{scale: 1.05}}
                          whileTap={{scale: 0.95}}
                          onClick={()=> window.open(booking.materials,'_blank')}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                          title="檢視教材"
                        >
                          <SafeIcon icon={FiEye} className="text-xs" />
                          <span className="text-xs font-medium">教材</span>
                        </motion.button>
                      </>
                    )}
                    {booking.status==='completed' && (
                      <motion.button
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={()=> window.open(booking.materials,'_blank')}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        title="檢視教材"
                      >
                        <SafeIcon icon={FiEye} className="text-xs" />
                        <span className="text-xs font-medium">教材</span>
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{scale: 1.05}}
                      whileTap={{scale: 0.95}}
                      onClick={()=> alert(`📧 發送訊息給 ${booking.studentName}`)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                      title="聯絡學生"
                    >
                      <SafeIcon icon={FiMessageSquare} className="text-xs" />
                      <span className="text-xs font-medium">聯絡</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <SafeIcon icon={bookingTab==='upcoming' ? FiCalendar : FiCheckCircle} className="text-4xl text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {bookingTab==='upcoming' ? '尚無即將開始課程' : '尚無已完成課程'}
              </h3>
              <p className="text-gray-600">
                {bookingTab==='upcoming'
                  ? '當有新的課程預約時，會顯示在這裡'
                  : '已完成的課程預約會顯示在這裡'}
              </p>
              {membershipFilter==='corporate' && selectedCompany !=='all' && (
                <p className="text-sm text-gray-500 mt-2">
                  目前篩選：{getAvailableCompanies().find(c=> c.id===parseInt(selectedCompany))?.name}
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const renderContent=()=> {
    switch (activeTab) {
      case 'users': return renderUserManagement();
      case 'courses': return renderCourseManagement();
      case 'leave': return <LeaveManagement />;
      case 'agents': return <AgentManagement />; // 新增代理管理
      case 'settings': return <SystemSettings />;
      default: return renderUserManagement();
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8">
      {/* Content - 移除重複的標題和Tabs */}
      <motion.div
        key={activeTab}
        initial={{opacity: 0,x: 20}}
        animate={{opacity: 1,x: 0}}
        transition={{duration: 0.3}}
      >
        {renderContent()}
      </motion.div>

      {/* All Bookings Section */}
      {activeTab==='users' && (
        <div className="mt-8">
          {renderAllBookings()}
        </div>
      )}

      {/* 🆕 新增用戶Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{opacity: 0,scale: 0.9}}
            animate={{opacity: 1,scale: 1}}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">新增用戶</h3>
                <button onClick={()=> setShowAddUserModal(false)}>
                  <SafeIcon icon={FiX} className="text-white text-xl hover:bg-white/20 rounded-lg p-1 transition-colors" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={(e)=> {e.preventDefault();handleSaveUser();}} className="space-y-6">
                {/* 基本資訊 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <SafeIcon icon={FiUser} className="mr-2 text-blue-600" />
                    基本資訊
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        姓名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newUser.name}
                        onChange={(e)=> setNewUser(prev=> ({...prev,name: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="請輸入用戶姓名"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        電子郵件 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={newUser.email}
                        onChange={(e)=> setNewUser(prev=> ({...prev,email: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="請輸入電子郵件"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        角色 <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={newUser.role}
                        onChange={(e)=> setNewUser(prev=> ({...prev,role: e.target.value,membershipType: e.target.value==='student' ? 'individual' : ''}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="student">學生</option>
                        <option value="instructor">教師</option>
                        <option value="admin">管理員</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">電話</label>
                      <input
                        type="tel"
                        value={newUser.phone}
                        onChange={(e)=> setNewUser(prev=> ({...prev,phone: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="09xxxxxxxx"
                      />
                    </div>
                  </div>
                </div>

                {/* 會員設定 */}
                {newUser.role==='student' && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <SafeIcon icon={FiBriefcase} className="mr-2 text-purple-600" />
                      會員設定
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          會員類型 <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={newUser.membershipType}
                          onChange={(e)=> setNewUser(prev=> ({...prev,membershipType: e.target.value}))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        >
                          <option value="">請選擇會員類型</option>
                          <option value="individual">個人會員</option>
                          <option value="corporate">企業會員</option>
                        </select>
                      </div>
                      {newUser.membershipType==='individual' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            會員方案 <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={newUser.membershipPlan}
                            onChange={(e)=> setNewUser(prev=> ({...prev,membershipPlan: e.target.value}))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          >
                            <option value="">請選擇方案</option>
                            <option value="monthly">月方案 (NT$ 4,500)</option>
                            <option value="quarterly">三個月方案 (NT$ 10,800)</option>
                            <option value="yearly">一年方案 (NT$ 36,000)</option>
                          </select>
                        </div>
                      )}
                      {newUser.membershipType==='corporate' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            企業 <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={newUser.companyId}
                            onChange={(e)=> {
                              const company=enterpriseAccounts.find(c=> c.id===parseInt(e.target.value));
                              setNewUser(prev=> ({
                                ...prev,
                                companyId: e.target.value,
                                companyName: company?.companyName || ''
                              }));
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          >
                            <option value="">請選擇企業</option>
                            {enterpriseAccounts.map(company=> (
                              <option key={company.id} value={company.id}>
                                {company.companyName}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      {newUser.membershipType && (
                        <div className="md:col-span-2">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={newUser.autoRenewal}
                              onChange={(e)=> setNewUser(prev=> ({...prev,autoRenewal: e.target.checked}))}
                              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <span className="text-sm font-medium text-gray-700">啟用自動續約</span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 角色特定資訊 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <SafeIcon icon={FiSettings} className="mr-2 text-green-600" />
                    {newUser.role==='student' ? '學習資訊' : newUser.role==='instructor' ? '教學資訊' : '管理資訊'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {newUser.role==='student' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">學習程度</label>
                        <select
                          value={newUser.level}
                          onChange={(e)=> setNewUser(prev=> ({...prev,level: e.target.value}))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">請選擇</option>
                          <option value="初級">初級</option>
                          <option value="中級">中級</option>
                          <option value="高級">高級</option>
                        </select>
                      </div>
                    )}
                    {newUser.role==='instructor' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">專業領域</label>
                          <input
                            type="text"
                            value={newUser.expertise}
                            onChange={(e)=> setNewUser(prev=> ({...prev,expertise: e.target.value}))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="例：商務華語、文法教學"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">教學經驗</label>
                          <input
                            type="text"
                            value={newUser.experience}
                            onChange={(e)=> setNewUser(prev=> ({...prev,experience: e.target.value}))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="例：5年教學經驗"
                          />
                        </div>
                      </>
                    )}
                    {(newUser.role==='instructor' || newUser.role==='admin') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">部門</label>
                        <input
                          type="text"
                          value={newUser.department}
                          onChange={(e)=> setNewUser(prev=> ({...prev,department: e.target.value}))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="例：語言教學部"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* 密碼設定 */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <SafeIcon icon={FiKey} className="mr-2 text-orange-600" />
                    密碼設定
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        密碼 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        value={newUser.password}
                        onChange={(e)=> setNewUser(prev=> ({...prev,password: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="至少6個字符"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        確認密碼 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        value={newUser.confirmPassword}
                        onChange={(e)=> setNewUser(prev=> ({...prev,confirmPassword: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="請再次輸入密碼"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6 border-t border-gray-200">
                  <motion.button
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 font-bold text-lg flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiSave} />
                    <span>新增用戶</span>
                  </motion.button>
                  <button
                    type="button"
                    onClick={()=> setShowAddUserModal(false)}
                    className="px-8 py-4 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
                  >
                    取消
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* 課程Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{opacity: 0,scale: 0.9}}
            animate={{opacity: 1,scale: 1}}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  {editingCourse ? '編輯課程' : '新增課程'}
                </h3>
                <button onClick={()=> setShowAddCourseModal(false)}>
                  <SafeIcon icon={FiX} className="text-white text-xl hover:bg-white/20 rounded-lg p-1 transition-colors" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={(e)=> {e.preventDefault();handleSaveCourse();}} className="space-y-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <SafeIcon icon={FiBook} className="mr-2 text-blue-600" />
                    基本資訊
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        課程名稱 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newCourse.title}
                        onChange={(e)=> setNewCourse(prev=> ({...prev,title: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="例：商務華語會話"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        授課教師 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newCourse.instructor}
                        onChange={(e)=> setNewCourse(prev=> ({...prev,instructor: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="例：張老師"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">課程類別</label>
                      <select
                        value={newCourse.category}
                        onChange={(e)=> setNewCourse(prev=> ({...prev,category: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">請選擇類別</option>
                        <option value="商務華語">商務華語</option>
                        <option value="華語文法">華語文法</option>
                        <option value="華語會話">華語會話</option>
                        <option value="華語寫作">華語寫作</option>
                        <option value="華語聽力">華語聽力</option>
                        <option value="華語閱讀">華語閱讀</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">課程等級</label>
                      <select
                        value={newCourse.level}
                        onChange={(e)=> setNewCourse(prev=> ({...prev,level: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">請選擇等級</option>
                        <option value="初級">初級</option>
                        <option value="中級">中級</option>
                        <option value="高級">高級</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <SafeIcon icon={FiClock} className="mr-2 text-purple-600" />
                    時間設定
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        開始時間 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        value={newCourse.startTime}
                        onChange={(e)=> setNewCourse(prev=> ({...prev,startTime: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        結束時間 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        value={newCourse.endTime}
                        onChange={(e)=> setNewCourse(prev=> ({...prev,endTime: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      上課星期 <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-7 gap-3">
                      {weekdayOptions.map((weekday)=> (
                        <motion.button
                          key={weekday.value}
                          type="button"
                          whileHover={{scale: 1.05}}
                          whileTap={{scale: 0.95}}
                          onClick={()=> handleWeekdayToggle(weekday.value)}
                          className={`py-3 px-4 text-sm font-bold rounded-xl border-2 transition-all duration-200 ${
                            newCourse.weekdays.includes(weekday.value)
                              ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/25'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-xs opacity-75">{weekday.label}</div>
                            <div className="text-lg">{weekday.short}</div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {generateScheduleText() && (
                    <motion.div
                      initial={{opacity: 0,y: 10}}
                      animate={{opacity: 1,y: 0}}
                      className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4"
                    >
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiCalendar} className="text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-800">預覽課程時間：</span>
                        <span className="text-sm font-bold text-emerald-700">{generateScheduleText()}</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <SafeIcon icon={FiCalendar} className="mr-2 text-orange-600" />
                    批次安排
                  </h4>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">選擇安排方式</label>
                    <div className="flex space-x-4 bg-white rounded-lg p-2 border border-orange-200">
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          value="dateRange"
                          checked={newCourse.batchType==='dateRange'}
                          onChange={(e)=> setNewCourse(prev=> ({...prev,batchType: e.target.value}))}
                          className="sr-only"
                        />
                        <div className={`text-center py-3 px-4 rounded-lg transition-all ${
                          newCourse.batchType==='dateRange'
                            ? 'bg-orange-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                          <SafeIcon icon={FiCalendar} className="mx-auto mb-1" />
                          <div className="text-sm font-medium">日期範圍</div>
                          <div className="text-xs opacity-75">設定開始與結束日期</div>
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          value="sessions"
                          checked={newCourse.batchType==='sessions'}
                          onChange={(e)=> setNewCourse(prev=> ({...prev,batchType: e.target.value}))}
                          className="sr-only"
                        />
                        <div className={`text-center py-3 px-4 rounded-lg transition-all ${
                          newCourse.batchType==='sessions'
                            ? 'bg-orange-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                          <SafeIcon icon={FiTarget} className="mx-auto mb-1" />
                          <div className="text-sm font-medium">次數安排</div>
                          <div className="text-xs opacity-75">設定總上課次數</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {newCourse.batchType==='dateRange' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          開始日期 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={newCourse.startDate}
                          onChange={(e)=> setNewCourse(prev=> ({...prev,startDate: e.target.value}))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          結束日期 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={newCourse.endDate}
                          onChange={(e)=> setNewCourse(prev=> ({...prev,endDate: e.target.value}))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          開始日期 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={newCourse.startDate}
                          onChange={(e)=> setNewCourse(prev=> ({...prev,startDate: e.target.value}))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          總次數 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={newCourse.totalSessions}
                          onChange={(e)=> setNewCourse(prev=> ({...prev,totalSessions: e.target.value}))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="例：12"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <SafeIcon icon={FiSettings} className="mr-2 text-green-600" />
                    其他設定
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">課程描述</label>
                      <textarea
                        rows="4"
                        value={newCourse.description}
                        onChange={(e)=> setNewCourse(prev=> ({...prev,description: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="請輸入課程詳細描述，包含學習目標、課程內容等..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        虛擬教室連結 <span className="text-gray-500 text-xs ml-2">(需以 http:// 或 https:// 開頭)</span>
                      </label>
                      <input
                        type="url"
                        value={newCourse.virtualClassroom}
                        onChange={(e)=> setNewCourse(prev=> ({...prev,virtualClassroom: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="https://meet.google.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        教材連結 <span className="text-gray-500 text-xs ml-2">(需以 http:// 或 https:// 開頭)</span>
                      </label>
                      <input
                        type="url"
                        value={newCourse.materials}
                        onChange={(e)=> setNewCourse(prev=> ({...prev,materials: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="https://drive.google.com/..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6 border-t border-gray-200">
                  <motion.button
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 font-bold text-lg flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiSave} />
                    <span>{editingCourse ? '更新課程' : '新增課程'}</span>
                  </motion.button>
                  <button
                    type="button"
                    onClick={()=> setShowAddCourseModal(false)}
                    className="px-8 py-4 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
                  >
                    取消
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;