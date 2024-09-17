import React from 'react';

const TicketCard = ({ ticket, onClick }) => {
  // Función para determinar el color según la dificultad
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'difícil':
        return 'bg-red-500';
      case 'medio':
        return 'bg-yellow-500';
      case 'fácil':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm cursor-pointer hover:bg-gray-100" 
      onClick={onClick} // Llama a la función onClick cuando se hace clic en la tarjeta
    >
      {/* Encabezado de la tarjeta */}
      <div className="flex justify-between items-center mb-2">
        <span className={`px-2 py-1 rounded-full text-white text-sm ${getDifficultyColor(ticket.difficulty)}`}>
          {ticket.difficulty}
        </span>
        <p className="text-gray-800 font-semibold">{ticket.user.name}</p>
      </div>
  
      {/* Nombre del ticket */}
      <h2 className="text-lg font-semibold text-gray-900 mb-1">{ticket.name}</h2>
  
      {/* Descripción del ticket */}
      <p className="text-gray-600 text-sm mb-4">{ticket.description || 'Sin descripción'}</p>
  
      {/* Información adicional */}
      <div className="flex items-center">
        <img
          src={ticket.gif_url}
          alt="User GIF"
          className="w-14 h-14 mr-3"
        />
      </div>
    </div>
  );
};

export default TicketCard;
