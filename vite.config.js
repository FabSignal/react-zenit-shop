import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base pública para servir la app bajo /react-zenit-shop/ en GitHub Pages
  base: "/react-zenit-shop/",
});
