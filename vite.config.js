import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// server: {
//   proxy: {
//     "/forms": {
//       target: "https://docs.google.com",
//       changeOrigin: true,
//       secure: false,
//       ws: true,
//     },
//   },
// },
