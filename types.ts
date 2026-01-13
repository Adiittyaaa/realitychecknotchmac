
export enum AppView {
  DASHBOARD = 'dashboard',
  INTENT = 'intent',
  REPORT = 'report',
  INTEGRATIONS = 'integrations'
}

export enum FocusStatus {
  FOCUSED = 'Focused',
  DRIFTING = 'Drifting',
  IDLE = 'Idle'
}

export interface FocusStats {
  planned: number;
  actual: number;
  gap: number;
}

export interface IntentState {
  deepWork: number;
  shallowWork: number;
  learning: number;
  projectContext: string;
  isCommitted: boolean;
}

export interface DistractionItem {
  id: string;
  name: string;
  time: string;
  category: string;
}

export interface Insight {
  type: 'positive' | 'neutral' | 'warning';
  text: string;
}
