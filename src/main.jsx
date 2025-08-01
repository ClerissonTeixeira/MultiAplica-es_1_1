import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes.jsx';
import './index.css';
import { TaskProvider } from './context/TaskContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaskProvider> {/* Envolve toda aplicação */}
      <App />
    </TaskProvider>
  </React.StrictMode>
);