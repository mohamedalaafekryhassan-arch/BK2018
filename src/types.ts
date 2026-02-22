export enum Role {
  CHEF = 'CHEF',
  CAPTAIN = 'CAPTAIN',
  CASHIER = 'CASHIER',
  STEWART = 'STEWART'
}

export interface Branch {
  id: string;
  name: string;
  nameEn: string;
  address: string;
  addressEn: string;
  type: 'Resi-Com' | 'Chillout' | '24 HOURS';
  hours: string;
  status: 'Active' | 'Inactive';
}

export interface Order {
  id: string;
  platform: 'Talabat' | 'Foodics' | 'Instagram' | 'Breadfast';
  branch: string;
  amount: number;
  timestamp: Date;
}

export interface Alert {
  id: string;
  type: 'Error' | 'Warning' | 'Info';
  message: string;
  messageEn: string;
  branch: string;
  timestamp: Date;
}

export type TabType = 'overview' | 'live' | 'branches' | 'financials' | 'operations' | 'market';
export type Language = 'ar' | 'en';
