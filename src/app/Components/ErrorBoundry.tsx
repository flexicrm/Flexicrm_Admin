import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Client-side error caught in ErrorBoundary:', error, errorInfo);
        // Log the component stack trace
        console.error('Component stack:', errorInfo.componentStack);
        // Optionally send error to a logging service like Sentry
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h1>Something went wrong.</h1>
                    <p>{this.state.error ? this.state.error.message : 'An unexpected error occurred.'}</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
