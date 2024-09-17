import axios from 'axios';

// Crear instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia esto si tu API está en otro dominio o puerto
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

// Obtener todos los tickets
// export const getAllTickets = async () => {
//   try {
//     const response = await api.get('/tickets');
//     return response.data;
//   } catch (error) {
//     console.error('Error al obtener tickets:', error);
//     throw error;
//   }
// };
export const getAllTickets = async (filters = {}) => {
  try {
    // Desestructurar filtros para construir la query string
    const { status, difficulty, startDate, endDate } = filters;
    
    // Construir la query string
    let query = '';
    if (status) query += `status=${status}&`;
    if (difficulty) query += `difficulty=${difficulty}&`;
    if (startDate) query += `startDate=${startDate}&`;
    if (endDate) query += `endDate=${endDate}&`;
    
    // Eliminar el último '&' si existe
    query = query ? query.slice(0, -1) : '';
    
    // Realizar la solicitud GET con los filtros
    const response = await api.get(`/tickets?${query}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener tickets:', error);
    throw error;
  }
};

// Crear un nuevo ticket
export const createTicket = async (ticketData) => {
  try {
    const response = await api.post('/tickets', ticketData);
    return response.data;
  } catch (error) {
    console.error('Error al crear ticket:', error);
    throw error;
  }
};

// Actualizar un ticket
export const updateTicket = async (id, ticketData) => {
  try {
    const response = await api.put(`/tickets/${id}`, ticketData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar ticket:', error);
    throw error;
  }
};

// Eliminar un ticket
export const deleteTicket = async (id) => {
  try {
    const response = await api.delete(`/tickets/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar ticket:', error);
    throw error;
  }
};

// Obtener todos los tickets de un usuario específico
// export const getTicketsByUserId = async (userId) => {
//   try {
//     const response = await api.get(`/tickets/user/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error al obtener tickets del usuario:', error);
//     throw error;
//   }
// };
export const getTicketsByUserId = async (userId, filters = {}) => {
  try {
    const response = await api.get(`/tickets/user/${userId}`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error al obtener tickets por usuario:', error);
    throw error;
  }
};