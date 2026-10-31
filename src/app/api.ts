import { createConnectTransport } from "@connectrpc/connect-web";
import { QueryClient } from "@tanstack/react-query";

// Requests go to the same origin. In dev, Vite proxies /musha.v1.* to the Go server (see vite.config.ts).
export const transport = createConnectTransport({
  baseUrl: "/",
});

export const queryClient = new QueryClient();
