import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Cambia esto según tu backend

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data; // Suponiendo que el backend devuelve { token, user }
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const getTickets = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/tickets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getTicketById = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/tickets/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addTicket = async (ticket) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/tickets`, ticket, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTicket = async (id, ticket) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/tickets/${id}`, ticket, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteTicket = async (id) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/tickets/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
