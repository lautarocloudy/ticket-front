import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const TicketEditModal = ({ isOpen, onClose, ticket, onUpdate, userRole }) => {
  const [formData, setFormData] = useState({
    name: ticket.name,
    description: ticket.description,
    status: ticket.status,
    difficulty: ticket.difficulty,
    user: ticket.user.id // O el campo adecuado para el usuario
  });

  useEffect(() => {
    if (ticket) {
      setFormData({
        name: ticket.name,
        description: ticket.description,
        status: ticket.status,
        difficulty: ticket.difficulty,
        user: ticket.user.id // O el campo adecuado para el usuario
      });
    }
  }, [ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes hacer la solicitud para actualizar el ticket
    // Ejemplo: await updateTicket(ticket.id, formData);

    onUpdate(); // Actualiza la lista de tickets
    onClose(); // Cierra el modal
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      contentLabel="Edit Ticket"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={userRole === 'user'}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              disabled={userRole === 'user'}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Status:
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="pendiente">Pendiente</option>
              <option value="completado">Completado</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Difficulty:
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={userRole === 'user'}
            >
              <option value="fácil">Fácil</option>
              <option value="medio">Medio</option>
              <option value="difícil">Difícil</option>
            </select>
          </div>

          {userRole !== 'user' && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                User:
              </label>
              <select
                name="user"
                value={formData.user}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {/* Aquí deberías mapear los usuarios disponibles */}
                <option value="1">User 1</option>
                <option value="2">User 2</option>
                {/* Añade más opciones según los usuarios disponibles */}
              </select>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TicketEditModal;
