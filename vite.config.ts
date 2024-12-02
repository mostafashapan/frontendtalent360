import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@fullcalendar/core/main.css': 'node_modules/@fullcalendar/core/main.css',
      '@fullcalendar/daygrid/main.css': 'node_modules/@fullcalendar/daygrid/main.css',
      '@fullcalendar/timegrid/main.css': 'node_modules/@fullcalendar/timegrid/main.css',
    },
  },
});
