import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  define: {
    // Replace API URL for production
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'https://your-actual-backend-url.onrender.com'),
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
}); 