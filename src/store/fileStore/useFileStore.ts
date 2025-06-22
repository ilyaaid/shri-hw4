import { normalizeStats, type AggregationStatsApi, type AggregationStatsModel } from '@models/AggregationStats';
import { useHistoryAnalyticsStore } from '@store/historyAnalyticsStore/useHistoryAnalyticsStore';
import { create } from 'zustand';

interface FileStore {
  file: File | null;
  fileStats: AggregationStatsModel | null;
  status: 'not' | 'invalid' | 'loaded' | 'parsing' | 'done';
  loadFile: (file: File) => void;
  destroy: () => void;
  parse: () => void;
}

export const useFileStore = create<FileStore>((set, get) => ({
  file: null,
  status: 'not',
  fileStats: null,

  loadFile(file: File) {
    let status: FileStore['status'] = 'invalid';
    const isValid = file.name.split('.').pop() === 'csv';
    if (isValid) {
      status = 'loaded';
    }
    set({ file, status });
  },

  async parse() {
    const file = get().file;
    if (!file) {
      return;
    }

    set({ status: 'parsing' });
    const formData = new FormData();
    formData.append('file', file);

    try {
      const resp = await fetch('http://localhost:3000/aggregate?rows=10000', {
        method: 'POST',
        body: formData,
      });

      if (!resp.body) {
        throw new Error('no support ReadableStream');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let isValidData = true;
      let cnt = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          set({ status: 'done' });
          break;
        }
        if (cnt === 0) {
          cnt++;
          continue;
        }

        const rawData = JSON.parse(decoder.decode(value));
        const normData = normalizeStats(rawData as AggregationStatsApi);
        // console.log(rawData, normData);
        if (normData) {
          set({ fileStats: normData });
        } else {
          isValidData = false;
          break;
        }
      }
      if (!isValidData) {
        throw new Error('invalid data in file');
      }

      useHistoryAnalyticsStore
        .getState()
        .addItem({ file, date: new Date().toString(), success: true, result: get().fileStats });
    } catch (err) {
      console.log('error: ', err);
      set({ status: 'invalid' });
      useHistoryAnalyticsStore.getState().addItem({ file, date: new Date().toString(), success: false, result: null });
    }
  },

  destroy() {
    set({ file: null, fileStats: null, status: 'not' });
  },
}));
