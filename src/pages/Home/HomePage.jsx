import React, { useEffect, useState } from 'react';
import { getAllTickets, getTicketsByUserId } from '../../services/ticketService';
import { getUserInfoFromToken } from '../../utils/jwtUtils'; // Función para decodificar el token

const HomePage = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserAndTickets();
  }, []);

  const fetchUserAndTickets = async () => {
    const token = localStorage.getItem('token');

    try {
      if (!token) throw new Error('No hay token disponible');

      const userInfo = getUserInfoFromToken(token); // Decodifica el token y obtiene el rol
      if (!userInfo || !userInfo.userId || !userInfo.rol) throw new Error('No se pudo obtener la información del usuario');

      let allTickets = [];

      if (userInfo.rol === 'user') {
        const response = await getTicketsByUserId(userInfo.userId);
        allTickets = response || [];
      } else {
        const response = await getAllTickets();
        allTickets = response || [];
      }

      setTickets(allTickets);
    } catch (err) {
      setError('No se pudieron obtener los tickets');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Tickets</h1>
        </header>
        {error && <p className="text-red-500">{error}</p>}
        {tickets.length === 0 ? (
          <p className="text-gray-700">No hay tickets disponibles.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tickets.map(ticket => (
              <div key={ticket.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
                <h2 className="text-xl font-semibold text-gray-800">{ticket.name}</h2>
                <p className="text-gray-600">Estado: {ticket.status}</p>
                <p className="text-gray-600">Dificultad: {ticket.difficulty || 'No especificada'}</p>
                <p className="text-gray-600">Usuario: {ticket.user ? ticket.user.name : 'No disponible'}</p>
                {ticket.gif_url && (
                  <img src={ticket.gif_url} alt="Ticket GIF" className="w-full h-32 object-cover mt-4 rounded-md" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
