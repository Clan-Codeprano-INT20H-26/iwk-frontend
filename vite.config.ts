import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    include: ['react-hot-toast'],
  },
});
