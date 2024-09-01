import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  const serverPort = process.env.SERVER_PORT || 8080
  const serverAddress = process.env.SERVER_ADDRESS || 'localhost'

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: `http://${serverAddress}:${serverPort}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/v1/, ''),
        },
      },
    },
    build: {
      outDir: 'dist',
    },
  })
}
