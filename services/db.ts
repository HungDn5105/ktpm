
import { FeeItem, Resident, AppNotification, PaymentStatus, Activity, PoolTicket, UserAccount } from '../types';

const STORAGE_KEYS = {
  FEES: 'apt_manager_fees',
  RESIDENTS: 'apt_manager_residents',
  NOTIFS: 'apt_manager_notifications',
  ACTIVITIES: 'apt_manager_activities',
  TICKETS: 'apt_manager_pool_tickets',
  CURRENT_USER: 'apt_manager_current_user'
};

const mockFees: FeeItem[] = [
  { id: '1', apartmentId: 'A-101', residentName: 'Nguyễn Văn A', month: '05', year: 2024, managementFee: 500000, electricity: 1250000, water: 300000, parking: 100000, total: 2150000, status: PaymentStatus.PAID, dueDate: '2024-05-10' },
  { id: '2', apartmentId: 'A-102', residentName: 'Trần Thị B', month: '05', year: 2024, managementFee: 500000, electricity: 850000, water: 200000, parking: 100000, total: 1650000, status: PaymentStatus.PENDING, dueDate: '2024-05-10' },
  { id: '3', apartmentId: 'B-205', residentName: 'Lê Văn C', month: '05', year: 2024, managementFee: 700000, electricity: 2100000, water: 450000, parking: 200000, total: 3450000, status: PaymentStatus.OVERDUE, dueDate: '2024-05-05' },
];

const mockResidents: Resident[] = [
  { id: '1', apartmentId: 'A-101', name: 'Nguyễn Văn A', phone: '0901234567', email: 'a.nguyen@gmail.com', memberCount: 4, entryDate: '2023-01-15', status: 'active' },
  { id: '2', apartmentId: 'A-102', name: 'Trần Thị B', phone: '0988777666', email: 'b.tran@gmail.com', memberCount: 2, entryDate: '2023-05-20', status: 'active' },
  { id: '3', apartmentId: 'B-205', name: 'Lê Văn C', phone: '0911223344', email: 'c.le@gmail.com', memberCount: 5, entryDate: '2022-11-10', status: 'temporary' },
];

export const LocalDB = {
  getFees: (): FeeItem[] => {
    const data = localStorage.getItem(STORAGE_KEYS.FEES);
    return data ? JSON.parse(data) : (localStorage.setItem(STORAGE_KEYS.FEES, JSON.stringify(mockFees)), mockFees);
  },
  saveFees: (fees: FeeItem[]) => localStorage.setItem(STORAGE_KEYS.FEES, JSON.stringify(fees)),

  getResidents: (): Resident[] => {
    const data = localStorage.getItem(STORAGE_KEYS.RESIDENTS);
    return data ? JSON.parse(data) : (localStorage.setItem(STORAGE_KEYS.RESIDENTS, JSON.stringify(mockResidents)), mockResidents);
  },
  saveResidents: (residents: Resident[]) => localStorage.setItem(STORAGE_KEYS.RESIDENTS, JSON.stringify(residents)),
  
  getCurrentUser: (): UserAccount | null => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },
  setCurrentUser: (user: UserAccount | null) => {
    if (user) localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getActivities: (): Activity[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return data ? JSON.parse(data) : [];
  },

  getNotifications: (): AppNotification[] => {
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFS);
    return data ? JSON.parse(data) : [];
  },

  getPoolTickets: (): PoolTicket[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TICKETS);
    return data ? JSON.parse(data) : [];
  }
};
