import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    // Vaciar el localStorage
    localStorage.clear();

    // Redirigir a la página de login
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center w-full">
      <div className="flex items-center">
        <img src="/ticket-manager.png" alt="Ticket Manager" className="h-10 w-10 mr-4" />
        <span className="text-white text-xl font-semibold">Ticket Manager </span>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
      >
        Salir
      </button>
    </nav>
  );
};

export default Navbar;
