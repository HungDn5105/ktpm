
import React, { useState, useEffect } from 'react';
import { FeeItem, PaymentStatus } from '../types';

interface FeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fee: FeeItem) => void;
  fee: FeeItem | null;
  theme: 'light' | 'dark';
}

const FeeModal: React.FC<FeeModalProps> = ({ isOpen, onClose, onSave, fee, theme }) => {
  const [formData, setFormData] = useState<Partial<FeeItem>>({});
  const isDark = theme === 'dark';

  useEffect(() => {
    if (fee) {
      setFormData(fee);
    } else {
      setFormData({
        status: PaymentStatus.PENDING,
        month: new Date().getMonth() + 1 + "",
        year: new Date().getFullYear(),
      });
    }
  }, [fee, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isNumber = ['managementFee', 'electricity', 'water', 'parking', 'year'].includes(name);
    
    setFormData(prev => {
      const newData = { ...prev, [name]: isNumber ? Number(value) : value };
      if (isNumber) {
        const total = (Number(newData.managementFee) || 0) + 
                      (Number(newData.electricity) || 0) + 
                      (Number(newData.water) || 0) + 
                      (Number(newData.parking) || 0);
        return { ...newData, total };
      }
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as FeeItem);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all duration-300">
      <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} rounded-[2rem] border shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300`}>
        <div className={`px-8 py-6 border-b flex justify-between items-center ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-50 bg-slate-50/50'}`}>
          <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {fee ? 'Cập Nhật Hóa Đơn' : 'Lập Hóa Đơn Mới'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors group">
            <svg className="w-6 h-6 text-slate-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Mã Căn Hộ</label>
              <input 
                name="apartmentId"
                value={formData.apartmentId || ''}
                onChange={handleChange}
                required
                className={`w-full px-5 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}
                placeholder="A-101"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Chủ Căn Hộ</label>
              <input 
                name="residentName"
                value={formData.residentName || ''}
                onChange={handleChange}
                required
                className={`w-full px-5 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Kỳ Thu Phí</label>
              <div className="flex gap-2">
                <input 
                  name="month"
                  value={formData.month || ''}
                  onChange={handleChange}
                  required
                  className={`w-2/3 px-5 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}
                  placeholder="Tháng"
                />
                <input 
                  name="year"
                  type="number"
                  value={formData.year || ''}
                  onChange={handleChange}
                  required
                  className={`w-1/3 px-5 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Trạng Thái</label>
              <select 
                name="status"
                value={formData.status || PaymentStatus.PENDING}
                onChange={handleChange}
                className={`w-full px-5 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}
              >
                <option value={PaymentStatus.PAID}>Đã thanh toán</option>
                <option value={PaymentStatus.PENDING}>Chờ thanh toán</option>
                <option value={PaymentStatus.OVERDUE}>Quá hạn</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {[
              { name: 'managementFee', label: 'Quản lý' },
              { name: 'electricity', label: 'Điện' },
              { name: 'water', label: 'Nước' },
              { name: 'parking', label: 'Gửi xe' },
            ].map(field => (
              <div key={field.name} className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter ml-1">{field.label}</label>
                <input 
                  name={field.name}
                  type="number"
                  value={formData[field.name as keyof FeeItem] || 0}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-bold ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}
                />
              </div>
            ))}
          </div>

          <div className={`mt-8 p-6 rounded-[1.5rem] flex justify-between items-center ${isDark ? 'bg-blue-900/20 border border-blue-900/50' : 'bg-blue-50 border border-blue-100'}`}>
            <span className={`font-black ${isDark ? 'text-blue-400' : 'text-blue-700'} uppercase tracking-widest text-xs`}>Tổng Cộng:</span>
            <span className={`text-2xl font-black ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(formData.total || 0)}
            </span>
          </div>

          <div className="flex justify-end gap-4 mt-10">
            <button 
              type="button"
              onClick={onClose}
              className={`px-8 py-3.5 font-bold rounded-2xl transition-all ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              Hủy
            </button>
            <button 
              type="submit"
              className="px-10 py-3.5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all active:scale-95 uppercase tracking-widest text-sm"
            >
              Lưu Hóa Đơn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeeModal;
