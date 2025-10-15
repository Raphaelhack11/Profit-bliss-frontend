// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./authContext";
import { Toaster } from "react-hot-toast";
import "./index.css";

function ErrorBoundary({ children }) {
  return (
    <React.Suspense fallback={<div>Loading app...</div>}>
      <ErrorCatcher>{children}</ErrorCatcher>
    </React.Suspense>
  );
}

class ErrorCatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-red-600 bg-white min-h-screen">
          <h2 className="text-2xl font-bold mb-4">⚠️ App crashed</h2>
          <pre className="text-sm whitespace-pre-wrap">
            {this.state.error?.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <App />
          <Toaster position="top-center" />
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
