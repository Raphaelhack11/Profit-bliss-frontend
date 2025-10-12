import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("🚨 App crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "white",
            background: "#1e1e1e",
            minHeight: "100vh",
          }}
        >
          <h2 style={{ color: "red" }}>⚠️ App Error</h2>
          <p>{this.state.error?.message || "Unknown error occurred"}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
