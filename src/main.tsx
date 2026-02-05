import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Esto buscará automáticamente tu App.jsx en la misma carpeta
import './index.css'   // Esto cargará Tailwind

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

