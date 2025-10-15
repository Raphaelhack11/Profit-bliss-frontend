import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AuthProvider } from "./authContext";
import "./index.css";

// Error Boundary to catch crashes
class ErrorCatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error, info) {
    console.error("❌ Caught by ErrorBoundary:", error, info);
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-red-600 p-8">
          <h2 className="text-2xl font-bold mb-4">⚠️ App crashed</h2>
          <pre className="text-sm bg-white p-4 rounded-lg shadow overflow-auto w-full max-w-md">
            {this.state.error?.message || "Unknown error"}
          </pre>
          <p className="text-gray-500 mt-4">
            Check the console for detailed logs.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Mount the app
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorCatcher>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </BrowserRouter>
    </ErrorCatcher>
  </React.StrictMode>
);
