import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // Store Vite's dep-optimization cache in a host-mounted path
  // so it persists across container restarts and stays in sync.
  cacheDir: "/app/.vite-cache",

  server: {
    host: "0.0.0.0",   // expose inside the container network
    port: 5173,
    // Polling is required for file-watching inside Docker bind mounts
    watch: {
      usePolling: true,
      interval: 300,
    },
    hmr: {
      // Ensure HMR works through nginx proxy
      clientPort: 3060,
    },
    proxy: {
      "/api": {
        target: "http://backend:4000",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
  },
});
