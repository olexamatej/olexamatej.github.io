import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'docs',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: 'index.html',
        writeups: 'writeups.html',
        blogs: 'index-blogs.html',
        projects: 'index-projects.html',
      }
    }
  },
  publicDir: 'public',
  assetsInclude: ['**/*.md'],
})
