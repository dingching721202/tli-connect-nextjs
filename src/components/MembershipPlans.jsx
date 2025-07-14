
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

const {
  FiCreditCard, FiCheck, FiUsers, FiBuilding, FiStar, FiCalendar, FiVideo, FiUserCheck, FiAward,
  FiTrendingUp, FiX
} = FiIcons;

const MembershipPlans = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planType, setPlanType] = useState('individual'); // 'individual' or 'corporate'
  const [corporateQuantity, setCorporateQuantity] = useState(5);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [corporateInfo, setCorporateInfo] = useState({
    companyName: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: ''
  });

  const individualPlans = [
    {
      id: 'quarterly',
      name: '三個月方案',
      duration: 3,
      price: 10800,
      originalPrice: 12000,
      popular: false,
      features: [
        '觀看所有學習影片',
        '參加線上團體課程',
        '免費預約課程',
        '參加活動及研討會',
        '專屬學習資源',
        '學習進度追蹤'
      ]
    },
    {
      id: 'yearly',
      name: '一年方案',
      duration: 12,
      price: 36000,
      originalPrice: 43200,
      popular: true,
      features: [
        '觀看所有學習影片',
        '參加線上團體課程',
        '免費預約課程',
        '參加活動及研討會',
        '專屬學習資源',
        '學習進度追蹤',
        '優先客服支援',
        '限定會員活動'
      ]
    }
  ];

  const calculateCorporatePrice = (quantity) => {
    const basePrice = 150000; // 5人基本價格
    const entryFee = 10000; // 入會費
    const additionalPrice = 26000; // 第6人以上單價
    const bulkPrice = 26000; // 10人以上單價

    if (quantity < 5) return 0;
    if (quantity === 5) return basePrice + entryFee;
    if (quantity >= 10) return (quantity * bulkPrice) + entryFee;
    
    // 6-9人
    const additionalMembers = quantity - 5;
    return basePrice + (additionalMembers * additionalPrice) + entryFee;
  };

  const formatPrice = (price) => {
    return `NT$ ${price.toLocaleString()}`;
  };

  const calculateSavings = (price, originalPrice) => {
    const savings = originalPrice - price;
    const percentage = Math.round((savings / originalPrice) * 100);
    return { savings, percentage };
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePurchase = () => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Validate corporate information if needed
    if (planType === 'corporate') {
      if (!corporateInfo.companyName || !corporateInfo.contactPerson || !corporateInfo.contactEmail) {
        alert('請填寫完整的企業資訊');
        return;
      }
    }

    let purchaseData;
    if (planType === 'individual' && selectedPlan) {
      purchaseData = {
        type: 'individual',
        plan: selectedPlan,
        price: selectedPlan.price,
        name: selectedPlan.name
      };
    } else if (planType === 'corporate') {
      purchaseData = {
        type: 'corporate',
        quantity: corporateQuantity,
        price: calculateCorporatePrice(corporateQuantity),
        name: '企業方案',
        corporateInfo: corporateInfo
      };
    }

    setPaymentData(purchaseData);
    setShowPaymentModal(true);
  };

  // Payment Modal Component
  const PaymentModal = () => {
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [cardData, setCardData] = useState({
      number: '',
      expiry: '',
      cvv: '',
      name: ''
    });

    const handlePaymentSubmit = (e) => {
      e.preventDefault();
      // Mock payment processing
      setTimeout(() => {
        setShowPaymentModal(false);
        alert(`🎉 購買成功！\n\n方案：${paymentData.name}\n金額：${formatPrice(paymentData.price)}\n\n會員資格已啟用，歡迎開始學習之旅！`);
        navigate('/dashboard');
      }, 2000);
      alert('💳 正在處理付款中...');
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-t-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">確認購買</h3>
              <button onClick={() => setShowPaymentModal(false)}>
                <SafeIcon icon={FiX} className="text-white" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">訂單摘要</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">方案</span>
                  <span className="font-medium">{paymentData.name}</span>
                </div>
                {paymentData.type === 'corporate' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">企業名稱</span>
                      <span className="font-medium truncate ml-2">{paymentData.corporateInfo.companyName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">人數</span>
                      <span className="font-medium">{paymentData.quantity} 人</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>總金額</span>
                  <span className="text-blue-600">{formatPrice(paymentData.price)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">付款方式</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="credit_card"
                    checked={paymentMethod === 'credit_card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span>信用卡 / 金融卡</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="bank_transfer"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span>銀行轉帳</span>
                </label>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              {paymentMethod === 'credit_card' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">持卡人姓名</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">卡號</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.number}
                      onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">到期日</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'bank_transfer' && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">銀行轉帳資訊</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>銀行：台灣銀行</p>
                    <p>戶名：TLI Connect 語言學習中心</p>
                    <p>帳號：123-456-789012</p>
                    <p className="text-red-600 font-medium mt-2">
                      請於轉帳後聯繫客服確認付款：02-1234-5678
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium"
                >
                  {paymentMethod === 'credit_card' ? '立即付款' : '確認轉帳'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  取消
                </button>
              </div>
            </form>

            <div className="mt-4 text-xs text-gray-500 text-center">
              🔒 您的付款資訊將被安全加密處理
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      {/* Header - 手機優化 */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          選擇會員方案
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          加入 TLI Connect 會員，享受完整學習體驗，包含影片學習、線上課程、活動參與等豐富內容
        </p>
      </motion.div>

      {/* Plan Type Selector - 手機優化 */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-100/60 w-full max-w-md">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPlanType('individual')}
            className={`w-1/2 px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              planType === 'individual' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <SafeIcon icon={FiUsers} className="inline mr-2" />
            <span className="hidden sm:inline">個人方案</span>
            <span className="sm:hidden">個人</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPlanType('corporate')}
            className={`w-1/2 px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              planType === 'corporate' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <SafeIcon icon={FiBuilding} className="inline mr-2" />
            <span className="hidden sm:inline">企業方案</span>
            <span className="sm:hidden">企業</span>
          </motion.button>
        </div>
      </div>

      {/* Individual Plans - 手機優化 */}
      {planType === 'individual' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12">
          {individualPlans.map((plan) => {
            const { savings, percentage } = calculateSavings(plan.price, plan.originalPrice);
            const isSelected = selectedPlan?.id === plan.id;

            return (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => handleSelectPlan(plan)}
                className={`relative bg-white rounded-2xl shadow-xl border-2 cursor-pointer transition-all duration-300 ${
                  isSelected ? 'border-blue-500 shadow-blue-500/20' : 'border-gray-100 hover:border-blue-300'
                } ${plan.popular ? 'ring-2 ring-blue-500/20' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                      <SafeIcon icon={FiStar} className="mr-1" />
                      最受歡迎
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(plan.originalPrice)}
                      </span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                        省 {percentage}%
                      </span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-1">
                      {formatPrice(plan.price)}
                    </div>
                    <div className="text-gray-500 text-sm">
                      約 {formatPrice(Math.round(plan.price / plan.duration))} / 月
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {plan.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 sm:py-4 px-6 rounded-xl font-bold transition-all duration-300 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {isSelected ? '已選擇' : '選擇方案'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Corporate Plan - 手機優化 */}
      {planType === 'corporate' && (
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100/60 p-6 sm:p-8"
          >
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiBuilding} className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">企業會員方案</h3>
              <p className="text-gray-600">為您的企業提供完整的學習解決方案</p>
            </div>

            {/* Corporate Information - 手機優化 */}
            <div className="mb-6 sm:mb-8 space-y-4">
              <h4 className="font-semibold text-gray-900 mb-4">企業資訊</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">企業名稱 *</label>
                  <input
                    type="text"
                    value={corporateInfo.companyName}
                    onChange={(e) => setCorporateInfo(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="請輸入企業名稱"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">聯絡人 *</label>
                  <input
                    type="text"
                    value={corporateInfo.contactPerson}
                    onChange={(e) => setCorporateInfo(prev => ({ ...prev, contactPerson: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="請輸入聯絡人姓名"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">聯絡信箱 *</label>
                  <input
                    type="email"
                    value={corporateInfo.contactEmail}
                    onChange={(e) => setCorporateInfo(prev => ({ ...prev, contactEmail: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="請輸入聯絡信箱"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">聯絡電話</label>
                  <input
                    type="tel"
                    value={corporateInfo.contactPhone}
                    onChange={(e) => setCorporateInfo(prev => ({ ...prev, contactPhone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="請輸入聯絡電話"
                  />
                </div>
              </div>
            </div>

            {/* Quantity Selector - 手機優化 */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                選擇人數 (最少 5 人)
              </label>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCorporateQuantity(Math.max(5, corporateQuantity - 1))}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-700"
                >
                  -
                </motion.button>
                <div className="flex-1 text-center">
                  <input
                    type="number"
                    min="5"
                    value={corporateQuantity}
                    onChange={(e) => setCorporateQuantity(Math.max(5, parseInt(e.target.value) || 5))}
                    className="w-full text-center text-xl sm:text-2xl font-bold py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">位員工</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCorporateQuantity(corporateQuantity + 1)}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-700"
                >
                  +
                </motion.button>
              </div>
            </div>

            {/* Pricing Breakdown - 手機優化 */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">價格明細</h4>
              <div className="space-y-3">
                {corporateQuantity >= 10 ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">{corporateQuantity} 位員工 × NT$ 26,000</span>
                      <span className="font-medium">{formatPrice(corporateQuantity * 26000)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">入會費</span>
                      <span className="font-medium">{formatPrice(10000)}</span>
                    </div>
                  </>
                ) : corporateQuantity > 5 ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">基本 5 人方案</span>
                      <span className="font-medium">{formatPrice(150000)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">額外 {corporateQuantity - 5} 人 × NT$ 26,000</span>
                      <span className="font-medium">{formatPrice((corporateQuantity - 5) * 26000)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">入會費</span>
                      <span className="font-medium">{formatPrice(10000)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">基本 5 人方案</span>
                      <span className="font-medium">{formatPrice(150000)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">入會費</span>
                      <span className="font-medium">{formatPrice(10000)}</span>
                    </div>
                  </>
                )}
                <hr className="border-gray-300" />
                <div className="flex justify-between items-center text-lg font-bold text-blue-600">
                  <span>總計</span>
                  <span>{formatPrice(calculateCorporatePrice(corporateQuantity))}</span>
                </div>
              </div>
            </div>

            {/* Corporate Features - 手機優化 */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {[
                '所有個人方案功能',
                '企業專屬管理後台',
                '員工學習進度追蹤',
                '客製化企業課程',
                '專屬企業活動',
                '優先技術支援',
                '批量帳號管理',
                '學習成效報表'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Purchase Button - 手機優化 */}
      {((planType === 'individual' && selectedPlan) || planType === 'corporate') && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePurchase}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-8 sm:px-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto text-sm sm:text-lg"
          >
            <SafeIcon icon={FiCreditCard} className="text-lg sm:text-xl" />
            <span>
              {planType === 'individual'
                ? `購買 ${selectedPlan?.name} - ${formatPrice(selectedPlan?.price)}`
                : `購買企業方案 - ${formatPrice(calculateCorporatePrice(corporateQuantity))}`
              }
            </span>
          </motion.button>
          <p className="text-xs sm:text-sm text-gray-500 mt-4">
            🔒 安全付款 • 💯 滿意保證 • 📞 24/7 客服支援
          </p>
        </motion.div>
      )}

      {/* Benefits Section - 手機優化 */}
      <div className="mt-12 sm:mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6 sm:mb-8">會員專屬權益</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: FiVideo, title: '學習影片', desc: '無限觀看所有課程影片' },
            { icon: FiUsers, title: '線上課程', desc: '參加即時線上團體課程' },
            { icon: FiCalendar, title: '免費預約', desc: '免費預約所有課程活動' },
            { icon: FiAward, title: '專屬活動', desc: '參加會員限定活動' }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -4 }}
              className="text-center bg-white rounded-xl p-4 sm:p-6 shadow-md"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <SafeIcon icon={benefit.icon} className="text-blue-600 text-lg sm:text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{benefit.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && <PaymentModal />}
    </div>
  );
};

export default MembershipPlans;