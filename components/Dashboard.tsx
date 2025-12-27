
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FeeItem, PaymentStatus } from '../types';

interface DashboardProps {
  data: FeeItem[];
}

const STATS_COLORS = ['#cbd5e1', '#3b82f6', '#f97316', '#ef4444', '#10b981'];

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const paidCount = data.filter(f => f.status === PaymentStatus.PAID).length;
  const pendingCount = data.filter(f => f.status === PaymentStatus.PENDING).length;
  const overdueCount = data.filter(f => f.status === PaymentStatus.OVERDUE).length;
  const totalCount = data.length || 1;

  const paymentChartData = [
    { name: 'Chờ nộp', value: pendingCount },
    { name: 'Đã hoàn thành', value: paidCount },
    { name: 'Quá hạn', value: overdueCount },
  ];

  const totalCollected = data
    .filter(f => f.status === PaymentStatus.PAID)
    .reduce((sum, item) => sum + item.total, 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500 transition-colors">
      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
          title="Hóa đơn tháng này" 
          value={`${paidCount} / ${totalCount}`} 
          color="bg-blue-500" 
          progress={(paidCount / totalCount) * 100}
        />
        <SummaryCard 
          title="Tỷ lệ hoàn thành" 
          value={`${Math.round((paidCount / totalCount) * 100)}%`} 
          color="bg-emerald-500" 
          progress={Math.round((paidCount / totalCount) * 100)}
        />
        <SummaryCard 
          title="Tổng đã thu (VNĐ)" 
          value={formatCurrency(totalCollected).replace('₫', '').trim()} 
          color="bg-indigo-600" 
          progress={75}
        />
        <SummaryCard 
          title="Căn hộ quá hạn" 
          value={`${overdueCount} Căn`} 
          color="bg-rose-500" 
          progress={(overdueCount / totalCount) * 100}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-tight">Hàng chờ báo cáo mới</h3>
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-[10px] font-bold">4 Đang chờ</span>
            </div>
            <div className="p-0">
               <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-3 font-bold uppercase">Căn hộ / Loại báo cáo</th>
                    <th className="px-6 py-3 font-bold uppercase">Thời gian</th>
                    <th className="px-6 py-3 font-bold uppercase text-right">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <PendingReportRow apt="A-201" type="Sự cố điện" time="15:30 Hôm nay" status="pending" />
                  <PendingReportRow apt="B-504" type="Báo rò nước" time="14:20 Hôm nay" status="reviewing" />
                  <PendingReportRow apt="C-102" type="Góp ý bảo vệ" time="Hôm qua" status="pending" />
                </tbody>
               </table>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
            <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-700 dark:bg-slate-800">
              <h3 className="text-sm font-bold text-white uppercase">Tình trạng thu phí toàn dự án</h3>
            </div>
            <div className="p-6">
               <div className="flex flex-wrap justify-center gap-6 mb-6">
                  {paymentChartData.map((item, idx) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{backgroundColor: STATS_COLORS[idx+1]}}></div>
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">{item.name}</span>
                    </div>
                  ))}
               </div>
               <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentChartData}
                      cx="50%"
                      cy="100%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {paymentChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STATS_COLORS[index+1]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
            <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-700 dark:bg-slate-800">
              <h3 className="text-sm font-bold text-white uppercase">Cư dân mới tháng này</h3>
            </div>
            <div className="p-0">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-4 py-3 font-bold uppercase">Căn hộ</th>
                    <th className="px-4 py-3 font-bold uppercase">Họ tên</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  <ResidentRow apt="A-402" name="Lê Mạnh Hùng" date="12/05" />
                  <ResidentRow apt="B-105" name="Phạm Minh Tuấn" date="10/05" />
                  <ResidentRow apt="C-702" name="Nguyễn Thu Trang" date="05/05" />
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
            <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-700 dark:bg-slate-800">
              <h3 className="text-sm font-bold text-white uppercase">Top hóa đơn lớn nhất</h3>
            </div>
            <div className="p-0">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-4 py-3 font-bold uppercase">Căn hộ</th>
                    <th className="px-4 py-3 font-bold uppercase text-right">Số tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {data.sort((a,b) => b.total - a.total).slice(0, 5).map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-bold">{item.apartmentId}</td>
                      <td className="px-4 py-3 text-right text-blue-600 dark:text-blue-400 font-bold">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, color, progress }: { title: string; value: string; color: string; progress: number }) => (
  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
    <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-bold mb-1 uppercase tracking-wider">{title}</p>
    <h4 className="text-2xl font-black text-slate-800 dark:text-white text-center mb-4">{value}</h4>
    <div className="absolute bottom-0 left-0 h-1.5 w-full bg-slate-100 dark:bg-slate-800">
      <div 
        className={`h-full ${color} transition-all duration-1000 ease-out`} 
        style={{ width: `${Math.min(100, progress)}%` }}
      ></div>
    </div>
  </div>
);

const ResidentRow = ({ apt, name, date }: { apt: string; name: string; date: string }) => (
  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
    <td className="px-4 py-3">
        <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-[10px] font-bold">{apt}</span>
    </td>
    <td className="px-4 py-3">
        <p className="text-slate-700 dark:text-slate-300 font-semibold">{name}</p>
        <p className="text-[9px] text-slate-400 dark:text-slate-600">Vào ngày {date}</p>
    </td>
  </tr>
);

const PendingReportRow = ({ apt, type, time, status }: { apt: string; type: string; time: string; status: 'pending' | 'reviewing' }) => (
  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
    <td className="px-6 py-4">
        <p className="text-slate-800 dark:text-white font-bold">{apt}</p>
        <p className="text-slate-400 mt-0.5">{type}</p>
    </td>
    <td className="px-6 py-4 text-slate-500 dark:text-slate-500 font-medium">
        {time}
    </td>
    <td className="px-6 py-4 text-right">
        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
            {status === 'pending' ? 'Đang chờ' : 'Đang duyệt'}
        </span>
    </td>
  </tr>
);

export default Dashboard;
