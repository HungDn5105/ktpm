
import React, { useState, useEffect } from 'react';
import { FeeItem, PaymentStatus } from '../types';

interface FeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fee: FeeItem) => void;
  fee: FeeItem | null;
}

const FeeModal: React.FC<FeeModalProps> = ({ isOpen, onClose, onSave, fee }) => {
  const [formData, setFormData] = useState<Partial<FeeItem>>({});

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
      // Tự động tính tổng cộng
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800">
            {fee ? 'Chỉnh Sửa Khoản Phí' : 'Thêm Phí Mới'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Mã Căn Hộ</label>
              <input 
                name="apartmentId"
                value={formData.apartmentId || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Ví dụ: A-101"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Tên Cư Dân</label>
              <input 
                name="residentName"
                value={formData.residentName || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Kỳ Thu (Tháng/Năm)</label>
              <div className="flex gap-2">
                <input 
                  name="month"
                  value={formData.month || ''}
                  onChange={handleChange}
                  required
                  className="w-2/3 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Tháng"
                />
                <input 
                  name="year"
                  type="number"
                  value={formData.year || ''}
                  onChange={handleChange}
                  required
                  className="w-1/3 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Trạng Thái</label>
              <select 
                name="status"
                value={formData.status || PaymentStatus.PENDING}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value={PaymentStatus.PAID}>Đã thanh toán</option>
                <option value={PaymentStatus.PENDING}>Chờ thanh toán</option>
                <option value={PaymentStatus.OVERDUE}>Quá hạn</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            {[
              { name: 'managementFee', label: 'Phí QL' },
              { name: 'electricity', label: 'Điện' },
              { name: 'water', label: 'Nước' },
              { name: 'parking', label: 'Gửi xe' },
            ].map(field => (
              <div key={field.name} className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">{field.label}</label>
                <input 
                  name={field.name}
                  type="number"
                  value={formData[field.name as keyof FeeItem] || 0}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-2xl flex justify-between items-center">
            <span className="text-blue-700 font-semibold">Tổng cộng cần thu:</span>
            <span className="text-xl font-bold text-blue-800">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(formData.total || 0)}
            </span>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-all"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit"
              className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Lưu Thay Đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeeModal;
