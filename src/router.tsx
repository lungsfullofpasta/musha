import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { Landing } from "./pages/Landing";
import { AppLayout } from "./app/AppLayout";
import { AppHome } from "./app/AppHome";
import { AppAbout } from "./app/AppAbout";

// The one list of routes. The landing page sits at "/". The app sits under "/app"
// and shows its nav through the layout route, which the landing page does not use.
const rootRoute = createRootRoute();

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Landing,
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: AppLayout,
});

const appHomeRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/",
  component: AppHome,
});

const appAboutRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/about",
  component: AppAbout,
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  appRoute.addChildren([appHomeRoute, appAboutRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
