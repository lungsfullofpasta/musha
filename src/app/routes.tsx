import { Link, Outlet, createRootRoute, createRoute } from "@tanstack/react-router";

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

// The one list of app routes. The router and the static build both read it.
const appRoutes = [
  { path: "/", component: () => <h1>App home</h1> },
  { path: "/about", component: () => <p>This internal app runs on TanStack Router.</p> },
];

export const routeTree = rootRoute.addChildren(
  appRoutes.map(({ path, component }) => createRoute({ getParentRoute: () => rootRoute, path, component })),
);

// Paths the static build pre-renders, without the leading slash. "/" is the /app shell
// itself, so it is skipped. Dynamic routes like "$id" can't be listed without params.
export const appPaths = appRoutes.map(({ path }) => path).filter((path) => path !== "/").map((path) => path.slice(1));
