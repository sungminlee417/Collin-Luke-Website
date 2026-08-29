'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 animate-[fadeIn_400ms_ease-out]">
          <div className="text-center max-w-md">
            <div className="mb-8 animate-[popIn_400ms_cubic-bezier(0.34,1.56,0.64,1)_200ms_backwards]">
              <svg
                className="w-24 h-24 mx-auto text-muse-red dark:text-red-400 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01" />
              </svg>
            </div>

            <h1 className="text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 animate-[fadeIn_300ms_ease-out_300ms_backwards]">
              Something went wrong
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed animate-[fadeIn_300ms_ease-out_400ms_backwards]">
              We apologize for the inconvenience. Please try refreshing the page or contact us if the problem persists.
            </p>

            <div className="space-y-4 animate-[fadeIn_300ms_ease-out_500ms_backwards]">
              <button onClick={() => window.location.reload()} className="btn-primary w-full">
                Refresh Page
              </button>

              <button onClick={() => (window.location.href = '/')} className="btn-secondary w-full">
                Go Home
              </button>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-8 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    Show Error Details
                  </summary>
                  <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs text-gray-700 dark:text-gray-300 overflow-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}
