
import React, { useState, useEffect } from 'react';
import Sidebar, { TabType } from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FeeTable from './components/FeeTable';
import FeeModal from './components/FeeModal';
import ResidentList from './components/ResidentList';
import NotificationList from './components/NotificationList';
import ActivityManagement from './components/ActivityManagement';
import ManagementBoard from './components/ManagementBoard';
import TechnicalService from './components/TechnicalService';
import FeedbackBox from './components/FeedbackBox';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import { FeeItem, Resident, AppNotification, PaymentStatus } from './types';
import { LocalDB } from './services/db';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const [fees, setFees] = useState<FeeItem[]>([]);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeeItem | null>(null);

  useEffect(() => {
    setFees(LocalDB.getFees());
    setResidents(LocalDB.getResidents());
    setNotifications(LocalDB.getNotifications());
    
    // Load theme
    const savedTheme = localStorage.getItem('app-theme') as 'light' | 'dark';
    if (savedTheme) setTheme(savedTheme);

    // Check auth
    if (LocalDB.getCurrentUser()) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  if (!isLoggedIn) {
    return <AuthPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const handleLogout = () => {
    LocalDB.setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleSaveFee = (updatedFee: FeeItem) => {
    let newFees;
    if (selectedFee) {
      newFees = fees.map(f => f.id === updatedFee.id ? updatedFee : f);
    } else {
      const newFee = { 
        ...updatedFee, 
        id: Math.random().toString(36).substr(2, 9), 
        dueDate: new Date().toISOString().split('T')[0] 
      };
      newFees = [newFee, ...fees];
    }
    setFees(newFees);
    LocalDB.saveFees(newFees);
    setIsModalOpen(false);
  };

  const handleDeleteFee = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khoản phí này?')) {
      const newFees = fees.filter(f => f.id !== id);
      setFees(newFees);
      LocalDB.saveFees(newFees);
    }
  };

  const filteredFees = fees.filter(f => {
    const term = searchTerm.toLowerCase();
    const aptId = (f.apartmentId || '').toLowerCase();
    const resName = (f.residentName || '').toLowerCase();
    return aptId.includes(term) || resName.includes(term);
  });

  const filteredResidents = residents.filter(r => {
    const term = searchTerm.toLowerCase();
    const name = (r.name || '').toLowerCase();
    const aptId = (r.apartmentId || '').toLowerCase();
    return name.includes(term) || aptId.includes(term);
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard data={fees} />;
      case 'fees': return <FeeTable data={filteredFees} onEdit={(f) => { setSelectedFee(f); setIsModalOpen(true); }} onDelete={handleDeleteFee} />;
      case 'residents': return <ResidentList data={filteredResidents} />;
      case 'activities': return <ActivityManagement />;
      case 'notifications': return <NotificationList data={notifications} />;
      case 'management': return <ManagementBoard />;
      case 'technical': return <TechnicalService />;
      case 'feedback': return <FeedbackBox />;
      case 'profile': return <ProfilePage />;
      default: return <Dashboard data={fees} />;
    }
  };

  const getPageInfo = () => {
    switch (activeTab) {
      case 'dashboard': return { title: 'Bảng Tin Tổng Hợp', desc: 'Thống kê vận hành và thu phí tòa nhà' };
      case 'fees': return { title: 'Thu Phí & Tài Chính', desc: 'Lập hóa đơn và theo dõi tiến độ nộp phí' };
      case 'residents': return { title: 'Danh Sách Cư Dân', desc: 'Quản lý căn hộ và nhân khẩu học' };
      case 'activities': return { title: 'Hoạt Động Cộng Đồng', desc: 'Đặt lịch tiện ích và sự kiện tòa nhà' };
      case 'notifications': return { title: 'Thông Báo Cư Dân', desc: 'Giao tiếp và cập nhật thông tin chung' };
      case 'management': return { title: 'Ban Quản Lý', desc: 'Thông tin nhân sự và lịch tiếp dân' };
      case 'technical': return { title: 'Dịch Vụ Kỹ Thuật', desc: 'Báo cáo sự cố và lịch sửa chữa tại nhà' };
      case 'feedback': return { title: 'Hòm Thư Góp Ý', desc: 'Lắng nghe và cải thiện chất lượng dịch vụ' };
      case 'profile': return { title: 'Hồ Sơ Của Tôi', desc: 'Quản lý thông tin cá nhân và căn hộ' };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'} transition-colors duration-300`}>
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto max-h-screen">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className={`text-2xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{pageInfo.title}</h1>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{pageInfo.desc}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Tìm kiếm thông tin..." 
                className={`pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 text-sm shadow-sm transition-all
                  ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-600' : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'}
                `}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {activeTab === 'fees' && (
              <button onClick={() => { setSelectedFee(null); setIsModalOpen(true); }} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-900/20 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                Thêm Hóa Đơn
              </button>
            )}
          </div>
        </header>

        <div className="flex-1">
          {renderContent()}
        </div>
      </main>

      <FeeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveFee}
        fee={selectedFee}
        theme={theme}
      />
    </div>
  );
};

export default App;
