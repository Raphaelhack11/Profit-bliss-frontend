import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("🚨 App crashed:", error, info);
    this.setState({ errorInfo: info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#fff",
            backgroundColor: "#121212",
            minHeight: "100vh",
            fontFamily: "monospace",
          }}
        >
          <h2 style={{ color: "#ff4c4c" }}>⚠️ Application Error</h2>
          <p style={{ marginBottom: "20px", fontSize: "16px" }}>
            {this.state.error?.message || "Unknown error occurred"}
          </p>

          {this.state.errorInfo && (
            <details style={{ whiteSpace: "pre-wrap", textAlign: "left", margin: "0 auto", maxWidth: "90%" }}>
              <summary>View stack trace</summary>
              <p>{this.state.error?.stack}</p>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
