import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "DropYY",
        short_name: "DropYY",
        description: "Send snaps to friends",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icon-192.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],

  server: {
    host: true,
    allowedHosts: [
      "holohedral-nonfluidly-lelah.ngrok-free.dev"
    ]
  }
})