
import React, { useState } from 'react';
import { FeeItem, PaymentStatus } from '../types';
import { draftReminderAI } from '../services/gemini';

interface FeeTableProps {
  data: FeeItem[];
  onEdit?: (fee: FeeItem) => void;
}

const FeeTable: React.FC<FeeTableProps> = ({ data, onEdit }) => {
  const [draftingId, setDraftingId] = useState<string | null>(null);
  const [aiDraft, setAiDraft] = useState<{id: string, text: string} | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleDraftReminder = async (item: FeeItem) => {
    setDraftingId(item.id);
    const draft = await draftReminderAI(item);
    setAiDraft({ id: item.id, text: draft || "Lỗi tạo nội dung." });
    setDraftingId(null);
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
    <div className="space-y-4">
      {aiDraft && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl animate-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-bold text-blue-700 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Tin nhắn nhắc nợ gợi ý bởi AI
            </h4>
            <button onClick={() => setAiDraft(null)} className="text-blue-400 hover:text-blue-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="bg-white p-3 rounded-lg border border-blue-100 text-sm text-slate-700 italic">
            "{aiDraft.text}"
          </div>
          <div className="mt-3 flex gap-2">
            <button 
              onClick={() => { navigator.clipboard.writeText(aiDraft.text); alert("Đã sao chép!"); }}
              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Sao chép nội dung
            </button>
          </div>
        </div>
      )}

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
                    <div className="flex items-center justify-end gap-1">
                      {item.status !== PaymentStatus.PAID && (
                        <button 
                          onClick={() => handleDraftReminder(item)}
                          disabled={draftingId === item.id}
                          className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" 
                          title="Soạn tin nhắn AI"
                        >
                          {draftingId === item.id ? (
                            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          )}
                        </button>
                      )}
                      <button 
                        onClick={() => onEdit?.(item)}
                        className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" 
                        title="Sửa thông tin"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
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
    </div>
  );
};

export default FeeTable;
