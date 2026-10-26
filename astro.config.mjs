// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Static output: the landing page and the /app shell are both prebuilt HTML,
// and the TanStack Router app takes over client-side under /app.
export default defineConfig({
  output: "static",
  integrations: [react()],
});
