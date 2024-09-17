// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import HomePage from '../pages/Home/HomePage';
import TicketsInfo from '../pages/tickets/TicketInfo';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} /> {/* Asegúrate de crear este componente */}
                <Route path="/tickets-info" element={<TicketsInfo />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
