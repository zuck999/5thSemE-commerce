import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
      server: {
    host: "0.0.0.0", // Allows access from any device in the network
    port: 5173,      // Default port, you can change this if needed
    open: true,      // Opens the app in the default browser 
  },
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
