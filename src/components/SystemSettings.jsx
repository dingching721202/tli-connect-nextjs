import React,{useState} from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import {useAuth} from '../contexts/AuthContext';

const {FiSettings,FiSave,FiRotateCcw,FiClock,FiCalendar,FiUser,FiUserCheck,FiShield,FiAlertTriangle,FiCheck,FiEdit2,FiTrash2,FiPlus,FiX,FiInfo,FiBell,FiMail,FiMessageSquare,FiToggleLeft,FiToggleRight,FiRefreshCw,FiCopy,FiDownload,FiUpload}=FiIcons;

const SystemSettings=()=> {
  const {user}=useAuth();
  
  // 系統設定狀態
  const [settings,setSettings]=useState({
    // 課程預約設定
    courseBooking: {
      studentJoinHours: 2, // 學生可在課程開始前幾小時加入教室
      maxAdvanceBookingDays: 30, // 學生最多可提前幾天預約課程
      minAdvanceBookingHours: 1, // 學生最少提前幾小時預約課程（新增）
      cancelHours: 24, // 學生可在課程開始前幾小時取消
      autoConfirmBooking: true, // 自動確認預約
      waitingListEnabled: true, // 啟用候補名單
      maxWaitingList: 10, // 候補名單最大人數
      allowSameDayBooking: false // 是否允許當日預約（新增）
    },
    
    // 教師請假設定
    teacherLeave: {
      minAdvanceHours: 48, // 教師最少提前幾小時申請請假
      maxAdvanceHours: 720, // 教師最多提前幾小時申請請假（30天，新增）
      maxLeaveDays: 14, // 單次請假最多天數
      autoApprovalEnabled: true, // 啟用自動審核
      autoApprovalHours: 72, // 提前超過幾小時自動審核通過
      substituteRequired: true, // 是否需要安排代課
      notifyStudentsHours: 12, // 提前幾小時通知學生
      emergencyLeaveHours: 6 // 緊急請假可在幾小時內申請（新增）
    },
    
    // 自動審核條件設定
    autoApproval: {
      enabled: true, // 啟用自動審核
      adminResponseHours: 24, // 管理員多久前設定自動審核（超過此時間未處理則自動審核）
      defaultAction: 'approve', // 預設動作：approve(通過) / reject(拒絕) / manual(人工審核)
      conditions: [
        {
          id: 1,
          name: '緊急情況',
          description: '醫療緊急情況或家庭緊急事件',
          autoApprove: true,
          keywords: ['緊急','醫療','住院','急診','家庭緊急','突發'],
          maxAdvanceHours: 6, // 此條件適用於提前6小時內的申請
          minAdvanceHours: 0, // 最少提前時間（新增）
          enabled: true,
          priority: 1 // 優先級（新增）
        },
        {
          id: 2,
          name: '健康因素',
          description: '身體不適、感冒發燒等健康問題',
          autoApprove: true,
          keywords: ['感冒','發燒','身體不適','病假','看醫生','頭痛','咳嗽'],
          maxAdvanceHours: 24,
          minAdvanceHours: 1,
          enabled: true,
          priority: 2
        },
        {
          id: 3,
          name: '事先規劃',
          description: '提前規劃的個人事務或會議',
          autoApprove: false,
          keywords: ['會議','出差','個人事務','家庭活動','培訓','研習'],
          maxAdvanceHours: 720, // 30天
          minAdvanceHours: 48,
          enabled: true,
          priority: 3
        },
        {
          id: 4,
          name: '交通問題',
          description: '交通意外或交通工具故障等',
          autoApprove: true,
          keywords: ['交通','車禍','故障','塞車','誤點','班機'],
          maxAdvanceHours: 12,
          minAdvanceHours: 0,
          enabled: true,
          priority: 2
        }
      ]
    },
    
    // 會員通知設定
    membershipNotification: {
      expiryNotificationDays: [30,14,7,3,1], // 到期前幾天發送通知
      autoRenewalDays: 7, // 自動續約前幾天處理
      emailEnabled: true, // 啟用郵件通知
      smsEnabled: false, // 啟用簡訊通知
      inAppEnabled: true, // 啟用應用內通知
      reminderFrequency: 'daily', // 提醒頻率：daily,weekly
      gracePeriodDays: 7, // 到期後寬限期天數
      expiringSoonDays: 14, // 幾天內算即將到期（新增）
      notificationTime: '09:00' // 通知發送時間（新增）
    },
    
    // 系統維護設定
    systemMaintenance: {
      maintenanceMode: false, // 維護模式
      maintenanceMessage: '系統維護中，預計於今晚12點完成', // 維護訊息
      allowedRoles: ['admin'], // 維護期間允許訪問的角色
      scheduledMaintenance: null, // 排程維護時間
      backupFrequency: 'daily', // 備份頻率
      logRetentionDays: 30, // 日誌保留天數
      maintenanceNotificationHours: 24 // 維護前幾小時發送通知（新增）
    },
    
    // 通知模板設定
    notificationTemplates: {
      membershipExpiry: {
        subject: '會員即將到期提醒',
        content: '親愛的 {name}，您的會員資格將於 {days} 天後到期，請及時續約以繼續享受服務。',
        enabled: true
      },
      courseReminder: {
        subject: '課程提醒',
        content: '親愛的 {name}，您預約的課程「{course}」將於 {time} 開始，請準時參加。',
        enabled: true
      },
      leaveApproval: {
        subject: '請假申請審核結果',
        content: '您的請假申請已{status}，{details}',
        enabled: true
      },
      courseBookingConfirm: {
        subject: '課程預約確認',
        content: '親愛的 {name}，您已成功預約課程「{course}」，時間：{time}。',
        enabled: true
      }
    }
  });

  const [editingCondition,setEditingCondition]=useState(null);
  const [showAddConditionModal,setShowAddConditionModal]=useState(false);
  const [newCondition,setNewCondition]=useState({
    name: '',
    description: '',
    autoApprove: true,
    keywords: [],
    maxAdvanceHours: 24,
    minAdvanceHours: 1,
    enabled: true,
    priority: 3
  });
  const [keywordInput,setKeywordInput]=useState('');
  const [hasUnsavedChanges,setHasUnsavedChanges]=useState(false);

  // 更新設定函數
  const updateSetting=(section,key,value)=> {
    setSettings(prev=> ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  // 更新陣列設定
  const updateArraySetting=(section,key,value)=> {
    setSettings(prev=> ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  // 儲存設定
  const handleSaveSettings=()=> {
    // 這裡應該呼叫 API 儲存設定
    alert('✅ 系統設定已成功儲存！');
    setHasUnsavedChanges(false);
  };

  // 重置設定
  const handleResetSettings=()=> {
    if (confirm('⚠️ 確定要重置所有設定為預設值嗎？此操作無法復原。')) {
      // 重置為預設值
      setHasUnsavedChanges(false);
      alert('✅ 設定已重置為預設值！');
    }
  };

  // 新增審核條件
  const handleAddCondition=()=> {
    if (!newCondition.name.trim() || !newCondition.description.trim()) {
      alert('請填寫完整的條件名稱和描述');
      return;
    }

    if (newCondition.minAdvanceHours >= newCondition.maxAdvanceHours) {
      alert('最大提前時間必須大於最少提前時間');
      return;
    }

    const conditionData={
      id: Math.max(...settings.autoApproval.conditions.map(c=> c.id),0) + 1,
      ...newCondition,
      keywords: newCondition.keywords.filter(k=> k.trim() !=='')
    };

    setSettings(prev=> ({
      ...prev,
      autoApproval: {
        ...prev.autoApproval,
        conditions: [...prev.autoApproval.conditions,conditionData]
      }
    }));

    setNewCondition({
      name: '',
      description: '',
      autoApprove: true,
      keywords: [],
      maxAdvanceHours: 24,
      minAdvanceHours: 1,
      enabled: true,
      priority: 3
    });
    setShowAddConditionModal(false);
    setHasUnsavedChanges(true);
    alert('✅ 審核條件已新增！');
  };

  // 刪除審核條件
  const handleDeleteCondition=(conditionId)=> {
    if (confirm('確定要刪除此審核條件嗎？')) {
      setSettings(prev=> ({
        ...prev,
        autoApproval: {
          ...prev.autoApproval,
          conditions: prev.autoApproval.conditions.filter(c=> c.id !==conditionId)
        }
      }));
      setHasUnsavedChanges(true);
      alert('✅ 審核條件已刪除！');
    }
  };

  // 更新審核條件
  const handleUpdateCondition=(conditionId,updates)=> {
    setSettings(prev=> ({
      ...prev,
      autoApproval: {
        ...prev.autoApproval,
        conditions: prev.autoApproval.conditions.map(c=>
          c.id===conditionId ? {...c,...updates} : c
        )
      }
    }));
    setHasUnsavedChanges(true);
  };

  // 新增關鍵字
  const handleAddKeyword=()=> {
    if (keywordInput.trim() && !newCondition.keywords.includes(keywordInput.trim())) {
      setNewCondition(prev=> ({
        ...prev,
        keywords: [...prev.keywords,keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  // 移除關鍵字
  const handleRemoveKeyword=(keyword)=> {
    setNewCondition(prev=> ({
      ...prev,
      keywords: prev.keywords.filter(k=> k !==keyword)
    }));
  };

  // 匯出設定
  const handleExportSettings=()=> {
    const settingsJson=JSON.stringify(settings,null,2);
    const blob=new Blob([settingsJson],{type: 'application/json'});
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');
    link.href=url;
    link.download=`system-settings-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    alert('✅ 設定檔已匯出！');
  };

  // 匯入設定
  const handleImportSettings=(event)=> {
    const file=event.target.files[0];
    if (file) {
      const reader=new FileReader();
      reader.onload=(e)=> {
        try {
          const importedSettings=JSON.parse(e.target.result);
          setSettings(importedSettings);
          setHasUnsavedChanges(true);
          alert('✅ 設定檔已匯入！請記得儲存設定。');
        } catch (error) {
          alert('❌ 無效的設定檔格式！');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">系統設定</h2>
          <p className="text-gray-600 mt-1">配置系統參數和行為規則</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            onClick={handleExportSettings}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <SafeIcon icon={FiDownload} className="text-sm" />
            <span>匯出設定</span>
          </motion.button>
          <label className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
            <SafeIcon icon={FiUpload} className="text-sm" />
            <span>匯入設定</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportSettings}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* 未儲存變更提醒 */}
      {hasUnsavedChanges && (
        <motion.div
          initial={{opacity: 0,y: -10}}
          animate={{opacity: 1,y: 0}}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiAlertTriangle} className="text-yellow-600" />
            <span className="text-yellow-800">您有未儲存的變更</span>
          </div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
              onClick={handleSaveSettings}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
            >
              立即儲存
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* 課程預約設定 */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <SafeIcon icon={FiCalendar} className="mr-2 text-blue-600" />
          課程預約設定
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              學生可提前加入教室時間（小時）
            </label>
            <input
              type="number"
              min="0"
              max="24"
              value={settings.courseBooking.studentJoinHours}
              onChange={(e)=> updateSetting('courseBooking','studentJoinHours',parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">學生可在課程開始前幾小時進入教室</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              學生最多提前預約天數
            </label>
            <input
              type="number"
              min="1"
              max="90"
              value={settings.courseBooking.maxAdvanceBookingDays}
              onChange={(e)=> updateSetting('courseBooking','maxAdvanceBookingDays',parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">學生最多可提前幾天預約課程</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              學生最少提前預約時間（小時）
            </label>
            <input
              type="number"
              min="0"
              max="48"
              value={settings.courseBooking.minAdvanceBookingHours}
              onChange={(e)=> updateSetting('courseBooking','minAdvanceBookingHours',parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">學生最少提前幾小時預約課程</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              取消預約時限（小時）
            </label>
            <input
              type="number"
              min="1"
              max="72"
              value={settings.courseBooking.cancelHours}
              onChange={(e)=> updateSetting('courseBooking','cancelHours',parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">學生可在課程開始前幾小時取消</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              候補名單人數上限
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={settings.courseBooking.maxWaitingList}
              onChange={(e)=> updateSetting('courseBooking','maxWaitingList',parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">每堂課的候補名單最大人數</p>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              onClick={()=> updateSetting('courseBooking','autoConfirmBooking',!settings.courseBooking.autoConfirmBooking)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                settings.courseBooking.autoConfirmBooking
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <SafeIcon icon={settings.courseBooking.autoConfirmBooking ? FiToggleRight : FiToggleLeft} />
              <span className="text-sm font-medium">自動確認預約</span>
            </motion.button>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              onClick={()=> updateSetting('courseBooking','waitingListEnabled',!settings.courseBooking.waitingListEnabled)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                settings.courseBooking.waitingListEnabled
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <SafeIcon icon={settings.courseBooking.waitingListEnabled ? FiToggleRight : FiToggleLeft} />
              <span className="text-sm font-medium">啟用候補名單</span>
            </motion.button>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              onClick={()=> updateSetting('courseBooking','allowSameDayBooking',!settings.courseBooking.allowSameDayBooking)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                settings.courseBooking.allowSameDayBooking
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <SafeIcon icon={settings.courseBooking.allowSameDayBooking ? FiToggleRight : FiToggleLeft} />
              <span className="text-sm font-medium">允許當日預約</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* 教師請假設定 */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <SafeIcon icon={FiUserCheck} className="mr-2 text-green-600" />
          教師請假設定
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              教師最少提前申請時間（小時）
            </label>
            <input
              type="number"
              min="1"
              max="168"
              value={settings.teacherLeave.minAdvanceHours}
              onChange={(e)=> updateSetting('teacherLeave','minAdvanceHours',parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">教師最少提前幾小時申請請假</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              教師最多提前申請時間（小時）
            </label>
            <input
              type="number"
              min="24"
              max="8760"
              value={settings.teacherLeave.maxAdvanceHours}
              onChange={(e)=> updateSetting('teacherLeave','maxAdvanceHours',parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">教師最多提前幾小時申請請假（720=30天）</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              單次請假最多天數
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={settings.teacherLeave.maxLeaveDays}
              onChange={(e)=> updateSetting('teacherLeave','maxLeaveDays',parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">單次請假申請的最大天數</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              自動審核通過時限（小時）
            </label>
            <input
              type="number"
              min="24"
              max="168"
              value={settings.teacherLeave.autoApprovalHours}
              onChange={(e)=> updateSetting('teacherLeave','autoApprovalHours',parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">提前超過此時間自動審核通過</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              通知學生時限（小時）
            </label>
            <input
              type="number"
              min="1"
              max="48"
              value={settings.teacherLeave.notifyStudentsHours}
              onChange={(e)=> updateSetting('teacherLeave','notifyStudentsHours',parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">提前幾小時通知學生課程異動</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              緊急請假時限（小時）
            </label>
            <input
              type="number"
              min="1"
              max="24"
              value={settings.teacherLeave.emergencyLeaveHours}
              onChange={(e)=> updateSetting('teacherLeave','emergencyLeaveHours',parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">緊急請假可在幾小時內申請</p>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              onClick={()=> updateSetting('teacherLeave','autoApprovalEnabled',!settings.teacherLeave.autoApprovalEnabled)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                settings.teacherLeave.autoApprovalEnabled
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <SafeIcon icon={settings.teacherLeave.autoApprovalEnabled ? FiToggleRight : FiToggleLeft} />
              <span className="text-sm font-medium">啟用自動審核</span>
            </motion.button>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              onClick={()=> updateSetting('teacherLeave','substituteRequired',!settings.teacherLeave.substituteRequired)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                settings.teacherLeave.substituteRequired
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <SafeIcon icon={settings.teacherLeave.substituteRequired ? FiToggleRight : FiToggleLeft} />
              <span className="text-sm font-medium">需要安排代課</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* 自動審核條件設定 */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <SafeIcon icon={FiShield} className="mr-2 text-purple-600" />
            自動審核條件設定
          </h3>
          <motion.button
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            onClick={()=> setShowAddConditionModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <SafeIcon icon={FiPlus} className="text-sm" />
            <span>新增條件</span>
          </motion.button>
        </div>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              onClick={()=> updateSetting('autoApproval','enabled',!settings.autoApproval.enabled)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                settings.autoApproval.enabled
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <SafeIcon icon={settings.autoApproval.enabled ? FiToggleRight : FiToggleLeft} />
              <span className="text-sm font-medium">啟用自動審核</span>
            </motion.button>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">管理員響應時限：</label>
            <input
              type="number"
              min="1"
              max="72"
              value={settings.autoApproval.adminResponseHours}
              onChange={(e)=> updateSetting('autoApproval','adminResponseHours',parseInt(e.target.value))}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-600">小時</span>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">預設動作：</label>
            <select
              value={settings.autoApproval.defaultAction}
              onChange={(e)=> updateSetting('autoApproval','defaultAction',e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="approve">自動通過</option>
              <option value="reject">自動拒絕</option>
              <option value="manual">人工審核</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {settings.autoApproval.conditions
            .sort((a,b)=> a.priority - b.priority)
            .map((condition)=> (
            <motion.div
              key={condition.id}
              initial={{opacity: 0,y: 10}}
              animate={{opacity: 1,y: 0}}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{condition.name}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      condition.autoApprove
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {condition.autoApprove ? '自動通過' : '需要審核'}
                    </span>
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      優先級 {condition.priority}
                    </span>
                    <motion.button
                      whileHover={{scale: 1.05}}
                      whileTap={{scale: 0.95}}
                      onClick={()=> handleUpdateCondition(condition.id,{enabled: !condition.enabled})}
                      className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                        condition.enabled
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <SafeIcon icon={condition.enabled ? FiToggleRight : FiToggleLeft} className="text-xs" />
                      <span>{condition.enabled ? '啟用' : '停用'}</span>
                    </motion.button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{condition.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {condition.keywords.map((keyword,index)=> (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500">
                    <p>適用時間範圍：{condition.minAdvanceHours}-{condition.maxAdvanceHours} 小時前</p>
                    <p>優先級：{condition.priority}（數字越小優先級越高）</p>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <motion.button
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    onClick={()=> setEditingCondition(condition)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <SafeIcon icon={FiEdit2} className="text-sm" />
                  </motion.button>
                  <motion.button
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    onClick={()=> handleDeleteCondition(condition.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <SafeIcon icon={FiTrash2} className="text-sm" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 會員通知設定 */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <SafeIcon icon={FiBell} className="mr-2 text-orange-600" />
          會員通知設定
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              會員到期前通知天數（多選）
            </label>
            <div className="space-y-2">
              {[30,14,7,3,1].map(days=> (
                <label key={days} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.membershipNotification.expiryNotificationDays.includes(days)}
                    onChange={(e)=> {
                      const currentDays=settings.membershipNotification.expiryNotificationDays;
                      const newDays=e.target.checked
                        ? [...currentDays,days].sort((a,b)=> b-a)
                        : currentDays.filter(d=> d !==days);
                      updateSetting('membershipNotification','expiryNotificationDays',newDays);
                    }}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">到期前 {days} 天</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                自動續約處理天數
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={settings.membershipNotification.autoRenewalDays}
                onChange={(e)=> updateSetting('membershipNotification','autoRenewalDays',parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">自動續約前幾天開始處理</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                到期寬限期（天）
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={settings.membershipNotification.gracePeriodDays}
                onChange={(e)=> updateSetting('membershipNotification','gracePeriodDays',parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">會員到期後的寬限期天數</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                即將到期定義（天）
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={settings.membershipNotification.expiringSoonDays}
                onChange={(e)=> updateSetting('membershipNotification','expiringSoonDays',parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">幾天內到期算作即將到期</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">提醒頻率</label>
              <select
                value={settings.membershipNotification.reminderFrequency}
                onChange={(e)=> updateSetting('membershipNotification','reminderFrequency',e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="daily">每日</option>
                <option value="weekly">每週</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">通知發送時間</label>
              <input
                type="time"
                value={settings.membershipNotification.notificationTime}
                onChange={(e)=> updateSetting('membershipNotification','notificationTime',e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">每日發送通知的時間</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">通知方式</label>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={()=> updateSetting('membershipNotification','emailEnabled',!settings.membershipNotification.emailEnabled)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  settings.membershipNotification.emailEnabled
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <SafeIcon icon={FiMail} className="text-sm" />
                <span className="text-sm font-medium">郵件通知</span>
                <SafeIcon icon={settings.membershipNotification.emailEnabled ? FiToggleRight : FiToggleLeft} />
              </motion.button>

              <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={()=> updateSetting('membershipNotification','smsEnabled',!settings.membershipNotification.smsEnabled)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  settings.membershipNotification.smsEnabled
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <SafeIcon icon={FiMessageSquare} className="text-sm" />
                <span className="text-sm font-medium">簡訊通知</span>
                <SafeIcon icon={settings.membershipNotification.smsEnabled ? FiToggleRight : FiToggleLeft} />
              </motion.button>

              <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={()=> updateSetting('membershipNotification','inAppEnabled',!settings.membershipNotification.inAppEnabled)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  settings.membershipNotification.inAppEnabled
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <SafeIcon icon={FiBell} className="text-sm" />
                <span className="text-sm font-medium">應用內通知</span>
                <SafeIcon icon={settings.membershipNotification.inAppEnabled ? FiToggleRight : FiToggleLeft} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* 系統維護設定 */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <SafeIcon icon={FiSettings} className="mr-2 text-red-600" />
          系統維護設定
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={()=> updateSetting('systemMaintenance','maintenanceMode',!settings.systemMaintenance.maintenanceMode)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  settings.systemMaintenance.maintenanceMode
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <SafeIcon icon={settings.systemMaintenance.maintenanceMode ? FiToggleRight : FiToggleLeft} />
                <span className="text-sm font-medium">維護模式</span>
              </motion.button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">維護訊息</label>
              <textarea
                rows="3"
                value={settings.systemMaintenance.maintenanceMessage}
                onChange={(e)=> updateSetting('systemMaintenance','maintenanceMessage',e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="維護期間顯示給用戶的訊息..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">備份頻率</label>
              <select
                value={settings.systemMaintenance.backupFrequency}
                onChange={(e)=> updateSetting('systemMaintenance','backupFrequency',e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="daily">每日</option>
                <option value="weekly">每週</option>
                <option value="monthly">每月</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                維護前通知時間（小時）
              </label>
              <input
                type="number"
                min="1"
                max="72"
                value={settings.systemMaintenance.maintenanceNotificationHours}
                onChange={(e)=> updateSetting('systemMaintenance','maintenanceNotificationHours',parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
              <p className="text-xs text-gray-500 mt-1">維護前幾小時發送通知</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">日誌保留天數</label>
              <input
                type="number"
                min="7"
                max="365"
                value={settings.systemMaintenance.logRetentionDays}
                onChange={(e)=> updateSetting('systemMaintenance','logRetentionDays',parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
              <p className="text-xs text-gray-500 mt-1">系統日誌保留天數</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">維護期間允許角色</label>
              <div className="space-y-2">
                {['admin','instructor','student'].map(role=> (
                  <label key={role} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.systemMaintenance.allowedRoles.includes(role)}
                      onChange={(e)=> {
                        const currentRoles=settings.systemMaintenance.allowedRoles;
                        const newRoles=e.target.checked
                          ? [...currentRoles,role]
                          : currentRoles.filter(r=> r !==role);
                        updateSetting('systemMaintenance','allowedRoles',newRoles);
                      }}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">
                      {role==='admin' ? '管理員' : role==='instructor' ? '教師' : '學生'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 操作按鈕 */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <motion.button
          whileHover={{scale: 1.02}}
          whileTap={{scale: 0.98}}
          onClick={handleResetSettings}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          <SafeIcon icon={FiRotateCcw} className="text-sm" />
          <span>重置為預設值</span>
        </motion.button>

        <motion.button
          whileHover={{scale: 1.02}}
          whileTap={{scale: 0.98}}
          onClick={handleSaveSettings}
          disabled={!hasUnsavedChanges}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
            hasUnsavedChanges
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <SafeIcon icon={FiSave} />
          <span>儲存設定</span>
        </motion.button>
      </div>

      {/* 新增審核條件 Modal */}
      {showAddConditionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{opacity: 0,scale: 0.9}}
            animate={{opacity: 1,scale: 1}}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">新增審核條件</h3>
                <button onClick={()=> setShowAddConditionModal(false)}>
                  <SafeIcon icon={FiX} className="text-white text-xl" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  條件名稱 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCondition.name}
                  onChange={(e)=> setNewCondition(prev=> ({...prev,name: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="例：緊急情況"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  條件描述 <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="2"
                  value={newCondition.description}
                  onChange={(e)=> setNewCondition(prev=> ({...prev,description: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="詳細描述此審核條件的適用情況..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">最少提前時間（小時）</label>
                  <input
                    type="number"
                    min="0"
                    max="8760"
                    value={newCondition.minAdvanceHours}
                    onChange={(e)=> setNewCondition(prev=> ({...prev,minAdvanceHours: parseInt(e.target.value)}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">最大提前時間（小時）</label>
                  <input
                    type="number"
                    min="1"
                    max="8760"
                    value={newCondition.maxAdvanceHours}
                    onChange={(e)=> setNewCondition(prev=> ({...prev,maxAdvanceHours: parseInt(e.target.value)}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">優先級</label>
                  <select
                    value={newCondition.priority}
                    onChange={(e)=> setNewCondition(prev=> ({...prev,priority: parseInt(e.target.value)}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={1}>1 (最高)</option>
                    <option value={2}>2 (高)</option>
                    <option value={3}>3 (中)</option>
                    <option value={4}>4 (低)</option>
                    <option value={5}>5 (最低)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">關鍵字</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e)=> setKeywordInput(e.target.value)}
                    onKeyPress={(e)=> e.key==='Enter' && handleAddKeyword()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="輸入關鍵字後按 Enter"
                  />
                  <motion.button
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    onClick={handleAddKeyword}
                    className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    新增
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newCondition.keywords.map((keyword,index)=> (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs"
                    >
                      <span>{keyword}</span>
                      <button onClick={()=> handleRemoveKeyword(keyword)}>
                        <SafeIcon icon={FiX} className="text-xs" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  onClick={()=> setNewCondition(prev=> ({...prev,autoApprove: !prev.autoApprove}))}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    newCondition.autoApprove
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  <SafeIcon icon={newCondition.autoApprove ? FiCheck : FiClock} />
                  <span className="text-sm font-medium">
                    {newCondition.autoApprove ? '自動通過' : '需要審核'}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  onClick={()=> setNewCondition(prev=> ({...prev,enabled: !prev.enabled}))}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    newCondition.enabled
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <SafeIcon icon={newCondition.enabled ? FiToggleRight : FiToggleLeft} />
                  <span className="text-sm font-medium">
                    {newCondition.enabled ? '啟用' : '停用'}
                  </span>
                </motion.button>
              </div>

              <div className="flex space-x-3 pt-4">
                <motion.button
                  whileHover={{scale: 1.02}}
                  whileTap={{scale: 0.98}}
                  onClick={handleAddCondition}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 font-bold"
                >
                  新增條件
                </motion.button>
                <button
                  onClick={()=> setShowAddConditionModal(false)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  取消
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SystemSettings;