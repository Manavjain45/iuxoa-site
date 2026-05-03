import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, info: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    this.setState({ info })
    console.error('App crashed:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#0a0a0a', color: '#fff',
          fontFamily: 'Inter, monospace', padding: '2rem',
        }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#FF4D2D' }}>
            ⚠ App Crashed
          </h1>
          <pre style={{
            background: '#1a1a1a', border: '1px solid #333',
            borderRadius: '8px', padding: '1.5rem',
            maxWidth: '90vw', overflowX: 'auto',
            fontSize: '0.8rem', color: '#ff8c6b',
            whiteSpace: 'pre-wrap', wordBreak: 'break-word',
          }}>
            {String(this.state.error)}
            {'\n\n'}
            {this.state.info?.componentStack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1.5rem', padding: '0.75rem 2rem',
              background: '#FF4D2D', color: '#fff', border: 'none',
              borderRadius: '999px', cursor: 'pointer', fontWeight: 700,
              fontSize: '0.9rem',
            }}
          >
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
