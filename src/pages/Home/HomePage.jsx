import React, { useEffect, useState } from 'react';
import { deleteTicket, getTicketsByUserId } from '../../services/ticketService';
import { getUserInfoFromToken } from '../../utils/jwtUtils'; // Función para decodificar el token
import TicketCard from '../../components/tickets/TicketCard';
import TicketEditModal from '../../components/modal/TicketEditModal';
import TicketCreateModal from '../../components/modal/TicketCreateModal'; // Modal para crear tickets
import Navbar from '../../components/Navbar';

const HomePage = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserAndTickets();
  }, [isUpdateModalOpen, isCreateModalOpen]);

  const fetchUserAndTickets = async () => {
    const token = localStorage.getItem('token');

    try {
      if (!token) throw new Error('No hay token disponible');

      const userInfo = getUserInfoFromToken(token);
      if (!userInfo || !userInfo.userId) throw new Error('No se pudo obtener la información del usuario');

      const response = await getTicketsByUserId(userInfo.userId);
      setTickets(response || []);
    } catch (err) {
      setError('No se pudieron obtener los tickets');
      console.error(err);
    }
  };

  const completedTickets = tickets.filter(ticket => ticket.status === 'completado');
  const pendingTickets = tickets.filter(ticket => ticket.status === 'pendiente');

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsUpdateModalOpen(true);
  };

  const closeModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedTicket(null);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteTicket(ticketId);
      setTickets(tickets.filter(ticket => ticket.id !== ticketId));
    } catch (error) {
      setError('Error al eliminar el ticket');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen relative w-full"> {/* Ancho completo */}
    <Navbar />
      <div className="max-w-7xl mx-auto"> {/* Centrado y ancho máximo */}
        

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Columna de Tickets Pendientes */}
          <div className="border p-4 rounded-lg shadow bg-white overflow-y-auto">
            <h2 className="text-2xl font-bold text-black-700 mb-4">Tickets Pendientes</h2>
            {pendingTickets.length === 0 ? (
              <p className="text-gray-700">No hay tickets pendientes.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {pendingTickets.map(ticket => (
                  <div key={ticket.id}>
                    <TicketCard 
                      ticket={ticket} 
                      onClick={() => openModal(ticket)} 
                      onDelete={() => handleDeleteTicket(ticket.id)} 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Columna de Tickets Completados */}
          <div className="border p-4 rounded-lg shadow bg-white overflow-y-auto">
            <h2 className="text-2xl font-bold text-black-700 mb-4">Tickets Realizados</h2>
            {completedTickets.length === 0 ? (
              <p className="text-black-700">No hay tickets realizados.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {completedTickets.map(ticket => (
                  <div key={ticket.id}>
                    <TicketCard 
                      ticket={ticket} 
                      onClick={() => openModal(ticket)} 
                      onDelete={() => handleDeleteTicket(ticket.id)} 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedTicket && (
          <TicketEditModal
            isOpen={isUpdateModalOpen}
            onClose={closeModal}
            ticket={selectedTicket}
          />
        )}

        {isCreateModalOpen && (
          <TicketCreateModal 
            isOpen={isCreateModalOpen}
            onClose={closeCreateModal}
          />
        )}

        <button 
          onClick={openCreateModal}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default HomePage;
