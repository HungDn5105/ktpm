
import React, { useState, useEffect } from 'react';
import { LocalDB } from '../services/db';
import { Resident, UserAccount } from '../types';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [residentInfo, setResidentInfo] = useState<Partial<Resident>>({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const currentUser = LocalDB.getCurrentUser();
    setUser(currentUser);
    
    if (currentUser) {
      const allResidents = LocalDB.getResidents();
      const info = allResidents.find(r => r.email === currentUser.email) || {
        name: currentUser.name,
        email: currentUser.email,
        apartmentId: currentUser.apartmentId || '',
        memberCount: 1,
        phone: ''
      };
      setResidentInfo(info);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allResidents = LocalDB.getResidents();
    const index = allResidents.findIndex(r => r.email === residentInfo.email);
    
    let updatedResidents = [...allResidents];
    if (index > -1) {
      updatedResidents[index] = { ...allResidents[index], ...residentInfo } as Resident;
    } else {
      updatedResidents.push({ ...residentInfo, id: Date.now().toString() } as Resident);
    }
    
    LocalDB.saveResidents(updatedResidents);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setResidentInfo(prev => ({ ...prev, [name]: name === 'memberCount' ? Number(value) : value }));
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="relative h-40 bg-gradient-to-r from-blue-600 to-indigo-700">
           <div className="absolute -bottom-16 left-12 flex items-end gap-6">
              <div className="w-32 h-32 rounded-[2rem] bg-white dark:bg-slate-800 p-2 shadow-2xl">
                 <img 
                    src={`https://ui-avatars.com/api/?name=${residentInfo.name}&background=random&size=128`} 
                    className="w-full h-full rounded-[1.5rem] object-cover" 
                    alt="Avatar" 
                 />
              </div>
              <div className="mb-4">
                 <h2 className="text-2xl font-black text-white drop-shadow-md">{residentInfo.name}</h2>
                 <p className="text-blue-100 font-bold text-sm uppercase tracking-widest">{residentInfo.apartmentId || 'Chưa xác định căn hộ'}</p>
              </div>
           </div>
        </div>

        <div className="pt-24 px-12 pb-12">
          {isSaved && (
            <div className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl text-emerald-600 dark:text-emerald-400 text-sm font-bold flex items-center gap-2 animate-bounce">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              Đã cập nhật thông tin cá nhân thành công!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Họ và tên cư dân</label>
                <input 
                  name="name"
                  value={residentInfo.name || ''}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white font-medium" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Số điện thoại</label>
                <input 
                  name="phone"
                  value={residentInfo.phone || ''}
                  onChange={handleChange}
                  placeholder="09xx xxx xxx"
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white font-medium" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Email liên lạc</label>
                <input 
                  readOnly
                  name="email"
                  value={residentInfo.email || ''}
                  className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none text-slate-400 cursor-not-allowed font-medium" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Số lượng thành viên</label>
                <input 
                  type="number"
                  name="memberCount"
                  value={residentInfo.memberCount || 1}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white font-medium" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Mã căn hộ</label>
                <input 
                  name="apartmentId"
                  value={residentInfo.apartmentId || ''}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white font-medium" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Tình trạng cư trú</label>
                <select 
                  name="status"
                  value={residentInfo.status || 'active'}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white font-medium"
                >
                  <option value="active">Thường trú</option>
                  <option value="temporary">Tạm trú</option>
                  <option value="absent">Vắng mặt lâu ngày</option>
                </select>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
               <button 
                  type="submit"
                  className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] uppercase tracking-widest text-sm"
               >
                  Lưu Thay Đổi
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
