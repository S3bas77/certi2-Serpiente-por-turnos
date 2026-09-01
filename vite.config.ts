import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/certi2-Serpiente-por-turnos/' : '/',
  plugins: [react()],
}))