import { create } from 'zustand';

interface FileGeneratorStore {
  status: 'not' | 'generate' | 'done' | 'error';

  generate: () => void;
  destroy: () => void;
}

export const useFileGeneratorStore = create<FileGeneratorStore>((set) => ({
  status: 'not',

  async generate() {
    set({ status: 'generate' });

    const searchParams = new URLSearchParams({
      size: '0.01',
      withErrors: 'off',
      maxSpend: '1000',
    });
    try {
      const resp = await fetch(`http://localhost:3000/report?${searchParams.toString()}`);
      if (!resp.body) {
        throw new Error('no support ReadableStream');
      }

      const reader = resp.body.getReader();
      const chunks = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        chunks.push(value);
      }

      // сохранение файла клиенту
      const blob = new Blob(chunks);
      const urlObj = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlObj;
      a.download = 'report.csv';
      a.click();

      set({ status: 'done' });
    } catch (err) {
      console.log('error: ', err);
      set({ status: 'error' });
    }
  },

  destroy() {
    set({ status: 'not' });
  },
}));
