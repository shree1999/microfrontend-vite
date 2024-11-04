import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), federation({
    name: "host",
    remotes: {
      ui: "http://localhost:3000/assets/remoteEntry.js",
      mpm: "http://localhost:4000/assets/remoteEntry.js",
    },
    shared: ["vue", "react-dom", "react"],
  })],
  preview: {
    port: 9000,
    open: true
  },
  build: {
    target: 'esnext',
    cssCodeSplit: false,
    minify: false,
  }
})
