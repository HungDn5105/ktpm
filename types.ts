
export enum PaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE'
}

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'resident';
  apartmentId?: string;
  avatar?: string;
}

export interface FeeItem {
  id: string;
  apartmentId: string;
  residentName: string;
  month: string;
  year: number;
  managementFee: number;
  electricity: number;
  water: number;
  parking: number;
  total: number;
  status: PaymentStatus;
  dueDate: string;
}

export interface Resident {
  id: string;
  apartmentId: string;
  name: string;
  phone: string;
  email: string;
  memberCount: number;
  entryDate: string;
  status: 'active' | 'temporary' | 'absent';
}

export interface AppNotification {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'info' | 'warning' | 'maintenance' | 'success';
}

export interface Activity {
  id: string;
  title: string;
  category: 'sports' | 'community' | 'maintenance' | 'event';
  date: string;
  time: string;
  location: string;
  description: string;
}

export interface PoolTicket {
  id: string;
  apartmentId: string;
  residentName: string;
  date: string;
  slot: 'morning' | 'afternoon' | 'evening';
  adultCount: number;
  childCount: number;
  status: 'confirmed' | 'used' | 'cancelled';
}
