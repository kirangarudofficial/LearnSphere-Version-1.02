import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error to console in development
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        // You can also log to an error reporting service here
        // logErrorToService(error, errorInfo);

        this.setState({
            error,
            errorInfo,
        });
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default error UI
            return (
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-error-100 mb-6">
                                <AlertTriangle className="w-10 h-10 text-error-600" />
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                Oops! Something went wrong
                            </h1>

                            <p className="text-lg text-gray-600 mb-6">
                                We're sorry for the inconvenience. An unexpected error occurred.
                            </p>
                        </div>

                        {/* Error details (only in development) */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                    Error Details (Development Only):
                                </h3>
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <span className="font-medium text-gray-700">Error:</span>
                                        <div className="mt-1 text-error-600 font-mono text-xs bg-white p-3 rounded border border-error-200 overflow-auto">
                                            {this.state.error.toString()}
                                        </div>
                                    </div>
                                    {this.state.errorInfo && (
                                        <div className="text-sm">
                                            <span className="font-medium text-gray-700">Stack Trace:</span>
                                            <pre className="mt-1 text-xs bg-white p-3 rounded border border-gray-200 overflow-auto max-h-40 text-gray-600">
                                                {this.state.errorInfo.componentStack}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={this.handleReset}
                                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-primary-glow"
                                aria-label="Try again"
                            >
                                <RefreshCw className="w-5 h-5 mr-2" />
                                Try Again
                            </button>

                            <button
                                onClick={this.handleGoHome}
                                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200"
                                aria-label="Go to homepage"
                            >
                                <Home className="w-5 h-5 mr-2" />
                                Go to Homepage
                            </button>
                        </div>

                        {/* Help text */}
                        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                            <p className="text-sm text-gray-600">
                                If this problem persists, please{' '}
                                <a
                                    href="/support"
                                    className="text-primary-600 hover:text-primary-700 font-medium underline"
                                >
                                    contact support
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
