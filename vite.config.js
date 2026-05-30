import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project page is served from /poliouiux/
export default defineConfig({
  base: '/poliouiux/',
  plugins: [react()],
})
