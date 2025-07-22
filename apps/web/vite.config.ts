import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import legacy from '@vitejs/plugin-legacy'
import VitePluginBrowserSync from 'vite-plugin-browser-sync'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), '')

  // Base path for GitHub Pages deployment
  // Use root path for development and repository name for production
  const base = mode === 'production' ? '/' : '/'

  // const isDebugMode: boolean = Boolean(environment.DEBUG ?? false)
  const serverPort: number = Number(environment.PORT ?? 3000)
  // const API_URL = environment.VITE_API_URL ?? 'http://localhost:3000'

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      tsconfigPaths({
        root: './',
        projects: ['tsconfig.app.json'],
      }),
      legacy({
        // targets: ['defaults', 'not IE 11'], // its in browserlist option in packgae.json
      }),
      VitePluginBrowserSync({
        dev: {
          bs: {
            port: serverPort + 11,
          },
        },
      }),
    ],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    // server: {
    //   ...(mode === 'development' && {
    //     proxy: {
    //       // Proxy API requests to the server during development
    //       '/api': {
    //         target: `http://localhost:${serverPort.toString()}`,
    //         changeOrigin: true,
    //         secure: false,
    //         ws: true,
    //         ...(isDebugMode && {
    //           configure: (proxy, _options): void => {
    //             proxy.on('error', (err, _req, _res) => {
    //               console.log('proxy error', err)
    //             })
    //             proxy.on('proxyReq', (_proxyReq, req, _res) => {
    //               console.log('Sending Request to the Target:', req.method, req.url)
    //             })
    //             proxy.on('proxyRes', (proxyRes, req, _res) => {
    //               console.log('Received Response from the Target:', proxyRes.statusCode, req.url)
    //             })
    //           },
    //         }),
    //       },
    //     },
    //   }),
    // },
  }
})
