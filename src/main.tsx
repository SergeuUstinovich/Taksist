import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./mockEnv.ts";
import "./styles/global/index.scss";
import StoreProviders from "./providers/StoreProvider/StoreProviders.tsx";
import { SDKProvider } from "@telegram-apps/sdk-react";
import { DEV_MODE } from "./config.ts";
import { queryClient } from "./api/queryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProviders>
      <SDKProvider acceptCustomStyles debug={DEV_MODE}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </SDKProvider>
    </StoreProviders>
  </React.StrictMode>
);
