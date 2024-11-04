import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), federation({
    name: 'mpm',
    filename: "remoteEntry.js",
    exposes: {
      "./HelloWorld": "./src/components/HelloWorld.vue",
    },
    shared: ["vue"]
  })],
  build: {
    target: 'esnext',
    cssCodeSplit: false,
    minify: false,
  },
  preview: {
    port: 4000,
  },
  server: {
    port: 4000,
  }
})
