import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: "local",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },

  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/app/assets"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css"],
  },
});
