import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#020817] px-4 text-white">
          <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-[#051522]/60 backdrop-blur-xl border border-white/5 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
            <div className="flex justify-center">
              <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20 text-red-500 animate-bounce">
                <AlertTriangle className="h-10 w-10" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">Oops! Something went wrong</h1>
              <p className="text-sm text-gray-400">
                An unexpected runtime error occurred. Our team has been notified.
              </p>
            </div>

            {this.state.error && (
              <div className="p-4 bg-white/5 rounded-lg text-left text-xs font-mono overflow-auto max-h-40 border border-white/5 text-red-300">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={this.handleReload}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <RefreshCw className="h-4 w-4" />
                Reload Page
              </Button>
              <Button
                onClick={this.handleGoHome}
                variant="secondary"
                className="flex-1 bg-[#1e293b] hover:bg-[#334155] border border-white/10 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
