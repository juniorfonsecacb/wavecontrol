import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ColaboradoresProvider } from './context/ColaboradoresContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ColaboradoresProvider>
        <App />
      </ColaboradoresProvider>
    </BrowserRouter>
  </StrictMode>,
)
