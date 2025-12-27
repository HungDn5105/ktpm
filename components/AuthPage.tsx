
import React, { useState } from 'react';

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-200">
              A
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">
            {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
          </h2>
          <p className="text-slate-500 text-center mb-8 text-sm">
            {isLogin ? 'Vui lòng đăng nhập để quản lý chung cư của bạn' : 'Bắt đầu quản lý chung cư thông minh ngay hôm nay'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Họ và tên</label>
                <input required type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="Nguyễn Văn A" />
              </div>
            )}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <input required type="email" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="admin@chungcu.vn" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Mật khẩu</label>
              <input required type="password" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="••••••••" />
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-700">Quên mật khẩu?</button>
              </div>
            )}

            <button type="submit" className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95 mt-4">
              {isLogin ? 'Đăng Nhập' : 'Đăng Ký Tài Khoản'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 font-bold text-blue-600 hover:text-blue-700 focus:outline-none"
              >
                {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
