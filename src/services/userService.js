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
        console.error('Error en createUser:', error);
        throw error;
    }
};

// Login de usuario
export const loginUser = async (loginData) => {
    try {
      console.log(loginData)
        const response = await apiClient.post('/login', loginData);
        return response.data;
    } catch (error) {
        console.error('Error en loginUser:', error);
        throw error;
    }
};

// Obtener todos los usuarios
export const getAllUsers = async (token) => {
    try {
        const response = await apiClient.get('/users', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error en getAllUsers:', error);
        throw error;
    }
};

// Obtener un usuario por ID
export const getUserById = async (id, token) => {
    try {
        const response = await apiClient.get(`/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error en getUserById:', error);
        throw error;
    }
};

// Actualizar un usuario por ID
export const updateUser = async (id, userData, token) => {
    try {
        const response = await apiClient.put(`/users/${id}`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error en updateUser:', error);
        throw error;
    }
};

// Eliminar un usuario por ID
export const deleteUser = async (id, token) => {
    try {
        await apiClient.delete(`/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    } catch (error) {
        console.error('Error en deleteUser:', error);
        throw error;
    }
};

// Obtener datos del usuario
export const getUserInfo = async (id) => {
    try {
      const response = await api.get('/users/id'); // Asegúrate de que esta ruta devuelva la información del usuario, incluyendo el rol
      return response.data;
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
      throw error;
    }
  };