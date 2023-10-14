import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
// axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.baseURL = "https://moviebook-backend-api.vercel.app"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

