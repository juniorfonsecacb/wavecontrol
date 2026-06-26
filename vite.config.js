import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {},
  },
  // plugin to create a 404.html copy of index.html for SPA fallback on static hosts
  plugins: [
    react(),
    {
      name: 'spa-404-fallback',
      apply: 'build',
      closeBundle() {
        try {
          const dist = resolve(__dirname, 'dist')
          const index = resolve(dist, 'index.html')
          const target = resolve(dist, '404.html')
          if (fs.existsSync(index)) {
            const content = fs.readFileSync(index, 'utf8')
            fs.writeFileSync(target, content)
          }
        } catch (err) {
          // ignore
        }
      },
    },
  ],
})
