// NotFound.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            // Si hay token, redirige a la página de inicio
            navigate('/home');
        } else {
            // Si no hay token, redirige a la página de login
            navigate('/login');
        }
    }, [token, navigate]);

    return null;
};

export default NotFound;
