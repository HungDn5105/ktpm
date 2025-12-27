
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, color }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
        <div className="text-right">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{title}</p>
          <h4 className="text-2xl font-bold text-slate-800 mt-1">{value}</h4>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-slate-500 text-sm">
        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <span>{trend}</span>
      </div>
    </div>
  );
};

export default StatCard;
