import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// One client-side app. Static hosts need a fallback that serves index.html
// for unknown paths; see README.md.
export default defineConfig({
  plugins: [react()],
  server: {
    // Forward Connect API calls to the Go server (cmd/musha-api, port 8080) so the browser sees one origin.
    proxy: {
      "/musha.v1.": {
        target: "http://localhost:8080",
      },
    },
  },
});
