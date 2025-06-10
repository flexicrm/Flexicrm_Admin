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
<<<<<<< HEAD
                    <p>{this.state.error?.message}</p>
=======
                    <p>{this.state.error ? this.state.error.message : 'An unexpected error occurred.'}</p>
>>>>>>> 515aa308cdc3c2b9eacb6e32836cf7f26a350e82
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
