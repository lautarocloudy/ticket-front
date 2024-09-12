// src/routes/Routes.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
// import TicketPage from '../pages/TicketPage';
import PrivateRoute from './PrivateRoute';

const RoutesComponent = () => {
  // Suponiendo que tienes una función para verificar si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem('token'); // Cambia esto según tu lógica

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/ticket" element={<TicketPage />} /> */}
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
