import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/app/assets"),
      "@components": path.resolve(__dirname, "./src/app/components"),
      "@list": path.resolve(__dirname, "./src/app/list"),
      "@pages": path.resolve(__dirname, "./src/app/pages"),
      "@store": path.resolve(__dirname, "./src/app/store"),
    },
  },
  build: {
    sourcemap: true, // 🔥 add this line
  },
});
