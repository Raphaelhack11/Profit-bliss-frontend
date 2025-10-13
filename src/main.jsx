import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/react";

// Initialize Sentry
Sentry.init({
  dsn: "https://db5a60c7e4e79b18641491f6e2094cce@o4510181188239360.ingest.us.sentry.io/4510181193089024",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
});

// Render app
const container = document.getElementById("root"); // make sure it matches your index.html
const root = ReactDOM.createRoot(container);

root.render(
  <Sentry.ErrorBoundary fallback={<p>⚠️ Something went wrong</p>}>
    <App />
  </Sentry.ErrorBoundary>
);
