
import React, { useState } from 'react';

interface InteractiveCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate?: Date | null;
  busyDates?: string[]; // ISO Strings
}

const InteractiveCalendar: React.FC<InteractiveCalendarProps> = ({ onDateSelect, selectedDate, busyDates = [] }) => {
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  
  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const year = currentViewDate.getFullYear();
  const month = currentViewDate.getMonth();
  
  const prevMonth = () => setCurrentViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentViewDate(new Date(year, month + 1, 1));

  const totalDays = daysInMonth(month, year);
  const startDay = firstDayOfMonth(month, year);
  const monthName = new Intl.DateTimeFormat('vi-VN', { month: 'long' }).format(currentViewDate);

  const days = [];
  // Days from prev month
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-20 border-b border-r border-slate-100 bg-slate-50/30"></div>);
  }
  
  // Current month days
  for (let d = 1; d <= totalDays; d++) {
    const dateObj = new Date(year, month, d);
    const dateStr = dateObj.toISOString().split('T')[0];
    const isToday = new Date().toDateString() === dateObj.toDateString();
    const isSelected = selectedDate?.toDateString() === dateObj.toDateString();
    const isBusy = busyDates.includes(dateStr);

    days.push(
      <div 
        key={d} 
        onClick={() => !isBusy && onDateSelect(dateObj)}
        className={`h-20 border-b border-r border-slate-100 p-2 cursor-pointer transition-all hover:bg-blue-50 group relative
          ${isSelected ? 'bg-blue-100/50' : 'bg-white'}
          ${isBusy ? 'bg-slate-50 cursor-not-allowed' : ''}
        `}
      >
        <span className={`text-xs font-bold ${isSelected ? 'text-blue-600' : isToday ? 'text-blue-500 underline' : 'text-slate-500'}`}>
          {d}
        </span>
        {isBusy && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-100/80 transition-opacity">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Hết chỗ</span>
          </div>
        )}
        {isSelected && !isBusy && (
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">{monthName} {year}</h3>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-100">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => (
          <div key={d} className="py-2 text-center text-[10px] font-black text-slate-400 uppercase">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days}
      </div>
    </div>
  );
};

export default InteractiveCalendar;
