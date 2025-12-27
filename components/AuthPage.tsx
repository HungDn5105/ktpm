
import React, { useState } from 'react';
import { LocalDB } from '../services/db';
import { UserAccount } from '../types';

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    apartmentId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mock user session
    const user: UserAccount = {
      id: Date.now().toString(),
      email: formData.email,
      name: isLogin ? (formData.email.split('@')[0]) : formData.name,
      role: 'resident',
      apartmentId: formData.apartmentId
    };
    
    LocalDB.setCurrentUser(user);
    onLogin();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
          <div className="p-8 md:p-12">
            <div className="flex justify-center mb-10">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl shadow-blue-500/40 transform rotate-3 hover:rotate-0 transition-transform">
                A
              </div>
            </div>
            
            <h2 className="text-3xl font-black text-white text-center mb-2 tracking-tight">
              {isLogin ? 'Chào mừng bạn' : 'Gia nhập cộng đồng'}
            </h2>
            <p className="text-slate-400 text-center mb-10 text-sm font-medium">
              {isLogin ? 'Quản lý căn hộ thông minh hơn mỗi ngày' : 'Khởi tạo tài khoản cư dân cho tòa nhà của bạn'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Họ và tên</label>
                    <input name="name" onChange={handleInputChange} required type="text" className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-white placeholder-slate-600" placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mã căn hộ (Ví dụ: A-101)</label>
                    <input name="apartmentId" onChange={handleInputChange} required type="text" className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-white placeholder-slate-600" placeholder="A-101" />
                  </div>
                </>
              )}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email liên lạc</label>
                <input name="email" onChange={handleInputChange} required type="email" className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-white placeholder-slate-600" placeholder="cu-dan@apart.vn" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mật khẩu bảo mật</label>
                <input name="password" onChange={handleInputChange} required type="password" className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-white placeholder-slate-600" placeholder="••••••••" />
              </div>

              <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-900/40 transition-all active:scale-[0.98] mt-4 uppercase tracking-widest text-sm">
                {isLogin ? 'Đăng Nhập Ngay' : 'Tạo Tài Khoản'}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <p className="text-slate-500 text-sm font-medium">
                {isLogin ? 'Chưa có tài khoản cư dân?' : 'Đã có tài khoản trước đó?'}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 font-black text-blue-400 hover:text-blue-300 focus:outline-none"
                >
                  {isLogin ? 'Đăng ký' : 'Đăng nhập'}
                </button>
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-slate-600 text-xs font-bold uppercase tracking-[0.2em]">
          &copy; 2024 ApartManager System
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
