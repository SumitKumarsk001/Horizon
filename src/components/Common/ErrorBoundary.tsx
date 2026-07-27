import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error Boundary:", error);
    console.error(errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-center dark:border-red-600 dark:bg-red-950">
          <h2 className="text-lg font-bold text-red-600">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            This section crashed but the rest of the page is still working.
          </p>

          <button
            onClick={this.handleRetry}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;