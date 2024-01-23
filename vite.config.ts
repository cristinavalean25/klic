import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

// vite.config.js
export default {
  server: {
    proxy: {
      "/api": "https://klic.immoflux.ro",
    },
  },
};
