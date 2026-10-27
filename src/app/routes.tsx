import {
  Link,
  Outlet,
  createRootRoute,
  createRoute,
  type AnyRoute,
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

export const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

// Every full path in the tree, built from each route's own path. The router sets fullPath
// only once it starts up, and the static build runs before that.
function allPaths(route: AnyRoute, parent = ""): string[] {
  const { path: ownPath } = route.options as { path?: string };
  const path = `${parent}/${ownPath ?? ""}`.replace(/\/+/g, "/").replace(/(.)\/$/, "$1");
  return [path, ...((route.children ?? []) as AnyRoute[]).flatMap((child) => allPaths(child, path))];
}

// "/" is the /app shell itself, and dynamic segments like "$id" need params, so skip both.
// Returns paths without the leading slash, e.g. "about".
export function appPaths(): string[] {
  return allPaths(routeTree)
    .filter((path) => path !== "/" && !path.includes("$"))
    .map((path) => path.slice(1));
}
