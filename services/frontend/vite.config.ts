import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";


export default defineConfig({
  cacheDir: "/app/.vite-cache",


  server: {
    host: "0.0.0.0",
    port: 5173,


    watch: {
      usePolling: true,
      interval: 100,
    },


    hmr: {
      host: "localhost",
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
});