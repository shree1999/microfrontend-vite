import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), federation({
    name: "ui",
    filename: "remoteEntry.js",
    exposes: {
      "./HelloWorld": "./src/components/HelloWorld.tsx",
    },
    shared: ["react", "react-dom"]
  })],
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    cssCodeSplit: false,
    minify: false
  }
})
