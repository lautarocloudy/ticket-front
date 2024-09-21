import React from 'react';

const Navbar = () => {
  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrar sesión');
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Imagen a la izquierda */}
      <div className="flex items-center">
        <img src="ruta-de-tu-imagen" alt="Logo" className="h-10 w-10 mr-4" />
        <span className="text-white text-xl font-semibold">Mi App</span>
      </div>

      {/* Botón de salir a la derecha */}
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
