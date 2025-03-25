import { Campaign, UserSegment, AnalyticData } from '../types';
import { addDays, format } from 'date-fns';

export const campaigns: Campaign[] = [
  {
    id: '1',
    name: 'Spring Sale Newsletter',
    type: 'email',
    status: 'active',
    audience: 'Active Users',
    sentCount: 15000,
    openRate: 45.2,
    clickRate: 12.8,
    createdAt: '2024-03-15'
  },
  {
    id: '2',
    name: 'App Update Notification',
    type: 'push',
    status: 'completed',
    audience: 'All Users',
    sentCount: 25000,
    openRate: 38.5,
    clickRate: 8.4,
    createdAt: '2024-03-10'
  },
  {
    id: '3',
    name: 'Premium Feature Promotion',
    type: 'in-app',
    status: 'draft',
    audience: 'Free Users',
    sentCount: 0,
    openRate: 0,
    clickRate: 0,
    createdAt: '2024-03-18'
  }
];

export const segments: UserSegment[] = [
  {
    id: '1',
    name: 'Active Users',
    criteria: 'Activity in last 7 days',
    userCount: 25000,
    engagementRate: 68.5
  },
  {
    id: '2',
    name: 'At Risk',
    criteria: 'No activity in 14 days',
    userCount: 8500,
    engagementRate: 12.3
  },
  {
    id: '3',
    name: 'Premium Users',
    criteria: 'Subscribed users',
    userCount: 12000,
    engagementRate: 78.9
  }
];

export const analyticsData: AnalyticData[] = Array.from({ length: 7 }, (_, i) => ({
  date: format(addDays(new Date(), -i), 'MMM dd'),
  engagements: Math.floor(Math.random() * 1000) + 500,
  conversions: Math.floor(Math.random() * 200) + 50
})).reverse();