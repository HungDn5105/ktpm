
import React, { useState } from 'react';
import InteractiveCalendar from './InteractiveCalendar';

const TechnicalService: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 mb-6 shadow-xl shadow-emerald-500/10">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Đã gửi yêu cầu thành công!</h3>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
          Yêu cầu sửa chữa của bạn đã được đưa vào hàng chờ. Kỹ thuật viên sẽ liên hệ lại với bạn trong vòng 30 phút.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-900/20"
        >
          Gửi thêm yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Yêu Cầu Hỗ Trợ Kỹ Thuật</h3>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Căn hộ</label>
              <input type="text" placeholder="A-101" className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Loại sự cố</label>
              <select className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white">
                <option>Điện tử / Gia dụng</option>
                <option>Hệ thống nước</option>
                <option>Internet / Truyền hình</option>
                <option>Kết cấu nhà cửa</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Mô tả chi tiết</label>
            <textarea rows={4} placeholder="Vui lòng mô tả tình trạng hư hỏng..." className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white"></textarea>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Ảnh hiện trạng (nếu có)</label>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-slate-50/50 dark:bg-slate-800/50">
                <svg className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="text-xs text-slate-400 font-medium">Kéo thả ảnh hoặc click để tải lên</p>
            </div>
          </div>
          <button className="w-full bg-slate-800 dark:bg-blue-600 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-slate-900 dark:hover:bg-blue-700 transition-all shadow-lg active:scale-95 uppercase tracking-widest">Gửi Yêu Cầu Sửa Chữa</button>
        </form>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Đặt Lịch Kỹ Thuật Đến</h3>
            <p className="text-xs text-slate-400 font-medium">Chọn ngày mong muốn</p>
          </div>
          <InteractiveCalendar onDateSelect={setSelectedDate} selectedDate={selectedDate} />
          {selectedDate && (
             <p className="mt-4 text-xs text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Lịch sửa chữa: {selectedDate.toLocaleDateString('vi-VN')}
             </p>
          )}
        </div>

        <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-xl shadow-emerald-500/20">
           <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest">Thời gian làm việc</h3>
              <span className="px-2 py-0.5 bg-emerald-500 rounded text-[10px] font-bold">LIVE</span>
           </div>
           <p className="text-2xl font-black mb-1">08:00 - 20:00</p>
           <p className="text-xs opacity-80 font-medium">Làm việc tất cả các ngày trong tuần</p>
        </div>
      </div>
    </div>
  );
};

export default TechnicalService;
