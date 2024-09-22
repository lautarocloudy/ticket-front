import axios from 'axios';

// Configuración de la URL base
const API_BASE_URL = import.meta.env.VITE_API_URL; 

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Crear un nuevo usuario
export const createUser = async (userData) => {
    try {
        const response = await apiClient.post('/users', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Login de usuario
export const loginUser = async (loginData) => {
    try {
        const response = await apiClient.post('/login', loginData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
