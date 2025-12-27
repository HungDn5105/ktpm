
import React, { useState } from 'react';
import InteractiveCalendar from './InteractiveCalendar';

const members = [
  { name: 'Nguyễn Văn Hùng', role: 'Trưởng Ban Quản Trị', phone: '090 123 4567', email: 'hung.nv@apart.vn', avatar: 'https://ui-avatars.com/api/?name=Hùng&background=3b82f6&color=fff' },
  { name: 'Trần Thị Lan', role: 'Phó Ban Quản Trị', phone: '090 987 6543', email: 'lan.tt@apart.vn', avatar: 'https://ui-avatars.com/api/?name=Lan&background=ec4899&color=fff' },
  { name: 'Lê Minh Tâm', role: 'Kế toán trưởng', phone: '091 112 2334', email: 'tam.lm@apart.vn', avatar: 'https://ui-avatars.com/api/?name=Tâm&background=10b981&color=fff' },
];

const ManagementBoard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Lịch Tiếp Dân Tháng Này</h3>
            <p className="text-xs text-slate-400 font-medium italic">* Vui lòng chọn ngày trống để đăng ký gặp Ban quản trị</p>
          </div>
          <InteractiveCalendar 
            onDateSelect={setSelectedDate} 
            selectedDate={selectedDate}
            busyDates={['2024-05-15', '2024-05-22']} 
          />
          
          {selectedDate && (
            <div className="mt-6 p-5 bg-blue-50 border border-blue-100 rounded-xl animate-in zoom-in-95 duration-200 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-sm font-bold text-blue-800">Bạn đã chọn ngày: {selectedDate.toLocaleDateString('vi-VN')}</p>
                <p className="text-xs text-blue-600">Khung giờ tiếp dân: 08:30 - 11:00 và 14:00 - 16:30</p>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">Xác nhận đăng ký gặp</button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Thành Viên Ban Quản Trị</h3>
          <div className="space-y-4">
            {members.map(m => (
              <div key={m.name} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
                <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-xl group-hover:scale-105 transition-transform" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{m.name}</h4>
                  <p className="text-[10px] text-blue-600 font-bold uppercase">{m.role}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{m.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl text-white shadow-xl">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-70">Ghi chú quan trọng</h3>
          <ul className="text-xs space-y-3 font-medium">
            <li className="flex gap-2">
              <span className="text-blue-400">●</span> 
              Mọi ý kiến cần chuẩn bị bằng văn bản để cuộc họp đạt hiệu quả cao nhất.
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">●</span>
              Trong trường hợp khẩn cấp, vui lòng liên hệ hotline Ban quản lý 24/7.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagementBoard;
