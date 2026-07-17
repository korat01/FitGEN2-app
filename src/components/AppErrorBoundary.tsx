import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App crash:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            background: '#0A0E1F',
            color: '#fff',
            padding: 24,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <h1 style={{ fontSize: 20, marginBottom: 12 }}>Erreur de chargement</h1>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              background: '#1E2335',
              padding: 16,
              borderRadius: 8,
              color: '#FF7D3B',
              fontSize: 13,
            }}
          >
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              marginTop: 16,
              padding: '10px 16px',
              borderRadius: 8,
              border: 'none',
              background: '#6B2AFF',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Recharger
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
