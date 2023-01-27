import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerErrorOverlay } from "./utils/errorOverlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// add additional info to the vite error overlay
registerErrorOverlay();

// setup msw to mock requests
if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start();
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
