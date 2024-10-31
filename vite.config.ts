import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {configDefaults} from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'load-svg',
    enforce: 'pre'
  },],
  test: {
    env: {
      "process.env.NODE_ENV": `"test"`
    },
    globals: true,
    environment: "jsdom",
    open: false,
    setupFiles: ["./src/setupTests.ts"]
  }
})
