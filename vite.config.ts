import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ isPreview }) => ({
  base: '/',
  appType: isPreview ? 'mpa' : 'spa',
  plugins: [react(), tailwindcss()],
}))
