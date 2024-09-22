import { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para acceder al contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Este useEffect asegura que cada vez que el token en localStorage cambie, actualizamos el estado
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken); // Almacena el token en localStorage
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Remueve el token de localStorage
    };

    const value = {
        token,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
