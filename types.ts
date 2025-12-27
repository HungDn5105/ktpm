
export enum PaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE'
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

export interface Stats {
  totalRevenue: number;
  pendingAmount: number;
  paidCount: number;
  pendingCount: number;
  overdueCount: number;
}
