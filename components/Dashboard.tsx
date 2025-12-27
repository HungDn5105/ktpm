
import React, { useMemo, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FeeItem, PaymentStatus } from '../types';
import StatCard from './StatCard';
import { analyzeFeesWithAI } from '../services/gemini';

interface DashboardProps {
  data: FeeItem[];
}

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const stats = useMemo(() => {
    const totalRevenue = data.reduce((acc, curr) => curr.status === PaymentStatus.PAID ? acc + curr.total : acc, 0);
    const pendingAmount = data.reduce((acc, curr) => curr.status !== PaymentStatus.PAID ? acc + curr.total : acc, 0);
    const paidCount = data.filter(f => f.status === PaymentStatus.PAID).length;
    const pendingCount = data.filter(f => f.status === PaymentStatus.PENDING).length;
    const overdueCount = data.filter(f => f.status === PaymentStatus.OVERDUE).length;
    
    return { totalRevenue, pendingAmount, paidCount, pendingCount, overdueCount };
  }, [data]);

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeFeesWithAI(data);
    setAiInsight(result || "Không có dữ liệu phân tích.");
    setIsAnalyzing(false);
  };

  const chartData = [
    { name: 'Tháng 1', revenue: 120000000 },
    { name: 'Tháng 2', revenue: 150000000 },
    { name: 'Tháng 3', revenue: 140000000 },
    { name: 'Tháng 4', revenue: 180000000 },
    { name: 'Tháng 5', revenue: stats.totalRevenue / 1000 },
  ];

  const pieData = [
    { name: 'Đã thanh toán', value: stats.paidCount },
    { name: 'Chờ thanh toán', value: stats.pendingCount },
    { name: 'Quá hạn', value: stats.overdueCount },
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* AI Insight Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl border border-white/10 overflow-hidden relative group">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-white/20 rounded-lg backdrop-blur-md">
                <svg className="w-5 h-5 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </span>
              <h3 className="text-lg font-bold">Trợ Lý AI Phân Tích</h3>
            </div>
            {aiInsight ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 animate-in fade-in slide-in-from-left-4 duration-500">
                <p className="text-blue-50 text-sm leading-relaxed whitespace-pre-line">
                  {aiInsight}
                </p>
              </div>
            ) : (
              <p className="text-blue-100 text-sm italic opacity-80">Nhấn nút để nhận phân tích thông minh từ Gemini về tình hình tài chính của chung cư.</p>
            )}
          </div>
          <button 
            onClick={handleAIAnalysis}
            disabled={isAnalyzing}
            className={`px-6 py-3 bg-white text-blue-600 rounded-xl font-bold text-sm shadow-lg hover:shadow-white/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                Đang phân tích...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Phân Tích Bằng AI
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Tổng Doanh Thu" 
          value={formatCurrency(stats.totalRevenue)} 
          trend="+12% so với tháng trước"
          icon={<svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="bg-emerald-50"
        />
        <StatCard 
          title="Chờ Thu" 
          value={formatCurrency(stats.pendingAmount)} 
          trend="Giảm 5% so với tháng trước"
          icon={<svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="bg-amber-50"
        />
        <StatCard 
          title="Đã Thu (Hộ)" 
          value={stats.paidCount.toString()} 
          trend="85% tổng số căn"
          icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="bg-blue-50"
        />
        <StatCard 
          title="Số Hộ Quá Hạn" 
          value={stats.overdueCount.toString()} 
          trend="Cần nhắc nhở ngay"
          icon={<svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
          color="bg-rose-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Biểu Đồ Doanh Thu</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Tình Trạng Thanh Toán</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {pieData.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[idx]}}></div>
                  <span className="text-sm text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-800">{item.value} căn</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
