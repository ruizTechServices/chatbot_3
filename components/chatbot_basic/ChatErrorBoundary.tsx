/**
 * ChatErrorBoundary
 * Catches errors in the chatbot UI and displays a fallback.
 */
'use client';
import React from 'react';

interface ChatErrorBoundaryProps {
  children: React.ReactNode;
}

interface ChatErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ChatErrorBoundary extends React.Component<ChatErrorBoundaryProps, ChatErrorBoundaryState> {
  constructor(props: ChatErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log error to monitoring service if needed
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-700 bg-red-50 border rounded">
          <h2 className="font-bold mb-2">Something went wrong.</h2>
          <pre className="text-xs whitespace-pre-wrap">{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
