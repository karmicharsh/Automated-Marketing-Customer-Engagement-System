export interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'push' | 'in-app';
  status: 'draft' | 'active' | 'completed';
  audience: string;
  sentCount: number;
  openRate: number;
  clickRate: number;
  createdAt: string;
  content: string;
  subject?: string;
  schedule?: {
    startDate: string;
    frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  };
  triggers?: {
    event: string;
    condition: string;
  }[];
}

export interface UserSegment {
  id: string;
  name: string;
  criteria: string;
  userCount: number;
  engagementRate: number;
}

export interface AnalyticData {
  date: string;
  engagements: number;
  conversions: number;
}

export interface CampaignFormData {
  name: string;
  type: 'email' | 'push' | 'in-app';
  audience: string;
  content: string;
  subject?: string;
  schedule?: {
    startDate: string;
    frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  };
  triggers?: {
    event: string;
    condition: string;
  }[];
}