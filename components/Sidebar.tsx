
import React from 'react';

export type TabType = 'dashboard' | 'fees' | 'residents' | 'notifications';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onLogout }) => {
  // Fix: Replaced JSX.Element with React.ReactNode to resolve 'Cannot find namespace JSX' error.
  const menuItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { 
      id: 'dashboard', 
      label: 'Thống kê', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> 
    },
    { 
      id: 'fees', 
      label: 'Danh sách phí', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> 
    },
    { 
      id: 'residents', 
      label: 'Cư dân', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> 
    },
    { 
      id: 'notifications', 
      label: 'Thông báo', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> 
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex h-screen sticky top-0">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-100">
            A
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">ApartManager</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id 
              ? 'bg-blue-50 text-blue-600 font-semibold' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center justify-between gap-2 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
          <div className="flex items-center gap-3 overflow-hidden">
            <img src="https://picsum.photos/40/40?random=1" className="w-10 h-10 rounded-full object-cover border-2 border-slate-200" alt="Admin" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-800 truncate">Quản trị viên</p>
              <p className="text-xs text-slate-500 truncate">admin@chungcu.vn</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-rose-600 transition-colors" title="Đăng xuất">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
