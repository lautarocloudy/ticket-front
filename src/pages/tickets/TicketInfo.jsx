import React, { useEffect, useState } from 'react';
import { getAllTickets, getTicketsByUserId } from '../../services/ticketService';
import { getUserInfoFromToken } from '../../utils/jwtUtils';
import TicketCard from '../../components/tickets/TicketCard';
import TicketEditModal from '../../components/modal/TicketEditModal';

const TicketsInfo = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetchUserAndTickets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tickets, statusFilter, difficultyFilter, startDate, endDate]);

  const fetchUserAndTickets = async () => {
    const token = localStorage.getItem('token');

    try {
      if (!token) throw new Error('No hay token disponible');

      const userInfo = getUserInfoFromToken(token);
      if (!userInfo || !userInfo.userId || !userInfo.rol) throw new Error('No se pudo obtener la información del usuario');

      setUserRole(userInfo.rol);

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

  const applyFilters = () => {
    let filtered = tickets;

    if (statusFilter) {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    if (difficultyFilter) {
      filtered = filtered.filter(ticket => ticket.difficulty === difficultyFilter);
    }

    if (startDate) {
      filtered = filtered.filter(ticket => new Date(ticket.created_at) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter(ticket => new Date(ticket.created_at) <= new Date(endDate));
    }

    setFilteredTickets(filtered);
  };

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Tickets</h1>
        </header>

        {error && <p className="text-red-500">{error}</p>}
        
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filtrar Tickets</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Estado:</label>
              <select
                className="mt-1 p-2 border rounded"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="completado">Completado</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Dificultad:</label>
              <select
                className="mt-1 p-2 border rounded"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="fácil">Fácil</option>
                <option value="medio">Medio</option>
                <option value="difícil">Difícil</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <div className="w-full">
                <label className="block text-gray-700">Fecha Inicio:</label>
                <input
                  type="date"
                  className="mt-1 p-2 border rounded w-full"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-700">Fecha Fin:</label>
                <input
                  type="date"
                  className="mt-1 p-2 border rounded w-full"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTickets.length === 0 ? (
            <p className="text-gray-700">No hay tickets disponibles.</p>
          ) : (
            filteredTickets.map(ticket => (
              <div key={ticket.id} className="border p-4 rounded-lg shadow-lg bg-white">
                <TicketCard ticket={ticket} onClick={() => openModal(ticket)} />
              </div>
            ))
          )}
        </div>
      </div>

      {selectedTicket && (
        <TicketEditModal
          isOpen={isModalOpen}
          onClose={closeModal}
          ticket={selectedTicket}
          onUpdate={fetchUserAndTickets}
          userRole={userRole}
        />
      )}
    </div>
  );
};

export default TicketsInfo;
