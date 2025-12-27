
import React, { useState, useEffect } from 'react';
import { Activity, PoolTicket } from '../types';
import { LocalDB } from '../services/db';

const ActivityManagement: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'calendar' | 'pool'>('calendar');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tickets, setTickets] = useState<PoolTicket[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    setActivities(LocalDB.getActivities());
    setTickets(LocalDB.getPoolTickets());
  }, []);

  const getCategoryColor = (cat: Activity['category']) => {
    switch (cat) {
      case 'sports': return 'bg-emerald-100 text-emerald-600';
      case 'community': return 'bg-blue-100 text-blue-600';
      case 'maintenance': return 'bg-amber-100 text-amber-600';
      case 'event': return 'bg-purple-100 text-purple-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const renderCalendar = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {activities.map((act) => (
        <div key={act.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all group">
          <div className="p-5">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${getCategoryColor(act.category)}`}>
                {act.category}
              </span>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400">{act.date}</p>
                <p className="text-xs text-slate-500 font-medium">{act.time}</p>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{act.title}</h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {act.location}
            </div>
            <p className="text-sm text-slate-600 line-clamp-2">{act.description}</p>
          </div>
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button className="text-xs font-bold text-blue-600 hover:underline">Tham gia ngay →</button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPoolManagement = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Đặt Vé Bể Bơi</h3>
          <button 
            onClick={() => setShowBookingForm(!showBookingForm)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition"
          >
            {showBookingForm ? 'Đóng' : 'Đăng ký vé mới'}
          </button>
        </div>

        {showBookingForm && (
          <div className="mb-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 animate-in zoom-in-95 duration-200">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Căn Hộ</label>
                  <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl" placeholder="A-101" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Ngày đi</label>
                  <input type="date" className="w-full px-4 py-2 border border-slate-200 rounded-xl" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Khung giờ</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-xl">
                    <option>Sáng (06:00 - 11:00)</option>
                    <option>Chiều (14:00 - 17:00)</option>
                    <option>Tối (18:00 - 21:00)</option>
                  </select>
                </div>
             </div>
             <button className="mt-4 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl w-full">Xác Nhận Đặt Vé</button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Cư Dân</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Ngày/Giờ</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Số lượng</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Trạng Thái</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{ticket.residentName}</p>
                    <p className="text-xs text-slate-400">{ticket.apartmentId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600 font-medium">{ticket.date}</p>
                    <p className="text-xs text-blue-600 uppercase font-bold">{ticket.slot}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-700">{ticket.adultCount}L / {ticket.childCount}N</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${ticket.status === 'confirmed' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                      {ticket.status === 'confirmed' ? 'Đã xác nhận' : 'Đã sử dụng'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-rose-600 p-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveSubTab('calendar')}
          className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeSubTab === 'calendar' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
        >
          Lịch Hoạt Động
        </button>
        <button 
          onClick={() => setActiveSubTab('pool')}
          className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeSubTab === 'pool' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
        >
          Vé Bể Bơi
        </button>
      </div>

      <div className="mt-6">
        {activeSubTab === 'calendar' ? renderCalendar() : renderPoolManagement()}
      </div>
    </div>
  );
};

export default ActivityManagement;
