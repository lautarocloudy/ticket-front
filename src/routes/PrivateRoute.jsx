import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asegúrate de que este hook retorna el token

const PrivateRoute = () => {
  const { token } = useAuth(); // Obtenemos el token del contexto de autenticación

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
