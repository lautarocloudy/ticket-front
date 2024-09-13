import axios from 'axios';

// Configuración base de la API
const api = axios.create({
  baseURL: 'http://localhost:3000', // Cambia esto si tu API está en otro dominio o puerto
  headers: {
    'Content-Type': 'application/json',
    // Agrega aquí cualquier header adicional, como el token de autenticación
  },
});

// Obtener todos los tickets
export const getAllTickets = async () => {
  try {
    const response = await api.get('/tickets');
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
export const getTicketsByUserId = async (userId) => {
    try {
      const response = await api.get(`/tickets/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener tickets del usuario:', error);
      throw error;
    }
  };
  