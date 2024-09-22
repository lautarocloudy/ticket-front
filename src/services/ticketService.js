import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL; 
// Crear instancia de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configurar interceptor para agregar el token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Crear un nuevo ticket
export const createTicket = async (ticketData) => {
  try {
    const response = await api.post('/tickets', ticketData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar un ticket
export const updateTicket = async (id, ticketData) => {
  try {
    const response = await api.put(`/tickets/${id}`, ticketData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar un ticket
export const deleteTicket = async (id) => {
  try {
    const response = await api.delete(`/tickets/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener los tickets
export const getTicketsByUserId = async (userId, filters = {}) => {
  try {
    const response = await api.get(`/tickets/user/${userId}`, { params: filters });
    return response.data;
  } catch (error) {
    throw error;
  }
};
