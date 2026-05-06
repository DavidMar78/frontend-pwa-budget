import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/base/variables.css";
import App from './App.tsx'

// 🔥 SUPPRESSION SERVICE WORKER
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => registration.unregister());
    });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
