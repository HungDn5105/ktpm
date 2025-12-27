
import React, { useState } from 'react';
import Sidebar, { TabType } from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FeeTable from './components/FeeTable';
import FeeModal from './components/FeeModal';
import ResidentList from './components/ResidentList';
import NotificationList from './components/NotificationList';
import AuthPage from './components/AuthPage';
import { FeeItem, Resident, AppNotification, PaymentStatus } from './types';

const mockFees: FeeItem[] = [
  { id: '1', apartmentId: 'A-101', residentName: 'Nguyễn Văn A', month: '05', year: 2024, managementFee: 500000, electricity: 1250000, water: 300000, parking: 100000, total: 2150000, status: PaymentStatus.PAID, dueDate: '2024-05-10' },
  { id: '2', apartmentId: 'A-102', residentName: 'Trần Thị B', month: '05', year: 2024, managementFee: 500000, electricity: 850000, water: 200000, parking: 100000, total: 1650000, status: PaymentStatus.PENDING, dueDate: '2024-05-10' },
  { id: '3', apartmentId: 'B-205', residentName: 'Lê Văn C', month: '05', year: 2024, managementFee: 700000, electricity: 2100000, water: 450000, parking: 200000, total: 3450000, status: PaymentStatus.OVERDUE, dueDate: '2024-05-05' },
];

const mockResidents: Resident[] = [
  { id: '1', apartmentId: 'A-101', name: 'Nguyễn Văn A', phone: '0901234567', email: 'a.nguyen@gmail.com', memberCount: 4, entryDate: '2023-01-15', status: 'active' },
  { id: '2', apartmentId: 'A-102', name: 'Trần Thị B', phone: '0988777666', email: 'b.tran@gmail.com', memberCount: 2, entryDate: '2023-05-20', status: 'active' },
  { id: '3', apartmentId: 'B-205', name: 'Lê Văn C', phone: '0911223344', email: 'c.le@gmail.com', memberCount: 5, entryDate: '2022-11-10', status: 'temporary' },
];

const mockNotifications: AppNotification[] = [
  { id: '1', title: 'Thông báo bảo trì thang máy', content: 'Thang máy block A sẽ được bảo trì từ 9:00 đến 11:00 ngày mai. Vui lòng sử dụng thang bộ hoặc block B.', date: '2024-05-18', type: 'maintenance' },
  { id: '2', title: 'Nhắc nhở nộp phí quản lý', content: 'Hạn chót nộp phí quản lý tháng 5 là ngày 20/05. Các hộ chưa nộp vui lòng hoàn tất sớm.', date: '2024-05-15', type: 'warning' },
  { id: '3', title: 'Khử khuẩn định kỳ', content: 'Ban quản lý sẽ tiến hành khử khuẩn toàn bộ khu vực hành lang vào sáng thứ 7 này.', date: '2024-05-12', type: 'info' },
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [fees, setFees] = useState<FeeItem[]>(mockFees);
  const [residents] = useState<Resident[]>(mockResidents);
  const [notifications] = useState<AppNotification[]>(mockNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeeItem | null>(null);

  if (!isLoggedIn) {
    return <AuthPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const filteredFees = fees.filter(f => 
    f.apartmentId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.residentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredResidents = residents.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.apartmentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditFee = (fee: FeeItem) => {
    setSelectedFee(fee);
    setIsModalOpen(true);
  };

  const handleSaveFee = (updatedFee: FeeItem) => {
    if (selectedFee) {
      setFees(prev => prev.map(f => f.id === updatedFee.id ? updatedFee : f));
    } else {
      const newFee = { ...updatedFee, id: Math.random().toString(36).substr(2, 9), dueDate: new Date().toISOString().split('T')[0] };
      setFees(prev => [newFee, ...prev]);
    }
    setIsModalOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard data={fees} />;
      case 'fees': return <FeeTable data={filteredFees} onEdit={handleEditFee} />;
      case 'residents': return <ResidentList data={filteredResidents} />;
      case 'notifications': return <NotificationList data={notifications} />;
      default: return <Dashboard data={fees} />;
    }
  };

  const getPageInfo = () => {
    switch (activeTab) {
      case 'dashboard': return { title: 'Tổng Quan Thống Kê', desc: 'Theo dõi tình hình thu phí và căn hộ' };
      case 'fees': return { title: 'Quản Lý Thu Phí', desc: 'Danh sách chi tiết các khoản phí tháng' };
      case 'residents': return { title: 'Danh Sách Cư Dân', desc: 'Thông tin nhân khẩu tại chung cư' };
      case 'notifications': return { title: 'Thông Báo Hệ Thống', desc: 'Gửi và quản lý các thông báo cư dân' };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={() => setIsLoggedIn(false)} 
      />
      
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto max-h-screen">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{pageInfo.title}</h1>
            <p className="text-slate-500">{pageInfo.desc}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {activeTab === 'fees' && (
              <button onClick={() => { setSelectedFee(null); setIsModalOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                Thêm Phí
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
      />
    </div>
  );
};

export default App;
