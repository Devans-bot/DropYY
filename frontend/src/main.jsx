import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fontsource/rubik"; // defaults to weight 400
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/600.css";
import { registerSW } from 'virtual:pwa-register'
import { BrowserRouter } from 'react-router-dom'

registerSW()

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <App/>
  </BrowserRouter>
)
