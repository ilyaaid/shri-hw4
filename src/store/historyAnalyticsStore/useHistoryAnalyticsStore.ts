import type { AggregationStatsModel } from '@models/AggregationStats';
import { create } from 'zustand';

interface HistoryItem {
  id: string;
  filename: string;
  date: string;
  success: boolean;
  result: AggregationStatsModel | null;
}

interface HistoryAnalyticsStore {
  history: HistoryItem[];
  addItem: (obj: { file: File; date: string; success: boolean; result: AggregationStatsModel | null }) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

function getInitialHistory(): HistoryAnalyticsStore['history'] {
  const lsData = localStorage.getItem(HISTORY_KEY);
  if (!lsData) {
    return [];
  }
  return JSON.parse(lsData);
}

const HISTORY_KEY = 'history';

function updateLS(history: HistoryItem[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export const useHistoryAnalyticsStore = create<HistoryAnalyticsStore>((set, get) => ({
  history: getInitialHistory(),

  addItem({ file, date, success, result }) {
    const history = get().history;
    history.push({ filename: file.name, id: Math.random().toString(), date, success, result });

    updateLS(history);
    set({ history });
  },

  removeItem(id: string) {
    const history = get().history.filter((item) => item.id !== id);
    set({ history });
    updateLS(history);
  },

  clear() {
    set({ history: [] });
    updateLS([]);
  },
}));
