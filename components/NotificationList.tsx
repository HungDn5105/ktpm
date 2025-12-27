
import React from 'react';
import { AppNotification } from '../types';

interface NotificationListProps {
  data: AppNotification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ data }) => {
  const getTypeStyles = (type: AppNotification['type']) => {
    switch (type) {
      case 'maintenance': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'warning': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'success': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {data.map((notif) => (
        <div key={notif.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getTypeStyles(notif.type)}`}>
              {notif.type}
            </span>
            <span className="text-xs text-slate-400">{notif.date}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{notif.title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{notif.content}</p>
          <div className="flex justify-end">
            <button className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all">
              Xem chi tiết <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
