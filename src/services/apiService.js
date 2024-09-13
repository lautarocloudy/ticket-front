import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Ajusta la URL según tu backend

// Función para iniciar sesión
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data; // Aquí puedes devolver el token o cualquier dato que necesites
  } catch (error) {
    throw error.response?.data || 'Error al iniciar sesión';
  }
};

// Función para verificar si el token es válido
export const verifyToken = (token) => {
  try {
    // Puedes agregar más lógica si es necesario
    return token && token.length > 0;
  } catch (error) {
    return false;
  }
};

// Función para obtener el token desde el localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem('token');
};
