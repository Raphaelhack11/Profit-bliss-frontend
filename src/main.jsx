import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./authContext";
import { Toaster } from "react-hot-toast";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/browser"; // ✅ FIXED import

// ✅ Initialize Sentry
Sentry.init({
  dsn: "https://db5a60c7e4e79b18641491f6e2094cce@o4510181188239360.ingest.us.sentry.io/4510181193089024",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0, // adjust as needed
  sendDefaultPii: true,
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

export default App; // ✅ Ensure App is exported for clarity
