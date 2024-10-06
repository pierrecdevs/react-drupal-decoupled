import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import JsonApiProvider from './contexts/JsonApiProvider.tsx'
import MovieProvider from './contexts/MovieProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JsonApiProvider>
      <MovieProvider>
        <App />
      </MovieProvider>
    </JsonApiProvider>
  </StrictMode>,
)
