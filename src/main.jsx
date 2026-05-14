import { createRoot } from 'react-dom/client';
import "./index.css";
import "./styles/base/variables.css";
import App from './App.tsx';

// 🔥 SUPPRESSION SERVICE WORKER
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => registration.unregister());
    });
}

createRoot(document.getElementById('root')).render(
    <App />
)
