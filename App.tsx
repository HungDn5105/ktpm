
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FeeTable from './components/FeeTable';
import { FeeItem, PaymentStatus } from './types';

const mockData: FeeItem[] = [
  { id: '1', apartmentId: 'A-101', residentName: 'Nguyễn Văn A', month: '05', year: 2024, managementFee: 500000, electricity: 1250000, water: 300000, parking: 100000, total: 2150000, status: PaymentStatus.PAID, dueDate: '2024-05-10' },
  { id: '2', apartmentId: 'A-102', residentName: 'Trần Thị B', month: '05', year: 2024, managementFee: 500000, electricity: 850000, water: 200000, parking: 100000, total: 1650000, status: PaymentStatus.PENDING, dueDate: '2024-05-10' },
  { id: '3', apartmentId: 'B-205', residentName: 'Lê Văn C', month: '05', year: 2024, managementFee: 700000, electricity: 2100000, water: 450000, parking: 200000, total: 3450000, status: PaymentStatus.OVERDUE, dueDate: '2024-05-05' },
  { id: '4', apartmentId: 'C-301', residentName: 'Phạm Minh D', month: '05', year: 2024, managementFee: 500000, electricity: 1100000, water: 250000, parking: 100000, total: 1950000, status: PaymentStatus.PAID, dueDate: '2024-05-10' },
  { id: '5', apartmentId: 'D-410', residentName: 'Hoàng Anh E', month: '05', year: 2024, managementFee: 900000, electricity: 3200000, water: 600000, parking: 300000, total: 5000000, status: PaymentStatus.PENDING, dueDate: '2024-05-10' },
  { id: '6', apartmentId: 'A-103', residentName: 'Ngô Kim F', month: '04', year: 2024, managementFee: 500000, electricity: 900000, water: 200000, parking: 100000, total: 1700000, status: PaymentStatus.PAID, dueDate: '2024-04-10' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'fees'>('dashboard');
  const [fees] = useState<FeeItem[]>(mockData);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFees = fees.filter(f => 
    f.apartmentId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.residentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto max-h-screen">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {activeTab === 'dashboard' ? 'Tổng Quan Thống Kê' : 'Quản Lý Thu Phí'}
            </h1>
            <p className="text-slate-500">
              {activeTab === 'dashboard' 
                ? 'Theo dõi doanh thu và tình trạng thanh toán' 
                : 'Danh sách chi tiết các khoản phí căn hộ'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm căn hộ, cư dân..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Thêm Phí Mới
            </button>
          </div>
        </header>

        <div className="flex-1">
          {activeTab === 'dashboard' ? (
            <Dashboard data={fees} />
          ) : (
            <FeeTable data={filteredFees} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
