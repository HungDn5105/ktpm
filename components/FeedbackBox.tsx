
import React, { useState } from 'react';

const FeedbackBox: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 mb-6 shadow-xl shadow-blue-500/10">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        </div>
        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Cảm ơn góp ý của bạn!</h3>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
          Mỗi đóng góp của cư dân đều giúp chất lượng tòa nhà được nâng cao. Ban quản lý sẽ phản hồi ý kiến của bạn sớm nhất.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-900/20"
        >
          Viết thêm góp ý khác
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Đóng Góp Ý Kiến</h3>
          <p className="text-slate-400 text-sm mb-8 font-medium">Mọi ý kiến của bạn sẽ giúp ApartManager xây dựng một cộng đồng tốt đẹp hơn.</p>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase ml-1">Chủ đề góp ý</label>
              <input type="text" placeholder="Vệ sinh, bảo vệ, tiện ích..." className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase ml-1">Nội dung chi tiết</label>
              <textarea rows={6} placeholder="Hãy cho chúng tôi biết suy nghĩ của bạn..." className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white"></textarea>
            </div>
            <div className="flex items-center gap-3 ml-1">
                <input type="checkbox" id="anonymous" className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="anonymous" className="text-sm font-bold text-slate-600 dark:text-slate-400 cursor-pointer">Gửi dưới danh nghĩa ẩn danh</label>
            </div>
            <button className="bg-blue-600 text-white px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-900/20 flex items-center gap-2 uppercase tracking-widest">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              Gửi Phản Hồi Ngay
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Trạng Thái Xử Lý</h3>
          <div className="space-y-4">
            <FeedbackStatus title="Cải thiện đèn chiếu sáng hành lang" date="12/05/2024" status="done" />
            <FeedbackStatus title="Vấn đề đỗ xe trái phép tại hầm B2" date="10/05/2024" status="processing" />
            <FeedbackStatus title="Tổ chức ngày hội thiếu nhi 1/6" date="08/05/2024" status="received" />
          </div>
          <button className="w-full mt-6 py-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">Xem lịch sử đóng góp của tôi</button>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30">
           <h3 className="text-sm font-bold text-amber-800 dark:text-amber-400 mb-2">Tại sao nên góp ý?</h3>
           <p className="text-[11px] text-amber-700 dark:text-amber-500 leading-relaxed font-medium">
             Chúng tôi luôn lắng nghe mọi phản hồi của cư dân để cải thiện quy trình vận hành tòa nhà.
           </p>
        </div>
      </div>
    </div>
  );
};

const FeedbackStatus = ({ title, date, status }: { title: string; date: string; status: 'done' | 'processing' | 'received' }) => (
  <div className="p-3 border border-slate-50 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
    <div className="flex justify-between items-start mb-1">
      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{title}</h4>
      <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${status === 'done' ? 'bg-emerald-500' : status === 'processing' ? 'bg-blue-500' : 'bg-slate-300'}`}></span>
    </div>
    <div className="flex justify-between items-center">
      <p className="text-[10px] text-slate-400">{date}</p>
      <p className={`text-[10px] font-bold uppercase tracking-tighter ${status === 'done' ? 'text-emerald-500' : status === 'processing' ? 'text-blue-500' : 'text-slate-500'}`}>
        {status === 'done' ? 'Đã xử lý' : status === 'processing' ? 'Đang xử lý' : 'Chờ duyệt'}
      </p>
    </div>
  </div>
);

export default FeedbackBox;
