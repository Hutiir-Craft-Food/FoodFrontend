import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// vite.config documentation: https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  const serverPort = process.env.VITE_SERVER_PORT || 8080
  const serverAddress = process.env.VITE_SERVER_ADDR || 'localhost'

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: `http://${serverAddress}:${serverPort}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\//, ''),
        },
      },
    },
    build: {
      outDir: 'dist',
    },
  })
}
