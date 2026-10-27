import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// One client-side app. Static hosts need a fallback that serves index.html
// for unknown paths; see README.md.
export default defineConfig({
  plugins: [react()],
});
