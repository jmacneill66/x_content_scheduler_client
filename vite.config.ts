import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';

export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        entry: 'src/ui/electron/main.ts',
      },
      {
        entry: 'src/ui/electron/preload.ts',
        onstart(options) {
          options.reload();
        }
      }
    ]),
    renderer(),
  ]
});