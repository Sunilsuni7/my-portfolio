import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
  const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

  // Base is '/' for Vercel, local preview and dev; '/my-portfolio/' for GitHub Pages CI runner
  const base = isVercel || (!isGitHubActions && (command === 'serve' || !process.env.CI))
    ? '/'
    : (isGitHubActions ? '/my-portfolio/' : '/');

  return {
    plugins: [react()],
    base,
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
              return 'three-vendor';
            }
            if (id.includes('node_modules/framer-motion')) {
              return 'framer-motion';
            }
          }
        }
      }
    }
  };
})
