import React, { useEffect, useState } from 'react';
import { getAllTickets, getTicketsByUserId } from '../../services/ticketService';
import { getUserInfoFromToken } from '../../utils/jwtUtils'; // Función para decodificar el token
import TicketCard from '../../components/tickets/TicketCard';
import TicketEditModal from '../../components/modal/TicketEditModal';

const HomePage = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null); // Estado para el ticket seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetchUserAndTickets();
  }, []);

  const fetchUserAndTickets = async () => {
    const token = localStorage.getItem('token');

    try {
      if (!token) throw new Error('No hay token disponible');

      const userInfo = getUserInfoFromToken(token); // Decodifica el token y obtiene el rol
      if (!userInfo || !userInfo.userId || !userInfo.rol) throw new Error('No se pudo obtener la información del usuario');

      setUserRole(userInfo.rol)
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

  // Filtrar los tickets por estado (por ejemplo, si el estado es "pendiente" o "completado")
  const completedTickets = tickets.filter(ticket => ticket.status === 'completado');
  const pendingTickets = tickets.filter(ticket => ticket.status === 'pendiente');

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const handleUpdate = async () => {
    await fetchUserAndTickets(); // Actualiza la lista de tickets después de la edición
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Home</h1>
        </header>
        {error && <p className="text-red-500">{error}</p>}
        {tickets.length === 0 ? (
          <p className="text-gray-700">No hay tickets disponibles.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {/* Columna de Tickets Pendientes */}
            <div className="border p-4 rounded-lg shadow bg-white">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Tickets Pendientes</h2>
              {pendingTickets.length === 0 ? (
                <p className="text-gray-700">No hay tickets pendientes.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {pendingTickets.map(ticket => (
                    <div key={ticket.id} className="border-l-4 border-red-500 p-4 rounded-lg shadow-lg bg-red-50">
                      <TicketCard 
                        ticket={ticket} 
                        onClick={() => openModal(ticket)} // Pasa la función openModal
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Columna de Tickets Completados */}
            <div className="border p-4 rounded-lg shadow bg-white">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Tickets Realizados</h2>
              {completedTickets.length === 0 ? (
                <p className="text-gray-700">No hay tickets realizados.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {completedTickets.map(ticket => (
                    <div key={ticket.id} className="border-l-4 border-green-500 p-4 rounded-lg shadow-lg bg-green-50">
                      <TicketCard 
                        ticket={ticket} 
                        onClick={() => openModal(ticket)} // Pasa la función openModal
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {selectedTicket && (
          <TicketEditModal
            isOpen={isModalOpen}
            onClose={closeModal}
            ticket={selectedTicket}
            onUpdate={handleUpdate}
            userRole={userRole} 
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
