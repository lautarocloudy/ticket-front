import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import LoginPage from '../pages/login/LoginPage';
import HomePage from '../pages/home/HomePage';
import TicketsInfo from '../pages/tickets/TicketInfo';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import NotFound from '../pages/notFound/NotFound';
import Navbar from '../components/Navbar';

const AppRoutes = () => {
    return (
        <AuthProvider>
            
            <Routes>
                {/* Rutas públicas: Solo accesibles si no hay token */}
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>

                {/* Rutas privadas: Solo accesibles si hay token válido */}
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/tickets-info" element={<TicketsInfo />} />
                </Route>

                {/* Ruta para manejar URLs incorrectas */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
    );
};

export default AppRoutes;
