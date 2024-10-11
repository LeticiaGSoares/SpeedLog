import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './assets/pages/Login/Login'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
