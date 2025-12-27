
import React from 'react';
import { Resident } from '../types';

interface ResidentListProps {
  data: Resident[];
}

const ResidentList: React.FC<ResidentListProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Cư Dân</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Căn Hộ</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Liên Hệ</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Số TV</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày Vào</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng Thái</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((res) => (
              <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm">
                      {res.name.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{res.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{res.apartmentId}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    <div className="text-slate-700 font-medium">{res.phone}</div>
                    <div className="text-slate-400 text-xs">{res.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-600">{res.memberCount} người</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-500">{res.entryDate}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {res.status === 'active' ? (
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">Thường trú</span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-50 text-slate-600 border border-slate-100">Tạm trú</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-slate-400 hover:text-blue-600 p-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResidentList;
