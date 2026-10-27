import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes";

// basepath makes every route live under /app, matching the Astro page at /app.
const router = createRouter({
  routeTree,
  basepath: "/app",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}
