
import React, { useEffect, useState } from 'react';
import { LocalDB } from '../services/db';
import { UserAccount } from '../types';

export type TabType = 'dashboard' | 'fees' | 'residents' | 'activities' | 'notifications' | 'management' | 'technical' | 'feedback' | 'profile';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onLogout, theme, onToggleTheme }) => {
  const isDark = theme === 'dark';
  const [user, setUser] = useState<UserAccount | null>(null);

  useEffect(() => {
    setUser(LocalDB.getCurrentUser());
  }, []);

  const mainGroup: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Bảng tin', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { id: 'fees', label: 'Thu phí & Tài chính', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'residents', label: 'Danh sách cư dân', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { id: 'activities', label: 'Hoạt động & Tiện ích', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'notifications', label: 'Thông báo cư dân', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
  ];

  const adminGroup: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'management', label: 'Ban quản lý', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
    { id: 'technical', label: 'Dịch vụ kỹ thuật', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { id: 'feedback', label: 'Hòm thư góp ý', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg> },
  ];

  const sidebarBg = isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';
  const labelColor = isDark ? 'text-slate-400' : 'text-slate-400';
  const textColor = isDark ? 'text-slate-300' : 'text-slate-500';

  return (
    <aside className={`w-64 border-r flex flex-col hidden md:flex h-screen sticky top-0 shadow-sm z-20 transition-colors duration-300 ${sidebarBg}`}>
      <div className={`p-4 flex items-center gap-3 border-b ${isDark ? 'border-slate-800' : 'border-slate-50'}`}>
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 transform rotate-3 hover:rotate-0 transition-transform cursor-pointer">A</div>
        <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>ApartManager</span>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 py-6">
        <div className="mb-6">
          <p className={`text-[10px] font-bold uppercase tracking-widest px-3 mb-2 ${labelColor}`}>Chính</p>
          <nav className="space-y-1">
            {mainGroup.map((item) => (
              <button 
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm ${
                  activeTab === item.id 
                  ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/40' 
                  : `${textColor} hover:bg-slate-800/50 hover:text-slate-100`
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          <p className={`text-[10px] font-bold uppercase tracking-widest px-3 mb-2 ${labelColor}`}>Dịch vụ & Góp ý</p>
          <nav className="space-y-1">
            {adminGroup.map((item) => (
              <button 
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm ${
                  activeTab === item.id 
                  ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/40' 
                  : `${textColor} hover:bg-slate-800/50 hover:text-slate-100`
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className={`p-4 border-t ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50/50'}`}>
        <button 
          onClick={onToggleTheme}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm mb-4 transition-all ${isDark ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
        >
          {isDark ? (
            <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707.707M6.343 6.343l-.707.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg> Chế độ Sáng</>
          ) : (
            <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> Chế độ Tối</>
          )}
        </button>

        <button 
          onClick={() => onTabChange('profile')}
          className={`flex items-center gap-3 w-full p-2 rounded-xl mb-4 transition-all hover:bg-blue-500/10 group ${activeTab === 'profile' ? 'bg-blue-600/10' : ''}`}
        >
            <div className={`w-10 h-10 rounded-full flex-shrink-0 bg-slate-700 overflow-hidden border-2 ${activeTab === 'profile' ? 'border-blue-500' : 'border-transparent'}`}>
                <img src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=random`} alt="Avatar" />
            </div>
            <div className="overflow-hidden text-left">
                <p className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-slate-700'}`}>{user?.name || 'Quản trị viên'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email || 'admin@apart.com'}</p>
            </div>
        </button>

        <button onClick={onLogout} className="flex items-center gap-2 text-slate-400 hover:text-rose-600 transition-colors text-sm w-full px-2 font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
