// HomePage.jsx
import React, { useEffect, useState } from 'react';
import { getTickets } from '../services/apiService';

const HomePage = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketsData = await getTickets(); // Obtén los tickets desde el servicio API
        setTickets(ticketsData); // Establece los tickets en el estado
      } catch (err) {
        setError('Error al obtener los tickets'); // Maneja el error en caso de fallo
        console.error('Error al obtener los tickets:', err);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <h1>Tickets</h1>
      {error && <p>{error}</p>} {/* Muestra el mensaje de error si existe */}
      <div>
        {tickets.length > 0 ? (
          tickets.map(ticket => (
            <div key={ticket.id} className="ticket-card">
              <h2>{ticket.name}</h2>
              <p><strong>Description:</strong> {ticket.description}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
              <p><strong>Difficulty:</strong> {ticket.difficulty}</p>
              <img src={ticket.gif_url} alt={ticket.name} />
            </div>
          ))
        ) : (
          <p>No tickets found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
