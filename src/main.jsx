import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./authContext";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary"; // ✅ Add this line

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary> {/* ✅ Wrap entire app */}
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
