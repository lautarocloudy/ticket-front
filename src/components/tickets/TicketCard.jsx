import React from 'react';
import { TrashIcon } from '@heroicons/react/solid';

const TicketCard = ({ ticket, onClick, onDelete }) => {
  // Función para determinar el color según la dificultad
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'difícil':
        return 'red-500';  // Rojo para dificultad difícil
      case 'medio':
        return 'yellow-500';  // Amarillo para dificultad media
      case 'fácil':
        return 'green-500';  // Verde para dificultad fácil
      default:
        return 'gray-300';  // Gris para dificultad desconocida
    }
  };

  // Función para obtener un color de fondo más claro
  const getLightDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'difícil':
        return 'red-50'; // Color rojo claro
      case 'medio':
        return 'yellow-50'; // Color amarillo claro
      case 'fácil':
        return 'green-50'; // Color verde claro
      default:
        return 'gray-50'; // Color gris claro
    }
  };

  return (
    <div className={`border-l-4 border-${getDifficultyColor(ticket.difficulty)} p-4 rounded-lg shadow-lg bg-${getLightDifficultyColor(ticket.difficulty)}`}>
      <div 
        className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm cursor-pointer hover:bg-gray-100" 
        onClick={onClick} // Llama a la función onClick cuando se hace clic en la tarjeta
      >
        {/* Encabezado de la tarjeta */}
        <div className="flex justify-between items-center mb-2">
          <span className={`px-2 py-1 rounded-full text-white text-sm bg-${getDifficultyColor(ticket.difficulty)}`}>
          {ticket.difficulty ? ticket.difficulty.charAt(0).toUpperCase() + ticket.difficulty.slice(1) : ''}

          </span>

          {/* Botón de eliminar con ícono de basura */}
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Evita que el evento onClick de la tarjeta se dispare
              onDelete(ticket.id); // Llama a la función onDelete pasando el ID del ticket
            }} 
            className="text-red-600 hover:text-red-800"
          >
            <TrashIcon className="h-6 w-6" />
          </button>
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
    </div>
  );
};

export default TicketCard;
