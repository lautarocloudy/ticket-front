// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import Dashboard from '../pages/dashboard';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} /> {/* Asegúrate de crear este componente */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
