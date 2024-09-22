import React from 'react';
import { TrashIcon } from '@heroicons/react/solid';

const TicketCard = ({ ticket, onClick, onDelete }) => {
  // Función para determinar los estilos según la dificultad
  const getDifficultyStyles = (difficulty) => {
    switch (difficulty) {
      case 'difícil':
        return { border: 'border-red-500', bg: 'bg-red-50', text: 'bg-red-500' };
      case 'medio':
        return { border: 'border-yellow-500', bg: 'bg-yellow-50', text: 'bg-yellow-500' };
      case 'fácil':
        return { border: 'border-green-500', bg: 'bg-green-50', text: 'bg-green-500' };
      default:
        return { border: 'border-gray-300', bg: 'bg-gray-50', text: 'bg-gray-300' };
    }
  };

  const { border, bg, text } = getDifficultyStyles(ticket.difficulty);

  return (
    <div className={`border-l-4 ${border} p-4 rounded-lg shadow-lg ${bg}`}>
      <div
        className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm cursor-pointer hover:bg-gray-100"
        onClick={onClick}
      >
        {/* Encabezado de la tarjeta */}
        <div className="flex justify-between items-center mb-2">
          <span className={`px-2 py-1 rounded-full text-white text-sm ${text}`}>
            {ticket.difficulty ? ticket.difficulty.charAt(0).toUpperCase() + ticket.difficulty.slice(1) : ''}
          </span>
          <TrashIcon
            className="h-6 w-6 text-red-600 hover:text-red-800 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(ticket.id);
            }}
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
          {ticket.name}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {ticket.description || 'Sin descripción'}
        </p>
        <div className="flex items-center">
          <img
            src={ticket.gif_url}
            alt="User GIF"
            className="w-14 h-14 mr-3"
          />
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
