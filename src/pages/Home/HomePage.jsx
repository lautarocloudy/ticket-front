import React, { useEffect, useState } from 'react';
import { deleteTicket, getTicketsByUserId } from '../../services/ticketService';
import { getUserInfoFromToken } from '../../utils/jwtUtils';
import TicketCard from '../../components/tickets/TicketCard';
import TicketEditModal from '../../components/modal/TicketEditModal';
import TicketCreateModal from '../../components/modal/TicketCreateModal';
import Navbar from '../../components/navbar/Navbar';

const HomePage = () => {
  const [pendingTickets, setPendingTickets] = useState([]);
  const [completedTickets, setCompletedTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [difficultyFilterC, setDifficultyFilterC] = useState('');
  const [difficultyFilterP, setDifficultyFilterP] = useState('');
  const [dateOrderC, setDateOrderC] = useState('asc');
  const [dateOrderP, setDateOrderP] = useState('asc');

  useEffect(() => {
    fetchUserAndTickets();
  }, [difficultyFilterC, difficultyFilterP,
    dateOrderC, dateOrderP,
    isCreateModalOpen, isUpdateModalOpen]);

  const fetchUserAndTickets = async () => {
    const token = localStorage.getItem('token');
    try {
      if (!token) throw new Error('No hay token disponible');
      const userInfo = getUserInfoFromToken(token);
      if (!userInfo || !userInfo.userId) throw new Error('No se pudo obtener la información del usuario');

      // Obtener tickets pendientes
      try {
        const responsePending = await getTicketsByUserId(userInfo.userId, { status: "pendiente", difficulty: difficultyFilterP, sort: dateOrderP });
        setPendingTickets(responsePending || []);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setPendingTickets([]); // No hay ticket cargado
        } else {
          setError('Error al obtener tickets pendientes');
        }
      }

      // Obtener tickets completados
      try {
        const responseCompleted = await getTicketsByUserId(userInfo.userId, { status: "completado", difficulty: difficultyFilterC, sort: dateOrderC });
        setCompletedTickets(responseCompleted || []);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setCompletedTickets([]); // No hay ticket cargado
        } else {
          setError('Error al obtener tickets completados');
        }
      }
    } catch (err) {
      setError('No se pudieron obtener los tickets');
    }
  };

  // Abrir el modal para ver/actualizar el ticket
  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsUpdateModalOpen(true);
  };

  // cerrar modal
  const closeModal = () => {
    setIsUpdateModalOpen(false);
    setIsCreateModalOpen(false);
    setSelectedTicket(null);
  };

  // Abrir el modal para crear el Ticket
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  // Eliminar el ticket
  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteTicket(ticketId);
      setPendingTickets(pendingTickets.filter(ticket => ticket.id !== ticketId));
      setCompletedTickets(completedTickets.filter(ticket => ticket.id !== ticketId));
    } catch (error) {
      setError('Error al eliminar el ticket');
    }
  };

  return (
    <div className="min-h-screen relative w-full">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Filtros para Tickets Pendientes */}
          <div className="border p-4 rounded-lg shadow bg-white">
            <h2 className="text-2xl font-bold text-black-700 mb-4">Pendientes</h2>
            <div className="mb-4 flex gap-4">
              <select
                onChange={(e) => setDifficultyFilterP(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Filtrar por dificultad</option>
                <option value="fácil">Fácil</option>
                <option value="medio">Medio</option>
                <option value="difícil">Difícil</option>
                <option value="">Todas</option>
              </select>
              <select
                onChange={(e) => setDateOrderP(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asc">Fecha: Más antiguo a más reciente</option>
                <option value="desc">Fecha: Más reciente a más antiguo</option>
              </select>
            </div>

            <div className="overflow-y-auto max-h-96">
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
          </div>

          {/* Filtros para Tickets Completados */}
          <div className="border p-4 rounded-lg shadow bg-white">
            <h2 className="text-2xl font-bold text-black-700 mb-4">Realizados</h2>
            <div className="mb-4 flex gap-4">
              <select
                onChange={(e) => setDifficultyFilterC(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Filtrar por dificultad</option>
                <option value="fácil">Fácil</option>
                <option value="medio">Medio</option>
                <option value="difícil">Difícil</option>
                <option value="">Todas</option>
              </select>

              <select
                onChange={(e) => setDateOrderC(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asc">Fecha: Más antiguo a más reciente</option>
                <option value="desc">Fecha: Más reciente a más antiguo</option>
              </select>
            </div>

            <div className="overflow-y-auto max-h-96">
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
            onClose={closeModal}
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
