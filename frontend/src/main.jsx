import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fontsource/rubik"; // defaults to weight 400
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/600.css";

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <App/>
  </BrowserRouter>
)
