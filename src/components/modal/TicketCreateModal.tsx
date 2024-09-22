import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { createTicket } from '../../services/ticketService';
import { getUserInfoFromToken } from '../../utils/jwtUtils';

const TicketCreateModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'pendiente',
    difficulty: 'fácil',
    user_id: ''
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Obtener el token y actualizar el user_id cuando el modal se abre
    const token = localStorage.getItem('token');
    const userInfo = getUserInfoFromToken(token);
    if (userInfo && userInfo.userId) {
      setFormData(prevState => ({ ...prevState, user_id: userInfo.userId }));
    }
  }, [isOpen]);

  // Obtener los datos para crear el ticket
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Crear Ticket  
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTicket(formData);
      onClose();
    } catch (err) {
      setError('Error al crear el ticket');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      contentLabel="Create Ticket"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuevo Ticket</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nombre del Ticket:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Status:</label>
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
            <label className="block text-gray-700 font-medium mb-1">Difficulty:</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="fácil">Fácil</option>
              <option value="medio">Medio</option>
              <option value="difícil">Difícil</option>
            </select>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create
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

export default TicketCreateModal;
