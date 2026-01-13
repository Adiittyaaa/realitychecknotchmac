
import React from 'react';
import { LayoutDashboard, Target, BarChart3, Settings2 } from 'lucide-react';
import { AppView } from './types';

export const COLORS = {
  bg: '#1A1A1A',
  accent: '#6366F1', // Soft Violet
  warning: '#F59E0B', // Warm Amber
  textMuted: '#9CA3AF',
  textLight: '#F9F9F9',
};

export const NAVIGATION = [
  { id: AppView.DASHBOARD, label: 'Overview', icon: <LayoutDashboard size={18} /> },
  { id: AppView.INTENT, label: 'Intent', icon: <Target size={18} /> },
  { id: AppView.REPORT, label: 'Weekly', icon: <BarChart3 size={18} /> },
  { id: AppView.INTEGRATIONS, label: 'Connect', icon: <Settings2 size={18} /> },
];
