import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/market-intelligence-studio-project/',
  plugins: [react(), tailwindcss()]
})
