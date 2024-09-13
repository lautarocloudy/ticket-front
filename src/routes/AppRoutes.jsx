import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/LoginPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Aquí se agregarán más rutas en el futuro */}
      </Routes>
    </Router>
  </React.StrictMode>,
);
