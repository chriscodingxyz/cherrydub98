import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="window">
          <div className="title-bar">
            <div className="title-bar-text">
              <img
                className="pr-1"
                src="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png"
                alt="Error"
                width="20px"
              />
              System Error
            </div>
          </div>
          <div className="window-body">
            <div className="flex items-center p-4">
              <img
                src="https://win98icons.alexmeub.com/icons/png/msg_error-0.png"
                alt="Error"
                width="32px"
                className="mr-3"
              />
              <div>
                <p className="font-bold mb-2">An error has occurred</p>
                <p className="text-sm">
                  The application has encountered an unexpected error and needs to close this window.
                </p>
                {process.env.NODE_ENV === "development" && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-blue-600">
                      Show error details
                    </summary>
                    <pre className="text-xs mt-2 p-2 bg-gray-100 overflow-auto">
                      {this.state.error?.toString()}
                    </pre>
                  </details>
                )}
              </div>
            </div>
            <div className="flex justify-end p-2">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-4 py-1"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;