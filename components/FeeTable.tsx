
import React from 'react';
import { FeeItem, PaymentStatus } from '../types';

interface FeeTableProps {
  data: FeeItem[];
  onEdit?: (fee: FeeItem) => void;
}

const FeeTable: React.FC<FeeTableProps> = ({ data, onEdit }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center w-fit gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            Đã thanh toán
          </span>
        );
      case PaymentStatus.PENDING:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-100 flex items-center w-fit gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            Chờ thanh toán
          </span>
        );
      case PaymentStatus.OVERDUE:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-100 flex items-center w-fit gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
            Quá hạn
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Căn Hộ</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Cư Dân</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Kỳ Thu</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tổng Cộng</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng Thái</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                      {item.apartmentId.split('-')[1]}
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{item.apartmentId}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-600">{item.residentName}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-500 font-medium">Tháng {item.month}/{item.year}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-slate-900">{formatCurrency(item.total)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button 
                    onClick={() => onEdit?.(item)}
                    className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" 
                    title="Sửa thông tin"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  Không tìm thấy dữ liệu phí nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeTable;
