import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class PageErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Page Error:', error, errorInfo);
        // Here you would send to error tracking service (Sentry, etc.)
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: undefined });
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
                        <p className="text-gray-600 mb-6">
                            We encountered an unexpected error. Please try refreshing the page.
                        </p>

                        {this.state.error && (
                            <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
                                <p className="text-sm font-mono text-gray-700 break-all">
                                    {this.state.error.message}
                                </p>
                            </div>
                        )}

                        <div className="flex space-x-3">
                            <button
                                onClick={this.handleReset}
                                className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>Try Again</span>
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="flex-1 flex items-center justify-center space-x-2 bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 font-semibold"
                            >
                                <Home className="w-4 h-4" />
                                <span>Go Home</span>
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
