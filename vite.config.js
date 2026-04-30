import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      // fichiers copiés tels quels
      includeAssets: ['icon.png'],

      // identité de ton app
      manifest: {
        name: 'Budget App',
        short_name: 'Budget',
        theme_color: '#000000',
        icons: [
          {
            src: '/icon.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },

      // ⚠️ PARTIE CRITIQUE
      workbox: {
        runtimeCaching: [
          {
            // attrape toutes les requêtes vers ton API
            urlPattern: ({ url }) => url.pathname.includes('expenses'),

            // ne JAMAIS utiliser le cache pour ça
            handler: 'NetworkOnly'
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/expenses': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})