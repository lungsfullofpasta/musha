import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <div style={{ maxWidth: "40rem", margin: "4rem auto", padding: "0 1rem", fontFamily: "system-ui, sans-serif" }}>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <h1>App home</h1>,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => <p>This internal app runs on TanStack Router.</p>,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

// Sub-paths the static build should pre-render, so deep links work without a fallback.
export const appPaths = ["about"];

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
